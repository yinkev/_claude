/* _claude cozy anatomy v1.2.0 — "Cozy Anatomy" design system + teaching widgets.
   Chunky outlines, jelly discs, noodle nerves with DRG beads, press-down buttons, sticker labels, inventory tiles.
   <div id="x"></div>
   <script src="https://cdn.jsdelivr.net/gh/yinkev/_claude@<COMMIT>/cards/cozy.js"></script>
   <script>MUA.cozy.disc('x')</script>
   Widgets: disc (herniation → root, with arm/leg dermatome) · injury (lower-limb nerve detective, front/back legs)
            oocyte (egg cell life clock) · week1 (first week + fertilization) · fetal (blood-making site + placental barrier)
            crest (neural crest sorter) · defects (AFP / defect-type sorter) · sort(id,{title,bins,items,tabs?}) any sorter
            review(id,{title,score,meta,topics,groups,next}) mock review · signal (switchboard) · fluid (water shift + Fick) · fixit (504 weak-spot sorter)
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

/* ===================== batch 2: embryology ===================== */
var CSS2=`
.cz{--pink:#FFC9D6;--liver:#C8765A;--chr:#FF8FB1;--blood:#FFB3AC;--fblood:#C4D6FF}
@media (prefers-color-scheme:dark){.cz{--pink:#E6A2B7;--liver:#B8664C;--fblood:#9DB6F0}}
.cz .tk{position:relative;height:22px;margin-top:2px;font:600 11.5px/1 Fredoka,sans-serif;color:var(--mut)}
.cz .tk span{position:absolute;top:4px;transform:translateX(-50%);white-space:nowrap;transition:color .2s}
.cz .tk span:first-child{transform:translateX(-16px)}.cz .tk span:last-child{transform:translateX(calc(-100% + 16px))}
.cz .tk span.on{color:var(--txt)}
.cz .sldr{margin-top:14px}.cz .sldr .top{display:flex;justify-content:space-between;align-items:baseline;font:600 15px/1 Fredoka,sans-serif;margin-bottom:2px}
.cz .sldr .top b{font-weight:600;color:var(--ouch)}
.cz .orgs{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;margin-top:14px}
.cz .org{background:var(--card);border:3px solid var(--ink);border-radius:18px;box-shadow:0 4px 0 var(--shd);padding:8px 6px 8px;text-align:center;font:600 13.5px/1.1 Fredoka,sans-serif;position:relative;opacity:.45;transition:opacity .3s,transform .45s cubic-bezier(.3,1.6,.5,1),background .3s}
.cz .org svg{width:100%;max-width:92px;height:auto;margin:0 auto 4px}
.cz .org.on{opacity:1;background:#FFF1C9;color:#2E2418;transform:translateY(-4px) rotate(-1.5deg)}
.cz .org.on:after{content:"Now!";position:absolute;top:-12px;right:-6px;font:600 12px/1 Fredoka,sans-serif;background:var(--ouch);color:#fff;border:2.5px solid var(--ink);border-radius:999px;padding:5px 9px 4px;transform:rotate(6deg)}
.cz .lyr{display:flex;flex-direction:column;gap:6px;margin-top:8px}
.cz .ly{border:2.5px solid var(--ink);border-radius:12px;padding:7px 10px;font:600 13px/1.1 Fredoka,sans-serif;color:#2E2418;text-align:center;max-height:44px;overflow:hidden;transition:max-height .45s cubic-bezier(.32,.72,0,1),opacity .3s,padding .45s,margin .45s,border-width .2s}
.cz .ly.gone{max-height:0;opacity:0;padding-top:0;padding-bottom:0;margin-top:-6px;border-width:0}
.cz .ly.edge{border-style:dashed;opacity:.85}
.cz .deck{position:relative;margin-top:16px;isolation:isolate}
.cz .deck:before,.cz .deck:after{content:"";position:absolute;inset:0;background:var(--card);border:3px solid var(--ink);border-radius:22px;z-index:-1}
.cz .deck:before{transform:rotate(-3deg) translateY(6px)}.cz .deck:after{transform:rotate(2.5deg) translateY(3px)}
.cz .dcard{background:var(--card);border:3px solid var(--ink);border-radius:22px;box-shadow:0 5px 0 var(--shd);min-height:124px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:18px 16px;gap:6px}
.cz .dcard .w{font:600 25px/1.15 Fredoka,sans-serif;letter-spacing:-.01em}
.cz .bins{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin-top:18px}
.cz .bins .bin:last-child:nth-child(odd){grid-column:1/-1}
.cz .bin{font:600 15px/1.1 Fredoka,sans-serif;color:#2E2418;border:3px solid var(--ink);border-radius:16px;padding:13px 10px 12px;box-shadow:0 4px 0 var(--shd);transition:transform .12s,box-shadow .12s,filter .2s}
.cz .bin:active{transform:translateY(3px);box-shadow:0 1px 0 var(--shd)}.cz .bin:disabled{filter:saturate(.3) opacity(.55)}
.cz .bin.ok{filter:none;background:var(--leaf)!important;transform:translateY(-3px) rotate(-1deg)}.cz .bin.no{filter:none;background:var(--ouch)!important;color:#fff}
.cz .prog{height:16px;border:3px solid var(--ink);border-radius:9px;background:var(--card);overflow:hidden;margin-top:14px;box-shadow:0 2px 0 var(--shd)}
.cz .prog i{display:block;height:100%;background:var(--leaf);border-right:3px solid var(--ink);transition:width .5s cubic-bezier(.3,1.4,.5,1)}
.cz .prog i[style*="width: 0"],.cz .prog i[style*="width:0"]{border-right:0}
.cz .fbk{display:flex;gap:10px;align-items:center;margin-top:16px;background:var(--card);border:3px solid var(--ink);border-radius:18px;padding:10px 12px;box-shadow:0 4px 0 var(--shd);font-size:14px;line-height:1.35}
.cz .fbk .rs{width:30px;height:30px;border-radius:50%;border:2.5px solid var(--ink);display:grid;place-items:center;color:#fff;font:600 16px/1 Fredoka,sans-serif;flex:none}
.cz .fbk .gx{flex:1;min-width:0}.cz .fbk b{font-family:Fredoka,sans-serif;font-weight:600}
.cz .scr{font:600 13px/1 Fredoka,sans-serif;background:var(--card);border:2.5px solid var(--ink);border-radius:999px;padding:6px 11px 5px;box-shadow:0 3px 0 var(--shd);margin-left:auto}
.cz .hrow{display:flex;align-items:center;gap:10px}
.cz .stp{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-top:12px}
.cz .rnd{width:44px;height:44px;border-radius:50%;border:3px solid var(--ink);background:var(--card);box-shadow:0 4px 0 var(--shd);font:600 18px/1 Fredoka,sans-serif;transition:transform .12s,box-shadow .12s}
.cz .rnd:active{transform:translateY(3px);box-shadow:0 1px 0 var(--shd)}
.cz .dots{display:flex;gap:7px}.cz .dots i{width:11px;height:11px;border-radius:50%;border:2.5px solid var(--ink);background:var(--card);transition:background .25s,transform .35s cubic-bezier(.3,1.6,.5,1)}
.cz .dots i.on{background:var(--nd);transform:scale(1.25)}
.cz .res.wk{grid-template-columns:minmax(0,1fr) minmax(0,1fr)}@media (max-width:520px){.cz .res.wk{grid-template-columns:minmax(0,1fr)}}
.cz .num{display:inline-grid;place-items:center;width:28px;height:28px;border-radius:50%;background:var(--nd);border:2.5px solid var(--ink);font:600 14px/1 Fredoka,sans-serif;color:#2E2418;margin-right:8px;vertical-align:middle}`;
function boot2(){boot();if(document.getElementById('cz-css2'))return;var s=document.createElement('style');s.id='cz-css2';s.textContent=CSS2;document.head.appendChild(s);}
function ticks(a){return '<div class="tk">'+a.map(function(t){return '<span style="left:calc(16px + (100% - 32px)*'+t[0]+')">'+t[1]+'</span>';}).join('')+'</div>';}
function onTick(R,i){$$(R,'.tk span').forEach(function(t,j){t.classList.toggle('on',j===i);});}
function cap(x,y,rot,len){len=len||22;return '<g transform="rotate('+rot+' '+x+' '+y+')"><path d="M'+x+' '+(y-len/2)+' V'+(y+len/2)+'" stroke="var(--ink)" stroke-width="9" stroke-linecap="round"/><path d="M'+x+' '+(y-len/2)+' V'+(y+len/2)+'" stroke="var(--chr)" stroke-width="4.6" stroke-linecap="round"/></g>';}
function X(x,y,l){return cap(x,y,28,l)+cap(x,y,-28,l);}

