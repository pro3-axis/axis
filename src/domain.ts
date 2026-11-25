export type CalendarId = 'uni' | 'work' | 'personal';
export type Source = 'manual' | 'axel' | 'mail';
export type Priority = 1 | 2 | 3;
export const priorityLabels = { 1: 'Baja', 2: 'Normal', 3: 'Alta' } as const;
export type Draft = {
  title: string; date: string; start: number; end: number;
  calendar: CalendarId; source: Source; mailId?: string; locked?: boolean; priority?: Priority;
};
export type Event = Draft & { id: string };
export const calendars = [
  { id: 'uni', name: 'Universidad', icon: 'graduation-cap' },
  { id: 'work', name: 'Prácticas', icon: 'briefcase-business' },
  { id: 'personal', name: 'Personal', icon: 'heart' },
] as const;
export const demoDay = '2026-11-25';
export const dayStart = 8 * 60;
export const dayEnd = 22 * 60;
export const defaultPriorities: Record<CalendarId, Priority> = { uni: 3, work: 2, personal: 1 };
const minutes = (hours: number, mins = 0) => hours * 60 + mins;
export function dateKey(date: Date) {
  return [date.getFullYear(), date.getMonth() + 1, date.getDate()]
    .map(part => String(part).padStart(2, '0')).join('-');
}
export const fromKey = (key: string) => new Date(key + 'T12:00:00');
export function addDays(key: string, days: number) {
  const date = fromKey(key);
  date.setDate(date.getDate() + days);
  return dateKey(date);
}
export const weekStart = (key: string) => addDays(key, -((fromKey(key).getDay() + 6) % 7));
export const clock = (value: number) =>
  String(Math.floor(value / 60)).padStart(2, '0') + ':' + String(value % 60).padStart(2, '0');
