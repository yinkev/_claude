/* _claude cozy anatomy v1.0.0 — "Cozy Anatomy" design system + teaching widgets.
   Chunky outlines, jelly discs, noodle nerves with DRG beads, press-down buttons, sticker labels, inventory tiles.
   <div id="x"></div>
   <script src="https://cdn.jsdelivr.net/gh/yinkev/_claude@<COMMIT>/cards/cozy.js"></script>
   <script>MUA.cozy.disc('x')</script>
   Widgets: disc (herniation → root, with arm/leg dermatome) · injury (lower-limb nerve detective, front/back legs)
   Generic teaching content only. No personal data lives here. */
(function(){
var M=window.MUA=window.MUA||{};M.cozy=M.cozy||{};if(M.cozy.v)return;
var FS='https://cdn.jsdelivr.net/npm/@fontsource/';
var CSS=`
.cz{--bg:#FFF4DF;--dot:#F2DDB5;--ink:#5A4131;--txt:#5A4131;--mut:#9A7D66;--card:#FFFCF4;--bone:#FFE1B3;--bone2:#F8C98C;--jel:#C3E8F4;--jel2:#87CFE7;--sac:#F0DEF7;--nd:#FFD166;--ouch:#FF6B6B;--leaf:#9BD48A;--skin:#FFDDC2;--skin2:#F4BF98;--numb:#FF8FA8;--shd:#5A4131;--okb:#E6F6DF;--okt:#2F5A24;--bdb:#FFE3E0;--bdt:#8A2F25;
 font:700 15px/1.45 Nunito,system-ui,sans-serif;color:var(--txt);background:var(--bg) radial-gradient(var(--dot) 1.3px,transparent 1.6px) 0 0/18px 18px;border:3px solid var(--ink);border-radius:30px;padding:18px 16px 16px;box-shadow:0 6px 0 var(--shd);max-width:680px;-webkit-font-smoothing:antialiased;-webkit-tap-highlight-color:transparent}
@media (prefers-color-scheme:dark){.cz{--bg:#2B2340;--dot:#3A3053;--ink:#17111F;--txt:#F7EBD8;--mut:#BFA9C9;--card:#3A2F52;--bone:#F1D1A2;--bone2:#E2B170;--jel:#A3D6E8;--jel2:#6CBCD9;--sac:#D9C3EA;--skin:#EFC8A4;--skin2:#D9A77E;--shd:#120D19;--okb:#2D4A2B;--okt:#C4EDB7;--bdb:#5B2B35;--bdt:#FFD3CE}}
.cz *{box-sizing:border-box}.cz button{font:inherit;color:inherit;cursor:pointer;margin:0}
.cz .chip{display:inline-block;font:600 13px/1 Fredoka,sans-serif;color:#2E2418;background:var(--leaf);border:2.5px solid var(--ink);border-radius:999px;padding:6px 12px 5px;box-shadow:0 3px 0 var(--shd);transform:rotate(-2deg)}
.cz h3{margin:12px 0 2px;font:600 28px/1.05 Fredoka,sans-serif;letter-spacing:-.01em}
.cz .sub{color:var(--mut);font-size:14.5px}
.cz .stage{margin-top:14px;background:var(--card);border:3px solid var(--ink);border-radius:24px;box-shadow:0 5px 0 var(--shd);padding:10px 8px 6px}
.cz svg{display:block;max-width:100%}.cz svg.fig{width:100%;height:auto;margin:0 auto}
.cz svg text{font-family:Fredoka,sans-serif;font-weight:600}
.cz .bub{margin:16px 2px 0;background:var(--card);border:3px solid var(--ink);border-radius:20px;padding:12px 14px;position:relative;box-shadow:0 4px 0 var(--shd)}
.cz .bub:before{content:"";position:absolute;top:-13px;left:34px;width:20px;height:20px;background:var(--card);border-left:3px solid var(--ink);border-top:3px solid var(--ink);transform:rotate(45deg);border-radius:4px 0 0 0}
.cz .bub b,.cz .bub em{font-family:Fredoka,sans-serif;font-weight:600;font-style:normal;color:var(--ouch)}
.cz .bub .q{font:600 18px/1.25 Fredoka,sans-serif;color:var(--txt)}
.cz .row{display:flex;gap:10px;margin-top:16px;align-items:center;flex-wrap:wrap}
.cz .btn{font:600 16px/1 Fredoka,sans-serif;color:#2E2418;background:var(--nd);border:3px solid var(--ink);border-radius:16px;padding:12px 18px 11px;box-shadow:0 5px 0 var(--shd);transition:transform .12s,box-shadow .12s}
.cz .btn:active{transform:translateY(4px);box-shadow:0 1px 0 var(--shd)}
.cz .btn.alt{background:var(--card);color:var(--txt)}.cz .btn.sm{font-size:14px;padding:9px 13px 8px;border-radius:14px;box-shadow:0 4px 0 var(--shd)}
.cz .stk{font:600 14px/1.1 Fredoka,sans-serif;color:#2E2418;background:#FFF;border:2.5px dashed var(--ink);border-radius:14px;padding:9px 12px;transform:rotate(2.5deg);margin-left:auto}
.cz .segs{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px}
.cz .pill{font:600 14px/1 Fredoka,sans-serif;background:var(--card);color:var(--txt);border:2.5px solid var(--ink);border-radius:999px;padding:9px 13px 8px;box-shadow:0 3px 0 var(--shd);transition:transform .12s,box-shadow .12s,background .2s}
.cz .pill:active{transform:translateY(2px);box-shadow:0 1px 0 var(--shd)}
.cz .pill.on{background:var(--nd);color:#2E2418}.cz .pill.rg{background:var(--jel);color:#23303A}.cz .pill.rg.on{background:var(--nd);color:#2E2418}
.cz .pill.ok{background:var(--leaf);color:#20361A}.cz .pill.no{background:var(--ouch);color:#fff}
.cz .opts{display:flex;flex-direction:column;gap:8px;margin-top:12px}.cz .opts .pill{text-align:left;border-radius:14px;padding:11px 14px 10px}
.cz .sl{display:grid;grid-template-columns:auto 1fr;gap:14px;align-items:center;margin-top:16px;font:600 15px/1 Fredoka,sans-serif}
.cz input[type=range]{-webkit-appearance:none;appearance:none;width:100%;height:36px;background:transparent;margin:0}
.cz input[type=range]::-webkit-slider-runnable-track{height:16px;border-radius:8px;background:var(--jel);border:3px solid var(--ink);box-shadow:0 3px 0 var(--shd)}
.cz input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:32px;height:32px;border-radius:50%;background:var(--nd);border:3px solid var(--ink);box-shadow:0 3px 0 var(--shd);margin-top:-11px}
.cz input[type=range]::-moz-range-track{height:10px;border-radius:8px;background:var(--jel);border:3px solid var(--ink)}
.cz input[type=range]::-moz-range-thumb{width:26px;height:26px;border-radius:50%;background:var(--nd);border:3px solid var(--ink)}
.cz .res{display:grid;grid-template-columns:minmax(0,.78fr) minmax(0,1.22fr);gap:10px;margin-top:16px;align-items:stretch}
@media (max-width:420px){.cz .res .big{font-size:38px}.cz .res .slot{font-size:12.5px;padding:7px 9px}}
.cz .card{background:var(--card);border:3px solid var(--ink);border-radius:20px;box-shadow:0 4px 0 var(--shd);padding:12px}
.cz .lab{font:600 11px/1 Fredoka,sans-serif;letter-spacing:.08em;text-transform:uppercase;color:var(--mut)}
.cz .big{font:600 46px/1 Fredoka,sans-serif;letter-spacing:-.02em;margin:4px 0 10px;transition:color .3s}
.cz .nm{font:600 24px/1.1 Fredoka,sans-serif;letter-spacing:-.01em;margin:4px 0 10px}
.cz .stack{display:flex;flex-direction:column;gap:8px}
.cz .slot{background:var(--card);border:2.5px solid var(--ink);border-radius:14px;padding:8px 11px;box-shadow:0 3px 0 var(--shd);font-size:13.5px;line-height:1.3;transition:background .3s,transform .35s cubic-bezier(.3,1.6,.5,1)}
.cz .slot i{display:block;font:600 10.5px/1 Fredoka,sans-serif;font-style:normal;letter-spacing:.08em;text-transform:uppercase;color:var(--mut);margin-bottom:4px}
.cz .slot.bad{background:var(--bdb);color:var(--bdt)}.cz .slot.bad i{color:var(--ouch)}
.cz .slot.ok{background:var(--okb);color:var(--okt)}.cz .slot.ok i{color:#4D8A3B}
.cz .inv{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}
.cz .lvl{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:8px;margin-top:16px}
.cz .lv{aspect-ratio:1/1;border:2.5px solid var(--ink);border-radius:14px;box-shadow:0 3px 0 var(--shd);font:600 17px/1 Fredoka,sans-serif;color:#2E2418;transition:transform .12s,box-shadow .12s;position:relative}
.cz .lv:active{transform:translateY(2px);box-shadow:0 1px 0 var(--shd)}
.cz .lv.on{transform:translateY(2px);box-shadow:0 1px 0 var(--shd),0 0 0 3px var(--bg),0 0 0 6px var(--ink)}
.cz .lv.got:after{content:"";position:absolute;right:-5px;top:-5px;width:14px;height:14px;border-radius:50%;background:var(--leaf);border:2.5px solid var(--ink)}
.cz .keys{display:flex;flex-wrap:wrap;gap:8px;margin-top:10px}
.cz .key{display:inline-flex;align-items:center;gap:6px;font-size:12.5px;color:var(--mut)}.cz .key i{width:14px;height:14px;border-radius:5px;border:2px solid var(--ink)}
.cz .two{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:10px}
.cz .foot{font-size:11.5px;color:var(--mut);text-align:center;margin-top:14px;line-height:1.4}
.cz .hd2{font:600 16px/1.2 Fredoka,sans-serif;margin:18px 2px 0}
.cz .dsc{transform-box:fill-box;transform-origin:50% 50%}.cz .jig{animation:czJ .6s cubic-bezier(.3,1.6,.5,1)}
@keyframes czJ{0%{transform:none}30%{transform:scale(1.07,.86)}60%{transform:scale(.97,1.06)}100%{transform:none}}
.cz .pop{transform-box:fill-box;transform-origin:50% 50%;transition:transform .45s cubic-bezier(.3,1.7,.5,1),opacity .2s}
.cz .shake{animation:czS .45s}@keyframes czS{0%,100%{transform:none}20%{transform:translateX(-7px)}40%{transform:translateX(6px)}60%{transform:translateX(-4px)}80%{transform:translateX(2px)}}
.cz .in{animation:czI .4s cubic-bezier(.3,1.5,.5,1) both}@keyframes czI{from{opacity:0;transform:translateY(6px) scale(.97)}to{opacity:1;transform:none}}
.cz .zone{transition:opacity .35s}
@media (prefers-reduced-motion:reduce){.cz *{animation:none!important;transition:none!important}}`;
function boot(){if(document.getElementById('cz-css'))return;['fredoka@5/600.css','nunito@5/700.css','nunito@5/800.css'].forEach(function(p){var l=document.createElement('link');l.rel='stylesheet';l.href=FS+p;document.head.appendChild(l);});
  var s=document.createElement('style');s.id='cz-css';s.textContent=CSS;document.head.appendChild(s);}
function mount(id,h){boot();var H=typeof id==='string'?document.getElementById(id):id;if(!H)return null;var R=document.createElement('div');R.className='cz';R.innerHTML=h;H.appendChild(R);return R;}
function $(R,s){return R.querySelector(s);}function $$(R,s){return [].slice.call(R.querySelectorAll(s));}
function shuf(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),t=a[i];a[i]=a[j];a[j]=t;}return a;}
var RM=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
var EZ={ios:function(t){return 1-Math.pow(1-t,3.4);},back:function(t){var c=2.2;return 1+(c+1)*Math.pow(t-1,3)+c*Math.pow(t-1,2);}};
function tween(o,to,dur,ez,fn){cancelAnimationFrame(o.raf);var a=o.h,t0=performance.now();if(RM){o.h=to;fn(to);return;}(function f(n){var t=Math.min(1,(n-t0)/dur);o.h=a+(to-a)*ez(t);fn(o.h);if(t<1)o.raf=requestAnimationFrame(f);})(t0);}
function clamp(h){return Math.max(0,Math.min(1,h));}
function jig(el){if(!el)return;el.classList.remove('jig');void el.getBoundingClientRect();el.classList.add('jig');}
function shake(el){el.classList.remove('shake');void el.offsetWidth;el.classList.add('shake');}
function P(a,m){function X(x){return +(m?360-x:x).toFixed(1);}var s='M'+X(a[0])+' '+a[1];for(var i=2;i<a.length;i+=6)s+=' C'+X(a[i])+' '+a[i+1]+' '+X(a[i+2])+' '+(+a[i+3].toFixed(1))+' '+X(a[i+4])+' '+(+a[i+5].toFixed(1));return s;}
function rect(r,rx,at){return '<rect x="'+r[0]+'" y="'+r[1]+'" width="'+r[2]+'" height="'+r[3]+'" rx="'+rx+'" '+(at||'')+'/>';}
function noodle(d,w){w=w||1;return '<path d="'+d+'" stroke="var(--ink)" stroke-width="'+11*w+'" fill="none" stroke-linecap="round"/><path d="'+d+'" stroke="var(--nd)" stroke-width="'+6*w+'" fill="none" stroke-linecap="round"/>';}
function bead(x,y,r,s){s=s||1;return '<ellipse cx="'+x+'" cy="'+y+'" rx="'+9*s+'" ry="'+6.5*s+'" transform="rotate('+r+' '+x+' '+y+')" fill="var(--nd)" stroke="var(--ink)" stroke-width="2.5"/>';}
function tag(x,y,t,col,k){var w=Math.round(t.length*7.1+22);x=Math.min(Math.max(x,w/2+2),358-w/2);return '<g'+(k?' data-k="'+k+'" class="pop"':'')+'><rect x="'+(x-w/2)+'" y="'+(y-13)+'" width="'+w+'" height="26" rx="13" fill="'+(col||'var(--card)')+'" stroke="var(--ink)" stroke-width="2.5"/><text x="'+x+'" y="'+(y+4.5)+'" text-anchor="middle" font-size="13" style="fill:'+(col?'#2E2418':'var(--txt)')+'">'+t+'</text></g>';}
var DEFS='<filter id="czw" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency=".022" numOctaves="2" seed="7"/><feDisplacementMap in="SourceGraphic" scale="3"/></filter>'+
 '<pattern id="czspk" width="16" height="16" patternUnits="userSpaceOnUse"><circle cx="4" cy="5" r="1.4" fill="var(--bone2)"/><circle cx="12" cy="11" r="1.1" fill="var(--bone2)"/><circle cx="10" cy="2.5" r=".9" fill="var(--bone2)"/></pattern>';

