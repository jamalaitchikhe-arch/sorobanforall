/* Soroban for All — صفحة «برامجنا» (Smart Education Maroc)
   أربعة برامج للأطفال من 6 سنوات، لكل برنامج رسم معبّر (SVG)، وصف، فوائد، رسالة لولي الأمر، ورابط تسجيل. */
(function(){
"use strict";
const P = {
 ar:{ nav:"🌟 برامجنا", kick:"🌟 برامجنا", title:"استثمر في أثمن ما تملك: عقل طفلك", sub:"برامج تعليمية ممتعة تبني مهارات المستقبل، لكل الأطفال ابتداءً من 6 سنوات.",
      age:"👦👧 ابتداءً من 6 سنوات", reg:"📝 سجّل طفلك الآن", ask:"💬 استفسار عبر واتساب", why:"ماذا سيكتسب طفلك؟",
      waMsg:"السلام عليكم، أريد معلومات عن برنامج «{p}» لطفلي.", bottomT:"لديك سؤال قبل التسجيل؟", bottomD:"نحن هنا لنساعدك في اختيار البرنامج المناسب لطفلك.", bottomB:"💬 تحدّث معنا على واتساب",
      teaserT:"🌟 برامجنا لطفلك", teaserB:"اكتشف كل البرامج ←" },
 fr:{ nav:"🌟 Nos programmes", kick:"🌟 Nos programmes", title:"Investissez dans ce que vous avez de plus précieux : l'esprit de votre enfant", sub:"Des programmes ludiques qui construisent les compétences de demain, pour tous les enfants dès 6 ans.",
      age:"👦👧 Dès 6 ans", reg:"📝 Inscrire mon enfant", ask:"💬 Question sur WhatsApp", why:"Ce que votre enfant va acquérir",
      waMsg:"Bonjour, je souhaite des informations sur le programme « {p} » pour mon enfant.", bottomT:"Une question avant l'inscription ?", bottomD:"Nous sommes là pour vous aider à choisir le programme adapté à votre enfant.", bottomB:"💬 Parlez-nous sur WhatsApp",
      teaserT:"🌟 Nos programmes pour votre enfant", teaserB:"Découvrir tous les programmes →" }
};
const lang = () => (typeof LANG!=="undefined" && P[LANG]) ? LANG : "ar";
const pt = k => P[lang()][k];
const e = s => String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));

