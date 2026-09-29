/* _claude looks v0.2 — design-direction samples. Same scene (L4–L5 posterolateral disc herniation, posterior view)
   drawn in three visual languages so the student can pick one:  MUA.look.manual(id) · MUA.look.cozy(id) · MUA.look.atlas(id)
   Generic teaching content only. */
(function(){
var M=window.MUA=window.MUA||{};M.look=M.look||{};if(M.look.v)return;
var FS='https://cdn.jsdelivr.net/npm/@fontsource/';
function font(f){f.forEach(function(p){var h=FS+p;if(document.querySelector('link[href="'+h+'"]'))return;var l=document.createElement('link');l.rel='stylesheet';l.href=h;document.head.appendChild(l);});}
function css(id,t){if(document.getElementById(id))return;var s=document.createElement('style');s.id=id;s.textContent=t;document.head.appendChild(s);}
function mount(id,cls,html){var H=typeof id==='string'?document.getElementById(id):id;if(!H)return null;var R=document.createElement('div');R.className=cls;R.innerHTML=html;H.appendChild(R);return R;}
var RM=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
var EZ={ios:function(t){return 1-Math.pow(1-t,3.4);},back:function(t){var c=2.2;return 1+(c+1)*Math.pow(t-1,3)+c*Math.pow(t-1,2);}};
function tween(o,to,dur,ez,fn){cancelAnimationFrame(o.raf);var a=o.h,t0=performance.now();if(RM){o.h=to;fn(to);return;}
  (function f(n){var t=Math.min(1,(n-t0)/dur);o.h=a+(to-a)*ez(t);fn(o.h);if(t<1)o.raf=requestAnimationFrame(f);})(t0);}
function clamp(h){return Math.max(0,Math.min(1,h));}
/* ---------- shared anatomy (viewBox 0 0 360 300, posterior view, laminae removed) ---------- */
function P(a,m){function X(x){return +(m?360-x:x).toFixed(1);}var s='M'+X(a[0])+' '+a[1];for(var i=2;i<a.length;i+=6)s+=' C'+X(a[i])+' '+a[i+1]+' '+X(a[i+2])+' '+a[i+3]+' '+X(a[i+4])+' '+(+a[i+5].toFixed(1));return s;}
var A={
 L4:[200,56,206,60,212,64,222,70,232,76,244,80,262,88,286,98,312,112,342,130],
 L5:function(h){return [198,96,206,100,214,104,218+14*h,116,222+16*h,128,222+10*h,150,226,170,230,186,238,196,262,208,286,220,310,236,342,254];},
 S1:[196,218,204,224,212,230,218,244,224,258,226,276,228,302],
 body:[[112,18,136,80],[112,142,136,80]],
 disc:[[110,-8,140,22],[108,102,144,36],[110,226,140,30]],
 ped:[[118,46],[242,46],[118,170],[242,170]],
 sac:'M152 -6 H208 V262 Q208 288 180 288 Q152 288 152 262 Z',
 sacrum:'M118 260 H242 Q247 260 246 265 L239 304 H121 L114 265 Q113 260 118 260 Z',
 blob:function(h){var c=clamp(h),x=214+7*h,rx=3+16*c,ry=3+10*c;return {cx:x,cy:121,rx:rx,ry:ry,op:c>0.02?1:0};}
};
function roots(fn){/* fn(d, key, mirrored) for every root except the moving right L5 */return fn(P(A.L4),'l4r')+fn(P(A.L4,1),'l4l')+fn(P(A.L5(0),1),'l5l')+fn(P(A.S1),'s1r')+fn(P(A.S1,1),'s1l');}
function rect(r,rx,at){return '<rect x="'+r[0]+'" y="'+r[1]+'" width="'+r[2]+'" height="'+r[3]+'" rx="'+rx+'" '+(at||'')+'/>';}
function setBlob(el,h){var b=A.blob(h);el.setAttribute('cx',b.cx);el.setAttribute('rx',b.rx);el.setAttribute('ry',b.ry);el.style.opacity=b.op;}

/* =================================================================
   A · FIELD MANUAL — first-aid booklet / safety pictogram language
   ================================================================= */
M.look.manual=function(id){
 font(['barlow-condensed@5/700.css','barlow-condensed@5/800.css','barlow@5/500.css']);
 css('lk-man',`
.lkm{--pp:#F4F1E8;--ink:#171614;--mute:#6A655B;--g1:#D9D3C6;--g2:#B3AB9B;--red:#D7261E;--yel:#FFCC00;--wh:#FFFFFF;
 font:500 15px/1.45 Barlow,system-ui,sans-serif;color:var(--ink);background:var(--pp);border:2px solid var(--ink);max-width:620px;-webkit-font-smoothing:antialiased}
@media (prefers-color-scheme:dark){.lkm{--pp:#151513;--ink:#ECE8DE;--mute:#9D978A;--g1:#2E2C28;--g2:#57534B;--wh:#1D1C1A}}
.lkm *{box-sizing:border-box}
.lkm .bar{display:flex;justify-content:space-between;gap:10px;background:var(--ink);color:var(--pp);font:700 12.5px/1 "Barlow Condensed",sans-serif;letter-spacing:.1em;text-transform:uppercase;padding:9px 14px}
.lkm .hd{padding:16px 16px 2px}
.lkm h3{margin:0;font:800 36px/.92 "Barlow Condensed",sans-serif;text-transform:uppercase;letter-spacing:-.01em}
.lkm .sub{color:var(--mute);font-size:14px;margin-top:8px}
.lkm svg{display:block;width:100%;max-width:430px;margin:0 auto;height:auto}
.lkm svg text{font-family:"Barlow Condensed",sans-serif;font-weight:800}
.lkm .tg{display:grid;grid-template-columns:1fr 1fr;border-top:2px solid var(--ink);border-bottom:2px solid var(--ink)}
.lkm .tg button{font:800 16px/1 "Barlow Condensed",sans-serif;letter-spacing:.08em;text-transform:uppercase;padding:15px 0;background:none;color:var(--ink);border:0;cursor:pointer;transition:background .15s,color .15s}
.lkm .tg button+button{border-left:2px solid var(--ink)}
.lkm .tg button.on{background:var(--ink);color:var(--pp)}
.lkm ol{list-style:none;margin:0;padding:4px 16px}
.lkm li{display:grid;grid-template-columns:26px 1fr;gap:12px;padding:11px 0;border-bottom:1px solid var(--g2)}
.lkm li:last-child{border-bottom:0}
.lkm li b{display:block;font:800 16px/1.15 "Barlow Condensed",sans-serif;text-transform:uppercase;letter-spacing:.03em;margin-bottom:1px}
.lkm li span{color:var(--mute);font-size:14px}
.lkm .n{width:24px;height:24px;border-radius:50%;background:var(--ink);color:var(--pp);display:grid;place-items:center;font:800 14px/1 "Barlow Condensed",sans-serif;transition:background .2s}
.lkm li.hit .n{background:var(--red);color:#fff}.lkm li.hit b{color:var(--red)}
.lkm .warn{margin:6px 16px 16px;border:2px solid var(--ink);background:var(--wh);position:relative;padding:22px 14px 14px;display:grid;grid-template-columns:50px 1fr;gap:14px;align-items:center}
.lkm .warn:before{content:"";position:absolute;left:0;right:0;top:0;height:9px;background:repeating-linear-gradient(-45deg,var(--yel) 0 7px,#171614 7px 14px);border-bottom:2px solid var(--ink)}
.lkm .warn .k{font:800 27px/.95 "Barlow Condensed",sans-serif;text-transform:uppercase}
.lkm .warn .d{font-size:14px;color:var(--mute);margin-top:5px}
@media (prefers-reduced-motion:reduce){.lkm *{transition:none!important}}`);
 function tube(d,k){return '<path d="'+d+'" stroke="var(--ink)" stroke-width="8.5" fill="none" stroke-linecap="round"/><path d="'+d+'" stroke="var(--wh)" stroke-width="4.6" fill="none" stroke-linecap="round"/>';}
 function mk(x,y,n,cls){return '<g class="'+(cls||'')+'"><circle cx="'+x+'" cy="'+y+'" r="10" fill="var(--ink)"/><text x="'+x+'" y="'+(y+4.6)+'" text-anchor="middle" font-size="14" fill="var(--pp)">'+n+'</text></g>';}
 var s='<svg viewBox="0 -4 360 304" role="img" aria-label="Posterior view of L4 and L5 with a posterolateral disc herniation compressing the L5 root"><defs><pattern id="mh" width="4.5" height="4.5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="4.5" stroke="var(--ink)" stroke-width="1.1"/></pattern><clipPath id="mclip"><rect x="0" y="-4" width="360" height="304"/></clipPath></defs><g clip-path="url(#mclip)">';
 A.disc.forEach(function(r){s+=rect(r,14,'fill="var(--g1)" stroke="var(--ink)" stroke-width="2"');});
 s+='<ellipse cx="180" cy="120" rx="34" ry="9" fill="var(--g2)"/>';
 A.body.forEach(function(r){var x=r[0],y=r[1],w=r[2],h=r[3];s+=rect(r,12,'fill="var(--wh)" stroke="var(--ink)" stroke-width="2.2"')+
   '<path d="M'+(x+w-30)+' '+y+' H'+(x+w-12)+' A12 12 0 0 1 '+(x+w)+' '+(y+12)+' V'+(y+h-12)+' A12 12 0 0 1 '+(x+w-12)+' '+(y+h)+' H'+(x+w-30)+' Z" fill="url(#mh)" opacity=".55"/>'+
   '<path d="M'+(x+10)+' '+(y+6)+' H'+(x+w-10)+' M'+(x+10)+' '+(y+h-6)+' H'+(x+w-10)+'" stroke="var(--ink)" stroke-width="1" opacity=".5"/>';});
 s+='<path d="'+A.sacrum+'" fill="var(--wh)" stroke="var(--ink)" stroke-width="2.2"/>';
 A.ped.forEach(function(p){s+='<ellipse cx="'+p[0]+'" cy="'+p[1]+'" rx="13" ry="17" fill="var(--wh)" stroke="var(--ink)" stroke-width="2.2"/><ellipse cx="'+p[0]+'" cy="'+p[1]+'" rx="13" ry="17" fill="url(#mh)"/>';});
 s+='<path d="M44 58 H108 M44 182 H108" stroke="var(--ink)" stroke-width="1.5" stroke-dasharray="2 3"/><text x="16" y="65" font-size="22" fill="var(--ink)">L4</text><text x="16" y="189" font-size="22" fill="var(--ink)">L5</text>';
 s+='<path d="'+A.sac+'" fill="var(--pp)" stroke="var(--ink)" stroke-width="2" opacity=".96"/>';
 s+='<ellipse data-k="blob" cy="121" fill="var(--g2)" stroke="var(--ink)" stroke-width="2.2"/>';
 s+=roots(tube);
 s+='<path data-k="l5o" stroke="var(--ink)" stroke-width="8.5" fill="none" stroke-linecap="round"/><path data-k="l5i" stroke="var(--wh)" stroke-width="4.6" fill="none" stroke-linecap="round"/><path data-k="l5h" stroke="var(--red)" stroke-width="4.6" fill="none" stroke-linecap="round"/>';
 s+='<path data-k="arw" d="M196 121 H214 M208 115 L215 121 L208 127" stroke="var(--red)" stroke-width="3" fill="none" stroke-linecap="square"/>';
 s+=mk(322,100,1)+'<g data-k="m2">'+mk(266,124,2)+'</g>'+'<g data-k="m3">'+mk(199,147,3)+'</g>'+mk(180,272,4)+'</g></svg>';
 var R=mount(id,'lkm','<div class="bar"><span>Fig. 3.2</span><span>Low back · L4–L5</span></div>'+
  '<div class="hd"><h3>Posterolateral<br>disc herniation</h3><div class="sub">Posterior view. Laminae removed.</div></div>'+s+
  '<div class="tg"><button data-v="0">Intact</button><button data-v="1">Herniated</button></div>'+
  '<ol><li><span class="n">1</span><div><b>L4 root</b><span>Leaves under the L4 pedicle, above the disc. Spared.</span></div></li>'+
  '<li data-k="li2"><span class="n">2</span><div><b>L5 root</b><span>Crosses the back of the L4–L5 disc. Compressed.</span></div></li>'+
  '<li><span class="n">3</span><div><b>Herniated nucleus</b><span>Goes posterolateral, where the posterior longitudinal ligament is thinnest.</span></div></li>'+
  '<li><span class="n">4</span><div><b>Dural sac</b><span>Cauda equina inside.</span></div></li></ol>'+
  '<div class="warn"><svg viewBox="0 0 50 44" aria-hidden="true"><path d="M25 3 L47 41 H3 Z" fill="var(--yel)" stroke="#171614" stroke-width="3" stroke-linejoin="round"/><path d="M25 16 V29" stroke="#171614" stroke-width="4.5" stroke-linecap="round"/><circle cx="25" cy="35" r="2.6" fill="#171614"/></svg>'+
  '<div><div class="k">Disc L4–L5 → root L5</div><div class="d">Weak big-toe extension · numb dorsum of foot · reflexes intact</div></div></div>');
 if(!R)return;var q=function(k){return R.querySelector('[data-k='+k+']');},o={h:0};
 function draw(h){var d=P(A.L5(h));['l5o','l5i','l5h'].forEach(function(k){q(k).setAttribute('d',d);});q('l5h').style.opacity=clamp(h);setBlob(q('blob'),h);
   var on=h>0.5;q('arw').style.opacity=clamp(h*1.6-0.6);q('m2').style.opacity=on?1:.0;q('m3').style.opacity=on?1:0;q('li2').classList.toggle('hit',on);
   q('m2').querySelector('circle').setAttribute('fill',on?'var(--red)':'var(--ink)');}
 function set(v){[].forEach.call(R.querySelectorAll('.tg button'),function(b){b.classList.toggle('on',+b.dataset.v===v);});tween(o,v,700,EZ.ios,draw);}
 R.querySelector('.tg').onclick=function(e){var b=e.target.closest('button');if(b)set(+b.dataset.v);};
 draw(0);set(0);setTimeout(function(){set(1);},650);return R;};

/* =================================================================
   B · COZY — Unpacking / A Short Hike / Animal Crossing UI language
   ================================================================= */
M.look.cozy=function(id,op){op=op||{};var rich=!!op.rich;
 font(['fredoka@5/600.css','nunito@5/700.css','nunito@5/800.css']);
 css('lk-coz',`
.lkc{--bg:#FFF4DF;--dot:#F2DDB5;--ink:#5A4131;--txt:#5A4131;--mut:#9A7D66;--card:#FFFCF4;--bone:#FFE1B3;--bone2:#F8C98C;--jel:#C3E8F4;--jel2:#87CFE7;--sac:#F0DEF7;--nd:#FFD166;--ouch:#FF6B6B;--leaf:#9BD48A;--shd:#5A4131;
 font:700 15px/1.45 Nunito,system-ui,sans-serif;color:var(--txt);background:var(--bg) radial-gradient(var(--dot) 1.3px,transparent 1.6px) 0 0/18px 18px;border:3px solid var(--ink);border-radius:30px;padding:18px 16px 18px;box-shadow:0 6px 0 var(--shd);max-width:620px;-webkit-font-smoothing:antialiased}
@media (prefers-color-scheme:dark){.lkc{--bg:#2B2340;--dot:#3A3053;--ink:#17111F;--txt:#F7EBD8;--mut:#BFA9C9;--card:#3A2F52;--bone:#F1D1A2;--bone2:#E2B170;--jel:#A3D6E8;--jel2:#6CBCD9;--sac:#D9C3EA;--nd:#FFD166;--shd:#120D19}}
.lkc *{box-sizing:border-box}
.lkc .top{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
.lkc .chip{font:600 13px/1 Fredoka,sans-serif;color:#2E2418;background:var(--leaf);border:2.5px solid var(--ink);border-radius:999px;padding:6px 12px 5px;box-shadow:0 3px 0 var(--shd);transform:rotate(-2deg)}
.lkc h3{margin:12px 0 2px;font:600 28px/1.05 Fredoka,sans-serif;letter-spacing:-.01em}
.lkc .sub{color:var(--mut);font-size:14.5px}
.lkc .stage{margin-top:14px;background:var(--card);border:3px solid var(--ink);border-radius:24px;box-shadow:0 5px 0 var(--shd);padding:10px 8px 4px;position:relative}
.lkc svg{display:block;width:100%;max-width:420px;margin:0 auto;height:auto;overflow:visible}
.lkc svg text{font-family:Fredoka,sans-serif;font-weight:600}
.lkc .dsc{transform-box:fill-box;transform-origin:50% 50%}
.lkc .dsc.jig{animation:lkcJ .6s cubic-bezier(.3,1.6,.5,1)}
@keyframes lkcJ{0%{transform:scale(1,1)}30%{transform:scale(1.07,.86)}60%{transform:scale(.97,1.06)}100%{transform:scale(1,1)}}
.lkc .pop{transform-box:fill-box;transform-origin:50% 50%;transition:transform .45s cubic-bezier(.3,1.7,.5,1),opacity .2s}
.lkc .bub{margin:16px 2px 0;background:var(--card);border:3px solid var(--ink);border-radius:20px;padding:12px 14px;position:relative;box-shadow:0 4px 0 var(--shd);min-height:72px}
.lkc .bub:before{content:"";position:absolute;top:-13px;left:34px;width:20px;height:20px;background:var(--card);border-left:3px solid var(--ink);border-top:3px solid var(--ink);transform:rotate(45deg);border-radius:4px 0 0 0}
.lkc .bub b{font-family:Fredoka,sans-serif;font-weight:600;color:var(--ouch)}
.lkc .row{display:flex;gap:10px;margin-top:16px;align-items:center;flex-wrap:wrap}
.lkc .btn{font:600 17px/1 Fredoka,sans-serif;color:#2E2418;background:var(--nd);border:3px solid var(--ink);border-radius:18px;padding:13px 20px 12px;box-shadow:0 5px 0 var(--shd);cursor:pointer;transition:transform .12s,box-shadow .12s}
.lkc .btn:active{transform:translateY(4px);box-shadow:0 1px 0 var(--shd)}
.lkc .stk{font:600 14px/1.1 Fredoka,sans-serif;color:#2E2418;background:#FFF;border:2.5px dashed var(--ink);border-radius:14px;padding:9px 12px;transform:rotate(2.5deg);margin-left:auto}
.lkc .inv{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;margin-top:16px}
.lkc .slot{background:var(--card);border:3px solid var(--ink);border-radius:16px;padding:10px 8px;text-align:center;box-shadow:0 4px 0 var(--shd);font-size:13px;line-height:1.25;transition:transform .35s cubic-bezier(.3,1.6,.5,1)}
.lkc .slot i{display:block;font:600 11px/1 Fredoka,sans-serif;font-style:normal;color:var(--mut);letter-spacing:.06em;text-transform:uppercase;margin-bottom:5px}
.lkc .slot.bad{background:#FFE3E0;color:#6B2A22}.lkc .slot.bad i{color:#C4473B}
.lkc .slot.ok{background:#E6F6DF;color:#2F5A24}.lkc .slot.ok i{color:#4D8A3B}
.lkc .sl{display:grid;grid-template-columns:auto 1fr;gap:14px;align-items:center;margin-top:18px;font:600 15px/1 Fredoka,sans-serif}
.lkc input[type=range]{-webkit-appearance:none;appearance:none;width:100%;height:36px;background:transparent;margin:0}
.lkc input[type=range]::-webkit-slider-runnable-track{height:16px;border-radius:8px;background:var(--jel);border:3px solid var(--ink);box-shadow:0 3px 0 var(--shd)}
.lkc input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:32px;height:32px;border-radius:50%;background:var(--nd);border:3px solid var(--ink);box-shadow:0 3px 0 var(--shd);margin-top:-11px}
.lkc input[type=range]::-moz-range-track{height:10px;border-radius:8px;background:var(--jel);border:3px solid var(--ink)}
.lkc input[type=range]::-moz-range-thumb{width:26px;height:26px;border-radius:50%;background:var(--nd);border:3px solid var(--ink)}
.lkc .stks{display:flex;flex-wrap:wrap;gap:8px;margin-top:14px}
.lkc .sk{display:inline-flex;align-items:center;gap:7px;background:var(--card);border:2.5px solid var(--ink);border-radius:999px;padding:4px 12px 4px 5px;font-size:13px;box-shadow:0 3px 0 var(--shd)}
.lkc .sk svg{width:24px;height:24px;flex:none;display:inline-block;margin:0}
@media (prefers-reduced-motion:reduce){.lkc *{animation:none!important;transition:none!important}}`);
 function noodle(d){return '<path d="'+d+'" stroke="var(--ink)" stroke-width="11" fill="none" stroke-linecap="round"/><path d="'+d+'" stroke="var(--nd)" stroke-width="6" fill="none" stroke-linecap="round"/>';}
 function tag(x,y,w,t,col,k){return '<g '+(k?'data-k="'+k+'" class="pop"':'')+'><rect x="'+(x-w/2)+'" y="'+(y-13)+'" width="'+w+'" height="26" rx="13" fill="'+(col||'var(--card)')+'" stroke="var(--ink)" stroke-width="2.5"/><text x="'+x+'" y="'+(y+4.5)+'" text-anchor="middle" font-size="13" fill="'+(col?'#2E2418':'var(--txt)')+'">'+t+'</text></g>';}
 var s='<svg viewBox="0 -4 360 304" role="img" aria-label="Cartoon of the L4–L5 disc squishing out and pinching the L5 nerve root"><defs><filter id="cw" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency=".022" numOctaves="2" seed="7"/><feDisplacementMap in="SourceGraphic" scale="3.2"/></filter><pattern id="cspk" width="16" height="16" patternUnits="userSpaceOnUse"><circle cx="4" cy="5" r="1.4" fill="var(--bone2)"/><circle cx="12" cy="11" r="1.1" fill="var(--bone2)"/><circle cx="10" cy="2.5" r=".9" fill="var(--bone2)"/></pattern><clipPath id="cclip"><rect x="-2" y="-4" width="364" height="304" rx="18"/></clipPath></defs><g clip-path="url(#cclip)"><g filter="url(#cw)">';
 var sh='';A.disc.concat(A.body).forEach(function(r){sh+=rect([r[0],r[1]+4,r[2],r[3]],18,'fill="var(--shd)" opacity=".16"');});s+=sh;
 A.body.forEach(function(r){s+=rect(r,18,'fill="var(--bone)" stroke="var(--ink)" stroke-width="3"')+'<rect x="'+(r[0]+12)+'" y="'+(r[1]+9)+'" width="38" height="8" rx="4" fill="#fff" opacity=".6"/>';});
 s+='<path d="'+A.sacrum+'" fill="var(--bone)" stroke="var(--ink)" stroke-width="3"/>';
 if(rich){A.body.forEach(function(r){s+=rect([r[0]+4,r[1]+20,r[2]-8,r[3]-26],12,'fill="url(#cspk)"');});}
 A.disc.forEach(function(r,i){s+='<g class="dsc"'+(i===1?' data-k="dsc"':'')+'>'+rect(r,16,'fill="var(--jel)" stroke="var(--ink)" stroke-width="3"')+(i===1?'<ellipse cx="180" cy="120" rx="32" ry="9" fill="var(--jel2)"/><path d="M122 110 Q140 106 160 108" stroke="#fff" stroke-width="3.5" fill="none" stroke-linecap="round" opacity=".8"/>':'')+'</g>';});
 A.ped.forEach(function(p){s+='<ellipse cx="'+p[0]+'" cy="'+p[1]+'" rx="13" ry="17" fill="var(--bone2)" stroke="var(--ink)" stroke-width="3"/>';});
 
 s+='<path d="'+A.sac+'" fill="var(--sac)" stroke="var(--ink)" stroke-width="3"/>';
 if(rich){for(var ci=0;ci<5;ci++){var cx=164+ci*8,cd='M'+cx+' -6 C'+(cx+(ci%2?3:-3))+' 80 '+(cx+(ci%2?-3:3))+' 180 '+(cx+(ci-2)*1.5)+' 280';s+='<path d="'+cd+'" stroke="var(--ink)" stroke-width="5" fill="none" opacity=".35" stroke-linecap="round"/><path d="'+cd+'" stroke="var(--nd)" stroke-width="2.6" fill="none" opacity=".9" stroke-linecap="round"/>';}}
 s+='<ellipse data-k="blob" cy="121" fill="var(--jel2)" stroke="var(--ink)" stroke-width="3"/>';
 s+=roots(noodle);
 s+='<path data-k="l5o" stroke="var(--ink)" stroke-width="11" fill="none" stroke-linecap="round"/><path data-k="l5i" stroke="var(--nd)" stroke-width="6" fill="none" stroke-linecap="round"/><path data-k="l5h" stroke="var(--ouch)" stroke-width="6" fill="none" stroke-linecap="round"/>';
 if(rich)[[266,90,24],[94,90,-24],[94,210,-27],[266,210,27]].forEach(function(g){s+='<ellipse cx="'+g[0]+'" cy="'+g[1]+'" rx="9" ry="6.5" transform="rotate('+g[2]+' '+g[0]+' '+g[1]+')" fill="var(--nd)" stroke="var(--ink)" stroke-width="2.5"/>';});
 s+='</g><g data-k="zap" class="pop"><path d="M252 104 l9 -7 M256 121 h11 M252 138 l9 7" stroke="var(--ouch)" stroke-width="3.5" stroke-linecap="round"/></g>';
 s+=tag(36,58,44,'L4')+tag(36,182,44,'L5')+tag(306,66,92,'L4 left above')+tag(300,168,96,'L5 pinched!','#FFB3AC','t5')+'</g></svg>';
 var R=mount(id,'lkc','<div class="top"><span class="chip">Squish lab</span></div><h3>Who gets squished?</h3><div class="sub">Pop the L4–L5 disc out the back and watch which noodle it pinches.</div>'+
  '<div class="stage">'+s+'</div>'+(rich?'<div class="stks"><span class="sk"><svg viewBox="0 0 24 24"><path d="M2 16 C8 13 16 11 22 8" stroke="#5A4131" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M2 16 C8 13 16 11 22 8" stroke="#FFD166" stroke-width="3" fill="none" stroke-linecap="round"/><ellipse cx="12" cy="12" rx="5" ry="3.6" transform="rotate(-18 12 12)" fill="#FFD166" stroke="#5A4131" stroke-width="2"/></svg>Bead = DRG</span><span class="sk"><svg viewBox="0 0 24 24"><rect x="5" y="1" width="14" height="22" rx="7" fill="#F0DEF7" stroke="#5A4131" stroke-width="2"/><path d="M9 3v18M12 3v18M15 3v18" stroke="#E8A93A" stroke-width="1.6"/></svg>Cauda equina</span><span class="sk"><svg viewBox="0 0 24 24"><ellipse cx="12" cy="13" rx="9" ry="7" fill="#87CFE7" stroke="#5A4131" stroke-width="2"/><path d="M7 11 Q9 9 12 9" stroke="#fff" stroke-width="1.8" fill="none" stroke-linecap="round"/></svg>Jelly = nucleus pulposus</span></div>':'')+'<div class="bub" data-k="bub"></div>'+
  (rich?'<div class="sl"><span>How far out?</span><input type="range" min="0" max="100" value="0" aria-label="How far the disc squishes out"></div>':'')+'<div class="row"><button class="btn" data-k="go">Squish it!</button><span class="stk">Disc X–Y → root Y</span></div>'+
  '<div class="inv"><div class="slot" data-k="s1"><i>Big toe up</i>strong</div><div class="slot" data-k="s2"><i>Top of foot</i>feels fine</div><div class="slot ok" data-k="s3"><i>Reflexes</i>all fine</div></div>');
 if(!R)return;var q=function(k){return R.querySelector('[data-k='+k+']');},o={h:0},v=0,rg=R.querySelector('.sl input');
 function draw(h){var d=P(A.L5(h));['l5o','l5i','l5h'].forEach(function(k){q(k).setAttribute('d',d);});q('l5h').style.opacity=clamp(h);setBlob(q('blob'),h);if(rg&&!rg.busy)rg.value=Math.round(clamp(h)*100);
   var on=h>0.55;[q('zap'),q('t5')].forEach(function(g){g.style.opacity=on?1:0;g.style.transform=on?'scale(1)':'scale(.4)';});}
 function say(){q('bub').innerHTML=v?'Ouch! <b>L5</b> gets pinched. It’s the noodle that <u>crosses</u> the disc. L4 already slipped out through the door above.':'Everyone’s comfy. Each noodle leaves under its own bone, right below the pedicle.';
   q('go').textContent=v?'Tuck it back':'Squish it!';q('s1').className='slot'+(v?' bad':'');q('s1').innerHTML='<i>Big toe up</i>'+(v?'weak':'strong');q('s2').className='slot'+(v?' bad':'');q('s2').innerHTML='<i>Top of foot</i>'+(v?'numb':'feels fine');}
 q('go').onclick=function(){v=v?0:1;say();var dc=q('dsc');dc.classList.remove('jig');void dc.getBBox;void dc.offsetWidth;dc.classList.add('jig');tween(o,v,850,v?EZ.back:EZ.ios,draw);};
 if(rg){rg.oninput=function(){rg.busy=1;cancelAnimationFrame(o.raf);o.h=rg.value/100;var nv=o.h>.55?1:0;if(nv!==v){v=nv;say();}draw(o.h);rg.busy=0;};}
 draw(0);say();return R;};

/* =================================================================
   C · ATLAS PLATE — anatomical plate × editorial (Netter lineage, Awwwards type)
   ================================================================= */
M.look.atlas=function(id,op){op=op||{};var play=!!op.play;
 font(['instrument-serif@5/400.css','instrument-serif@5/400-italic.css','ibm-plex-mono@5/400.css','ibm-plex-mono@5/500.css']);
 css('lk-atl',`
.lka{--pp:#F2EEE4;--ink:#1D1B17;--ink2:#6F695E;--hair:rgba(29,27,23,.22);--bone:#EAE2D2;--bone2:#DDD2BC;--disc:#DCE0E0;--nuc:#B4C6CE;--sac:rgba(112,146,166,.2);--sacl:#6C8797;--nv:#E2B243;--nvl:#8D6B1E;--path:#C4432B;
 font:400 13px/1.55 "IBM Plex Mono",ui-monospace,monospace;color:var(--ink);background:var(--pp);padding:18px 18px 16px;max-width:680px;-webkit-font-smoothing:antialiased}
@media (prefers-color-scheme:dark){.lka{--pp:#12110F;--ink:#ECE6DA;--ink2:#9C9587;--hair:rgba(236,230,218,.2);--bone:#27241F;--bone2:#34302A;--disc:#2A3134;--nuc:#4A6572;--sac:rgba(112,146,166,.16);--sacl:#8FAABA;--nv:#D6A536;--nvl:#F1D27E;--path:#E65B40}}
.lka *{box-sizing:border-box}
.lka .rule{display:flex;justify-content:space-between;gap:12px;font-size:10.5px;letter-spacing:.14em;text-transform:uppercase;color:var(--ink2);padding-bottom:9px;border-bottom:1px solid var(--hair)}
.lka h3{margin:18px 0 6px;font:400 38px/1.02 "Instrument Serif",Georgia,serif;letter-spacing:-.012em;max-width:15ch}
.lka h3 em{font-style:italic;color:var(--path)}
.lka .grid{display:grid;grid-template-columns:minmax(0,1.25fr) minmax(0,1fr);gap:22px;align-items:start;margin-top:10px}
@media (max-width:560px){.lka .grid{grid-template-columns:minmax(0,1fr);gap:8px}}
.lka svg{display:block;width:100%;height:auto}
.lka svg .lt{font:italic 400 17px "Instrument Serif",Georgia,serif;fill:var(--ink);paint-order:stroke;stroke:var(--pp);stroke-width:4px;stroke-linejoin:round}
.lka svg .lm{font:500 8.5px "IBM Plex Mono",monospace;letter-spacing:.12em;fill:var(--ink2)}
.lka dl{margin:6px 0 0;display:grid;grid-template-columns:22px 1fr;row-gap:9px;column-gap:6px}
.lka dt{font:italic 400 19px/1 "Instrument Serif",Georgia,serif;padding-top:1px;transition:color .3s}
.lka dd{margin:0;font-size:12px;line-height:1.45;color:var(--ink2)}
.lka dd b{font-weight:500;color:var(--ink);display:block;letter-spacing:.02em;transition:color .3s}
.lka dt.hit,.lka dt.hit+dd b{color:var(--path)}
.lka .scrub{display:grid;grid-template-columns:auto 1fr auto;gap:12px;align-items:center;margin-top:14px;padding-top:12px;border-top:1px solid var(--hair);font-size:10.5px;letter-spacing:.14em;text-transform:uppercase;color:var(--ink2)}
.lka .scrub output{font-variant-numeric:tabular-nums;color:var(--ink);min-width:3.2em;text-align:right}
.lka input[type=range]{-webkit-appearance:none;appearance:none;width:100%;height:22px;background:transparent;margin:0}
.lka input[type=range]::-webkit-slider-runnable-track{height:1px;background:var(--ink)}
.lka input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:13px;height:13px;border-radius:50%;background:var(--ink);border:3px solid var(--pp);box-shadow:0 0 0 1px var(--ink);margin-top:-6px}
.lka input[type=range]::-moz-range-track{height:1px;background:var(--ink)}
.lka input[type=range]::-moz-range-thumb{width:9px;height:9px;border-radius:50%;background:var(--ink);border:3px solid var(--pp);box-shadow:0 0 0 1px var(--ink)}
.lka .out{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));margin-top:14px;border-top:1px solid var(--hair);border-bottom:1px solid var(--hair)}
.lka .out div{padding:10px 10px 10px 0;font-size:12px;line-height:1.4}
.lka .out div+div{padding-left:10px;border-left:1px solid var(--hair)}
.lka .out i{display:block;font-style:normal;font-size:9.5px;letter-spacing:.14em;text-transform:uppercase;color:var(--ink2);margin-bottom:3px}
.lka .fn{display:flex;justify-content:space-between;gap:12px;align-items:baseline;margin-top:12px;flex-wrap:wrap}
.lka .fn q{font:italic 400 20px/1.2 "Instrument Serif",Georgia,serif;quotes:none}
.lka .fn span{font-size:9.5px;letter-spacing:.14em;text-transform:uppercase;color:var(--ink2)}
.lka{--card:#FFFDF8}@media (prefers-color-scheme:dark){.lka{--card:#1C1A17}}
.lka .ctl{display:flex;align-items:center;gap:14px;margin-top:16px;flex-wrap:wrap}
.lka .ctl span{font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--ink2)}
.lka .sw{display:inline-grid;grid-template-columns:1fr 1fr;border:1.5px solid var(--ink);border-radius:14px;overflow:hidden;box-shadow:0 3px 0 var(--ink);transition:transform .12s,box-shadow .12s}
.lka .sw:active{transform:translateY(2px);box-shadow:0 1px 0 var(--ink)}
.lka .sw button{font:500 11px/1 "IBM Plex Mono",monospace;letter-spacing:.14em;text-transform:uppercase;padding:13px 16px;border:0;background:var(--card);color:var(--ink);cursor:pointer;transition:background .2s,color .2s}
.lka .sw button+button{border-left:1.5px solid var(--ink)}.lka .sw button.on{background:var(--ink);color:var(--pp)}
.lka .note{position:relative;margin-top:18px;background:var(--card);border:1.5px solid var(--ink);border-radius:16px;padding:12px 15px 13px;font:400 20px/1.28 "Instrument Serif",Georgia,serif;box-shadow:0 3px 0 var(--ink);min-height:74px}
.lka .note:before{content:"";position:absolute;top:-9px;left:32px;width:15px;height:15px;background:var(--card);border-left:1.5px solid var(--ink);border-top:1.5px solid var(--ink);transform:rotate(45deg);border-radius:3px 0 0 0}
.lka .note em{color:var(--path)}
.lka .tiles{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;margin-top:16px}
.lka .tile{border:1.5px solid var(--ink);border-radius:14px;padding:10px 10px 11px;background:var(--card);box-shadow:0 3px 0 var(--ink);transition:background .35s}
.lka .tile i{display:block;font-style:normal;font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:var(--ink2);margin-bottom:5px}
.lka .tile b{font:400 19px/1.1 "Instrument Serif",Georgia,serif;transition:color .35s}
.lka .tile.bad{background:color-mix(in srgb,var(--path) 12%,var(--card))}.lka .tile.bad b{color:var(--path)}`);
 var st='',tb='',i,rs=[7,3,11,9,2,13,5,12,8,1,10,4,6,13,3,9];for(i=0;i<8;i++)st+='<circle cx="'+rs[i]+'" cy="'+rs[i+8]+'" r=".55" fill="var(--ink)" opacity=".42"/>';
 [[3,3,2,1.4],[9,4,1.6,2.2],[6,9,2.2,1.5],[12,11,1.5,1.9],[2,12,1.7,1.4]].forEach(function(e){tb+='<ellipse cx="'+e[0]+'" cy="'+e[1]+'" rx="'+e[2]+'" ry="'+e[3]+'" fill="none" stroke="var(--ink)" stroke-width=".45" opacity=".6"/>';});
 function nerve(d){return '<path d="'+d+'" stroke="var(--nvl)" stroke-width="5" fill="none" stroke-linecap="round"/><path d="'+d+'" stroke="var(--nv)" stroke-width="3.3" fill="none" stroke-linecap="round"/>';}
 function drg(x,y,r){return '<ellipse cx="'+x+'" cy="'+y+'" rx="7.5" ry="4.6" transform="rotate('+r+' '+x+' '+y+')" fill="var(--nv)" stroke="var(--nvl)" stroke-width=".9"/>';}
 function lead(x1,y1,x2,y2,L,k){return '<g'+(k?' data-k="'+k+'"':'')+'><circle cx="'+x1+'" cy="'+y1+'" r="1.8" fill="var(--ink)"/><path d="M'+x1+' '+y1+' L'+x2+' '+y2+'" stroke="var(--ink)" stroke-width=".6"/><text class="lt" x="'+(x2+(x2>=x1?3:-3))+'" y="'+(y2+5)+'" text-anchor="'+(x2>=x1?'start':'end')+'">'+L+'</text></g>';}
 var s='<svg viewBox="0 -4 360 304" role="img" aria-label="Anatomical plate: posterior view of L4 and L5, laminae removed, with a posterolateral L4–L5 herniation compressing the L5 nerve"><defs>'+
  '<pattern id="ast" width="14" height="14" patternUnits="userSpaceOnUse">'+st+'</pattern><pattern id="atb" width="15" height="15" patternUnits="userSpaceOnUse">'+tb+'</pattern>'+
  '<radialGradient id="ang" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="var(--nuc)"/><stop offset="1" stop-color="var(--nuc)" stop-opacity="0"/></radialGradient><clipPath id="aclip"><rect x="0" y="-4" width="360" height="304"/></clipPath></defs><g clip-path="url(#aclip)">';
 A.disc.forEach(function(r){var x=r[0],y=r[1],w=r[2],h=r[3];s+=rect(r,15,'fill="var(--disc)" stroke="var(--ink)" stroke-width=".9"');for(var k=1;k<=3;k++)s+=rect([x+k*4.5,y+k*2.6,w-k*9,h-k*5.2],Math.max(4,15-k*3),'fill="none" stroke="var(--ink)" stroke-width=".4" opacity=".35"');});
 s+='<ellipse cx="180" cy="120" rx="42" ry="12" fill="url(#ang)"/>';
 A.body.forEach(function(r){s+=rect(r,12,'fill="var(--bone)"')+rect(r,12,'fill="url(#ast)"')+rect(r,12,'fill="none" stroke="var(--ink)" stroke-width="1.1"')+rect([r[0]+3.5,r[1]+3.5,r[2]-7,r[3]-7],9,'fill="none" stroke="var(--ink)" stroke-width=".45" opacity=".55"');});
 s+='<path d="'+A.sacrum+'" fill="var(--bone)" stroke="var(--ink)" stroke-width="1.1"/><path d="'+A.sacrum+'" fill="url(#ast)"/>';
 A.ped.forEach(function(p){s+='<ellipse cx="'+p[0]+'" cy="'+p[1]+'" rx="13" ry="17" fill="var(--bone2)"/><ellipse cx="'+p[0]+'" cy="'+p[1]+'" rx="13" ry="17" fill="url(#atb)" stroke="var(--ink)" stroke-width="1.1"/><ellipse cx="'+p[0]+'" cy="'+p[1]+'" rx="9.5" ry="13.5" fill="none" stroke="var(--ink)" stroke-width=".4" opacity=".6"/>';});
 s+='<text class="lm" x="16" y="61">L4</text><text class="lm" x="16" y="185">L5</text><text class="lm" x="16" y="289">S1</text><path d="M34 58 H104 M34 182 H104 M34 286 H112" stroke="var(--ink)" stroke-width=".4" stroke-dasharray="1 2.5" opacity=".6"/>';
 s+='<path d="'+A.sac+'" fill="var(--sac)" stroke="var(--sacl)" stroke-width=".9"/>';
 for(i=0;i<7;i++){var fx=160+i*6.6;s+='<path d="M'+fx+' -6 C'+(fx+(i%2?1.5:-1.5))+' 90 '+(fx+(i%2?-1.2:1.2))+' 190 '+(fx+(i-3)*1.1)+' 284" stroke="var(--nv)" stroke-width=".8" fill="none" opacity=".75"/>';}
 s+='<ellipse data-k="blob" cy="121" fill="var(--nuc)" stroke="var(--ink)" stroke-width=".9"/>';
 s+=roots(nerve)+drg(266,90,24)+drg(94,90,-24)+drg(94,210,-27)+drg(266,210,27);
 s+='<path data-k="l5o" stroke="var(--nvl)" stroke-width="5" fill="none" stroke-linecap="round"/><path data-k="l5i" stroke="var(--nv)" stroke-width="3.3" fill="none" stroke-linecap="round"/><path data-k="l5h" stroke="var(--path)" stroke-width="3.3" fill="none" stroke-linecap="round"/>';
 s+=lead(304,106,324,82,'A')+'<g data-k="lb">'+lead(238,127,288,152,'B')+'</g>'+'<g data-k="lc">'+lead(216,129,198,160,'C')+'</g>'+lead(176,248,176,248,'')+'<text class="lt" x="170" y="270">D</text>'+lead(112,40,84,26,'E')+lead(114,130,82,150,'F')+'</g></svg>';
 var R=mount(id,'lka','<div class="rule"><span>Plate 04</span><span>Lumbar spine · posterior view</span></div>'+
  '<h3>The root that <em>crosses</em> the disc is the one that pays.</h3>'+
  '<div class="grid"><div>'+s+'</div><div><dl>'+
  '<dt>A</dt><dd><b>L4 spinal nerve</b>Leaves under the L4 pedicle, above the disc. Spared.</dd>'+
  '<dt data-k="kb">B</dt><dd><b>L5 spinal nerve</b>Descends across the L4–L5 disc. Compressed.</dd>'+
  '<dt>C</dt><dd><b>Nucleus pulposus</b>Herniated posterolaterally, where the posterior longitudinal ligament is thin.</dd>'+
  '<dt>D</dt><dd><b>Dural sac</b>Cauda equina.</dd><dt>E</dt><dd><b>Pedicle</b>Cut.</dd><dt>F</dt><dd><b>Annulus fibrosus</b>L4–L5.</dd></dl></div></div>'+
  (play?'<div class="ctl"><div class="sw"><button data-v="0">Intact</button><button data-v="1">Herniated</button></div><span>Tap to compare</span></div><div class="note" data-k="note"></div><div class="tiles"><div class="tile" data-k="t1"></div><div class="tile" data-k="t2"></div><div class="tile" data-k="t3"></div></div>':'<div class="scrub"><span>Protrusion</span><input type="range" min="0" max="100" value="0" aria-label="Protrusion"><output>0.00</output></div>'+
  '<div class="out"><div><i>Weakness</i>Extensor hallucis longus</div><div><i>Sensory</i>Dorsum of foot</div><div><i>Reflex</i>None lost</div></div>')+
  '<div class="fn"><q>Disc X–Y compresses root Y.</q><span>Spinal cord deck · s24–27</span></div>');
 if(!R)return;var q=function(k){return R.querySelector('[data-k='+k+']');},o={h:0},rg=R.querySelector('input'),out=R.querySelector('output');
 function draw(h){var d=P(A.L5(h));['l5o','l5i','l5h'].forEach(function(k){q(k).setAttribute('d',d);});q('l5h').style.opacity=clamp(h*1.3-.15);setBlob(q('blob'),h);
   q('lb').style.opacity=clamp(h*2-.6);q('lc').style.opacity=clamp(h*2-.4);q('kb').classList.toggle('hit',h>.5);if(rg){rg.value=Math.round(h*100);out.textContent=clamp(h).toFixed(2);R.querySelector('.out').style.opacity=.35+.65*clamp(h);}}
 if(rg)rg.oninput=function(){cancelAnimationFrame(o.raf);o.h=rg.value/100;draw(o.h);};
 function set(v){[].forEach.call(R.querySelectorAll('.sw button'),function(b){b.classList.toggle('on',+b.dataset.v===v);});
   q('note').innerHTML=v?'<em>B</em> crosses the back of the disc, so <em>B</em> takes the hit. <em>A</em> already left, above it.':'Each nerve leaves under its own pedicle. The L4–L5 disc sits between <em>A</em> and <em>B</em>.';
   [['t1','Big-toe extension',v?'Weak':'Normal'],['t2','Dorsum of foot',v?'Numb':'Normal'],['t3','Reflexes','Intact']].forEach(function(t,i){var el=q(t[0]);el.className='tile'+(v&&i<2?' bad':'');el.innerHTML='<i>'+t[1]+'</i><b>'+t[2]+'</b>';});
   tween(o,v,v?900:600,v?EZ.back:EZ.ios,draw);}
 if(play)R.querySelector('.sw').onclick=function(e){var b=e.target.closest('button');if(b)set(+b.dataset.v);};
 draw(0);if(play)set(0);var go=function(){if(play)set(1);else tween(o,1,1800,EZ.ios,draw);};
 if('IntersectionObserver' in window){var io=new IntersectionObserver(function(e){if(e[0].isIntersecting){io.disconnect();setTimeout(go,300);}},{threshold:.4});io.observe(R);}else go();
 return R;};
/* =================================================================
   B+C · SKETCHBOOK — naturalist field journal: atlas accuracy, cozy warmth
   ================================================================= */
M.look.sketch=function(id){
 font(['instrument-serif@5/400.css','instrument-serif@5/400-italic.css','nunito@5/600.css','nunito@5/800.css']);
 css('lk-skt',`
.lks{--pp:#FBF5E8;--grid:rgba(96,72,48,.075);--ink:#3A2E25;--txt:#3A2E25;--mut:#8C7866;--card:#FFFDF8;--bone:#F1D3A6;--disc:#B9DCE8;--nuc:#86C3DA;--sac:#E4D1EF;--nv:#E9B246;--hurt:#E35D45;--shd:#3A2E25;--okc:#E4F3DC;--okt:#3E6B30;
 font:600 15px/1.5 Nunito,system-ui,sans-serif;color:var(--txt);background:var(--pp);border:2px solid var(--ink);border-radius:24px;padding:18px 16px 16px;box-shadow:0 4px 0 var(--shd);max-width:640px;-webkit-font-smoothing:antialiased}
@media (prefers-color-scheme:dark){.lks{--pp:#1F1A16;--grid:rgba(240,224,200,.05);--ink:#E9DDC9;--txt:#EFE4D2;--mut:#A99884;--card:#2A241F;--bone:#6E5A40;--disc:#3D6474;--nuc:#5F9BB2;--sac:#574869;--nv:#DBA63C;--hurt:#F06C52;--shd:#0B0908;--okc:#24331F;--okt:#A8D596}}
.lks *{box-sizing:border-box}
.lks .eb{font:800 11px/1 Nunito,sans-serif;letter-spacing:.14em;text-transform:uppercase;color:var(--mut)}
.lks h3{margin:8px 0 2px;font:400 36px/1.02 "Instrument Serif",Georgia,serif;letter-spacing:-.01em}
.lks h3 em{color:var(--hurt)}
.lks .stage{margin-top:14px;border:2px solid var(--ink);border-radius:18px;background:var(--card) linear-gradient(var(--grid) 1px,transparent 1px) 0 0/22px 22px,linear-gradient(90deg,var(--grid) 1px,transparent 1px) 0 0/22px 22px;padding:8px 6px 2px;box-shadow:0 3px 0 var(--shd)}
.lks svg{display:block;width:100%;max-width:430px;margin:0 auto;height:auto}
.lks svg .lt{font:italic 400 19px "Instrument Serif",Georgia,serif;fill:var(--txt);paint-order:stroke;stroke:var(--card);stroke-width:4.5px;stroke-linejoin:round}
.lks svg .lv{font:800 11px Nunito,sans-serif;letter-spacing:.1em;fill:var(--mut)}
.lks .key{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px 16px;margin-top:14px}
@media (max-width:420px){.lks .key{grid-template-columns:minmax(0,1fr)}}
.lks .key div{display:grid;grid-template-columns:22px 1fr;gap:6px;font-size:13.5px;line-height:1.35;color:var(--mut)}
.lks .key b{font:italic 400 21px/1 "Instrument Serif",Georgia,serif;color:var(--txt);transition:color .3s}
.lks .key span b{font:800 13.5px/1.35 Nunito,sans-serif;display:block;color:var(--txt)}
.lks .key .hit>b,.lks .key .hit span b{color:var(--hurt)}
.lks .ctl{display:flex;gap:12px;align-items:center;margin-top:16px}
.lks .btn{font:800 15px/1 Nunito,sans-serif;color:#2E2418;background:var(--nv);border:2px solid var(--ink);border-radius:14px;padding:12px 18px;box-shadow:0 3px 0 var(--shd);cursor:pointer;transition:transform .12s,box-shadow .12s}
.lks .btn:active{transform:translateY(3px);box-shadow:0 0 0 var(--shd)}
.lks .bub{flex:1;position:relative;background:var(--card);border:2px solid var(--ink);border-radius:16px;padding:10px 13px;font:400 18px/1.25 "Instrument Serif",Georgia,serif;min-height:64px;display:flex;align-items:center}
.lks .bub:before{content:"";position:absolute;left:-8px;top:50%;width:13px;height:13px;margin-top:-7px;background:var(--card);border-left:2px solid var(--ink);border-bottom:2px solid var(--ink);transform:rotate(45deg);border-radius:0 0 0 3px}
.lks .bub em{color:var(--hurt)}
.lks .tiles{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;margin-top:14px}
.lks .tile{border:2px solid var(--ink);border-radius:14px;padding:9px 10px 10px;background:var(--card);box-shadow:0 3px 0 var(--shd);transition:background .35s,transform .4s cubic-bezier(.3,1.6,.5,1)}
.lks .tile i{display:block;font:800 10px/1.1 Nunito,sans-serif;font-style:normal;letter-spacing:.1em;text-transform:uppercase;color:var(--mut);margin-bottom:4px}
.lks .tile b{font:400 20px/1.05 "Instrument Serif",Georgia,serif}
.lks .tile.bad{background:color-mix(in srgb,var(--hurt) 13%,var(--card));transform:rotate(-1.5deg)}.lks .tile.bad b{color:var(--hurt)}
.lks .tile.ok{background:var(--okc)}.lks .tile.ok b{color:var(--okt)}
@media (prefers-reduced-motion:reduce){.lks *{transition:none!important}}`);
 function fills(){var f='';A.disc.forEach(function(r){f+=rect(r,15,'fill="var(--disc)"');});f+='<ellipse cx="180" cy="120" rx="34" ry="10" fill="var(--nuc)"/>';
   A.body.forEach(function(r){f+=rect(r,13,'fill="var(--bone)"');});f+='<path d="'+A.sacrum+'" fill="var(--bone)"/>';A.ped.forEach(function(p){f+='<ellipse cx="'+p[0]+'" cy="'+p[1]+'" rx="13" ry="17" fill="var(--bone)"/>';});
   f+='<path d="'+A.sac+'" fill="var(--sac)"/>';return f;}
 function lines(){var l='';A.disc.forEach(function(r){l+=rect(r,15,'');l+=rect([r[0]+6,r[1]+4,r[2]-12,r[3]-8],10,'stroke-width=".7" opacity=".5"');});
   A.body.forEach(function(r){var x=r[0],y=r[1],w=r[2],h=r[3];l+=rect(r,13,'')+'<path d="M'+(x+w-6)+' '+(y+16)+' l-10 10 M'+(x+w-6)+' '+(y+28)+' l-14 14 M'+(x+w-6)+' '+(y+40)+' l-14 14 M'+(x+w-6)+' '+(y+52)+' l-12 12" stroke-width=".8" opacity=".55"/>';});
   l+='<path d="'+A.sacrum+'"/>';A.ped.forEach(function(p){l+='<ellipse cx="'+p[0]+'" cy="'+p[1]+'" rx="13" ry="17"/><path d="M'+(p[0]-6)+' '+(p[1]-6)+' l12 12 M'+(p[0]-7)+' '+(p[1]+3)+' l9 9 M'+(p[0]-2)+' '+(p[1]-11)+' l9 9" stroke-width=".7" opacity=".6"/>';});
   l+='<path d="'+A.sac+'"/>';return l;}
 function nerve(d){return '<path d="'+d+'" stroke="var(--ink)" stroke-width="6.5" fill="none" stroke-linecap="round"/><path d="'+d+'" stroke="var(--nv)" stroke-width="3.8" fill="none" stroke-linecap="round"/>';}
 function lead(x1,y1,x2,y2,L){return '<circle cx="'+x1+'" cy="'+y1+'" r="2" fill="var(--ink)"/><path d="M'+x1+' '+y1+' Q'+((x1+x2)/2+6)+' '+((y1+y2)/2-6)+' '+x2+' '+y2+'" stroke="var(--ink)" stroke-width=".9" fill="none"/><text class="lt" x="'+(x2+(x2>=x1?3:-3))+'" y="'+(y2+6)+'" text-anchor="'+(x2>=x1?'start':'end')+'">'+L+'</text>';}
 var s='<svg viewBox="0 -4 360 304" role="img" aria-label="Field-journal sketch: posterior view of L4 and L5 with a posterolateral herniation pinching the L5 nerve"><defs>'+
  '<filter id="swash" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency=".05" numOctaves="2" seed="11" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="5"/><feGaussianBlur stdDeviation=".9"/></filter>'+
  '<filter id="sline" x="-3%" y="-3%" width="106%" height="106%"><feTurbulence type="fractalNoise" baseFrequency=".03" numOctaves="2" seed="4"/><feDisplacementMap in="SourceGraphic" scale="2.4"/></filter>'+
  '<clipPath id="sclip"><rect x="0" y="-4" width="360" height="304"/></clipPath></defs><g clip-path="url(#sclip)">';
 s+='<g filter="url(#swash)" opacity=".5" transform="translate(2.5 2)">'+fills()+'</g><g opacity=".9">'+fills()+'</g>';
 for(var i=0;i<6;i++){var fx=162+i*7.2;s+='<path d="M'+fx+' -6 C'+(fx+(i%2?2:-2))+' 90 '+(fx+(i%2?-2:2))+' 190 '+(fx+(i-2.5)*1.3)+' 284" stroke="var(--nv)" stroke-width="1.3" fill="none" opacity=".8"/>';}
 s+='<g filter="url(#sline)" fill="none" stroke="var(--ink)" stroke-width="1.6" stroke-linejoin="round">'+lines()+'</g>';
 s+='<text class="lv" x="14" y="62">L4</text><text class="lv" x="14" y="186">L5</text><path d="M36 58 H104 M36 182 H104" stroke="var(--ink)" stroke-width=".8" stroke-dasharray="1.5 3" opacity=".5"/>';
 s+='<ellipse data-k="blob" cy="121" fill="var(--nuc)" stroke="var(--ink)" stroke-width="1.6"/>';
 s+=roots(nerve)+[[266,90,24],[94,90,-24],[94,210,-27],[266,210,27]].map(function(g){return '<ellipse cx="'+g[0]+'" cy="'+g[1]+'" rx="8" ry="5.2" transform="rotate('+g[2]+' '+g[0]+' '+g[1]+')" fill="var(--nv)" stroke="var(--ink)" stroke-width="1.4"/>';}).join('');
 s+='<path data-k="l5o" stroke="var(--ink)" stroke-width="6.5" fill="none" stroke-linecap="round"/><path data-k="l5i" stroke="var(--nv)" stroke-width="3.8" fill="none" stroke-linecap="round"/><path data-k="l5h" stroke="var(--hurt)" stroke-width="3.8" fill="none" stroke-linecap="round"/>';
 s+='<g data-k="zap" style="transition:opacity .25s"><path d="M252 104 l8 -6 M255 121 h10 M252 138 l8 6" stroke="var(--hurt)" stroke-width="2.4" stroke-linecap="round"/></g>';
 s+=lead(306,105,326,80,'A')+'<g data-k="lb" style="transition:opacity .3s">'+lead(240,150,292,166,'B')+'</g><g data-k="lc" style="transition:opacity .3s">'+lead(214,130,196,162,'C')+'</g>'+lead(170,236,128,240,'D')+'</g></svg>';
 var R=mount(id,'lks','<div class="eb">Field notes · Low back</div><h3>Which root gets <em>pinched</em>?</h3>'+
  '<div class="stage">'+s+'</div>'+
  '<div class="key"><div><b>A</b><span><b>L4 root</b>Leaves under its pedicle, above the disc</span></div><div data-k="kb"><b>B</b><span><b>L5 root</b>Crosses the back of the L4–L5 disc</span></div>'+
  '<div><b>C</b><span><b>Nucleus pulposus</b>Slips out posterolaterally</span></div><div><b>D</b><span><b>Cauda equina</b>Inside the dural sac</span></div></div>'+
  '<div class="ctl"><button class="btn" data-k="go">Pinch it</button><div class="bub" data-k="bub"></div></div>'+
  '<div class="tiles"><div class="tile" data-k="t1"></div><div class="tile" data-k="t2"></div><div class="tile ok" data-k="t3"></div></div>');
 if(!R)return;var q=function(k){return R.querySelector('[data-k='+k+']');},o={h:0},v=0;
 function draw(h){var d=P(A.L5(h));['l5o','l5i','l5h'].forEach(function(k){q(k).setAttribute('d',d);});q('l5h').style.opacity=clamp(h);setBlob(q('blob'),h);
   var on=h>.55;q('zap').style.opacity=on?1:0;q('lb').style.opacity=on?1:.25;q('lc').style.opacity=on?1:0;q('kb').classList.toggle('hit',on);}
 function say(){q('bub').innerHTML=v?'<span><em>B</em> crosses the disc, so <em>B</em> gets pinched. <em>A</em> already left above.</span>':'<span>Every root leaves under its own pedicle. Now slip the disc.</span>';
   q('go').textContent=v?'Tuck it back':'Pinch it';
   [['t1','Big-toe extension',v?'Weak':'Normal'],['t2','Top of foot',v?'Numb':'Normal'],['t3','Reflexes','Intact']].forEach(function(t,i){var el=q(t[0]);el.className='tile'+(i===2?' ok':v?' bad':'');el.innerHTML='<i>'+t[1]+'</i><b>'+t[2]+'</b>';});}
 q('go').onclick=function(){v=v?0:1;say();tween(o,v,v?900:600,v?EZ.back:EZ.ios,draw);};
 draw(0);say();return R;};
M.look.v='0.2';
})();