/* ===================== SPINE SCENE (posterior view, laminae removed) ===================== */
var SP={body:[[112,18,136,80],[112,142,136,80]],disc:[[110,-8,140,22],[108,102,144,36],[110,226,140,30]],ped:[[118,46],[242,46],[118,170],[242,170]],
 sac:'M152 -6 H208 V262 Q208 288 180 288 Q152 288 152 262 Z'};
var RT={
 l:{top:[200,56,206,60,212,64,222,70,232,76,244,80,262,88,286,98,312,112,342,130],
    hit:function(h){return [198,96,206,100,214,104,218+14*h,116,222+16*h,128,222+10*h,150,226,170,230,186,238,196,262,208,286,220,310,236,342,254];},
    bot:[196,218,204,224,212,230,218,244,224,258,226,276,228,302],beads:[[266,90,24],[266,210,27]]},
 c:{top:[198,2,214,3,230,5,250,8,270,12,300,19,346,29],
    hit:function(h){return [198,117,208,117,216,118,226,120-8*h,238,122-12*h,252,124-6*h,268,128,290,133,316,140,346,150];},
    bot:[198,238,214,239,230,241,250,244,270,247,300,254,346,264],beads:[[272,13,12],[272,129,14],[272,248,12]]}};
function blob(el,h){var c=clamp(h);el.setAttribute('cx',214+7*h);el.setAttribute('rx',3+16*c);el.setAttribute('ry',3+10*c);el.style.opacity=c>.02?1:0;}
function spineSVG(x){
  var g=x.g,R=RT[g],s='<svg class="fig" viewBox="0 -4 360 304" style="max-width:430px;overflow:visible" role="img" aria-label="Posterior view of '+x.d+' with the disc squishing out toward the '+x.r+' root"><defs>'+DEFS+'<clipPath id="czc'+g+'"><rect x="-2" y="-4" width="364" height="304" rx="18"/></clipPath></defs><g clip-path="url(#czc'+g+')"><g filter="url(#czw)">';
  SP.disc.concat(SP.body).forEach(function(r){s+=rect([r[0],r[1]+4,r[2],r[3]],18,'fill="var(--shd)" opacity=".16"');});
  SP.body.forEach(function(r){s+=rect(r,18,'fill="var(--bone)" stroke="var(--ink)" stroke-width="3"')+rect([r[0]+4,r[1]+20,r[2]-8,r[3]-26],12,'fill="url(#czspk)"')+'<rect x="'+(r[0]+12)+'" y="'+(r[1]+9)+'" width="38" height="8" rx="4" fill="#fff" opacity=".6"/>';});
  SP.disc.forEach(function(r,i){s+='<g class="dsc"'+(i===1?' data-k="dsc"':'')+'>'+rect(r,16,'fill="var(--jel)" stroke="var(--ink)" stroke-width="3"')+(i===1?'<ellipse cx="180" cy="120" rx="32" ry="9" fill="var(--jel2)"/><path d="M122 110 Q140 106 160 108" stroke="#fff" stroke-width="3.5" fill="none" stroke-linecap="round" opacity=".8"/>':'')+'</g>';});
  SP.ped.forEach(function(p){s+='<ellipse cx="'+p[0]+'" cy="'+p[1]+'" rx="13" ry="17" fill="var(--bone2)" stroke="var(--ink)" stroke-width="3"/>';});
  s+='<path d="'+SP.sac+'" fill="var(--sac)" stroke="var(--ink)" stroke-width="3"/>';
  if(g==='l'){for(var i=0;i<5;i++){var cx=164+i*8,cd='M'+cx+' -6 C'+(cx+(i%2?3:-3))+' 80 '+(cx+(i%2?-3:3))+' 180 '+(cx+(i-2)*1.5)+' 280';s+='<path d="'+cd+'" stroke="var(--ink)" stroke-width="5" fill="none" opacity=".35" stroke-linecap="round"/><path d="'+cd+'" stroke="var(--nd)" stroke-width="2.6" fill="none" stroke-linecap="round"/>';}}
  else s+='<rect x="163" y="-8" width="34" height="300" rx="17" fill="#FFF3F6" stroke="var(--ink)" stroke-width="2.5" opacity=".95"/><path d="M180 -6 V290" stroke="var(--ink)" stroke-width="1.5" stroke-dasharray="3 5" opacity=".35"/>';
  s+='<ellipse data-k="blob" cy="121" fill="var(--jel2)" stroke="var(--ink)" stroke-width="3"/>';
  s+=noodle(P(R.top))+noodle(P(R.top,1))+noodle(P(R.hit(0),1))+noodle(P(R.bot))+noodle(P(R.bot,1));
  s+='<path data-k="ho" stroke="var(--ink)" stroke-width="11" fill="none" stroke-linecap="round"/><path data-k="hi" stroke="var(--nd)" stroke-width="6" fill="none" stroke-linecap="round"/><path data-k="hh" stroke="var(--ouch)" stroke-width="6" fill="none" stroke-linecap="round"/>';
  var bs=R.beads.concat(R.beads.map(function(b){return [360-b[0],b[1],-b[2]];}));if(g==='l')bs=bs.concat([[94,90,-24],[94,210,-27]]).slice(0,4);
  bs.forEach(function(b){if(!(g==='c'&&b[1]===129&&b[0]>180))s+=bead(b[0],b[1],b[2]);});
  if(g==='c')s+='<g data-k="hb">'+bead(272,129,14)+'</g>';
  s+='</g><g data-k="zap" class="pop"><path d="M252 '+(g==='c'?96:104)+' l9 -7 M256 '+(g==='c'?110:121)+' h11 M252 '+(g==='c'?124:138)+' l9 7" stroke="var(--ouch)" stroke-width="3.5" stroke-linecap="round"/></g>';
  s+=tag(34,58,x.u)+tag(34,182,x.l);
  s+=g==='l'?tag(306,66,x.t+' left above'):tag(296,46,x.t+' left a level up');
  s+=tag(302,g==='c'?170:168,x.r+' pinched!','#FFB3AC','tp')+'</g></svg>';return s;}

