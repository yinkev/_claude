/* _claude study lab v1.0.0 — interactive teaching widgets for Claude study sessions.
   Works alone or with card.js / body.js (body map is used by MUA.lab.disc when body.js is loaded).
   <div id="x"></div>
   <script src="https://cdn.jsdelivr.net/gh/yinkev/_claude@<COMMIT>/cards/lab.js"></script>
   <script>MUA.lab.disc('x')</script>
   Widgets: disc · oocyte · week1 · fetal · crest · defects · injury   (MUA.lab.sort for any custom sorter)
   Generic teaching content only. No personal data lives here. */
(function(){
var M=window.MUA=window.MUA||{};M.lab=M.lab||{};if(M.lab.v)return;
var EASE='cubic-bezier(.32,.72,0,1)';
var CSS=`
.mlab{--l-t:var(--text-primary,#1c1c1e);--l-s:var(--text-secondary,#6c6c74);--l-m:var(--text-muted,#98989f);--l-c1:var(--surface-1,#f4f4f6);--l-c2:var(--surface-2,#fff);--l-b:var(--border,rgba(0,0,0,.1));--l-bs:var(--border-strong,rgba(0,0,0,.18));
--l-t1:#E1F5EE;--l-t1f:#085041;--l-t1d:#1D9E75;--l-t2:#EEEDFE;--l-t2f:#3C3489;--l-t2d:#7F77DD;--l-t3:#FAECE7;--l-t3f:#712B13;--l-t3d:#D85A30;--l-t4:#FAEEDA;--l-t4f:#633806;--l-t4d:#BA7517;--l-g:#F1EFE8;--l-gf:#444441;--l-gd:#B4B2A9;
font:15px/1.5 var(--font-sans,-apple-system,BlinkMacSystemFont,system-ui,sans-serif);color:var(--l-t);display:flex;flex-direction:column;gap:12px;-webkit-tap-highlight-color:transparent}
@media (prefers-color-scheme:dark){:root:not([data-mode]) .mlab{--l-t1:#04342C;--l-t1f:#9FE1CB;--l-t1d:#5DCAA5;--l-t2:#26215C;--l-t2f:#CECBF6;--l-t2d:#AFA9EC;--l-t3:#4A1B0C;--l-t3f:#F5C4B3;--l-t3d:#F0997B;--l-t4:#412402;--l-t4f:#FAC775;--l-t4d:#EF9F27;--l-g:#2C2C2A;--l-gf:#D3D1C7;--l-gd:#5F5E5A}}
[data-mode="dark"] .mlab{--l-t1:#04342C;--l-t1f:#9FE1CB;--l-t1d:#5DCAA5;--l-t2:#26215C;--l-t2f:#CECBF6;--l-t2d:#AFA9EC;--l-t3:#4A1B0C;--l-t3f:#F5C4B3;--l-t3d:#F0997B;--l-t4:#412402;--l-t4f:#FAC775;--l-t4d:#EF9F27;--l-g:#2C2C2A;--l-gf:#D3D1C7;--l-gd:#5F5E5A}
.mlab *{box-sizing:border-box}.mlab button{font:inherit;color:inherit;cursor:pointer;border:0;background:none}
.mlab button:focus-visible{outline:2px solid var(--l-t2d);outline-offset:2px}
.mlab .hd{display:flex;align-items:baseline;justify-content:space-between;gap:10px;flex-wrap:wrap}
.mlab .ey{font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--l-m);font-weight:500}
.mlab .ti2{font-size:17px;font-weight:500;margin:2px 0 0}
.mlab .card{background:var(--l-c2);border:.5px solid var(--l-b);border-radius:14px;padding:14px}
.mlab .soft{background:var(--l-c1);border-radius:12px;padding:12px}
.mlab .chips{display:flex;flex-wrap:wrap;gap:6px}
.mlab .chip{padding:7px 11px;border-radius:9px;background:var(--l-c1);font-size:14px;font-weight:500;transition:background .25s ${EASE},color .25s ${EASE},transform .2s ${EASE}}
.mlab .chip:hover{background:var(--l-g)}.mlab .chip:active{transform:scale(.97)}
.mlab .chip.on{background:var(--l-t2);color:var(--l-t2f)}
.mlab .chip.ok{background:var(--l-t1);color:var(--l-t1f)}.mlab .chip.no{background:var(--l-t3);color:var(--l-t3f)}
.mlab .grp{font-size:12px;color:var(--l-s);margin:2px 0 4px}
.mlab .big{font-size:30px;font-weight:500;letter-spacing:-.01em;line-height:1.1}
.mlab .rows{display:grid;grid-template-columns:auto minmax(0,1fr);gap:6px 12px;font-size:14px}
.mlab .rows dt{color:var(--l-s)}.mlab .rows dd{margin:0}
.mlab .why{font-size:14px;line-height:1.5;color:var(--l-t);border-left:3px solid var(--l-t2d);padding:2px 0 2px 10px}
.mlab .src{font-size:11px;color:var(--l-m);text-align:right}
.mlab .stamp{text-align:center;font-weight:500;font-size:15px;padding:10px;border-radius:10px;background:var(--l-t2);color:var(--l-t2f)}
.mlab .two{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:12px}
@media (max-width:560px){.mlab .two{grid-template-columns:minmax(0,1fr)}}
.mlab svg{display:block;width:100%;height:auto;overflow:visible}
.mlab svg text{font-family:var(--font-sans,system-ui,sans-serif);fill:var(--l-t)}
.mlab .fade{animation:mlabIn .35s ${EASE}}
@keyframes mlabIn{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:none}}
.mlab input[type=range]{width:100%;accent-color:var(--l-t2d)}
.mlab .rl{display:flex;justify-content:space-between;font-size:11px;color:var(--l-m);margin-top:2px}
.mlab .ticks{display:grid;font-size:11px;color:var(--l-m);margin-top:4px;text-align:center}.mlab .ticks span{min-width:0;overflow-wrap:anywhere;line-height:1.2}.mlab .ticks span.on{color:var(--l-t2d);font-weight:500}
.mlab .badge{display:inline-block;font-size:11px;font-weight:500;letter-spacing:.04em;padding:3px 8px;border-radius:6px;text-transform:uppercase}
.mlab .b1{background:var(--l-t1);color:var(--l-t1f)}.mlab .b2{background:var(--l-t2);color:var(--l-t2f)}.mlab .b3{background:var(--l-t3);color:var(--l-t3f)}.mlab .b4{background:var(--l-t4);color:var(--l-t4f)}
.mlab .btn{padding:9px 14px;border-radius:10px;background:var(--l-t2);color:var(--l-t2f);font-weight:500;font-size:14px}
.mlab .btn.q{background:var(--l-c1);color:var(--l-t)}
.mlab .dots{display:flex;gap:6px;justify-content:center}.mlab .dots i{width:7px;height:7px;border-radius:50%;background:var(--l-gd);transition:background .25s,transform .25s}.mlab .dots i.on{background:var(--l-t2d);transform:scale(1.25)}
.mlab .bar{height:6px;border-radius:3px;background:var(--l-c1);overflow:hidden}.mlab .bar i{display:block;height:100%;background:var(--l-t2d);transition:width .4s ${EASE}}
.mlab .item{font-size:20px;font-weight:500;text-align:center;padding:18px 10px;border-radius:12px;background:var(--l-c1);min-height:74px;display:flex;align-items:center;justify-content:center}
.mlab .bins{display:grid;grid-template-columns:repeat(auto-fit,minmax(118px,1fr));gap:8px}
.mlab .bin{padding:11px 8px;border-radius:11px;border:.5px solid var(--l-bs);font-size:14px;font-weight:500;text-align:center;transition:background .25s ${EASE},transform .2s ${EASE}}
.mlab .bin:hover{background:var(--l-c1)}.mlab .bin:active{transform:scale(.97)}
.mlab .bin.ok{background:var(--l-t1);color:var(--l-t1f);border-color:transparent}.mlab .bin.no{background:var(--l-t3);color:var(--l-t3f);border-color:transparent}
.mlab .fb{font-size:14px;min-height:42px}
.mlab .list{display:flex;flex-direction:column;gap:6px}
.mlab .li{display:flex;gap:10px;align-items:flex-start;text-align:left;padding:10px 12px;border-radius:11px;background:var(--l-c1);font-size:14px;line-height:1.4;transition:background .25s ${EASE}}
.mlab .li.on{background:var(--l-t2);color:var(--l-t2f)}
.mlab .li .tg{flex:none;font-size:10.5px;letter-spacing:.05em;text-transform:uppercase;padding:2px 6px;border-radius:5px;background:var(--l-c2);color:var(--l-s);margin-top:1px}
.mlab .mapbox{margin-top:4px}
@media (prefers-reduced-motion:reduce){.mlab *{animation:none!important;transition:none!important}}
`;
function css(){if(document.getElementById('mlab-css'))return;var s=document.createElement('style');s.id='mlab-css';s.textContent=CSS;document.head.appendChild(s);}
function host(id){return typeof id==='string'?document.getElementById(id):id;}
function mk(id,h){css();var H=host(id);if(!H)return null;var R=document.createElement('div');R.className='mlab';R.innerHTML=h;H.appendChild(R);return R;}
function $(R,s){return R.querySelector(s);}function $$(R,s){return Array.prototype.slice.call(R.querySelectorAll(s));}
function shuf(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=a[i];a[i]=a[j];a[j]=t;}return a;}

/* ============ 1. DISC HERNIATION SIMULATOR ============ */
var DISCS=[
 {d:'C4–C5',r:'C5',reg:'c',skin:'Lateral shoulder and upper arm',mus:'Deltoid (shoulder abduction), biceps',ref:'Biceps reflex may drop'},
 {d:'C5–C6',r:'C6',reg:'c',skin:'Thumb and lateral forearm',mus:'Wrist extensors, biceps',ref:'Brachioradialis / biceps reflex drops'},
 {d:'C6–C7',r:'C7',reg:'c',skin:'Middle finger',mus:'Triceps (elbow extension)',ref:'Triceps reflex drops'},
 {d:'C7–T1',r:'C8',reg:'c',skin:'Little finger and medial forearm',mus:'Finger flexors, hand intrinsics',ref:'No reliable reflex'},
 {d:'L3–L4',r:'L4',reg:'l',skin:'Medial leg and medial foot',mus:'Tibialis anterior (dorsiflexion)',ref:'Patellar reflex drops'},
 {d:'L4–L5',r:'L5',reg:'l',skin:'Dorsum of foot and big toe',mus:'Big-toe extension (EHL); Roman tests inversion/eversion',ref:'No reflex change'},
 {d:'L5–S1',r:'S1',reg:'l',skin:'Lateral border of foot and sole',mus:'Plantarflexion (walk on toes)',ref:'Achilles reflex drops'}];
function discSVG(x){
  var up=x.d.split('–')[0],lo=x.d.split('–')[1],c=x.reg==='c',ex=c?x.r:up,tr=c?'':x.r;
  var s='<svg viewBox="0 0 320 210" role="img" aria-label="Side view of two vertebrae with the disc between them">';
  s+='<rect x="40" y="18" width="120" height="58" rx="10" fill="var(--l-g)" stroke="var(--l-gd)"/><text x="100" y="52" text-anchor="middle" font-size="15" font-weight="500">'+up+'</text>';
  s+='<rect x="40" y="128" width="120" height="58" rx="10" fill="var(--l-g)" stroke="var(--l-gd)"/><text x="100" y="162" text-anchor="middle" font-size="15" font-weight="500">'+lo+'</text>';
  s+='<rect x="44" y="84" width="112" height="36" rx="12" fill="var(--l-t2)" stroke="var(--l-t2d)"/><text x="92" y="107" text-anchor="middle" font-size="12" fill="var(--l-t2f)">disc '+x.d+'</text>';
  s+='<path d="M156 90 Q190 102 156 114" fill="var(--l-t3d)" opacity=".9"><animate attributeName="d" dur="1.6s" repeatCount="indefinite" values="M156 90 Q182 102 156 114;M156 90 Q194 102 156 114;M156 90 Q182 102 156 114"/></path>';
  s+='<rect x="170" y="10" width="26" height="190" rx="8" fill="none" stroke="var(--l-gd)" stroke-dasharray="4 4"/><text x="183" y="206" text-anchor="middle" font-size="10" fill="var(--l-s)">canal</text>';
  if(c){
    s+='<path d="M183 96 C220 96 245 100 300 104" stroke="var(--l-t3d)" stroke-width="5" fill="none" stroke-linecap="round"/>';
    s+='<text x="300" y="92" text-anchor="end" font-size="14" font-weight="500" fill="var(--l-t3d)">'+ex+' hit</text>';
    s+='<text x="300" y="126" text-anchor="end" font-size="11" fill="var(--l-s)">exits here, above '+lo+'</text>';
  }else{
    s+='<path d="M183 50 C220 48 245 44 300 40" stroke="var(--l-gd)" stroke-width="4" fill="none" stroke-linecap="round"/>';
    s+='<text x="300" y="30" text-anchor="end" font-size="12" fill="var(--l-s)">'+ex+' exits above the disc</text>';
    s+='<path d="M188 14 L188 60 C188 90 200 102 204 130 L206 196" stroke="var(--l-t3d)" stroke-width="5" fill="none" stroke-linecap="round"/>';
    s+='<text x="214" y="150" font-size="14" font-weight="500" fill="var(--l-t3d)">'+tr+' hit</text><text x="214" y="166" font-size="11" fill="var(--l-s)">crosses the disc</text>';
  }
  return s+'</svg>';
}
M.lab.disc=function(id,o){o=o||{};
  var R=mk(id,`<div class="hd"><div><div class="ey">Disc herniation simulator</div><div class="ti2">Tap a disc. See which root it hits.</div></div><button class="btn q" data-a="quiz">Quiz me</button></div>
  <div class="card"><div class="grp">Neck</div><div class="chips" data-g="c"></div><div class="grp" style="margin-top:10px">Low back</div><div class="chips" data-g="l"></div></div>
  <div class="card fade" data-a="out"></div>
  <div class="stamp">Posterolateral disc X–Y → root Y, in the neck and the low back</div>
  <div class="src">Spinal cord deck s24–27 · Roman: “like four questions on the exam”</div>`);
  if(!R)return;var out=$(R,'[data-a=out]'),cur=null,quiz=null;
  DISCS.forEach(function(x,i){var b=document.createElement('button');b.className='chip';b.textContent=x.d;b.dataset.i=i;$(R,'[data-g='+x.reg+']').appendChild(b);});
  function show(i,guess){var x=DISCS[i];cur=i;$$(R,'.chip[data-i]').forEach(function(b){b.classList.toggle('on',+b.dataset.i===i);});
    var why=x.reg==='c'?'Cervical roots exit <b>above</b> their own vertebra, so the root at '+x.d+' is '+x.r+'. The disc presses on the root leaving at that level.':'The root named for the upper vertebra ('+x.d.split('–')[0]+') exits high in the foramen, above the disc. The root <b>crossing</b> the disc is the next one down: '+x.r+'.';
    out.classList.remove('fade');void out.offsetWidth;out.classList.add('fade');
    out.innerHTML=(guess?'<div class="badge '+(guess===x.r?'b1">Correct':'b3">You said '+guess)+'</div>':'')+`<div class="two" style="margin-top:${guess?8:0}px"><div>${discSVG(x)}</div><div><div class="ey">Compressed root</div><div class="big">${x.r}</div>
    <dl class="rows" style="margin-top:10px"><dt>Skin</dt><dd>${x.skin}</dd><dt>Weak</dt><dd>${x.mus}</dd><dt>Reflex</dt><dd>${x.ref}</dd></dl></div></div>
    <div class="why" style="margin-top:12px">${why}</div><div class="mapbox"></div>`;
    var mb=$(out,'.mapbox');if(M.body){try{M.body(mb,{view:'both',hl:[x.r]});}catch(e){}}}
  function ask(){var i=Math.floor(Math.random()*DISCS.length),x=DISCS[i],pool=shuf(['C5','C6','C7','C8','L4','L5','S1'].filter(function(r){return r!==x.r;})).slice(0,3).concat([x.r]);pool=shuf(pool);quiz=i;
    $$(R,'.chip[data-i]').forEach(function(b){b.classList.remove('on');});
    out.innerHTML='<div class="ey">Quiz</div><div class="ti2">Posterolateral herniation at '+x.d+'. Which root?</div><div class="chips" style="margin-top:10px">'+pool.map(function(r){return '<button class="chip" data-r="'+r+'">'+r+'</button>';}).join('')+'</div>';
    $$(out,'[data-r]').forEach(function(b){b.onclick=function(){show(i,b.dataset.r);};});}
  R.addEventListener('click',function(e){var b=e.target.closest('.chip[data-i]');if(b)show(+b.dataset.i);if(e.target.closest('[data-a=quiz]'))ask();});
  show(o.start!=null?o.start:5);return R;};

/* ============ 2. EGG CELL LIFE CLOCK ============ */
var OO=[
 {w:'Fetal months 3–5',n:'Oogonium',s:'Dividing by mitosis. Numbers peak at about 7 million in month 5.',c:'46',dna:'2N',ch:'single',st:'Dividing'},
 {w:'Before birth',n:'Primary oocyte',s:'Starts meiosis I, crosses over in pachytene, then stops in diplotene of prophase I.',c:'46',dna:'4N',ch:'tetrad',st:'Arrest 1 · diplotene',ar:1},
 {w:'Birth',n:'Primary oocyte',s:'About 600–800 thousand left, all still paused in diplotene.',c:'46',dna:'4N',ch:'tetrad',st:'Still paused'},
 {w:'Puberty',n:'Primary oocyte',s:'About 40 thousand left. Each cycle FSH recruits 15–20 follicles; one wins.',c:'46',dna:'4N',ch:'tetrad',st:'Still paused'},
 {w:'LH surge',n:'Secondary oocyte + 1st polar body',s:'The LH surge finishes meiosis I (homologs separate) and triggers ovulation.',c:'23',dna:'2N',ch:'dyad',pb:1,st:'Trigger · LH',tr:1},
 {w:'Ovulated',n:'Secondary oocyte',s:'Stops again in metaphase II, wrapped in zona pellucida and corona radiata, then goes to the ampulla.',c:'23',dna:'2N',ch:'dyad',pb:1,zona:1,st:'Arrest 2 · metaphase II',ar:1},
 {w:'Fertilization',n:'Ovum + 2nd polar body → zygote',s:'Sperm entry finishes meiosis II. The two pronuclei make a 46-chromosome zygote.',c:'23 → 46',dna:'1N → 2N',ch:'single',pb:2,zona:1,st:'Meiosis II done',tr:1}];
function cellSVG(x){
  var s='<svg viewBox="0 0 260 200" role="img" aria-label="Egg cell at this stage">';
  if(x.zona)s+='<circle cx="120" cy="100" r="86" fill="none" stroke="var(--l-t4d)" stroke-width="7" opacity=".55"/>';
  s+='<circle cx="120" cy="100" r="74" fill="var(--l-t2)" stroke="var(--l-t2d)" stroke-width="1.5"/>';
  s+='<circle cx="120" cy="100" r="34" fill="var(--l-c2)" stroke="var(--l-t2d)" stroke-dasharray="'+(x.ch==='dyad'?'3 3':'0')+'"/>';
  var col='var(--l-t3d)';
  function X(cx,cy){return '<path d="M'+(cx-6)+' '+(cy-9)+' L'+(cx+6)+' '+(cy+9)+' M'+(cx+6)+' '+(cy-9)+' L'+(cx-6)+' '+(cy+9)+'" stroke="'+col+'" stroke-width="3.2" stroke-linecap="round"/>';}
  function I(cx,cy){return '<path d="M'+cx+' '+(cy-9)+' L'+cx+' '+(cy+9)+'" stroke="'+col+'" stroke-width="3.2" stroke-linecap="round"/>';}
  if(x.ch==='tetrad'){s+=X(104,92)+X(117,92)+X(123,110)+X(136,110)+'<text x="120" y="146" text-anchor="middle" font-size="10" fill="var(--l-s)">homolog pairs (4N)</text>';}
  else if(x.ch==='dyad'){s+=X(110,100)+X(131,100)+'<text x="120" y="146" text-anchor="middle" font-size="10" fill="var(--l-s)">one of each pair (2N)</text>';}
  else{s+=I(108,98)+I(117,104)+I(126,96)+I(135,104)+'<text x="120" y="146" text-anchor="middle" font-size="10" fill="var(--l-s)">'+(x.pb===2?'single chromatids (1N)':'dividing (2N)')+'</text>';}
  if(x.zona)s+='<text x="36" y="24" font-size="10" fill="var(--l-t4d)">zona + corona</text>';
  if(x.pb){s+='<circle cx="205" cy="50" r="13" fill="var(--l-t1)" stroke="var(--l-t1d)"/><text x="205" y="30" text-anchor="middle" font-size="10" fill="var(--l-s)">polar body</text>';}
  if(x.pb===2){s+='<circle cx="214" cy="78" r="10" fill="var(--l-t1)" stroke="var(--l-t1d)"/>';}
  return s+'</svg>';
}
M.lab.oocyte=function(id){
  var R=mk(id,`<div class="hd"><div><div class="ey">Egg cell life clock</div><div class="ti2">Drag through her whole life</div></div><div class="chips"><button class="chip" data-w="lh">What if LH surge is blocked?</button><button class="chip" data-w="nf">What if no sperm?</button></div></div>
  <div class="card"><input type="range" min="0" max="6" step="1" value="1" aria-label="Life stage"><div class="ticks" style="grid-template-columns:repeat(7,1fr)"><span>Fetal</span><span>Pre-birth</span><span>Birth</span><span>Puberty</span><span>LH surge</span><span>Ovulated</span><span>Fertilized</span></div></div>
  <div class="card fade" data-a="out"></div>
  <div class="src">Dr. Shrestha · L03–L05, L10 · her practice Qs: “block the LH surge → blocks completion of meiosis I”</div>`);
  if(!R)return;var sl=$(R,'input'),out=$(R,'[data-a=out]');
  function show(i,note){var x=OO[i];sl.value=i;$$(R,'.ticks span').forEach(function(t,j){t.classList.toggle('on',j===i);});out.classList.remove('fade');void out.offsetWidth;out.classList.add('fade');
    out.innerHTML=`<div class="two"><div>${cellSVG(x)}</div><div><div class="ey">${x.w}</div><div class="big" style="font-size:24px">${x.n}</div>
    <div style="margin:8px 0"><span class="badge ${x.ar?'b3':x.tr?'b2':'b1'}">${x.st}</span></div>
    <dl class="rows"><dt>Chromosomes</dt><dd>${x.c}</dd><dt>DNA</dt><dd>${x.dna}</dd></dl>
    <p style="margin:10px 0 0;font-size:14px">${x.s}</p></div></div>${note?'<div class="why" style="margin-top:12px">'+note+'</div>':''}`;}
  sl.oninput=function(){show(+sl.value);};
  R.addEventListener('click',function(e){var b=e.target.closest('[data-w]');if(!b)return;
    if(b.dataset.w==='lh')show(3,'No LH surge = meiosis I never finishes. The follicle still holds a <b>primary oocyte in diplotene</b>, and no ovulation happens.');
    else show(5,'No fertilization = meiosis II never finishes. The <b>secondary oocyte</b> degenerates within about a day.');});
  show(1);return R;};

/* ============ 3. FIRST WEEK: TUBE TO UTERUS ============ */
var WK=[
 {d:0,t:'Fertilization in the ampulla',s:'Zygote with two pronuclei, still inside the zona.',k:'zyg'},
 {d:1,t:'2-cell stage',s:'Cleavage: more cells, same total size.',k:'c2'},
 {d:2,t:'4-cell stage',s:'Still moving down the tube.',k:'c4'},
 {d:3,t:'Morula · about 16 cells',s:'Compaction after the 8-cell stage. Reaches the uterus.',k:'mor'},
 {d:4,t:'Blastocyst',s:'Fluid cavity forms. Inner cell mass (embryoblast) + trophoblast.',k:'bla'},
 {d:5,t:'Blastocyst hatches',s:'The zona disappears so it can attach.',k:'hat'},
 {d:6,t:'Implantation begins',s:'Attaches at the embryonic pole, usually upper uterine body.',k:'imp'},
 {d:7,t:'Trophoblast invades',s:'Splits into syncytiotrophoblast (invades, makes hCG) and cytotrophoblast (divides).',k:'inv'}];
function embSVG(k){
  var s='<svg viewBox="0 0 200 160" role="img" aria-label="Embryo at this day">',z=(k!=='hat'&&k!=='imp'&&k!=='inv');
  if(z)s+='<circle cx="100" cy="80" r="62" fill="none" stroke="var(--l-t4d)" stroke-width="6" opacity=".5"/>';
  function cell(cx,cy,r){return '<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" fill="var(--l-t2)" stroke="var(--l-t2d)"/>';}
  if(k==='zyg'){s+=cell(100,80,52)+'<circle cx="86" cy="80" r="9" fill="var(--l-c2)" stroke="var(--l-t3d)"/><circle cx="114" cy="80" r="9" fill="var(--l-c2)" stroke="var(--l-t1d)"/>';}
  else if(k==='c2'){s+=cell(76,80,26)+cell(124,80,26);}
  else if(k==='c4'){s+=cell(80,60,22)+cell(120,60,22)+cell(80,100,22)+cell(120,100,22);}
  else if(k==='mor'){for(var i=0;i<16;i++){var a=i/16*Math.PI*2,r=i<10?34:14,cx=100+Math.cos(a*(i<10?1:1.6))*r,cy=80+Math.sin(a*(i<10?1:1.6))*r;s+=cell(cx.toFixed(1),cy.toFixed(1),13);}}
  else{var ox=100,oy=80;if(k==='imp'||k==='inv'){oy=66;s+='<rect x="0" y="112" width="200" height="48" fill="var(--l-t3)" opacity=".7"/><text x="192" y="152" text-anchor="end" font-size="10" fill="var(--l-t3f)">endometrium</text>';}
    var down=(k==='imp'||k==='inv');s+='<circle cx="'+ox+'" cy="'+oy+'" r="50" fill="var(--l-c1)"/>';
    for(var q=0;q<18;q++){var aa=q/18*Math.PI*2;s+='<ellipse cx="'+(ox+Math.cos(aa)*50).toFixed(1)+'" cy="'+(oy+Math.sin(aa)*50).toFixed(1)+'" rx="9.5" ry="6" transform="rotate('+(aa*180/Math.PI+90).toFixed(0)+' '+(ox+Math.cos(aa)*50).toFixed(1)+' '+(oy+Math.sin(aa)*50).toFixed(1)+')" fill="var(--l-t2)" stroke="var(--l-t2d)"/>';}
    var iy=oy+(down?30:-30);[[-12,0],[0,-5],[12,0],[-6,9],[6,9],[0,3]].forEach(function(c){s+='<circle cx="'+(ox+c[0])+'" cy="'+(iy+c[1]*(down?-1:1))+'" r="8" fill="var(--l-t1)" stroke="var(--l-t1d)"/>';});
    s+='<text x="'+ox+'" y="'+(oy+(down?-6:18))+'" text-anchor="middle" font-size="10" fill="var(--l-s)">cavity</text>';

    if(k==='inv'){s+='<path d="M72 108 L64 132 M100 118 L100 146 M128 108 L136 132" stroke="var(--l-t3d)" stroke-width="5" stroke-linecap="round"/>';}}
  return s+'</svg>';
}
var FZ=[
 {t:'Capacitation',s:'In the female tract (~7 h), the glycoprotein coat and seminal proteins come off the sperm head. Only then can it react.'},
 {t:'Corona radiata',s:'Hyaluronidase from the acrosome loosens the follicle cells around the egg.'},
 {t:'Zona pellucida',s:'Binding ZP3 fires the acrosome reaction. Acrosin digests a path through the zona.'},
 {t:'Fusion + cortical reaction',s:'Membranes fuse. Cortical granules are released into the perivitelline space.'},
 {t:'Zona reaction',s:'Granule enzymes change ZP2/ZP3, so no more sperm can bind: the block to polyspermy. Meiosis II finishes.'}];
M.lab.week1=function(id){
  var R=mk(id,`<div class="hd"><div><div class="ey">First week</div><div class="ti2">Ampulla to uterine wall, day by day</div></div><div class="badge b2" data-a="day">Day 0</div></div>
  <div class="card"><svg viewBox="0 0 600 96" aria-hidden="true"><path d="M20 60 C120 10 220 10 300 40 S470 80 580 50" fill="none" stroke="var(--l-gd)" stroke-width="16" stroke-linecap="round" opacity=".45"/>
  <text x="20" y="88" font-size="20" fill="var(--l-s)">ampulla</text><text x="250" y="88" font-size="20" fill="var(--l-s)">isthmus</text><text x="500" y="88" font-size="20" fill="var(--l-s)">uterus</text>
  <circle data-a="dot" r="11" cx="20" cy="60" fill="var(--l-t3d)"/></svg>
  <input type="range" min="0" max="7" step="1" value="0" aria-label="Day after fertilization"><div class="ticks" style="grid-template-columns:repeat(8,1fr)"><span>0</span><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span></div></div>
  <div class="card fade" data-a="out"></div>
  <div class="card"><div class="ey">Fertilization, step by step</div><div data-a="fz" style="margin-top:6px"></div><div style="display:flex;gap:8px;justify-content:space-between;align-items:center;margin-top:10px"><button class="btn q" data-f="-1">Back</button><div class="dots">${FZ.map(function(){return '<i></i>';}).join('')}</div><button class="btn" data-f="1">Next</button></div></div>
  <div class="src">Dr. Shrestha · L10 (“three days… sixteen cells”, “implantation six–seven days”) · deck s28</div>`);
  if(!R)return;var sl=$(R,'input'),out=$(R,'[data-a=out]'),dot=$(R,'[data-a=dot]'),path=$(R,'path'),L=path.getTotalLength?path.getTotalLength():0,fi=0;
  var pos=[0,.12,.26,.44,.62,.74,.9,.96];
  function show(i){var x=WK[i];sl.value=i;$(R,'[data-a=day]').textContent='Day '+x.d;$$(R,'.ticks span').forEach(function(t,j){t.classList.toggle('on',j===i);});
    if(L){var p=path.getPointAtLength(L*pos[i]);dot.setAttribute('cx',p.x);dot.setAttribute('cy',p.y);}
    out.classList.remove('fade');void out.offsetWidth;out.classList.add('fade');
    out.innerHTML=`<div class="two"><div>${embSVG(x.k)}</div><div><div class="ey">Day ${x.d}</div><div class="big" style="font-size:22px">${x.t}</div><p style="margin:8px 0 0;font-size:14px">${x.s}</p>${/bla|hat|imp|inv/.test(x.k)?'<div style="font-size:13px;margin-top:6px"><span class="badge b2">ring</span> trophoblast · <span class="badge b1">cluster</span> inner cell mass</div>':''}
    <div class="soft" style="margin-top:10px;font-size:13px"><b>3</b> = morula · <b>4–5</b> = blastocyst · <b>6–7</b> = implants</div></div></div>`;}
  function fz(){var x=FZ[fi];$(R,'[data-a=fz]').innerHTML='<div class="fade"><div style="font-weight:500;font-size:16px">'+(fi+1)+'. '+x.t+'</div><p style="margin:4px 0 0;font-size:14px">'+x.s+'</p></div>';$$(R,'.dots i').forEach(function(d,j){d.classList.toggle('on',j===fi);});}
  sl.oninput=function(){show(+sl.value);};
  R.addEventListener('click',function(e){var b=e.target.closest('[data-f]');if(b){fi=Math.max(0,Math.min(FZ.length-1,fi+(+b.dataset.f)));fz();}});
  show(0);fz();return R;};

/* ============ 4. FETAL AGE: BLOOD SITES + PLACENTAL BARRIER ============ */
M.lab.fetal=function(id){
  var R=mk(id,`<div class="hd"><div><div class="ey">Fetal age slider</div><div class="ti2">Where blood is made, and what a drug must cross</div></div><div class="badge b2" data-a="age">Week 20</div></div>
  <div class="card"><input type="range" min="3" max="40" step="1" value="20" aria-label="Gestational week"><div class="rl"><span>Wk 3</span><span>Wk 8</span><span>Wk 17 (month 4)</span><span>Wk 30 (month 7)</span><span>Wk 40</span></div></div>
  <div class="two"><div class="card"><div class="ey">Main blood-making site</div><div class="big" data-a="site" style="margin:4px 0 10px">Liver</div><svg data-a="gantt" viewBox="0 0 300 150" aria-label="Blood-making sites over time"></svg></div>
  <div class="card"><div class="ey">Placental barrier</div><div class="big" data-a="nl" style="margin:4px 0 10px">2 layers</div><svg data-a="bar" viewBox="0 0 300 190" aria-label="Layers between maternal and fetal blood"></svg></div></div>
  <div class="why" data-a="note"></div>
  <div class="src">Dr. Shrestha · L17 00:45:54 (yolk sac wk 3–8 → liver months 2–7 → marrow after month 7) · L17 01:27:07 (4 layers → 2)</div>`);
  if(!R)return;var sl=$(R,'input');
  function x(w){return 20+(w-3)/37*270;}
  function draw(w){var mo=(w/4.33).toFixed(1),site=w<=8?'Yolk sac':w<=30?'Liver':'Bone marrow';
    $(R,'[data-a=age]').textContent='Week '+w+' · month '+mo;$(R,'[data-a=site]').textContent=site;
    var rows=[['Yolk sac',3,8,'--l-t4d',w<=8],['Liver',6,30,'--l-t3d',w>8&&w<=30],['Bone marrow',26,40,'--l-t2d',w>30],['Spleen',10,28,'--l-gd',false]];
    var g='';rows.forEach(function(r,i){var y=14+i*32;g+='<text x="20" y="'+(y-3)+'" font-size="11" fill="var(--l-s)">'+r[0]+(r[0]==='Spleen'?' · never the answer':'')+'</text><rect x="'+x(r[1])+'" y="'+y+'" width="'+(x(r[2])-x(r[1]))+'" height="12" rx="6" fill="var('+r[3]+')" opacity="'+(r[4]?1:.35)+'"/>';});
    g+='<line x1="'+x(w)+'" x2="'+x(w)+'" y1="2" y2="144" stroke="var(--l-t)" stroke-width="1.5"/><circle cx="'+x(w)+'" cy="146" r="3" fill="var(--l-t)"/>';
    $(R,'[data-a=gantt]').innerHTML=g;
    var early=w<17,L=[['Maternal blood','--l-t3',1,'intervillous space'],['Syncytiotrophoblast','--l-t2',1],['Cytotrophoblast','--l-t2',early],['Villous connective tissue','--l-t1',early],['Fetal capillary endothelium','--l-t1',1],['Fetal blood','--l-t3',1,'']];
    var b='',y=4;L.forEach(function(l){var h=l[2]?26:0,edge=l[0].indexOf('blood')>=0;if(h){b+='<rect x="'+(edge?20:44)+'" y="'+y+'" width="'+(edge?260:212)+'" height="'+(h-4)+'" rx="7" fill="var('+l[1]+')" opacity="'+(edge?.55:1)+'"/><text x="150" y="'+(y+15)+'" text-anchor="middle" font-size="11.5">'+l[0]+'</text>';y+=h+2;}});
    var bs=$(R,'[data-a=bar]');bs.setAttribute('viewBox','0 0 300 '+(y+2));bs.innerHTML=b;$(R,'[data-a=nl]').textContent=early?'4 layers':'2 layers';
    $(R,'[data-a=note]').innerHTML=w<=8?'Weeks 3–8: <b>yolk sac</b>. This is also the embryonic period (organogenesis).':w<=30?'Months 2–7: <b>liver</b>. Week 20 is still liver. Spleen is never the principal-site answer.'+(early?'':' The barrier is now thin: syncytiotrophoblast + fetal endothelium.'):'After month 7: <b>bone marrow</b> takes over. Survival rises after ~28 weeks (surfactant).';}
  sl.oninput=function(){draw(+sl.value);};draw(20);return R;};

/* ============ 5–6. SORTERS (neural crest, AFP, defect type) ============ */
M.lab.sort=function(id,o){
  var R=mk(id,`<div class="hd"><div><div class="ey">${o.ey||'Sort'}</div><div class="ti2">${o.title}</div></div><div class="badge b2" data-a="sc">0 / ${o.items.length}</div></div>
  ${o.tabs?'<div class="chips" data-a="tabs">'+o.tabs.map(function(t,i){return '<button class="chip'+(i?'':' on')+'" data-t="'+i+'">'+t.name+'</button>';}).join('')+'</div>':''}
  <div class="bar"><i style="width:0"></i></div><div class="item" data-a="it"></div><div class="bins" data-a="bins"></div><div class="fb" data-a="fb"></div>
  <div class="src">${o.src||''}</div>`);
  if(!R)return;var set=o,deck,k,ok,miss;
  function load(s){set=s;deck=shuf(s.items);k=0;ok=0;miss=[];$(R,'[data-a=bins]').innerHTML=s.bins.map(function(b){return '<button class="bin" data-b="'+b.id+'">'+b.name+'</button>';}).join('');next();}
  function next(){$$(R,'.bin').forEach(function(b){b.classList.remove('ok','no');b.disabled=false;});
    $(R,'.bar i').style.width=(k/deck.length*100)+'%';$(R,'[data-a=sc]').textContent=ok+' / '+deck.length;
    if(k>=deck.length){$(R,'[data-a=it]').innerHTML='<div><div class="big">'+ok+' / '+deck.length+'</div><div style="font-size:14px;color:var(--l-s)">'+(miss.length?'Missed: '+miss.join(', '):'Clean sweep')+'</div></div>';
      $(R,'[data-a=fb]').innerHTML='<button class="btn" data-a="again">Shuffle and go again</button>';return;}
    var it=deck[k];$(R,'[data-a=it]').innerHTML='<span class="fade">'+it.n+'</span>';$(R,'[data-a=fb]').innerHTML='';}
  R.addEventListener('click',function(e){var t=e.target.closest('[data-t]');if(t&&o.tabs){$$(R,'[data-t]').forEach(function(c){c.classList.toggle('on',c===t);});load(o.tabs[+t.dataset.t]);return;}
    if(e.target.closest('[data-a=again]')){load(set);return;}
    var b=e.target.closest('.bin');if(!b||b.disabled||k>=deck.length)return;var it=deck[k],right=b.dataset.b===it.b;
    $$(R,'.bin').forEach(function(x){x.disabled=true;if(x.dataset.b===it.b)x.classList.add('ok');});if(!right){b.classList.add('no');miss.push(it.n);}else ok++;
    var bn=set.bins.filter(function(x){return x.id===it.b;})[0].name;
    $(R,'[data-a=fb]').innerHTML='<div class="fade"><b style="color:var('+(right?'--l-t1d':'--l-t3d')+')">'+(right?'Yes':'No')+' · '+bn+'.</b> '+(it.w||'')+' <button class="btn q" data-a="nx" style="margin-left:6px;padding:5px 10px">Next</button></div>';});
  R.addEventListener('click',function(e){if(e.target.closest('[data-a=nx]')){k++;next();}});
  load(o.tabs?o.tabs[0]:o);return R;};
var CREST={bins:[{id:'c',name:'Neural crest'},{id:'t',name:'Neural tube'},{id:'m',name:'Mesoderm'},{id:'e',name:'Endoderm'},{id:'s',name:'Surface ectoderm'}],items:[
 {n:'Schwann cells',b:'c',w:'PNS myelin. She said it: “not oligodendrocytes, the Schwann cells” come from crest.'},
 {n:'Oligodendrocytes',b:'t',w:'CNS myelin comes from the neural tube.'},
 {n:'Dorsal root ganglion neurons',b:'c',w:'All ganglia outside the CNS are crest.'},
 {n:'Sympathetic chain ganglia',b:'c',w:'Autonomic ganglia = crest.'},
 {n:'Melanocytes',b:'c',w:'Skin pigment cells migrate from the crest.'},
 {n:'Adrenal medulla',b:'c',w:'Chromaffin cells = modified sympathetic neurons = crest.'},
 {n:'Adrenal cortex',b:'m',w:'Intermediate mesoderm. Medulla is crest, cortex is not.'},
 {n:'Thyroid C cells',b:'c',w:'Parafollicular cells making calcitonin = crest.'},
 {n:'Thyroid follicular cells',b:'e',w:'Follicles (thyroxine) come from endoderm.'},
 {n:'Pia and arachnoid',b:'c',w:'The leptomeninges are crest.'},
 {n:'Dura mater',b:'m',w:'Dura is mesoderm.'},
 {n:'Odontoblasts',b:'c',w:'Tooth dentin-makers = crest.'},
 {n:'Spinal cord motor neurons',b:'t',w:'Neurons inside the CNS = neural tube.'},
 {n:'Enteric (gut wall) ganglia',b:'c',w:'Gut nervous system = crest.'},
 {n:'Epidermis',b:'s',w:'Surface ectoderm. Its melanocytes are crest, but the epidermis is not.'},
 {n:'Lens of the eye',b:'s',w:'Surface ectoderm.'}]};
M.lab.crest=function(id){return M.lab.sort(id,Object.assign({ey:'Neural crest sorter',title:'Tap where each cell comes from',src:'Dr. Shrestha · L17 00:03:25 · “in the exam you’ll simply be asked which of the following is a neural crest derivative”'},CREST));};
var AFP={name:'AFP high or low',bins:[{id:'h',name:'AFP high'},{id:'l',name:'AFP low'}],items:[
 {n:'Anencephaly',b:'h',w:'Open neural tube defect.'},{n:'Open meningomyelocele',b:'h',w:'Open neural tube defect.'},{n:'Omphalocele',b:'h',w:'Body-wall defect.'},{n:'Gastroschisis',b:'h',w:'Body-wall defect.'},{n:'Bladder exstrophy',b:'h',w:'Open defect.'},{n:'Sacrococcygeal teratoma',b:'h',w:'On her high list.'},{n:'Amniotic band syndrome',b:'h',w:'On her high list.'},{n:'Intestinal atresia',b:'h',w:'On her high list.'},
 {n:'Trisomy 21 (Down)',b:'l',w:'Chromosomal → low.'},{n:'Trisomy 18 (Edwards)',b:'l',w:'Chromosomal → low.'},{n:'Triploidy',b:'l',w:'Chromosomal → low.'},{n:'Sex-chromosome abnormality',b:'l',w:'Chromosomal → low.'}]};
var DEF={name:'Defect type',bins:[{id:'ma',name:'Malformation'},{id:'de',name:'Deformation'},{id:'di',name:'Disruption'},{id:'sy',name:'Syndrome'},{id:'as',name:'Association'}],items:[
 {n:'Bilateral renal agenesis',b:'ma',w:'Formed wrong during organogenesis (weeks 3–8).'},
 {n:'Clubfeet from oligohydramnios',b:'de',w:'Normal bones pushed out of shape by compression.'},
 {n:'Fingers amputated by fibrous bands',b:'di',w:'A normal part destroyed: amniotic band.'},
 {n:'Phocomelia after thalidomide',b:'ma',w:'Limb formed wrong in the sensitive window.'},
 {n:'Anencephaly',b:'ma',w:'Neural tube failed to close.'},
 {n:'Flattened face from oligohydramnios',b:'de',w:'Compression, not abnormal formation.'},
 {n:'Several defects from one known cause (trisomy 21)',b:'sy',w:'Syndrome = one cause.'},
 {n:'Vertebral, anal, cardiac, TE fistula, renal, limb cluster',b:'as',w:'VACTERL: non-random cluster, no single cause.'}]};
M.lab.defects=function(id){return M.lab.sort(id,{ey:'Defect and AFP sorter',title:'Sort each one',tabs:[AFP,DEF],items:AFP.items,bins:AFP.bins,src:'Dr. Shrestha · L18 (AFP 00:49:56 · deformation 00:11:25) · deck s6, s37'});};

/* ============ 7. INJURY → NERVE BOARD ============ */
var INJ=[
 {s:'Hematoma in the femoral triangle after catheterization',n:'Femoral nerve',w:'Knee extension weak; patellar reflex drops',f:'Anterior thigh + medial leg (saphenous branch)',p:'NAV: nerve is lateral, outside the sheath.',tg:'Thigh'},
 {s:'Knee hits the dashboard; limb shortened, adducted, medially rotated',n:'Sciatic nerve',w:'Hamstrings + everything below the knee; foot drop',f:'Leg and foot except the medial strip',p:'Posterior hip dislocation puts the femoral head right on it.',tg:'Hip'},
 {s:'Fracture of the fibular neck, or a tight cast there',n:'Common fibular nerve',w:'Dorsiflexion + eversion lost: foot drop, high-steppage gait',f:'Lateral leg + dorsum of foot',p:'Wraps around the fibular neck.',tg:'Leg'},
 {s:'Deep cut on the lateral leg',n:'Superficial fibular nerve',w:'Eversion lost (fibularis longus + brevis)',f:'Distal anterolateral leg + most of the dorsum',p:'Eversion is the action unique to the lateral compartment.',tg:'Leg'},
 {s:'Ski boot laced too tight over the ankle',n:'Deep fibular nerve',w:'Mostly sensory when compressed here',f:'First dorsal web space only',p:'Cut higher up → foot drop too.',tg:'Foot'},
 {s:'IM injection placed too low and medial in the buttock',n:'Superior gluteal nerve',w:'Abduction + medial rotation (medius, minimus, TFL)',f:'None',p:'Trendelenburg: stand on the injured side → the opposite pelvis drops.',tg:'Hip'},
 {s:'Pelvic fracture damages the nerve to gluteus maximus',n:'Inferior gluteal nerve',w:'Hip extension: stairs, rising from a chair',f:'None',p:'Walking on level ground is fine.',tg:'Hip'},
 {s:'Pelvic lymph node surgery',n:'Obturator nerve',w:'Adduction: cannot cross the legs',f:'Medial thigh',p:'Knee jerk is normal (that is femoral).',tg:'Thigh'},
 {s:'Heavy tool belt; burning lateral thigh',n:'Lateral femoral cutaneous nerve',w:'No weakness',f:'Anterolateral thigh',p:'Meralgia paresthetica.',tg:'Thigh'},
 {s:'Great saphenous vein harvested for CABG',n:'Saphenous nerve',w:'No weakness',f:'Medial leg + medial border of foot',p:'Vein and nerve travel together; the vein is reversed for the graft.',tg:'Vein'},
 {s:'Small saphenous vein harvested behind the lateral malleolus',n:'Sural nerve',w:'No weakness',f:'Lateral border of the foot',p:'Also the classic nerve-biopsy donor.',tg:'Vein'},
 {s:'Compression under the flexor retinaculum (tarsal tunnel)',n:'Tibial nerve',w:'Intrinsic foot muscles',f:'Sole of the foot',p:'Higher tibial injury: cannot walk on toes.',tg:'Foot'}];
var NODES=[
 {s:'Swollen nodes running parallel to the inguinal ligament',n:'Horizontal group',f:'Drains perineum, anal region, genitals, buttock, lower abdominal wall'},
 {s:'Swollen nodes along the terminal great saphenous vein',n:'Vertical group',f:'Drains the leg and foot'}];
M.lab.injury=function(id){
  var R=mk(id,`<div class="hd"><div><div class="ey">Injury → nerve board</div><div class="ti2">Pick an injury. Or let it quiz you.</div></div><button class="btn q" data-a="quiz">Quiz me</button></div>
  <div class="two"><div class="list" data-a="ls"></div><div><div class="card fade" data-a="out" style="position:sticky;top:8px"></div></div></div>
  <div class="card"><div class="ey">Swollen inguinal nodes: which group?</div><div class="two" style="margin-top:8px">${NODES.map(function(x){return '<div class="soft"><div style="font-weight:500">'+x.n+'</div><div style="font-size:13px;color:var(--l-s);margin:2px 0 6px">'+x.s+'</div><div style="font-size:14px">'+x.f+'</div></div>';}).join('')}</div></div>
  <div class="src">Dr. Roman · lower limb lectures L06–L25 · Must-Know §3a</div>`);
  if(!R)return;var ls=$(R,'[data-a=ls]'),out=$(R,'[data-a=out]');
  ls.innerHTML=INJ.map(function(x,i){return '<button class="li" data-i="'+i+'"><span class="tg">'+x.tg+'</span><span>'+x.s+'</span></button>';}).join('');
  function show(i,guess){var x=INJ[i];$$(ls,'.li').forEach(function(b){b.classList.toggle('on',+b.dataset.i===i);});out.classList.remove('fade');void out.offsetWidth;out.classList.add('fade');
    out.innerHTML=(guess?'<div class="badge '+(guess===x.n?'b1">Correct':'b3">You said '+guess)+'</div>':'')+'<div class="ey" style="margin-top:6px">Nerve</div><div class="big" style="font-size:24px">'+x.n+'</div><dl class="rows" style="margin-top:10px"><dt>Weak</dt><dd>'+x.w+'</dd><dt>Numb</dt><dd>'+x.f+'</dd></dl><div class="why" style="margin-top:10px">'+x.p+'</div>';}
  function ask(){var i=Math.floor(Math.random()*INJ.length),x=INJ[i],pool=shuf(INJ.filter(function(y){return y.n!==x.n;}).map(function(y){return y.n;})).slice(0,4).concat([x.n]);pool=shuf(pool);
    $$(ls,'.li').forEach(function(b){b.classList.remove('on');});
    out.innerHTML='<div class="ey">Quiz</div><div style="font-size:15px;margin:4px 0 10px">'+x.s+'. Which nerve?</div><div class="chips">'+pool.map(function(n){return '<button class="chip" data-n="'+n+'">'+n+'</button>';}).join('')+'</div>';
    $$(out,'[data-n]').forEach(function(b){b.onclick=function(){show(i,b.dataset.n);};});}
  R.addEventListener('click',function(e){var b=e.target.closest('.li');if(b)show(+b.dataset.i);if(e.target.closest('[data-a=quiz]'))ask();});
  show(0);return R;};

M.lab.v='1.0.0';
})();