export const dateLabel = (key: string, options: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat('es-ES', options).format(fromKey(key));
export function overlaps(event: Event, draft: Draft) {
  return event.date === draft.date && event.start < draft.end && draft.start < event.end;
}
export function eventPriority(event: Draft, priorities = defaultPriorities) {
  return event.priority ?? priorities[event.calendar];
}
export function conflicts(events: Event[], draft: Draft, priorities = defaultPriorities) {
  return events.filter(event => overlaps(event, draft))
    .sort((a, b) => eventPriority(b, priorities) - eventPriority(a, priorities) || a.start - b.start);
}
export function nextSlot(events: Event[], draft: Draft): Draft | undefined {
  const duration = draft.end - draft.start;
  for (let day = 0; day < 7; day++) {
    const date = addDays(draft.date, day);
    const first = day === 0 ? Math.ceil(draft.start / 15) * 15 : dayStart;
    for (let start = first; start + duration <= dayEnd; start += 15) {
      const candidate = { ...draft, date, start, end: start + duration };
      if (!events.some(event => overlaps(event, candidate))) return candidate;
    }
  }
}
export function overlapPairs(events: Event[]) {
  return events.flatMap((event, index) => events.slice(index + 1)
    .filter(other => overlaps(event, other))
    .map(other => [event, other] as const));
}

function closestSlot(events: Event[], event: Event) {
  const duration = event.end - event.start;
  const lastStart = dayEnd - duration;
  let best: { draft: Event; distance: number } | undefined;
  for (let offset = -6; offset <= 6; offset++) {
    const date = addDays(event.date, offset);
    const occupied = events.filter(other => other.date === date && other.id !== event.id);
    // The nearest free start is either the original start or at the edge of a busy interval or day.
    const starts = [event.start, dayStart, lastStart,
      ...occupied.flatMap(other => [other.start - duration, other.end])];
    for (const start of starts) {
      if (start < dayStart || start > lastStart) continue;
      const draft = { ...event, date, start, end: start + duration };
      const distance = Math.abs(offset * 1440 + start - event.start);
      if ((!best || distance < best.distance) && !occupied.some(other => overlaps(other, draft))) {
        best = { draft, distance };
      }
    }
  }
  return best;
}

export function resolveOverlap(events: Event[], pair: readonly [Event, Event], priorities = defaultPriorities) {
  const flexible = pair.filter(event => !event.locked);
  if (!flexible.length) return;
  const lowest = Math.min(...flexible.map(event => eventPriority(event, priorities)));
  return flexible.filter(event => eventPriority(event, priorities) === lowest)
    .map(event => closestSlot(events, event))
    .filter(slot => slot !== undefined)
    .sort((a, b) => a.distance - b.distance)[0]?.draft;
}

const weekdays = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
const normalize = (text: string) => text.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();

const weekdayPattern = 'lunes|martes|mi[ée]rcoles|jueves|viernes|s[áa]bado|domingo';
const monthDatePattern = String.raw`\d{1,2}(?:\/\d{1,2}(?:\/\d{4})?|\s+de\s+[a-z]+(?:\s+de\s+\d{4})?)?`;
const countedWeekday = String.raw`(?:(?:${weekdayPattern})\s+\d{1,2}|\d{1,2}\s+(?:${weekdayPattern}))`;
const axelDay = String.raw`((?:(?:siguiente|pr[óo]ximo)\s+)?(?:${weekdayPattern})|${countedWeekday}|${monthDatePattern})`;
const eventWithDay = new RegExp(String.raw`^(.+?)\s+el\s+(?:día\s+)?${axelDay}$`, 'iu');
const moveWithDay = new RegExp(String.raw`^(.+?)\s+(?:el|al|para\s+el)\s+(?:día\s+)?${axelDay}$`, 'iu');
const moveFromDay = new RegExp(String.raw`^(.+?)\s+del\s+(?:d[ií]a\s+)?${axelDay}$`, 'iu');

function numberedWeekday(selected: string, weekday: number, day: number): string | undefined {
  if (day < 1 || day > 31) return;
  const date = fromKey(selected);
  date.setDate(1);
  for (let month = 0; month < 24; month++) {
    const candidate = new Date(date);
    candidate.setDate(day);
    const key = dateKey(candidate);
    if (candidate.getMonth() === date.getMonth() && candidate.getDay() === weekday && key >= selected) return key;
    date.setMonth(date.getMonth() + 1);
  }
}

function axelDate(day: string, selected: string): string | undefined {
  const normalized = normalize(day);
  const next = /^(?:siguiente|proximo)\s+/.test(normalized);
  const weekday = weekdays.indexOf(normalized.replace(/^(?:siguiente|proximo)\s+/, ''));
  if (weekday >= 0) {
    const offset = (weekday - fromKey(selected).getDay() + 7) % 7;
    return addDays(selected, next && offset === 0 ? 7 : offset);
  }

  const [first, second] = normalized.split(/\s+/);
  const firstWeekday = weekdays.indexOf(first);
  const secondWeekday = weekdays.indexOf(second);
  if (firstWeekday >= 0 && /^\d{1,2}$/.test(second)) return numberedWeekday(selected, firstWeekday, Number(second));
  if (secondWeekday >= 0 && /^\d{1,2}$/.test(first)) return numberedWeekday(selected, secondWeekday, Number(first));

  const written = normalized.match(/^(\d{1,2})\s+de\s+([a-z]+)(?:\s+de\s+(\d{4}))?$/);
  const numeric = normalized.match(/^(\d{1,2})(?:\/(\d{1,2})(?:\/(\d{4}))?)?$/);
  if (!written && !numeric) return;
  const dayNumber = Number(written?.[1] ?? numeric?.[1]);
  const month = written ? months.indexOf(written[2]) + 1 : Number(numeric?.[2] ?? selected.slice(5, 7));
  const year = written?.[3] ?? numeric?.[3] ?? selected.slice(0, 4);
  const key = `${year}-${String(month).padStart(2, '0')}-${String(dayNumber).padStart(2, '0')}`;
  if (dateKey(fromKey(key)) === key) return key;
}

function axelTime(text: string) {
  const [hours, mins = 0] = text.split(':').map(Number);
  return mins < 60 ? minutes(hours, mins) : NaN;
}

function readAxelSchedule(input: string, selected: string, move = false) {
  const match = input.trim().match(/^(.+?)\s+(?:(de)(?:\s+las?)?|a\s+las?)\s+(\d{1,2}(?::\d{2})?)(?:\s+a(?:\s+las?)?\s+(\d{1,2}(?::\d{2})?))?\s*(?:en\s+(universidad|pr[áa]cticas|personal))?\s*[.!]?$/iu);
  if (!match) return;
  const [, eventText, range, startText, endText, name] = match;
  if (Boolean(range) !== Boolean(endText)) return;
  const withDay = eventText.match(move ? moveWithDay : eventWithDay);
  const date = withDay ? axelDate(withDay[2], selected) : undefined;
  if (withDay && !date) return;
  const title = (withDay?.[1] ?? eventText).trim();
  const start = axelTime(startText);
  const end = endText ? axelTime(endText) : undefined;
  if (!(start >= dayStart && start < dayEnd)) return;
  if (end !== undefined && !(start < end && end <= dayEnd)) return;
  return { title, date, start, end, name };
}

export function parseAxel(input: string, selected: string): Draft | undefined {
  const schedule = readAxelSchedule(input, selected);
  if (!schedule) return;
  const { date = selected, start, end = start + 60, name } = schedule;
  const title = schedule.title.replace(/^tengo\s+(?:(?:un|una)\s+)?/iu, '').trim();
  if (!title || title.length > 80 || end > dayEnd) return;
  const calendar = name && calendars.find(item => normalize(item.name) === normalize(name));
  return { title: title[0].toUpperCase() + title.slice(1), date, start, end, calendar: calendar ? calendar.id : 'personal', source: 'axel' };
}

export function parseAxelMove(input: string, selected: string) {
  const command = input.trim().match(/^(?:cambia(?:r)?|mueve|mover|reprograma(?:r)?)(?:\s+|$)(.*)$/iu);
  if (!command) return undefined;
  const schedule = readAxelSchedule(command[1], selected, true);
  if (!schedule || schedule.name) return null;
  const origin = schedule.title.match(moveFromDay);
  if (!origin) return { ...schedule, fromDate: undefined };

  const [, title, day] = origin;
  // A bare weekday identifies an event in the selected week, even if the day has passed.
  const reference = weekdays.includes(normalize(day)) ? weekStart(selected) : selected;
  const fromDate = axelDate(day, reference);
  return fromDate ? { ...schedule, title, fromDate } : null;
}

function normalizeEventTitle(title: string) {
  return normalize(title).replace(/[^\p{L}\p{N}]+/gu, ' ').trim().replace(/^(?:el|la|los|las|un|una)\s+/, '');
}

export function findEventsToMove(events: Event[], title: string, fromDate?: string) {
  const query = normalizeEventTitle(title);
  if (!query) return [];
  const candidates = fromDate ? events.filter(event => event.date === fromDate) : events;
  const exact = candidates.filter(event => normalizeEventTitle(event.title) === query);
  if (exact.length) return exact;
  return candidates.filter(event => ` ${normalizeEventTitle(event.title)} `.includes(` ${query} `));
}

const sample: [number, string, CalendarId, number, number][] = [
  [-2, 'Bases de datos', 'uni', 9, 10.5], [-2, 'Revisión de proyecto', 'work', 12, 13.5], [-2, 'Gimnasio', 'personal', 17, 18.5],
  [-1, 'Física computacional', 'uni', 10, 11.5], [-1, 'Sprint planning', 'work', 15, 16.5],
  [0, 'Laboratorio de redes', 'uni', 9, 10.5], [0, 'Comida con Ana', 'personal', 13, 14.5],
  [0, 'Reunión de prácticas', 'work', 16, 17.5], [0, 'Entrenamiento', 'personal', 18, 19.5],
  [1, 'Ingeniería del software', 'uni', 10, 11.5], [1, 'Revisión de código', 'work', 14, 15.5],
  [2, 'Entrega del sprint', 'work', 9, 10.5], [2, 'Tutoría de proyectos', 'uni', 12, 13.5], [2, 'Cena con amigos', 'personal', 18, 19.5],
];
export const seedEvents: Event[] = sample.map(([day, title, calendar, start, end], index) =>
  ({ id: 'seed-' + index, title, calendar, date: addDays(demoDay, day), start: minutes(start), end: minutes(end), source: 'manual' }));
type MailItem = Pick<Draft, 'title' | 'date' | 'start' | 'end' | 'calendar'> & {
  id: string; sender: string; time: string; text: string; targetId?: string;
};
export const mail: readonly MailItem[] = [
  {
    id: 'practice-rescheduled', targetId: 'seed-7', sender: 'Equipo de prácticas',
    time: '10:05', title: 'Cambio de hora de la reunión de prácticas',
    text: 'La reunión de prácticas del miércoles a las 16:00 pasa al jueves 26 de noviembre, de 10:00 a 11:30.',
    date: addDays(demoDay, 1), start: minutes(10), end: minutes(11, 30), calendar: 'work',
  },
  { id: 'lab', sender: 'Coordinación académica', time: '09:24', title: 'Tutoría de laboratorio', text: 'Sesión de repaso el miércoles a las 11:30 en el aula B02.', date: demoDay, start: minutes(11, 30), end: minutes(12, 30), calendar: 'uni' },
  { id: 'sync', sender: 'Equipo de prácticas', time: '08:51', title: 'Seguimiento de prácticas', text: 'Revisión de tareas este miércoles a las 16:30.', date: demoDay, start: minutes(16, 30), end: minutes(17, 30), calendar: 'work' },
  { id: 'plan', sender: 'Ana García', time: 'Ayer', title: 'Café para ponernos al día', text: '¿Nos vemos el jueves a las 17:00?', date: addDays(demoDay, 1), start: minutes(17), end: minutes(18), calendar: 'personal' },
];