/* ===================== LIMB FIGURES ===================== */
var LEG='M20 20 Q62 4 116 30 C114 64 108 108 102 146 C100 158 102 170 100 184 C104 206 102 232 94 262 C92 272 96 280 102 288 C108 296 108 306 100 312 L54 312 C46 308 44 298 50 290 C56 282 58 272 58 262 C52 236 46 208 50 184 C48 170 46 158 46 146 C38 108 22 66 20 20 Z';
function mir(d){return d.replace(/(-?\d+\.?\d*) (-?\d+\.?\d*)/g,function(m,x,y){return +(150-x).toFixed(1)+' '+y;});}
var ZF={antThigh:'<ellipse cx="70" cy="92" rx="32" ry="56"/>',medLeg:'<path d="M86 176 L110 176 L106 292 L92 306 Z"/>',obt:'<ellipse cx="104" cy="98" rx="13" ry="28"/>',lfcn:'<ellipse cx="33" cy="84" rx="14" ry="36"/>',
 web:'<ellipse cx="88" cy="308" rx="6.5" ry="8"/>',sfib:'<path d="M44 222 L80 222 L86 270 L106 294 L102 322 L54 320 L52 272 Z"/>',cfib:'<path d="M40 188 L74 188 L82 268 L106 294 L102 322 L50 320 L50 270 Z"/>',
 sciF:'<path d="M36 176 L88 176 L90 270 L108 294 L106 324 L36 324 Z"/>',l4:'<path d="M80 172 L112 172 L108 290 L94 306 L84 284 Z"/>',l5:'<path d="M44 178 L80 178 L84 262 L108 292 L104 322 L58 320 L54 272 Z"/>',s1:'<path d="M38 282 L62 286 L62 324 L38 324 Z"/>'};
