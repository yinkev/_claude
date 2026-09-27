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
.mua-ac .op.sel{background:color-mix(in srgb,var(--bg-accent) 45%,var(--surface-2));border-color:var(--border-accent);border-bottom-left-radius:4px!important;border-bottom-right-radius:4px!important}
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
.mua-ac .in{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:0 8px;margin-top:2px;padding:8px 8px 8px 12px;border-radius:4px 4px 12px 12px!important;background:color-mix(in srgb,var(--bg-accent) 45%,var(--surface-2));border:0.5px solid var(--border-accent);opacity:0;transform:translateY(-10px) scaleY(.6);transform-origin:top center;transition:opacity .28s cubic-bezier(.32,.72,0,1) .05s,transform .45s cubic-bezier(.32,.72,0,1)}
.mua-ac .tr.open .in{opacity:1;transform:none}
.mua-ac .hs{font-size:12px;line-height:1;color:var(--text-accent);display:flex;align-items:center;gap:6px;min-height:26px}
.mua-ac .pen{width:26px!important;height:26px!important;padding:0!important;border:0!important;border-radius:50%!important;background:transparent!important;box-shadow:none!important;color:var(--text-accent);font-size:14px;display:inline-flex;align-items:center;justify-content:center;transition:background .15s}
.mua-ac .pen:active,.mua-ac .pen.on{background:color-mix(in srgb,var(--text-accent) 12%,transparent)!important}
.mua-ac .why{flex-basis:100%;display:grid;grid-template-rows:0fr;transition:grid-template-rows .35s cubic-bezier(.32,.72,0,1)}
.mua-ac .why.open{grid-template-rows:1fr}
.mua-ac .why>div{overflow:hidden}
.mua-ac .why textarea{display:block;width:100%;margin:8px 0 0;min-height:54px;resize:vertical;border-radius:8px;border:0.5px solid var(--border-accent);background:var(--surface-2);color:var(--text-primary);font:inherit;font-size:13px;line-height:1.5;padding:7px 9px;box-shadow:none;outline:none}
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