/* ---------- 3. EGG CELL LIFE CLOCK ---------- */
var OO=[
 {w:'Fetal months 3–5',n:'Oogonium',s:'Dividing by mitosis. Numbers peak near 7 million in month 5.',c:'46',dna:'2N',ch:'mit',st:'Dividing',ok:1},
 {w:'Before birth',n:'Primary oocyte',s:'Starts meiosis I, crosses over in pachytene, then stops in <b>diplotene of prophase I</b>.',c:'46',dna:'4N',ch:'tet',st:'Arrest 1 · diplotene'},
 {w:'Birth',n:'Primary oocyte',s:'About 600–800 thousand left, all still paused in diplotene.',c:'46',dna:'4N',ch:'tet',st:'Still paused'},
 {w:'Puberty',n:'Primary oocyte',s:'About 40 thousand left. Each cycle FSH recruits 15–20 follicles; one wins.',c:'46',dna:'4N',ch:'tet',st:'Still paused'},
 {w:'LH surge',n:'Secondary oocyte',s:'The LH surge finishes <b>meiosis I</b> (homologs separate, 1st polar body out) and triggers ovulation.',c:'23',dna:'2N',ch:'dy',pb:1,zona:1,st:'Meiosis I done',ok:1},
 {w:'Ovulated',n:'Secondary oocyte',s:'Stops again in <b>metaphase II</b>, wrapped in zona pellucida and corona radiata, and travels to the ampulla.',c:'23',dna:'2N',ch:'met',pb:1,zona:1,cr:1,st:'Arrest 2 · metaphase II'},
 {w:'Fertilized',n:'Zygote',s:'Sperm entry finishes <b>meiosis II</b> (2nd polar body out). Two pronuclei make a 46-chromosome zygote.',c:'46',dna:'2N',ch:'pro',pb:2,zona:1,st:'Meiosis II done',ok:1}];
function eggSVG(x){var cx=124,cy=114,r=x.ch==='mit'?58:x.zona?64:74,s='<svg class="fig" viewBox="0 0 260 246" style="max-width:300px;overflow:visible" role="img" aria-label="'+x.n+'"><defs>'+DEFS+'</defs><g filter="url(#czw)">';
  if(x.cr){for(var k=0;k<22;k++){var a=k/22*Math.PI*2;s+='<circle cx="'+(cx+Math.cos(a)*104).toFixed(1)+'" cy="'+(cy+Math.sin(a)*104).toFixed(1)+'" r="'+(k%2?8:9.5)+'" fill="var(--bone2)" stroke="var(--ink)" stroke-width="2.2"/>';}
    }if(x.zona)s+='<circle cx="'+cx+'" cy="'+cy+'" r="92" fill="var(--bone)" stroke="var(--ink)" stroke-width="3"/><circle cx="'+cx+'" cy="'+cy+'" r="81" fill="var(--card)" stroke="var(--ink)" stroke-width="2"/>';
  s+='<circle cx="'+cx+'" cy="'+(cy+4)+'" r="'+r+'" fill="var(--shd)" opacity=".14"/><circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" fill="var(--sac)" stroke="var(--ink)" stroke-width="3"/><path d="M'+(cx-r*.62)+' '+(cy-r*.5)+' Q'+(cx-r*.3)+' '+(cy-r*.82)+' '+(cx+r*.05)+' '+(cy-r*.84)+'" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round" opacity=".75"/>';
  if(/tet|mit|dy/.test(x.ch))s+='<circle cx="'+cx+'" cy="'+cy+'" r="34" fill="var(--card)" stroke="var(--ink)" stroke-width="2.5"/>';
  if(x.ch==='tet')s+=X(cx-14,cy-8,20)+X(cx-2,cy-8,20)+X(cx+4,cy+12,20)+X(cx+16,cy+12,20);
  else if(x.ch==='mit')s+=cap(cx-12,cy-3,10,18)+cap(cx,cy+7,-14,18)+cap(cx+12,cy-5,6,18);
  else if(x.ch==='dy')s+=X(cx-10,cy,20)+X(cx+12,cy,20);
  else if(x.ch==='met')s+='<path d="M'+(cx-40)+' '+cy+' Q'+cx+' '+(cy-36)+' '+(cx+40)+' '+cy+' Q'+cx+' '+(cy+36)+' '+(cx-40)+' '+cy+'" stroke="var(--ink)" stroke-width="1.6" fill="none" opacity=".5"/>'+X(cx,cy-9,17)+X(cx,cy+9,17);
  else if(x.ch==='pro')s+='<circle cx="'+(cx-19)+'" cy="'+cy+'" r="17" fill="var(--pink)" stroke="var(--ink)" stroke-width="2.5"/><circle cx="'+(cx+19)+'" cy="'+cy+'" r="17" fill="var(--fblood)" stroke="var(--ink)" stroke-width="2.5"/><text x="'+(cx-19)+'" y="'+(cy+5)+'" text-anchor="middle" font-size="14" style="fill:#2E2418">♀</text><text x="'+(cx+19)+'" y="'+(cy+5)+'" text-anchor="middle" font-size="14" style="fill:#2E2418">♂</text>';
  if(x.pb){s+='<circle cx="174" cy="62" r="9.5" fill="var(--jel)" stroke="var(--ink)" stroke-width="2.5"/>';if(x.pb===2)s+='<circle cx="190" cy="82" r="7" fill="var(--jel)" stroke="var(--ink)" stroke-width="2.5"/>';}
  s+='</g>';if(x.ch==='mit')s+='<path d="M52 114 h-22 m8 -7 l-8 7 8 7 M196 114 h22 m-8 -7 l8 7 -8 7" stroke="var(--ink)" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>';
  if(x.pb)s+='<path d="M182 52 L204 26" stroke="var(--ink)" stroke-width="2" stroke-linecap="round"/>'+tag(214,16,x.pb===2?'2 polar bodies':'polar body');if(x.zona)s+=tag(124,236,x.cr?'zona + corona radiata':'zona pellucida');return s+'</svg>';}
M.cozy.oocyte=function(id){boot2();
  var labs=['Fetal','Prenatal','Birth','Puberty','LH','Ovul.','Zygote'];
  var R=mount(id,'<span class="chip">Egg clock</span><h3>Egg cell life clock</h3><div class="sub">Drag through her whole life. Watch the two pauses.</div>'+
   '<div class="sldr"><input type="range" min="0" max="6" step="1" value="1" aria-label="Life stage">'+ticks(labs.map(function(l,i){return [i/6,l];}))+'</div>'+
   '<div class="segs"><button class="pill" data-w="lh">What if the LH surge is blocked?</button><button class="pill" data-w="nf">What if no sperm arrives?</button></div>'+
   '<div class="stage" data-a="st" style="display:flex;justify-content:center"></div><div class="bub" data-a="bub"></div>'+
   '<div class="inv" style="grid-template-columns:repeat(3,minmax(0,1fr));margin-top:14px"><div class="slot" data-a="c"></div><div class="slot" data-a="d"></div><div class="slot" data-a="z"></div></div>'+
   '<div class="foot">Dr. Shrestha · L03–L05, L10 · practice Q: “block the LH surge → blocks completion of meiosis I”</div>');
  if(!R)return;var sl=$(R,'input');
  function show(i,note,w){var x=OO[i];sl.value=i;onTick(R,i);$$(R,'[data-w]').forEach(function(b){b.classList.toggle('on',b.dataset.w===w);});
    var st=$(R,'[data-a=st]');st.innerHTML=eggSVG(x);jig(st.querySelector('svg'));
    $(R,'[data-a=bub]').innerHTML='<span class="lab">'+x.w+'</span><div class="q" style="margin:3px 0 4px">'+x.n+'</div>'+x.s+(note?'<div class="slot" style="margin-top:10px;background:#FFF;color:#2E2418;border-style:dashed"><i style="color:#9A7D66">What happens</i>'+note+'</div>':'');
    $(R,'[data-a=c]').innerHTML='<i>Chromosomes</i><span style="font:600 22px/1 Fredoka,sans-serif">'+x.c+'</span>';$(R,'[data-a=d]').innerHTML='<i>DNA</i><span style="font:600 22px/1 Fredoka,sans-serif">'+x.dna+'</span>';
    var z=$(R,'[data-a=z]');z.className='slot '+(x.ok?'ok':'bad');z.innerHTML='<i>Status</i>'+x.st;}
  sl.oninput=function(){show(+sl.value);};
  R.addEventListener('click',function(e){var b=e.target.closest('[data-w]');if(!b)return;
    if(b.dataset.w==='lh')show(3,'No LH surge = meiosis I never finishes. The follicle keeps a <b>primary oocyte in diplotene</b>, and there is no ovulation.','lh');
    else show(5,'No fertilization = meiosis II never finishes. The <b>secondary oocyte</b> degenerates within about a day.','nf');});
  show(1);return R;};

/* ---------- 4. FIRST WEEK ---------- */
var WK=[
 {t:'Fertilization',s:'In the ampulla. Two pronuclei, still inside the zona.',k:'zyg'},
 {t:'2-cell stage',s:'Cleavage: more cells, same total size.',k:'c2'},
 {t:'4-cell stage',s:'Still rolling down the tube.',k:'c4'},
 {t:'Morula',s:'About 16 packed cells. Reaches the uterus.',k:'mor'},
 {t:'Blastocyst',s:'A fluid cavity opens: inner cell mass + trophoblast ring.',k:'bla'},
 {t:'Blastocyst hatches',s:'The zona disappears so it can stick.',k:'hat'},
 {t:'Implantation begins',s:'The embryonic pole attaches, usually in the upper uterine body.',k:'imp'},
 {t:'Trophoblast invades',s:'Syncytiotrophoblast digs in and makes hCG; cytotrophoblast keeps dividing.',k:'inv'}];
var FZ=[
 {t:'Capacitation',s:'In the female tract (~7 h) the glycoprotein coat and seminal proteins come off the sperm head.'},
 {t:'Through the corona radiata',s:'Hyaluronidase from the acrosome loosens the follicle cells around the egg.'},
 {t:'Through the zona pellucida',s:'Binding ZP3 fires the acrosome reaction. Acrosin digests a path through the zona.'},
 {t:'Fusion, cortical reaction',s:'The membranes fuse and cortical granules spill into the perivitelline space.'},
 {t:'Zona reaction',s:'Granule enzymes change ZP2/ZP3 so no more sperm can bind: the block to polyspermy. Meiosis II finishes.'}];