var ZB={sural:'<path d="M84 268 L112 280 L112 326 L84 326 Z"/>',sole:'<path d="M40 300 L112 300 L112 328 L40 328 Z"/>',sciB:'<path d="M58 172 L114 172 L114 328 L58 328 Z"/>'};
var NF={femoral:'M68 34 C70 50 72 62 74 76 M74 76 C66 96 60 118 58 140 M74 76 C78 98 82 120 86 140',saph:'M76 78 C86 110 96 140 98 176 C100 214 96 246 92 270 C94 282 98 292 100 300',obt:'M100 36 C102 60 104 90 100 124',
 lfcn:'M34 24 C34 50 36 80 42 116',cfibF:'M46 184 C50 188 53 192 56 196',sfib:'M56 196 C52 220 54 246 62 266 C68 282 74 294 78 304',dfib:'M56 196 C62 220 68 244 72 266 C76 282 82 296 88 304'};
var NB={sgl:'M62 30 C74 26 88 24 104 28',igl:'M64 44 C76 50 88 54 100 56',sci:'M66 40 C70 70 74 110 76 150',tib:'M76 150 C76 190 74 230 70 268 C68 280 64 290 60 300',cfib:'M76 150 C86 160 94 170 100 184',sural:'M77 166 C80 200 86 240 92 270 C96 282 100 292 104 300'};
function star(x,y,k){return '<g data-k="'+k+'" class="pop" style="opacity:0"><path d="M'+x+' '+(y-11)+' L'+(x+3.5)+' '+(y-3.5)+' L'+(x+11)+' '+y+' L'+(x+3.5)+' '+(y+3.5)+' L'+x+' '+(y+11)+' L'+(x-3.5)+' '+(y+3.5)+' L'+(x-11)+' '+y+' L'+(x-3.5)+' '+(y-3.5)+' Z" fill="var(--ouch)" stroke="var(--ink)" stroke-width="2.2" stroke-linejoin="round"/></g>';}
function legView(back,id){var o=back?mir(LEG):LEG,s='<g filter="url(#czw)"><path d="'+o+'" transform="translate(0 4)" fill="var(--shd)" opacity=".16"/><path d="'+o+'" fill="var(--skin)" stroke="var(--ink)" stroke-width="3"/>';
  if(!back){s+='<ellipse cx="74" cy="162" rx="11" ry="13" fill="var(--skin2)" stroke="var(--ink)" stroke-width="2"/><path d="M32 22 Q66 34 100 32" stroke="var(--ink)" stroke-width="1.8" stroke-dasharray="3 4" fill="none" opacity=".6"/>';
   [[95,313,6.5],[84,315,5],[74,315,4.6],[65,314,4.2],[57,312,3.8]].forEach(function(t){s+='<circle cx="'+t[0]+'" cy="'+t[1]+'" r="'+t[2]+'" fill="var(--skin)" stroke="var(--ink)" stroke-width="2"/>';});}
  else s+='<path d="M40 60 Q76 80 116 62" stroke="var(--ink)" stroke-width="2" fill="none" opacity=".55"/><path d="M76 22 Q78 42 76 62" stroke="var(--ink)" stroke-width="1.5" fill="none" opacity=".3"/><path d="M58 166 Q75 172 92 166" stroke="var(--ink)" stroke-width="2" fill="none" opacity=".5"/><ellipse cx="75" cy="310" rx="22" ry="7" fill="var(--skin2)" stroke="var(--ink)" stroke-width="2"/>';
  s+='</g><clipPath id="'+id+'"><path d="'+o+'"/><ellipse cx="76" cy="314" rx="34" ry="10"/></clipPath>';return s;}
