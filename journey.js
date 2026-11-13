/* Soroban for All — رحلة الأبطال / L'aventure des champions
   صفحة مجانية: خريطة عوالم، مراحل وحرّاس، نجوم، خبرة ورتب، خرزات ذهبية، أوسمة، شهادات.
   التقدّم محفوظ على جهاز الطفل (localStorage) مع «رمز الحفظ» للنقل بين الأجهزة.
   يعتمد على: workbook.js (SFA_WB) والدوال العامة في index.html (t, esc, store, app, LANG, toast, confettiBurst, playChime). */
(function(){
"use strict";

/* ---------------- النصوص ---------------- */
const JT = {
ar:{
 free:"🎁 مجاناً", title:"رحلة الأبطال", sub:"من الخرزة الأولى إلى العقل العبقري",
 createT:"ابدأ مغامرتك!", createD:"اكتب اسمك واختر بطلك، ثم انطلق في رحلة العوالم الستة.", name:"اسمك", namePh:"مثال: محمد، سكينة…",
 boy:"بطل", girl:"بطلة", pickAv:"اختر شخصيتك", start:"🚀 ابدأ الرحلة", needName:"اكتب اسمك من فضلك ✍️", needGen:"اختر: بطل أم بطلة؟",
 coins:"خرزات ذهبية", xp:"خبرة", streak:"أيام متتالية", daily:"🎯 مهمة اليوم", dailyD:"أنجح في مرحلتين اليوم", dailyDone:"✔ أنجزت مهمة اليوم! +15 🟡",
 shop:"🛍️ المتجر", badges:"🏅 الأوسمة", save:"💾 رمز الحفظ", lesson:"درس الكراسة", stage:"المرحلة", boss:"الحارس", superBoss:"الحارس الخارق",
 locked:"🔒 أكمل المرحلة السابقة أولاً", cert:"🏅 شهادتي", worldDone:"✔ عالم محرَّر",
 finalT:"معركة العقل العبقري", finalD:"حرّر العوالم الستة لتواجه إمبراطور الأرقام وتفوز بالكأس الذهبية.", finalGo:"⚔️ ادخل المعركة النهائية",
 finalWon:"🏆 أنت العقل العبقري!", back:"→ الخريطة", check:"تحقق", answer:"الجواب الصحيح: ", great:["ممتاز!","رائع!","عبقري!","أحسنت!","مذهل!"],
 hp:"طاقة الحارس", result:"النتيجة", passed:"🎉 نجحت في المرحلة!", failed:"💪 قريب جداً! حاول مرة أخرى", need:"تحتاج {n} إجابات صحيحة للعبور",
 retry:"🔁 أعد المحاولة", next:"⏭️ المرحلة التالية", map:"🗺️ الخريطة", gainXp:"+{n} خبرة", gainCoins:"+{n} خرزة ذهبية",
 rankUp:"⬆️ رتبة جديدة: ", newBadge:"🏅 وسام جديد: ", bossWin:"لقد هزمت ", time:"⏱️",
 shopT:"🛍️ متجر الشخصيات", shopD:"اشترِ شخصيات جديدة بالخرزات الذهبية التي تربحها.", owned:"✔ لديك", use:"اختيار", inUse:"مختارة", buy:"شراء", noCoins:"لا تكفي خرزاتك بعد 🟡",
 bought:"🎉 شخصية جديدة!", badgesT:"🏅 أوسمتي", saveT:"💾 رمز الحفظ", saveD:"انسخ هذا الرمز واحتفظ به (أو أرسله لنفسك على واتساب). يمكنك به استرجاع تقدّمك على أي جهاز.",
 copy:"📋 نسخ الرمز", copied:"تم النسخ ✔", importT:"استرجاع تقدّم محفوظ", importPh:"الصق رمز الحفظ هنا…", importBtn:"استرجاع", importOk:"تم استرجاع تقدّمك ✔", importBad:"الرمز غير صالح",
 confirm:"تأكيد؟", close:"إغلاق", reset:"🗑️ بداية جديدة", resetD:"حذف كل التقدّم على هذا الجهاز",
 certT:"شهادة تقدير", certTo:"تُمنح هذه الشهادة إلى", certWorld:"تقديراً لتحرير «{w}» في رحلة الأبطال للحساب الذهني بالسوروبان", certFinal:"تقديراً لفوزه بالكأس الذهبية ولقب «العقل العبقري» في رحلة الأبطال للحساب الذهني بالسوروبان", certFinalF:"تقديراً لفوزها بالكأس الذهبية ولقب «العقل العبقري» في رحلة الأبطال للحساب الذهني بالسوروبان",
 certDate:"بتاريخ", print:"🖨️ طباعة / حفظ PDF", noPrint:"الطباعة غير متاحة هنا", heroM:"البطل", heroF:"البطلة",
 victoryT:"مبروك يا {n}!", victoryD:"لقد هزمت إمبراطور الأرقام وفزت بالكأس الذهبية 🏆 أنت الآن: العقل العبقري 🧠", worldClearT:"تحرّر العالم!", worldClearD:"حرّرت «{w}» 🎉 شهادتك جاهزة.",
 modeComp:"🏆 وضع المسابقة", modeCompD:"عدّاد تنازلي وأرقام وامضة · نجوم وفتح المراحل", modeTrain:"🎓 وضع التدريب", modeTrainD:"بلا عدّاد للتعلّم براحة · خبرة فقط",
 compTag:"🏆 مسابقة", trainTag:"🎓 تدريب", noLeave:"⚠️ لا تغادر الصفحة أثناء التمرين، وإلا لن يُحتسب", timeout:"⏰ انتهى الوقت!", left:"🚫 غادرت الصفحة — لا يُحتسب.",
 speed:"⚡ +5 سرعة", speedN:"{n} إجابات سريعة", flashReady:"استعد… ركّز جيداً 👀", flashAsk:"كم المجموع؟", trainRes:"🎓 انتهى التدريب", trainNote:"النجوم وفتح المراحل تُكسب في وضع المسابقة 🏆", tryComp:"🏆 جرّب في وضع المسابقة",
 rateBtn:"⭐ قيّم المسابقة", go3d:"🌍 العالم ثلاثي الأبعاد", stars:"نجوم", mapT:"🗺️ خريطة العوالم", exN:"تمرين", of:"من"
},
fr:{
 free:"🎁 Gratuit", title:"L'aventure des champions", sub:"De la première perle au cerveau génial",
 createT:"Commence ton aventure !", createD:"Écris ton prénom, choisis ton héros et pars à la conquête des six mondes.", name:"Ton prénom", namePh:"ex. : Mohamed, Sakina…",
 boy:"Champion", girl:"Championne", pickAv:"Choisis ton personnage", start:"🚀 Commencer", needName:"Écris ton prénom ✍️", needGen:"Champion ou championne ?",
 coins:"perles d'or", xp:"XP", streak:"jours d'affilée", daily:"🎯 Mission du jour", dailyD:"Réussis deux étapes aujourd'hui", dailyDone:"✔ Mission du jour accomplie ! +15 🟡",
 shop:"🛍️ Boutique", badges:"🏅 Médailles", save:"💾 Code de sauvegarde", lesson:"Leçon du cahier", stage:"Étape", boss:"Le gardien", superBoss:"Le super gardien",
 locked:"🔒 Termine d'abord l'étape précédente", cert:"🏅 Mon diplôme", worldDone:"✔ Monde libéré",
 finalT:"La bataille du cerveau génial", finalD:"Libère les six mondes pour affronter l'Empereur des nombres et gagner la coupe d'or.", finalGo:"⚔️ Entrer dans la bataille finale",
 finalWon:"🏆 Tu es le cerveau génial !", back:"← Carte", check:"Vérifier", answer:"Bonne réponse : ", great:["Excellent !","Super !","Génial !","Bravo !","Incroyable !"],
 hp:"Énergie du gardien", result:"Résultat", passed:"🎉 Étape réussie !", failed:"💪 Presque ! Réessaie", need:"Il faut {n} bonnes réponses pour passer",
 retry:"🔁 Réessayer", next:"⏭️ Étape suivante", map:"🗺️ Carte", gainXp:"+{n} XP", gainCoins:"+{n} perles d'or",
 rankUp:"⬆️ Nouveau rang : ", newBadge:"🏅 Nouvelle médaille : ", bossWin:"Tu as vaincu ", time:"⏱️",
 shopT:"🛍️ Boutique des personnages", shopD:"Achète de nouveaux personnages avec tes perles d'or.", owned:"✔ À toi", use:"Choisir", inUse:"Choisi", buy:"Acheter", noCoins:"Pas encore assez de perles 🟡",
 bought:"🎉 Nouveau personnage !", badgesT:"🏅 Mes médailles", saveT:"💾 Code de sauvegarde", saveD:"Copie ce code et garde-le (ou envoie-le-toi sur WhatsApp). Il permet de récupérer ta progression sur n'importe quel appareil.",
 copy:"📋 Copier le code", copied:"Copié ✔", importT:"Récupérer une progression", importPh:"Colle ton code ici…", importBtn:"Récupérer", importOk:"Progression récupérée ✔", importBad:"Code invalide",
 confirm:"Confirmer ?", close:"Fermer", reset:"🗑️ Recommencer", resetD:"Effacer toute la progression sur cet appareil",
 certT:"Diplôme d'honneur", certTo:"Ce diplôme est décerné à", certWorld:"pour avoir libéré « {w} » dans l'aventure des champions du calcul mental au soroban", certFinal:"pour avoir remporté la coupe d'or et le titre de « Cerveau génial » dans l'aventure des champions du calcul mental au soroban", certFinalF:"pour avoir remporté la coupe d'or et le titre de « Cerveau génial » dans l'aventure des champions du calcul mental au soroban",
 certDate:"Le", print:"🖨️ Imprimer / PDF", noPrint:"Impression indisponible ici", heroM:"le champion", heroF:"la championne",
 victoryT:"Bravo {n} !", victoryD:"Tu as vaincu l'Empereur des nombres et gagné la coupe d'or 🏆 Tu es désormais : le Cerveau génial 🧠", worldClearT:"Monde libéré !", worldClearD:"Tu as libéré « {w} » 🎉 Ton diplôme est prêt.",
 modeComp:"🏆 Mode concours", modeCompD:"Compte à rebours et nombres éclair · étoiles et nouvelles étapes", modeTrain:"🎓 Mode entraînement", modeTrainD:"Sans chrono pour apprendre tranquillement · XP seulement",
 compTag:"🏆 Concours", trainTag:"🎓 Entraînement", noLeave:"⚠️ Ne quitte pas la page pendant l'exercice, sinon il ne compte pas", timeout:"⏰ Temps écoulé !", left:"🚫 Tu as quitté la page — non compté.",
 speed:"⚡ +5 rapidité", speedN:"{n} réponses rapides", flashReady:"Prêt… concentre-toi 👀", flashAsk:"Quelle est la somme ?", trainRes:"🎓 Entraînement terminé", trainNote:"Les étoiles et les nouvelles étapes se gagnent en mode concours 🏆", tryComp:"🏆 Essayer en mode concours",
 rateBtn:"⭐ Donne ton avis", go3d:"🌍 Le monde en 3D", stars:"étoiles", mapT:"🗺️ Carte des mondes", exN:"Exercice", of:"sur"
}};
const jt = k => { const L = (typeof LANG!=="undefined" && JT[LANG]) ? JT[LANG] : JT.ar; return L[k] ?? JT.ar[k] ?? k; };
const fill = (s, o) => String(s).replace(/\{(\w+)\}/g, (_,k)=> o[k] ?? "");

/* ---------------- العوالم والرتب والأوسمة ---------------- */
const WORLDS = [
 {id:1, ico:"🌱", c1:"#2ecc8f", c2:"#0f7a52", ar:"وادي الخرزات", fr:"La vallée des perles", bIco:"🦉", bAr:"حارس الوادي", bFr:"le gardien de la vallée"},
 {id:2, ico:"🏝️", c1:"#4fa3ff", c2:"#1f5fbf", ar:"جزيرة القرص", fr:"L'île du disque", bIco:"🦈", bAr:"قرصان القرص", bFr:"le pirate du disque"},
 {id:3, ico:"🌳", c1:"#7bd389", c2:"#2d7a3a", ar:"غابة التوائم", fr:"La forêt des jumeaux", bIco:"🐒", bAr:"التوأمين الشقيّين", bFr:"les jumeaux farceurs"},
 {id:4, ico:"⛰️", c1:"#a98bff", c2:"#5a3fc0", ar:"جبل التوائم", fr:"La montagne des jumeaux", bIco:"🗿", bAr:"عملاق الجبل", bFr:"le géant de la montagne"},
 {id:5, ico:"🏜️", c1:"#f5c542", c2:"#c27c0e", ar:"صحراء القياس", fr:"Le désert de la mesure", bIco:"🧞", bAr:"ساحر الرمال", bFr:"le magicien des sables"},
 {id:6, ico:"🏰", c1:"#ff7a6b", c2:"#b23a2e", ar:"قلعة المفتاح", fr:"Le château de la clé", bIco:"🐉", bAr:"سيد القلعة", bFr:"le seigneur du château"}
];
const FINAL = {ico:"🤖", ar:"إمبراطور الأرقام", fr:"l'Empereur des nombres"};
const RANKS = [
 {xp:0,    ico:"🐣", ar:"مبتدئ", fr:"Débutant"},
 {xp:150,  ico:"🧭", ar:"مستكشف الأرقام", fr:"Explorateur des nombres"},
 {xp:500,  ico:"⚔️", ar:"محارب الحساب", fr:"Guerrier du calcul"},
 {xp:1000, ico:"🛡️", ar:"فارس السوروبان", fr:"Chevalier du soroban"},
 {xp:1800, ico:"🦸", ar:"البطل الخارق", fr:"Super-héros"}
];
const GENIUS = {ico:"🧠", ar:"العقل العبقري", fr:"Cerveau génial"};
const BADGES = [
 {id:"first",   ico:"⭐", ar:"أول نجمة", fr:"Première étoile", dAr:"انجح في أول مرحلة", dFr:"Réussis ta première étape"},
 {id:"perfect", ico:"💯", ar:"الكمال", fr:"La perfection", dAr:"10 من 10 في مرحلة", dFr:"10 sur 10 dans une étape"},
 {id:"flash",   ico:"⚡", ar:"سرعة البرق", fr:"Vitesse éclair", dAr:"3 نجوم أمام حارس", dFr:"3 étoiles contre un gardien"},
 {id:"fire3",   ico:"🔥", ar:"الشعلة", fr:"La flamme", dAr:"3 أيام تدريب متتالية", dFr:"3 jours d'entraînement d'affilée"},
 {id:"fire7",   ico:"☄️", ar:"الشعلة الكبرى", fr:"La grande flamme", dAr:"7 أيام تدريب متتالية", dFr:"7 jours d'affilée"},
 {id:"hundred", ico:"🎯", ar:"المئوية", fr:"La centaine", dAr:"100 إجابة صحيحة", dFr:"100 bonnes réponses"},
 {id:"world",   ico:"🗺️", ar:"محرّر العوالم", fr:"Libérateur", dAr:"حرّر أول عالم", dFr:"Libère ton premier monde"},
 {id:"hunter",  ico:"👑", ar:"صائد الحرّاس", fr:"Chasseur de gardiens", dAr:"اهزم الحرّاس الستة", dFr:"Vaincs les six gardiens"},
 {id:"collector",ico:"🛍️", ar:"الجامع", fr:"Le collectionneur", dAr:"امتلك 6 شخصيات", dFr:"Possède 6 personnages"},
 {id:"genius",  ico:"🧠", ar:"العقل العبقري", fr:"Cerveau génial", dAr:"افز بالكأس الذهبية", dFr:"Gagne la coupe d'or"}
];
const AVATARS = [
 {e:"🦁",p:0},{e:"🐯",p:0},{e:"🐼",p:0},{e:"🐰",p:0},
 {e:"🦊",p:20},{e:"🐸",p:20},{e:"🐧",p:25},{e:"🦉",p:30},{e:"🐬",p:30},{e:"🐢",p:35},
 {e:"🦄",p:50},{e:"🦖",p:55},{e:"🐉",p:60},{e:"🤖",p:60},{e:"🚀",p:70},{e:"🦸",p:80},{e:"🧙",p:80},{e:"👑",p:120}
];

/* ---------------- الحالة (على جهاز الطفل) ---------------- */
const KEY = "journey";
const fresh = () => ({v:1, name:"", gen:"", avatar:"🦁", owned:["🦁","🐯","🐼","🐰"], xp:0, coins:0, stars:{}, best:{}, badges:[], correct:0,
  streak:{last:"", n:0}, daily:{date:"", wins:0, done:false}, finalWon:false, mode:"comp", created:new Date().toISOString().slice(0,10)});
let S = null; // يُحمَّل عند فتح الصفحة
function load(){ const s = store.get(KEY, null); if(!s || typeof s!=="object") return fresh(); return Object.assign(fresh(), s); }
function save(){ store.set(KEY, S); }
const today = () => { const d = new Date(); return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0"); };
const wName = w => LANG==="fr" ? w.fr : w.ar;
const rankOf = xp => { let r = RANKS[0]; RANKS.forEach(x => { if(xp >= x.xp) r = x; }); return r; };
const rankName = r => (LANG==="fr" ? r.fr : r.ar);
const curRank = () => S.finalWon ? GENIUS : rankOf(S.xp);

/* المراحل لكل عالم من الكراسة */
function stagesOf(wid){
  const L = (window.SFA_WB && SFA_WB.lessons || []).find(l => l.id===wid); if(!L) return [];
  const st = [];
  for(let k=0;k<L.ex.length;k+=10) st.push({key:`${wid}-s${k/10}`, type:"stage", n:k/10+1, items:L.ex.slice(k,k+10), pass:7, s2:9, s3:10});
  if(L.c7 && L.c7.length) st.push({key:`${wid}-b7`, type:"boss", items:L.c7, pass:3, s2:4, s3:5});
  if(L.c15 && L.c15.length) st.push({key:`${wid}-b15`, type:"super", items:L.c15, pass:3, s2:4, s3:5});
  return st;
}
const ALL = () => WORLDS.flatMap(w => stagesOf(w.id).map(s => Object.assign({w:w.id}, s)));
const starsOf = k => S.stars[k] || 0;
function isUnlocked(key){ const all = ALL(); const i = all.findIndex(s=>s.key===key); return i<=0 || starsOf(all[i-1].key) >= 1; }
const worldCleared = wid => stagesOf(wid).every(s => starsOf(s.key) >= 1);
const allCleared = () => WORLDS.every(w => worldCleared(w.id));
const totalStars = () => Object.values(S.stars).reduce((a,b)=>a+b,0);

/* ---------------- أصوات صغيرة ---------------- */
function beep(kind){
  if(window.SFAMusic){ if(!SFAMusic.sfxOn) return; if(kind!=="tick") SFAMusic.duck(); }
  try{ const A = new (window.AudioContext||window.webkitAudioContext)(), n = A.currentTime;
    if(kind==="tick"){ const o=A.createOscillator(), g=A.createGain(); o.type="square"; o.frequency.value=1200; g.gain.setValueAtTime(0.05,n); g.gain.exponentialRampToValueAtTime(0.0001,n+0.06); o.connect(g).connect(A.destination); o.start(n); o.stop(n+0.07); setTimeout(()=>{ try{A.close();}catch(e){} }, 300); return; }
    const seq = kind==="ok" ? [[880,0],[1318.5,0.08]] : kind==="bad" ? [[196,0],[155.6,0.12]] : [[523.25,0],[659.25,.1],[783.99,.2],[1046.5,.3],[1318.5,.42]];
    seq.forEach(([f,d])=>{ const o=A.createOscillator(), g=A.createGain(); o.type = kind==="bad"?"sawtooth":"triangle"; o.frequency.value=f;
      g.gain.setValueAtTime(0.0001,n+d); g.gain.exponentialRampToValueAtTime(kind==="bad"?0.08:0.16,n+d+0.02); g.gain.exponentialRampToValueAtTime(0.0001,n+d+0.3);
      o.connect(g).connect(A.destination); o.start(n+d); o.stop(n+d+0.35); });
    setTimeout(()=>{ try{A.close();}catch(e){} }, 1200);
  }catch(e){}
}

/* ---------------- الصفحة الرئيسية للرحلة ---------------- */
let timer = null;
function stopTimer(){ if(timer){ clearInterval(timer); timer = null; } clearQ(); unbindLeave(); }
window.addEventListener("hashchange", stopTimer);

window.viewJourney = function(){
  mapFn = null; stopTimer(); S = load();
  if(!window.SFA_WB){ app.innerHTML = `<div class="empty">⚠️ workbook.js</div>`; return; }
  if(!S.name) return viewCreate();
  renderMap();
};

function viewCreate(){
  if(window.SFAMusic) SFAMusic.scene("map");
  let gen = "", av = "🦁";
  app.innerHTML = `<div class="jfree">${jt("free")}</div>
  <div class="card lockbox login" style="max-width:520px">
    <div class="big">🗺️</div><h2>${jt("createT")}</h2><p class="muted">${jt("createD")}</p>
    <form id="jCreate" autocomplete="off">
      <label class="field"><span>${jt("name")}</span><input class="input name-in" id="jName" maxlength="30" placeholder="${jt("namePh")}" dir="auto"></label>
      <div class="gender"><button type="button" class="gbtn" data-gen="m"><span>👦</span>${jt("boy")}</button><button type="button" class="gbtn" data-gen="f"><span>👧</span>${jt("girl")}</button></div>
      <div class="field"><span>${jt("pickAv")}</span><div class="avpick">${AVATARS.filter(a=>!a.p).map((a,i)=>`<button type="button" class="av ${i===0?"on":""}" data-av="${a.e}">${a.e}</button>`).join("")}</div></div>
      <div class="err" id="jErr"></div><button class="btn big-btn" style="width:100%">${jt("start")}</button>
    </form></div>`;
  app.querySelectorAll("[data-gen]").forEach(b => b.onclick = () => { gen = b.dataset.gen; app.querySelectorAll("[data-gen]").forEach(x=>x.classList.toggle("on",x===b)); });
  app.querySelectorAll("[data-av]").forEach(b => b.onclick = () => { av = b.dataset.av; app.querySelectorAll("[data-av]").forEach(x=>x.classList.toggle("on",x===b)); });
  $("#jName").focus();
  $("#jCreate").onsubmit = e => { e.preventDefault(); const n = $("#jName").value.trim().replace(/\s+/g," ");
    if(n.length<2) return $("#jErr").textContent = jt("needName"); if(!gen) return $("#jErr").textContent = jt("needGen");
    S.name = n; S.gen = gen; S.avatar = av; save(); renderMap();
    if(typeof showWelcome==="function") showWelcome(n, gen, 1); };
}

function playerCard(){
  const r = curRank(), nextR = S.finalWon ? null : RANKS.find(x => x.xp > S.xp);
  const base = rankOf(S.xp).xp, pct = nextR ? Math.round((S.xp-base)/(nextR.xp-base)*100) : 100;
  const dl = S.daily.date===today() ? S.daily : {wins:0, done:false};
  return `<div class="pcard">
    <button class="pav" data-open="shop" title="${jt("shop")}">${S.avatar}</button>
    <div class="pinfo">
      <div class="pname" dir="auto">${esc(S.name)}</div>
      <div class="prank">${r.ico} ${esc(rankName(r))}</div>
      <div class="xpbar"><i style="width:${pct}%"></i></div>
      <div class="pxp">${S.xp} ${jt("xp")}${nextR?` / ${nextR.xp} → ${nextR.ico}`:""}</div>
    </div>
    <div class="pstats">
      <span title="${jt("coins")}">🟡 <b>${S.coins}</b></span>
      <span title="${jt("stars")}">⭐ <b>${totalStars()}</b></span>
      <span title="${jt("streak")}">🔥 <b>${S.streak.last===today()||isYesterday(S.streak.last)?S.streak.n:0}</b></span>
    </div>
  </div>
  <div class="modesw"><button class="${S.mode!=="train"?"on":""}" data-mode="comp"><b>${jt("modeComp")}</b><small>${jt("modeCompD")}</small></button><button class="${S.mode==="train"?"on":""}" data-mode="train"><b>${jt("modeTrain")}</b><small>${jt("modeTrainD")}</small></button></div>
  <div class="pbar">
    <div class="daily ${dl.done?"done":""}">${dl.done?jt("dailyDone"):`${jt("daily")}: ${jt("dailyD")} <b>(${Math.min(dl.wins,2)}/2)</b>`}</div>
    <button class="btn sm ghost" data-open="shop">${jt("shop")}</button>
    <button class="btn sm ghost" data-open="badges">${jt("badges")} <b>${S.badges.length}/${BADGES.length}</b></button>
    <button class="btn sm ghost" data-open="save">${jt("save")}</button>
    <button class="btn sm ghost" data-open="fb">${jt("rateBtn")}</button>
    ${window.SFAMusic ? SFAMusic.buttons() : ""}
  </div>`;
}
function isYesterday(d){ if(!d) return false; const x = new Date(d+"T12:00:00"); x.setDate(x.getDate()+1); const y = x.getFullYear()+"-"+String(x.getMonth()+1).padStart(2,"0")+"-"+String(x.getDate()).padStart(2,"0"); return y===today(); }

let mapFn = null;
function renderMap(scrollTo){
  stopTimer();
  if(window.SFAMusic) SFAMusic.scene("map");
  if(mapFn) return mapFn(scrollTo);
  const all = ALL(); const firstOpen = all.find(s => isUnlocked(s.key) && !starsOf(s.key));
  const worlds = WORLDS.map(w => {
    const st = stagesOf(w.id), got = st.reduce((a,s)=>a+starsOf(s.key),0), max = st.length*3, cleared = worldCleared(w.id), open = isUnlocked(st[0].key);
    const L = SFA_WB.lessons.find(l=>l.id===w.id);
    return `<section class="world ${open?"":"wlocked"} ${cleared?"wdone":""}" id="world${w.id}" style="--c1:${w.c1};--c2:${w.c2}">
      <div class="whead"><div class="wico">${open?w.ico:"🔒"}</div>
        <div class="wt"><h3>${esc(wName(w))}</h3><small>${jt("lesson")} ${w.id}: ${esc(LANG==="fr"?L.fr:L.ar)}</small></div>
        <div class="wstars">⭐ ${got}/${max}</div></div>
      <div class="wprog"><i style="width:${Math.round(got/max*100)}%"></i></div>
      <div class="path">${st.map(s => {
        const un = isUnlocked(s.key), sc = starsOf(s.key), cur = firstOpen && firstOpen.key===s.key;
        const label = s.type==="stage" ? s.n : (s.type==="boss" ? w.bIco : "💀");
        return `<button class="node ${s.type} ${un?"":"lk"} ${sc?"ok":""} ${cur?"cur":""}" ${un?`data-play="${s.key}"`:""} title="${un?"":jt("locked")}">
          <span class="nlab">${un?label:"🔒"}</span>${cur?`<span class="here">${S.avatar}</span>`:""}
          <span class="nst">${"★".repeat(sc)}${"☆".repeat(3-sc)}</span>
          <span class="ncap">${s.type==="stage"?`${jt("stage")} ${s.n}`:s.type==="boss"?jt("boss"):jt("superBoss")}</span></button>`;
      }).join('<span class="link"></span>')}</div>
      ${cleared?`<div class="wfoot"><span class="tag green">${jt("worldDone")}</span><button class="btn sm" data-cert="${w.id}">${jt("cert")}</button></div>`:""}
    </section>`;
  }).join("");
  const fOpen = allCleared();
  app.innerHTML = `<div class="jfree">${jt("free")}</div>
    <div class="jhead"><h1>🏆 ${jt("title")}</h1><p class="muted">${jt("sub")}</p><a class="btn sm" href="#journey" style="margin-top:6px">${jt("go3d")}</a></div>
    ${playerCard()}
    <h2 class="maph">${jt("mapT")}</h2>
    <div class="worlds">${worlds}
      <section class="world final ${fOpen?"":"wlocked"} ${S.finalWon?"wdone":""}">
        <div class="ftrophy">${S.finalWon?"🏆":fOpen?FINAL.ico:"🔒"}</div>
        <h3>${jt("finalT")}</h3><p class="muted">${S.finalWon?jt("finalWon"):jt("finalD")}</p>
        ${fOpen?`<button class="btn big-btn" data-play="final">${jt("finalGo")}</button>`:""}
        ${S.finalWon?` <button class="btn sm" data-cert="final">${jt("cert")}</button>`:""}
      </section>
    </div>`;
  app.querySelectorAll("[data-play]").forEach(b => b.onclick = () => play(b.dataset.play));
  app.querySelectorAll("[data-mode]").forEach(b => b.onclick = () => { S.mode = b.dataset.mode; save(); renderMap(); });
  app.querySelectorAll("[data-open]").forEach(b => b.onclick = () => ({shop:openShop, badges:openBadges, save:openSave, fb:()=>window.sfaAskFeedback()})[b.dataset.open]());
  app.querySelectorAll("[data-cert]").forEach(b => b.onclick = () => openCert(b.dataset.cert));
  const target = scrollTo ? document.getElementById(scrollTo) : (firstOpen ? document.getElementById("world"+firstOpen.w) : null);
  if(target) setTimeout(()=>target.scrollIntoView({behavior:"smooth", block:"center"}), 120);
}

/* ---------------- اللعب ---------------- */
function shuffle(a){ a = a.slice(); for(let i=a.length-1;i>0;i--){ const j = Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; }
function finalStage(){
  const pool = [];
  WORLDS.forEach(w => { const L = SFA_WB.lessons.find(l=>l.id===w.id); if(!L) return; pool.push(...shuffle(L.c7||[]).slice(0,1), ...shuffle(L.ex.slice(20)).slice(0,1)); });
  return {key:"final", type:"final", w:0, items:shuffle(pool).slice(0,12), pass:10, s2:11, s3:12};
}
/* ---------------- أوقات وضع المسابقة ---------------- */
const digitsOf = x => String(Math.abs(x)).length;
const ROW_T = d => d<=1 ? 1250 : d===2 ? 2000 : 3000;          // وقت كل سطر في التمارين المكتوبة
const qTime = it => 2000 + it.reduce((a,x)=>a+ROW_T(digitsOf(x)),0);
const FLASH_T = d => d<=1 ? 850 : d===2 ? 1150 : 1500;           // مدة ظهور كل عدد وامض
const ANS_T = it => Math.max(...it.map(digitsOf))<=1 ? 6000 : 8000; // وقت كتابة الجواب بعد الوميض
let qTimers = [], leaveHandler = null;
function clearQ(){ qTimers.forEach(x=>{ clearTimeout(x); clearInterval(x); }); qTimers = []; }
function unbindLeave(){ if(leaveHandler){ document.removeEventListener("visibilitychange", leaveHandler); window.removeEventListener("blur", leaveHandler); leaveHandler = null; } }

function play(key){
  const st = key==="final" ? finalStage() : ALL().find(s=>s.key===key);
  if(!st || (key!=="final" && !isUnlocked(key))) return;
  const w = WORLDS.find(x=>x.id===st.w);
  const isBoss = st.type!=="stage";
  const comp = st.type==="final" || S.mode!=="train";
  const flashMode = comp && isBoss;
  const bIco = st.type==="final" ? FINAL.ico : st.type==="super" ? "💀" : w.bIco;
  const bName = st.type==="final" ? (LANG==="fr"?FINAL.fr:FINAL.ar) : w ? (LANG==="fr"?w.bFr:w.bAr) : "";
  let i = 0, ok = 0, secs = 0, speed = 0, misses = 0, busy = false, current = null;
  if(window.SFAMusic){ SFAMusic.focus(false); SFAMusic.scene(isBoss ? "boss" : "stage"); }
  const total = st.items.length;
  window.scrollTo({top:0});
  app.innerHTML = `<div class="playwrap" style="--c1:${w?w.c1:"#f5c542"};--c2:${w?w.c2:"#f7931e"}">
    <div class="phead"><button class="btn sm ghost" id="pBack">${jt("back")}</button>
      <div class="ptitle">${w?w.ico+" "+esc(wName(w))+" · ":""}${st.type==="stage"?jt("stage")+" "+st.n:st.type==="final"?jt("finalT"):(st.type==="boss"?jt("boss"):jt("superBoss"))}
        <span class="mtag ${comp?"comp":"train"}">${comp?jt("compTag"):jt("trainTag")}</span></div>
      ${window.SFAMusic ? SFAMusic.buttons() : ""}<span class="score-pill">${jt("time")} <b id="pT">0:00</b></span></div>
    ${comp?`<div class="noleave">${jt("noLeave")}</div>`:""}
    ${isBoss?`<div class="bossbox"><div class="bossico" id="bIco">${bIco}</div><div class="bossinfo"><b>${esc(bName)}</b><div class="hpbar"><i id="hp" style="width:100%"></i></div><small>${jt("hp")}</small></div></div>`:""}
    <div class="dots">${st.items.map((_,k)=>`<i id="d${k}" class="${k===0?"cur":""}"></i>`).join("")}</div>
    <div class="pcardq" id="qBox"></div>
    <div class="pfb" id="fb"></div>
  </div>`;
  $("#pBack").onclick = () => { stopTimer(); renderMap(w?"world"+w.id:null); };
  stopTimer(); timer = setInterval(()=>{ secs++; const el = document.getElementById("pT"); if(!el) return stopTimer(); el.textContent = Math.floor(secs/60)+":"+String(secs%60).padStart(2,"0"); }, 1000);
  if(comp){ leaveHandler = e => { if(e.type==="visibilitychange" && !document.hidden) return; if(current) current(null, "left"); };
    document.addEventListener("visibilitychange", leaveHandler); window.addEventListener("blur", leaveHandler); }
  const fmt = (x,k) => k===0 ? (x<0?"−"+(-x):String(x)) : (x<0?"− "+(-x):"+ "+x);

  function countdown(ms, onEnd){
    const bar = $("#tb"), num = $("#tn"), t0 = performance.now(); let lastSec = null;
    const iv = setInterval(()=>{
      const left = Math.max(0, ms - (performance.now()-t0)), pct = left/ms*100;
      if(bar){ bar.style.width = pct+"%"; bar.className = pct>50 ? "" : pct>25 ? "mid" : "low"; }
      const s = Math.ceil(left/1000); if(num) num.textContent = s;
      if(s<=3 && s>0 && s!==lastSec){ lastSec = s; beep("tick"); }
      if(left<=0){ clearInterval(iv); onEnd(); }
    }, 100);
    qTimers.push(iv);
    return () => performance.now()-t0;
  }

  function show(){
    const it = st.items[i], ans = it.reduce((a,b)=>a+b,0);
    busy = false; clearQ();
    $("#qBox").innerHTML = `<div class="qn">${jt("exN")} ${i+1} ${jt("of")} ${total}</div>
      ${comp?`<div class="tbar"><i id="tb"></i></div><div class="tnum">⏳ <b id="tn"></b></div>`:""}
      ${flashMode ? `<div class="fbox" id="fbx"><span id="fN">${jt("flashReady")}</span></div>`
                  : `<div class="qcol ${it.length>7?"long":""}">${it.map((x,k)=>`<div class="${x<0?"neg":""}">${fmt(x,k)}</div>`).join("")}</div>`}
      <form id="qF" ${flashMode?'style="display:none"':""}>${flashMode?`<div class="fask">${jt("flashAsk")}</div>`:""}<input class="input ans" id="qA" inputmode="numeric" autocomplete="off" placeholder="?"><button class="btn">${jt("check")}</button></form>`;
    let elapsed = () => 0, limit = 0;
    const resolve = (v, reason) => {
      if(busy) return; busy = true; current = null; clearQ(); if(flashMode && window.SFAMusic) SFAMusic.focus(false);
      const right = !reason && Number(v)===ans;
      const fast = right && comp && elapsed() < limit/2;
      const dot = $("#d"+i); if(dot) dot.className = right?"ok":"bad";
      const fb = $("#fb"), box = $("#qBox");
      if(right){ ok++; if(fast) speed++; beep("ok"); const g = jt("great");
        fb.innerHTML = `<span class="fbok">✔ ${g[Math.floor(Math.random()*g.length)]} <em>+10 XP</em>${fast?` <em class="spd">${jt("speed")}</em>`:""}</span>`; box.classList.add("flashok");
        if(isBoss){ const hp = Math.max(0, 100 - Math.round(ok/st.pass*100)); $("#hp").style.width = hp+"%"; const bi = $("#bIco"); bi.classList.remove("hit"); void bi.offsetWidth; bi.classList.add("hit"); } }
      else { misses++; beep("bad");
        const msg = reason==="timeout" ? jt("timeout") : reason==="left" ? jt("left") : "✘";
        fb.innerHTML = `<span class="fbbad">${msg} ${jt("answer")}<b dir="ltr">${ans}</b></span>`; box.classList.add("shake");
        if(flashMode){ const fbx = $("#fbx"); if(fbx) fbx.innerHTML = `<div class="qcol ${it.length>7?"long":""}">${it.map((x,k)=>`<div class="${x<0?"neg":""}">${fmt(x,k)}</div>`).join("")}</div>`; } }
      qTimers.push(setTimeout(()=>{ box.classList.remove("flashok","shake"); fb.innerHTML = ""; i++;
        if(i>=total) return finish(); const d = $("#d"+i); if(d) d.className = "cur"; show(); }, right ? 800 : (flashMode ? 2600 : 1800)));
    };
    $("#qF").onsubmit = e => { e.preventDefault(); const v = $("#qA").value.trim().replace("−","-"); if(v==="") return; resolve(v); };
    if(!comp){ $("#qA").focus(); return; }
    current = resolve;
    if(flashMode){
      const fN = $("#fN"); let k = 0;
      const askNow = () => { if(busy) return; $("#fbx").innerHTML = `<span class="fdone">❓</span>`; $("#qF").style.display = ""; $("#qA").focus();
        limit = ANS_T(it); elapsed = countdown(limit, () => resolve(null, "timeout")); };
      const next = () => { if(busy) return;
        if(k>=it.length) return askNow();
        const x = it[k]; fN.textContent = ""; fN.className = "";
        qTimers.push(setTimeout(()=>{ if(busy) return; fN.textContent = x<0 ? "−"+(-x) : (k===0 ? x : "+"+x); fN.className = "fnum "+(x<0?"neg":""); k++;
          qTimers.push(setTimeout(next, FLASH_T(digitsOf(x)))); }, 140));
      };
      const tb = $("#tb"); if(tb) tb.style.width = "100%";
      if(window.SFAMusic) SFAMusic.focus(true);
      qTimers.push(setTimeout(next, 900));
    } else {
      $("#qA").focus(); limit = qTime(it); elapsed = countdown(limit, () => resolve(null, "timeout"));
    }
  }

  function finish(){
    stopTimer();
    if(window.SFAMusic) SFAMusic.focus(false);
    if(!comp){
      if(window.SFAMusic) SFAMusic.scene(null);
      const xp = ok*5; S.xp += xp; S.correct += ok;
      const newB = []; if(S.correct>=100 && !S.badges.includes("hundred")){ S.badges.push("hundred"); newB.push(BADGES.find(b=>b.id==="hundred")); }
      save(); window.scrollTo({top:0});
      app.querySelector(".playwrap").innerHTML = `<div class="rescard">
        <h2>${jt("trainRes")}</h2>
        <div class="resline">${jt("result")}: <b>${ok}/${total}</b> · ${jt("time")} ${Math.floor(secs/60)}:${String(secs%60).padStart(2,"0")}</div>
        <div class="gains"><span>⚡ ${fill(jt("gainXp"),{n:xp})}</span></div>
        ${newB.map(b=>`<div class="newbadge">${jt("newBadge")}${b.ico} ${esc(LANG==="fr"?b.fr:b.ar)}</div>`).join("")}
        <div class="muted">${jt("trainNote")}</div>
        <div class="row" style="margin-top:14px"><button class="btn ghost" id="rRetry">${jt("retry")}</button><button class="btn" id="rComp">${jt("tryComp")}</button><button class="btn ghost" id="rMap">${jt("map")}</button></div></div>`;
      $("#rRetry").onclick = () => play(st.key);
      $("#rComp").onclick = () => { S.mode = "comp"; save(); play(st.key); };
      $("#rMap").onclick = () => renderMap(w?"world"+w.id:null);
      return;
    }
    const stars = ok>=st.s3 ? 3 : ok>=st.s2 ? 2 : ok>=st.pass ? 1 : 0, passed = stars>0;
    const old = st.key==="final" ? (S.finalWon?3:0) : starsOf(st.key);
    const rBefore = curRank();
    let xp = ok*10 + speed*5 + (passed && isBoss ? 30 : 0) + (st.type==="final" && passed ? 200 : 0), coins = 0;
    if(stars > old) coins += (stars-old) * (isBoss ? 10 : 5);
    if(passed && !old && isBoss) coins += 20;
    S.xp += xp; S.correct += ok;
    const newBadges = [];
    const award = id => { if(!S.badges.includes(id)){ S.badges.push(id); newBadges.push(BADGES.find(b=>b.id===id)); } };
    if(passed){
      if(st.key!=="final" && stars>old) S.stars[st.key] = stars;
      const td = today(); if(S.streak.last!==td){ S.streak.n = isYesterday(S.streak.last) ? S.streak.n+1 : 1; S.streak.last = td; }
      if(S.daily.date!==td) S.daily = {date:td, wins:0, done:false};
      S.daily.wins++; if(S.daily.wins>=2 && !S.daily.done){ S.daily.done = true; coins += 15; }
      award("first");
      if(ok===total && st.type==="stage") award("perfect");
      if(isBoss && stars===3) award("flash");
      if(S.streak.n>=3) award("fire3"); if(S.streak.n>=7) award("fire7");
      if(WORLDS.some(x=>worldCleared(x.id))) award("world");
      if(WORLDS.every(x=>starsOf(x.id+"-b7")>=1)) award("hunter");
      if(st.type==="final"){ S.finalWon = true; award("genius"); }
    }
    if(S.correct>=100) award("hundred");
    S.coins += coins;
    const best = S.best[st.key]; if(!best || ok>best.ok || (ok===best.ok && secs<best.t)) S.best[st.key] = {ok, t:secs};
    save();
    const rAfter = curRank(), rankUp = rAfter!==rBefore;
    const worldJustCleared = passed && w && !old && worldCleared(w.id);
    const all = ALL(), idx = all.findIndex(s=>s.key===st.key), nxt = idx>=0 ? all[idx+1] : null;
    window.scrollTo({top:0});
    app.querySelector(".playwrap").innerHTML = `<div class="rescard ${passed?"win":"lose"}">
      ${isBoss && passed ? `<div class="bossdown">${bIco}💥</div><div class="muted">${jt("bossWin")}${esc(bName)}!</div>` : ""}
      <h2>${passed?jt("passed"):jt("failed")}</h2>
      <div class="bigstars">${[1,2,3].map(k=>`<span class="${k<=stars?"on":""}" style="animation-delay:${k*0.25}s">★</span>`).join("")}</div>
      <div class="resline">${jt("result")}: <b>${ok}/${total}</b> · ${jt("time")} ${Math.floor(secs/60)}:${String(secs%60).padStart(2,"0")}</div>
      ${!passed?`<div class="muted">${fill(jt("need"),{n:st.pass})}</div>`:""}
      <div class="gains"><span>⚡ ${fill(jt("gainXp"),{n:xp})}</span>${speed?`<span>🚀 ${fill(jt("speedN"),{n:speed})}</span>`:""}${coins?`<span>🟡 ${fill(jt("gainCoins"),{n:coins})}</span>`:""}</div>
      ${rankUp?`<div class="rankup">${jt("rankUp")}${rAfter.ico} ${esc(rankName(rAfter))}</div>`:""}
      ${newBadges.map(b=>`<div class="newbadge">${jt("newBadge")}${b.ico} ${esc(LANG==="fr"?b.fr:b.ar)}</div>`).join("")}
      <div class="row" style="margin-top:14px">
        <button class="btn ghost" id="rRetry">${jt("retry")}</button>
        ${passed && nxt && st.key!=="final" ? `<button class="btn" id="rNext">${jt("next")}</button>` : ""}
        <button class="btn ${passed&&!nxt?"":"ghost"}" id="rMap">${jt("map")}</button>
      </div></div>`;
    $("#rRetry").onclick = () => play(st.key);
    $("#rMap").onclick = () => renderMap(w?"world"+w.id:null);
    const rn = $("#rNext"); if(rn) rn.onclick = () => play(nxt.key);
    if(window.SFAMusic){ if(passed) SFAMusic.victory(); else SFAMusic.scene(null); }
    if(passed){ beep("win"); const cv = document.createElement("canvas"); cv.className = "jconf"; document.body.appendChild(cv);
      try{ const stop = confettiBurst(cv); setTimeout(()=>{ stop(); cv.remove(); }, 4300); }catch(e){ cv.remove(); } }
    if(st.type==="final" && passed) setTimeout(()=>bigCelebration(jt("victoryT"), jt("victoryD"), "🏆", ()=>openCert("final")), 900);
    else if(worldJustCleared) setTimeout(()=>bigCelebration(jt("worldClearT"), fill(jt("worldClearD"),{w:wName(w)}), w.ico, ()=>openCert(String(w.id))), 900);
  }
  show();
}

/* ---------------- احتفال كبير ---------------- */
function bigCelebration(title, sub, ico, onCert){
  const ov = document.createElement("div"); ov.className = "welcome";
  ov.innerHTML = `<canvas></canvas><div class="wbox">
    <div class="wring"><div class="orbit">${Array.from({length:8},(_,i)=>`<i style="--i:${i}"></i>`).join("")}</div><div class="trophy">${ico}</div></div>
    <h1 class="wtitle">${fill(esc(title),{n:`<span class="wname" dir="auto">${esc(S.name)}</span>`})}</h1><p class="wsub">${esc(sub)}</p>
    <div class="row" style="justify-content:center;gap:10px"><button class="btn big-btn" id="cvCert">${jt("cert")}</button><button class="btn ghost" id="cvClose">${jt("close")}</button></div></div>`;
  document.body.appendChild(ov);
  let stop = () => {}; try{ stop = confettiBurst(ov.querySelector("canvas")); }catch(e){}
  try{ playChime(); }catch(e){}
  requestAnimationFrame(()=>ov.classList.add("show"));
  const close = () => { ov.classList.remove("show"); setTimeout(()=>{ stop(); ov.remove(); }, 400); };
  ov.querySelector("#cvClose").onclick = close;
  ov.querySelector("#cvCert").onclick = () => { close(); onCert(); };
}

/* ---------------- نوافذ: المتجر، الأوسمة، الحفظ، الشهادة ---------------- */
function modal(html, cls){
  const m = document.createElement("div"); m.className = "jmodal "+(cls||"");
  m.innerHTML = `<div class="jbox"><button class="jx" aria-label="close">✕</button>${html}</div>`;
  document.body.appendChild(m); requestAnimationFrame(()=>m.classList.add("open"));
  const close = () => { m.classList.remove("open"); setTimeout(()=>m.remove(), 250); };
  m.querySelector(".jx").onclick = close; m.onclick = e => { if(e.target===m) close(); };
  return {el:m, close};
}
function openShop(){
  const M = modal(`<h2>${jt("shopT")}</h2><p class="muted">${jt("shopD")}</p><div class="coinsline">🟡 <b id="shC">${S.coins}</b> ${jt("coins")}</div><div class="shopgrid" id="shG"></div>`);
  const draw = () => {
    M.el.querySelector("#shC").textContent = S.coins;
    M.el.querySelector("#shG").innerHTML = AVATARS.map(a => { const own = S.owned.includes(a.e), cur = S.avatar===a.e;
      return `<div class="shopit ${cur?"cur":""}"><div class="se">${a.e}</div>
        ${own ? `<button class="btn sm ${cur?"":"ghost"}" data-use="${a.e}">${cur?jt("inUse"):jt("use")}</button>` : `<button class="btn sm blue" data-buy="${a.e}">🟡 ${a.p}</button>`}</div>`; }).join("");
    M.el.querySelectorAll("[data-use]").forEach(b => b.onclick = () => { S.avatar = b.dataset.use; save(); draw(); });
    M.el.querySelectorAll("[data-buy]").forEach(b => b.onclick = () => { const a = AVATARS.find(x=>x.e===b.dataset.buy);
      if(S.coins < a.p) return toast(jt("noCoins")); S.coins -= a.p; S.owned.push(a.e); S.avatar = a.e;
      if(S.owned.length>=6 && !S.badges.includes("collector")) S.badges.push("collector");
      save(); beep("ok"); toast(jt("bought")+" "+a.e); draw(); });
  };
  draw();
  const obs = new MutationObserver(()=>{ if(!document.body.contains(M.el)){ obs.disconnect(); renderMap(); } }); obs.observe(document.body,{childList:true});
}
function openBadges(){
  modal(`<h2>${jt("badgesT")}</h2><div class="badgegrid">${BADGES.map(b=>{ const has = S.badges.includes(b.id);
    return `<div class="badge ${has?"has":""}"><div class="bi">${has?b.ico:"🔒"}</div><b>${esc(LANG==="fr"?b.fr:b.ar)}</b><small>${esc(LANG==="fr"?b.dFr:b.dAr)}</small></div>`; }).join("")}</div>`);
}
function encodeState(){ return "SFA1-" + btoa(unescape(encodeURIComponent(JSON.stringify(S)))); }
function decodeState(code){ const c = String(code||"").trim().replace(/\s+/g,""); if(!c.startsWith("SFA1-")) throw 0; const o = JSON.parse(decodeURIComponent(escape(atob(c.slice(5))))); if(!o || typeof o!=="object" || !("xp" in o) || !("stars" in o)) throw 0; return o; }
function openSave(){
  const code = encodeState();
  const M = modal(`<h2>${jt("saveT")}</h2><p class="muted">${jt("saveD")}</p>
    <textarea class="input savecode" readonly dir="ltr" rows="4">${esc(code)}</textarea>
    <button class="btn" id="svCopy">${jt("copy")}</button>
    <hr style="border-color:var(--line);margin:18px 0"><h3>${jt("importT")}</h3>
    <textarea class="input" id="svIn" dir="ltr" rows="3" placeholder="${jt("importPh")}"></textarea>
    <button class="btn blue" id="svImp" style="margin-top:8px">${jt("importBtn")}</button>
    <hr style="border-color:var(--line);margin:18px 0"><button class="btn sm red" id="svReset">${jt("reset")}</button> <small class="muted">${jt("resetD")}</small>`);
  const ta = M.el.querySelector(".savecode");
  M.el.querySelector("#svCopy").onclick = async () => { ta.select(); try{ await navigator.clipboard.writeText(code); toast(jt("copied")); }catch(e){ try{ document.execCommand("copy"); toast(jt("copied")); }catch(_){} } };
  M.el.querySelector("#svImp").onclick = e => { let o; try{ o = decodeState(M.el.querySelector("#svIn").value); }catch(err){ return toast(jt("importBad")); }
    armedJ(e.target, () => { S = Object.assign(fresh(), o); save(); M.close(); toast(jt("importOk")); renderMap(); }); };
  M.el.querySelector("#svReset").onclick = e => armedJ(e.target, () => { S = fresh(); save(); M.close(); viewJourney(); });
}
function armedJ(btn, fn){ if(btn.dataset.arm){ fn(); return; } const old = btn.textContent; btn.dataset.arm = 1; btn.textContent = jt("confirm"); setTimeout(()=>{ if(btn.isConnected){ delete btn.dataset.arm; btn.textContent = old; } }, 3000); }

function openCert(which){
  const isFinal = which==="final", w = WORLDS.find(x=>String(x.id)===String(which));
  const date = new Date().toLocaleDateString(LANG==="ar"?"ar-MA":"fr-FR",{year:"numeric",month:"long",day:"numeric"});
  const reason = isFinal ? jt(S.gen==="f"?"certFinalF":"certFinal") : fill(jt("certWorld"),{w:wName(w)});
  const M = modal(`<div class="cert" id="certSheet">
      <div class="cbrd">
        <div class="clogos"><img src="logo-soroban.png" alt=""><img src="logo-sem.png" alt=""></div>
        <div class="cbig">${isFinal?"🏆":w.ico}</div>
        <h1>${jt("certT")}</h1>
        <p>${jt("certTo")} ${jt(S.gen==="f"?"heroF":"heroM")}</p>
        <div class="cname" dir="auto">${esc(S.name)}</div>
        <p class="creason">${esc(reason)}</p>
        ${isFinal?`<div class="ctitle">🧠 ${esc(LANG==="fr"?GENIUS.fr:GENIUS.ar)}</div>`:""}
        <div class="cfoot"><span>${jt("certDate")} ${esc(date)}</span><span>Soroban for All · Smart Education Maroc</span></div>
      </div></div>
    <div class="row" style="justify-content:center;margin-top:12px"><button class="btn" id="cPrint">${jt("print")}</button></div>`, "certmodal");
  M.el.querySelector("#cPrint").onclick = () => { document.body.classList.add("printing-cert"); try{ window.print(); }catch(e){ toast(jt("noPrint")); } setTimeout(()=>document.body.classList.remove("printing-cert"), 800); };
}
/* واجهة للخريطة ثلاثية الأبعاد (journey3d.js) */
window.SFAJ = {
  load(){ S = load(); return S; }, get S(){ return S; }, save, jt, WORLDS, FINAL, GENIUS, RANKS, rankOf, curRank, rankName, wName,
  stagesOf, ALL, starsOf, isUnlocked, worldCleared, allCleared, totalStars, play, renderMap, viewCreate, playerCard,
  openShop, openBadges, openSave, openCert, today, isYesterday, stopTimer,
  setMapRenderer(fn){ mapFn = fn; }
};

/* ---------------- نافذة التقييم عند مغادرة المسابقة ---------------- */
const FBT = {
 ar:{ title:"كيف كانت مغامرتك يا {n}؟", sub:"رأيك يساعدنا نجعل رحلة الأبطال أروع! 💛", faces:["مملّة","عادية","جيدة","ممتعة","رائعة جداً"],
      chips:["ممتعة جداً 🎉","صعبة قليلاً 😅","الوقت قصير ⏰","أريد عوالم أكثر 🌍","أحببت الحرّاس ⚔️","أحببت الشهادة 🏅"],
      comment:"اكتب تعليقك (اختياري)", ph:"ماذا أعجبك؟ ماذا تريد أن نضيف؟", send:"📨 إرسال عبر واتساب", later:"لاحقاً", pick:"اختر وجهاً أولاً 👆",
      reward:"🎁 أرسل رأيك واربح 10 خرزات ذهبية", thanks:"شكراً لك يا بطل! 🎉", thanksF:"شكراً لكِ يا بطلة! 🎉", thanksD:"وصلتك 10 خرزات ذهبية 🟡",
      msgH:"⭐ تقييم مسابقة «رحلة الأبطال»", msgName:"الاسم", msgRate:"التقييم", msgRank:"الرتبة", msgStars:"النجوم", msgChips:"ملاحظات", msgCom:"التعليق" },
 fr:{ title:"Comment était ton aventure, {n} ?", sub:"Ton avis nous aide à rendre l'aventure encore plus géniale ! 💛", faces:["Ennuyeuse","Moyenne","Bien","Amusante","Géniale"],
      chips:["Très amusante 🎉","Un peu difficile 😅","Temps trop court ⏰","Plus de mondes 🌍","J'adore les gardiens ⚔️","J'adore le diplôme 🏅"],
      comment:"Ton commentaire (facultatif)", ph:"Qu'est-ce qui t'a plu ? Que veux-tu qu'on ajoute ?", send:"📨 Envoyer sur WhatsApp", later:"Plus tard", pick:"Choisis d'abord un visage 👆",
      reward:"🎁 Envoie ton avis et gagne 10 perles d'or", thanks:"Merci champion ! 🎉", thanksF:"Merci championne ! 🎉", thanksD:"Tu as reçu 10 perles d'or 🟡",
      msgH:"⭐ Avis sur le concours « L'aventure des champions »", msgName:"Prénom", msgRate:"Note", msgRank:"Rang", msgStars:"Étoiles", msgChips:"Remarques", msgCom:"Commentaire" }
};
const ft = k => (FBT[(typeof LANG!=="undefined" && FBT[LANG]) ? LANG : "ar"][k]);
const FACES = ["😞","😐","🙂","😃","🤩"];
function fbEligible(force){
  const st = store.get(KEY, null);
  if(!st || !st.name || !(st.xp>0)) return false;                  // لعب مرحلة واحدة على الأقل
  if(document.querySelector(".fbmodal,.welcome")) return false;
  if(force) return true;
  try{ if(sessionStorage.getItem("sfa_fbShown")) return false; }catch(e){}
  if(st.feedback && st.feedback.date){ const days = (Date.now() - new Date(st.feedback.date).getTime())/864e5; if(days < 14) return false; }
  return true;
}
function askFeedback(force){
  if(!fbEligible(force===true)) return;
  try{ sessionStorage.setItem("sfa_fbShown","1"); }catch(e){}
  const st = Object.assign(fresh(), store.get(KEY, {}));
  const wa = (typeof D!=="undefined" && D.settings && D.settings.whatsapp) || "212706600479";
  let rate = 0; const picked = new Set();
  const m = document.createElement("div"); m.className = "jmodal fbmodal";
  m.innerHTML = `<div class="jbox fbbox"><button class="jx" aria-label="close">✕</button>
    <div class="fbhero"><span class="fbav">${st.avatar||"🦁"}</span><span class="fbspark">✨</span></div>
    <h2>${esc(ft("title")).replace("{n}", `<span class="wname" dir="auto">${esc(st.name)}</span>`)}</h2>
    <p class="muted">${ft("sub")}</p>
    <div class="faces">${FACES.map((f,i)=>`<button type="button" data-r="${i+1}"><span>${f}</span><small>${ft("faces")[i]}</small></button>`).join("")}</div>
    <div class="fbchips">${ft("chips").map((c,i)=>`<button type="button" data-c="${i}">${c}</button>`).join("")}</div>
    <label class="field"><span>${ft("comment")}</span><textarea class="input" id="fbTxt" rows="3" maxlength="500" dir="auto" placeholder="${ft("ph")}"></textarea></label>
    <div class="fbreward">${ft("reward")}</div>
    <div class="err" id="fbErr"></div>
    <div class="row" style="justify-content:center;gap:10px"><a class="btn big-btn fbsend" id="fbSend" target="_blank" rel="noopener" href="#">${ft("send")}</a><button class="btn ghost" id="fbLater">${ft("later")}</button></div>
  </div>`;
  document.body.appendChild(m); requestAnimationFrame(()=>m.classList.add("open"));
  const close = () => { m.classList.remove("open"); setTimeout(()=>m.remove(), 250); };
  m.querySelector(".jx").onclick = close; m.querySelector("#fbLater").onclick = close;
  m.onclick = e => { if(e.target===m) close(); };
  const send = m.querySelector("#fbSend"), txt = m.querySelector("#fbTxt");
  const build = () => {
    const r = rankOf(st.xp), rank = st.finalWon ? GENIUS : r;
    const stars = Object.values(st.stars||{}).reduce((a,b)=>a+b,0);
    const lines = [ft("msgH"), "", `${ft("msgName")}: ${st.name}`, `${ft("msgRate")}: ${FACES[rate-1]||""} (${rate}/5)`, `${ft("msgRank")}: ${rank.ico} ${LANG==="fr"?rank.fr:rank.ar}`, `${ft("msgStars")}: ⭐ ${stars}`];
    if(picked.size) lines.push(`${ft("msgChips")}: ${[...picked].map(i=>ft("chips")[i]).join(" · ")}`);
    if(txt.value.trim()) lines.push(`${ft("msgCom")}: ${txt.value.trim()}`);
    send.href = "https://wa.me/" + wa + "?text=" + encodeURIComponent(lines.join("\n"));
  };
  m.querySelectorAll("[data-r]").forEach(b => b.onclick = () => { rate = +b.dataset.r; m.querySelectorAll("[data-r]").forEach(x=>x.classList.toggle("on", x===b)); m.querySelector("#fbErr").textContent = ""; try{ beep("ok"); }catch(e){} build(); });
  m.querySelectorAll("[data-c]").forEach(b => b.onclick = () => { const i = +b.dataset.c; picked.has(i) ? picked.delete(i) : picked.add(i); b.classList.toggle("on"); build(); });
  txt.oninput = build; build();
  send.onclick = e => {
    if(!rate){ e.preventDefault(); m.querySelector("#fbErr").textContent = ft("pick"); return; }
    build();
    const cur = Object.assign(fresh(), store.get(KEY, {}));
    const first = !cur.feedback; cur.feedback = {date:new Date().toISOString(), rate}; if(first) cur.coins += 10;
    store.set(KEY, cur); if(S) S = cur;
    setTimeout(()=>{
      m.querySelector(".fbbox").innerHTML = `<div class="fbdone"><div class="fbbig">🎉</div><h2>${ft(cur.gen==="f"?"thanksF":"thanks")}</h2>${first?`<p class="fbcoins">${ft("thanksD")}</p>`:""}<button class="btn" id="fbOk">OK</button></div>`;
      m.querySelector("#fbOk").onclick = () => { close(); if(inJ(location.hash) && S) renderMap(); };
      try{ playChime(); }catch(e){}
    }, 300);
  };
}
// الظهور عند مغادرة صفحة المسابقة (التنقل داخل الموقع)
const inJ = h => h==="#journey" || h==="#journey3d" || h==="#journey2d";
let lastHash = location.hash;
window.addEventListener("hashchange", () => { const was = lastHash; lastHash = location.hash; if(inJ(was) && !inJ(location.hash)) setTimeout(askFeedback, 600); });
// الظهور عند محاولة الخروج بالفأرة نحو أعلى النافذة (الحاسوب)
document.addEventListener("mouseout", e => { if(inJ(location.hash) && !e.relatedTarget && e.clientY <= 0 && !document.querySelector(".playwrap")) askFeedback(); });
// الظهور عند العودة للصفحة بعد إخفائها (الهاتف: الخروج من التطبيق ثم الرجوع)
document.addEventListener("visibilitychange", () => { if(!document.hidden && inJ(location.hash) && !document.querySelector(".playwrap")) setTimeout(askFeedback, 400); });
window.sfaAskFeedback = () => askFeedback(true);
})();
