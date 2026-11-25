import './style.css';
import { ArrowUp, BookOpen, BriefcaseBusiness, CalendarDays, Check, ChevronLeft, ChevronRight, CircleCheck, GraduationCap, Heart, Inbox, Lock, PanelRightClose, Plus, SlidersHorizontal, Sparkles, TriangleAlert, X } from 'lucide-static';
import { addDays, calendars, clock, conflicts, dateLabel, dayEnd, dayStart, defaultPriorities, demoDay, eventPriority, findEventsToMove, mail, nextSlot, overlapPairs, overlaps, parseAxel, parseAxelMove, priorityLabels, resolveOverlap, seedEvents, weekStart } from './domain';
import type { CalendarId, Draft, Event, Priority } from './domain';

const root = document.querySelector<HTMLDivElement>('#app')!;
const dialog = document.querySelector<HTMLDialogElement>('#dialog')!;
const toast = document.querySelector<HTMLDivElement>('#toast')!;
const storageKey = 'axis-sprint3-v1';
type Stored = { events: Event[]; priorities: typeof defaultPriorities; resolvedChanges?: string[] };
type Proposal = Draft & { targetId?: string; overlapWith?: string };
function restore(): Stored {
  try {
    const stored = localStorage.getItem(storageKey);
    if (stored) return JSON.parse(stored) as Stored;
  } catch { /* Start with the demo when storage is unavailable. */ }
  return { events: seedEvents, priorities: { ...defaultPriorities } };
}
let { events, priorities, resolvedChanges = [] } = restore();
let selected = demoDay;
let view: 'week' | 'day' = 'week';
let page: 'agenda' | 'inbox' = 'agenda';
let accentPanel = !matchMedia('(max-width: 900px)').matches;
let pending: Proposal | undefined;
let moveSelection: { request: NonNullable<ReturnType<typeof parseAxelMove>>; events: Event[] } | undefined;
let messages: { type: 'user' | 'assistant'; text: string }[] = [];
const visible = new Set<CalendarId>(calendars.map(calendar => calendar.id));
let toastTimer: number | undefined;