/* ---------- الرسوم ---------- */
const SVG = {
 soroban: `<svg viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs><radialGradient id="pgO" cx=".35" cy=".3"><stop offset="0" stop-color="#ffe08a"/><stop offset="1" stop-color="#f7931e"/></radialGradient>
  <radialGradient id="pgB" cx=".35" cy=".3"><stop offset="0" stop-color="#a9d2ff"/><stop offset="1" stop-color="#2f6fe0"/></radialGradient>
  <linearGradient id="pgW" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#8a5526"/><stop offset="1" stop-color="#5a3412"/></linearGradient></defs>
  <circle cx="320" cy="62" r="34" fill="#fff6c9" opacity=".25"/><circle cx="320" cy="62" r="22" fill="#ffe08a"/>
  <path d="M310 84h20v10h-20z" fill="#c9a46a"/><path d="M312 52l8 12 8-12" fill="none" stroke="#c27c0e" stroke-width="3"/>
  ${[0,1,2,3,4,5,6,7].map(i=>`<line x1="${320+Math.cos(i*.785)*32}" y1="${62+Math.sin(i*.785)*32}" x2="${320+Math.cos(i*.785)*44}" y2="${62+Math.sin(i*.785)*44}" stroke="#ffe08a" stroke-width="4" stroke-linecap="round"/>`).join("")}
  <rect x="40" y="70" width="240" height="160" rx="16" fill="url(#pgW)"/><rect x="54" y="84" width="212" height="132" rx="8" fill="#0b1b3a"/>
  ${[0,1,2,3,4].map(r=>{ const x = 78+r*42, v=[3,7,5,9,1][r]; let s=`<line x1="${x}" y1="86" x2="${x}" y2="214" stroke="#c9a46a" stroke-width="4"/>`;
    s+=`<ellipse cx="${x}" cy="${v>=5?123:100}" rx="17" ry="9" fill="${v>=5?"url(#pgO)":"url(#pgB)"}"/>`;
    for(let k=0;k<4;k++){ const on = k < v%5; s+=`<ellipse cx="${x}" cy="${on ? 146+k*17 : 206-(3-k)*17}" rx="17" ry="9" fill="${on?"url(#pgO)":"url(#pgB)"}"/>`; } return s; }).join("")}
  <rect x="54" y="129" width="212" height="6" fill="#c9a46a"/>
  <g font-family="Cairo,sans-serif" font-weight="900"><text x="300" y="150" font-size="34" fill="#fff">7</text><text x="326" y="176" font-size="28" fill="#ffe08a">+5</text><text x="304" y="214" font-size="36" fill="#7be3b4">=12</text></g>
 </svg>`,
 robot: `<svg viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs><linearGradient id="prB" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#e8f3ff"/><stop offset="1" stop-color="#9cc4ee"/></linearGradient></defs>
  <g opacity=".35" stroke="#7fd4ff" stroke-width="3" fill="none"><path d="M20 210h60v-40h40"/><path d="M380 60h-50v40h-30"/><path d="M370 220h-60v-30"/><circle cx="120" cy="170" r="5" fill="#7fd4ff"/><circle cx="300" cy="100" r="5" fill="#7fd4ff"/></g>
  <g transform="translate(330 190)"><circle r="26" fill="none" stroke="#f5c542" stroke-width="10" stroke-dasharray="10 7"/><circle r="10" fill="#f5c542"/></g>
  <g transform="translate(62 70)"><circle r="18" fill="none" stroke="#f7931e" stroke-width="8" stroke-dasharray="8 6"/><circle r="7" fill="#f7931e"/></g>
  <line x1="200" y1="36" x2="200" y2="62" stroke="#9cc4ee" stroke-width="5"/><circle cx="200" cy="30" r="9" fill="#ff5d6c"/>
  <rect x="140" y="60" width="120" height="86" rx="24" fill="url(#prB)" stroke="#5b8fc9" stroke-width="3"/>
  <rect x="156" y="78" width="88" height="46" rx="14" fill="#0b1b3a"/>
  <circle cx="182" cy="100" r="11" fill="#4fd1ff"/><circle cx="218" cy="100" r="11" fill="#4fd1ff"/><circle cx="185" cy="97" r="4" fill="#fff"/><circle cx="221" cy="97" r="4" fill="#fff"/>
  <path d="M186 132q14 10 28 0" stroke="#5b8fc9" stroke-width="4" fill="none" stroke-linecap="round"/>
  <rect x="128" y="88" width="14" height="30" rx="6" fill="#5b8fc9"/><rect x="258" y="88" width="14" height="30" rx="6" fill="#5b8fc9"/>
  <rect x="150" y="150" width="100" height="72" rx="18" fill="url(#prB)" stroke="#5b8fc9" stroke-width="3"/>
  <circle cx="178" cy="178" r="8" fill="#2ecc8f"/><circle cx="200" cy="178" r="8" fill="#f5c542"/><circle cx="222" cy="178" r="8" fill="#ff5d6c"/>
  <rect x="170" y="196" width="60" height="10" rx="5" fill="#5b8fc9"/>
  <path d="M150 166l-34 22" stroke="#9cc4ee" stroke-width="12" stroke-linecap="round"/><circle cx="112" cy="191" r="11" fill="#5b8fc9"/>
  <path d="M250 166l34-26" stroke="#9cc4ee" stroke-width="12" stroke-linecap="round"/><circle cx="288" cy="137" r="11" fill="#5b8fc9"/>
  <rect x="160" y="222" width="26" height="22" rx="6" fill="#5b8fc9"/><rect x="214" y="222" width="26" height="22" rx="6" fill="#5b8fc9"/>
 </svg>`,
 english: `<svg viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <circle cx="300" cy="150" r="70" fill="#2f80ed"/><path d="M262 104c18 6 22 22 12 32s4 26 22 24 18 18 8 30M318 86c-6 16 6 26 20 22s26 10 22 24" fill="none" stroke="#7be3b4" stroke-width="14" stroke-linecap="round"/>
  <ellipse cx="300" cy="150" rx="70" ry="70" fill="none" stroke="#bfe0ff" stroke-width="3"/><ellipse cx="300" cy="150" rx="30" ry="70" fill="none" stroke="#bfe0ff" stroke-width="2" opacity=".6"/><line x1="230" y1="150" x2="370" y2="150" stroke="#bfe0ff" stroke-width="2" opacity=".6"/>
  <g font-family="Cairo,Arial,sans-serif" font-weight="900">
   <path d="M36 40h150a14 14 0 0 1 14 14v46a14 14 0 0 1-14 14H90l-24 22 4-22H36a14 14 0 0 1-14-14V54a14 14 0 0 1 14-14z" fill="#fff"/><text x="110" y="88" text-anchor="middle" font-size="30" fill="#0a1a36">Hello!</text>
   <path d="M232 22h112a12 12 0 0 1 12 12v32a12 12 0 0 1-12 12h-20l6 18-26-18h-72a12 12 0 0 1-12-12V34a12 12 0 0 1 12-12z" fill="#f5c542"/><text x="288" y="58" text-anchor="middle" font-size="22" fill="#1a1200">Hi! 👋</text>
   <g transform="translate(36 160)"><rect width="54" height="54" rx="8" fill="#ff5d6c"/><text x="27" y="40" text-anchor="middle" font-size="36" fill="#fff">A</text></g>
   <g transform="translate(96 176)"><rect width="54" height="54" rx="8" fill="#f7931e"/><text x="27" y="40" text-anchor="middle" font-size="36" fill="#fff">B</text></g>
   <g transform="translate(156 160)"><rect width="54" height="54" rx="8" fill="#2ecc8f"/><text x="27" y="40" text-anchor="middle" font-size="36" fill="#fff">C</text></g>
   <g transform="translate(66 108) rotate(-8)"><rect width="46" height="46" rx="8" fill="#a98bff"/><text x="23" y="34" text-anchor="middle" font-size="30" fill="#fff">D</text></g>
  </g>
  <g fill="#ffe08a"><text x="210" y="130" font-size="22">♪</text><text x="196" y="246" font-size="26">♫</text></g>
 </svg>`,
 coding: `<svg viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect x="70" y="40" width="260" height="160" rx="14" fill="#1b2a4a" stroke="#a98bff" stroke-width="4"/><rect x="84" y="54" width="232" height="132" rx="6" fill="#0a1426"/>
  <path d="M40 206h320l-16 24H56z" fill="#a98bff"/><rect x="170" y="210" width="60" height="6" rx="3" fill="#5a3fc0"/>
  <g font-family="monospace" font-weight="700" font-size="15">
   <text x="98" y="80" fill="#f7931e">when</text><text x="140" y="80" fill="#fff">🚩 clicked</text>
   <text x="110" y="104" fill="#4fd1ff">repeat</text><text x="168" y="104" fill="#f5c542">10</text>
   <text x="124" y="128" fill="#7be3b4">move</text><text x="166" y="128" fill="#fff">(10)</text>
   <text x="124" y="152" fill="#ff8a9a">say</text><text x="156" y="152" fill="#fff">"Hello!"</text>
  </g>
  <text x="300" y="168" font-family="monospace" font-weight="900" font-size="34" fill="#a98bff" text-anchor="end">&lt;/&gt;</text>
  <g transform="translate(250 66)"><rect width="56" height="30" rx="6" fill="#f7931e"/><rect x="14" y="-6" width="16" height="8" rx="3" fill="#f7931e"/></g>
  <g transform="translate(262 100)"><rect width="44" height="26" rx="6" fill="#4fd1ff"/><rect x="12" y="-5" width="14" height="7" rx="3" fill="#4fd1ff"/></g>
  <text x="36" y="70" font-size="34">🐱</text><text x="340" y="56" font-size="28">⭐</text><text x="22" y="190" font-size="26">🎮</text>
  <path d="M262 172l14 34 6-14 14-4z" fill="#fff" stroke="#0a1426" stroke-width="2"/>
 </svg>`
};

const PROGRAMS = [
 { id:"soroban", svg:"soroban", c1:"#f7931e", c2:"#c25e00", url:"https://forms.gle/1Q17SSTRUgjUL29L7",
   ar:{ name:"الحساب الذهني (السوروبان)", desc:"يتعلّم طفلك الحساب بسرعة مذهلة باستعمال السوروبان، ثم يتخيّله في ذهنه ليحسب دون ورقة ولا آلة حاسبة.",
        b:["🎯 تركيز وانتباه أقوى","🧠 ذاكرة قوية وسرعة بديهة","📈 ثقة بالنفس ونتائج أفضل في الرياضيات"], msg:"كل دقيقة يتدرّب فيها طفلك على السوروبان اليوم، هي ثقة يحملها معه في كل امتحان غداً." },
   fr:{ name:"Calcul mental (Soroban)", desc:"Votre enfant apprend à calculer à une vitesse étonnante avec le soroban, puis l'imagine dans sa tête pour calculer sans papier ni calculatrice.",
        b:["🎯 Concentration et attention renforcées","🧠 Mémoire et vivacité d'esprit","📈 Confiance en soi et meilleurs résultats en maths"], msg:"Chaque minute d'entraînement au soroban aujourd'hui est une confiance que votre enfant emportera à chaque examen demain." } },
 { id:"robot", svg:"robot", c1:"#4fa3ff", c2:"#1f5fbf", url:"https://forms.gle/rmgYXQnJf28Jt8My5",
   ar:{ name:"الروبوتيك", desc:"يصمّم طفلك روبوتات ويبرمجها لتتحرك وتستجيب، فيتعلّم العلوم والتكنولوجيا بالتجربة واللعب.",
        b:["🧩 تفكير منطقي وحلّ المشكلات","💡 إبداع وروح الابتكار","🚀 أساس متين لمهن المستقبل"], msg:"لا تجعل طفلك مستهلكاً للتكنولوجيا فقط… اجعله صانعاً لها." },
   fr:{ name:"Robotique", desc:"Votre enfant conçoit et programme des robots qui bougent et réagissent : il apprend les sciences et la technologie en expérimentant et en jouant.",
        b:["🧩 Logique et résolution de problèmes","💡 Créativité et esprit d'innovation","🚀 Une base solide pour les métiers de demain"], msg:"Ne laissez pas votre enfant seulement consommer la technologie… faites-en un créateur." } },
 { id:"english", svg:"english", c1:"#2ecc8f", c2:"#14805a", url:"https://forms.gle/9rbdXwAC8anPgfoa8",
   ar:{ name:"اللغة الإنجليزية", desc:"يتعلّم طفلك الإنجليزية بالمحادثة والأناشيد والألعاب، فيكتسبها بطلاقة وبكل متعة.",
        b:["🗣️ نطق سليم منذ الصغر","💬 مفردات ومحادثة يومية","🌍 باب مفتوح على العالم"], msg:"اللغة التي يتعلّمها طفلك اليوم بسهولة، هي الباب الذي سيفتح له فرص الغد." },
   fr:{ name:"Anglais", desc:"Votre enfant apprend l'anglais par la conversation, les chansons et les jeux : il l'acquiert avec aisance et plaisir.",
        b:["🗣️ Une bonne prononciation dès le plus jeune âge","💬 Vocabulaire et conversation du quotidien","🌍 Une porte ouverte sur le monde"], msg:"La langue que votre enfant apprend facilement aujourd'hui est la porte qui lui ouvrira les opportunités de demain." } },
 { id:"coding", svg:"coding", c1:"#a98bff", c2:"#5a3fc0", url:"https://forms.gle/oxdZm5vGdJjM7BDn8",
   ar:{ name:"الإعلاميات والبرمجة", desc:"يتعلّم طفلك استعمال الحاسوب بذكاء، ثم يبرمج ألعابه وقصصه التفاعلية الأولى بلغات مصمَّمة خصيصاً للأطفال.",
        b:["🛡️ مهارات رقمية آمنة ومسؤولة","🧠 تفكير حسابي وتنظيم الأفكار","🎮 من مستهلك للشاشة إلى مبدع عليها"], msg:"الشاشة في يد طفلك… اجعلها أداة للإبداع، لا للتسلية فقط." },
   fr:{ name:"Informatique et programmation", desc:"Votre enfant apprend à utiliser l'ordinateur intelligemment, puis programme ses premiers jeux et histoires interactives avec des langages conçus pour les enfants.",
        b:["🛡️ Compétences numériques sûres et responsables","🧠 Pensée informatique et organisation des idées","🎮 De consommateur d'écran à créateur"], msg:"L'écran est entre les mains de votre enfant… faites-en un outil de création, pas seulement de divertissement." } }
];
const wa = () => (typeof D!=="undefined" && D.settings && D.settings.whatsapp) || "212706600479";
const waLink = name => "https://wa.me/" + wa() + "?text=" + encodeURIComponent(pt("waMsg").replace("{p}", name));

window.viewPrograms = function(){
  const L = lang();
  document.getElementById("app").innerHTML = `
  <section class="pghero"><span class="ckick">${pt("kick")}</span><h1>${e(pt("title"))}</h1><p>${e(pt("sub"))}</p>
    <div class="pgjump">${PROGRAMS.map(p=>`<a href="#programs" data-jump="${p.id}" style="--c1:${p.c1}">${e(p[L].name)}</a>`).join("")}</div></section>
  <div class="pglist">${PROGRAMS.map((p,i)=>`
    <article class="pg ${i%2?"rev":""}" id="pg-${p.id}" style="--c1:${p.c1};--c2:${p.c2}">
      <div class="pgart">${SVG[p.svg]}<span class="pgage">${pt("age")}</span></div>
      <div class="pgtxt">
        <h2>${e(p[L].name)}</h2>
        <p class="pgdesc">${e(p[L].desc)}</p>
        <h4>${pt("why")}</h4>
        <ul>${p[L].b.map(x=>`<li>${e(x)}</li>`).join("")}</ul>
        <blockquote class="pgmsg">${e(p[L].msg)}</blockquote>
        <div class="pgcta"><a class="btn big-btn" href="${p.url}" target="_blank" rel="noopener">${pt("reg")}</a><a class="btn ghost" href="${waLink(p[L].name)}" target="_blank" rel="noopener">${pt("ask")}</a></div>
      </div>
    </article>`).join("")}</div>
  <section class="pgbottom"><h2>${e(pt("bottomT"))}</h2><p>${e(pt("bottomD"))}</p><a class="btn big-btn" href="https://wa.me/${wa()}" target="_blank" rel="noopener">${pt("bottomB")}</a></section>`;
  document.querySelectorAll("[data-jump]").forEach(a => a.onclick = ev => { ev.preventDefault(); const t = document.getElementById("pg-"+a.dataset.jump); if(t) t.scrollIntoView({behavior:"smooth", block:"start"}); });
};
window.programsTeaser = function(){
  const L = lang();
  return `<section class="pgteaser"><div class="sec-title"><h2>${e(pt("teaserT"))}</h2><a class="btn sm ghost" href="#programs">${e(pt("teaserB"))}</a></div>
    <div class="pgtgrid">${PROGRAMS.map(p=>`<a class="pgt" href="#programs" data-pg="${p.id}" style="--c1:${p.c1};--c2:${p.c2}"><div class="pgtart">${SVG[p.svg]}</div><b>${e(p[L].name)}</b><small>${pt("age")}</small></a>`).join("")}</div></section>`;
};
document.addEventListener("click", ev => { const a = ev.target.closest && ev.target.closest(".pgt[data-pg]"); if(!a) return;
  const id = a.dataset.pg; setTimeout(()=>{ const t = document.getElementById("pg-"+id); if(t) t.scrollIntoView({behavior:"smooth", block:"start"}); }, 250); });
window.programsNavLabel = () => pt("nav");
})();