function zones(Z,clip,cls){var s='<g clip-path="url(#'+clip+')" fill="var(--numb)" stroke="var(--numb)" stroke-width="10" stroke-linejoin="round" filter="url(#czw)">';for(var k in Z)s+='<g class="zone" data-z="'+k+'" style="opacity:0">'+Z[k]+'</g>';return s+'</g>';}
function nerves(N,thin){var s='';for(var k in N)s+='<g data-n="'+k+'"><path class="no" d="'+N[k]+'" stroke="var(--ink)" stroke-width="5" fill="none" stroke-linecap="round" opacity=".35"/><path class="ni" d="'+N[k]+'" stroke="var(--nd)" stroke-width="2.6" fill="none" stroke-linecap="round" opacity=".75"/></g>';return s;}
function lightNerves(R,on){$$(R,'[data-n]').forEach(function(g){var hit=on.indexOf(g.dataset.n)>=0,o=g.querySelector('.no'),i=g.querySelector('.ni');o.setAttribute('stroke-width',hit?8:5);o.setAttribute('opacity',hit?1:.35);i.setAttribute('stroke-width',hit?4.4:2.6);i.setAttribute('opacity',hit?1:.75);i.setAttribute('stroke',hit?'var(--ouch)':'var(--nd)');if(hit)g.parentNode.appendChild(g);});}
function lightZones(R,on){$$(R,'[data-z]').forEach(function(z){z.style.opacity=on.indexOf(z.dataset.z)>=0?.62:0;});}
var ARM='M44 14 Q76 2 104 16 C106 50 102 96 100 140 C99 152 100 160 98 172 C96 206 94 234 92 256 L58 256 C56 234 52 206 50 172 C48 160 46 152 44 140 C36 100 32 50 44 14 Z';
var ZA={c5:'<ellipse cx="44" cy="70" rx="13" ry="40"/>',c6:'<path d="M50 170 L66 170 L64 250 L52 250 Z"/><path d="M55 263 C46 272 41 285 39 298" fill="none" stroke-width="8" stroke-linecap="round"/>',c7:'<rect x="69" y="290" width="6" height="38" rx="3"/>',c8:'<path d="M84 198 L96 198 L94 252 L86 252 Z"/><path d="M92 258 L100 258 L100 290 L92 290 Z"/><rect x="93" y="288" width="5" height="25" rx="2.5"/>'};
function armSVG(){var s='<svg class="fig" viewBox="22 0 106 352" style="max-height:280px" role="img" aria-label="Right arm, front view, with the dermatome shaded"><defs>'+DEFS+'</defs><g filter="url(#czw)"><path d="'+ARM+'" transform="translate(0 4)" fill="var(--shd)" opacity=".16"/><path d="'+ARM+'" fill="var(--skin)" stroke="var(--ink)" stroke-width="3"/>'+
  '<rect x="52" y="250" width="52" height="44" rx="16" fill="var(--skin)" stroke="var(--ink)" stroke-width="3"/>';
  [[55,284,10,38],[67,286,10,44],[79,284,10,40],[91,282,9,33]].forEach(function(f){s+='<rect x="'+f[0]+'" y="'+f[1]+'" width="'+f[2]+'" height="'+f[3]+'" rx="'+f[2]/2+'" fill="var(--skin)" stroke="var(--ink)" stroke-width="2.5"/>';});
  s+='<path d="M56 262 C46 272 40 286 38 300" stroke="var(--ink)" stroke-width="15" fill="none" stroke-linecap="round"/><path d="M56 262 C46 272 40 286 38 300" stroke="var(--skin)" stroke-width="9.5" fill="none" stroke-linecap="round"/><path d="M58 170 Q75 176 92 170" stroke="var(--ink)" stroke-width="2" fill="none" opacity=".45"/></g>';
  s+='<g fill="var(--numb)" stroke="var(--numb)" stroke-width="5" stroke-linejoin="round" filter="url(#czw)">';for(var k in ZA)s+='<g class="zone" data-z="'+k+'" style="opacity:0">'+ZA[k]+'</g>';
  return s+'</g><text x="75" y="346" text-anchor="middle" font-size="12" style="fill:var(--mut)">← thumb side</text></svg>';}
function legSVG(){return '<svg class="fig" viewBox="12 0 126 344" style="max-height:280px" role="img" aria-label="Right leg, front view, with the dermatome shaded"><defs>'+DEFS+'</defs>'+legView(false,'czlg1')+zones({l4:ZF.l4,l5:ZF.l5,s1:ZF.s1},'czlg1')+'<text x="76" y="340" text-anchor="middle" font-size="12" style="fill:var(--mut)">big toe →</text></svg>';}