function save() {
  try { localStorage.setItem(storageKey, JSON.stringify({ events, priorities, resolvedChanges })); }
  catch { notify('Los cambios estarán disponibles durante esta sesión.'); }
}
const escape = (value: string) => value.replace(/[&<>"']/g, char =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]!);
const icons = {
  'arrow-up': ArrowUp, 'book-open': BookOpen, 'briefcase-business': BriefcaseBusiness,
  'calendar-days': CalendarDays, check: Check, 'chevron-left': ChevronLeft, 'chevron-right': ChevronRight,
  'circle-check': CircleCheck, 'graduation-cap': GraduationCap, heart: Heart, inbox: Inbox, lock: Lock,
  'panel-right-close': PanelRightClose, plus: Plus, 'sliders-horizontal': SlidersHorizontal,
  sparkles: Sparkles, 'triangle-alert': TriangleAlert, x: X,
};
const icon = (name: keyof typeof icons, size = 18) =>
  `<span class="icon" style="--icon-size:${size}px" aria-hidden="true">${icons[name]}</span>`;
const robot = (size = '') => `<span class="robot ${size}" aria-hidden="true"><i></i><b></b><em></em></span>`;
const cap = (text: string) => text[0].toUpperCase() + text.slice(1);
const eventTime = (draft: Draft) => `${clock(draft.start)} – ${clock(draft.end)}`;
const eventSchedule = (draft: Draft) =>
  `${cap(dateLabel(draft.date, { weekday: 'long', day: 'numeric', month: 'short' }))} · ${eventTime(draft)}`;
const mailApplied = (item: typeof mail[number]) =>
  item.targetId ? resolvedChanges.includes(item.id) : events.some(event => event.mailId === item.id);
const mailNeedsAction = (item: typeof mail[number]) =>
  !mailApplied(item) && (!item.targetId || events.some(event => event.id === item.targetId));
const calendarOf = (id: CalendarId) => calendars.find(calendar => calendar.id === id)!;
const btn = (action: string, label: string, symbol: keyof typeof icons) => `<button class="icon-btn" type="button" data-action="${action}" title="${label}" aria-label="${label}">${icon(symbol)}</button>`;
const plural = (count: number, one: string, many: string) => `${count} ${count === 1 ? one : many}`;
const examples = ['Tutoría el siguiente jueves a las 17:00', 'Reunión el miércoles a las 16:30', 'Estudiar mates el 3 de diciembre de 9 a 11', 'Mueve la reunión de prácticas al viernes a las 12:30'];
const hours = Array.from({ length: (dayEnd - dayStart) / 60 }, (_, i) => dayStart + i * 60);

function notify(text: string) {
  toast.textContent = text;
  toast.classList.add('show');
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove('show'), 3600);
}
function sidebar() {
  const sorted = [...calendars].sort((a, b) => priorities[b.id] - priorities[a.id]);
  return `<aside class="sidebar">
    <nav class="main-nav" aria-label="Aplicación">
      <button data-action="agenda" class="${page === 'agenda' ? 'active' : ''}" ${page === 'agenda' ? 'aria-current="page"' : ''}>${icon('calendar-days')} Agenda</button>
      <button data-action="inbox" class="${page === 'inbox' ? 'active' : ''}" ${page === 'inbox' ? 'aria-current="page"' : ''}>${icon('inbox')} Correo <span class="nav-count">${mail.filter(mailNeedsAction).length}</span></button>
    </nav>
    <div class="side-rule"></div>
    <div class="side-caption"><h2>Mis calendarios</h2>${btn('priorities', 'Editar prioridades', 'sliders-horizontal')}</div>
    <div class="calendars">${sorted.map(calendar => `<label class="calendar-filter ${calendar.id}">
      <input type="checkbox" data-calendar="${calendar.id}" ${visible.has(calendar.id) ? 'checked' : ''}>
      <span class="cal-dot">${icon('check', 12)}</span><span>${calendar.name}</span>
    </label>`).join('')}</div>
    <div class="sidebar-bottom"><div class="avatar">R</div><div><strong>Rafa</strong><small>Espacio de demostración</small></div></div>
  </aside>`;
}
function rangeLabel() {
  if (view === 'day') return cap(dateLabel(selected, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }));
  const start = weekStart(selected);
  const end = addDays(start, 6);
  const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long' };
  const sameMonth = start.slice(0, 7) === end.slice(0, 7);
  return `${sameMonth ? Number(start.slice(-2)) : dateLabel(start, options)} – ${dateLabel(end, { ...options, year: 'numeric' })}`;
}
function placedEvents(day: string, dayEvents: Event[]) {
  const sorted = dayEvents.filter(event => event.date === day).sort((a, b) => a.start - b.start || eventPriority(b, priorities) - eventPriority(a, priorities) || b.end - a.end);
  const lanes: Event[] = [];
  let group: { event: Event; lane: number }[] = [];
  const layout: { event: Event; lane: number; count: number }[] = [];
  function flush() {
    layout.push(...group.map(item => ({ ...item, count: lanes.length })));
    lanes.length = 0;
    group = [];
  }
  for (const event of sorted) {
    if (lanes.every(existing => existing.end <= event.start)) flush();
    let lane = lanes.findIndex(existing => existing.end <= event.start);
    if (lane === -1) lane = lanes.length;
    lanes[lane] = event;
    group.push({ event, lane });
  }
  flush();
  return layout.map(({ event, lane, count }) => {
    const top = (event.start - dayStart) / 60;
    const height = (event.end - event.start) / 60;
    const conflict = events.some(other => other.id !== event.id && overlaps(other, event));
    return `<button class="event ${event.calendar}${conflict ? ' has-conflict' : ''}${height < 1 ? ' short' : ''}" data-event="${event.id}"
      style="--top:${top};--length:${height};--lane:${lane};--lanes:${count}" title="${escape(event.title)} · ${eventTime(event)}"
      aria-label="${escape(event.title)} · ${eventTime(event)}${event.locked ? ' · Horario bloqueado' : ''}${conflict ? ' · Con conflicto' : ''}">
      <span class="event-time">${clock(event.start)}<span class="event-symbols">${event.locked ? icon('lock', 12) : ''}${conflict ? icon('triangle-alert', 12) : ''}</span></span><strong>${escape(event.title)}</strong>
    </button>`;
  }).join('');
}
function agenda() {
  const days = view === 'day' ? [selected] : Array.from({ length: 7 }, (_, i) => addDays(weekStart(selected), i));
  const rangeEvents = events.filter(event => days.includes(event.date));
  const conflictingEvents = rangeEvents.filter(event => rangeEvents.some(other => other.id !== event.id && overlaps(other, event)));
  const shown = rangeEvents.filter(event => visible.has(event.calendar));
  const zone = dateLabel(selected, { hour: 'numeric', timeZoneName: 'short', timeZone: 'Europe/Madrid' }).split(' ').at(-1);
  return `<main class="main">
    <div class="section-head"><div><h1>Mi agenda</h1><p>Universidad, prácticas y vida personal en un solo lugar.</p></div>
      <button class="primary new-event" data-action="new">${icon('plus', 18)} Nuevo evento</button></div>
    <section class="schedule ${view === 'day' ? 'single-day' : ''}" aria-label="Calendario">
      <div class="schedule-toolbar">
        <div class="date-navigation"><button data-action="today" class="outline" title="Ir al día de la demostración">Hoy</button>
          <div class="arrow-group">${btn('previous', 'Periodo anterior', 'chevron-left')}${btn('next', 'Periodo siguiente', 'chevron-right')}</div>
          <h2>${rangeLabel()}</h2></div>
        <div class="switch" aria-label="Vista de calendario"><button data-action="week" aria-pressed="${view === 'week'}">Semana</button><button data-action="day" aria-pressed="${view === 'day'}">Día</button></div>
      </div>
      <div class="schedule-scroll" tabindex="0" aria-label="Cuadrícula de horarios">
        <div class="schedule-inner" style="--days:${days.length}">
          <div class="day-heads"><div class="timezone" title="Hora de Madrid">${zone}</div>
            ${days.map(day => `<button class="day-head ${day === selected ? 'selected' : ''}" data-date="${day}" aria-pressed="${day === selected}"><span>${dateLabel(day, { weekday: 'short' }).replace('.', '')}</span><strong>${Number(day.slice(-2))}</strong></button>`).join('')}
          </div>
          <div class="grid-body">
            <div class="hour-axis">${hours.map(hour => `<div>${clock(hour)}</div>`).join('')}</div>
            ${days.map(day => `<div class="day-column ${day === selected ? 'selected' : ''} ${[0, 6].includes(new Date(day + 'T12:00:00').getDay()) ? 'weekend' : ''}">
              ${hours.map(hour => `<button tabindex="-1" class="hour-slot" data-slot="${day},${hour}" aria-label="Nuevo evento a las ${clock(hour)}"></button>`).join('')}
              ${placedEvents(day, shown)}
            </div>`).join('')}
          </div>
        </div>
      </div>
      <div class="schedule-footer"><span>${plural(shown.length, 'evento visible', 'eventos visibles')}</span><span class="conflict-status ${conflictingEvents.length ? 'warning' : ''}">${icon(conflictingEvents.length ? 'triangle-alert' : 'circle-check', 16)} ${conflictingEvents.length ? plural(conflictingEvents.length, 'evento con conflicto', 'eventos con conflicto') : 'Sin conflictos en la agenda'}</span>${conflictingEvents.length ? '<button class="outline" data-action="resolve-overlap">Resolver solape</button>' : ''}</div>
    </section>
  </main>`;
}
function mailCard(item: typeof mail[number]) {
  const applied = mailApplied(item);
  const change = Boolean(item.targetId);
  const available = mailNeedsAction(item);
  const status = change ? 'Cambio aplicado' : 'En agenda';
  const action = change ? 'Revisar cambio' : 'Revisar propuesta';
  return `<article class="mail-card${change && available ? ' mail-change' : ''}">
    <div class="mail-icon ${item.calendar}">${icon(calendarOf(item.calendar).icon, 21)}</div>
    <div class="mail-content"><div class="mail-meta"><strong>${item.sender}</strong><span>${item.time}</span></div>
      <h3>${item.title}</h3><p>${item.text}</p>
      <div class="mail-actions">
        <span class="mail-date">${icon(applied ? 'circle-check' : 'calendar-days', 16)}
          ${applied ? status : available ? eventSchedule({ ...item, source: 'mail' }) : 'Evento original no disponible'}
        </span>
        ${available ? `<button class="${change ? 'primary' : 'outline'}" data-mail="${item.id}">${action}</button>` : ''}
      </div>
    </div>
  </article>`;
}
function inbox() {
  const ordered = [...mail].sort((a, b) =>
    Number(Boolean(b.targetId)) - Number(Boolean(a.targetId)) || priorities[b.calendar] - priorities[a.calendar]);
  const needingAction = ordered.filter(mailNeedsAction);
  const otherMail = ordered.filter(item => !mailNeedsAction(item));
  return `<main class="main inbox"><div class="section-head"><div><h1>Correo</h1><p>Revisa las propuestas y los cambios de horario de tus correos de prueba.</p></div></div>
    <section class="inbox-section" aria-labelledby="mail-action-heading">
      <h2 id="mail-action-heading">Requieren acción <span class="nav-count">${needingAction.length}</span></h2>
      <div class="mail-list">${needingAction.map(mailCard).join('') || '<p class="mail-empty">Estás al día.</p>'}</div>
    </section>
    ${otherMail.length ? `<section class="inbox-section" aria-labelledby="mail-other-heading">
      <h2 id="mail-other-heading">Otros correos</h2><div class="mail-list">${otherMail.map(mailCard).join('')}</div>
    </section>` : ''}
  </main>`;
}
function proposal() {
  if (!pending) return '';
  const original = events.find(event => event.id === pending?.targetId);
  const otherEvents = events.filter(event => event.id !== pending?.targetId);
  const overlapping = otherEvents.find(event => event.id === pending?.overlapWith);
  const blocked = Boolean(original?.locked);
  const stale = Boolean(pending.overlapWith && (!original || !overlapping || !overlaps(original, overlapping)));
  const busy = conflicts(otherEvents, pending, priorities);
  const alternative = busy.length && !pending.overlapWith && !blocked ? nextSlot(otherEvents, pending) : undefined;
  const update = Boolean(pending.targetId);
  const fromMail = update && pending.source === 'mail';
  const missing = update && !original;
  const confirmLabel = update ? 'Confirmar cambio' : 'Confirmar';
  const alternativeLabel = pending.source === 'manual' ? 'Guardar en este hueco' : 'Usar hueco';
  const actions = busy.length
    ? `${alternative ? `<button class="primary" data-action="alternative">${alternativeLabel}</button>` : ''}
       ${fromMail ? '<button class="outline" data-action="accept-overlap">Aceptar con solape</button>' : ''}`
    : `<button class="primary" data-action="confirm">${confirmLabel}</button>`;
  const warning = missing || blocked || stale || busy.length > 0;
  const status = missing ? 'Evento original no disponible' : blocked ? 'Horario bloqueado' :
    stale ? 'El solape ya no está disponible' : busy.length ? 'Hay un conflicto' :
    overlapping ? 'Propuesta para resolver el solape' : 'Horario disponible';
  return `<section class="proposal" aria-label="${update ? 'Propuesta de cambio de horario' : 'Propuesta de evento'}">
    <div class="proposal-title ${warning ? 'warning' : ''}">${icon(warning ? 'triangle-alert' : 'circle-check', 17)}
      <strong>${status}</strong></div>
    <strong class="proposal-event">${escape(pending.title)}</strong>
    ${blocked && original ? `<p>Desbloquea el horario en el detalle del evento para moverlo.</p><div>${eventSchedule(original)}</div>` : original ? `<dl class="change-times">
      <div><dt>Antes</dt><dd>${eventSchedule(original)}</dd></div>
      <div><dt>Después</dt><dd>${eventSchedule(pending)}</dd></div>
    </dl>` : `<div>${eventSchedule(pending)}</div>`}
    <div class="${pending.calendar} proposal-calendar"><span class="dot"></span>${calendarOf(pending.calendar).name}</div>
    ${overlapping && !stale && !blocked ? `<p class="slot-explanation">Se mantiene «${escape(overlapping.title)}» en su horario.</p>` : ''}
    ${busy.length && !missing && !blocked && !stale ? `<ul>${busy.map(event => `<li><strong>${escape(event.title)}</strong> · ${eventTime(event)}</li>`).join('')}</ul>
      <div class="slot-explanation">${alternative ? `Siguiente hueco <strong>${eventSchedule(alternative)}</strong>` : pending.overlapWith ? 'Vuelve a resolver el solape para revisar otro horario.' : 'No hay un hueco libre en los próximos 7 días.'}</div>` : ''}
    <div class="proposal-actions"><button class="outline" data-action="dismiss">${fromMail ? 'Volver al correo' : 'Descartar'}</button>${missing || blocked || stale ? '' : actions}</div>
  </section>`;
}
function eventChoices() {
  if (!moveSelection) return '';
  return `<section class="proposal move-choices" aria-label="Eventos para mover">
    ${moveSelection.events.map(event => `<button class="outline" data-move-event="${event.id}">
      <strong>${escape(event.title)}</strong><span>${eventSchedule(event)}</span>
    </button>`).join('')}
    <button class="outline" data-action="dismiss">Descartar</button>
  </section>`;
}
function axel() {
  return `<aside class="axel" aria-label="Axel, asistente">
    <div class="axel-header">${robot('tiny')}<div><h2>Axel</h2><p>Tu asistente de agenda</p></div>${btn('toggle-axel', 'Cerrar Axel', 'panel-right-close')}</div>
    <div class="conversation">
      <div class="assistant-welcome">${robot()}<div class="welcome-sparkle">${icon('sparkles', 19)}</div></div>
      <div class="bubble assistant greeting"><strong>¡Hola, Rafa!</strong><p>Dime qué quieres agendar, qué día y a qué hora.</p></div>
      <div class="quick-prompts"><span>Prueba con</span>${examples.map((example, i) => `<button data-example="${i}">${icon(i === 1 || i === 3 ? 'briefcase-business' : 'book-open', 15)} ${example}</button>`).join('')}</div>
      ${messages.map(message => `<div class="bubble ${message.type}">${escape(message.text)}</div>`).join('')}
      ${eventChoices()}
      ${proposal()}
    </div>
    <div class="axel-input"><form id="axel-form"><label class="sr-only" for="axel-message">Mensaje para Axel</label><input id="axel-message" name="message" placeholder="Escribe a Axel…" maxlength="140" required><button class="primary" aria-label="Enviar mensaje">${icon('arrow-up', 18)}</button></form><small>${icon('sparkles', 13)} Axel está en modo demo</small></div>
  </aside>`;
}
function render() {
  const previousSchedule = root.querySelector('.schedule-scroll');
  const previousChat = root.querySelector('.conversation');
  root.innerHTML = `<header class="topbar"><button class="brand" data-action="agenda" aria-label="Axis, ir a agenda"><img src="${import.meta.env.BASE_URL}axis-logo.png" alt="Axis"></button>
    <div class="top-actions"><span class="today-label">${icon('calendar-days', 16)} ${cap(dateLabel(demoDay, { weekday: 'long', day: 'numeric', month: 'long' }))}</span><button class="outline axel-toggle" data-action="toggle-axel" aria-pressed="${accentPanel}">${icon('sparkles', 16)} Axel</button></div>
    </header><div class="workspace ${accentPanel ? '' : 'without-axel'}">${sidebar()}${page === 'agenda' ? agenda() : inbox()}${accentPanel ? axel() : ''}</div>`;
  const schedule = root.querySelector('.schedule-scroll');
  if (schedule && previousSchedule) {
    schedule.scrollLeft = previousSchedule.scrollLeft;
    schedule.scrollTop = previousSchedule.scrollTop;
  }
  const chat = root.querySelector('.conversation');
  if (chat && previousChat) chat.scrollTop = previousChat.scrollTop;
}
function scrollMessages() {
  requestAnimationFrame(() => {
    const chat = root.querySelector('.conversation');
    if (chat) chat.scrollTop = chat.scrollHeight;
  });
}
function showProposal(draft: Proposal) {
  moveSelection = undefined;
  pending = draft;
  accentPanel = true;
  render();
  scrollMessages();
}
function reply(text: string) {
  messages.push({ type: 'assistant', text });
  render();
  scrollMessages();
}
function proposeMove(event: Event, request: NonNullable<ReturnType<typeof parseAxelMove>>) {
  if (event.locked) {
    reply(`«${event.title}» tiene el horario bloqueado. Puedes desbloquearlo desde su detalle.`);
    return;
  }
  const { date = event.date, start, end = start + event.end - event.start } = request;
  if (end > dayEnd) {
    reply('El evento terminaría después de las 22:00. Prueba con una hora anterior o indica la hora de fin.');
    return;
  }
  showProposal({ targetId: event.id, source: 'axel', title: event.title, calendar: event.calendar, date, start, end });
}
function sendMessage(message: string) {
  if (!message.trim()) return;
  messages.push({ type: 'user', text: message.trim() });
  moveSelection = undefined;
  const move = parseAxelMove(message, selected);
  if (move !== undefined) {
    pending = undefined;
    if (!move) {
      reply('Prueba con «Mueve la reunión de prácticas al viernes a las 12:00» o «Mueve la reunión de prácticas del jueves a las 16:00».');
      return;
    }
    const matching = findEventsToMove(events, move.title, move.fromDate);
    if (!matching.length) {
      const day = move.fromDate ? ` para el ${dateLabel(move.fromDate, { weekday: 'long', day: 'numeric', month: 'long' })}` : '';
      reply(`No encuentro «${move.title}»${day} en tu agenda. Revisa el título y el día del evento.`);
    } else if (matching.length === 1) {
      proposeMove(matching[0], move);
    } else {
      moveSelection = { request: move, events: matching };
      reply('Hay varios eventos que coinciden. Elige cuál quieres mover.');
    }
    return;
  }
  const draft = parseAxel(message, selected);
  if (draft) { showProposal(draft); return; }
  if (pending?.source === 'axel') pending = undefined;
  messages.push({ type: 'assistant', text: 'Prueba con «Tengo una tutoría el jueves a las 17:00». También puedes decir «el siguiente jueves», «el jueves 3» o «el 27/11». Busco la primera fecha que encaje a partir del día seleccionado. «El siguiente» empieza a buscar el día posterior al seleccionado. Si omites el día, uso el seleccionado. Para indicar la duración, di «Estudiar mates el 3 de diciembre de 9 a 11». Si solo das la hora de inicio, reservo 1 hora. El horario va de 08:00 a 22:00.' });
  render();
  scrollMessages();
}
function confirmProposal(acceptOverlap = false) {
  if (!pending) return;
  const { targetId, overlapWith, ...draft } = pending;
  const original = events.find(event => event.id === targetId);
  if (draft.mailId && (resolvedChanges.includes(draft.mailId) || events.some(event => event.mailId === draft.mailId))) {
    pending = undefined;
    render();
    return;
  }
  if (targetId && (!original || original.locked)) {
    render();
    return;
  }
  if (overlapWith) {
    const other = events.find(event => event.id === overlapWith);
    if (!original || !other || !overlaps(original, other)) {
      render();
      return;
    }
    const current = resolveOverlap(events, [original, other], priorities);
    if (!current || current.id !== targetId || current.date !== draft.date || current.start !== draft.start || current.end !== draft.end) {
      pending = undefined;
      reply('La agenda cambió. Pulsa «Resolver solape» para revisar una propuesta nueva.');
      return;
    }
  }
  if (!(original && acceptOverlap && draft.source === 'mail') && conflicts(events.filter(event => event.id !== targetId), draft, priorities).length) {
    render();
    scrollMessages();
    return;
  }
  pending = undefined;
  if (matchMedia('(max-width: 900px)').matches) accentPanel = false;
  applyEvent(draft, original, acceptOverlap);
}
function applyEvent(draft: Draft, original?: Event, acceptOverlap = false) {
  if (original) {
    const { date, start, end } = draft;
    events = events.map(event => event.id === original.id ? { ...event, date, start, end } : event);
    if (draft.mailId) resolvedChanges = [...resolvedChanges, draft.mailId];
    messages.push({ type: 'assistant', text: `«${original.title}» se ha actualizado al ${eventSchedule(draft)}.` });
    if (acceptOverlap) messages.push({ type: 'assistant', text: 'Desde la agenda, pulsa «Resolver solape» para que busque un hueco.' });
  } else {
    events = [...events, { ...draft, id: crypto.randomUUID() }];
  }
  visible.add(draft.calendar);
  selected = draft.date;
  page = 'agenda';
  save();
  if (draft.source === 'axel' && !original) messages.push({ type: 'assistant', text: `«${draft.title}» está en tu agenda el ${dateLabel(draft.date, { weekday: 'long', day: 'numeric', month: 'long' })} de ${clock(draft.start)} a ${clock(draft.end)}.` });
  render();
  scrollMessages();
  notify(original ? 'Horario actualizado en la agenda' : 'Evento añadido a la agenda');
}
const eventSettings = (event?: Draft) => `<label>Prioridad<select name="priority">
  <option value="">Heredar del calendario${event ? ` (${priorityLabels[priorities[event.calendar]]})` : ''}</option>
  ${([3, 2, 1] as const).map(rank => `<option value="${rank}" ${event?.priority === rank ? 'selected' : ''}>${priorityLabels[rank]}</option>`).join('')}
  </select></label>
  <label class="event-lock"><input type="checkbox" name="locked" ${event?.locked ? 'checked' : ''}> Horario bloqueado</label>`;
