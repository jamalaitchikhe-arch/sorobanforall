/* Soroban for All — رحلة الأبطال ثلاثية الأبعاد: «جزر الأبطال العائمة» (نموذج تجريبي)
   يعتمد على Three.js (vendor/three.module.min.js، رخصة MIT) وعلى window.SFAJ من journey.js.
   كل المجسمات مرسومة بالكود بأسلوب Low-Poly؛ الشخصيات والحرّاس رموز تعبيرية على لوحات ثنائية الأبعاد. */
import * as THREE from "./vendor/three.module.min.js";

const T3 = {
 ar:{ map2d:"🗺️ الخريطة العادية", prev:"السابق", next:"التالي", play:"▶ ابدأ", locked:"🔒 أكمل المرحلة السابقة أولاً", lockedIsland:"🔒 جزيرة مقفلة — حرّر الجزيرة السابقة أولاً",
      hint:"👆 اسحب لتدوير العالم · اضغط على مرحلة لتلعب", final:"الجزيرة الذهبية", beta:"🧪 نسخة تجريبية ثلاثية الأبعاد", loading:"⏳ جارٍ بناء العالم…" },
 fr:{ map2d:"🗺️ Carte classique", prev:"Précédent", next:"Suivant", play:"▶ Jouer", locked:"🔒 Termine d'abord l'étape précédente", lockedIsland:"🔒 Île verrouillée — libère d'abord l'île précédente",
      hint:"👆 Glisse pour tourner le monde · touche une étape pour jouer", final:"L'île dorée", beta:"🧪 Version 3D expérimentale", loading:"⏳ Construction du monde…" }
};
const t3 = k => (T3[(window.LANG_GET ? window.LANG_GET() : (document.documentElement.lang||"ar"))] || T3.ar)[k] ?? T3.ar[k];
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));

let ctx = null; // حالة المشهد الحالي

export function view(){
  const J = window.SFAJ; if(!J) return;
  J.load();
  J.setMapRenderer(render);
  if(!J.S.name){ J.viewCreate(); return; }
  render();
}

function cleanup(){
  if(!ctx) return;
  cancelAnimationFrame(ctx.raf);
  ctx.disposers.forEach(f => { try{ f(); }catch(e){} });
  try{ ctx.renderer.dispose(); ctx.scene.traverse(o => { if(o.geometry) o.geometry.dispose(); if(o.material){ (Array.isArray(o.material)?o.material:[o.material]).forEach(m => { if(m.map) m.map.dispose(); m.dispose(); }); } }); }catch(e){}
  ctx = null;
}
window.SFA3D_cleanup = cleanup;

/* ---------------- أدوات الرسم ---------------- */
const EMOJI_FONT = '"Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji","Twemoji Mozilla",sans-serif';
function emojiTex(txt, px=128){
  const c = document.createElement("canvas"); c.width = c.height = px; const g = c.getContext("2d");
  g.textAlign = "center"; g.textBaseline = "middle"; g.font = `${Math.round(px*0.78)}px ${EMOJI_FONT}`; g.fillText(txt, px/2, px/2+px*0.04);
  const tx = new THREE.CanvasTexture(c); tx.colorSpace = THREE.SRGBColorSpace; return tx;
}
function sprite(tex, s){ const m = new THREE.Sprite(new THREE.SpriteMaterial({map:tex, transparent:true, depthWrite:false})); m.scale.set(s,s,1); return m; }
function labelTex(text, {bg="rgba(10,26,54,.85)", fg="#fff", border="#f5c542", px=48, font="Cairo,system-ui,sans-serif"}={}){
  const c = document.createElement("canvas"), g = c.getContext("2d");
  g.font = `900 ${px}px ${font}`; const w = Math.ceil(g.measureText(text).width) + px*1.2, h = Math.ceil(px*1.6);
  c.width = w; c.height = h; const r = h/2;
  g.font = `900 ${px}px ${font}`; g.fillStyle = bg; g.strokeStyle = border; g.lineWidth = 4;
  g.beginPath(); g.moveTo(r,2); g.lineTo(w-r,2); g.arc(w-r,r,r-2,-Math.PI/2,Math.PI/2); g.lineTo(r,h-2); g.arc(r,r,r-2,Math.PI/2,Math.PI*1.5); g.fill(); g.stroke();
  g.fillStyle = fg; g.textAlign = "center"; g.textBaseline = "middle"; g.direction = "rtl"; g.fillText(text, w/2, h/2+2);
  const tx = new THREE.CanvasTexture(c); tx.colorSpace = THREE.SRGBColorSpace; tx.userData = {aspect:w/h}; return tx;
}
function label(text, height, opts){ const tx = labelTex(text, opts); const s = sprite(tx, 1); s.scale.set(height*tx.userData.aspect, height, 1); return s; }
const mat = (color, o={}) => new THREE.MeshStandardMaterial(Object.assign({color, flatShading:true, roughness:.85, metalness:0}, o));
function jitter(geo, amt){ const p = geo.attributes.position; for(let i=0;i<p.count;i++){ p.setXYZ(i, p.getX(i)+(Math.random()-.5)*amt, p.getY(i)+(Math.random()-.5)*amt*.6, p.getZ(i)+(Math.random()-.5)*amt); } geo.computeVertexNormals(); return geo; }
const rnd = (a,b) => a + Math.random()*(b-a);