/* ===================== 1. DISC HERNIATION ===================== */
var DISCS=[
 {d:'C4–C5',u:'C4',l:'C5',r:'C5',t:'C4',g:'c',skin:'Lateral shoulder + upper arm',mus:'Deltoid, biceps',ref:'Biceps may drop'},
 {d:'C5–C6',u:'C5',l:'C6',r:'C6',t:'C5',g:'c',skin:'Thumb + lateral forearm',mus:'Wrist extensors, biceps',ref:'Brachioradialis / biceps ↓'},
 {d:'C6–C7',u:'C6',l:'C7',r:'C7',t:'C6',g:'c',skin:'Middle finger',mus:'Triceps',ref:'Triceps ↓'},
 {d:'C7–T1',u:'C7',l:'T1',r:'C8',t:'C7',g:'c',skin:'Little finger + medial forearm',mus:'Finger flexors, hand intrinsics',ref:'None reliable'},
 {d:'L3–L4',u:'L3',l:'L4',r:'L4',t:'L3',g:'l',skin:'Medial leg + medial foot',mus:'Tibialis anterior (dorsiflexion)',ref:'Patellar ↓'},
 {d:'L4–L5',u:'L4',l:'L5',r:'L5',t:'L4',g:'l',skin:'Dorsum of foot + big toe',mus:'Big-toe extension (EHL)',ref:'None lost'},
 {d:'L5–S1',u:'L5',l:'S1',r:'S1',t:'L5',g:'l',skin:'Lateral foot + sole',mus:'Plantarflexion',ref:'Achilles ↓'}];
M.cozy.disc=function(id,o){o=o||{};
  var R=mount(id,'<span class="chip">Squish lab</span><h3>Disc herniation</h3><div class="sub">Pick a disc, squish it, and see which root pays.</div>'+
   '<div class="segs" data-a="reg"><button class="pill rg" data-g="c">Neck</button><button class="pill rg" data-g="l">Low back</button><button class="pill" data-a="quiz" style="margin-left:auto">Quiz me</button></div>'+
   '<div class="segs" data-a="discs"></div><div class="stage" data-a="st"></div>'+
   '<div class="sl"><span>How far out?</span><input type="range" min="0" max="100" value="0" aria-label="How far the disc squishes out"></div>'+
   '<div class="bub" data-a="bub"></div>'+
   '<div class="res"><div class="card" data-a="limb" style="display:flex;align-items:center;justify-content:center"></div><div class="card"><div class="lab" data-a="rl">At risk</div><div class="big" data-a="root"></div><div class="stack"><div class="slot" data-a="s1"></div><div class="slot" data-a="s2"></div><div class="slot" data-a="s3"></div></div></div></div>'+
   '<div class="row"><button class="btn" data-a="go">Squish it!</button><span class="stk">Disc X–Y → root Y</span></div>'+
   '<div class="foot">Spinal cord deck s24–27 · Dr. Roman: “like four questions on the exam”</div>');
  if(!R)return;var st=$(R,'[data-a=st]'),rg=$(R,'input'),ob={h:0},cur=-1,v=0,quiz=null;
  function q(k){return st.querySelector('[data-k='+k+']');}
  function draw(h){var x=DISCS[cur],d=P(RT[x.g].hit(h));['ho','hi','hh'].forEach(function(k){q(k).setAttribute('d',d);});q('hh').style.opacity=clamp(h);blob(q('blob'),h);
    if(q('hb')){q('hb').setAttribute('transform','translate(0 '+(-10*h).toFixed(1)+')');q('hb').querySelector('ellipse').setAttribute('fill',h>.55?'var(--ouch)':'var(--nd)');}
    if(!rg.busy)rg.value=Math.round(clamp(h)*100);var on=h>.55;[q('zap'),q('tp')].forEach(function(g){g.style.opacity=on?1:0;g.style.transform=on?'none':'scale(.4)';});
    if(on!==!!v){v=on?1:0;say();}}
  function say(){var x=DISCS[cur];
    if(!quiz)$(R,'[data-a=bub]').innerHTML=x.g==='c'?(v?'Ouch! <b>'+x.r+'</b> gets pinched. Neck roots leave <b>above</b> their own bone, so the root leaving at '+x.d+' is '+x.r+'.':'In the neck each root leaves <em>above</em> its own vertebra. The root at '+x.d+' is '+x.r+'.'):
      (v?'Ouch! <b>'+x.r+'</b> gets pinched. It’s the noodle that crosses the disc. '+x.t+' already slipped out through the door above.':'Everyone’s comfy. '+x.t+' leaves under its own pedicle, above the disc. '+x.r+' crosses the disc on its way down.');
    $(R,'[data-a=rl]').textContent=v?'Pinched root':'At risk';var rt=$(R,'[data-a=root]');rt.textContent=x.r;rt.style.color=v?'var(--ouch)':'var(--txt)';
    [['s1','Skin',x.skin,'Feels normal'],['s2','Weak',x.mus,'Strong'],['s3','Reflex',x.ref,'Normal']].forEach(function(t){var el=$(R,'[data-a='+t[0]+']'),bad=v&&!(t[0]==='s3'&&/None/.test(x.ref));el.className='slot'+(v?(bad?' bad':' ok'):'');el.innerHTML='<i>'+t[1]+'</i>'+(v?t[2]:t[3]);});
    $$(R,'[data-z]').forEach(function(z){z.style.opacity=v&&z.dataset.z===x.r.toLowerCase()?.62:0;});$(R,'[data-a=go]').textContent=v?'Tuck it back':'Squish it!';}
  function pick(i,auto){var x=DISCS[i],regChanged=cur<0||DISCS[cur].g!==x.g;cur=i;v=0;ob.h=0;cancelAnimationFrame(ob.raf);
    $$(R,'[data-g]').forEach(function(b){b.classList.toggle('on',b.dataset.g===x.g);});
    $(R,'[data-a=discs]').innerHTML=DISCS.map(function(y,j){return y.g===x.g?'<button class="pill'+(j===i?' on':'')+'" data-i="'+j+'">'+y.d+'</button>':'';}).join('');
    st.innerHTML=spineSVG(x);if(regChanged)$(R,'[data-a=limb]').innerHTML=x.g==='c'?armSVG():legSVG();draw(0);say();
    if(auto)setTimeout(function(){if(cur===i)squish(1);},350);}
  function squish(to){jig(q('dsc'));tween(ob,to,to?850:550,to?EZ.back:EZ.ios,draw);}
  function ask(){var i=Math.floor(Math.random()*DISCS.length),x=DISCS[i],pool=shuf(shuf(['C5','C6','C7','C8','L4','L5','S1'].filter(function(r){return r!==x.r;})).slice(0,3).concat([x.r]));
    quiz={i:i};pick(i,false);var b=$(R,'[data-a=bub]');b.innerHTML='<div class="q">Posterolateral herniation at '+x.d+'. Which root gets pinched?</div><div class="segs">'+pool.map(function(r){return '<button class="pill" data-r="'+r+'">'+r+'</button>';}).join('')+'</div>';b.classList.remove('in');void b.offsetWidth;b.classList.add('in');
    $(R,'[data-a=rl]').textContent='Your call';$(R,'[data-a=root]').textContent='?';}
  function answer(btn){var x=DISCS[quiz.i],ok=btn.dataset.r===x.r;$$(R,'[data-r]').forEach(function(p){p.disabled=true;if(p.dataset.r===x.r)p.classList.add('ok');});if(!ok){btn.classList.add('no');shake(btn);}
    var b=$(R,'[data-a=bub]');setTimeout(function(){quiz=null;squish(1);},450);
    setTimeout(function(){b.insertAdjacentHTML('afterbegin','<div style="margin-bottom:6px">'+(ok?'<em style="color:#4D8A3B">Nice!</em> ':'<em>Not quite.</em> ')+'</div>');},900);}
  R.addEventListener('click',function(e){var t;
    if((t=e.target.closest('[data-r]'))&&quiz){answer(t);return;}
    if((t=e.target.closest('[data-g]'))){quiz=null;pick(t.dataset.g==='c'?1:5,true);return;}
    if((t=e.target.closest('[data-i]'))){quiz=null;pick(+t.dataset.i,true);return;}
    if(e.target.closest('[data-a=quiz]')){ask();return;}
    if(e.target.closest('[data-a=go]')){quiz=null;squish(v?0:1);}});
  rg.oninput=function(){rg.busy=1;cancelAnimationFrame(ob.raf);ob.h=rg.value/100;draw(ob.h);rg.busy=0;};
  pick(o.start!=null?o.start:5,true);return R;};