.mua-fig{position:relative;margin:0 0 10px;border-radius:12px;overflow:hidden;background:#000;cursor:zoom-in;touch-action:pan-y}
.mua-fig.on{cursor:zoom-out;touch-action:none}
.mua-fig .fz{position:relative;transition:transform .45s cubic-bezier(.32,.72,0,1),transform-origin .15s linear}
.mua-fig img{display:block;width:100%;height:auto;user-select:none;-webkit-user-drag:none}
.mua-fig figcaption{position:absolute;right:8px;bottom:8px;font-size:11px;color:#fff;background:rgba(0,0,0,.45);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);padding:4px 9px;border-radius:999px;display:flex;align-items:center;gap:5px;pointer-events:none}
.mua-fig .mk{position:absolute;width:0;height:0}
.mua-fig .mk i{position:absolute;left:-13px;top:-13px;width:26px;height:26px;border-radius:50%;border:2px solid #FAC775;box-shadow:0 0 0 1px rgba(0,0,0,.35)}
.mua-fig .mk i::after{content:"";position:absolute;inset:-2px;border-radius:50%;border:2px solid #FAC775;animation:muaring 1.8s cubic-bezier(.32,.72,0,1) infinite}
@keyframes muaring{0%{transform:scale(1);opacity:.9}100%{transform:scale(2.2);opacity:0}}
.mua-fig .mka{position:absolute;width:44px;height:2px;background:#FAC775;transform-origin:0 50%;margin-top:-1px}
.mua-fig .mka::after{content:"";position:absolute;left:-1px;top:-4px;border:5px solid transparent;border-right:7px solid #FAC775;border-left:0}
@media (prefers-reduced-motion:reduce){.mua-fig .mk i::after{animation:none}}
/* hook presets */
@keyframes muadraw{from{stroke-dashoffset:var(--len,80)}to{stroke-dashoffset:0}}
@keyframes muagrow{from{transform:scaleX(0)}to{transform:scaleX(1)}}
@keyframes muagrowy{from{transform:scaleY(0)}to{transform:scaleY(1)}}
@keyframes muapin{from{opacity:0;transform:translate(-50%,-8px)}to{opacity:1;transform:translate(-50%,0)}}
@keyframes muabreath{0%,100%{opacity:.5}50%{opacity:1}}
@media (prefers-reduced-motion:no-preference){.mua-h .st{animation:muaup .5s cubic-bezier(.34,1.4,.64,1) both;animation-delay:calc(.85s + var(--i,0)*.12s)}}
.mua-h .fk{display:block;width:100%;height:30px;margin:2px 0}
.mua-h .fk path{stroke-dasharray:var(--len,80);animation:muadraw .6s cubic-bezier(.4,0,.2,1) both .7s}
.mua-h .fk circle{animation:muabreath 1.8s ease-in-out infinite 1.3s}
.mua-h .tl{position:relative;display:grid;gap:3px;margin-top:26px}
.mua-h .tl .sg{height:12px;border-radius:4px;transform-origin:left;animation:muagrow .6s cubic-bezier(.32,.72,0,1) both;animation-delay:calc(.8s + var(--i,0)*.15s)}
.mua-h .tl .pin{position:absolute;top:-24px;font-family:var(--font-mono);font-size:11px;color:var(--text-primary);white-space:nowrap;transform:translateX(-50%);animation:muapin .5s cubic-bezier(.34,1.4,.64,1) both 1.5s}
.mua-h .tl .pin::after{content:"";display:block;width:1.5px;height:10px;background:var(--text-primary);margin:2px auto 0}
.mua-h .tlg{display:grid;gap:3px;margin-top:8px}
.mua-h .tlg div{font-size:12px;line-height:1.45;color:var(--text-secondary)}.mua-h .tlg b{display:block;font-weight:500;color:var(--text-primary)}
.mua-h .lad .rg{display:grid;grid-template-columns:64px minmax(0,1fr) auto;gap:10px;align-items:center;padding:8px 10px;border-radius:12px;margin-bottom:4px}
.mua-h .lad .rg .d{font-family:var(--font-mono);font-size:12px;color:var(--text-secondary)}
.mua-h .lad .seg{display:flex;gap:3px}.mua-h .lad .seg i{flex:1;height:8px;border-radius:4px;background:var(--surface-1)}
.mua-h .lad .seg i.on{background:#5DCAA5}
.mua-h .lad .sh{font-size:11px;color:var(--text-muted);margin-top:4px}
.mua-h .lad .n{font-size:13px;font-weight:500;text-align:right;color:var(--text-primary)}
.mua-h .lad .rg.hit{background:var(--mua-t1)}.mua-h .lad .rg.hit .d,.mua-h .lad .rg.hit .sh,.mua-h .lad .rg.hit .n{color:var(--mua-t1f)}
.mua-h .grid{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.mua-h .grid .tile{border-radius:12px;padding:10px 12px;background:var(--surface-1);color:var(--text-primary)}
.mua-h .grid .tile .n{font-family:var(--font-mono);font-size:11px;letter-spacing:.1em;color:var(--text-muted)}
.mua-h .grid .tile .f{font-size:13px;line-height:1.5;margin-top:3px}
.mua-h .grid .tile.hit{grid-column:1/-1;background:var(--mua-t1);color:var(--mua-t1f);text-align:center}
.mua-h .grid .tile.hit .n{color:var(--mua-t1d)}.mua-h .grid .tile.hit .f{font-family:var(--font-voice);font-size:17px}
.mua-h .grid .tile.odd{background:var(--mua-t3);color:var(--mua-t3f);outline:1.5px dashed #D85A30;outline-offset:-4px}
.mua-h .eq{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:8px}
.mua-h .eq .tm{padding:6px 12px;border-radius:999px;font-size:13px}
.mua-h .eq .o{color:var(--text-muted);font-size:17px}
.mua-h .mn{display:flex;flex-direction:column;gap:6px}
.mua-h .mn .ln{display:grid;grid-template-columns:34px minmax(0,1fr);gap:10px;align-items:center}
.mua-h .mn .lt2{width:34px;height:34px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-family:var(--font-voice);font-size:20px;font-style:italic;background:var(--mua-t2);color:var(--mua-t2f)}
.mua-h .mn .w{font-size:14px;color:var(--text-primary)}.mua-h .mn .w small{display:block;font-size:12px;color:var(--text-secondary)}
/* stepper */
.mua-st{max-width:440px;margin:0 auto;padding:4px 0 24px}
.mua-st .stage{position:relative;border-radius:16px;background:var(--surface-1);overflow:hidden;aspect-ratio:16/10}
.mua-st .fr{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;opacity:0;transform:scale(.97);transition:opacity .45s cubic-bezier(.32,.72,0,1),transform .55s cubic-bezier(.32,.72,0,1)}
.mua-st .fr.on{opacity:1;transform:none}
.mua-st .fr svg{width:100%;height:100%}
.mua-st .big{position:absolute;left:14px;top:8px;font-family:var(--font-voice);font-style:italic;font-size:44px;line-height:1;color:var(--text-primary);opacity:.12}
.mua-st .card{margin-top:12px;text-align:center;min-height:96px}
.mua-st .num{font-family:var(--font-mono);font-size:11px;color:var(--text-muted);letter-spacing:.1em}
.mua-st .ttl{font-family:var(--font-voice);font-style:italic;font-size:22px;color:var(--text-primary);margin:2px 0 4px}
.mua-st .dsc{font-size:14px;line-height:1.55;color:var(--text-secondary);max-width:340px;margin:0 auto}
.mua-st .chip{display:inline-block;margin-top:8px;font-size:12px;padding:3px 10px;border-radius:999px;background:var(--mua-t2);color:var(--mua-t2f)}
.mua-st .card>*{transition:opacity .25s ease,transform .35s cubic-bezier(.32,.72,0,1)}
.mua-st .card.sw>*{opacity:0;transform:translateY(6px)}
.mua-st .nav{display:flex;align-items:center;justify-content:center;gap:14px;margin-top:14px}
.mua-st .nav button{width:38px!important;height:38px!important;border-radius:50%!important;border:0.5px solid var(--border-strong)!important;background:var(--surface-2)!important;color:var(--text-primary)!important;font-size:17px!important;display:flex;align-items:center;justify-content:center;padding:0!important;box-shadow:none!important;transition:transform .15s cubic-bezier(.32,.72,0,1),opacity .2s}
.mua-st .nav button:active{transform:scale(.92)}.mua-st .nav button:disabled{opacity:.3}
.mua-st .dots{display:flex;gap:6px}
.mua-st .dots button{width:8px!important;height:8px!important;border-radius:999px!important;border:none!important;background:var(--border-strong)!important;padding:0!important;transition:width .35s cubic-bezier(.32,.72,0,1),background .3s}
.mua-st .dots button.on{width:22px!important;background:var(--text-primary)!important}
.mua-st .src{text-align:right;font-size:11px;font-style:italic;color:var(--text-muted);margin-top:12px}
/* report */
.mua-rp{max-width:440px;margin:0 auto;padding:6px 0 22px}
.mua-rp .top{display:grid;grid-template-columns:120px minmax(0,1fr);gap:16px;align-items:center}
.mua-rp .ring{position:relative;width:120px;height:120px}
.mua-rp .ring svg{width:120px;height:120px;transform:rotate(-90deg)}
.mua-rp .ring .bgc{stroke:var(--surface-1)}
.mua-rp .ring .fgc{stroke:#1D9E75;stroke-linecap:round;transition:stroke-dashoffset 1.4s cubic-bezier(.32,.72,0,1) .3s}
.mua-rp .ring .c{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center}
.mua-rp .ring .pc{font-family:var(--font-voice);font-size:30px;color:var(--text-primary);line-height:1}
.mua-rp .ring .sc{font-size:12px;color:var(--text-secondary);margin-top:4px}
.mua-rp .kv{display:flex;flex-direction:column;gap:8px}
.mua-rp .kv div{display:flex;justify-content:space-between;font-size:13px;color:var(--text-secondary);border-bottom:0.5px solid var(--border);padding-bottom:6px}
.mua-rp .kv b{font-weight:500;color:var(--text-primary)}
.mua-rp .lab{font-family:var(--font-mono);font-size:11px;letter-spacing:.12em;color:var(--text-muted);margin:22px 0 10px}
.mua-rp .strip{display:flex;flex-wrap:wrap;gap:5px}
.mua-rp .strip span{width:30px;height:30px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:11px;font-family:var(--font-mono)}
@media (prefers-reduced-motion:no-preference){.mua-rp .strip span{animation:muaup .4s cubic-bezier(.34,1.4,.64,1) both;animation-delay:calc(.4s + var(--i)*.05s)}}
.mua-rp .strip .ok{background:var(--mua-t1);color:var(--mua-t1f)}.mua-rp .strip .no{background:var(--mua-t3);color:var(--mua-t3f)}
.mua-rp .bars .b{display:grid;grid-template-columns:110px minmax(0,1fr) 34px;gap:10px;align-items:center;margin-bottom:8px;font-size:13px;color:var(--text-primary)}
.mua-rp .bars .tk{height:10px;border-radius:5px;background:var(--surface-1);overflow:hidden}
.mua-rp .bars .tk i{display:block;height:100%;border-radius:5px;transform-origin:left;animation:muagrow .8s cubic-bezier(.32,.72,0,1) both;animation-delay:calc(.6s + var(--i)*.1s)}
.mua-rp .bars .v{font-family:var(--font-mono);font-size:12px;color:var(--text-secondary);text-align:right}
.mua-rp .ins{font-size:14px;line-height:1.6;color:var(--text-primary);background:var(--surface-1);border-radius:12px;padding:12px 14px;margin-top:18px}
.mua-rp .ins b{font-weight:500}
`;
function css(){if(document.getElementById('mua-css'))return;var s=document.createElement('style');s.id='mua-css';s.textContent=CSS;document.head.appendChild(s);}
function el(h){var d=document.createElement('div');d.innerHTML=h;return d.firstElementChild;}
var L='ABCDE';
function esc(t){return String(t==null?'':t);}
function fig(src,mk,alt){var m='';if(mk){m='<span class="mk" style="left:'+mk.x+'%;top:'+mk.y+'%"><i></i></span>';if(mk.arrow)m+='<span class="mka" style="left:'+mk.x+'%;top:'+mk.y+'%;transform:rotate('+(mk.arrow)+'deg)"></span>';}
return '<figure class="mua-fig" data-z="0"><div class="fz"><img src="'+src+'" alt="'+esc(alt||'Question image')+'" draggable="false">'+m+'</div><figcaption><i class="ti ti-zoom-in" aria-hidden="true"></i> Tap to zoom</figcaption></figure>';}
function wireFig(R){var f=R.querySelector('.mua-fig');if(!f)return;var z=f.querySelector('.fz'),on=false,ox=50,oy=50;
function set(){z.style.transformOrigin=ox+'% '+oy+'%';z.style.transform=on?'scale(2.2)':'none';f.classList.toggle('on',on);f.querySelector('figcaption').innerHTML=on?'<i class="ti ti-zoom-out" aria-hidden="true"></i> Tap to zoom out · drag to look around':'<i class="ti ti-zoom-in" aria-hidden="true"></i> Tap to zoom';}
var sx=0,sy=0,moved=false;f.addEventListener('pointerdown',function(e){sx=e.clientX;sy=e.clientY;moved=false;});
f.addEventListener('pointermove',function(e){if(!on||e.buttons===0&&e.pointerType==='mouse')return;var r=f.getBoundingClientRect();if(Math.abs(e.clientX-sx)+Math.abs(e.clientY-sy)>6)moved=true;if(moved){ox=Math.min(100,Math.max(0,(e.clientX-r.left)/r.width*100));oy=Math.min(100,Math.max(0,(e.clientY-r.top)/r.height*100));set();}});
f.addEventListener('click',function(e){if(moved)return;var r=f.getBoundingClientRect();ox=(e.clientX-r.left)/r.width*100;oy=(e.clientY-r.top)/r.height*100;on=!on;set();});}
window.MUA={v:'1.1.1',
answer:function(id,d){css();var host=document.getElementById(id);if(!host)return;var Q=d.qid;
var h='<div class="mua mua-ac"><h2 class="sr">'+Q+' answer card</h2>'+(d.img?fig(d.img,d.mark,d.alt):'')+'<div class="q stem"><div class="ql">'+(d.label||Q)+'</div>'+d.stem+'</div><button type="button" class="rv"><i class="ti ti-chevron-down" aria-hidden="true"></i> Show options</button><div class="ls">';
d.opts.forEach(function(o,i){h+='<div class="op" data-l="'+L[i]+'"><span class="lt">'+L[i]+'</span><span class="tx">'+o+'</span><button type="button" class="ic" aria-label="Strike out '+L[i]+'"><i class="ti ti-eye-off" aria-hidden="true"></i></button></div>';});
h+='<div class="tr"><div><div class="in"><span class="hs"><i class="ti ti-gauge" aria-hidden="true"></i> How sure?<button type="button" class="pen" aria-label="Add your reasoning (optional)"><i class="ti ti-pencil" aria-hidden="true"></i></button></span><span class="ch"><button type="button" data-c="Guess">Guess</button><button type="button" data-c="50/50">50/50</button><button type="button" data-c="Sure">Sure</button></span><div class="why"><div><textarea placeholder="Why? (optional, sent with your confidence tap)"></textarea></div></div></div></div></div><div class="er"></div></div></div>';
var R=el(h);host.appendChild(R);wireFig(R);
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
},
h:{
_q:function(q,kw){return q?'<div class="qq">'+q.replace('{kw}','<span class="kw hl">'+(kw||'')+'</span>')+'</div>':'';},
_card:function(o,i){return '<div class="pp st '+(o.c||'c0')+'" style="--i:'+i+'"><div class="tg">'+esc(o.tag)+'</div><div class="bg">'+esc(o.title)+'</div><div class="ex">'+(o.ex||[]).join('<br>')+'</div></div>';},
fork:function(o){return '<div class="mua-h">'+this._q(o.q,o.kw)+'<svg class="fk" viewBox="0 0 300 30" preserveAspectRatio="none" aria-hidden="true"><path d="M150 2 C150 16 75 12 75 28" fill="none" stroke="#1D9E75" stroke-width="1.5" vector-effect="non-scaling-stroke"/><path d="M150 2 C150 16 225 12 225 28" fill="none" stroke="#D85A30" stroke-width="1.5" vector-effect="non-scaling-stroke"/><circle cx="150" cy="3" r="2.5" fill="var(--text-muted)"/></svg><div class="row">'+this._card(Object.assign({c:'c1'},o.yes),0)+this._card(Object.assign({c:'c3'},o.no),1)+'</div>'+(o.sub?'<div class="sub">'+o.sub+'</div>':'')+'</div>';},
split:function(o){return '<div class="mua-h">'+this._q(o.q,o.kw)+'<div class="row">'+this._card(Object.assign({c:'c1'},o.a),0)+this._card(Object.assign({c:'c2'},o.b),1)+'</div>'+(o.sub?'<div class="sub">'+o.sub+'</div>':'')+'</div>';},
chain:function(o){var h='<div class="mua-h">'+this._q(o.q,o.kw)+'<div class="chain">';(o.steps||[]).forEach(function(x,i){if(i)h+='<div class="ar st" style="--i:'+(i*2-1)+'"><i class="ti ti-arrow-down" aria-hidden="true"></i></div>';h+='<div class="pp st '+(x.c||'c0')+'" style="--i:'+(i*2)+'">'+esc(x.t)+(x.sub?'<small>'+x.sub+'</small>':'')+'</div>';});return h+'</div>'+(o.sub?'<div class="sub">'+o.sub+'</div>':'')+'</div>';},
timeline:function(o){var cols=(o.segs||[]).map(function(x){return (x.w||1)+'fr';}).join(' ');var h='<div class="mua-h">'+this._q(o.q,o.kw)+'<div class="tl" style="grid-template-columns:'+cols+'">';if(o.pin)h+='<span class="pin" style="left:'+o.pin.at+'%">'+esc(o.pin.label)+'</span>';(o.segs||[]).forEach(function(x,i){h+='<div class="sg" style="--i:'+i+';background:'+(x.color||'#B4B2A9')+'"></div>';});h+='</div><div class="tlg" style="grid-template-columns:'+cols+'">';(o.segs||[]).forEach(function(x){h+='<div><b>'+esc(x.label)+'</b>'+(x.sub||'')+'</div>';});return h+'</div>'+(o.sub?'<div class="sub">'+o.sub+'</div>':'')+'</div>';},
ladder:function(o){var n=o.max||3,h='<div class="mua-h">'+this._q(o.q,o.kw)+'<div class="lad">';(o.rows||[]).forEach(function(x,i){var seg='';for(var k=0;k<n;k++)seg+='<i class="'+(k<(x.fill||0)?'on':'')+'"></i>';h+='<div class="rg st'+(x.hit?' hit':'')+'" style="--i:'+i+'"><span class="d">'+esc(x.d)+'</span><div><div class="seg">'+seg+'</div><div class="sh">'+esc(x.sh||'')+'</div></div><span class="n">'+esc(x.n)+'</span></div>';});return h+'</div>'+(o.sub?'<div class="sub">'+o.sub+'</div>':'')+'</div>';},
grid:function(o){var h='<div class="mua-h">'+this._q(o.q,o.kw)+'<div class="grid">';(o.tiles||[]).forEach(function(x,i){h+='<div class="tile st'+(x.hit?' hit':'')+(x.odd?' odd':'')+'" style="--i:'+i+'"><div class="n">'+esc(x.n)+'</div><div class="f">'+x.f+'</div></div>';});return h+'</div>'+(o.sub?'<div class="sub">'+o.sub+'</div>':'')+'</div>';},
stamp:function(o){return '<div class="mua-h"><div class="stamp st">'+o.line+'</div>'+(o.sub?'<div class="sub st" style="--i:1">'+o.sub+'</div>':'')+'</div>';},
eq:function(o){var h='<div class="mua-h">'+this._q(o.q,o.kw)+'<div class="eq">';(o.terms||[]).forEach(function(x,i){if(typeof x==='string')h+='<span class="o st" style="--i:'+i+'">'+x+'</span>';else h+='<span class="tm st '+(x.c||'c0')+'" style="--i:'+i+'">'+esc(x.t)+'</span>';});return h+'</div>'+(o.sub?'<div class="sub">'+o.sub+'</div>':'')+'</div>';},
mnemonic:function(o){var h='<div class="mua-h">'+this._q(o.q,o.kw)+'<div class="mn">';(o.rows||[]).forEach(function(x,i){h+='<div class="ln st" style="--i:'+i+'"><span class="lt2">'+esc(x.l)+'</span><span class="w">'+esc(x.w)+(x.sub?'<small>'+x.sub+'</small>':'')+'</span></div>';});return h+'</div>'+(o.sub?'<div class="sub">'+o.sub+'</div>':'')+'</div>';}
},
stepper:function(id,d){css();var host=document.getElementById(id);if(!host)return;var S=d.steps||[];
var h='<div class="mua mua-st"><h2 class="sr">'+esc(d.sr||'Step-through diagram')+'</h2>'+(d.lab?'<div class="lab" style="font-family:var(--font-mono);font-size:11px;letter-spacing:.12em;color:var(--text-muted);text-align:center;margin-bottom:8px">'+d.lab+'</div>':'')+'<div class="stage"><span class="big">1</span>';
S.forEach(function(x,i){h+='<div class="fr" data-i="'+i+'">'+(x.svg||'')+'</div>';});
h+='</div><div class="card"><div class="num"></div><div class="ttl"></div><div class="dsc"></div><span class="chip"></span></div><div class="nav"><button type="button" class="bk" aria-label="Previous step"><i class="ti ti-chevron-left" aria-hidden="true"></i></button><div class="dots"></div><button type="button" class="nx" aria-label="Next step"><i class="ti ti-chevron-right" aria-hidden="true"></i></button></div>'+(d.src?'<div class="src">'+d.src+'</div>':'')+'</div>';
var R=el(h);host.appendChild(R);var k=0,dots=R.querySelector('.dots'),cd=R.querySelector('.card');
S.forEach(function(_,i){var b=document.createElement('button');b.type='button';b.setAttribute('aria-label','Step '+(i+1));b.onclick=function(){go(i);};dots.appendChild(b);});
function go(n){k=n;var x=S[n];cd.classList.add('sw');setTimeout(function(){R.querySelector('.num').textContent='STEP '+(n+1)+' OF '+S.length;R.querySelector('.ttl').textContent=x.t||'';R.querySelector('.dsc').innerHTML=x.d||'';var c=R.querySelector('.chip');c.textContent=x.chip||'';c.style.display=x.chip?'':'none';cd.classList.remove('sw');},140);
R.querySelectorAll('.fr').forEach(function(f,i){f.classList.toggle('on',i===n);});R.querySelector('.big').textContent=n+1;
R.querySelector('.bk').disabled=n===0;R.querySelector('.nx').disabled=n===S.length-1;Array.prototype.forEach.call(dots.children,function(b,i){b.classList.toggle('on',i===n);});}
R.querySelector('.bk').onclick=function(){if(k>0)go(k-1);};R.querySelector('.nx').onclick=function(){if(k<S.length-1)go(k+1);};
var tx=0;R.querySelector('.stage').addEventListener('touchstart',function(e){tx=e.touches[0].clientX;},{passive:true});R.querySelector('.stage').addEventListener('touchend',function(e){var dx=e.changedTouches[0].clientX-tx;if(dx<-40&&k<S.length-1)go(k+1);else if(dx>40&&k>0)go(k-1);});
go(0);},
report:function(id,d){css();var host=document.getElementById(id);if(!host)return;var I=d.items||[],n=I.length,ok=I.filter(function(x){return x.ok;}).length,pc=n?Math.round(ok/n*100):0,C=2*Math.PI*52;
var h='<div class="mua mua-rp"><h2 class="sr">'+esc(d.sr||'Session report')+'</h2><div class="top"><div class="ring"><svg viewBox="0 0 120 120" aria-hidden="true"><circle class="bgc" cx="60" cy="60" r="52" fill="none" stroke-width="10"/><circle class="fgc" cx="60" cy="60" r="52" fill="none" stroke-width="10" stroke-dasharray="'+C+'" stroke-dashoffset="'+C+'"/></svg><div class="c"><span class="pc">'+pc+'%</span><span class="sc">'+ok+' of '+n+'</span></div></div><div class="kv">';
(d.kv||[]).forEach(function(x){h+='<div><span>'+esc(x[0])+'</span><b>'+esc(x[1])+'</b></div>';});
h+='</div></div><div class="lab">EVERY QUESTION</div><div class="strip">';I.forEach(function(x,i){h+='<span class="'+(x.ok?'ok':'no')+'" style="--i:'+i+'" title="'+esc(x.t||'')+'">'+esc(x.q)+'</span>';});h+='</div>';
if(d.bars){h+='<div class="lab">'+esc(d.barsLab||'WHERE THE POINTS WENT')+'</div><div class="bars">';var mx=Math.max.apply(null,d.bars.map(function(b){return b.v;}).concat([1]));d.bars.forEach(function(b,i){h+='<div class="b"><span>'+esc(b.k)+'</span><div class="tk"><i style="--i:'+i+';width:'+(b.v/mx*100)+'%;background:'+(b.color||'#D85A30')+'"></i></div><span class="v">'+esc(b.v)+'</span></div>';});h+='</div>';}
if(d.insight)h+='<div class="ins">'+d.insight+'</div>';h+='</div>';var R=el(h);host.appendChild(R);
requestAnimationFrame(function(){requestAnimationFrame(function(){R.querySelector('.fgc').style.strokeDashoffset=C*(1-pc/100);});});}
};
})();