/* ---------------- بناء العناصر ---------------- */
const THEMES = {
 1:{top:0x5ccf7a, side:0x8a5a2b, deco:"valley"}, 2:{top:0xf1d48a, side:0x7b5a3a, deco:"isle"}, 3:{top:0x2f9e57, side:0x5b4026, deco:"forest"},
 4:{top:0xdfe7f2, side:0x6d6f78, deco:"mount"},  5:{top:0xf0c26b, side:0xa0703a, deco:"desert"}, 6:{top:0x9a8c86, side:0x5a4038, deco:"castle"}
};
function tree(h=1.6, col=0x2fa35a){ const g = new THREE.Group();
  const trunk = new THREE.Mesh(new THREE.CylinderGeometry(.12,.16,h*.45,5), mat(0x7a4b22)); trunk.position.y = h*.22; g.add(trunk);
  const c1 = new THREE.Mesh(new THREE.ConeGeometry(h*.38,h*.7,6), mat(col)); c1.position.y = h*.62; g.add(c1);
  const c2 = new THREE.Mesh(new THREE.ConeGeometry(h*.28,h*.5,6), mat(col)); c2.position.y = h*.92; g.add(c2); return g; }
function palm(){ const g = new THREE.Group();
  const t = new THREE.Mesh(new THREE.CylinderGeometry(.09,.14,1.8,5), mat(0x9b6a3c)); t.position.y = .9; t.rotation.z = .15; g.add(t);
  for(let i=0;i<5;i++){ const l = new THREE.Mesh(new THREE.ConeGeometry(.18,1.1,3), mat(0x3fbf6a)); l.position.set(Math.cos(i*1.25)*.45+.13,1.75,Math.sin(i*1.25)*.45); l.rotation.set(Math.sin(i*1.25)*1.2,0,-Math.cos(i*1.25)*1.2); g.add(l); } return g; }
function bead(color){ const m = new THREE.Mesh(new THREE.SphereGeometry(.5,10,6), mat(color, {roughness:.35, metalness:.15, emissive:color, emissiveIntensity:.08})); m.scale.set(1,.55,1); return m; }
function pyramid(s){ const m = new THREE.Mesh(new THREE.ConeGeometry(s,s*1.1,4), mat(0xe2b45c)); m.rotation.y = Math.PI/4; m.position.y = s*.55; return m; }
function peak(h, snow=true){ const g = new THREE.Group(); const c = new THREE.Mesh(jitter(new THREE.ConeGeometry(h*.55,h,6),.08), mat(0x7d8291)); c.position.y = h/2; g.add(c);
  if(snow){ const s = new THREE.Mesh(new THREE.ConeGeometry(h*.24,h*.42,6), mat(0xffffff)); s.position.y = h*.8; g.add(s); } return g; }
function tower(h, roof=0xd2443a){ const g = new THREE.Group(); const b = new THREE.Mesh(new THREE.CylinderGeometry(.45,.5,h,7), mat(0xb7a9a1)); b.position.y = h/2; g.add(b);
  const r = new THREE.Mesh(new THREE.ConeGeometry(.62,.9,7), mat(roof)); r.position.y = h+.45; g.add(r);
  const f = new THREE.Mesh(new THREE.SphereGeometry(.12,6,4), new THREE.MeshBasicMaterial({color:0xffb347})); f.position.set(0,h*.7,.5); g.add(f); return g; }
function cloud(scale=1){ const g = new THREE.Group(), m = mat(0xffffff, {roughness:1, transparent:true, opacity:.92});
  for(let i=0;i<5;i++){ const s = new THREE.Mesh(new THREE.IcosahedronGeometry(rnd(.8,1.4),0), m); s.position.set((i-2)*1.1, rnd(-.2,.4), rnd(-.5,.5)); g.add(s); } g.scale.setScalar(scale); return g; }