function embSVG(k){var s='<svg class="fig" viewBox="14 -8 192 206" style="max-width:250px;overflow:visible" role="img" aria-label="Embryo"><defs>'+DEFS+'</defs><g filter="url(#czw)">',cx=110,cy=94,zona=!/hat|imp|inv/.test(k),down=/imp|inv/.test(k);
  function cell(x,y,r,f){return '<circle cx="'+x+'" cy="'+y+'" r="'+r+'" fill="'+(f||'var(--sac)')+'" stroke="var(--ink)" stroke-width="2.5"/>';}
  if(down){cy=74;s+='<path d="M-6 132 Q22 120 50 132 T106 132 T162 132 T226 132 V204 H-6 Z" fill="var(--pink)" stroke="var(--ink)" stroke-width="3"/>';[30,80,136,186].forEach(function(x){s+='<path d="M'+x+' 150 q-6 12 0 22 q6 10 0 20" stroke="var(--ink)" stroke-width="7" fill="none" stroke-linecap="round" opacity=".8"/><path d="M'+x+' 150 q-6 12 0 22 q6 10 0 20" stroke="#FFE3EA" stroke-width="3.2" fill="none" stroke-linecap="round"/>';});}
  if(zona)s+='<circle cx="'+cx+'" cy="'+cy+'" r="72" fill="none" stroke="var(--ink)" stroke-width="15"/><circle cx="'+cx+'" cy="'+cy+'" r="72" fill="none" stroke="var(--bone)" stroke-width="9"/>';
  if(k==='zyg')s+=cell(cx,cy,58)+cell(cx-17,cy,12,'var(--pink)')+cell(cx+17,cy,12,'var(--fblood)');
  else if(k==='c2')s+=cell(cx-28,cy,29)+cell(cx+28,cy,29);
  else if(k==='c4')s+=cell(cx-24,cy-22,24)+cell(cx+24,cy-22,24)+cell(cx-24,cy+22,24)+cell(cx+24,cy+22,24);
  else if(k==='mor')[[0,-50],[35,-35],[48,0],[35,35],[0,50],[-35,35],[-48,0],[-35,-35],[0,-26],[23,-13],[23,13],[0,26],[-23,13],[-23,-13],[0,0],[12,-2]].forEach(function(p){s+=cell(cx+p[0],cy+p[1],15);});
  else{s+='<circle cx="'+cx+'" cy="'+cy+'" r="54" fill="var(--jel)" opacity=".55"/>';
    for(var q=0;q<18;q++){var a=q/18*Math.PI*2,px=(cx+Math.cos(a)*54).toFixed(1),py=(cy+Math.sin(a)*54).toFixed(1);s+='<ellipse cx="'+px+'" cy="'+py+'" rx="11" ry="7" transform="rotate('+(a*180/Math.PI+90).toFixed(0)+' '+px+' '+py+')" fill="var(--sac)" stroke="var(--ink)" stroke-width="2.2"/>';}
    var iy=cy+(down?30:-30);[[-13,0],[0,-7],[13,0],[-7,10],[7,10],[0,2]].forEach(function(p){s+=cell(cx+p[0],iy+(down?-p[1]:p[1]),8.5,'var(--leaf)');});
    if(k==='inv')[[82,126,74,160],[110,132,108,172],[138,126,148,160]].forEach(function(f){var d='M'+f[0]+' '+f[1]+' Q'+(f[0]-6)+' '+(f[1]+16)+' '+f[2]+' '+f[3];s+='<path d="'+d+'" stroke="var(--ink)" stroke-width="12" fill="none" stroke-linecap="round"/><path d="'+d+'" stroke="var(--bone2)" stroke-width="7" fill="none" stroke-linecap="round"/>';});}
  s+='</g>';if(/bla|hat|imp|inv/.test(k))s+=tag(cx,down?-2:16,'inner cell mass','var(--leaf)')+(k==='bla'?tag(cx,190,'trophoblast ring'):'');if(down)s+=tag(186,186,'endometrium');return s+'</svg>';}
M.cozy.week1=function(id){boot2();
  var P=[[40,70],[92,52],[150,44],[222,52],[300,74],[372,96],[440,108],[486,104]],tp='M20 78 C70 36 150 30 220 46 S340 92 420 104 L500 96';
  var tube='<svg class="fig" viewBox="0 0 520 132" aria-hidden="true"><defs>'+DEFS+'</defs><g filter="url(#czw)"><path d="'+tp+'" fill="none" stroke="var(--ink)" stroke-width="32" stroke-linecap="round"/><path d="'+tp+'" fill="none" stroke="var(--pink)" stroke-width="25" stroke-linecap="round"/>'+
   [[-30],[-10],[12],[34]].map(function(a,i){var ang=(160+a[0])*Math.PI/180,x2=20+Math.cos(ang)*26,y2=78+Math.sin(ang)*26;return '<path d="M20 78 L'+x2.toFixed(1)+' '+y2.toFixed(1)+'" stroke="var(--ink)" stroke-width="11" stroke-linecap="round"/><path d="M20 78 L'+x2.toFixed(1)+' '+y2.toFixed(1)+'" stroke="var(--pink)" stroke-width="5" stroke-linecap="round"/>';}).join('')+
   '<path d="'+tp+'" fill="none" stroke="var(--ink)" stroke-width="2" stroke-dasharray="2 9" stroke-linecap="round" opacity=".35"/></g>'+
   P.map(function(p){return '<circle cx="'+p[0]+'" cy="'+p[1]+'" r="3.5" fill="var(--ink)" opacity=".35"/>';}).join('')+
   '<g data-a="dot" style="transition:transform .6s cubic-bezier(.3,1.5,.5,1)"><circle r="17" fill="var(--nd)" opacity=".45"/><circle r="11" fill="var(--sac)" stroke="var(--ink)" stroke-width="3"/><path d="M-5 -4 Q-2 -7 2 -7" stroke="#fff" stroke-width="2.5" fill="none" stroke-linecap="round"/></g></svg>';
  var R=mount(id,'<div class="hrow"><span class="chip">Week 1</span><span class="scr" data-a="day">Day 0</span></div><h3>First week</h3><div class="sub">Roll from the ampulla to the uterine wall.</div>'+
   '<div class="stage">'+tube+'<div class="hrow" style="justify-content:space-between;font:600 13px/1 Fredoka,sans-serif;color:var(--mut);padding:0 4px 6px"><span>Ampulla</span><span>Isthmus</span><span>Uterus</span></div></div>'+
   '<div class="sldr"><input type="range" min="0" max="7" step="1" value="0" aria-label="Day after fertilization">'+ticks([0,1,2,3,4,5,6,7].map(function(d){return [d/7,'Day '+d];}).map(function(t,i){return [t[0],i%7===0?t[1]:String(i)];}))+'</div>'+
   '<div class="res wk"><div class="card" style="display:grid;align-items:center"><div data-a="emb" style="width:100%"></div></div><div class="card"><div class="lab" data-a="dl"></div><div class="nm" data-a="tt"></div><div data-a="tx" style="font-size:14px"></div><div class="stack" style="margin-top:10px"><div class="slot"><i>Day 3</i>Morula</div><div class="slot"><i>Days 4–5</i>Blastocyst</div><div class="slot"><i>Days 6–7</i>Implants</div></div></div></div>'+
   '<div class="hd2">Fertilization, step by step</div><div class="card" style="margin-top:10px"><div data-a="fz"></div><div class="stp"><button class="rnd" data-f="-1" aria-label="Previous step">‹</button><div class="dots">'+FZ.map(function(){return '<i></i>';}).join('')+'</div><button class="rnd" data-f="1" aria-label="Next step">›</button></div></div>'+
   '<div class="foot">Dr. Shrestha · L10 (“three days… sixteen cell stages”, “implantation six, seven days”) · deck s28</div>');
  if(!R)return;var sl=$(R,'input'),fi=0;
  function show(i){var x=WK[i];sl.value=i;onTick(R,i);$(R,'[data-a=day]').textContent='Day '+i;$(R,'[data-a=dot]').style.transform='translate('+P[i][0]+'px,'+P[i][1]+'px)';
    var e=$(R,'[data-a=emb]');e.innerHTML=embSVG(x.k);jig(e.querySelector('svg'));$(R,'[data-a=dl]').textContent='Day '+i;$(R,'[data-a=tt]').textContent=x.t;$(R,'[data-a=tx]').textContent=x.s;
    $$(R,'.res .slot').forEach(function(s,j){s.className='slot'+((j===0&&i===3)||(j===1&&(i===4||i===5))||(j===2&&i>=6)?' ok':'');});}
  function fz(){var x=FZ[fi],el=$(R,'[data-a=fz]');el.innerHTML='<div class="in"><span class="num">'+(fi+1)+'</span><span style="font:600 17px/1.2 Fredoka,sans-serif;vertical-align:middle">'+x.t+'</span><div style="margin-top:8px;font-size:14.5px">'+x.s+'</div></div>';$$(R,'.dots i').forEach(function(d,j){d.classList.toggle('on',j===fi);});}
  sl.oninput=function(){show(+sl.value);};
  R.addEventListener('click',function(e){var b=e.target.closest('[data-f]');if(b){fi=Math.max(0,Math.min(FZ.length-1,fi+(+b.dataset.f)));fz();}});
  show(0);fz();return R;};