function readEventSettings(data: FormData) {
  const rank = Number(data.get('priority'));
  const priority: Priority | undefined = rank === 1 || rank === 2 || rank === 3 ? rank : undefined;
  return { priority, locked: data.has('locked') };
}
const dialogHeader = (heading: string) => `<div class="dialog-head"><h2>${heading}</h2>${btn('close-dialog', 'Cerrar', 'x')}</div>`;
function openNew(date = selected, start = 10 * 60) {
  dialog.innerHTML = `${dialogHeader('Nuevo evento')}<form id="event-form">
    <label>Título<input name="title" required maxlength="80" placeholder="Nombre del evento"></label>
    <label>Calendario<select name="calendar">${calendars.map(calendar => `<option value="${calendar.id}">${calendar.name}</option>`).join('')}</select></label>
    <label>Fecha<input type="date" name="date" required value="${date}"></label>
    <div class="form-row"><label>Empieza<input type="time" name="start" required value="${clock(start)}"></label><label>Termina<input type="time" name="end" required value="${clock(Math.min(start + 60, dayEnd))}"></label></div>
    <details class="event-options"><summary>Más opciones</summary><div>${eventSettings()}</div></details>
    <p class="form-error" role="alert"></p><div class="dialog-actions"><button class="outline" type="button" data-action="close-dialog">Cancelar</button><button class="primary">Guardar evento</button></div></form>`;
  dialog.showModal();
}
function openPriorities() {
  dialog.innerHTML = `${dialogHeader('Prioridad de calendarios')}<p>Los eventos pueden heredar esta prioridad. Axel la usa para decidir qué evento flexible mover.</p>
    <form id="priority-form">${calendars.map(calendar => `<label class="priority-row ${calendar.id}"><span class="dot"></span><span>${calendar.name}</span><select name="${calendar.id}">
    ${([3, 2, 1] as const).map(rank => `<option value="${rank}" ${priorities[calendar.id] === rank ? 'selected' : ''}>${priorityLabels[rank]}</option>`).join('')}</select></label>`).join('')}
    <div class="dialog-actions"><button class="primary">Guardar prioridades</button></div></form>`;
  dialog.showModal();
}
function openEvent(id: string) {
  const event = events.find(item => item.id === id);
  if (!event) return;
  const other = conflicts(events.filter(item => item.id !== id), event, priorities);
  dialog.innerHTML = `${dialogHeader(escape(event.title))}
    <p class="${event.calendar} proposal-calendar"><span class="dot"></span>${calendarOf(event.calendar).name}</p>
    <p>${eventSchedule(event)}</p>
    ${other.length ? `<p class="warning">Coincide con ${other.map(item => escape(item.title)).join(', ')}.</p>` : ''}
    <form id="event-settings" data-id="${event.id}">
      ${eventSettings(event)}
      <div class="dialog-actions">
        <button class="danger outline" type="button" data-action="delete" data-id="${event.id}">Eliminar evento</button>
        ${other.length ? `<button class="outline" type="button" data-action="resolve-overlap" data-id="${event.id}">Resolver solape</button>` : ''}
        <button class="primary">Guardar</button>
      </div>
    </form>`;
  if (!dialog.open) dialog.showModal();
}
function openOverlaps(id?: string) {
  const firstDay = view === 'day' ? selected : weekStart(selected);
  const lastDay = view === 'day' ? selected : addDays(firstDay, 6);
  const scopedEvents = events.filter(event => event.date >= firstDay && event.date <= lastDay);
  const pairs = overlapPairs(scopedEvents).filter(pair => !id || pair.some(event => event.id === id));
  dialog.innerHTML = `${dialogHeader('Resolver solape')}
    <div class="overlap-list">${pairs.map(([first, second]) => {
      const bothLocked = first.locked && second.locked;
      return `<section class="overlap-pair">
        ${[first, second].map(event => `<div class="overlap-event"><strong>${escape(event.title)}</strong>
          <span>${eventSchedule(event)}</span>
          <span>${priorityLabels[eventPriority(event, priorities)]}${event.locked ? ' · Horario bloqueado' : ''}</span>
          ${bothLocked ? `<button class="outline" data-event="${event.id}">Editar «${escape(event.title)}»</button>` : ''}
        </div>`).join('')}
        ${bothLocked ? '<p class="warning">Ambos horarios están bloqueados. Elige qué evento desbloquear.</p>' :
          `<button class="primary" data-resolve-pair="${first.id},${second.id}">Ver propuesta de Axel</button>`}
      </section>`;
    }).join('') || '<p>Ya no hay solapes en esta vista.</p>'}</div>`;
  if (!dialog.open) dialog.showModal();
  dialog.querySelector<HTMLButtonElement>('[data-resolve-pair], [data-event], [data-action="close-dialog"]')?.focus();
}
function proposeResolution(firstId: string, secondId: string) {
  const first = events.find(event => event.id === firstId);
  const second = events.find(event => event.id === secondId);
  if (!first || !second || !overlaps(first, second) || (first.locked && second.locked)) {
    openOverlaps();
    return;
  }
  const slot = resolveOverlap(events, [first, second], priorities);
  dialog.close();
  if (!slot) {
    pending = undefined;
    moveSelection = undefined;
    accentPanel = true;
    reply('No encuentro un hueco libre para el evento de menor prioridad en los seis días anteriores o posteriores al solape.');
    return;
  }
  const other = slot.id === first.id ? second : first;
  const { id, title, calendar, date, start, end } = slot;
  showProposal({ title, calendar, date, start, end, targetId: id, source: 'axel', overlapWith: other.id });
  root.querySelector<HTMLButtonElement>('.proposal [data-action="confirm"]')?.focus({ preventScroll: true });
}