function decorate(island, kind, R, topY){
  const place = (obj, r, a) => { obj.position.set(Math.cos(a)*r, topY, Math.sin(a)*r); island.add(obj); return obj; };
  const ring = (n, r0, r1, f) => { for(let i=0;i<n;i++){ const a = rnd(Math.PI*1.18, Math.PI*1.82), r = rnd(r0, r1); f(a, r, i); } };
  if(kind==="valley"){ ring(7, R*.82, R*.95, (a,r)=>place(tree(rnd(1.2,2)), r, a));
    const rod = new THREE.Mesh(new THREE.CylinderGeometry(.06,.06,3.2,6), mat(0xc9a46a)); rod.rotation.z = Math.PI/2; rod.position.set(0, topY+1.1, -R*.55); island.add(rod);
    [0xf7931e,0x4fa3ff,0xf7931e,0x4fa3ff].forEach((c,i)=>{ const b = bead(c); b.position.set(-1.1+i*.73, topY+1.1, -R*.55); island.add(b); }); }
  if(kind==="isle"){ const sea = new THREE.Mesh(new THREE.CylinderGeometry(R*1.45,R*1.45,.12,24), new THREE.MeshStandardMaterial({color:0x2f8fd8, transparent:true, opacity:.75, roughness:.2})); sea.position.y = topY-.35; island.add(sea);
    ring(5, R*.82, R*.95, (a,r)=>place(palm(), r, a));
    const ship = new THREE.Group(); const hull = new THREE.Mesh(new THREE.BoxGeometry(1.6,.45,.6), mat(0x6b3d1d)); ship.add(hull);
    const sail = new THREE.Mesh(new THREE.ConeGeometry(.5,1.3,3), mat(0xffffff)); sail.position.y = .85; ship.add(sail);
    ship.position.set(R*1.2, topY-.15, 0); ship.userData.bob = true; island.add(ship); }
  if(kind==="forest"){ ring(12, R*.8, R*.97, (a,r)=>place(tree(rnd(1.4,2.4), [0x1f7a3f,0x2d8f4e,0x166b35][Math.floor(rnd(0,3))]), r, a)); }
  if(kind==="mount"){ ring(4, R*.8, R*.92, (a,r)=>place(peak(rnd(2.2,3.6)), r, a)); }
  if(kind==="desert"){ place(pyramid(1.6), R*.8, -2.2); place(pyramid(1.1), R*.85, -1.4);
    ring(4, R*.8, R*.95, (a,r)=>{ const c = new THREE.Group(); const b = new THREE.Mesh(new THREE.CylinderGeometry(.16,.18,1.1,6), mat(0x3f9a4a)); b.position.y=.55; c.add(b);
      const arm = new THREE.Mesh(new THREE.CylinderGeometry(.1,.1,.5,6), mat(0x3f9a4a)); arm.position.set(.22,.7,0); c.add(arm); place(c, r, a); }); }
  if(kind==="castle"){ [[-2.25,2.6],[-1.57,3.2],[-.9,2.6]].forEach(([a,h])=>place(tower(h), R*.8, a));
    const wall = new THREE.Mesh(new THREE.BoxGeometry(3.2,1.1,.4), mat(0xa89990)); wall.position.set(Math.cos(-1.57)*R*.8, topY+.55, Math.sin(-1.57)*R*.8); wall.lookAt(0, topY+.55, 0); island.add(wall); }
}

function makeIsland(theme, R){
  const g = new THREE.Group(), topH = 1.1;
  const top = new THREE.Mesh(jitter(new THREE.CylinderGeometry(R, R*.96, topH, 9, 1), .25), mat(theme.top)); top.position.y = -topH/2; g.add(top);
  const under = new THREE.Mesh(jitter(new THREE.ConeGeometry(R*.95, R*1.35, 9, 3), .45), mat(theme.side)); under.rotation.x = Math.PI; under.position.y = -topH - R*.67; g.add(under);
  const hit = new THREE.Mesh(new THREE.CylinderGeometry(R, R, R*1.6, 8), new THREE.MeshBasicMaterial({visible:false})); hit.position.y = -R*.6; g.add(hit);
  return {group:g, hit, topY:0};
}

