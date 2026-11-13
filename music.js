/* Soroban for All — محرك موسيقى «رحلة الأبطال»
   موسيقى مؤلَّفة بالكود (Web Audio) بأسلوب ألعاب الفيديو: لا ملفات ولا حقوق.
   مقطوعات: map (حماسية) · stage (هادئة للتركيز) · boss (تشويق) + نغمة نصر.
   طبقة الموسيقى مستقلة عن المؤثرات: مستوى منخفض، انخفاض لحظي عند المؤثرات، وخفض أقصى أثناء الأرقام الوامضة. */
(function(){
"use strict";
const LS = {get(k,d){ try{ const v = localStorage.getItem("sfa_"+k); return v===null ? d : v==="1"; }catch(e){ return d; } }, set(k,v){ try{ localStorage.setItem("sfa_"+k, v?"1":"0"); }catch(e){} }};
let musicOn = LS.get("music", true), sfxOn = LS.get("sfx", true);
let A = null, master = null, bus = null, noiseBuf = null;
let cur = null, curName = null, timer = null, nextT = 0, step = 0, focusLvl = 1, wanted = null;
const BASE = 0.32;                    // مستوى الموسيقى (المؤثرات ≈ 1)
const mtof = m => 440 * Math.pow(2, (m-69)/12);

function ensure(){
  if(A) return true;
  try{ A = new (window.AudioContext||window.webkitAudioContext)(); }catch(e){ return false; }
  master = A.createGain(); master.gain.value = 1; master.connect(A.destination);
  bus = A.createGain(); bus.gain.value = BASE; bus.connect(master);
  noiseBuf = A.createBuffer(1, A.sampleRate, A.sampleRate); const d = noiseBuf.getChannelData(0); for(let i=0;i<d.length;i++) d[i] = Math.random()*2-1;
  return true;
}
// المتصفحات تشترط لمسة من المستخدم قبل الصوت
const unlock = () => { if(!wanted) return; if(ensure() && A.state==="suspended") A.resume(); if(!cur && wanted) start(wanted); };
["pointerdown","keydown","touchstart"].forEach(ev => window.addEventListener(ev, unlock, {passive:true}));
document.addEventListener("visibilitychange", () => { if(!A) return; if(document.hidden) A.suspend(); else if(musicOn && cur) A.resume(); });

/* ---------- الآلات ---------- */
function env(g, t, a, peak, dur, rel){ g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(peak, t+a); g.gain.setValueAtTime(peak, t+Math.max(a, dur-rel)); g.gain.exponentialRampToValueAtTime(0.0001, t+dur); }
function tone(dest, type, f, t, dur, vol, o={}){
  const os = A.createOscillator(), g = A.createGain(); os.type = type; os.frequency.value = f; if(o.det) os.detune.value = o.det;
  let node = os; if(o.lp){ const fl = A.createBiquadFilter(); fl.type = "lowpass"; fl.frequency.value = o.lp; fl.Q.value = o.q||0.7; os.connect(fl); node = fl; }
  node.connect(g); g.connect(dest); env(g, t, o.a||0.01, vol, dur, o.r||Math.min(0.1, dur*0.5)); os.start(t); os.stop(t+dur+0.05);
}
function marimba(dest, m, t, vol){ const f = mtof(m);
  const o1 = A.createOscillator(), o2 = A.createOscillator(), g = A.createGain(), g2 = A.createGain();
  o1.type = "sine"; o2.type = "sine"; o1.frequency.value = f; o2.frequency.value = f*4;
  o1.connect(g); o2.connect(g2); g2.connect(g); g.connect(dest);
  g.gain.setValueAtTime(0.0001,t); g.gain.exponentialRampToValueAtTime(vol,t+0.005); g.gain.exponentialRampToValueAtTime(0.0001,t+0.7);
  g2.gain.setValueAtTime(0.25,t); g2.gain.exponentialRampToValueAtTime(0.001,t+0.08);
  o1.start(t); o2.start(t); o1.stop(t+0.75); o2.stop(t+0.75); }
function noise(dest, t, dur, vol, hp, bp){ const s = A.createBufferSource(), g = A.createGain(), f = A.createBiquadFilter();
  s.buffer = noiseBuf; f.type = bp ? "bandpass" : "highpass"; f.frequency.value = bp || hp; s.connect(f); f.connect(g); g.connect(dest);
  g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.0001, t+dur); s.start(t, Math.random()*0.5); s.stop(t+dur+0.02); }
function kick(dest, t, vol=0.9){ const o = A.createOscillator(), g = A.createGain(); o.frequency.setValueAtTime(150,t); o.frequency.exponentialRampToValueAtTime(42,t+0.13);
  o.connect(g); g.connect(dest); g.gain.setValueAtTime(vol,t); g.gain.exponentialRampToValueAtTime(0.0001,t+0.28); o.start(t); o.stop(t+0.3); }
function snare(dest, t, vol=0.45){ noise(dest, t, 0.16, vol, 1400); tone(dest, "triangle", 190, t, 0.08, vol*0.5); }
function hat(dest, t, vol=0.12){ noise(dest, t, 0.035, vol, 7500); }
function tom(dest, t, f0, vol=0.6){ const o = A.createOscillator(), g = A.createGain(); o.frequency.setValueAtTime(f0,t); o.frequency.exponentialRampToValueAtTime(f0*0.55,t+0.2);
  o.connect(g); g.connect(dest); g.gain.setValueAtTime(vol,t); g.gain.exponentialRampToValueAtTime(0.0001,t+0.3); o.start(t); o.stop(t+0.32); }
function crash(dest, t, vol=0.18){ noise(dest, t, 1.1, vol, 4000); }

/* ---------- المقطوعات ---------- */
const CH = { C:[48,52,55], G:[43,47,50], Am:[45,48,52], F:[41,45,48], E:[40,44,47], Dm:[38,41,45], Bb:[46,50,53], A:[45,49,52] };
const TRACKS = {
  /* 🗺️ مغامرة بطولية — دو الكبير، 125 نبضة */
  map: { bpm:125, bars:8, chords:["C","G","Am","F","C","G","F","G"],
    lead: [
      [[0,67,3],[3,72,3],[6,76,2],[8,74,2],[10,72,2],[12,74,4]],
      [[0,71,3],[3,74,3],[6,79,6],[12,76,2],[14,74,2]],
      [[0,72,3],[3,76,3],[6,81,4],[10,79,2],[12,76,4]],
      [[0,77,4],[4,76,2],[6,74,2],[8,72,4],[12,74,4]],
      [[0,67,3],[3,72,3],[6,76,2],[8,74,2],[10,72,2],[12,76,4]],
      [[0,71,3],[3,74,3],[6,79,6],[12,81,2],[14,79,2]],
      [[0,81,3],[3,79,3],[6,77,2],[8,76,2],[10,74,2],[12,72,4]],
      [[0,74,4],[4,71,2],[6,67,2],[8,71,2],[10,74,2],[12,79,4]] ],
    play(d, bar, s, t, sd){
      const ch = CH[this.chords[bar]];
      if([0,3,6,8,11,14].includes(s)){ const n = (s===6||s===14) ? ch[0]+7 : ch[0]; tone(d, "triangle", mtof(n-12), t, sd*2.4, 0.42); }
      if(s%2===0){ const n = ch[(s/2)%3] + 12; tone(d, "square", mtof(n), t, sd*1.2, 0.035, {lp:2200}); }
      this.lead[bar].forEach(([st,m,len]) => { if(st===s){ tone(d, "square", mtof(m), t, sd*len*0.95, 0.075, {lp:3200, a:0.008}); tone(d, "triangle", mtof(m), t, sd*len*0.95, 0.06, {det:6}); } });
      if(s===0 || s===8 || (s===10 && bar%2)) kick(d, t, 0.8);
      if(s===4 || s===12) snare(d, t, 0.32);
      if(s%2===0) hat(d, t, s%4===2 ? 0.09 : 0.05);
      if(bar===0 && s===0) crash(d, t, 0.12);
      if(bar===7 && s>=12) tom(d, t, 180 - (s-12)*25, 0.4);
    }},
  /* ✏️ تركيز هادئ — لا الصغير، 92 نبضة، ماريمبا */
  stage: { bpm:92, bars:8, chords:["Am","F","C","G","Am","F","G","E"],
    pat:[0,1,2,3,2,1,0,1],
    play(d, bar, s, t, sd){
      const ch = CH[this.chords[bar]];
      if(s%2===0){ const i = this.pat[(s/2)%8]; const n = (i===3 ? ch[0]+12 : ch[i]) + 24; marimba(d, n, t, 0.16); }
      if(s===0) tone(d, "sine", mtof(ch[0]-12), t, sd*14, 0.22, {a:0.05, r:0.4});
      if(s===8) tone(d, "sine", mtof(ch[2]-12), t, sd*7, 0.12, {a:0.05, r:0.3});
      if(bar%2===0 && s===0) tone(d, "sine", mtof(ch[1]+36), t, sd*12, 0.035, {a:0.3, r:0.8});
      if(s===4 || s===12) noise(d, t, 0.05, 0.035, 0, 6500);
    }},
  /* ⚔️ تشويق المعارك — ري الصغير، 112 نبضة */
  boss: { bpm:112, bars:4, chords:["Dm","Bb","C","A"],
    play(d, bar, s, t, sd){
      const ch = CH[this.chords[bar]];
      const bn = [0,0,12,0,0,12,0,7][s%8]; tone(d, "sawtooth", mtof(ch[0]-12+bn), t, sd*0.9, 0.12, {lp:520, q:3});
      if(s===0 || s===10) ch.forEach(n => tone(d, "sawtooth", mtof(n+12), t, sd*1.6, 0.03, {lp:1800}));
      if([0,6,8,14].includes(s)) kick(d, t, 0.85);
      if(s===4 || s===12) snare(d, t, 0.3);
      if(s===13 || s===15) tom(d, t, bar===3 ? 140 : 110, 0.35);
      hat(d, t, s%2 ? 0.035 : 0.06);
      if(bar===0 && s===0) crash(d, t, 0.1);
      if(bar===3 && s%4===0) tone(d, "square", mtof(ch[0]+24+(s/4)), t, sd*1.5, 0.03, {lp:2500});
    }}
};

/* ---------- المُجدوِل ---------- */
function tick(){
  if(!cur || !A) return;
  const sd = 60/cur.track.bpm/4;
  while(nextT < A.currentTime + 0.12){
    const bar = Math.floor(step/16) % cur.track.bars, s = step % 16;
    try{ cur.track.play(cur.gain, bar, s, nextT, sd); }catch(e){ if(!tick.err){ tick.err = 1; console.error("music", e); } }
    nextT += sd; step++;
  }
}
function start(name){
  if(!musicOn || !TRACKS[name] || !ensure()) return;
  if(A.state==="suspended") A.resume();
  if(curName===name && cur) return;
  fadeOut();
  const g = A.createGain(); g.gain.setValueAtTime(0.0001, A.currentTime); g.gain.exponentialRampToValueAtTime(1, A.currentTime+0.9); g.connect(bus);
  cur = {track:TRACKS[name], gain:g}; curName = name; step = 0; nextT = A.currentTime + 0.08;
  clearInterval(timer); timer = setInterval(tick, 25); tick();
}
function fadeOut(){
  if(!cur || !A) return; const g = cur.gain, t = A.currentTime;
  g.gain.cancelScheduledValues(t); g.gain.setValueAtTime(Math.max(0.0001, g.gain.value), t); g.gain.exponentialRampToValueAtTime(0.0001, t+0.7);
  setTimeout(()=>{ try{ g.disconnect(); }catch(e){} }, 900);
  cur = null; curName = null; clearInterval(timer); timer = null;
}
function setBus(){ if(!A) return; const t = A.currentTime; bus.gain.cancelScheduledValues(t); bus.gain.setTargetAtTime(BASE*focusLvl, t, 0.15); }

/* ---------- الواجهة العامة ---------- */
const M = window.SFAMusic = {
  scene(name){ wanted = name; if(!name) return fadeOut(); start(name); },
  stop(){ wanted = null; fadeOut(); },
  focus(on){ focusLvl = on ? 0.18 : 1; setBus(); },            // أثناء الأرقام الوامضة
  duck(){ if(!A || !cur) return; const t = A.currentTime, v = BASE*focusLvl;     // انخفاض لحظي عند المؤثرات
    bus.gain.cancelScheduledValues(t); bus.gain.setValueAtTime(Math.max(0.0001, bus.gain.value), t); bus.gain.linearRampToValueAtTime(v*0.35, t+0.03); bus.gain.linearRampToValueAtTime(v, t+0.55); },
  victory(){ if(!musicOn || !ensure()) return; const was = wanted; fadeOut(); wanted = was;
    const g = A.createGain(); g.gain.value = 1.4; g.connect(bus); const t = A.currentTime + 0.1, b = 0.13;
    [[67,0,1],[72,1,1],[76,2,1],[79,3,1.5],[76,4.5,.5],[79,5,1],[84,6,4]].forEach(([m,s,l]) => { tone(g, "square", mtof(m), t+s*b, l*b*0.95, 0.09, {lp:3500}); tone(g, "triangle", mtof(m), t+s*b, l*b, 0.08); });
    [48,52,55].forEach(n => tone(g, "triangle", mtof(n), t+6*b, 4*b, 0.12)); kick(g, t+6*b, 0.8); crash(g, t+6*b, 0.16);
    setTimeout(()=>{ try{ g.disconnect(); }catch(e){} }, 2500); },
  get musicOn(){ return musicOn; }, get sfxOn(){ return sfxOn; },
  _dbg(){ return {state: A && A.state, t: A && A.currentTime, cur: curName, step, wanted, musicOn, bus: bus && bus.gain.value}; },
  toggleMusic(){ musicOn = !musicOn; LS.set("music", musicOn); if(musicOn){ if(wanted) start(wanted); } else fadeOut(); M.refreshButtons(); },
  toggleSfx(){ sfxOn = !sfxOn; LS.set("sfx", sfxOn); M.refreshButtons(); },
  buttons(){ return `<span class="sndbtns"><button type="button" data-snd="music" class="${musicOn?"":"off"}" title="Music">${musicOn?"🎵":"🔇"}</button><button type="button" data-snd="sfx" class="${sfxOn?"":"off"}" title="SFX">${sfxOn?"🔊":"🔈"}</button></span>`; },
  refreshButtons(){ document.querySelectorAll('[data-snd="music"]').forEach(b => { b.textContent = musicOn ? "🎵" : "🔇"; b.classList.toggle("off", !musicOn); });
    document.querySelectorAll('[data-snd="sfx"]').forEach(b => { b.textContent = sfxOn ? "🔊" : "🔈"; b.classList.toggle("off", !sfxOn); }); }
};
document.addEventListener("click", e => { const b = e.target.closest && e.target.closest("[data-snd]"); if(!b) return; e.preventDefault(); e.stopPropagation(); if(b.dataset.snd==="music") M.toggleMusic(); else M.toggleSfx(); }, true);
})();