/* ===================== 2. NERVE DETECTIVE (lower limb injuries) ===================== */
var TGC={Thigh:'var(--jel)',Hip:'var(--sac)',Leg:'var(--bone2)',Foot:'var(--leaf)',Vein:'#FFB8C6'};
var INJ=[
 {s:'Hematoma in the femoral triangle after cardiac catheterization',n:'Femoral nerve',tg:'Thigh',w:'Knee extension; patellar reflex drops',f:'Anterior thigh + medial leg (saphenous)',p:'NAV from lateral: the nerve sits outside the femoral sheath.',nf:['femoral','saph'],zf:['antThigh','medLeg'],site:['f',70,40]},
 {s:'Dashboard injury; limb shortened, adducted and medially rotated',n:'Sciatic nerve',tg:'Hip',w:'Hamstrings + everything below the knee; foot drop',f:'Leg and foot except the medial strip',p:'Posterior hip dislocation puts the femoral head right on it.',nb:['sci','tib','cfib','sural'],nf:['cfibF','sfib','dfib'],zf:['sciF'],zb:['sciB'],site:['b',67,46]},
 {s:'Fibular neck fracture, or a tight cast pressing there',n:'Common fibular nerve',tg:'Leg',w:'Dorsiflexion + eversion: foot drop, high-steppage gait',f:'Lateral leg + dorsum of foot',p:'It wraps around the fibular neck, right under the skin.',nb:['cfib'],nf:['cfibF','sfib','dfib'],zf:['cfib'],site:['f',46,188]},
 {s:'Deep laceration on the lateral leg',n:'Superficial fibular nerve',tg:'Leg',w:'Eversion (fibularis longus + brevis)',f:'Distal anterolateral leg + most of the dorsum',p:'Eversion is the action unique to the lateral compartment.',nf:['sfib'],zf:['sfib'],site:['f',55,238]},
 {s:'Ski boot laced too tight over the front of the ankle',n:'Deep fibular nerve',tg:'Foot',w:'Mostly sensory when squeezed here',f:'First dorsal web space only',p:'Cut higher up, it causes foot drop too.',nf:['dfib'],zf:['web'],site:['f',74,274]},
 {s:'Bad IM injection in the buttock; standing on that leg, the opposite side of the pelvis drops',n:'Superior gluteal nerve',tg:'Hip',w:'Abduction + medial rotation (medius, minimus, TFL)',f:'None',p:'Positive Trendelenburg: the pelvis drops on the unaffected side.',nb:['sgl'],site:['b',84,27]},
 {s:'Can’t climb stairs or rise from a chair; walks fine on level ground',n:'Inferior gluteal nerve',tg:'Hip',w:'Hip extension (gluteus maximus)',f:'None',p:'Level walking barely needs gluteus maximus.',nb:['igl'],site:['b',86,54]},
 {s:'After pelvic lymph node surgery she can’t cross her legs',n:'Obturator nerve',tg:'Thigh',w:'Adduction',f:'Upper medial thigh',p:'Knee jerk stays normal; that reflex is femoral.',nf:['obt'],zf:['obt'],site:['f',100,42]},
 {s:'Heavy tool belt; burning over the lateral thigh',n:'Lateral femoral cutaneous nerve',tg:'Thigh',w:'No weakness',f:'Lateral thigh',p:'Meralgia paresthetica.',nf:['lfcn'],zf:['lfcn'],site:['f',33,28]},
 {s:'Great saphenous vein harvested for a bypass graft',n:'Saphenous nerve',tg:'Vein',w:'No weakness',f:'Medial leg + medial border of foot',p:'Vein and nerve travel together, anterior to the medial malleolus.',nf:['saph'],zf:['medLeg'],site:['f',96,222]},
 {s:'Small saphenous vein harvested behind the lateral malleolus',n:'Sural nerve',tg:'Vein',w:'No weakness',f:'Lateral border of the foot',p:'Also the classic nerve-graft and biopsy donor.',nb:['sural'],zb:['sural'],site:['b',94,274]},
 {s:'Compression under the flexor retinaculum (tarsal tunnel)',n:'Tibial nerve',tg:'Foot',w:'Intrinsic foot muscles only',f:'Sole of the foot',p:'Higher up (popliteal fossa) it also stops walking on the toes.',nb:['tib'],zb:['sole'],site:['b',63,282]}];