/* ---------- 5. FETAL AGE ---------- */
var ORG={
 ys:'<svg viewBox="0 0 90 90"><g filter="url(#czw)"><path d="M45 62 C45 72 40 78 44 88" stroke="var(--ink)" stroke-width="10" fill="none" stroke-linecap="round"/><path d="M45 62 C45 72 40 78 44 88" stroke="var(--nd)" stroke-width="5" fill="none" stroke-linecap="round"/><circle cx="45" cy="36" r="27" fill="var(--nd)" stroke="var(--ink)" stroke-width="3"/><path d="M29 26 Q35 16 46 15" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round" opacity=".8"/></g></svg>',
 lv:'<svg viewBox="0 0 90 90"><g filter="url(#czw)"><path d="M10 46 C8 26 34 16 62 20 C82 23 88 36 80 50 C72 64 50 72 28 68 C16 65 11 57 10 46 Z" fill="var(--liver)" stroke="var(--ink)" stroke-width="3"/><path d="M50 22 C48 36 46 50 40 66" stroke="var(--ink)" stroke-width="2" fill="none" opacity=".45"/><path d="M20 38 Q26 28 38 26" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round" opacity=".55"/></g></svg>',
 bm:'<svg viewBox="0 0 90 90"><g filter="url(#czw)"><g fill="var(--bone)" stroke="var(--ink)" stroke-width="3"><circle cx="20" cy="34" r="11"/><circle cx="20" cy="56" r="11"/><circle cx="70" cy="34" r="11"/><circle cx="70" cy="56" r="11"/><rect x="18" y="34" width="54" height="22" rx="9"/></g><g fill="var(--bone)"><circle cx="20" cy="34" r="8.5"/><circle cx="20" cy="56" r="8.5"/><circle cx="70" cy="34" r="8.5"/><circle cx="70" cy="56" r="8.5"/><rect x="19" y="36" width="52" height="18" rx="8"/></g><rect x="28" y="40" width="34" height="10" rx="5" fill="var(--ouch)" stroke="var(--ink)" stroke-width="2"/></g></svg>'};
M.cozy.fetal=function(id){boot2();
  var R=mount(id,'<div class="hrow"><span class="chip">Blood factory</span></div><h3>Fetal age</h3><div class="sub">Slide the week. See where blood is made and what a drug must cross.</div>'+
   '<svg width="0" height="0" style="position:absolute"><defs>'+DEFS+'</defs></svg>'+
   '<div class="sldr"><div class="top"><span>Gestational age</span><b data-a="age">Week 20</b></div><input type="range" min="3" max="40" step="1" value="20" aria-label="Gestational week">'+ticks([[0,'3'],[5/37,'8'],[14/37,'17'],[27/37,'30'],[1,'40']])+'</div>'+
   '<div class="orgs"><div class="org" data-o="0">'+ORG.ys+'Yolk sac</div><div class="org" data-o="1">'+ORG.lv+'Liver</div><div class="org" data-o="2">'+ORG.bm+'Bone marrow</div></div>'+
   '<div class="stage"><svg class="fig" data-a="gantt" viewBox="0 0 320 150" style="max-width:520px"></svg></div>'+
   '<div class="res" style="grid-template-columns:minmax(0,1fr) minmax(0,1.3fr)"><div class="card"><div class="lab">Placental barrier</div><div class="big" data-a="nl" style="font-size:40px">2</div><div style="font:600 14px/1.2 Fredoka,sans-serif;color:var(--mut)">layers a drug must cross</div></div>'+
   '<div class="card"><div class="lyr"><div class="ly edge" style="background:var(--blood)">Maternal blood</div><div class="ly" style="background:var(--sac)">Syncytiotrophoblast</div><div class="ly" data-l="c" style="background:#E9DAF7">Cytotrophoblast</div><div class="ly" data-l="t" style="background:var(--jel)">Villous connective tissue</div><div class="ly" style="background:#D6EFF7">Fetal capillary endothelium</div><div class="ly edge" style="background:var(--fblood)">Fetal blood</div></div></div></div>'+
   '<div class="bub" data-a="note"></div>'+
   '<div class="foot">Dr. Shrestha · L17 00:45:54 (yolk sac wk 3–8 → liver months 2–7 → marrow after month 7) · L17 01:27:07 (four layers → two)</div>');
  if(!R)return;var sl=$(R,'input');
  function X(w){return 104+(w-3)/37*204;}
  function bar(y,a,b,col,on){var d='M'+X(a)+' '+y+' H'+X(b);return '<path d="'+d+'" stroke="var(--ink)" stroke-width="15" stroke-linecap="round" opacity="'+(on?1:.3)+'"/><path d="'+d+'" stroke="'+col+'" stroke-width="9" stroke-linecap="round" opacity="'+(on?1:.45)+'"/>';}
  function draw(w){var mo=(w/4.33).toFixed(1),si=w<=8?0:w<=30?1:2,early=w<17;$(R,'[data-a=age]').textContent='Week '+w+' · month '+mo;
    $$(R,'.tk span').forEach(function(t){t.classList.toggle('on',+t.textContent===w);});
    $$(R,'[data-o]').forEach(function(o){o.classList.toggle('on',+o.dataset.o===si);});
    var rows=[['Yolk sac',3,8,'var(--nd)',si===0],['Liver',6,30,'var(--liver)',si===1],['Bone marrow',27,40,'var(--ouch)',si===2],['Spleen',10,28,'var(--mut)',false]],g='';
    rows.forEach(function(r,i){var y=22+i*30;g+='<text x="0" y="'+(y+5)+'" font-size="14" style="fill:var(--'+(r[4]?'txt':'mut')+')">'+r[0]+'</text>'+bar(y,r[1],r[2],r[3],r[4]);});
    g+='<text x="0" y="146" font-size="11.5" style="fill:var(--mut)">Spleen helps, but it’s never the “principal site” answer</text>';
    g+='<path d="M'+X(w)+' 8 V122" stroke="var(--ink)" stroke-width="3" stroke-linecap="round"/><rect x="'+(X(w)-17)+'" y="-6" width="34" height="20" rx="10" fill="var(--nd)" stroke="var(--ink)" stroke-width="2.5"/><text x="'+X(w)+'" y="9" text-anchor="middle" font-size="12" style="fill:#2E2418">'+w+'</text>';
    $(R,'[data-a=gantt]').innerHTML='<g filter="url(#czw)">'+g+'</g>';
    $(R,'[data-a=nl]').textContent=early?'4':'2';$$(R,'[data-l]').forEach(function(l){l.classList.toggle('gone',!early);});
    $(R,'[data-a=note]').innerHTML=si===0?'Weeks 3–8: the <b>yolk sac</b> makes blood. This is also the embryonic period, when organs form.':si===1?'Months 2–7: the <b>liver</b> is the main site. Week 20 is still liver.'+(early?' Before month 4 the barrier has four layers.':' After month 4 the barrier thins to syncytiotrophoblast + fetal endothelium.'):'After month 7 the <b>bone marrow</b> takes over. Survival rises after about 28 weeks (surfactant).';}
  sl.oninput=function(){draw(+sl.value);};draw(20);return R;};

/* ---------- 6–7. SORTERS ---------- */
var BINC=['var(--jel)','var(--sac)','var(--bone2)','var(--leaf)','#FFB8C6'];
M.cozy.sort=function(id,o){boot2();
  var R=mount(id,'<div class="hrow"><span class="chip">'+(o.chip||'Sort it')+'</span><span class="scr" data-a="sc">0 / 0</span></div><h3>'+o.title+'</h3><div class="sub">'+(o.sub||'Tap the right basket.')+'</div>'+
   (o.tabs?'<div class="segs">'+o.tabs.map(function(t,i){return '<button class="pill'+(i?'':' on')+'" data-t="'+i+'">'+t.name+'</button>';}).join('')+'</div>':'')+
   '<div class="prog"><i style="width:0%"></i></div><div class="deck"><div class="dcard" data-a="it"></div></div><div class="bins" data-a="bins"></div><div data-a="fb"></div><div class="foot">'+(o.src||'')+'</div>');
  if(!R)return;var set,deck,k,ok,miss;
  function load(s){set=s;deck=shuf(s.items);k=0;ok=0;miss=[];$(R,'[data-a=bins]').innerHTML=s.bins.map(function(b,i){return '<button class="bin" data-b="'+b.id+'" style="background:'+BINC[i%BINC.length]+'">'+b.name+'</button>';}).join('');next();}
  function next(){$$(R,'.bin').forEach(function(b){b.classList.remove('ok','no');b.disabled=false;});var d=$(R,'[data-a=it]');
    $(R,'.prog i').style.width=(k/deck.length*100)+'%';$(R,'[data-a=sc]').textContent=ok+' / '+deck.length;$(R,'[data-a=fb]').innerHTML='';
    if(k>=deck.length){d.innerHTML='<span class="lab">Round done</span><div class="big" style="margin:2px 0 4px;color:var(--txt)">'+ok+'<span style="font-size:24px;color:var(--mut)"> / '+deck.length+'</span></div>'+(miss.length?'<div class="segs" style="justify-content:center;margin-top:4px">'+miss.map(function(m){return '<span class="pill no" style="box-shadow:none;padding:6px 10px 5px;font-size:12.5px">'+m+'</span>';}).join('')+'</div>':'<div class="q">Clean sweep ✦</div>')+'<button class="btn sm" data-a="again" style="margin-top:12px">Shuffle and go again</button>';$$(R,'.bin').forEach(function(b){b.disabled=true;});return;}
    d.innerHTML='<span class="lab">'+(k+1)+' of '+deck.length+'</span><div class="w in">'+deck[k].n+'</div>';}
  R.addEventListener('click',function(e){var t=e.target.closest('[data-t]');if(t){$$(R,'[data-t]').forEach(function(c){c.classList.toggle('on',c===t);});load(o.tabs[+t.dataset.t]);return;}
    if(e.target.closest('[data-a=again]')){load(set);return;}if(e.target.closest('[data-a=nx]')){k++;next();return;}
    var b=e.target.closest('.bin');if(!b||b.disabled||k>=deck.length)return;var it=deck[k],right=b.dataset.b===it.b;
    $$(R,'.bin').forEach(function(x){x.disabled=true;if(x.dataset.b===it.b)x.classList.add('ok');});if(!right){b.classList.add('no');miss.push(it.n);shake($(R,'.deck'));}else ok++;
    $(R,'[data-a=sc]').textContent=ok+' / '+deck.length;var bn=set.bins.filter(function(x){return x.id===it.b;})[0].name;
    $(R,'[data-a=fb]').innerHTML='<div class="fbk in"><span class="rs" style="background:var(--'+(right?'leaf':'ouch')+')">'+(right?'✓':'✗')+'</span><div class="gx"><b>'+bn+'.</b> '+(it.w||'')+'</div><button class="btn sm" data-a="nx">Next</button></div>';});
  load(o.tabs?o.tabs[0]:o);return R;};
