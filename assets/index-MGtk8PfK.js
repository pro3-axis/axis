(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=`
<svg
  class="lucide lucide-arrow-up"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="m5 12 7-7 7 7" />
  <path d="M12 19V5" />
</svg>
`,t=`
<svg
  class="lucide lucide-book-open"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M12 5v16" />
  <path d="M20.001 19A2 2 0 0022 17V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2z" />
</svg>
`,n=`
<svg
  class="lucide lucide-briefcase-business"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M12 12h.01" />
  <path d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
  <path d="M22 13a18.15 18.15 0 0 1-20 0" />
  <rect width="20" height="14" x="2" y="6" rx="2" />
</svg>
`,r=`
<svg
  class="lucide lucide-calendar-days"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M8 2v3" />
  <path d="M16 2v3" />
  <rect x="3" y="3" width="18" height="18" rx="2" />
  <path d="M3 9h18" />
  <path d="M8 13h.01" />
  <path d="M12 13h.01" />
  <path d="M16 13h.01" />
  <path d="M8 17h.01" />
  <path d="M12 17h.01" />
  <path d="M16 17h.01" />
</svg>
`,i=`
<svg
  class="lucide lucide-check"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M20 6 9 17l-5-5" />
</svg>
`,a=`
<svg
  class="lucide lucide-chevron-left"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="m15 18-6-6 6-6" />
</svg>
`,o=`
<svg
  class="lucide lucide-chevron-right"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="m9 18 6-6-6-6" />
</svg>
`,s=`
<svg
  class="lucide lucide-circle-check"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <circle cx="12" cy="12" r="10" />
  <path d="m16 9-5.5 5.5L8 12" />
</svg>
`,c=`
<svg
  class="lucide lucide-graduation-cap"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
  <path d="M22 10v6" />
  <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
</svg>
`,l=`
<svg
  class="lucide lucide-heart"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
</svg>
`,u=`
<svg
  class="lucide lucide-inbox"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
  <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
</svg>
`,d=`
<svg
  class="lucide lucide-lock"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
</svg>
`,f=`
<svg
  class="lucide lucide-panel-right-close"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <rect width="18" height="18" x="3" y="3" rx="2" />
  <path d="M15 3v18" />
  <path d="m8 9 3 3-3 3" />
</svg>
`,p=`
<svg
  class="lucide lucide-plus"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M5 12h14" />
  <path d="M12 5v14" />
</svg>
`,ee=`
<svg
  class="lucide lucide-sliders-horizontal"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M10 5H3" />
  <path d="M12 19H3" />
  <path d="M14 3v4" />
  <path d="M16 17v4" />
  <path d="M21 12h-9" />
  <path d="M21 19h-5" />
  <path d="M21 5h-7" />
  <path d="M8 10v4" />
  <path d="M8 12H3" />
</svg>
`,te=`
<svg
  class="lucide lucide-sparkles"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" />
  <path d="M20 2v4" />
  <path d="M22 4h-4" />
  <circle cx="4" cy="20" r="2" />
</svg>
`,ne=`
<svg
  class="lucide lucide-triangle-exclamation-point"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
  <path d="M12 9v4" />
  <path d="M12 17h.01" />
</svg>
`,re=`
<svg
  class="lucide lucide-x"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M18 6 6 18" />
  <path d="m6 6 12 12" />
</svg>
`,m={1:`Baja`,2:`Normal`,3:`Alta`},h=[{id:`uni`,name:`Universidad`,icon:`graduation-cap`},{id:`work`,name:`Prácticas`,icon:`briefcase-business`},{id:`personal`,name:`Personal`,icon:`heart`}],g=`2026-11-25`,_=1320,ie={uni:3,work:2,personal:1},v=(e,t=0)=>e*60+t;function ae(e){return[e.getFullYear(),e.getMonth()+1,e.getDate()].map(e=>String(e).padStart(2,`0`)).join(`-`)}var y=e=>new Date(e+`T12:00:00`);function b(e,t){let n=y(e);return n.setDate(n.getDate()+t),ae(n)}var x=e=>b(e,-((y(e).getDay()+6)%7)),S=e=>String(Math.floor(e/60)).padStart(2,`0`)+`:`+String(e%60).padStart(2,`0`),C=(e,t)=>new Intl.DateTimeFormat(`es-ES`,t).format(y(e));function w(e,t){return e.date===t.date&&e.start<t.end&&t.start<e.end}function T(e,t=ie){return e.priority??t[e.calendar]}function E(e,t,n=ie){return e.filter(e=>w(e,t)).sort((e,t)=>T(t,n)-T(e,n)||e.start-t.start)}function oe(e,t){let n=t.end-t.start;for(let r=0;r<7;r++){let i=b(t.date,r),a=r===0?Math.ceil(t.start/15)*15:480;for(let r=a;r+n<=_;r+=15){let a={...t,date:i,start:r,end:r+n};if(!e.some(e=>w(e,a)))return a}}}function se(e){return e.flatMap((t,n)=>e.slice(n+1).filter(e=>w(t,e)).map(e=>[t,e]))}function ce(e,t){let n=t.end-t.start,r=_-n,i;for(let a=-6;a<=6;a++){let o=b(t.date,a),s=e.filter(e=>e.date===o&&e.id!==t.id),c=[t.start,480,r,...s.flatMap(e=>[e.start-n,e.end])];for(let e of c){if(e<480||e>r)continue;let c={...t,date:o,start:e,end:e+n},l=Math.abs(a*1440+e-t.start);(!i||l<i.distance)&&!s.some(e=>w(e,c))&&(i={draft:c,distance:l})}}return i}function le(e,t,n=ie){let r=t.filter(e=>!e.locked);if(!r.length)return;let i=Math.min(...r.map(e=>T(e,n)));return r.filter(e=>T(e,n)===i).map(t=>ce(e,t)).filter(e=>e!==void 0).sort((e,t)=>e.distance-t.distance)[0]?.draft}var D=[`domingo`,`lunes`,`martes`,`miercoles`,`jueves`,`viernes`,`sabado`],ue=[`enero`,`febrero`,`marzo`,`abril`,`mayo`,`junio`,`julio`,`agosto`,`septiembre`,`octubre`,`noviembre`,`diciembre`],O=e=>e.normalize(`NFD`).replace(/\p{Diacritic}/gu,``).toLowerCase(),de=`lunes|martes|mi[ée]rcoles|jueves|viernes|s[áa]bado|domingo`,fe=String.raw`\d{1,2}(?:\/\d{1,2}(?:\/\d{4})?|\s+de\s+[a-z]+(?:\s+de\s+\d{4})?)?`,pe=String.raw`(?:(?:${de})\s+\d{1,2}|\d{1,2}\s+(?:${de}))`,me=String.raw`((?:(?:siguiente|pr[óo]ximo)\s+)?(?:${de})|${pe}|${fe})`,he=new RegExp(String.raw`^(.+?)\s+el\s+(?:día\s+)?${me}$`,`iu`),ge=new RegExp(String.raw`^(.+?)\s+(?:el|al|para\s+el)\s+(?:día\s+)?${me}$`,`iu`),_e=new RegExp(String.raw`^(.+?)\s+del\s+(?:d[ií]a\s+)?${me}$`,`iu`);function ve(e,t,n){if(n<1||n>31)return;let r=y(e);r.setDate(1);for(let i=0;i<24;i++){let i=new Date(r);i.setDate(n);let a=ae(i);if(i.getMonth()===r.getMonth()&&i.getDay()===t&&a>=e)return a;r.setMonth(r.getMonth()+1)}}function ye(e,t){let n=O(e),r=/^(?:siguiente|proximo)\s+/.test(n),i=D.indexOf(n.replace(/^(?:siguiente|proximo)\s+/,``));if(i>=0){let e=(i-y(t).getDay()+7)%7;return b(t,r&&e===0?7:e)}let[a,o]=n.split(/\s+/),s=D.indexOf(a),c=D.indexOf(o);if(s>=0&&/^\d{1,2}$/.test(o))return ve(t,s,Number(o));if(c>=0&&/^\d{1,2}$/.test(a))return ve(t,c,Number(a));let l=n.match(/^(\d{1,2})\s+de\s+([a-z]+)(?:\s+de\s+(\d{4}))?$/),u=n.match(/^(\d{1,2})(?:\/(\d{1,2})(?:\/(\d{4}))?)?$/);if(!l&&!u)return;let d=Number(l?.[1]??u?.[1]),f=l?ue.indexOf(l[2])+1:Number(u?.[2]??t.slice(5,7)),p=`${l?.[3]??u?.[3]??t.slice(0,4)}-${String(f).padStart(2,`0`)}-${String(d).padStart(2,`0`)}`;if(ae(y(p))===p)return p}function be(e){let[t,n=0]=e.split(`:`).map(Number);return n<60?v(t,n):NaN}function xe(e,t,n=!1){let r=e.trim().match(/^(.+?)\s+(?:(de)(?:\s+las?)?|a\s+las?)\s+(\d{1,2}(?::\d{2})?)(?:\s+a(?:\s+las?)?\s+(\d{1,2}(?::\d{2})?))?\s*(?:en\s+(universidad|pr[áa]cticas|personal))?\s*[.!]?$/iu);if(!r)return;let[,i,a,o,s,c]=r;if(!!a!=!!s)return;let l=i.match(n?ge:he),u=l?ye(l[2],t):void 0;if(l&&!u)return;let d=(l?.[1]??i).trim(),f=be(o),p=s?be(s):void 0;if(f>=480&&f<1320&&(p===void 0||f<p&&p<=1320))return{title:d,date:u,start:f,end:p,name:c}}function Se(e,t){let n=xe(e,t);if(!n)return;let{date:r=t,start:i,end:a=i+60,name:o}=n,s=n.title.replace(/^tengo\s+(?:(?:un|una)\s+)?/iu,``).trim();if(!s||s.length>80||a>1320)return;let c=o&&h.find(e=>O(e.name)===O(o));return{title:s[0].toUpperCase()+s.slice(1),date:r,start:i,end:a,calendar:c?c.id:`personal`,source:`axel`}}function Ce(e,t){let n=e.trim().match(/^(?:cambia(?:r)?|mueve|mover|reprograma(?:r)?)(?:\s+|$)(.*)$/iu);if(!n)return;let r=xe(n[1],t,!0);if(!r||r.name)return null;let i=r.title.match(_e);if(!i)return{...r,fromDate:void 0};let[,a,o]=i,s=ye(o,D.includes(O(o))?x(t):t);return s?{...r,title:a,fromDate:s}:null}function we(e){return O(e).replace(/[^\p{L}\p{N}]+/gu,` `).trim().replace(/^(?:el|la|los|las|un|una)\s+/,``)}function Te(e,t,n){let r=we(t);if(!r)return[];let i=n?e.filter(e=>e.date===n):e,a=i.filter(e=>we(e.title)===r);return a.length?a:i.filter(e=>` ${we(e.title)} `.includes(` ${r} `))}var Ee=[[-2,`Bases de datos`,`uni`,9,10.5],[-2,`Revisión de proyecto`,`work`,12,13.5],[-2,`Gimnasio`,`personal`,17,18.5],[-1,`Física computacional`,`uni`,10,11.5],[-1,`Sprint planning`,`work`,15,16.5],[0,`Laboratorio de redes`,`uni`,9,10.5],[0,`Comida con Ana`,`personal`,13,14.5],[0,`Reunión de prácticas`,`work`,16,17.5],[0,`Entrenamiento`,`personal`,18,19.5],[1,`Ingeniería del software`,`uni`,10,11.5],[1,`Revisión de código`,`work`,14,15.5],[2,`Entrega del sprint`,`work`,9,10.5],[2,`Tutoría de proyectos`,`uni`,12,13.5],[2,`Cena con amigos`,`personal`,18,19.5]].map(([e,t,n,r,i],a)=>({id:`seed-`+a,title:t,calendar:n,date:b(g,e),start:v(r),end:v(i),source:`manual`})),De=[{id:`practice-rescheduled`,targetId:`seed-7`,sender:`Equipo de prácticas`,time:`10:05`,title:`Cambio de hora de la reunión de prácticas`,text:`La reunión de prácticas del miércoles a las 16:00 pasa al jueves 26 de noviembre, de 10:00 a 11:30.`,date:b(g,1),start:v(10),end:v(11,30),calendar:`work`},{id:`lab`,sender:`Coordinación académica`,time:`09:24`,title:`Tutoría de laboratorio`,text:`Sesión de repaso el miércoles a las 11:30 en el aula B02.`,date:g,start:v(11,30),end:v(12,30),calendar:`uni`},{id:`sync`,sender:`Equipo de prácticas`,time:`08:51`,title:`Seguimiento de prácticas`,text:`Revisión de tareas este miércoles a las 16:30.`,date:g,start:v(16,30),end:v(17,30),calendar:`work`},{id:`plan`,sender:`Ana García`,time:`Ayer`,title:`Café para ponernos al día`,text:`¿Nos vemos el jueves a las 17:00?`,date:b(g,1),start:v(17),end:v(18),calendar:`personal`}],k=document.querySelector(`#app`),A=document.querySelector(`#dialog`),Oe=document.querySelector(`#toast`),ke=`axis-sprint3-v1`;function Ae(){try{let e=localStorage.getItem(ke);if(e)return JSON.parse(e)}catch{}return{events:Ee,priorities:{...ie}}}var{events:j,priorities:M,resolvedChanges:N=[]}=Ae(),P=g,F=`week`,I=`agenda`,L=!matchMedia(`(max-width: 900px)`).matches,R,z,B=[],V=new Set(h.map(e=>e.id)),je;function H(){try{localStorage.setItem(ke,JSON.stringify({events:j,priorities:M,resolvedChanges:N}))}catch{Y(`Los cambios estarán disponibles durante esta sesión.`)}}var U=e=>e.replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`})[e]),Me={"arrow-up":e,"book-open":t,"briefcase-business":n,"calendar-days":r,check:i,"chevron-left":a,"chevron-right":o,"circle-check":s,"graduation-cap":c,heart:l,inbox:u,lock:d,"panel-right-close":f,plus:p,"sliders-horizontal":ee,sparkles:te,"triangle-alert":ne,x:re},W=(e,t=18)=>`<span class="icon" style="--icon-size:${t}px" aria-hidden="true">${Me[e]}</span>`,Ne=(e=``)=>`<span class="robot ${e}" aria-hidden="true"><i></i><b></b><em></em></span>`,Pe=e=>e[0].toUpperCase()+e.slice(1),G=e=>`${S(e.start)} – ${S(e.end)}`,K=e=>`${Pe(C(e.date,{weekday:`long`,day:`numeric`,month:`short`}))} · ${G(e)}`,Fe=e=>e.targetId?N.includes(e.id):j.some(t=>t.mailId===e.id),q=e=>!Fe(e)&&(!e.targetId||j.some(t=>t.id===e.targetId)),Ie=e=>h.find(t=>t.id===e),J=(e,t,n)=>`<button class="icon-btn" type="button" data-action="${e}" title="${t}" aria-label="${t}">${W(n)}</button>`,Le=(e,t,n)=>`${e} ${e===1?t:n}`,Re=[`Tutoría el siguiente jueves a las 17:00`,`Reunión el miércoles a las 16:30`,`Estudiar mates el 3 de diciembre de 9 a 11`,`Mueve la reunión de prácticas al viernes a las 12:30`],ze=Array.from({length:(_-480)/60},(e,t)=>480+t*60);function Y(e){Oe.textContent=e,Oe.classList.add(`show`),window.clearTimeout(je),je=window.setTimeout(()=>Oe.classList.remove(`show`),3600)}function Be(){let e=[...h].sort((e,t)=>M[t.id]-M[e.id]);return`<aside class="sidebar">
    <nav class="main-nav" aria-label="Aplicación">
      <button data-action="agenda" class="${I===`agenda`?`active`:``}" ${I===`agenda`?`aria-current="page"`:``}>${W(`calendar-days`)} Agenda</button>
      <button data-action="inbox" class="${I===`inbox`?`active`:``}" ${I===`inbox`?`aria-current="page"`:``}>${W(`inbox`)} Correo <span class="nav-count">${De.filter(q).length}</span></button>
    </nav>
    <div class="side-rule"></div>
    <div class="side-caption"><h2>Mis calendarios</h2>${J(`priorities`,`Editar prioridades`,`sliders-horizontal`)}</div>
    <div class="calendars">${e.map(e=>`<label class="calendar-filter ${e.id}">
      <input type="checkbox" data-calendar="${e.id}" ${V.has(e.id)?`checked`:``}>
      <span class="cal-dot">${W(`check`,12)}</span><span>${e.name}</span>
    </label>`).join(``)}</div>
    <div class="sidebar-bottom"><div class="avatar">R</div><div><strong>Rafa</strong><small>Espacio de demostración</small></div></div>
  </aside>`}function Ve(){if(F===`day`)return Pe(C(P,{weekday:`long`,day:`numeric`,month:`long`,year:`numeric`}));let e=x(P),t=b(e,6),n={day:`numeric`,month:`long`};return`${e.slice(0,7)===t.slice(0,7)?Number(e.slice(-2)):C(e,n)} – ${C(t,{...n,year:`numeric`})}`}function He(e,t){let n=t.filter(t=>t.date===e).sort((e,t)=>e.start-t.start||T(t,M)-T(e,M)||t.end-e.end),r=[],i=[],a=[];function o(){a.push(...i.map(e=>({...e,count:r.length}))),r.length=0,i=[]}for(let e of n){r.every(t=>t.end<=e.start)&&o();let t=r.findIndex(t=>t.end<=e.start);t===-1&&(t=r.length),r[t]=e,i.push({event:e,lane:t})}return o(),a.map(({event:e,lane:t,count:n})=>{let r=(e.start-480)/60,i=(e.end-e.start)/60,a=j.some(t=>t.id!==e.id&&w(t,e));return`<button class="event ${e.calendar}${a?` has-conflict`:``}${i<1?` short`:``}" data-event="${e.id}"
      style="--top:${r};--length:${i};--lane:${t};--lanes:${n}" title="${U(e.title)} · ${G(e)}"
      aria-label="${U(e.title)} · ${G(e)}${e.locked?` · Horario bloqueado`:``}${a?` · Con conflicto`:``}">
      <span class="event-time">${S(e.start)}<span class="event-symbols">${e.locked?W(`lock`,12):``}${a?W(`triangle-alert`,12):``}</span></span><strong>${U(e.title)}</strong>
    </button>`}).join(``)}function Ue(){let e=F===`day`?[P]:Array.from({length:7},(e,t)=>b(x(P),t)),t=j.filter(t=>e.includes(t.date)),n=t.filter(e=>t.some(t=>t.id!==e.id&&w(t,e))),r=t.filter(e=>V.has(e.calendar)),i=C(P,{hour:`numeric`,timeZoneName:`short`,timeZone:`Europe/Madrid`}).split(` `).at(-1);return`<main class="main">
    <div class="section-head"><div><h1>Mi agenda</h1><p>Universidad, prácticas y vida personal en un solo lugar.</p></div>
      <button class="primary new-event" data-action="new">${W(`plus`,18)} Nuevo evento</button></div>
    <section class="schedule ${F===`day`?`single-day`:``}" aria-label="Calendario">
      <div class="schedule-toolbar">
        <div class="date-navigation"><button data-action="today" class="outline" title="Ir al día de la demostración">Hoy</button>
          <div class="arrow-group">${J(`previous`,`Periodo anterior`,`chevron-left`)}${J(`next`,`Periodo siguiente`,`chevron-right`)}</div>
          <h2>${Ve()}</h2></div>
        <div class="switch" aria-label="Vista de calendario"><button data-action="week" aria-pressed="${F===`week`}">Semana</button><button data-action="day" aria-pressed="${F===`day`}">Día</button></div>
      </div>
      <div class="schedule-scroll" tabindex="0" aria-label="Cuadrícula de horarios">
        <div class="schedule-inner" style="--days:${e.length}">
          <div class="day-heads"><div class="timezone" title="Hora de Madrid">${i}</div>
            ${e.map(e=>`<button class="day-head ${e===P?`selected`:``}" data-date="${e}" aria-pressed="${e===P}"><span>${C(e,{weekday:`short`}).replace(`.`,``)}</span><strong>${Number(e.slice(-2))}</strong></button>`).join(``)}
          </div>
          <div class="grid-body">
            <div class="hour-axis">${ze.map(e=>`<div>${S(e)}</div>`).join(``)}</div>
            ${e.map(e=>`<div class="day-column ${e===P?`selected`:``} ${[0,6].includes(new Date(e+`T12:00:00`).getDay())?`weekend`:``}">
              ${ze.map(t=>`<button tabindex="-1" class="hour-slot" data-slot="${e},${t}" aria-label="Nuevo evento a las ${S(t)}"></button>`).join(``)}
              ${He(e,r)}
            </div>`).join(``)}
          </div>
        </div>
      </div>
      <div class="schedule-footer"><span>${Le(r.length,`evento visible`,`eventos visibles`)}</span><span class="conflict-status ${n.length?`warning`:``}">${W(n.length?`triangle-alert`:`circle-check`,16)} ${n.length?Le(n.length,`evento con conflicto`,`eventos con conflicto`):`Sin conflictos en la agenda`}</span>${n.length?`<button class="outline" data-action="resolve-overlap">Resolver solape</button>`:``}</div>
    </section>
  </main>`}function We(e){let t=Fe(e),n=!!e.targetId,r=q(e),i=n?`Cambio aplicado`:`En agenda`,a=n?`Revisar cambio`:`Revisar propuesta`;return`<article class="mail-card${n&&r?` mail-change`:``}">
    <div class="mail-icon ${e.calendar}">${W(Ie(e.calendar).icon,21)}</div>
    <div class="mail-content"><div class="mail-meta"><strong>${e.sender}</strong><span>${e.time}</span></div>
      <h3>${e.title}</h3><p>${e.text}</p>
      <div class="mail-actions">
        <span class="mail-date">${W(t?`circle-check`:`calendar-days`,16)}
          ${t?i:r?K({...e,source:`mail`}):`Evento original no disponible`}
        </span>
        ${r?`<button class="${n?`primary`:`outline`}" data-mail="${e.id}">${a}</button>`:``}
      </div>
    </div>
  </article>`}function Ge(){let e=[...De].sort((e,t)=>Number(!!t.targetId)-Number(!!e.targetId)||M[t.calendar]-M[e.calendar]),t=e.filter(q),n=e.filter(e=>!q(e));return`<main class="main inbox"><div class="section-head"><div><h1>Correo</h1><p>Revisa las propuestas y los cambios de horario de tus correos de prueba.</p></div></div>
    <section class="inbox-section" aria-labelledby="mail-action-heading">
      <h2 id="mail-action-heading">Requieren acción <span class="nav-count">${t.length}</span></h2>
      <div class="mail-list">${t.map(We).join(``)||`<p class="mail-empty">Estás al día.</p>`}</div>
    </section>
    ${n.length?`<section class="inbox-section" aria-labelledby="mail-other-heading">
      <h2 id="mail-other-heading">Otros correos</h2><div class="mail-list">${n.map(We).join(``)}</div>
    </section>`:``}
  </main>`}function Ke(){if(!R)return``;let e=j.find(e=>e.id===R?.targetId),t=j.filter(e=>e.id!==R?.targetId),n=t.find(e=>e.id===R?.overlapWith),r=!!e?.locked,i=!(!R.overlapWith||e&&n&&w(e,n)),a=E(t,R,M),o=a.length&&!R.overlapWith&&!r?oe(t,R):void 0,s=!!R.targetId,c=s&&R.source===`mail`,l=s&&!e,u=s?`Confirmar cambio`:`Confirmar`,d=R.source===`manual`?`Guardar en este hueco`:`Usar hueco`,f=a.length?`${o?`<button class="primary" data-action="alternative">${d}</button>`:``}
       ${c?`<button class="outline" data-action="accept-overlap">Aceptar con solape</button>`:``}`:`<button class="primary" data-action="confirm">${u}</button>`,p=l||r||i||a.length>0,ee=l?`Evento original no disponible`:r?`Horario bloqueado`:i?`El solape ya no está disponible`:a.length?`Hay un conflicto`:n?`Propuesta para resolver el solape`:`Horario disponible`;return`<section class="proposal" aria-label="${s?`Propuesta de cambio de horario`:`Propuesta de evento`}">
    <div class="proposal-title ${p?`warning`:``}">${W(p?`triangle-alert`:`circle-check`,17)}
      <strong>${ee}</strong></div>
    <strong class="proposal-event">${U(R.title)}</strong>
    ${r&&e?`<p>Desbloquea el horario en el detalle del evento para moverlo.</p><div>${K(e)}</div>`:e?`<dl class="change-times">
      <div><dt>Antes</dt><dd>${K(e)}</dd></div>
      <div><dt>Después</dt><dd>${K(R)}</dd></div>
    </dl>`:`<div>${K(R)}</div>`}
    <div class="${R.calendar} proposal-calendar"><span class="dot"></span>${Ie(R.calendar).name}</div>
    ${n&&!i&&!r?`<p class="slot-explanation">Se mantiene «${U(n.title)}» en su horario.</p>`:``}
    ${a.length&&!l&&!r&&!i?`<ul>${a.map(e=>`<li><strong>${U(e.title)}</strong> · ${G(e)}</li>`).join(``)}</ul>
      <div class="slot-explanation">${o?`Siguiente hueco <strong>${K(o)}</strong>`:R.overlapWith?`Vuelve a resolver el solape para revisar otro horario.`:`No hay un hueco libre en los próximos 7 días.`}</div>`:``}
    <div class="proposal-actions"><button class="outline" data-action="dismiss">${c?`Volver al correo`:`Descartar`}</button>${l||r||i?``:f}</div>
  </section>`}function qe(){return z?`<section class="proposal move-choices" aria-label="Eventos para mover">
    ${z.events.map(e=>`<button class="outline" data-move-event="${e.id}">
      <strong>${U(e.title)}</strong><span>${K(e)}</span>
    </button>`).join(``)}
    <button class="outline" data-action="dismiss">Descartar</button>
  </section>`:``}function Je(){return`<aside class="axel" aria-label="Axel, asistente">
    <div class="axel-header">${Ne(`tiny`)}<div><h2>Axel</h2><p>Tu asistente de agenda</p></div>${J(`toggle-axel`,`Cerrar Axel`,`panel-right-close`)}</div>
    <div class="conversation">
      <div class="assistant-welcome">${Ne()}<div class="welcome-sparkle">${W(`sparkles`,19)}</div></div>
      <div class="bubble assistant greeting"><strong>¡Hola, Rafa!</strong><p>Dime qué quieres agendar, qué día y a qué hora.</p></div>
      <div class="quick-prompts"><span>Prueba con</span>${Re.map((e,t)=>`<button data-example="${t}">${W(t===1||t===3?`briefcase-business`:`book-open`,15)} ${e}</button>`).join(``)}</div>
      ${B.map(e=>`<div class="bubble ${e.type}">${U(e.text)}</div>`).join(``)}
      ${qe()}
      ${Ke()}
    </div>
    <div class="axel-input"><form id="axel-form"><label class="sr-only" for="axel-message">Mensaje para Axel</label><input id="axel-message" name="message" placeholder="Escribe a Axel…" maxlength="140" required><button class="primary" aria-label="Enviar mensaje">${W(`arrow-up`,18)}</button></form><small>${W(`sparkles`,13)} Axel está en modo demo</small></div>
  </aside>`}function X(){let e=k.querySelector(`.schedule-scroll`),t=k.querySelector(`.conversation`);k.innerHTML=`<header class="topbar"><button class="brand" data-action="agenda" aria-label="Axis, ir a agenda"><img src="./axis-logo.png" alt="Axis"></button>
    <div class="top-actions"><span class="today-label">${W(`calendar-days`,16)} ${Pe(C(g,{weekday:`long`,day:`numeric`,month:`long`}))}</span><button class="outline axel-toggle" data-action="toggle-axel" aria-pressed="${L}">${W(`sparkles`,16)} Axel</button></div>
    </header><div class="workspace ${L?``:`without-axel`}">${Be()}${I===`agenda`?Ue():Ge()}${L?Je():``}</div>`;let n=k.querySelector(`.schedule-scroll`);n&&e&&(n.scrollLeft=e.scrollLeft,n.scrollTop=e.scrollTop);let r=k.querySelector(`.conversation`);r&&t&&(r.scrollTop=t.scrollTop)}function Z(){requestAnimationFrame(()=>{let e=k.querySelector(`.conversation`);e&&(e.scrollTop=e.scrollHeight)})}function Q(e){z=void 0,R=e,L=!0,X(),Z()}function $(e){B.push({type:`assistant`,text:e}),X(),Z()}function Ye(e,t){if(e.locked){$(`«${e.title}» tiene el horario bloqueado. Puedes desbloquearlo desde su detalle.`);return}let{date:n=e.date,start:r,end:i=r+e.end-e.start}=t;i>1320?$(`El evento terminaría después de las 22:00. Prueba con una hora anterior o indica la hora de fin.`):Q({targetId:e.id,source:`axel`,title:e.title,calendar:e.calendar,date:n,start:r,end:i})}function Xe(e){if(!e.trim())return;B.push({type:`user`,text:e.trim()}),z=void 0;let t=Ce(e,P);if(t!==void 0){if(R=void 0,!t){$(`Prueba con «Mueve la reunión de prácticas al viernes a las 12:00» o «Mueve la reunión de prácticas del jueves a las 16:00».`);return}let e=Te(j,t.title,t.fromDate);if(e.length)e.length===1?Ye(e[0],t):(z={request:t,events:e},$(`Hay varios eventos que coinciden. Elige cuál quieres mover.`));else{let e=t.fromDate?` para el ${C(t.fromDate,{weekday:`long`,day:`numeric`,month:`long`})}`:``;$(`No encuentro «${t.title}»${e} en tu agenda. Revisa el título y el día del evento.`)}return}let n=Se(e,P);n?Q(n):(R?.source===`axel`&&(R=void 0),B.push({type:`assistant`,text:`Prueba con «Tengo una tutoría el jueves a las 17:00». También puedes decir «el siguiente jueves», «el jueves 3» o «el 27/11». Busco la primera fecha que encaje a partir del día seleccionado. «El siguiente» empieza a buscar el día posterior al seleccionado. Si omites el día, uso el seleccionado. Para indicar la duración, di «Estudiar mates el 3 de diciembre de 9 a 11». Si solo das la hora de inicio, reservo 1 hora. El horario va de 08:00 a 22:00.`}),X(),Z())}function Ze(e=!1){if(!R)return;let{targetId:t,overlapWith:n,...r}=R,i=j.find(e=>e.id===t);if(r.mailId&&(N.includes(r.mailId)||j.some(e=>e.mailId===r.mailId)))R=void 0,X();else if(t&&(!i||i.locked))X();else{if(n){let e=j.find(e=>e.id===n);if(!i||!e||!w(i,e)){X();return}let a=le(j,[i,e],M);if(!a||a.id!==t||a.date!==r.date||a.start!==r.start||a.end!==r.end){R=void 0,$(`La agenda cambió. Pulsa «Resolver solape» para revisar una propuesta nueva.`);return}}!(i&&e&&r.source===`mail`)&&E(j.filter(e=>e.id!==t),r,M).length?(X(),Z()):(R=void 0,matchMedia(`(max-width: 900px)`).matches&&(L=!1),Qe(r,i,e))}}function Qe(e,t,n=!1){if(t){let{date:r,start:i,end:a}=e;j=j.map(e=>e.id===t.id?{...e,date:r,start:i,end:a}:e),e.mailId&&(N=[...N,e.mailId]),B.push({type:`assistant`,text:`«${t.title}» se ha actualizado al ${K(e)}.`}),n&&B.push({type:`assistant`,text:`Desde la agenda, pulsa «Resolver solape» para que busque un hueco.`})}else j=[...j,{...e,id:crypto.randomUUID()}];V.add(e.calendar),P=e.date,I=`agenda`,H(),e.source===`axel`&&!t&&B.push({type:`assistant`,text:`«${e.title}» está en tu agenda el ${C(e.date,{weekday:`long`,day:`numeric`,month:`long`})} de ${S(e.start)} a ${S(e.end)}.`}),X(),Z(),Y(t?`Horario actualizado en la agenda`:`Evento añadido a la agenda`)}var $e=e=>`<label>Prioridad<select name="priority">
  <option value="">Heredar del calendario${e?` (${m[M[e.calendar]]})`:``}</option>
  ${[3,2,1].map(t=>`<option value="${t}" ${e?.priority===t?`selected`:``}>${m[t]}</option>`).join(``)}
  </select></label>
  <label class="event-lock"><input type="checkbox" name="locked" ${e?.locked?`checked`:``}> Horario bloqueado</label>`;function et(e){let t=Number(e.get(`priority`));return{priority:t===1||t===2||t===3?t:void 0,locked:e.has(`locked`)}}var tt=e=>`<div class="dialog-head"><h2>${e}</h2>${J(`close-dialog`,`Cerrar`,`x`)}</div>`;function nt(e=P,t=600){A.innerHTML=`${tt(`Nuevo evento`)}<form id="event-form">
    <label>Título<input name="title" required maxlength="80" placeholder="Nombre del evento"></label>
    <label>Calendario<select name="calendar">${h.map(e=>`<option value="${e.id}">${e.name}</option>`).join(``)}</select></label>
    <label>Fecha<input type="date" name="date" required value="${e}"></label>
    <div class="form-row"><label>Empieza<input type="time" name="start" required value="${S(t)}"></label><label>Termina<input type="time" name="end" required value="${S(Math.min(t+60,_))}"></label></div>
    <details class="event-options"><summary>Más opciones</summary><div>${$e()}</div></details>
    <p class="form-error" role="alert"></p><div class="dialog-actions"><button class="outline" type="button" data-action="close-dialog">Cancelar</button><button class="primary">Guardar evento</button></div></form>`,A.showModal()}function rt(){A.innerHTML=`${tt(`Prioridad de calendarios`)}<p>Los eventos pueden heredar esta prioridad. Axel la usa para decidir qué evento flexible mover.</p>
    <form id="priority-form">${h.map(e=>`<label class="priority-row ${e.id}"><span class="dot"></span><span>${e.name}</span><select name="${e.id}">
    ${[3,2,1].map(t=>`<option value="${t}" ${M[e.id]===t?`selected`:``}>${m[t]}</option>`).join(``)}</select></label>`).join(``)}
    <div class="dialog-actions"><button class="primary">Guardar prioridades</button></div></form>`,A.showModal()}function it(e){let t=j.find(t=>t.id===e);if(!t)return;let n=E(j.filter(t=>t.id!==e),t,M);A.innerHTML=`${tt(U(t.title))}
    <p class="${t.calendar} proposal-calendar"><span class="dot"></span>${Ie(t.calendar).name}</p>
    <p>${K(t)}</p>
    ${n.length?`<p class="warning">Coincide con ${n.map(e=>U(e.title)).join(`, `)}.</p>`:``}
    <form id="event-settings" data-id="${t.id}">
      ${$e(t)}
      <div class="dialog-actions">
        <button class="danger outline" type="button" data-action="delete" data-id="${t.id}">Eliminar evento</button>
        ${n.length?`<button class="outline" type="button" data-action="resolve-overlap" data-id="${t.id}">Resolver solape</button>`:``}
        <button class="primary">Guardar</button>
      </div>
    </form>`,A.open||A.showModal()}function at(e){let t=F===`day`?P:x(P),n=F===`day`?P:b(t,6),r=se(j.filter(e=>e.date>=t&&e.date<=n)).filter(t=>!e||t.some(t=>t.id===e));A.innerHTML=`${tt(`Resolver solape`)}
    <div class="overlap-list">${r.map(([e,t])=>{let n=e.locked&&t.locked;return`<section class="overlap-pair">
        ${[e,t].map(e=>`<div class="overlap-event"><strong>${U(e.title)}</strong>
          <span>${K(e)}</span>
          <span>${m[T(e,M)]}${e.locked?` · Horario bloqueado`:``}</span>
          ${n?`<button class="outline" data-event="${e.id}">Editar «${U(e.title)}»</button>`:``}
        </div>`).join(``)}
        ${n?`<p class="warning">Ambos horarios están bloqueados. Elige qué evento desbloquear.</p>`:`<button class="primary" data-resolve-pair="${e.id},${t.id}">Ver propuesta de Axel</button>`}
      </section>`}).join(``)||`<p>Ya no hay solapes en esta vista.</p>`}</div>`,A.open||A.showModal(),A.querySelector(`[data-resolve-pair], [data-event], [data-action="close-dialog"]`)?.focus()}function ot(e,t){let n=j.find(t=>t.id===e),r=j.find(e=>e.id===t);if(!n||!r||!w(n,r)||n.locked&&r.locked){at();return}let i=le(j,[n,r],M);if(A.close(),!i){R=void 0,z=void 0,L=!0,$(`No encuentro un hueco libre para el evento de menor prioridad en los seis días anteriores o posteriores al solape.`);return}let a=i.id===n.id?r:n,{id:o,title:s,calendar:c,date:l,start:u,end:d}=i;Q({title:s,calendar:c,date:l,start:u,end:d,targetId:o,source:`axel`,overlapWith:a.id}),k.querySelector(`.proposal [data-action="confirm"]`)?.focus({preventScroll:!0})}function st(e,t){let n=t.matches(`:focus-visible`);switch(e){case`agenda`:case`inbox`:I=e;break;case`previous`:case`next`:P=b(P,(e===`next`?1:-1)*(F===`week`?7:1));break;case`today`:P=g;break;case`week`:case`day`:F=e;break;case`toggle-axel`:L=!L;break;case`new`:nt();return;case`resolve-overlap`:at(t.dataset.id);return;case`priorities`:rt();return;case`close-dialog`:A.close();return;case`dismiss`:z=void 0,R?.targetId&&R.source===`mail`&&(I=`inbox`,matchMedia(`(max-width: 900px)`).matches&&(L=!1)),R=void 0;break;case`confirm`:Ze();return;case`accept-overlap`:Ze(!0);return;case`alternative`:if(R&&!R.overlapWith&&!j.some(e=>e.id===R?.targetId&&e.locked)){let e=oe(j.filter(e=>e.id!==R?.targetId),R);if(e&&(R={...R,...e},R.source===`manual`)){Ze();return}}X(),Z();return;case`delete`:j=j.filter(e=>e.id!==t.dataset.id),A.close(),H(),Y(`Evento eliminado`);break;default:return}X();let r=k.querySelector(`[data-action="${e}"]`);r&&n&&r.focus()}document.addEventListener(`click`,e=>{let t=e.target.closest(`button`);if(!t)return;let n=t.dataset;if(n.action)st(n.action,t);else if(n.date)P=n.date,I===`agenda`&&X();else if(n.resolvePair){let[e,t]=n.resolvePair.split(`,`);ot(e,t)}else if(n.event)it(n.event);else if(n.example!==void 0)Xe(Re[Number(n.example)]);else if(n.slot){let[e,t]=n.slot.split(`,`);nt(e,Number(t))}else if(n.moveEvent&&z){let e=j.find(e=>e.id===n.moveEvent),t=z.request;z=void 0,e?Ye(e,t):$(`Ese evento ya no está en tu agenda.`)}else if(n.mail){let e=De.find(e=>e.id===n.mail);if(!e||!q(e))return;let t=j.find(t=>t.id===e.targetId);Q({title:t?.title??e.title,calendar:t?.calendar??e.calendar,date:e.date,start:e.start,end:e.end,source:`mail`,mailId:e.id,targetId:e.targetId}),k.querySelector(`.proposal button`)?.focus({preventScroll:!0})}}),document.addEventListener(`change`,e=>{let t=e.target,n=t.dataset.calendar;if(!n)return;t.checked?V.add(n):V.delete(n);let r=t===document.activeElement;X(),r&&k.querySelector(`[data-calendar="${n}"]`)?.focus()}),document.addEventListener(`submit`,e=>{let t=e.target,n=new FormData(t);if(e.preventDefault(),t.id===`axel-form`)Xe(String(n.get(`message`))),k.querySelector(`#axel-message`)?.focus({preventScroll:!0});else if(t.id===`priority-form`){for(let{id:e}of h){let t=Number(n.get(e));(t===1||t===2||t===3)&&(M[e]=t)}H(),A.close(),X(),Y(`Prioridades guardadas`)}else if(t.id===`event-settings`)j=j.map(e=>e.id===t.dataset.id?{...e,...et(n)}:e),H(),A.close(),X(),Y(`Ajustes del evento guardados`);else if(t.id===`event-form`){let e=e=>{let[t,r]=String(n.get(e)).split(`:`).map(Number);return t*60+r},r=e(`start`),i=e(`end`),a=String(n.get(`title`)).trim();if(!a||!Number.isFinite(r+i)||r<480||i>1320||i<=r){t.querySelector(`.form-error`).textContent=`Introduce un título y un intervalo válido entre las 08:00 y las 22:00.`;return}let o={title:a,date:String(n.get(`date`)),start:r,end:i,calendar:n.get(`calendar`),source:`manual`,...et(n)};A.close(),E(j,o,M).length?(Q(o),k.querySelector(`.proposal .outline`)?.focus({preventScroll:!0})):Qe(o)}}),X();