M.cozy.injury=function(id){
  var svg='<svg class="fig" viewBox="0 0 330 352" style="max-width:440px" role="img" aria-label="Right leg, front and back views, showing the injured nerve, the numb skin and the injury site"><defs>'+DEFS+'</defs>'+
   '<g transform="translate(6 0)">'+legView(false,'czf')+zones(ZF,'czf')+nerves(NF)+star(0,0,'sf')+'</g>'+
   '<g transform="translate(170 0)">'+legView(true,'czb')+zones(ZB,'czb')+nerves(NB)+star(0,0,'sb')+'</g>'+
   tag(82,338,'FRONT')+tag(246,338,'BACK')+'</svg>';
  var R=mount(id,'<span class="chip">Nerve detective</span><h3>Which nerve got hurt?</h3><div class="sub">Pick a case, or let it quiz you. Coral = injured nerve, pink = numb skin.</div>'+
   '<div class="stage">'+svg+'</div><div class="bub" data-a="bub"></div>'+
   '<div class="card" data-a="ans" style="margin-top:14px"></div>'+
   '<div class="row"><button class="btn sm alt" data-a="prev" aria-label="Previous case">←</button><button class="btn sm alt" data-a="next" aria-label="Next case">→</button><button class="btn" data-a="quiz" style="margin-left:auto">Quiz me</button></div>'+
   '<div class="lvl">'+INJ.map(function(x,i){return '<button class="lv" data-i="'+i+'" style="background:'+TGC[x.tg]+'" aria-label="Case '+(i+1)+'">'+(i+1)+'</button>';}).join('')+'</div>'+
   '<div class="keys">'+Object.keys(TGC).map(function(k){return '<span class="key"><i style="background:'+TGC[k]+'"></i>'+k+'</span>';}).join('')+'</div>'+
   '<div class="hd2">Swollen inguinal nodes?</div><div class="two"><div class="slot"><i>Horizontal group</i>Perineum, anal region, genitals, buttock, lower abdominal wall</div><div class="slot"><i>Vertical group</i>Leg and foot (along the great saphenous vein)</div></div>'+
   '<div class="foot">Dr. Roman · lower limb lectures · Must-Know §3a</div>');
  if(!R)return;var cur=0,quiz=null,got={};
  function site(x){['sf','sb'].forEach(function(k){var g=R.querySelector('[data-k='+k+']');var on=(k==='sf')===(x.site[0]==='f');g.style.opacity=on?1:0;g.style.transform=on?'none':'scale(.3)';if(on)g.firstChild.setAttribute('transform','translate('+x.site[1]+' '+x.site[2]+')');});}
  function show(i,verdict){var x=INJ[i];cur=i;quiz=null;$$(R,'.lv').forEach(function(b){b.classList.toggle('on',+b.dataset.i===i);b.classList.toggle('got',!!got[b.dataset.i]);});
    lightNerves(R,(x.nf||[]).concat(x.nb||[]));lightZones(R,(x.zf||[]).concat(x.zb||[]));site(x);
    var b=$(R,'[data-a=bub]');b.innerHTML=(verdict||'')+'<span class="lab">Case '+(i+1)+' · '+x.tg+'</span><div class="q" style="margin-top:4px">'+x.s+'</div>';
    var a=$(R,'[data-a=ans]');a.innerHTML='<div class="lab">The nerve</div><div class="nm" style="color:var(--ouch)">'+x.n+'</div><div class="inv"><div class="slot'+(/No weak/.test(x.w)?' ok':' bad')+'"><i>Weak</i>'+x.w+'</div><div class="slot'+(x.f==='None'?' ok':' bad')+'"><i>Numb</i>'+x.f+'</div></div><div class="slot" style="margin-top:10px;background:#FFF;color:#2E2418;border-style:dashed"><i style="color:#9A7D66">Remember</i>'+x.p+'</div>';
    a.classList.remove('in');void a.offsetWidth;a.classList.add('in');}
  function ask(){var i=Math.floor(Math.random()*INJ.length),x=INJ[i],pool=shuf(shuf(INJ.filter(function(y){return y.n!==x.n;}).map(function(y){return y.n;})).slice(0,3).concat([x.n]));
    quiz={i:i};cur=i;lightNerves(R,[]);lightZones(R,[]);site(x);$$(R,'.lv').forEach(function(b){b.classList.remove('on');});
    $(R,'[data-a=bub]').innerHTML='<span class="lab">Quiz · the star marks the injury</span><div class="q" style="margin-top:4px">'+x.s+'. Which nerve?</div><div class="opts">'+pool.map(function(n){return '<button class="pill" data-n2="'+n+'">'+n+'</button>';}).join('')+'</div>';
    var a=$(R,'[data-a=ans]');a.innerHTML='<div class="lab">The nerve</div><div class="nm">?</div><div class="sub">Answer to reveal the nerve, the weakness and the numb skin.</div>';}
  function answer(btn){var x=INJ[quiz.i],ok=btn.dataset.n2===x.n;$$(R,'[data-n2]').forEach(function(p){p.disabled=true;if(p.dataset.n2===x.n)p.classList.add('ok');});if(!ok){btn.classList.add('no');shake(btn);}else got[quiz.i]=1;
    var i=quiz.i;setTimeout(function(){show(i,'<div style="margin-bottom:6px;font:600 15px Fredoka,sans-serif;color:'+(ok?'#4D8A3B':'var(--ouch)')+'">'+(ok?'Nice! ✦':'Not quite. It’s the '+x.n.toLowerCase()+'.')+'</div>');},650);}
  R.addEventListener('click',function(e){var t;
    if((t=e.target.closest('[data-n2]'))&&quiz){answer(t);return;}
    if((t=e.target.closest('[data-i]'))){show(+t.dataset.i);return;}
    if(e.target.closest('[data-a=prev]')){show((cur+INJ.length-1)%INJ.length);return;}
    if(e.target.closest('[data-a=next]')){show((cur+1)%INJ.length);return;}
    if(e.target.closest('[data-a=quiz]'))ask();});
  show(0);return R;};

M.cozy.v='1.0.0';
})();