var CREST={bins:[{id:'c',name:'Neural crest'},{id:'t',name:'Neural tube'},{id:'m',name:'Mesoderm'},{id:'e',name:'Endoderm'},{id:'s',name:'Surface ectoderm'}],items:[
 {n:'Schwann cells',b:'c',w:'PNS myelin. In her words: “not oligodendrocytes, the Schwann cells.”'},
 {n:'Oligodendrocytes',b:'t',w:'CNS myelin comes from the neural tube.'},
 {n:'Dorsal root ganglion neurons',b:'c',w:'Every ganglion outside the CNS is crest.'},
 {n:'Sympathetic chain ganglia',b:'c',w:'Autonomic ganglia are crest.'},
 {n:'Melanocytes',b:'c',w:'Pigment cells migrate out from the crest.'},
 {n:'Adrenal medulla',b:'c',w:'Chromaffin cells are modified sympathetic neurons.'},
 {n:'Adrenal cortex',b:'m',w:'Mesoderm. The medulla is crest; the cortex is not.'},
 {n:'Thyroid C cells',b:'c',w:'Parafollicular cells that make calcitonin.'},
 {n:'Thyroid follicular cells',b:'e',w:'The follicles (thyroxine) are endoderm.'},
 {n:'Pia and arachnoid',b:'c',w:'The leptomeninges are crest.'},
 {n:'Dura mater',b:'m',w:'Dura is mesoderm.'},
 {n:'Odontoblasts',b:'c',w:'The dentin-making cells of teeth.'},
 {n:'Spinal cord motor neurons',b:'t',w:'Neurons inside the CNS come from the neural tube.'},
 {n:'Enteric ganglia of the gut',b:'c',w:'The gut’s own nervous system is crest.'},
 {n:'Epidermis',b:'s',w:'Surface ectoderm. Its melanocytes are crest, but the epidermis is not.'},
 {n:'Lens of the eye',b:'s',w:'Surface ectoderm.'}]};
M.cozy.crest=function(id){return M.cozy.sort(id,{chip:'Crest or not?',title:'Neural crest sorter',sub:'Tap where each cell comes from.',bins:CREST.bins,items:CREST.items,src:'Dr. Shrestha · L17 00:03:25 · “in the exam you’ll simply be asked which of the following is a neural crest derivative”'});};
var AFP={name:'AFP high or low',bins:[{id:'h',name:'AFP high ↑'},{id:'l',name:'AFP low ↓'}],items:[
 {n:'Anencephaly',b:'h',w:'Open neural tube defect.'},{n:'Open meningomyelocele',b:'h',w:'Open neural tube defect.'},{n:'Omphalocele',b:'h',w:'Body-wall defect.'},{n:'Gastroschisis',b:'h',w:'Body-wall defect.'},{n:'Bladder exstrophy',b:'h',w:'Open defect.'},{n:'Sacrococcygeal teratoma',b:'h',w:'On her high list.'},{n:'Amniotic band syndrome',b:'h',w:'On her high list.'},{n:'Intestinal atresia',b:'h',w:'On her high list.'},
 {n:'Trisomy 21',b:'l',w:'Chromosomal, so AFP is low.'},{n:'Trisomy 18',b:'l',w:'Chromosomal, so AFP is low.'},{n:'Triploidy',b:'l',w:'Chromosomal, so AFP is low.'},{n:'Sex-chromosome abnormality',b:'l',w:'Chromosomal, so AFP is low.'}]};
var DEF={name:'Defect type',bins:[{id:'ma',name:'Malformation'},{id:'de',name:'Deformation'},{id:'di',name:'Disruption'},{id:'sy',name:'Syndrome'},{id:'as',name:'Association'}],items:[
 {n:'Bilateral renal agenesis',b:'ma',w:'Formed wrong during organogenesis (weeks 3–8).'},
 {n:'Clubfeet from oligohydramnios',b:'de',w:'Normal bones pushed out of shape by compression.'},
 {n:'Fingers amputated by fibrous bands',b:'di',w:'A normal part destroyed by an amniotic band.'},
 {n:'Phocomelia after thalidomide',b:'ma',w:'Limbs formed wrong in the sensitive window.'},
 {n:'Anencephaly',b:'ma',w:'The neural tube failed to close.'},
 {n:'Flattened face from oligohydramnios',b:'de',w:'Compression, not abnormal formation.'},
 {n:'Many defects from one known cause (trisomy 21)',b:'sy',w:'A syndrome has one cause.'},
 {n:'Vertebral, anal, cardiac, TE fistula, renal, limb cluster',b:'as',w:'VACTERL: a non-random cluster with no single cause.'}]};
M.cozy.defects=function(id){return M.cozy.sort(id,{chip:'Sort the defects',title:'AFP and defect types',sub:'Two decks. Switch with the tabs.',tabs:[AFP,DEF],src:'Dr. Shrestha · L18 (AFP 00:49:56 · deformation 00:11:25) · deck s6, s37'});};