function navigate(action: string, button: HTMLButtonElement) {
  const restoreFocus = button.matches(':focus-visible');
  switch (action) {
    case 'agenda': case 'inbox': page = action; break;
    case 'previous': case 'next': selected = addDays(selected, (action === 'next' ? 1 : -1) * (view === 'week' ? 7 : 1)); break;
    case 'today': selected = demoDay; break;
    case 'week': case 'day': view = action; break;
    case 'toggle-axel': accentPanel = !accentPanel; break;
    case 'new': openNew(); return;
    case 'resolve-overlap': openOverlaps(button.dataset.id); return;
    case 'priorities': openPriorities(); return;
    case 'close-dialog': dialog.close(); return;
    case 'dismiss':
      moveSelection = undefined;
      if (pending?.targetId && pending.source === 'mail') {
        page = 'inbox';
        if (matchMedia('(max-width: 900px)').matches) accentPanel = false;
      }
      pending = undefined;
      break;
    case 'confirm': confirmProposal(); return;
    case 'accept-overlap': confirmProposal(true); return;
    case 'alternative': {
      if (pending && !pending.overlapWith && !events.some(event => event.id === pending?.targetId && event.locked)) {
        const alternative = nextSlot(events.filter(event => event.id !== pending?.targetId), pending);
        if (alternative) {
          pending = { ...pending, ...alternative };
          if (pending.source === 'manual') {
            confirmProposal();
            return;
          }
        }
      }
      render();
      scrollMessages();
      return;
    }
    case 'delete':
      events = events.filter(event => event.id !== button.dataset.id);
      dialog.close();
      save();
      notify('Evento eliminado');
      break;
    default: return;
  }
  render();
  const target = root.querySelector<HTMLButtonElement>(`[data-action="${action}"]`);
  if (target && restoreFocus) target.focus();
}
document.addEventListener('click', event => {
  const button = (event.target as HTMLElement).closest<HTMLButtonElement>('button');
  if (!button) return;
  const data = button.dataset;
  if (data.action) navigate(data.action, button);
  else if (data.date) {
    selected = data.date;
    if (page === 'agenda') render();
  } else if (data.resolvePair) {
    const [first, second] = data.resolvePair.split(',');
    proposeResolution(first, second);
  } else if (data.event) openEvent(data.event);
  else if (data.example !== undefined) sendMessage(examples[Number(data.example)]);
  else if (data.slot) {
    const [date, start] = data.slot.split(',');
    openNew(date, Number(start));
  } else if (data.moveEvent && moveSelection) {
    const event = events.find(item => item.id === data.moveEvent);
    const request = moveSelection.request;
    moveSelection = undefined;
    if (event) proposeMove(event, request);
    else reply('Ese evento ya no está en tu agenda.');
  } else if (data.mail) {
    const item = mail.find(message => message.id === data.mail);
    if (!item || !mailNeedsAction(item)) return;
    const original = events.find(event => event.id === item.targetId);
    showProposal({ title: original?.title ?? item.title, calendar: original?.calendar ?? item.calendar,
      date: item.date, start: item.start, end: item.end, source: 'mail', mailId: item.id, targetId: item.targetId });
    root.querySelector<HTMLButtonElement>('.proposal button')?.focus({ preventScroll: true });
  }
});
document.addEventListener('change', event => {
  const input = event.target as HTMLInputElement;
  const calendar = input.dataset.calendar as CalendarId | undefined;
  if (!calendar) return;
  if (input.checked) visible.add(calendar);
  else visible.delete(calendar);
  const hadFocus = input === document.activeElement;
  render();
  if (hadFocus) root.querySelector<HTMLInputElement>(`[data-calendar="${calendar}"]`)?.focus();
});
document.addEventListener('submit', event => {
  const form = event.target as HTMLFormElement;
  const data = new FormData(form);
  event.preventDefault();
  if (form.id === 'axel-form') {
    sendMessage(String(data.get('message')));
    root.querySelector<HTMLInputElement>('#axel-message')?.focus({ preventScroll: true });
  } else if (form.id === 'priority-form') {
    for (const { id } of calendars) {
      const rank = Number(data.get(id));
      if (rank === 1 || rank === 2 || rank === 3) priorities[id] = rank;
    }
    save();
    dialog.close();
    render();
    notify('Prioridades guardadas');
  } else if (form.id === 'event-settings') {
    events = events.map(item => item.id === form.dataset.id ? { ...item, ...readEventSettings(data) } : item);
    save();
    dialog.close();
    render();
    notify('Ajustes del evento guardados');
  } else if (form.id === 'event-form') {
    const readTime = (key: string) => {
      const [hour, minute] = String(data.get(key)).split(':').map(Number);
      return hour * 60 + minute;
    };
    const start = readTime('start');
    const end = readTime('end');
    const title = String(data.get('title')).trim();
    if (!title || !Number.isFinite(start + end) || start < dayStart || end > dayEnd || end <= start) {
      form.querySelector('.form-error')!.textContent = 'Introduce un título y un intervalo válido entre las 08:00 y las 22:00.';
      return;
    }
    const draft: Draft = {
      title, date: String(data.get('date')), start, end,
      calendar: data.get('calendar') as CalendarId, source: 'manual', ...readEventSettings(data),
    };
    dialog.close();
    if (conflicts(events, draft, priorities).length) {
      showProposal(draft);
      root.querySelector<HTMLButtonElement>('.proposal .outline')?.focus({ preventScroll: true });
    } else {
      applyEvent(draft);
    }
  }
});
render();
