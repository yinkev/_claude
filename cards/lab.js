/* _claude study lab v2.0.0 — interactive teaching widgets for Claude study sessions (iOS design language).
   Works alone or with card.js / body.js (MUA.lab.disc shows the body map when body.js is loaded).
   <div id="x"></div>
   <script src="https://cdn.jsdelivr.net/gh/yinkev/_claude@<COMMIT>/cards/lab.js"></script>
   <script>MUA.lab.disc('x')</script>
   Widgets: disc · oocyte · week1 · fetal · crest · defects · injury   (MUA.lab.sort for a custom sorter)
   Generic teaching content only. No personal data lives here. */
(function(){
var M=window.MUA=window.MUA||{};M.lab=M.lab||{};if(M.lab.v)return;
var DK='--bg:#1C1C1E;--cell:#2C2C2E;--cell2:#3A3A3C;--label:#FFFFFF;--label2:rgba(235,235,245,.6);--label3:rgba(235,235,245,.3);--sep:rgba(84,84,88,.6);--fill:rgba(118,118,128,.24);--fill2:rgba(118,118,128,.36);--blue:#0A84FF;--green:#30D158;--orange:#FF9F0A;--red:#FF453A;--purple:#BF5AF2;--indigo:#5E5CE6;--teal:#40C8E0;--pink:#FF375F;--brown:#AC8E68;--segsel:#636366;--shadow:none;--thumb:0 0 0 .5px rgba(0,0,0,.1),0 3px 8px rgba(0,0,0,.35)';
var CSS=`
.mlab{--bg:#F2F2F7;--cell:#FFFFFF;--cell2:#F7F7FA;--label:#000000;--label2:rgba(60,60,67,.6);--label3:rgba(60,60,67,.32);--sep:rgba(60,60,67,.16);--fill:rgba(118,118,128,.12);--fill2:rgba(118,118,128,.22);--blue:#007AFF;--green:#34C759;--orange:#FF9500;--red:#FF3B30;--purple:#AF52DE;--indigo:#5856D6;--teal:#30B0C7;--pink:#FF2D55;--brown:#A2845E;--segsel:#FFFFFF;--shadow:0 .5px 1px rgba(0,0,0,.05),0 6px 18px rgba(0,0,0,.05);--thumb:0 0 0 .5px rgba(0,0,0,.04),0 3px 8px rgba(0,0,0,.15),0 3px 1px rgba(0,0,0,.06);
--f:-apple-system,BlinkMacSystemFont,"SF Pro Text","SF Pro Display","Helvetica Neue",system-ui,sans-serif;--fr:ui-rounded,"SF Pro Rounded",-apple-system,BlinkMacSystemFont,system-ui,sans-serif;--ez:cubic-bezier(.32,.72,0,1);
display:block;font:15px/1.45 var(--f);color:var(--label);-webkit-font-smoothing:antialiased;letter-spacing:-.005em;-webkit-tap-highlight-color:transparent}
@media (prefers-color-scheme:dark){:root:not([data-mode]) .mlab{${DK}}}
[data-mode="dark"] .mlab{${DK}}
.mlab *{box-sizing:border-box}.mlab button{font:inherit;color:inherit;border:0;background:none;cursor:pointer;padding:0}
.mlab button:focus-visible{outline:2px solid var(--blue);outline-offset:2px;border-radius:10px}
.mlab .shell{background:var(--bg);border-radius:26px;padding:18px 16px 14px;display:flex;flex-direction:column;gap:14px}
.mlab .top{display:flex;align-items:center;gap:12px}
.mlab .ico{width:38px;height:38px;border-radius:11px;display:grid;place-items:center;color:#fff;flex:none}
.mlab .ico svg{width:21px;height:21px}
.mlab .grow{flex:1;min-width:0}
.mlab .tt{font-size:17px;font-weight:600;letter-spacing:-.022em;line-height:1.2}
.mlab .st{font-size:13px;color:var(--label2);margin-top:2px;line-height:1.3}
.mlab .pbtn{display:inline-flex;align-items:center;gap:6px;height:32px;padding:0 13px;border-radius:16px;background:color-mix(in srgb,var(--blue) 13%,transparent);color:var(--blue);font-weight:600;font-size:14px;flex:none;transition:transform .2s var(--ez),background .2s}
.mlab .pbtn:active{transform:scale(.95)}.mlab .pbtn svg{width:15px;height:15px}
.mlab .cell{background:var(--cell);border-radius:18px;padding:14px;box-shadow:var(--shadow)}
.mlab .hdr{font-size:13px;color:var(--label2);text-transform:uppercase;letter-spacing:.02em;margin:0 4px -6px}
.mlab .seg{display:grid;grid-auto-flow:column;grid-auto-columns:minmax(0,1fr);background:var(--fill);border-radius:10px;padding:2px;gap:2px}
.mlab .seg button{height:32px;border-radius:8px;font-size:13.5px;font-weight:500;letter-spacing:-.01em;transition:background .28s var(--ez),box-shadow .28s var(--ez);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.mlab .seg button.on{background:var(--segsel);box-shadow:0 3px 8px rgba(0,0,0,.12),0 3px 1px rgba(0,0,0,.04);font-weight:600}
.mlab .stack{display:flex;flex-direction:column;gap:10px}
.mlab .eb{font-size:12px;font-weight:600;color:var(--label2);letter-spacing:.01em}
.mlab .num{font-family:var(--fr);font-size:44px;font-weight:600;letter-spacing:-.025em;line-height:1}
.mlab .h2{font-size:22px;font-weight:700;letter-spacing:-.025em;line-height:1.15}
.mlab .body{font-size:15px;line-height:1.45;color:var(--label)}
.mlab .rl{display:flex;flex-direction:column}
.mlab .rw{display:flex;gap:12px;align-items:baseline;padding:10px 0;border-top:.5px solid var(--sep)}
.mlab .rw:first-child{border-top:0;padding-top:4px}
.mlab .rw .k{color:var(--label2);width:84px;flex:none;font-size:14px}.mlab .rw .v{font-size:15px;min-width:0}
.mlab .pill{display:inline-flex;align-items:center;gap:5px;height:24px;padding:0 10px;border-radius:12px;font-size:12px;font-weight:600;letter-spacing:.01em;white-space:nowrap}
.mlab .pill svg{width:12px;height:12px}
.mlab .t-blue{background:color-mix(in srgb,var(--blue) 14%,transparent);color:var(--blue)}
.mlab .t-green{background:color-mix(in srgb,var(--green) 16%,transparent);color:color-mix(in srgb,var(--green) 80%,var(--label))}
.mlab .t-red{background:color-mix(in srgb,var(--red) 14%,transparent);color:var(--red)}
.mlab .t-orange{background:color-mix(in srgb,var(--orange) 16%,transparent);color:color-mix(in srgb,var(--orange) 82%,var(--label))}
.mlab .t-purple{background:color-mix(in srgb,var(--purple) 14%,transparent);color:var(--purple)}
.mlab .t-indigo{background:color-mix(in srgb,var(--indigo) 14%,transparent);color:var(--indigo)}
.mlab .t-teal{background:color-mix(in srgb,var(--teal) 16%,transparent);color:color-mix(in srgb,var(--teal) 80%,var(--label))}
.mlab .note{display:flex;gap:10px;font-size:14px;line-height:1.5;padding:12px 14px;border-radius:16px;background:color-mix(in srgb,var(--indigo) 9%,var(--cell))}
.mlab .note svg{width:18px;height:18px;flex:none;color:var(--indigo);margin-top:1px}
.mlab .lrule{display:flex;align-items:center;gap:12px;padding:13px 14px;border-radius:18px;background:var(--cell);box-shadow:var(--shadow)}
.mlab .lrule .ico{width:30px;height:30px;border-radius:9px}.mlab .lrule .ico svg{width:17px;height:17px}
.mlab .lrule b{font-weight:600;font-size:15px;letter-spacing:-.015em}.mlab .lrule span{display:block;font-size:13px;color:var(--label2)}
.mlab .foot{font-size:11px;color:var(--label3);text-align:center;line-height:1.4;padding:0 8px}
.mlab .two{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:14px;align-items:center}
@media (max-width:560px){.mlab .two{grid-template-columns:minmax(0,1fr)}}
.mlab svg{display:block;max-width:100%}.mlab svg.lfig{width:100%;height:auto}
.mlab svg text{font-family:var(--f);fill:var(--label)}
.mlab .in{animation:mlIn .45s var(--ez) both}
@keyframes mlIn{from{opacity:0;transform:translateY(6px) scale(.985)}to{opacity:1;transform:none}}
@keyframes mlShake{0%,100%{transform:none}20%{transform:translateX(-7px)}40%{transform:translateX(6px)}60%{transform:translateX(-4px)}80%{transform:translateX(2px)}}
.mlab input[type=range]{-webkit-appearance:none;appearance:none;width:100%;height:30px;background:transparent;margin:0;--p:50%}
.mlab input[type=range]::-webkit-slider-runnable-track{height:4px;border-radius:2px;background:linear-gradient(90deg,var(--blue) var(--p),var(--fill2) var(--p))}
.mlab input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:28px;height:28px;border-radius:50%;background:#fff;box-shadow:var(--thumb);margin-top:-12px;transition:transform .2s var(--ez)}
.mlab input[type=range]:active::-webkit-slider-thumb{transform:scale(1.08)}
.mlab input[type=range]::-moz-range-track{height:4px;border-radius:2px;background:var(--fill2)}
.mlab input[type=range]::-moz-range-progress{height:4px;border-radius:2px;background:var(--blue)}
.mlab input[type=range]::-moz-range-thumb{width:28px;height:28px;border:0;border-radius:50%;background:#fff;box-shadow:var(--thumb)}
.mlab .aticks{position:relative;height:18px;margin-top:4px;font-size:11px;color:var(--label3);font-variant-numeric:tabular-nums}.mlab .aticks span{position:absolute;top:0;transform:translateX(-50%);white-space:nowrap;transition:color .25s}.mlab .aticks span:first-child{transform:translateX(-14px)}.mlab .aticks span:last-child{transform:translateX(calc(-100% + 14px))}.mlab .aticks span.on{color:var(--blue);font-weight:600}
.mlab .glist .cell.inl{margin:2px 10px 10px;box-shadow:none;background:var(--cell2)}
.mlab .fc{max-width:280px;width:100%;margin:0 auto}.mlab .rl.wide .k{width:104px}
.mlab .bin:last-child:nth-child(odd){grid-column:1/-1}
.mlab .vrow{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:6px}.mlab .vrow b{font-size:17px;font-weight:600;letter-spacing:-.02em;font-variant-numeric:tabular-nums}.mlab .vrow span{font-size:13px;color:var(--label2)}
.mlab .disc{display:flex;align-items:center;gap:12px;width:100%;padding:12px 2px 2px;border-top:.5px solid var(--sep);font-size:15px;color:var(--blue);font-weight:500}.mlab .disc .ch{margin-left:auto;color:var(--label3);transition:transform .3s var(--ez)}.mlab .disc.open .ch{transform:rotate(90deg)}.mlab .disc .ch svg{width:8px;height:14px;display:block}
.mlab .ticks{display:grid;font-size:11px;color:var(--label3);text-align:center;margin-top:2px;font-variant-numeric:tabular-nums}
.mlab .ticks span{min-width:0;line-height:1.2;transition:color .25s}.mlab .ticks span.on{color:var(--blue);font-weight:600}
.mlab .dots{display:flex;gap:7px;justify-content:center}.mlab .dots i{width:7px;height:7px;border-radius:50%;background:var(--fill2);transition:background .3s,width .3s var(--ez)}
.mlab .dots i.on{background:var(--label);width:18px;border-radius:4px}
.mlab .nav{display:flex;align-items:center;justify-content:space-between;gap:10px}
.mlab .cbtn{width:36px;height:36px;border-radius:50%;background:var(--fill);display:grid;place-items:center;transition:transform .2s var(--ez)}
.mlab .cbtn:active{transform:scale(.92)}.mlab .cbtn svg{width:16px;height:16px}
.mlab .glist{background:var(--cell);border-radius:18px;overflow:hidden;box-shadow:var(--shadow)}
.mlab .li{display:flex;align-items:center;gap:12px;width:100%;text-align:left;padding:10px 14px;position:relative;transition:background .2s}
.mlab .li+.li::before{content:"";position:absolute;left:54px;right:0;top:0;border-top:.5px solid var(--sep)}
.mlab .li:active{background:var(--fill)}.mlab .li.on{background:color-mix(in srgb,var(--blue) 10%,transparent)}
.mlab .li .tl{width:28px;height:28px;border-radius:8px;display:grid;place-items:center;color:#fff;flex:none;font-size:12px;font-weight:700}
.mlab .li .tx{flex:1;min-width:0;font-size:14.5px;line-height:1.3}
.mlab .li .ch{color:var(--label3);flex:none}.mlab .li .ch svg{width:8px;height:14px}
.mlab .deck{background:var(--cell);border-radius:22px;box-shadow:var(--shadow);min-height:118px;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:20px;text-align:center;gap:6px}
.mlab .deck .w{font-size:23px;font-weight:700;letter-spacing:-.025em;line-height:1.2}
.mlab .deck.no{animation:mlShake .45s var(--ez)}
.mlab .bins{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:8px}
.mlab .bin{display:flex;align-items:center;gap:8px;justify-content:center;min-height:46px;padding:8px 10px;border-radius:14px;background:var(--cell);box-shadow:var(--shadow);font-size:14px;font-weight:600;letter-spacing:-.01em;white-space:nowrap;transition:transform .2s var(--ez),background .25s,color .25s}
.mlab .bin:active{transform:scale(.96)}.mlab .bin i{width:9px;height:9px;border-radius:50%;flex:none}
.mlab .bin.ok{background:var(--green);color:#fff}.mlab .bin.no{background:var(--red);color:#fff}.mlab .bin.ok i,.mlab .bin.no i{background:#fff!important}
.mlab .prog{height:4px;border-radius:2px;background:var(--fill);overflow:hidden}.mlab .prog i{display:block;height:100%;background:var(--blue);border-radius:2px;transition:width .5s var(--ez)}
.mlab .fb{display:flex;align-items:center;gap:10px;padding:12px 14px;border-radius:16px;background:var(--cell);box-shadow:var(--shadow);font-size:14px;line-height:1.4}
.mlab .fb .rs{width:26px;height:26px;border-radius:50%;display:grid;place-items:center;color:#fff;flex:none}.mlab .fb .rs svg{width:14px;height:14px}
.mlab .fb .gx{flex:1;min-width:0}
.mlab .chips{display:flex;flex-wrap:wrap;gap:8px}
.mlab .chip{height:36px;padding:0 14px;border-radius:18px;background:var(--cell);box-shadow:var(--shadow);font-weight:600;font-size:14px;transition:transform .2s var(--ez)}
.mlab .chip:active{transform:scale(.95)}
@media (prefers-reduced-motion:reduce){.mlab *{animation:none!important;transition:none!important}}
`;
var I={
 spine:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="7" y="2.5" width="10" height="4.5" rx="1.6"/><rect x="7" y="9.75" width="10" height="4.5" rx="1.6"/><rect x="7" y="17" width="10" height="4.5" rx="1.6"/><path d="M17 12h4"/></svg>',
 egg:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3.6"/></svg>',
 cal:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><rect x="3.5" y="5" width="17" height="15.5" rx="3"/><path d="M3.5 10h17M8 3v4M16 3v4"/></svg>',
 wave:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M3 12h3l2-6 4 12 3-9 2 3h4"/></svg>',
 spark:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/><path d="M19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z"/></svg>',
 split:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><rect x="3.5" y="4" width="7" height="16" rx="2.2"/><rect x="13.5" y="4" width="7" height="16" rx="2.2"/></svg>',
 bolt:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M13 2.5L4.5 13.5H12L11 21.5l8.5-11H12z"/></svg>',
 dice:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="4"/><circle cx="9" cy="9" r="1" fill="currentColor"/><circle cx="15" cy="15" r="1" fill="currentColor"/><circle cx="15" cy="9" r="1" fill="currentColor"/><circle cx="9" cy="15" r="1" fill="currentColor"/></svg>',
 info:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/></svg>',
 check:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
 x:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M6.5 6.5l11 11M17.5 6.5l-11 11"/></svg>',
 l:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>',
 r:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg>',
 chev:'<svg viewBox="0 0 8 14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1.5 1.5L6.5 7l-5 5.5"/></svg>',
 shuffle:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7h3.5c4 0 5 10 9 10H21M18 14l3 3-3 3M3 17h3.5c1.4 0 2.4-1.2 3.3-2.8M13.4 9.8C14.3 8.2 15.3 7 16.5 7H21M18 4l3 3-3 3"/></svg>'};
function css(){if(document.getElementById('mlab-css2'))return;var s=document.createElement('style');s.id='mlab-css2';s.textContent=CSS;document.head.appendChild(s);}
function mk(id,h){css();var H=typeof id==='string'?document.getElementById(id):id;if(!H)return null;var R=document.createElement('div');R.className='mlab';R.innerHTML='<div class="shell">'+h+'</div>';H.appendChild(R);return R;}
function $(R,s){return R.querySelector(s);}function $$(R,s){return Array.prototype.slice.call(R.querySelectorAll(s));}
function shuf(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=a[i];a[i]=a[j];a[j]=t;}return a;}
function top(icon,color,t,s,btn){return '<div class="top"><div class="ico" style="background:var(--'+color+')">'+I[icon]+'</div><div class="grow"><div class="tt">'+t+'</div><div class="st">'+s+'</div></div>'+(btn||'')+'</div>';}
function pulse(el){if(!el)return;el.classList.remove('in');void el.offsetWidth;el.classList.add('in');}
function fillRange(r){var p=(r.value-r.min)/(r.max-r.min)*100;r.style.setProperty('--p',p+'%');}
function ticks(a){return '<div class="aticks">'+a.map(function(t){return '<span style="left:calc(14px + (100% - 28px)*'+t[0]+')">'+t[1]+'</span>';}).join('')+'</div>';}
function tint(c,p){return 'color-mix(in srgb,var(--'+c+') '+p+'%,transparent)';}
function tag(x,y,txt,c,anchor){var w=txt.length*6.6+18,x0=anchor==='end'?x-w:anchor==='middle'?x-w/2:x;return '<rect x="'+x0+'" y="'+(y-11)+'" width="'+w+'" height="22" rx="11" fill="'+tint(c,16)+'"/><text x="'+(x0+w/2)+'" y="'+(y+4)+'" text-anchor="middle" font-size="11.5" font-weight="600" style="fill:var(--'+c+')">'+txt+'</text>';}

/* ============ 1. DISC HERNIATION SIMULATOR ============ */
var DISCS=[
 {d:'C4–C5',r:'C5',g:'c',skin:'Lateral shoulder, upper arm',mus:'Deltoid, biceps',ref:'Biceps may drop'},
 {d:'C5–C6',r:'C6',g:'c',skin:'Thumb, lateral forearm',mus:'Wrist extensors, biceps',ref:'Brachioradialis / biceps ↓'},
 {d:'C6–C7',r:'C7',g:'c',skin:'Middle finger',mus:'Triceps',ref:'Triceps ↓'},
 {d:'C7–T1',r:'C8',g:'c',skin:'Little finger, medial forearm',mus:'Finger flexors, hand intrinsics',ref:'None reliable'},
 {d:'L3–L4',r:'L4',g:'l',skin:'Medial leg, medial foot',mus:'Tibialis anterior (dorsiflexion)',ref:'Patellar ↓'},
 {d:'L4–L5',r:'L5',g:'l',skin:'Dorsum of foot, big toe',mus:'Big-toe extension (EHL)',ref:'No change'},
 {d:'L5–S1',r:'S1',g:'l',skin:'Lateral foot, sole',mus:'Plantarflexion',ref:'Achilles ↓'}];
function discSVG(x){
  var up=x.d.split('–')[0],lo=x.d.split('–')[1],c=x.g==='c',bone='color-mix(in srgb,var(--brown) 16%,var(--cell))',boneS='color-mix(in srgb,var(--brown) 45%,var(--cell))';
  var s='<svg class="lfig" viewBox="0 0 330 236" role="img" aria-label="Side view: '+x.d+' disc bulging into the '+x.r+' root">';
  function vb(y,n){return '<rect x="28" y="'+y+'" width="136" height="64" rx="16" fill="'+bone+'" stroke="'+boneS+'" stroke-width="1.2"/><rect x="36" y="'+(y+6)+'" width="120" height="14" rx="7" fill="#fff" opacity=".22"/><text x="96" y="'+(y+39)+'" text-anchor="middle" font-size="17" font-weight="700" letter-spacing="-.3">'+n+'</text>';}
  s+=vb(16,up)+vb(154,lo);
  s+='<rect x="32" y="88" width="128" height="58" rx="24" fill="'+tint('indigo',14)+'" stroke="'+tint('indigo',45)+'" stroke-width="1.2"/><ellipse cx="92" cy="117" rx="30" ry="12" fill="'+tint('indigo',32)+'"/><text x="92" y="121" text-anchor="middle" font-size="10.5" font-weight="600" style="fill:var(--indigo)">nucleus</text>';
  s+='<path fill="'+tint('red',55)+'"><animate attributeName="d" dur="2s" repeatCount="indefinite" calcMode="spline" keySplines=".42 0 .58 1;.42 0 .58 1" values="M158 98 C176 104 176 130 158 136 Z;M158 98 C190 106 190 128 158 136 Z;M158 98 C176 104 176 130 158 136 Z"/></path>';
  s+='<rect x="190" y="8" width="30" height="220" rx="15" fill="'+tint('teal',8)+'" stroke="'+tint('teal',40)+'" stroke-dasharray="3 4"/><text x="205" y="232" text-anchor="middle" font-size="10" style="fill:var(--label2)">canal</text>';
  var hitX=c?196:210,hitY=117;
  if(c){s+='<path d="M205 117 C236 117 262 118 318 120" stroke="var(--red)" stroke-width="6" fill="none" stroke-linecap="round"/>';
    s+=tag(326,96,x.r+' compressed','red','end')+'<text x="326" y="146" text-anchor="end" font-size="11" style="fill:var(--label2)">exits here, above '+lo+'</text>';}
  else{s+='<path d="M205 46 C240 44 268 40 318 36" stroke="var(--label3)" stroke-width="5" fill="none" stroke-linecap="round"/>'+'<text x="326" y="58" text-anchor="end" font-size="11" style="fill:var(--label2)">'+up+' exits above</text>';
    s+='<path d="M205 12 L205 70 C205 96 212 108 214 136 L215 222" stroke="var(--red)" stroke-width="6" fill="none" stroke-linecap="round"/>'+tag(326,150,x.r+' compressed','red','end')+'<text x="326" y="178" text-anchor="end" font-size="11" style="fill:var(--label2)">crosses the disc</text>';}
  s+='<circle cx="'+hitX+'" cy="'+hitY+'" r="8" fill="none" stroke="var(--red)" stroke-width="2"><animate attributeName="r" values="7;15;7" dur="2s" repeatCount="indefinite"/><animate attributeName="opacity" values=".9;0;.9" dur="2s" repeatCount="indefinite"/></circle>';
  return s+'</svg>';
}
M.lab.disc=function(id,o){o=o||{};
  var R=mk(id,top('spine','indigo','Disc herniation simulator','Pick a disc and see which root it hits','<button class="pbtn" data-a="quiz">'+I.dice+'Quiz me</button>')+
  '<div class="seg" data-a="reg"><button data-g="c">Neck</button><button data-g="l">Low back</button></div><div class="seg" data-a="discs"></div>'+
  '<div class="cell in" data-a="out"></div>'+
  '<div class="lrule"><div class="ico" style="background:var(--red)">'+I.bolt+'</div><div><b>Disc X–Y compresses root Y</b><span>Posterolateral herniation, neck and low back alike</span></div></div>'+
  '<div class="foot">Spinal cord deck s24–27 · Dr. Roman: “like four questions on the exam”</div>');
  if(!R)return;var out=$(R,'[data-a=out]'),g='l',cur=5,open=false;
  function segs(){$$(R,'[data-g]').forEach(function(b){b.classList.toggle('on',b.dataset.g===g);});
    $(R,'[data-a=discs]').innerHTML=DISCS.map(function(x,i){return x.g===g?'<button data-i="'+i+'" class="'+(i===cur?'on':'')+'">'+x.d+'</button>':'';}).join('');}
  function show(i,guess){var x=DISCS[i];cur=i;g=x.g;segs();pulse(out);
    var why=x.g==='c'?'Cervical roots exit <b>above</b> their own vertebra, so the root leaving at '+x.d+' is <b>'+x.r+'</b>.':'The '+x.d.split('–')[0]+' root leaves high in the foramen, above the disc. The root <b>crossing</b> the disc is the next one down: <b>'+x.r+'</b>.';
    out.innerHTML=(guess?'<div style="margin-bottom:10px"><span class="pill '+(guess===x.r?'t-green">'+I.check+'Correct':'t-red">'+I.x+'You picked '+guess)+'</span></div>':'')+
    '<div class="two"><div>'+discSVG(x)+'</div><div class="stack"><div><div class="eb">Compressed root</div><div class="num" style="color:var(--red)">'+x.r+'</div></div>'+
    '<div class="rl"><div class="rw"><span class="k">Skin</span><span class="v">'+x.skin+'</span></div><div class="rw"><span class="k">Weak</span><span class="v">'+x.mus+'</span></div><div class="rw"><span class="k">Reflex</span><span class="v">'+x.ref+'</span></div></div></div></div>'+
    '<div class="note" style="margin-top:12px">'+I.info+'<div>'+why+'</div></div>'+(M.body?'<button class="disc'+(open?' open':'')+'" data-a="tog" style="margin-top:12px">Dermatome map<span class="ch">'+I.chev+'</span></button><div data-a="map"></div>':'');
    drawMap();}
  function drawMap(){var m=$(out,'[data-a=map]');if(!m)return;m.innerHTML='';if(open){try{M.body(m,{view:'both',hl:[DISCS[cur].r]});}catch(e){}}}
  function ask(){var i=Math.floor(Math.random()*DISCS.length),x=DISCS[i],pool=shuf(shuf(['C5','C6','C7','C8','L4','L5','S1'].filter(function(r){return r!==x.r;})).slice(0,3).concat([x.r]));
    pulse(out);out.innerHTML='<div class="eb">Quiz</div><div class="h2" style="margin:4px 0 12px">Posterolateral herniation at '+x.d+'. Which root?</div><div class="chips">'+pool.map(function(r){return '<button class="chip" data-r="'+r+'">'+r+'</button>';}).join('')+'</div>';
    $$(out,'[data-r]').forEach(function(b){b.onclick=function(){show(i,b.dataset.r);};});}
  R.addEventListener('click',function(e){var t;if((t=e.target.closest('[data-g]'))){g=t.dataset.g;show(g==='c'?1:5);}else if((t=e.target.closest('[data-i]')))show(+t.dataset.i);else if(e.target.closest('[data-a=quiz]'))ask();else if((t=e.target.closest('[data-a=tog]'))){open=!open;t.classList.toggle('open',open);drawMap();}});
  show(o.start!=null?o.start:5);return R;};

/* ============ 2. EGG CELL LIFE CLOCK ============ */
var OO=[
 {w:'Fetal months 3–5',n:'Oogonium',s:'Dividing by mitosis. Peaks near 7 million in month 5.',c:'46',dna:'2N',ch:'mit',st:['Dividing','teal']},
 {w:'Before birth',n:'Primary oocyte',s:'Starts meiosis I, crosses over in pachytene, then stops in diplotene of prophase I.',c:'46',dna:'4N',ch:'tet',st:['Arrest 1 · diplotene','red']},
 {w:'Birth',n:'Primary oocyte',s:'About 600–800 thousand left, all still paused in diplotene.',c:'46',dna:'4N',ch:'tet',st:['Paused','orange']},
 {w:'Puberty',n:'Primary oocyte',s:'About 40 thousand left. Each cycle FSH recruits 15–20 follicles; one wins.',c:'46',dna:'4N',ch:'tet',st:['Paused','orange']},
 {w:'LH surge',n:'Secondary oocyte',s:'The LH surge finishes meiosis I (homologs separate, 1st polar body out) and triggers ovulation.',c:'23',dna:'2N',ch:'dy',pb:1,st:['Trigger · LH','blue']},
 {w:'Ovulated',n:'Secondary oocyte',s:'Stops again in metaphase II, wrapped in zona pellucida and corona radiata, and travels to the ampulla.',c:'23',dna:'2N',ch:'met',pb:1,zona:1,st:['Arrest 2 · metaphase II','red']},
 {w:'Fertilized',n:'Zygote',s:'Sperm entry finishes meiosis II (2nd polar body out). Two pronuclei form a 46-chromosome zygote.',c:'46',dna:'2N',ch:'pro',pb:2,zona:1,st:['Meiosis II done','green']}];
function cellSVG(x){
  var s='<svg class="lfig" viewBox="0 0 260 230" role="img" aria-label="'+x.n+'">',cx=124,cy=112;
  if(x.zona){for(var k=0;k<28;k++){var a=k/28*Math.PI*2;s+='<circle cx="'+(cx+Math.cos(a)*104).toFixed(1)+'" cy="'+(cy+Math.sin(a)*104).toFixed(1)+'" r="'+(k%2?6:7.5)+'" fill="'+tint('orange',22)+'"/>';}
    s+='<circle cx="'+cx+'" cy="'+cy+'" r="90" fill="none" stroke="'+tint('orange',40)+'" stroke-width="10"/>';}
  s+='<circle cx="'+cx+'" cy="'+cy+'" r="'+(x.ch==='mit'?60:78)+'" fill="'+tint('purple',11)+'" stroke="'+tint('purple',45)+'" stroke-width="1.4"/>';
  var chr='var(--pink)';function cap(px,py,rot,len){len=len||22;return '<rect x="'+(px-2.8)+'" y="'+(py-len/2)+'" width="5.6" height="'+len+'" rx="2.8" fill="'+chr+'" transform="rotate('+rot+' '+px+' '+py+')"/>';}
  function X(px,py,len){return cap(px,py,28,len)+cap(px,py,-28,len);}
  if(x.ch==='tet'||x.ch==='mit'||x.ch==='dy')s+='<circle cx="'+cx+'" cy="'+cy+'" r="34" fill="var(--cell)" stroke="'+tint('purple',50)+'" stroke-width="1.2"/>';
  if(x.ch==='tet'){s+=X(cx-15,cy-8)+X(cx-3,cy-8)+X(cx+4,cy+12)+X(cx+16,cy+12);}
  else if(x.ch==='mit'){s+=cap(cx-12,cy-4,10,18)+cap(cx,cy+6,-14,18)+cap(cx+12,cy-6,6,18)+'<path d="M'+(cx-70)+' '+cy+'h-14M'+(cx+70)+' '+cy+'h14" stroke="var(--label3)" stroke-width="2" stroke-linecap="round"/>';}
  else if(x.ch==='dy'){s+=X(cx-10,cy)+X(cx+12,cy);}
  else if(x.ch==='met'){s+='<path d="M'+(cx-38)+' '+cy+' Q'+cx+' '+(cy-34)+' '+(cx+38)+' '+cy+' M'+(cx-38)+' '+cy+' Q'+cx+' '+(cy+34)+' '+(cx+38)+' '+cy+' M'+(cx-38)+' '+cy+' L'+(cx+38)+' '+cy+'" stroke="var(--label3)" stroke-width="1" fill="none"/>'+X(cx,cy-9,18)+X(cx,cy+9,18);}
  else if(x.ch==='pro'){s+='<circle cx="'+(cx-18)+'" cy="'+cy+'" r="16" fill="'+tint('pink',22)+'" stroke="var(--pink)" stroke-width="1.3"/><circle cx="'+(cx+18)+'" cy="'+cy+'" r="16" fill="'+tint('blue',20)+'" stroke="var(--blue)" stroke-width="1.3"/><text x="'+(cx-18)+'" y="'+(cy+4)+'" text-anchor="middle" font-size="10" font-weight="600" style="fill:var(--pink)">♀</text><text x="'+(cx+18)+'" y="'+(cy+4)+'" text-anchor="middle" font-size="10" font-weight="600" style="fill:var(--blue)">♂</text>';}
  if(x.pb){s+='<circle cx="220" cy="46" r="13" fill="'+tint('green',22)+'" stroke="var(--green)" stroke-width="1.3"/>';if(x.pb===2)s+='<circle cx="236" cy="72" r="9.5" fill="'+tint('green',22)+'" stroke="var(--green)" stroke-width="1.3"/>';s+='<text x="220" y="22" text-anchor="middle" font-size="10.5" style="fill:var(--label2)">polar bod'+(x.pb===2?'ies':'y')+'</text>';}
  if(x.zona)s+='<text x="8" y="16" font-size="10.5" style="fill:color-mix(in srgb,var(--orange) 80%,var(--label))">zona + corona radiata</text>';
  return s+'</svg>';
}
M.lab.oocyte=function(id){
  var labs=['Fetal','Prenatal','Birth','Puberty','LH','Ovul.','Zygote'];
  var R=mk(id,top('egg','pink','Egg cell life clock','Drag through her whole life','')+
  '<div class="cell"><input type="range" min="0" max="6" step="1" value="1" aria-label="Life stage">'+ticks(labs.map(function(l,i){return [i/6,l];}))+'</div>'+
  '<div class="seg" data-a="wf"><button data-w="lh">Block the LH surge</button><button data-w="nf">No sperm arrives</button></div>'+
  '<div class="cell in" data-a="out"></div><div class="foot">Dr. Shrestha · L03–L05, L10 · her practice Q: “block the LH surge → blocks completion of meiosis I”</div>');
  if(!R)return;var sl=$(R,'input'),out=$(R,'[data-a=out]');
  function show(i,note,w){var x=OO[i];sl.value=i;fillRange(sl);$$(R,'.aticks span').forEach(function(t,j){t.classList.toggle('on',j===i);});$$(R,'[data-w]').forEach(function(b){b.classList.toggle('on',b.dataset.w===w);});pulse(out);
    out.innerHTML='<div class="two"><div class="fc">'+cellSVG(x)+'</div><div class="stack"><div><div class="eb">'+x.w+'</div><div class="h2" style="margin-top:2px">'+x.n+'</div></div><div><span class="pill t-'+x.st[1]+'">'+x.st[0]+'</span></div>'+
    '<div class="rl wide"><div class="rw"><span class="k">Chromosomes</span><span class="v" style="font-family:var(--fr);font-weight:600">'+x.c+'</span></div><div class="rw"><span class="k">DNA</span><span class="v" style="font-family:var(--fr);font-weight:600">'+x.dna+'</span></div></div><div class="body">'+x.s+'</div></div></div>'+
    (note?'<div class="note" style="margin-top:12px">'+I.info+'<div>'+note+'</div></div>':'');}
  sl.oninput=function(){show(+sl.value);};
  R.addEventListener('click',function(e){var b=e.target.closest('[data-w]');if(!b)return;
    if(b.dataset.w==='lh')show(3,'No LH surge = meiosis I never finishes. The follicle still holds a <b>primary oocyte in diplotene</b>, and there is no ovulation.','lh');
    else show(5,'No fertilization = meiosis II never finishes. The <b>secondary oocyte</b> degenerates within about a day.','nf');});
  show(1);return R;};

/* ============ 3. FIRST WEEK ============ */
var WK=[
 {t:'Fertilization',s:'In the ampulla. Two pronuclei, still inside the zona.',k:'zyg'},
 {t:'2-cell stage',s:'Cleavage: more cells, same total size.',k:'c2'},
 {t:'4-cell stage',s:'Still moving down the tube.',k:'c4'},
 {t:'Morula',s:'About 16 compacted cells. Reaches the uterus.',k:'mor'},
 {t:'Blastocyst',s:'A fluid cavity forms: inner cell mass + trophoblast.',k:'bla'},
 {t:'Blastocyst hatches',s:'The zona disappears so it can attach.',k:'hat'},
 {t:'Implantation begins',s:'Embryonic pole attaches, usually in the upper uterine body.',k:'imp'},
 {t:'Trophoblast invades',s:'Syncytiotrophoblast invades and makes hCG; cytotrophoblast keeps dividing.',k:'inv'}];
function embSVG(k){
  var s='<svg class="lfig" viewBox="0 0 220 190" role="img" aria-label="Embryo">',cx=110,cy=92,zona=!/hat|imp|inv/.test(k);
  function cell(x,y,r){return '<circle cx="'+x+'" cy="'+y+'" r="'+r+'" fill="'+tint('purple',16)+'" stroke="'+tint('purple',55)+'" stroke-width="1.3"/>';}
  if(/imp|inv/.test(k)){cy=78;s+='<path d="M0 134 Q27 124 55 134 T110 134 T165 134 T220 134 V190 H0Z" fill="'+tint('pink',14)+'"/><path d="M36 150v26M86 146v30M140 148v28M186 150v24" stroke="'+tint('pink',32)+'" stroke-width="5" stroke-linecap="round"/><text x="212" y="184" text-anchor="end" font-size="10" style="fill:var(--pink)">endometrium</text>';}
  if(zona)s+='<circle cx="'+cx+'" cy="'+cy+'" r="70" fill="none" stroke="'+tint('orange',40)+'" stroke-width="8"/>';
  if(k==='zyg'){s+=cell(cx,cy,58)+'<circle cx="'+(cx-16)+'" cy="'+cy+'" r="11" fill="'+tint('pink',24)+'" stroke="var(--pink)"/><circle cx="'+(cx+16)+'" cy="'+cy+'" r="11" fill="'+tint('blue',22)+'" stroke="var(--blue)"/>';}
  else if(k==='c2'){s+=cell(cx-28,cy,29)+cell(cx+28,cy,29);}
  else if(k==='c4'){s+=cell(cx-24,cy-22,24)+cell(cx+24,cy-22,24)+cell(cx-24,cy+22,24)+cell(cx+24,cy+22,24);}
  else if(k==='mor'){var pts=[[0,0],[0,-26],[23,-13],[23,13],[0,26],[-23,13],[-23,-13],[0,-50],[35,-35],[48,0],[35,35],[0,50],[-35,35],[-48,0],[-35,-35],[12,-2]];pts.forEach(function(p){s+=cell(cx+p[0],cy+p[1],15);});}
  else{s+='<circle cx="'+cx+'" cy="'+cy+'" r="54" fill="'+tint('teal',9)+'"/>';var down=/imp|inv/.test(k);
    for(var q=0;q<20;q++){var a=q/20*Math.PI*2,px=(cx+Math.cos(a)*54).toFixed(1),py=(cy+Math.sin(a)*54).toFixed(1);s+='<ellipse cx="'+px+'" cy="'+py+'" rx="10" ry="6" transform="rotate('+(a*180/Math.PI+90).toFixed(0)+' '+px+' '+py+')" fill="'+tint('purple',18)+'" stroke="'+tint('purple',55)+'" stroke-width="1.2"/>';}
    var iy=cy+(down?30:-30);[[-13,0],[0,-7],[13,0],[-7,10],[7,10],[0,2]].forEach(function(p){s+='<circle cx="'+(cx+p[0])+'" cy="'+(iy+(down?-p[1]:p[1]))+'" r="8.5" fill="'+tint('green',22)+'" stroke="var(--green)" stroke-width="1.2"/>';});
    s+='<text x="'+cx+'" y="'+(cy+(down?-10:22))+'" text-anchor="middle" font-size="10.5" style="fill:var(--label2)">cavity</text>';
    if(k==='inv')s+='<path d="M80 128 C72 140 76 150 68 160 M110 136 C110 148 104 156 108 168 M140 128 C148 140 144 150 152 160" stroke="var(--orange)" stroke-width="6" fill="none" stroke-linecap="round"/>';}
  return s+'</svg>';
}
var FZ=[
 {t:'Capacitation',s:'In the female tract (~7 h) the glycoprotein coat and seminal proteins come off the sperm head.'},
 {t:'Through the corona radiata',s:'Hyaluronidase from the acrosome loosens the follicle cells around the egg.'},
 {t:'Through the zona pellucida',s:'Binding ZP3 fires the acrosome reaction. Acrosin digests a path through the zona.'},
 {t:'Fusion, cortical reaction',s:'The membranes fuse and cortical granules are released into the perivitelline space.'},
 {t:'Zona reaction',s:'Granule enzymes change ZP2/ZP3 so no more sperm can bind: the block to polyspermy. Meiosis II finishes.'}];
M.lab.week1=function(id){
  var P=[[40,70],[92,52],[150,44],[222,52],[300,74],[372,96],[440,108],[486,104]];
  var tube='<svg class="lfig" viewBox="0 0 520 124" aria-hidden="true"><path d="M20 78 C70 36 150 30 220 46 S340 92 420 104 L500 96" fill="none" stroke="'+tint('pink',16)+'" stroke-width="26" stroke-linecap="round"/><path d="M20 78 C70 36 150 30 220 46 S340 92 420 104 L500 96" fill="none" stroke="'+tint('pink',40)+'" stroke-width="1.2" stroke-dasharray="2 5"/>'+
   P.map(function(p,i){return '<circle cx="'+p[0]+'" cy="'+p[1]+'" r="3" fill="var(--label3)"/>';}).join('')+
   
   '<circle data-a="halo" cx="40" cy="70" r="20" fill="'+tint('blue',18)+'" style="transition:cx .5s cubic-bezier(.32,.72,0,1),cy .5s cubic-bezier(.32,.72,0,1)"/><circle data-a="dot" cx="40" cy="70" r="10" fill="var(--blue)" stroke="#fff" stroke-width="3" style="transition:cx .5s cubic-bezier(.32,.72,0,1),cy .5s cubic-bezier(.32,.72,0,1)"/></svg>';
  var R=mk(id,top('cal','teal','First week','From the ampulla to the uterine wall','<span class="pill t-blue" data-a="day" style="height:28px;font-size:13px">Day 0</span>')+
  '<div class="cell">'+tube+'<div class="vrow" style="margin:2px 0 4px"><span>Ampulla</span><span>Isthmus</span><span>Uterine wall</span></div><input type="range" min="0" max="7" step="1" value="0" aria-label="Day after fertilization">'+ticks([0,1,2,3,4,5,6,7].map(function(d){return [d/7,d];}))+'</div>'+
  '<div class="cell in" data-a="out"></div>'+
  '<div class="hdr">Fertilization, step by step</div><div class="cell"><div data-a="fz"></div><div class="nav" style="margin-top:12px"><button class="cbtn" data-f="-1" aria-label="Previous step">'+I.l+'</button><div class="dots">'+FZ.map(function(){return '<i></i>';}).join('')+'</div><button class="cbtn" data-f="1" aria-label="Next step">'+I.r+'</button></div></div>'+
  '<div class="foot">Dr. Shrestha · L10 (“three days… sixteen cell stages”, “implantation six, seven days”) · deck s28</div>');
  if(!R)return;var sl=$(R,'input'),out=$(R,'[data-a=out]'),fi=0;
  function show(i){var x=WK[i];sl.value=i;fillRange(sl);$(R,'[data-a=day]').textContent='Day '+i;$$(R,'.aticks span').forEach(function(t,j){t.classList.toggle('on',j===i);});
    ['dot','halo'].forEach(function(n){var c=$(R,'[data-a='+n+']');c.setAttribute('cx',P[i][0]);c.setAttribute('cy',P[i][1]);});pulse(out);
    out.innerHTML='<div class="two"><div class="fc">'+embSVG(x.k)+'</div><div class="stack"><div><div class="eb">Day '+i+'</div><div class="h2" style="margin-top:2px">'+x.t+'</div></div><div class="body">'+x.s+'</div>'+
    (/bla|hat|imp|inv/.test(x.k)?'<div class="chips" style="gap:6px"><span class="pill t-purple">Ring · trophoblast</span><span class="pill t-green">Cluster · inner cell mass</span></div>':'')+
    '<div class="rl wide"><div class="rw"><span class="k">Day 3</span><span class="v">Morula</span></div><div class="rw"><span class="k">Days 4–5</span><span class="v">Blastocyst</span></div><div class="rw"><span class="k">Days 6–7</span><span class="v">Implants</span></div></div></div></div>';}
  function fz(){var x=FZ[fi],el=$(R,'[data-a=fz]');el.innerHTML='<div class="in"><div class="eb">Step '+(fi+1)+' of '+FZ.length+'</div><div class="tt" style="margin:3px 0 4px">'+x.t+'</div><div class="body">'+x.s+'</div></div>';$$(R,'.dots i').forEach(function(d,j){d.classList.toggle('on',j===fi);});}
  sl.oninput=function(){show(+sl.value);};
  R.addEventListener('click',function(e){var b=e.target.closest('[data-f]');if(b){fi=Math.max(0,Math.min(FZ.length-1,fi+(+b.dataset.f)));fz();}});
  show(0);fz();return R;};

/* ============ 4. FETAL AGE ============ */
M.lab.fetal=function(id){
  var R=mk(id,top('wave','orange','Fetal age','Where blood is made, and what a drug must cross','')+
  '<div class="cell"><div class="vrow"><span>Gestational age</span><b data-a="age">Week 20</b></div><input type="range" min="3" max="40" step="1" value="20" aria-label="Gestational week">'+ticks([[0,'3'],[5/37,'8'],[14/37,'17'],[27/37,'30'],[1,'40']])+'</div>'+
  '<div class="two" style="align-items:stretch"><div class="cell stack"><div><div class="eb">Main blood-making site</div><div class="h2" data-a="site" style="margin-top:2px">Liver</div></div><svg class="lfig" data-a="gantt" viewBox="0 0 300 150"></svg></div>'+
  '<div class="cell stack"><div><div class="eb">Placental barrier</div><div class="h2" data-a="nl" style="margin-top:2px">2 layers</div></div><svg class="lfig" data-a="bar" viewBox="0 0 300 170"></svg></div></div>'+
  '<div class="note">'+I.info+'<div data-a="note"></div></div>'+
  '<div class="foot">Dr. Shrestha · L17 00:45:54 (yolk sac wk 3–8 → liver months 2–7 → marrow after month 7) · L17 01:27:07 (four layers → two)</div>');
  if(!R)return;var sl=$(R,'input');
  function X(w){return 92+(w-3)/37*200;}
  function draw(w){fillRange(sl);var mo=(w/4.33).toFixed(1),si=w<=8?0:w<=30?1:2,site=['Yolk sac','Liver','Bone marrow'][si];
    $(R,'[data-a=age]').textContent='Week '+w+' · month '+mo;$$(R,'.aticks span').forEach(function(t){t.classList.toggle('on',+t.textContent===w);});$(R,'[data-a=site]').textContent=site;
    var rows=[['Yolk sac',3,8,'orange',si===0],['Liver',6,30,'red',si===1],['Bone marrow',27,40,'indigo',si===2],['Spleen',10,28,'label3',false]],g='';
    rows.forEach(function(r,i){var y=20+i*32;g+='<text x="0" y="'+(y+9)+'" font-size="12" font-weight="'+(r[4]?600:400)+'" style="fill:var(--'+(r[4]?'label':'label2')+')">'+r[0]+'</text><rect x="92" y="'+y+'" width="200" height="12" rx="6" fill="var(--fill)"/><rect x="'+X(r[1])+'" y="'+y+'" width="'+(X(r[2])-X(r[1]))+'" height="12" rx="6" style="fill:var(--'+r[3]+')" opacity="'+(r[4]?1:.3)+'"/>';});
    g+='<text x="0" y="146" font-size="10.5" style="fill:var(--label3)">Spleen: never the principal-site answer</text>';
    g+='<line x1="'+X(w)+'" x2="'+X(w)+'" y1="10" y2="132" stroke="var(--label)" stroke-width="1.5"/><rect x="'+(X(w)-18)+'" y="0" width="36" height="16" rx="8" fill="var(--label)"/><text x="'+X(w)+'" y="11.5" text-anchor="middle" font-size="10" font-weight="700" style="fill:var(--cell)">'+w+'</text>';
    $(R,'[data-a=gantt]').innerHTML=g;
    var early=w<17,L=[['Maternal blood','red',1,1],['Syncytiotrophoblast','purple',1,0],['Cytotrophoblast','purple',early,0],['Villous connective tissue','teal',early,0],['Fetal capillary endothelium','teal',1,0],['Fetal blood','blue',1,1]],b='',y=2;
    L.forEach(function(l){if(!l[2])return;var edge=l[3];b+='<rect x="'+(edge?4:24)+'" y="'+y+'" width="'+(edge?292:252)+'" height="24" rx="12" fill="'+tint(l[1],edge?12:18)+'"'+(edge?'':' stroke="'+tint(l[1],40)+'"')+'/><text x="150" y="'+(y+16)+'" text-anchor="middle" font-size="11.5" font-weight="'+(edge?400:600)+'">'+l[0]+'</text>';y+=28;});
    b+='<path d="M296 8 V'+(y-10)+'" stroke="var(--label3)" stroke-width="1.4" stroke-dasharray="3 3"/><path d="M292 '+(y-14)+' l4 6 4-6" stroke="var(--label3)" stroke-width="1.4" fill="none"/>';
    var bs=$(R,'[data-a=bar]');bs.setAttribute('viewBox','0 0 300 '+(y+2));bs.innerHTML=b;$(R,'[data-a=nl]').textContent=early?'4 layers':'2 layers';
    $(R,'[data-a=note]').innerHTML=si===0?'Weeks 3–8: <b>yolk sac</b>. Also the embryonic period, when organs form.':si===1?'Months 2–7: <b>liver</b>. Week 20 is still liver.'+(early?' Before month 4 the barrier has four layers.':' After month 4 the barrier is just syncytiotrophoblast + fetal endothelium.'):'After month 7: <b>bone marrow</b> takes over. Survival rises after about 28 weeks (surfactant).';}
  sl.oninput=function(){draw(+sl.value);};draw(20);return R;};

/* ============ 5–6. SORTERS ============ */
var BC=['blue','purple','orange','teal','pink','green','indigo','red'];
M.lab.sort=function(id,o){
  var R=mk(id,top(o.icon||'split',o.color||'purple',o.ey||'Sort',o.title,'<span class="pill t-blue" data-a="sc" style="height:28px;font-size:13px">0 / 0</span>')+
  (o.tabs?'<div class="seg">'+o.tabs.map(function(t,i){return '<button data-t="'+i+'" class="'+(i?'':'on')+'">'+t.name+'</button>';}).join('')+'</div>':'')+
  '<div class="prog"><i style="width:0"></i></div><div class="deck" data-a="it"></div><div class="bins" data-a="bins"></div><div data-a="fb"></div><div class="foot">'+(o.src||'')+'</div>');
  if(!R)return;var set,deck,k,ok,miss;
  function load(s){set=s;deck=shuf(s.items);k=0;ok=0;miss=[];$(R,'[data-a=bins]').innerHTML=s.bins.map(function(b,i){return '<button class="bin" data-b="'+b.id+'"><i style="background:var(--'+BC[i%BC.length]+')"></i>'+b.name+'</button>';}).join('');next();}
  function next(){$$(R,'.bin').forEach(function(b){b.classList.remove('ok','no');b.disabled=false;});var d=$(R,'[data-a=it]');d.classList.remove('no');
    $(R,'.prog i').style.width=(k/deck.length*100)+'%';$(R,'[data-a=sc]').textContent=ok+' / '+deck.length;$(R,'[data-a=fb]').innerHTML='';
    if(k>=deck.length){d.innerHTML='<div class="eb">Round done</div><div class="num">'+ok+'<span style="font-size:22px;color:var(--label2)"> / '+deck.length+'</span></div><div class="st">'+(miss.length?'Missed: '+miss.join(', '):'Clean sweep')+'</div><button class="pbtn" data-a="again" style="margin-top:8px">'+I.shuffle+'Shuffle and go again</button>';return;}
    d.innerHTML='<div class="eb">'+(k+1)+' of '+deck.length+'</div><div class="w in">'+deck[k].n+'</div>';}
  R.addEventListener('click',function(e){var t=e.target.closest('[data-t]');if(t){$$(R,'[data-t]').forEach(function(c){c.classList.toggle('on',c===t);});load(o.tabs[+t.dataset.t]);return;}
    if(e.target.closest('[data-a=again]')){load(set);return;}
    if(e.target.closest('[data-a=nx]')){k++;next();return;}
    var b=e.target.closest('.bin');if(!b||b.disabled||k>=deck.length)return;var it=deck[k],right=b.dataset.b===it.b;
    $$(R,'.bin').forEach(function(x){x.disabled=true;if(x.dataset.b===it.b)x.classList.add('ok');});if(!right){b.classList.add('no');miss.push(it.n);var d=$(R,'[data-a=it]');d.classList.remove('no');void d.offsetWidth;d.classList.add('no');}else ok++;
    $(R,'[data-a=sc]').textContent=ok+' / '+deck.length;
    var bn=set.bins.filter(function(x){return x.id===it.b;})[0].name;
    $(R,'[data-a=fb]').innerHTML='<div class="fb in"><span class="rs" style="background:var(--'+(right?'green':'red')+')">'+(right?I.check:I.x)+'</span><div class="gx"><b>'+bn+'.</b> '+(it.w||'')+'</div><button class="pbtn" data-a="nx">Next</button></div>';});
  load(o.tabs?o.tabs[0]:o);return R;};
var CREST={bins:[{id:'c',name:'Neural crest'},{id:'t',name:'Neural tube'},{id:'m',name:'Mesoderm'},{id:'e',name:'Endoderm'},{id:'s',name:'Surface ectoderm'}],items:[
 {n:'Schwann cells',b:'c',w:'PNS myelin. In her words: “not oligodendrocytes, the Schwann cells.”'},
 {n:'Oligodendrocytes',b:'t',w:'CNS myelin comes from the neural tube.'},
 {n:'Dorsal root ganglion neurons',b:'c',w:'Every ganglion outside the CNS is crest.'},
 {n:'Sympathetic chain ganglia',b:'c',w:'Autonomic ganglia are crest.'},
 {n:'Melanocytes',b:'c',w:'Pigment cells migrate out from the crest.'},
 {n:'Adrenal medulla',b:'c',w:'Chromaffin cells are modified sympathetic neurons.'},
 {n:'Adrenal cortex',b:'m',w:'Mesoderm. The medulla is crest; the cortex is not.'},
 {n:'Thyroid C cells',b:'c',w:'Parafollicular cells making calcitonin.'},
 {n:'Thyroid follicular cells',b:'e',w:'The follicles (thyroxine) are endoderm.'},
 {n:'Pia and arachnoid',b:'c',w:'The leptomeninges are crest.'},
 {n:'Dura mater',b:'m',w:'Dura is mesoderm.'},
 {n:'Odontoblasts',b:'c',w:'The dentin-making cells of teeth.'},
 {n:'Spinal cord motor neurons',b:'t',w:'Neurons inside the CNS come from the neural tube.'},
 {n:'Enteric ganglia of the gut',b:'c',w:'The gut’s own nervous system is crest.'},
 {n:'Epidermis',b:'s',w:'Surface ectoderm. Its melanocytes are crest, but the epidermis is not.'},
 {n:'Lens of the eye',b:'s',w:'Surface ectoderm.'}]};
M.lab.crest=function(id){return M.lab.sort(id,Object.assign({icon:'spark',color:'purple',ey:'Neural crest sorter',title:'Tap where each cell comes from',src:'Dr. Shrestha · L17 00:03:25 · “in the exam you’ll simply be asked which of the following is a neural crest derivative”'},CREST));};
var AFP={name:'AFP high or low',bins:[{id:'h',name:'AFP high'},{id:'l',name:'AFP low'}],items:[
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
M.lab.defects=function(id){return M.lab.sort(id,{icon:'split',color:'teal',ey:'Defect and AFP sorter',title:'Sort each one into its bin',tabs:[AFP,DEF],items:AFP.items,bins:AFP.bins,src:'Dr. Shrestha · L18 (AFP 00:49:56 · deformation 00:11:25) · deck s6, s37'});};

/* ============ 7. INJURY → NERVE BOARD ============ */
var TG={Thigh:'blue',Hip:'indigo',Leg:'orange',Foot:'teal',Vein:'pink'};
var INJ=[
 {s:'Hematoma in the femoral triangle after catheterization',n:'Femoral nerve',w:'Knee extension; patellar reflex drops',f:'Anterior thigh + medial leg (saphenous branch)',p:'NAV from lateral: the nerve sits outside the femoral sheath.',tg:'Thigh'},
 {s:'Dashboard injury; limb shortened, adducted, medially rotated',n:'Sciatic nerve',w:'Hamstrings and everything below the knee; foot drop',f:'Leg and foot except the medial strip',p:'Posterior hip dislocation puts the femoral head right on it.',tg:'Hip'},
 {s:'Fibular neck fracture, or a tight cast there',n:'Common fibular nerve',w:'Dorsiflexion + eversion: foot drop, high-steppage gait',f:'Lateral leg + dorsum of foot',p:'It wraps around the fibular neck.',tg:'Leg'},
 {s:'Deep laceration on the lateral leg',n:'Superficial fibular nerve',w:'Eversion (fibularis longus + brevis)',f:'Distal anterolateral leg + most of the dorsum',p:'Eversion is the action unique to the lateral compartment.',tg:'Leg'},
 {s:'Ski boot laced too tight over the ankle',n:'Deep fibular nerve',w:'Mostly sensory when squeezed here',f:'First dorsal web space only',p:'Cut higher up, it causes foot drop too.',tg:'Foot'},
 {s:'IM injection placed too low and medial in the buttock',n:'Superior gluteal nerve',w:'Abduction + medial rotation (medius, minimus, TFL)',f:'None',p:'Trendelenburg: stand on the injured side and the opposite pelvis drops.',tg:'Hip'},
 {s:'Pelvic fracture injures the nerve to gluteus maximus',n:'Inferior gluteal nerve',w:'Hip extension: stairs, rising from a chair',f:'None',p:'Walking on level ground stays normal.',tg:'Hip'},
 {s:'Pelvic lymph node surgery',n:'Obturator nerve',w:'Adduction: cannot cross the legs',f:'Medial thigh',p:'Knee jerk is normal; that reflex is femoral.',tg:'Thigh'},
 {s:'Heavy tool belt, burning lateral thigh',n:'Lateral femoral cutaneous nerve',w:'No weakness',f:'Anterolateral thigh',p:'Meralgia paresthetica.',tg:'Thigh'},
 {s:'Great saphenous vein harvested for CABG',n:'Saphenous nerve',w:'No weakness',f:'Medial leg + medial border of foot',p:'The vein and its nerve travel together; the vein is reversed for the graft.',tg:'Vein'},
 {s:'Small saphenous vein harvested behind the lateral malleolus',n:'Sural nerve',w:'No weakness',f:'Lateral border of the foot',p:'Also the classic nerve-biopsy donor.',tg:'Vein'},
 {s:'Compression under the flexor retinaculum (tarsal tunnel)',n:'Tibial nerve',w:'Intrinsic foot muscles',f:'Sole of the foot',p:'A higher tibial injury also stops walking on the toes.',tg:'Foot'}];
M.lab.injury=function(id){
  var R=mk(id,top('bolt','orange','Injury → nerve','Pick an injury, or let it quiz you','<button class="pbtn" data-a="quiz">'+I.dice+'Quiz me</button>')+
  '<div class="two" style="align-items:start"><div class="glist" data-a="ls"></div><div class="cell in" data-a="out"></div></div>'+
  '<div class="hdr">Swollen inguinal nodes</div><div class="two" style="align-items:stretch"><div class="cell"><div class="tt" style="font-size:15px">Horizontal group</div><div class="st" style="margin:2px 0 8px">Parallel to the inguinal ligament</div><div class="body">Perineum, anal region, genitals, buttock, lower abdominal wall</div></div><div class="cell"><div class="tt" style="font-size:15px">Vertical group</div><div class="st" style="margin:2px 0 8px">Along the great saphenous vein</div><div class="body">The leg and foot</div></div></div>'+
  '<div class="foot">Dr. Roman · lower limb lectures · Must-Know §3a</div>');
  if(!R)return;var ls=$(R,'[data-a=ls]'),out=$(R,'[data-a=out]'),home=out.parentNode,mq=window.matchMedia?window.matchMedia('(max-width:560px)'):{matches:false};
  function place(li){if(mq.matches){out.classList.add('inl');if(li)li.after(out);else ls.insertBefore(out,ls.firstChild);}else{out.classList.remove('inl');if(out.parentNode!==home)home.appendChild(out);}}
  ls.innerHTML=INJ.map(function(x,i){return '<button class="li" data-i="'+i+'"><span class="tl" style="background:var(--'+TG[x.tg]+')">'+x.tg[0]+'</span><span class="tx">'+x.s+'</span><span class="ch">'+I.chev+'</span></button>';}).join('');
  function show(i,guess){var x=INJ[i];var cur=null;$$(ls,'.li').forEach(function(b){var on=+b.dataset.i===i;b.classList.toggle('on',on);if(on)cur=b;});place(cur);pulse(out);
    out.innerHTML=(guess?'<div style="margin-bottom:8px"><span class="pill '+(guess===x.n?'t-green">'+I.check+'Correct':'t-red">'+I.x+'You picked '+guess)+'</span></div>':'')+'<div class="eb">'+x.tg+'</div><div class="h2" style="margin:2px 0 8px">'+x.n+'</div><div class="rl"><div class="rw"><span class="k">Weak</span><span class="v">'+x.w+'</span></div><div class="rw"><span class="k">Numb</span><span class="v">'+x.f+'</span></div></div><div class="note" style="margin-top:10px">'+I.info+'<div>'+x.p+'</div></div>';}
  function ask(){var i=Math.floor(Math.random()*INJ.length),x=INJ[i],pool=shuf(shuf(INJ.filter(function(y){return y.n!==x.n;}).map(function(y){return y.n;})).slice(0,3).concat([x.n]));
    $$(ls,'.li').forEach(function(b){b.classList.remove('on');});place(null);pulse(out);
    out.innerHTML='<div class="eb">Quiz</div><div class="tt" style="margin:4px 0 12px;font-weight:600">'+x.s+'. Which nerve?</div><div class="stack" style="gap:8px">'+pool.map(function(n){return '<button class="chip" style="text-align:left" data-n="'+n+'">'+n+'</button>';}).join('')+'</div>';
    $$(out,'[data-n]').forEach(function(b){b.onclick=function(){show(i,b.dataset.n);};});}
  R.addEventListener('click',function(e){var b=e.target.closest('.li');if(b)show(+b.dataset.i);if(e.target.closest('[data-a=quiz]'))ask();});
  show(0);return R;};

M.lab.v='2.0.0';
})();