/* ===================== batch 3: mock review + physiology/signaling labs ===================== */
var CSS3=`
.cz .rhd{display:grid;grid-template-columns:auto 1fr;gap:14px;align-items:center;margin-top:10px}
.cz .rhd svg{width:104px;height:104px}
.cz .tbr{display:grid;grid-template-columns:minmax(0,1.3fr) minmax(0,1fr) 38px;gap:8px;align-items:center;padding:6px 0;font-size:13.5px;border-top:2px dashed color-mix(in srgb,var(--ink) 18%,transparent)}
.cz .tbr:first-child{border-top:0}.cz .tbr b{font:600 13px/1 Fredoka,sans-serif;text-align:right}
.cz .bar{height:14px;border:2.5px solid var(--ink);border-radius:8px;background:var(--card);overflow:hidden}.cz .bar i{display:block;height:100%;border-right:2.5px solid var(--ink)}
.cz .grp{margin-top:16px}
.cz .gh{display:flex;align-items:center;gap:10px;font:600 17px/1.15 Fredoka,sans-serif}
.cz .cnt{min-width:30px;height:30px;border-radius:50%;border:2.5px solid var(--ink);display:grid;place-items:center;font:600 14px/1 Fredoka,sans-serif;color:#2E2418;box-shadow:0 2px 0 var(--shd);flex:none}
.cz .rule{margin-top:8px;background:#FFF;color:#2E2418;border:2.5px dashed var(--ink);border-radius:14px;padding:9px 12px;font-size:13.5px;line-height:1.4}
.cz .rule b{font-family:Fredoka,sans-serif;font-weight:600}
.cz .rvs{display:flex;flex-direction:column;gap:8px;margin-top:10px}
.cz .rv{width:100%;text-align:left;background:var(--card);border:2.5px solid var(--ink);border-radius:14px;padding:9px 12px;box-shadow:0 3px 0 var(--shd);transition:transform .12s,box-shadow .12s}
.cz .rv:active{transform:translateY(2px);box-shadow:0 1px 0 var(--shd)}
.cz .rv .t1{display:flex;gap:8px;align-items:center;font:600 14.5px/1.2 Fredoka,sans-serif}
.cz .rv .id{font:600 11px/1 Fredoka,sans-serif;background:var(--bg);border:2px solid var(--ink);border-radius:999px;padding:3px 7px 2px;flex:none}
.cz .rv .ch{margin-left:auto;transition:transform .3s cubic-bezier(.32,.72,0,1);flex:none}
.cz .rv.open .ch{transform:rotate(90deg)}
.cz .yk{margin-top:5px;font-size:13px;line-height:1.35}.cz .yk s{color:var(--ouch);text-decoration-thickness:2px}.cz .yk em{font-style:normal;color:#3E8A2E;font-weight:800}
@media (prefers-color-scheme:dark){.cz .yk em{color:#A8E596}}
.cz .fx{display:none;margin-top:8px;padding-top:8px;border-top:2px dashed color-mix(in srgb,var(--ink) 25%,transparent);font-size:13.5px;line-height:1.45}
.cz .rv.open .fx{display:block;animation:czI .35s cubic-bezier(.3,1.5,.5,1) both}
.cz .lanes{display:grid;grid-auto-flow:column;grid-auto-columns:minmax(0,1fr);gap:10px;margin-top:14px}
@media (max-width:560px){.cz .lanes{grid-auto-flow:row}}
.cz .lane{background:var(--card);border:3px solid var(--ink);border-radius:20px;box-shadow:0 4px 0 var(--shd);padding:10px}
.cz .lane h4{margin:0 0 8px;font:600 14px/1 Fredoka,sans-serif;color:var(--mut)}
.cz .node{position:relative;border:2.5px solid var(--ink);border-radius:14px;padding:9px 10px;font:600 14px/1.25 Fredoka,sans-serif;color:#2E2418;box-shadow:0 3px 0 var(--shd);transition:background .3s,transform .4s cubic-bezier(.3,1.6,.5,1)}
.cz .node+.node{margin-top:22px}
.cz .node+.node:before{content:"";position:absolute;left:50%;top:-22px;width:6px;height:17px;margin-left:-3px;background:var(--nd);border:2px solid var(--ink);border-radius:3px}
.cz .node .bd{display:none;position:absolute;right:-6px;top:-12px;font:600 11.5px/1 Fredoka,sans-serif;background:var(--ouch);color:#fff;border:2.5px solid var(--ink);border-radius:999px;padding:4px 8px 3px;transform:rotate(4deg);white-space:nowrap}
.cz .node.hot{background:var(--ouch)!important;color:#fff;animation:czHot 1.2s ease-in-out infinite}.cz .node.hot .bd{display:block}
.cz .node.hot.good{background:var(--leaf)!important;color:#1E3318;animation:none}.cz .node.hot.good .bd{background:#3E8A2E}
.cz .node.off{opacity:.35;filter:saturate(.3)}
@keyframes czHot{0%,100%{transform:none}50%{transform:scale(1.03)}}
.cz .brk{border-style:dashed}
.cz .tanks{display:block;width:100%;max-width:460px;margin:0 auto}
.cz .calc{font:600 15px/1.45 Fredoka,sans-serif}.cz .calc .n{color:var(--ouch)}
.cz .fk{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin-top:12px}
.cz .fk .card{padding:10px}.cz .fk label{display:flex;justify-content:space-between;align-items:center;gap:6px;font-size:13px;margin-top:6px}
.cz .fk input{width:64px;font:600 15px/1 Fredoka,sans-serif;text-align:center;color:var(--txt);background:var(--bg);border:2.5px solid var(--ink);border-radius:10px;padding:6px 4px}
.cz .fk .rt{font:600 22px/1 Fredoka,sans-serif;margin-top:8px}`;
function boot3(){boot2();if(document.getElementById('cz-css3'))return;var s=document.createElement('style');s.id='cz-css3';s.textContent=CSS3;document.head.appendChild(s);}
var CHEV='<svg width="9" height="15" viewBox="0 0 8 14" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M1.5 1.5L6.5 7l-5 5.5"/></svg>';

/* ---------- 8. MOCK REVIEW (data-driven) ---------- */
M.cozy.review=function(id,d){boot3();
  var got=d.score[0],tot=d.score[1],pct=Math.round(got/tot*100),C=2*Math.PI*38,col=pct>=80?'var(--leaf)':pct>=65?'var(--nd)':'var(--ouch)';
  var ring='<svg viewBox="0 0 104 104" role="img" aria-label="'+pct+' percent"><circle cx="52" cy="56" r="38" fill="none" stroke="var(--shd)" stroke-width="18" opacity=".16"/><circle cx="52" cy="52" r="38" fill="none" stroke="var(--ink)" stroke-width="18"/><circle cx="52" cy="52" r="38" fill="none" stroke="var(--card)" stroke-width="12"/>'+
   '<circle cx="52" cy="52" r="38" fill="none" stroke="'+col+'" stroke-width="12" stroke-linecap="round" stroke-dasharray="'+(C*got/tot).toFixed(1)+' '+C.toFixed(1)+'" transform="rotate(-90 52 52)"/><text x="52" y="58" text-anchor="middle" font-size="22" style="fill:var(--txt)">'+pct+'%</text></svg>';
  var tb=(d.topics||[]).map(function(t){var p=t[1]/t[2],c=p>=.8?'var(--leaf)':p>=.5?'var(--nd)':'var(--ouch)';return '<div class="tbr"><span>'+t[0]+'</span><div class="bar"><i style="width:'+Math.max(4,p*100)+'%;background:'+c+'"></i></div><b>'+t[1]+'/'+t[2]+'</b></div>';}).join('');
  var gs=d.groups.map(function(g,gi){return '<div class="grp"><div class="gh"><span class="cnt" style="background:'+(g.color||'var(--nd)')+'">'+g.items.length+'</span>'+g.name+'</div><div class="rule">'+g.rule+'</div><div class="rvs">'+
    g.items.map(function(x,i){return '<button class="rv" data-r="'+gi+'-'+i+'"><div class="t1"><span class="id">'+x.q+'</span>'+x.t+'<span class="ch">'+CHEV+'</span></div><div class="yk"><s>You: '+x.you+'</s> → <em>'+x.key+'</em></div><div class="fx">'+x.fix+'</div></button>';}).join('')+'</div></div>';}).join('');
  var R=mount(id,'<span class="chip">Mock review</span><h3>'+d.title+'</h3><div class="rhd">'+ring+'<div><div style="font:600 30px/1 Fredoka,sans-serif">'+got+' / '+tot+'</div><div class="sub" style="margin-top:6px">'+d.meta+'</div></div></div>'+
   (d.insight?'<div class="bub">'+d.insight+'</div>':'')+(tb?'<div class="hd2">Where the points went</div><div class="card" style="margin-top:10px">'+tb+'</div>':'')+
   '<div class="hd2">Your '+d.groups.reduce(function(a,g){return a+g.items.length;},0)+' misses, by the habit behind them</div><div class="sub" style="margin:2px 2px 0">Tap a miss for the fix.</div>'+gs+
   (d.next?'<div class="bub" style="margin-top:18px">'+d.next+'</div>':'')+'<div class="foot">'+(d.src||'')+'</div>');
  if(!R)return;R.addEventListener('click',function(e){var b=e.target.closest('.rv');if(b)b.classList.toggle('open');});return R;};

/* ---------- 9. SIGNAL SWITCHBOARD ---------- */
var SIG={
 rtk:{n:'Growth factor (RTK)',rule:'<b>γ = Growth factor.</b> RTK → PLC-γ. PI3K puts a phosphate on (PIP2 → PIP3); PTEN takes it off.',lanes:[
   {h:'PLC-γ branch',s:[['Growth factor → RTK dimer, tyrosines phosphorylated','jel'],['PLC-γ','nd'],['PIP2 → IP3 + DAG','sac','ip3'],['IP3 → SER Ca²⁺ channel · DAG → PKC','bone2']]},
   {h:'PI3K branch',s:[['PI3 kinase','nd'],['PIP2 → PIP3 (not IP3!)','sac','pip3'],['Akt → survival, no apoptosis','leaf','akt'],['PTEN: PIP3 → PIP2 (the off switch)','card','pten',1]]},
   {h:'Ras branch',s:[['Ras-GTP (lipid anchor, inner leaflet)','nd','ras'],['MAPK cascade → proliferation','leaf','mapk']]}],
  br:[{id:'pten',t:'Lose PTEN',hot:{pip3:'piles up ↑',akt:'stuck ON'},off:['pten'],m:'An enzyme that’s missing can’t use up its substrate. PTEN’s substrate is <b>PIP3</b>, so PIP3 piles up and Akt never switches off.'},
      {id:'ras',t:'Ras stuck on GTP',hot:{ras:'always ON',mapk:'nonstop'},m:'Mutant Ras can’t hydrolyze GTP, so the MAPK cascade keeps firing. Normal Ras hangs on the <b>inner</b> leaflet by a lipid chain (not GPI).'}]},
 gq:{n:'Gq GPCR',rule:'<b>β = GPCR (Gq).</b> Same reaction as PLC-γ (PIP2 → IP3 + DAG), different receptor.',lanes:[
   {h:'',s:[['Hormone → Gq-coupled receptor','jel'],['Gαq-GTP','nd'],['PLC-β','nd','plc'],['PIP2 → IP3 + DAG','sac','ip3'],['IP3 → SER Ca²⁺ release · DAG → PKC','bone2','ca']]}],
  br:[{id:'plc',t:'Block PLC-β',off:['plc'],hot:{ip3:'none made',ca:'no Ca²⁺ rise'},m:'No PLC-β, no IP3, so the SER never releases Ca²⁺.'}]},
 gs:{n:'Gs GPCR',rule:'<b>Cholera locks Gαs ON</b> (ADP-ribosylation kills its GTPase) → cAMP ↑ → watery diarrhea.',lanes:[
   {h:'',s:[['Hormone → Gs-coupled receptor','jel'],['Gαs-GTP','nd','gs'],['Adenylate cyclase','nd','ac'],['ATP → cAMP','sac','camp'],['PKA → Cl⁻ and water out (gut)','leaf','pka']]}],
  br:[{id:'ctx',t:'Cholera toxin',hot:{gs:'locked ON',ac:'always on',camp:'↑↑↑',pka:'watery diarrhea'},m:'Cholera toxin ADP-ribosylates <b>Gαs</b>: it can’t turn itself off, so adenylate cyclase stays on and cAMP keeps rising.'}]},
 gi:{n:'Gi GPCR',rule:'<b>Pertussis blocks Gαi</b> (the brake) → the brake is gone → cAMP ↑.',lanes:[
   {h:'',s:[['Hormone → Gi-coupled receptor','jel'],['Gαi-GTP','nd','gi'],['Adenylate cyclase inhibited','card','ac',1],['cAMP ↓','sac','camp']]}],
  br:[{id:'ptx',t:'Pertussis toxin',off:['gi','ac'],hot:{camp:'↑ (brake gone)'},m:'Pertussis toxin ADP-ribosylates <b>Gαi</b> so it can’t inhibit adenylate cyclase: cAMP rises. Cholera = Gs stuck on; pertussis = Gi stuck off.'}]},
 no:{n:'Nitric oxide',rule:'<b>Made in the endothelium, received in the smooth muscle.</b> The NO receptor is guanylyl cyclase in the muscle’s cytoplasm.',lanes:[
   {h:'Endothelial cell',s:[['ACh → Gq receptor → Ca²⁺','jel','ach'],['NO synthase makes NO','nd','nos'],['NO diffuses out','sac','no']]},
   {h:'Smooth muscle cell',s:[['NO enters the cytoplasm','sac','no2'],['Guanylyl cyclase (cytoplasm)','nd','gc'],['GTP → cGMP → relaxation','leaf','cg']]}],
  br:[{id:'scr',t:'Scrape off the endothelium',off:['ach','nos','no','no2'],hot:{cg:'no relaxation'},m:'No endothelium, no NO: ACh can’t relax the vessel anymore.'},
      {id:'ntg',t:'Give nitroglycerin',good:1,off:['ach','nos','no'],hot:{no2:'NO donor',gc:'turned on',cg:'relaxes!'},m:'Nitroglycerin releases NO directly into the smooth muscle, so it works even without the endothelium.'}]}};