/* ---------------- المشهد ---------------- */
function render(focus){
  const J = window.SFAJ, S = J.S, app = document.getElementById("app");
  cleanup(); J.stopTimer && J.stopTimer();
  app.innerHTML = `<div class="j3d" id="j3d"><div class="j3load">${t3("loading")}</div></div>`;
  const host = document.getElementById("j3d");
  let renderer;
  try{ renderer = new THREE.WebGLRenderer({antialias: (window.devicePixelRatio||1) < 2, alpha:false, powerPreference:"high-performance"}); }
  catch(e){ J.setMapRenderer(null); J.renderMap(); return; }
  const dpr = Math.min(window.devicePixelRatio||1, 1.75);
  renderer.setPixelRatio(dpr); renderer.outputColorSpace = THREE.SRGBColorSpace;
  host.innerHTML = ""; host.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  // سماء متدرجة
  const sky = document.createElement("canvas"); sky.width = 2; sky.height = 256; const sg = sky.getContext("2d");
  const grad = sg.createLinearGradient(0,0,0,256); grad.addColorStop(0,"#0b1a45"); grad.addColorStop(.45,"#2a5aa8"); grad.addColorStop(.8,"#f7b26a"); grad.addColorStop(1,"#ffd9a0");
  sg.fillStyle = grad; sg.fillRect(0,0,2,256); const skyTex = new THREE.CanvasTexture(sky); skyTex.colorSpace = THREE.SRGBColorSpace; scene.background = skyTex;
  scene.fog = new THREE.Fog(0x9fb8e6, 60, 140);

  const camera = new THREE.PerspectiveCamera(50, 1, .1, 400);
  scene.add(new THREE.HemisphereLight(0xdfeaff, 0x5a4a3a, 1.15));
  const sun = new THREE.DirectionalLight(0xfff1d6, 2.1); sun.position.set(30, 60, 20); scene.add(sun);

  // نجوم/بريق
  const starGeo = new THREE.BufferGeometry(), sp = [];
  for(let i=0;i<350;i++){ const r = rnd(80,160), a = rnd(0,Math.PI*2), y = rnd(10,90); sp.push(Math.cos(a)*r, y, Math.sin(a)*r); }
  starGeo.setAttribute("position", new THREE.Float32BufferAttribute(sp,3));
  const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({color:0xffffff, size:.6, transparent:true, opacity:.8})); scene.add(stars);

  const anim = [], pick = [], islandsInfo = [];
  const WORLDS = J.WORLDS;
  const N = WORLDS.length, RAD = 25;
  const all = J.ALL(), firstOpen = all.find(s => J.isUnlocked(s.key) && !J.starsOf(s.key));

  WORLDS.forEach((w, i) => {
    const R = 7.2, a = i * (Math.PI*2/N) - Math.PI/2, pos = new THREE.Vector3(Math.cos(a)*RAD, i*4.2, Math.sin(a)*RAD);
    const theme = THEMES[w.id], st = J.stagesOf(w.id), open = J.isUnlocked(st[0].key), cleared = J.worldCleared(w.id);
    const isl = makeIsland(theme, R); isl.group.position.copy(pos); isl.group.rotation.y = Math.PI/2 - a; scene.add(isl.group);
    isl.hit.userData = {island:i}; pick.push(isl.hit);
    decorate(isl.group, theme.deco, R, 0);
    // اسم الجزيرة
    const nm = label(`${w.ico} ${J.wName(w)}`, 1.25, {border: cleared ? "#f5c542" : open ? "#4fa3ff" : "#7d8aa6"}); nm.position.set(0, 5.2, -R*.35); isl.group.add(nm);
    // المراحل على قوس
    const nodes = [];
    st.forEach((s, k) => {
      const f = k/(Math.max(1,st.length-1));
      const p = new THREE.Vector3((document.documentElement.dir==="rtl" ? .5-f : f-.5)*R*1.5, .12, (k%2 ? -1 : 1)*R*.24 + R*.12);
      const un = J.isUnlocked(s.key), sc = J.starsOf(s.key), boss = s.type!=="stage";
      const col = !un ? 0x5b6680 : sc ? 0xf5c542 : new THREE.Color(w.c1).getHex();
      const pad = new THREE.Mesh(new THREE.CylinderGeometry(boss?.75:.55, boss?.8:.6, .28, 10), mat(col, {emissive: sc ? 0xf5a400 : (un ? col : 0x000000), emissiveIntensity: sc ? .35 : (un ? .18 : 0), roughness:.4}));
      pad.position.copy(p); isl.group.add(pad);
      pad.userData = {stage:s.key, world:w.id, label: s.type==="stage" ? `${J.jt("stage")} ${s.n}` : (s.type==="boss" ? J.jt("boss") : J.jt("superBoss")), un, sc, boss}; pick.push(pad);
      const icon = un ? (s.type==="stage" ? null : (s.type==="boss" ? w.bIco : "💀")) : "🔒";
      if(icon){ const sp = sprite(emojiTex(icon), boss && un ? 1.8 : .9); sp.position.set(p.x, p.y + (boss&&un?1.35:.8), p.z); isl.group.add(sp); if(boss && un) anim.push(t => { sp.position.y = p.y + 1.35 + Math.sin(t*2 + k)*.12; }); }
      else { const n = label(String(s.n), .62, {bg:"rgba(10,26,54,.9)", border: sc ? "#f5c542" : "#ffffff"}); n.position.set(p.x, p.y+.62, p.z); isl.group.add(n); }
      if(un){ const stl = label("★".repeat(sc)+"☆".repeat(3-sc), .42, {bg:"rgba(0,0,0,.45)", fg:"#ffd25a", border:"rgba(0,0,0,0)", px:40}); stl.position.set(p.x, p.y + (icon&&boss?2.35:1.15), p.z); isl.group.add(stl); }
      if(k>0){ const prev = nodes[k-1]; for(let d=1; d<4; d++){ const q = prev.clone().lerp(p, d/4); const dot = new THREE.Mesh(new THREE.SphereGeometry(.09,6,4), new THREE.MeshBasicMaterial({color: un ? 0xffd25a : 0x8592ab})); dot.position.set(q.x, .2, q.z); isl.group.add(dot); } }
      nodes.push(p);
      if(firstOpen && firstOpen.key===s.key){
        const av = sprite(emojiTex(S.avatar||"🦁"), 1.5); av.position.set(p.x, p.y+1.1, p.z); isl.group.add(av);
        const halo = new THREE.Mesh(new THREE.TorusGeometry(.85,.07,8,28), new THREE.MeshBasicMaterial({color:0xffe08a, transparent:true})); halo.rotation.x = Math.PI/2; halo.position.set(p.x, p.y+.17, p.z); isl.group.add(halo);
        anim.push(t => { av.position.y = p.y + 1.1 + Math.abs(Math.sin(t*3))*.35; const s2 = 1 + (t*1.2 % 1)*.6; halo.scale.set(s2,s2,s2); halo.material.opacity = 1 - (t*1.2 % 1); });
      }
    });
    // ضباب الجزر المقفلة
    if(!open){ const fog = new THREE.Group(); for(let c=0;c<4;c++){ const cl = cloud(rnd(.7,1)); cl.position.set(rnd(-3,3), rnd(1.4,2.4), rnd(-3,3)); cl.traverse(o => { if(o.material){ o.material = o.material.clone(); o.material.opacity = .7; } }); fog.add(cl); } isl.group.add(fog);
      const lk = sprite(emojiTex("🔒"), 2.2); lk.position.y = 3.2; isl.group.add(lk);
      isl.group.traverse(o => { if(o.isMesh && o.material && o.material.color && !o.material.transparent){ o.material = o.material.clone(); o.material.color.lerp(new THREE.Color(0x8a93a6), .6); } }); }
    if(cleared){ const flag = sprite(emojiTex("🏅"), 1.6); flag.position.set(0, 3.2, -R*.3); isl.group.add(flag); anim.push(t => { flag.material.rotation = Math.sin(t*2)*.15; }); }
    const baseY = pos.y, ph = i*1.3;
    anim.push(t => { isl.group.position.y = baseY + Math.sin(t*.8 + ph)*.35; isl.group.traverse(o => { if(o.userData.bob) o.position.y = -.15 + Math.sin(t*1.6)*.12; }); });
    islandsInfo.push({pos, world:w, open, cleared, nodes:st});
  });

  // الجسور بين الجزر
  for(let i=0;i<N-1;i++){
    const a = islandsInfo[i].pos, b = islandsInfo[i+1].pos, lit = islandsInfo[i+1].open;
    const curve = new THREE.QuadraticBezierCurve3(a.clone().add(new THREE.Vector3(0,.4,0)), a.clone().lerp(b,.5).add(new THREE.Vector3(0,4,0)), b.clone().add(new THREE.Vector3(0,.4,0)));
    const pts = curve.getPoints(26), m = new THREE.MeshBasicMaterial({color: lit ? 0xffd25a : 0x7c88a3});
    const inst = new THREE.InstancedMesh(new THREE.SphereGeometry(.16,6,4), m, pts.length-4), d = new THREE.Object3D();
    for(let k=2;k<pts.length-2;k++){ d.position.copy(pts[k]); d.updateMatrix(); inst.setMatrixAt(k-2, d.matrix); } scene.add(inst);
  }

  // الجزيرة الذهبية والكأس
  const finalOpen = J.allCleared(), won = S.finalWon, fpos = new THREE.Vector3(0, N*4.2 + 5, 0);
  const fisl = makeIsland({top:0xf5c542, side:0xb07a12}, 4.2); fisl.group.position.copy(fpos); scene.add(fisl.group);
  fisl.group.children[0].material = mat(0xf5c542, {metalness:.6, roughness:.35, emissive:0xa86b00, emissiveIntensity:.15});
  const cupPts = [[0,0],[.9,0],[.95,.15],[.35,.3],[.25,.9],[.35,1.1],[1.05,1.35],[1.2,2.4],[1.1,2.45],[.2,1.6],[0,1.6]].map(([x,y]) => new THREE.Vector2(x,y));
  const cup = new THREE.Mesh(new THREE.LatheGeometry(cupPts, 18), new THREE.MeshStandardMaterial({color:0xf5c542, metalness:.9, roughness:.22, emissive:0x7a4a00, emissiveIntensity:.2, side:THREE.DoubleSide}));
  cup.position.y = .1; cup.scale.setScalar(1.3); fisl.group.add(cup); anim.push(t => { cup.rotation.y = t*.8; });
  const glow = sprite(emojiTex("✨"), 4.5); glow.position.y = 2.2; fisl.group.add(glow); anim.push(t => { glow.material.opacity = .5 + Math.sin(t*3)*.3; });
  const emp = sprite(emojiTex(won ? "👑" : "🤖"), 2); emp.position.set(2.3, 1.6, 0); fisl.group.add(emp); anim.push(t => { emp.position.y = 1.6 + Math.sin(t*2)*.2; });
  const fl = label(`🏆 ${t3("final")}`, 1.1, {border:"#f5c542"}); fl.position.y = 5.2; fisl.group.add(fl);
  if(!finalOpen){ for(let c=0;c<4;c++){ const cl = cloud(1.3); cl.position.set(rnd(-2,2), rnd(.5,2), rnd(-2,2)); fisl.group.add(cl); } }
  fisl.hit.userData = {island:N}; pick.push(fisl.hit);
  anim.push(t => { fisl.group.position.y = fpos.y + Math.sin(t*.7)*.4; });

  // غيوم متطايرة
  for(let c=0;c<16;c++){ const low = c%3===0, cl = cloud(low ? rnd(2,3.2) : rnd(2.5,4)); const r = low ? rnd(10,40) : rnd(80,110), a = rnd(0,Math.PI*2), y = low ? rnd(-22,-14) : rnd(-5,40); cl.position.set(Math.cos(a)*r, y, Math.sin(a)*r); scene.add(cl);
    const sp2 = rnd(.01,.03); anim.push((t, dt) => { const ang = Math.atan2(cl.position.z, cl.position.x) + sp2*dt; const rr = Math.hypot(cl.position.x, cl.position.z); cl.position.x = Math.cos(ang)*rr; cl.position.z = Math.sin(ang)*rr; }); }

  /* ---------- الكاميرا والتحكم ---------- */
  const targets = islandsInfo.map(x => x.pos.clone().add(new THREE.Vector3(0,.5,0))).concat([fpos.clone()]);
  let cur = 0;
  if(typeof focus==="string" && /^world(\d)/.test(focus)) cur = +focus.slice(5) - 1;
  else if(firstOpen) cur = firstOpen.w - 1; else if(finalOpen) cur = N;
  cur = Math.max(0, Math.min(N, cur));
  const camTarget = new THREE.Vector3(0, 10, 0), goal = targets[cur].clone();
  const islAngle = i => i>=N ? 0 : Math.atan2(islandsInfo[i].pos.z, islandsInfo[i].pos.x);
  const baseDist = () => { const a = (host.clientWidth||1)/(host.clientHeight||1); return Math.min(36, Math.max(19, 7.6/(Math.tan(THREE.MathUtils.degToRad(25))*a))); };
  let theta = islAngle(cur), phi = 1.05, dist = 60, goalDist = baseDist(), goalTheta = theta;
  const applyCam = () => { camera.position.set(camTarget.x + Math.cos(theta)*Math.sin(phi)*dist, camTarget.y + Math.cos(phi)*dist, camTarget.z + Math.sin(theta)*Math.sin(phi)*dist); camera.lookAt(camTarget); };
  const focusIsland = i => { cur = (i+N+1)%(N+1); goal.copy(targets[cur]); goalTheta = cur>=N ? theta : islAngle(cur); goalDist = baseDist() + (cur>=N ? 1 : 0); updateHud(); };

  const el = renderer.domElement, pointers = new Map(); let downPos = null, moved = 0, pinch0 = 0, dist0 = 0;
  el.style.touchAction = "none";
  const onDown = e => { el.setPointerCapture(e.pointerId); pointers.set(e.pointerId, {x:e.clientX, y:e.clientY}); if(pointers.size===1){ downPos = {x:e.clientX, y:e.clientY}; moved = 0; } else if(pointers.size===2){ const [p1,p2] = [...pointers.values()]; pinch0 = Math.hypot(p1.x-p2.x, p1.y-p2.y); dist0 = goalDist; } };
  const onMove = e => { if(!pointers.has(e.pointerId)) return; const prev = pointers.get(e.pointerId); const dx = e.clientX-prev.x, dy = e.clientY-prev.y; pointers.set(e.pointerId, {x:e.clientX, y:e.clientY});
    if(pointers.size===1){ moved += Math.abs(dx)+Math.abs(dy); goalTheta += dx*.008; phi = Math.max(.45, Math.min(1.35, phi - dy*.005)); }
    else if(pointers.size===2){ const [p1,p2] = [...pointers.values()]; const d = Math.hypot(p1.x-p2.x, p1.y-p2.y); goalDist = Math.max(9, Math.min(70, dist0 * pinch0 / Math.max(d,1))); moved = 99; } };
  const onUp = e => { pointers.delete(e.pointerId); if(pointers.size===0 && moved < 8 && downPos) tap(e); };
  const onWheel = e => { e.preventDefault(); goalDist = Math.max(9, Math.min(70, goalDist * (e.deltaY>0 ? 1.1 : .9))); };
  el.addEventListener("pointerdown", onDown); el.addEventListener("pointermove", onMove); el.addEventListener("pointerup", onUp); el.addEventListener("pointercancel", onUp); el.addEventListener("wheel", onWheel, {passive:false});

  const ray = new THREE.Raycaster(), ndc = new THREE.Vector2();
  function tap(e){
    const r = el.getBoundingClientRect(); ndc.set(((e.clientX-r.left)/r.width)*2-1, -((e.clientY-r.top)/r.height)*2+1);
    ray.setFromCamera(ndc, camera); const hits = ray.intersectObjects(pick, false);
    const st = hits.find(h => h.object.userData.stage), isl = hits.find(h => h.object.userData.island!==undefined);
    if(st){ const u = st.object.userData; if(!u.un){ toast3(t3("locked")); return; } focusIsland(u.world-1); showStage(u); return; }
    if(isl){ const i = isl.object.userData.island; focusIsland(i); if(i===N && finalOpen) showFinal(); else hideCard(); }
  }

  /* ---------- الواجهة فوق المشهد ---------- */
  const hud = document.createElement("div"); hud.className = "j3hud";
  const rk = J.curRank();
  hud.innerHTML = `<div class="j3top">
      <button class="j3av" data-open="shop">${esc(S.avatar||"🦁")}</button>
      <div class="j3who"><b dir="auto">${esc(S.name)}</b><small>${rk.ico} ${esc(J.rankName(rk))}</small></div>
      <span class="j3pill">🟡 ${S.coins}</span><span class="j3pill">⭐ ${J.totalStars()}</span>
      <div class="j3btns"><button data-open="shop" title="${esc(J.jt("shop"))}">🛍️</button><button data-open="badges" title="${esc(J.jt("badges"))}">🏅</button><button data-open="save" title="${esc(J.jt("save"))}">💾</button><button data-open="fb" title="${esc(J.jt("rateBtn"))}">⭐</button>
      <button class="j3mode ${S.mode==="train"?"train":""}" id="j3mode">${esc(S.mode==="train"?J.jt("modeTrain"):J.jt("modeComp"))}</button></div>
    </div>
    <div class="j3beta">${t3("beta")} · <a href="#journey">${t3("map2d")}</a></div>
    <div class="j3hint">${t3("hint")}</div>
    <div class="j3card" id="j3card"></div>
    <div class="j3nav"><button class="j3arrow" id="j3prev" aria-label="${t3("prev")}">‹</button><div class="j3name" id="j3name"></div><button class="j3arrow" id="j3next" aria-label="${t3("next")}">›</button></div>`;
  host.appendChild(hud);
  hud.querySelectorAll("[data-open]").forEach(b => b.onclick = () => ({shop:J.openShop, badges:J.openBadges, save:J.openSave, fb:()=>window.sfaAskFeedback && window.sfaAskFeedback()})[b.dataset.open]());
  hud.querySelector("#j3mode").onclick = () => { J.S.mode = J.S.mode==="train" ? "comp" : "train"; J.save(); const b = hud.querySelector("#j3mode"); b.classList.toggle("train", J.S.mode==="train"); b.textContent = J.S.mode==="train" ? J.jt("modeTrain") : J.jt("modeComp"); };
  const rtl = document.documentElement.dir === "rtl";
  hud.querySelector("#j3prev").onclick = () => { focusIsland(cur + (rtl ? 1 : -1)); hideCard(); };
  hud.querySelector("#j3next").onclick = () => { focusIsland(cur + (rtl ? -1 : 1)); hideCard(); };
  const card = hud.querySelector("#j3card");
  function updateHud(){ const nm = hud.querySelector("#j3name"); if(!nm) return;
    if(cur>=N){ nm.innerHTML = `🏆 ${esc(t3("final"))}`; return; }
    const w = WORLDS[cur], st = J.stagesOf(w.id), got = st.reduce((a,s)=>a+J.starsOf(s.key),0);
    nm.innerHTML = `${w.ico} ${esc(J.wName(w))} <small>⭐ ${got}/${st.length*3}</small>`; }
  function showStage(u){ card.innerHTML = `<div class="j3ct"><b>${esc(u.label)}</b><span class="j3st">${"★".repeat(u.sc)}${"☆".repeat(3-u.sc)}</span></div><button class="btn big-btn" id="j3go">${t3("play")}</button>`;
    card.classList.add("show"); card.querySelector("#j3go").onclick = () => { cleanup(); J.play(u.stage); }; }
  function showFinal(){ card.innerHTML = `<div class="j3ct"><b>🏆 ${esc(J.jt("finalT"))}</b></div><button class="btn big-btn" id="j3go">${esc(J.jt("finalGo"))}</button>`;
    card.classList.add("show"); card.querySelector("#j3go").onclick = () => { cleanup(); J.play("final"); }; }
  function hideCard(){ card.classList.remove("show"); }
  function toast3(m){ if(typeof window.toast==="function") window.toast(m); else { card.innerHTML = `<div class="j3ct">${esc(m)}</div>`; card.classList.add("show"); } }
  updateHud();

  /* ---------- الحلقة وجودة الأداء ---------- */
  const resize = () => { const w = host.clientWidth, h = host.clientHeight; renderer.setSize(w, h, false); renderer.domElement.style.width = w+"px"; renderer.domElement.style.height = h+"px"; camera.aspect = w/h; camera.updateProjectionMatrix(); };
  resize(); window.addEventListener("resize", resize);
  let last = performance.now(), t0 = last, frames = 0, checked = false;
  ctx = {renderer, scene, raf:0, disposers:[
    () => window.removeEventListener("resize", resize),
    () => { el.removeEventListener("pointerdown", onDown); el.removeEventListener("pointermove", onMove); el.removeEventListener("pointerup", onUp); el.removeEventListener("pointercancel", onUp); el.removeEventListener("wheel", onWheel); }
  ]};
  const loop = now => {
    if(!ctx) return; ctx.raf = requestAnimationFrame(loop);
    const dt = Math.min(.05, (now-last)/1000); last = now; const t = (now-t0)/1000;
    camTarget.lerp(goal, .06); dist += (goalDist-dist)*.06;
    let dTh = goalTheta - theta; dTh = Math.atan2(Math.sin(dTh), Math.cos(dTh)); theta += dTh*.06;
    applyCam(); anim.forEach(f => f(t, dt*60)); stars.rotation.y = t*.005;
    renderer.render(scene, camera);
    frames++; if(!checked && now - t0 > 2500){ checked = true; const fps = frames/((now-t0)/1000); if(fps < 28){ renderer.setPixelRatio(1); resize(); } }
  };
  window.__sfa3dPos = key => { let o = null; scene.traverse(x => { if(x.userData && x.userData.stage===key) o = x; }); if(!o) return null; const v = new THREE.Vector3(); o.getWorldPosition(v); v.project(camera); const r = el.getBoundingClientRect(); return {x: r.left + (v.x+1)/2*r.width, y: r.top + (1-v.y)/2*r.height}; };
  applyCam(); ctx.raf = requestAnimationFrame(loop);
}
