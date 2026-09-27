/* _claude card engine v1 — answer + feedback cards for Claude study widgets.
   Usage in a widget:
   <div id="x"></div>
   <script src="https://cdn.jsdelivr.net/gh/yinkev/_claude@v1.0.0/cards/card.js"></script>
   <script>MUA.answer('x',{qid:'Q1',label:'Q1 · topic',stem:'...',opts:['A text','B text','C text','D text','E text']})</script>
   <script>MUA.feedback('y',{quote:'...',who:'Lecturer · L00 00:00',traps:[{h:'<u class="bz">fact</u>. reason',k:1},{h:'...',p:1}],note:'',hook:{lab:'THE HOOK',html:'...'},src:'L00 ...'})</script>
   No personal data lives here. */
(function(){
if(window.MUA)return;
var CSS=`
.mua{--mua-t1:#E1F5EE;--mua-t1f:#085041;--mua-t1d:#0F6E56;--mua-t2:#EEEDFE;--mua-t2f:#3C3489;--mua-t3:#FAECE7;--mua-t3f:#712B13;--mua-t3d:#993C1D;--mua-hl:#9FE1CB;--mua-bz:rgba(226,75,74,.7)}
[data-mode="dark"] .mua{--mua-t1:#04342C;--mua-t1f:#9FE1CB;--mua-t1d:#5DCAA5;--mua-t2:#26215C;--mua-t2f:#CECBF6;--mua-t3:#4A1B0C;--mua-t3f:#F5C4B3;--mua-t3d:#F0997B;--mua-hl:#0F6E56;--mua-bz:rgba(240,149,149,.8)}
@media (prefers-color-scheme:dark){:root:not([data-mode]) .mua{--mua-t1:#04342C;--mua-t1f:#9FE1CB;--mua-t1d:#5DCAA5;--mua-t2:#26215C;--mua-t2f:#CECBF6;--mua-t3:#4A1B0C;--mua-t3f:#F5C4B3;--mua-t3d:#F0997B;--mua-hl:#0F6E56;--mua-bz:rgba(240,149,149,.8)}}
.mua *{box-sizing:border-box;-webkit-tap-highlight-color:transparent}
.mua button{font-family:inherit;touch-action:manipulation;cursor:pointer;margin:0}
.mua .sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap}
.mua-ac{padding-bottom:28px}
.mua-ac .q{border-radius:12px;padding:14px 16px;font-size:15px;line-height:1.7;background:var(--surface-1);border:0.5px solid var(--border);color:var(--text-primary)}
.mua-ac .ql{font-size:12px;color:var(--text-secondary);margin-bottom:6px}
.mua-ac .rv{display:inline-flex;align-items:center;gap:6px;margin-top:10px;padding:7px 14px!important;border-radius:999px!important;border:0.5px solid var(--border-strong)!important;background:var(--surface-2)!important;color:var(--text-primary)!important;font-size:13px!important;box-shadow:none!important;transition:opacity .2s,transform .2s cubic-bezier(.32,.72,0,1)}
.mua-ac .rv:active{transform:scale(.97)}
.mua-ac .rv.gone{opacity:0;transform:scale(.96);pointer-events:none}
.mua-ac .ls{overflow:hidden;max-height:0;opacity:0;transition:max-height .45s cubic-bezier(.2,.8,.2,1),opacity .3s ease}
.mua-ac .ls.open{opacity:1}
.mua-ac .op{display:flex;align-items:center;gap:12px;margin-top:6px;padding:9px 8px 9px 12px;border-radius:12px;border:0.5px solid var(--border);background:var(--surface-2);color:var(--text-primary);font-size:15px;line-height:1.5;cursor:pointer;user-select:none;-webkit-user-select:none;touch-action:manipulation;transition:background .25s,border-color .25s,border-radius .3s cubic-bezier(.32,.72,0,1),transform .18s cubic-bezier(.32,.72,0,1)}
.mua-ac .op:active{transform:scale(.985)}
.mua-ac .op:hover{border-color:var(--border-strong)}
.mua-ac .lt{flex:none;width:26px;height:26px;border-radius:50%;border:0.5px solid var(--border-strong);display:flex;align-items:center;justify-content:center;font-size:13px;color:var(--text-secondary);transition:background .2s,color .2s}
.mua-ac .tx{flex:1}
.mua-ac .op.sel{background:color-mix(in srgb,var(--bg-accent) 45%,var(--surface-2));border-color:var(--border-accent);border-bottom-left-radius:4px;border-bottom-right-radius:4px}
@keyframes muapop{0%{transform:scale(.8)}60%{transform:scale(1.12)}100%{transform:scale(1)}}
.mua-ac .op.sel .lt{animation:muapop .38s cubic-bezier(.32,.72,0,1);background:var(--text-accent);border-color:var(--text-accent);color:var(--surface-2)}
.mua-ac .op.x .tx{text-decoration:line-through;color:var(--text-muted)}
.mua-ac .op.x .lt{opacity:.4}
.mua-ac .ic{flex:none;width:34px!important;height:34px!important;display:flex;align-items:center;justify-content:center;border:0!important;border-radius:50%!important;background:transparent!important;box-shadow:none!important;padding:0!important;color:var(--text-muted);font-size:17px;transition:background .15s,color .15s}
.mua-ac .ic:active{background:rgba(120,120,128,.16)!important;color:var(--text-primary)}
.mua-ac .op.x .ic{color:var(--text-danger)}
.mua-ac .tr{display:grid;grid-template-rows:0fr;transition:grid-template-rows .42s cubic-bezier(.32,.72,0,1)}
.mua-ac .tr.open{grid-template-rows:1fr}
.mua-ac .tr>div{overflow:hidden;padding-bottom:3px}
.mua-ac .in{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:8px;margin-top:2px;padding:6px 8px 6px 14px;border-radius:4px 4px 12px 12px;background:color-mix(in srgb,var(--bg-accent) 45%,var(--surface-2));border:0.5px solid var(--border-accent);opacity:0;transform:translateY(-10px) scaleY(.6);transform-origin:top center;transition:opacity .28s cubic-bezier(.32,.72,0,1) .05s,transform .45s cubic-bezier(.32,.72,0,1)}
.mua-ac .tr.open .in{opacity:1;transform:none}
.mua-ac .hs{font-size:12px;color:var(--text-accent);display:flex;align-items:center;gap:6px}
.mua-ac .pen{width:26px!important;height:26px!important;padding:0!important;border:0!important;border-radius:50%!important;background:transparent!important;box-shadow:none!important;color:var(--text-accent);font-size:14px;display:inline-flex;align-items:center;justify-content:center;transition:background .15s}
.mua-ac .pen:active,.mua-ac .pen.on{background:color-mix(in srgb,var(--text-accent) 12%,transparent)!important}
.mua-ac .why{flex-basis:100%;display:grid;grid-template-rows:0fr;transition:grid-template-rows .35s cubic-bezier(.32,.72,0,1)}
.mua-ac .why.open{grid-template-rows:1fr}
.mua-ac .why>div{overflow:hidden}
.mua-ac .why textarea{display:block;width:100%;margin:6px 0 2px;min-height:54px;resize:vertical;border-radius:8px;border:0.5px solid var(--border-accent);background:var(--surface-2);color:var(--text-primary);font:inherit;font-size:13px;line-height:1.5;padding:7px 9px;box-shadow:none;outline:none}
.mua-ac .why textarea:focus{border-color:var(--text-accent);box-shadow:0 0 0 3px color-mix(in srgb,var(--text-accent) 15%,transparent)}
.mua-ac .ch{display:flex;gap:5px;opacity:0;transform:translateY(-4px);transition:opacity .25s ease .14s,transform .35s cubic-bezier(.32,.72,0,1) .12s}
.mua-ac .tr.open .ch{opacity:1;transform:none}
.mua-ac .ch button{display:inline-flex;align-items:center;justify-content:center;height:24px!important;min-width:0;padding:0 10px!important;border:0!important;border-radius:7px!important;background:color-mix(in srgb,var(--text-accent) 12%,transparent)!important;color:var(--text-accent)!important;font-size:12px!important;line-height:1!important;box-shadow:none!important;transition:background .18s cubic-bezier(.32,.72,0,1),color .18s,transform .15s cubic-bezier(.32,.72,0,1)}
.mua-ac .ch button:active{transform:scale(.94)}
.mua-ac .ch button.on{background:var(--text-accent)!important;color:var(--surface-2)!important}
.mua-ac .er{font-size:12px;color:var(--text-danger);min-height:16px;margin-top:4px;text-align:right}
@keyframes muaup{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
@keyframes muaul{from{text-decoration-color:transparent}to{text-decoration-color:var(--mua-bz)}}
@keyframes muasw{from{transform:scaleX(0)}to{transform:scaleX(1)}}
.mua-fb{max-width:440px;margin:0 auto;padding:6px 0 18px}
@media (prefers-reduced-motion:no-preference){.mua-fb .a1{animation:muaup .5s cubic-bezier(.2,.8,.2,1) both}.mua-fb .a2{animation:muaup .5s cubic-bezier(.2,.8,.2,1) both .12s}.mua-fb .a3{animation:muaup .5s cubic-bezier(.2,.8,.2,1) both .24s}.mua-fb .bz{animation:muaul .6s ease both .5s}.mua-fb .kw.hl::after{animation:muasw .6s cubic-bezier(.4,0,.2,1) both .8s}.mua-fb .pp{animation:muaup .5s cubic-bezier(.34,1.4,.64,1) both .9s}.mua-fb .pp+.pp{animation-delay:1.05s}.mua-fb .pp+.pp+.pp{animation-delay:1.2s}}
.mua-fb .lab{font-family:var(--font-mono);font-size:11px;letter-spacing:.12em;color:var(--text-muted)}
.mua-fb .sec{margin-bottom:22px}.mua-fb .sec:last-child{margin-bottom:0}
.mua-fb .quo{font-family:var(--font-voice);font-size:15px;line-height:1.6;color:var(--text-primary);position:relative;padding-left:22px}
.mua-fb .quo:before{content:"\\201C";position:absolute;left:0;top:-6px;font-size:34px;color:var(--text-muted);font-family:var(--font-voice)}
.mua-fb .who{font-size:11px;color:var(--text-muted);margin-top:6px;text-align:right;font-style:italic}
.mua-fb .t{display:grid;grid-template-columns:26px minmax(0,1fr);gap:10px;align-items:start;padding:9px 10px;border-radius:10px;margin-bottom:4px;font-size:13px;line-height:1.6;background:var(--surface-1);color:var(--text-primary)}
.mua-fb .l{width:22px;height:22px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;background:var(--surface-2);color:var(--text-secondary)}
.mua-fb .t.key{background:var(--mua-t1);color:var(--mua-t1f)}.mua-fb .t.key .l{background:var(--mua-t1d);color:var(--mua-t1)}
.mua-fb .t.pick{background:var(--mua-t3);color:var(--mua-t3f)}.mua-fb .t.pick .l{background:var(--mua-t3d);color:var(--mua-t3)}
.mua-fb .bz{font-weight:500;text-decoration-line:underline;text-decoration-color:var(--mua-bz);text-decoration-thickness:1.5px;text-underline-offset:2px;text-decoration-skip-ink:auto}
.mua-fb .note{font-size:13px;line-height:1.6;color:var(--text-secondary);background:var(--surface-1);border-radius:10px;padding:10px 12px;margin-top:8px}
.mua-fb .note b{font-weight:500;color:var(--text-primary)}
.mua-fb .qq{text-align:center;font-size:15px;color:var(--text-secondary);margin-bottom:14px}
.mua-fb .kw{position:relative;display:inline-block;font-family:var(--font-voice);font-style:italic;font-size:22px;color:var(--text-primary);padding:0 2px}
.mua-fb .kw.hl::after{content:"";position:absolute;left:0;right:0;bottom:1px;height:6px;background:var(--mua-hl);opacity:.55;border-radius:3px;transform-origin:left;z-index:-1}
.mua-fb .row{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.mua-fb .pp{border-radius:14px;padding:12px;text-align:center}
.mua-fb .tg{font-family:var(--font-mono);font-size:11px;letter-spacing:.12em;opacity:.75}
.mua-fb .bg{font-size:15px;font-weight:500;margin:3px 0 5px}
.mua-fb .ex{font-size:12px;line-height:1.6;opacity:.85}
.mua-fb .c1{background:var(--mua-t1);color:var(--mua-t1f)}.mua-fb .c2{background:var(--mua-t2);color:var(--mua-t2f)}.mua-fb .c3{background:var(--mua-t3);color:var(--mua-t3f)}.mua-fb .c0{background:var(--surface-1);color:var(--text-primary)}
.mua-fb .chain{display:flex;flex-direction:column;align-items:center}.mua-fb .chain .pp{width:80%;padding:8px 14px;font-size:14px}.mua-fb .chain .pp small{display:block;font-size:11px;opacity:.75}.mua-fb .ar{color:var(--text-muted);font-size:15px;padding:3px 0}
.mua-fb .stamp{text-align:center;font-family:var(--font-voice);font-size:21px;line-height:1.35;color:var(--text-primary)}
.mua-fb .sub{text-align:center;font-size:12px;color:var(--text-secondary);margin-top:4px;line-height:1.5}
.mua-fb .src{text-align:right;font-size:11px;font-style:italic;color:var(--text-muted);margin-top:10px}
`;
function css(){if(document.getElementById('mua-css'))return;var s=document.createElement('style');s.id='mua-css';s.textContent=CSS;document.head.appendChild(s);}
function el(h){var d=document.createElement('div');d.innerHTML=h;return d.firstElementChild;}
var L='ABCDE';
window.MUA={v:'1.0.0',
answer:function(id,d){css();var host=document.getElementById(id);if(!host)return;var Q=d.qid;
var h='<div class="mua mua-ac"><h2 class="sr">'+Q+' answer card</h2><div class="q stem"><div class="ql">'+(d.label||Q)+'</div>'+d.stem+'</div><button type="button" class="rv"><i class="ti ti-chevron-down" aria-hidden="true"></i> Show options</button><div class="ls">';
d.opts.forEach(function(o,i){h+='<div class="op" data-l="'+L[i]+'"><span class="lt">'+L[i]+'</span><span class="tx">'+o+'</span><button type="button" class="ic" aria-label="Strike out '+L[i]+'"><i class="ti ti-eye-off" aria-hidden="true"></i></button></div>';});
h+='<div class="tr"><div><div class="in"><span class="hs"><i class="ti ti-gauge" aria-hidden="true"></i> How sure?<button type="button" class="pen" aria-label="Add your reasoning (optional)"><i class="ti ti-pencil" aria-hidden="true"></i></button></span><span class="ch"><button type="button" data-c="Guess">Guess</button><button type="button" data-c="50/50">50/50</button><button type="button" data-c="Sure">Sure</button></span><div class="why"><div><textarea placeholder="Why? (optional, sent with your confidence tap)"></textarea></div></div></div></div></div><div class="er"></div></div></div>';
var R=el(h);host.appendChild(R);
function q(s){return R.querySelector(s);}function qa(s){return Array.prototype.slice.call(R.querySelectorAll(s));}
var T0=performance.now(),tR=0,sel=null,picks=[],struck={},ev=[],done=false,hid=null,rr=[];
function t(){return Math.round((performance.now()-(tR||T0))/1000);}function log(e){ev.push({e:e,t:performance.now()});}function err(m){q('.er').textContent=m||'';}
var ls=q('.ls'),tr=q('.tr');function fit(){if(ls.classList.contains('open'))ls.style.maxHeight=(ls.scrollHeight+40)+'px';}
function place(){if(!sel){tr.classList.remove('open');setTimeout(fit,360);return;}var o=q('.op[data-l="'+sel+'"]');tr.classList.remove('open');o.parentNode.insertBefore(tr,o.nextSibling);void tr.offsetWidth;tr.classList.add('open');fit();setTimeout(fit,400);}
q('.rv').addEventListener('click',function(){tR=performance.now();log('reveal');var b=this;b.classList.add('gone');setTimeout(function(){b.style.display='none';},200);ls.classList.add('open');fit();setTimeout(fit,460);});
if('IntersectionObserver' in window){new IntersectionObserver(function(es){es.forEach(function(x){if(!tR||done)return;if(!x.isIntersecting){hid=t();}else if(hid!==null){rr.push(hid+'→'+t()+'s');hid=null;}});},{threshold:0.3}).observe(q('.stem'));}
function pick(l){if(done||!tR)return;var o=q('.op[data-l="'+l+'"]');if(!o)return;if(struck[l]){delete struck[l];o.classList.remove('x');log('unstruck '+l);}if(sel===l)return;qa('.op').forEach(function(x){x.classList.remove('sel');});o.classList.add('sel');picks.push(l+'@'+t()+'s');log('pick '+l);sel=l;err();place();}
function strike(l){if(done||!tR)return;var o=q('.op[data-l="'+l+'"]');if(struck[l]){delete struck[l];o.classList.remove('x');log('unstruck '+l);}else{struck[l]=t();o.classList.add('x');log('struck '+l);if(sel===l){sel=null;o.classList.remove('sel');place();}}}
qa('.op').forEach(function(o){var l=o.getAttribute('data-l');o.querySelector('.ic').addEventListener('click',function(e){e.stopPropagation();strike(l);});o.addEventListener('click',function(){pick(l);});});
function submit(c){if(done)return;if(!sel){err('Pick an answer first');return;}log('conf '+c);var now=performance.now(),g=0,p=tR;ev.forEach(function(x){if(x.t>=tR){g=Math.max(g,x.t-p);p=x.t;}});
var f=ev.filter(function(x){return x.t>tR&&x.e!=='reveal';})[0];var sk=Object.keys(struck).sort().map(function(k){return k+'@'+struck[k]+'s';}).join(', ')||'none';
var tx=q('.op[data-l="'+sel+'"] .tx').textContent;var n=(q('.why textarea').value||'').replace(/\s+/g,' ').trim();
var line=Q+' answer: '+sel+'. '+tx+' | '+c+(n?' | why: '+n:'')+' | picks: '+picks.join(' → ')+' | struck: '+sk+' | stem re-reads: '+(rr.length?rr.join(', '):'0')+' | read '+Math.round((tR-T0)/1000)+'s, options '+Math.round((now-tR)/1000)+'s, first action +'+(f?Math.round((f.t-tR)/1000):0)+'s, longest pause '+Math.round(g/1000)+'s';
qa('.ch button').forEach(function(b){b.classList.toggle('on',b.getAttribute('data-c')===c);});
if(typeof sendPrompt==='function'){done=true;q('.hs').innerHTML='<i class="ti ti-check" aria-hidden="true"></i> Sent';sendPrompt(line);}else{err("Couldn't send from the card. Type \""+Q+' '+sel+' '+c+'" in the chat.');}}
qa('.ch button').forEach(function(b){b.addEventListener('click',function(e){e.stopPropagation();submit(b.getAttribute('data-c'));});});
q('.pen').addEventListener('click',function(e){e.stopPropagation();var w=q('.why'),o=!w.classList.contains('open');w.classList.toggle('open',o);this.classList.toggle('on',o);if(o)setTimeout(function(){q('.why textarea').focus();},200);fit();setTimeout(fit,380);});
q('.why textarea').addEventListener('click',function(e){e.stopPropagation();});q('.why textarea').addEventListener('input',fit);
document.addEventListener('keydown',function(e){if(!tR||done||!document.body.contains(R))return;var tg=e.target&&e.target.tagName;if(tg==='TEXTAREA'||tg==='INPUT')return;var k=e.key.toUpperCase();if(k.length===1&&L.indexOf(k)>-1)pick(k);else if(k==='1')submit('Guess');else if(k==='2')submit('50/50');else if(k==='3')submit('Sure');});
},
feedback:function(id,d){css();var host=document.getElementById(id);if(!host)return;
var h='<div class="mua mua-fb"><h2 class="sr">'+(d.sr||'Feedback card')+'</h2>';
if(d.quote)h+='<div class="sec a1"><div class="quo">'+d.quote+'</div><div class="who">'+(d.who||'')+'</div></div>';
h+='<div class="sec a2"><div class="lab" style="margin-bottom:10px">WHY THE OTHERS FAIL</div>';
(d.traps||[]).forEach(function(x,i){h+='<div class="t'+(x.k?' key':'')+(x.p?' pick':'')+'"><span class="l">'+L[i]+'</span><span>'+x.h+'</span></div>';});
if(d.note)h+='<div class="note">'+d.note+'</div>';h+='</div>';
if(d.hook)h+='<div class="sec a3"><div class="lab" style="text-align:center;margin-bottom:10px">'+(d.hook.lab||'THE HOOK')+'</div>'+d.hook.html+(d.src?'<div class="src">'+d.src+'</div>':'')+'</div>';
h+='</div>';var R=el(h);host.appendChild(R);if(d.js)try{d.js(R);}catch(e){}
}};
})();