M.cozy.signal=function(id){boot3();
  var R=mount(id,'<span class="chip">Switchboard</span><h3>Signal switchboard</h3><div class="sub">Pick a receptor, then break something and watch what piles up.</div>'+
   '<div class="segs" data-a="p">'+Object.keys(SIG).map(function(k,i){return '<button class="pill rg'+(i?'':' on')+'" data-p="'+k+'">'+SIG[k].n+'</button>';}).join('')+'</div>'+
   '<div class="rule" data-a="rule" style="margin-top:12px"></div><div class="lanes" data-a="ln"></div><div class="segs" data-a="br" style="margin-top:16px"></div><div class="bub" data-a="m"></div>'+
   '<div class="foot">Dr. Mamata · L22 (PLC-γ, PI3K/PTEN 00:32–00:43) · L23 (Gq/PLC-β 01:02, NO 00:58–01:09) · Cell Signaling deck</div>');
  if(!R)return;var cur='rtk',br=null;
  function draw(){var S=SIG[cur],b=br&&S.br.filter(function(x){return x.id===br;})[0];
    $$(R,'[data-p]').forEach(function(p){p.classList.toggle('on',p.dataset.p===cur);});$(R,'[data-a=rule]').innerHTML=S.rule;
    $(R,'[data-a=ln]').innerHTML=S.lanes.map(function(l){return '<div class="lane in">'+(l.h?'<h4>'+l.h+'</h4>':'')+l.s.map(function(n){var hot=b&&b.hot&&b.hot[n[2]],off=b&&b.off&&b.off.indexOf(n[2])>=0;return '<div class="node'+(n[3]?' brk':'')+(hot?' hot'+(b.good?' good':''):'')+(off?' off':'')+'" style="background:var(--'+n[1]+')">'+n[0]+(hot?'<span class="bd">'+hot+'</span>':'')+'</div>';}).join('')+'</div>';}).join('');
    $(R,'[data-a=br]').innerHTML='<span style="font:600 14px/1 Fredoka,sans-serif;align-self:center">Break it:</span>'+S.br.map(function(x){return '<button class="pill'+(x.id===br?' no':'')+'" data-b="'+x.id+'">'+x.t+'</button>';}).join('')+(br?'<button class="pill" data-b="">Reset</button>':'');
    $(R,'[data-a=m]').innerHTML=b?b.m:'Tap <b>Break it</b> to see which molecule piles up and which switch gets stuck.';}
  R.addEventListener('click',function(e){var t;if((t=e.target.closest('[data-p]'))){cur=t.dataset.p;br=null;draw();return;}if((t=e.target.closest('[data-b]'))){br=t.dataset.b||null;draw();}});
  draw();return R;};

/* ---------- 10. FLUID SHIFT + FICK LAB ---------- */
M.cozy.fluid=function(id){boot3();
  var R=mount(id,'<span class="chip">Water lab</span><h3>Where does the water go?</h3><div class="sub">Two compartments, a membrane only water can cross. Add something and watch.</div>'+
   '<div class="stage"><svg class="tanks" viewBox="0 0 320 214" data-a="tk"></svg></div>'+
   '<div class="segs"><button class="pill" data-x="sol">+300 mOsm solute into E</button><button class="pill" data-x="h2o">+1 L pure water into E</button><button class="pill" data-x="iso">+1 L isotonic saline into E</button><button class="pill rg" data-x="rst">Reset</button></div>'+
   '<div class="card" style="margin-top:14px"><div class="lab">The only math you need</div><div class="calc" data-a="calc" style="margin-top:6px"></div></div>'+
   '<div class="rule">Never average the two osmolarities. <b>Total solute ÷ total water</b> gives the shared osmolarity; each side’s volume = its solute ÷ that number.</div>'+
   '<div class="hd2">Fick’s law: compare two models</div><div class="fk">'+[1,2].map(function(m){return '<div class="card"><div class="lab">Model '+m+'</div><label>Gradient (mmol/L)<input type="number" data-f="c'+m+'" value="'+(m===1?80:20)+'"></label><label>Area (cm²)<input type="number" data-f="a'+m+'" value="'+(m===1?1:2)+'"></label><label>Thickness (µm)<input type="number" data-f="t'+m+'" value="'+(m===1?4:2)+'"></label><div class="rt" data-f="r'+m+'"></div></div>';}).join('')+'</div>'+
   '<div class="bub" data-a="fv"></div><div class="foot">Dr. Gopi · L37 (Fick models 00:32–00:38, carriers 00:40–00:45) · L38 (compartments 00:01–00:18, “put a three star”)</div>');
  if(!R)return;var st,ob={h:1},from,to,msg='';
  function reset(){st={I:{v:2,s:600},E:{v:1,s:300}};from=to=null;msg='Start: I = 2 L, E = 1 L, both at 300 mOsm/L. Pick an action.';paint(st.I.v,st.E.v,null);calc();}
  function eq(){var S=st.I.s+st.E.s,V=st.I.v+st.E.v,x=S/V;return {x:x,I:st.I.s/x,E:st.E.s/x};}
  function tank(x,w,v,s,lab){var h=v/4*150,y=190-h,o=s/v,op=Math.max(.18,Math.min(1,(o-150)/450));return '<rect x="'+x+'" y="'+y.toFixed(1)+'" width="'+w+'" height="'+h.toFixed(1)+'" fill="var(--jel2)" opacity="'+op.toFixed(2)+'"/><path d="M'+x+' '+y.toFixed(1)+' h'+w+'" stroke="var(--ink)" stroke-width="2.5"/>'+
    '<text x="'+(x+w/2)+'" y="'+(y-10).toFixed(1)+'" text-anchor="middle" font-size="13" style="fill:var(--txt)">'+v.toFixed(2).replace(/0$/,'')+' L · '+Math.round(o)+'</text><text x="'+(x+w/2)+'" y="206" text-anchor="middle" font-size="14" style="fill:var(--txt)">'+lab+'</text>';}
  function paint(vi,ve,dir){var s='<defs>'+DEFS+'</defs><g filter="url(#czw)"><rect x="18" y="26" width="284" height="168" rx="14" fill="var(--card)" stroke="var(--ink)" stroke-width="3"/></g>'+tank(22,136,vi,st.I.s,'I (mOsm/L)')+tank(162,136,ve,st.E.s,'E (mOsm/L)')+
    '<path d="M160 30 V192" stroke="var(--ink)" stroke-width="3" stroke-dasharray="6 6"/>';
    if(dir)s+='<g><path d="M'+(dir>0?128:192)+' 80 H'+(dir>0?192:128)+'" stroke="var(--ink)" stroke-width="9" stroke-linecap="round"/><path d="M'+(dir>0?128:192)+' 80 H'+(dir>0?192:128)+'" stroke="var(--nd)" stroke-width="4.5" stroke-linecap="round"/><path d="M'+(dir>0?184:136)+' 71 L'+(dir>0?196:124)+' 80 L'+(dir>0?184:136)+' 89" stroke="var(--ink)" stroke-width="3" fill="var(--nd)" stroke-linejoin="round"/><text x="160" y="66" text-anchor="middle" font-size="12" style="fill:var(--txt)">water</text></g>';
    $(R,'[data-a=tk]').innerHTML=s;}
  function calc(){var e=eq(),S=st.I.s+st.E.s,V=st.I.v+st.E.v;
    $(R,'[data-a=calc]').innerHTML=msg+'<div style="margin-top:8px">Total solute <span class="n">'+S+'</span> ÷ total water <span class="n">'+V+' L</span> = <span class="n">'+Math.round(e.x)+' mOsm/L</span></div><div>I: '+st.I.s+' ÷ '+Math.round(e.x)+' = <span class="n">'+(+e.I.toFixed(2))+' L</span> · E: '+st.E.s+' ÷ '+Math.round(e.x)+' = <span class="n">'+(+e.E.toFixed(2))+' L</span></div>';}
  function act(k){if(k==='rst'){reset();return;}
    if(k==='sol')st.E.s+=300;if(k==='h2o')st.E.v+=1;if(k==='iso'){st.E.v+=1;st.E.s+=300;}
    var oI=st.I.s/st.I.v,oE=st.E.s/st.E.v,e=eq(),dir=Math.abs(oI-oE)<.5?0:(oE>oI?1:-1);
    msg=dir===0?'Both sides still match ('+Math.round(oI)+' mOsm/L), so <b>no water moves</b>. Isotonic fluid just stays in E.':'Right after: I = '+Math.round(oI)+', E = '+Math.round(oE)+' mOsm/L. Water moves <b>'+(dir>0?'from I into E':'from E into I')+'</b>, toward the higher osmolarity.';
    var a={I:st.I.v,E:st.E.v};paint(a.I,a.E,dir);calc();
    setTimeout(function(){ob.h=0;tween(ob,1,1100,EZ.ios,function(h){paint(a.I+(e.I-a.I)*h,a.E+(e.E-a.E)*h,h<.95?dir:0);});st.I.v=e.I;st.E.v=e.E;},700);}
  function fick(){var v={};$$(R,'[data-f]').forEach(function(i){if(i.tagName==='INPUT')v[i.dataset.f]=+i.value||0;});
    var r1=v.a1*v.c1/(v.t1||1),r2=v.a2*v.c2/(v.t2||1);$(R,'[data-f=r1]').textContent='Rate '+(+r1.toFixed(2));$(R,'[data-f=r2]').textContent='Rate '+(+r2.toFixed(2));
    var q=r1&&r2?(r1>r2?r1/r2:r2/r1):0;$(R,'[data-a=fv]').innerHTML='Rate ∝ area × gradient ÷ thickness. Model 1: '+v.a1+' × '+v.c1+' ÷ '+v.t1+' = <b>'+(+r1.toFixed(2))+'</b> · Model 2: '+v.a2+' × '+v.c2+' ÷ '+v.t2+' = <b>'+(+r2.toFixed(2))+'</b> → '+(Math.abs(r1-r2)<1e-9?'<b>same rate</b>.':'Model '+(r1>r2?1:2)+' is <b>'+(+q.toFixed(2))+'×</b> faster.');}
  R.addEventListener('click',function(e){var b=e.target.closest('[data-x]');if(b)act(b.dataset.x);});
  R.addEventListener('input',function(e){if(e.target.dataset.f)fick();});
  reset();fick();return R;};

/* ---------- 11. FIX-IT SORTER (Mock A 504 weak spots) ---------- */
var FIX=[
 {name:'Classify first',bins:[{id:'b',name:'Basal lamina'},{id:'x',name:'External lamina'}],items:[
  {n:'Goblet cell',b:'b',w:'A unicellular gland inside the epithelium: it shares the epithelial basal lamina.'},{n:'Smooth muscle cell',b:'x',w:'Non-epithelial.'},{n:'Endothelial cell',b:'b',w:'Endothelium is a simple squamous epithelium.'},{n:'Schwann cell',b:'x',w:'Non-epithelial.'},
  {n:'Adipocyte',b:'x',w:'Non-epithelial.'},{n:'Mesothelial cell',b:'b',w:'Mesothelium is an epithelium lining cavities.'},{n:'Skeletal muscle fiber',b:'x',w:'Non-epithelial.'},{n:'Kidney tubule cell',b:'b',w:'Epithelium.'}]},
 {name:'Cartilage by site',bins:[{id:'e',name:'Elastic + perichondrium'},{id:'h',name:'Hyaline + perichondrium'},{id:'a',name:'Hyaline, no perichondrium'},{id:'f',name:'Fibrocartilage, no perichondrium'}],items:[
  {n:'Pinna of the ear',b:'e',w:'Elastic always has a perichondrium.'},{n:'Epiglottis',b:'e',w:'Elastic.'},{n:'Femoral head surface',b:'a',w:'Articular cartilage: hyaline, no perichondrium.'},{n:'Costal cartilage',b:'h',w:'Hyaline with perichondrium.'},
  {n:'Tracheal ring',b:'h',w:'Hyaline with perichondrium.'},{n:'Knee meniscus',b:'f',w:'Fibrocartilage.'},{n:'Intervertebral disc (anulus)',b:'f',w:'Fibrocartilage.'},{n:'Pubic symphysis',b:'f',w:'Fibrocartilage.'}]},
 {name:'Junction jobs',bins:[{id:'o',name:'Zonula occludens'},{id:'a',name:'Zonula adherens'},{id:'d',name:'Desmosome'},{id:'h',name:'Hemidesmosome'},{id:'g',name:'Gap junction'}],items:[
  {n:'Seals the space between cells',b:'o',w:'Transport must go through the cells.'},{n:'Occludin, claudin, JAM',b:'o',w:'Tight junction proteins.'},{n:'Contact inhibition',b:'a',w:'E-cadherin belt.'},{n:'E-cadherin + actin belt',b:'a',w:'Zonula adherens.'},
  {n:'Keratin spot weld',b:'d',w:'Macula adherens.'},{n:'Pemphigus vulgaris (desmoglein)',b:'d',w:'Intraepidermal blisters.'},{n:'Bullous pemphigoid (BP180)',b:'h',w:'Subepidermal blisters.'},{n:'Anchors cell to laminin',b:'h',w:'Integrins at the basal surface.'},{n:'Connexons couple cells',b:'g',w:'Electrical and metabolic coupling.'}]},
 {name:'Organelle jobs',bins:[{id:'r',name:'Rough ER'},{id:'g',name:'Golgi'},{id:'s',name:'Smooth ER'},{id:'p',name:'Peroxisome'},{id:'n',name:'Nucleolus'}],items:[
  {n:'N-linked glycosylation (asparagine)',b:'r',w:'Initial glycosylation.'},{n:'O-linked glycosylation (Ser/Thr)',b:'g',w:'Terminal glycosylation.'},{n:'Mannose-6-phosphate tag',b:'g',w:'Sorting lysosomal enzymes.'},{n:'Steroid synthesis',b:'s',w:'With tubular-cristae mitochondria.'},
  {n:'Drug detoxification',b:'s',w:'Hepatocyte SER.'},{n:'Very-long-chain fatty acid oxidation',b:'p',w:'Catalase and oxidases.'},{n:'Bile acid synthesis',b:'p',w:'Peroxisome.'},{n:'rRNA synthesis',b:'n',w:'18S, 28S, 5.8S.'},{n:'Ribosomal subunit assembly',b:'n',w:'rRNA + imported proteins.'}]},
 {name:'Cell-cycle switches',bins:[{id:'g1',name:'G1 brake'},{id:'b2',name:'G2/M brake'},{id:'go',name:'G2/M go'},{id:'p53',name:'DNA-damage (p53) team'}],items:[
  {n:'p16',b:'g1',w:'Inhibits cyclin D–CDK4/6.'},{n:'Rb holding E2F',b:'g1',w:'Hypophosphorylated Rb blocks S phase.'},{n:'Wee1 kinase',b:'b2',w:'Adds the inhibitory phosphate to CDK1.'},{n:'Cdc25C phosphatase',b:'go',w:'Removes the inhibitory phosphate from CDK1.'},
  {n:'p53',b:'p53',w:'Guardian of the genome.'},{n:'p21',b:'p53',w:'CDK inhibitor switched on by p53.'},{n:'MDM2',b:'p53',w:'Ubiquitinates p53 for degradation.'},{n:'ATM kinase',b:'p53',w:'Senses double-strand breaks, activates p53.'}]},
 {name:'Chromosomes & DNA',bins:[{id:'a',name:'46 · 2N'},{id:'b',name:'46 · 4N'},{id:'c',name:'23 · 2N'},{id:'d',name:'23 · N'}],items:[
  {n:'Spermatogonium',b:'a',w:'Diploid stem cell.'},{n:'Primary spermatocyte, end of S',b:'b',w:'Chromatids doubled; count unchanged.'},{n:'Secondary spermatocyte',b:'c',w:'Homologs separated; chromatids still paired.'},{n:'Spermatid',b:'d',w:'After meiosis II.'},
  {n:'Oocyte arrested in diplotene',b:'b',w:'Paused in prophase I.'},{n:'Secondary oocyte at ovulation',b:'c',w:'Paused in metaphase II.'},{n:'Mature sperm',b:'d',w:'Haploid.'}]}];
M.cozy.fixit=function(id){return M.cozy.sort(id,{chip:'Fix-it sorter',title:'Mock A weak spots',sub:'Six decks built from your 504 misses. Switch with the tabs.',tabs:FIX,src:'Dr. Mamata · L04, L05, L09, L13, L17, L18, L31 · Mock A 504 misses'});};

M.cozy.v='1.2.0';
})();
