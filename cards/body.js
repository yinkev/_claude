/* _claude body map v1.2.0 — dermatome figure (front + back) and spine panel for Claude study widgets.
   Works alone or with card.js, in either load order.
   <div id="x"></div>
   <script src="https://cdn.jsdelivr.net/gh/yinkev/_claude@<COMMIT>/cards/body.js"></script>
   <script>MUA.body('x',{view:'both',hl:['L5'],spine:true})</script>
   As a feedback hook: hook:{lab:'THE MAP',html:MUA.h.body({hl:['L5'],q:'L4–L5 disc → {kw}',kw:'L5'})}
   Levels: C1…C8, T1…T12, L1…L5, S1…S5, Co1, or ranges like 'C5-T1'. No personal data lives here. */
(function(){
var M=window.MUA=window.MUA||{};M.h=M.h||{};
if(M.body&&M.body.v)return;
var G={C:8,T:12,L:5,S:5,Co:1},ORD=[],U=0,k,i;
for(k in G)for(i=1;i<=G[k];i++)ORD.push(k+i);
var D={V:'face · trigeminal (CN V)',C1:'no skin area (motor only)',C2:'occiput, back of scalp',C3:'neck',C4:'shoulder cap, clavicle',C5:'lateral arm',C6:'lateral forearm, thumb',C7:'middle finger',C8:'little finger, medial hand and forearm',T1:'medial forearm and arm',T2:'axilla, upper medial arm',T3:'upper chest',T4:'nipple line',T5:'below the nipples',T6:'xiphoid',T7:'costal margin',T8:'upper abdomen',T9:'above the umbilicus',T10:'umbilicus',T11:'below the umbilicus',T12:'suprapubic, above the inguinal ligament',L1:'inguinal region, groin',L2:'anterior and medial thigh',L3:'medial knee, lower thigh',L4:'medial leg, medial ankle and foot',L5:'anterolateral leg, dorsum of foot, big toe',S1:'lateral foot, little toe, sole and heel, posterior calf',S2:'posterior thigh, popliteal fossa',S3:'medial buttock (saddle)',S4:'perineum (saddle)',S5:'perianal',Co1:'skin over the coccyx'};

/* ---------- geometry (one figure, midline x=0, soles y≈368) ---------- */
function f(q){return (+q[0].toFixed(1))+','+(+q[1].toFixed(1));}
function mx(q){return[-q[0],q[1]];}
function poly(p){return 'M'+p.map(f).join('L')+'Z';}
function sm(p){var n=p.length,d='M'+f(p[0]);for(var i=0;i<n;i++){var a=p[(i-1+n)%n],b=p[i],c=p[(i+1)%n],e=p[(i+2)%n];
d+='C'+f([b[0]+(c[0]-a[0])/6,b[1]+(c[1]-a[1])/6])+' '+f([c[0]-(e[0]-b[0])/6,c[1]-(e[1]-b[1])/6])+' '+f(c);}return d+'Z';}
function ell(x,y,rx,ry){return 'M'+(x-rx)+','+y+'a'+rx+','+ry+' 0 1,0 '+2*rx+',0a'+rx+','+ry+' 0 1,0 '+(-2*rx)+',0Z';}
function circ(x,y,r){return ell(x,y,r,r);}
function cap(a,b,c,d,r){var L=Math.hypot(c-a,d-b),ux=(c-a)/L,uy=(d-b)/L,nx=-uy,ny=ux,p=[],j,t;
for(j=0;j<=6;j++){t=j*Math.PI/6;p.push([c+nx*r*Math.cos(t)+ux*r*Math.sin(t),d+ny*r*Math.cos(t)+uy*r*Math.sin(t)]);}
for(j=0;j<=6;j++){t=j*Math.PI/6;p.push([a-nx*r*Math.cos(t)-ux*r*Math.sin(t),b-ny*r*Math.cos(t)-uy*r*Math.sin(t)]);}return p;}
var TR=[[0,46],[7.5,46],[8,57],[13,63],[26,68],[37,71],[43,76],[45.5,84],[44,92],[33,98],[31.5,112],[29.5,130],[27,146],[28.5,160],[32,175],[33.5,190],[32.5,212],[29.5,238],[26,258],[25,272],[26.5,292],[23,318],[17.5,342]],
TL=[[7,342],[7.5,320],[7.5,296],[6,278],[6.5,262],[5.5,240],[3.5,214],[1.5,195],[0,193]],
FF=[[19.5,352],[21,360],[19.5,366.5],[13,368],[6.5,367.5],[4.3,360],[5,351]],
FB=[[18.3,352],[17,362],[12.5,367.5],[8,367],[5.8,360],[6,351]],
ARM=[[41,72],[45,79],[47.5,94],[48.5,112],[50.5,129],[52.5,146],[55,166],[58.3,187],[53.5,189],[49,187],[44,166],[40.5,148],[38,136],[35.5,124],[33.5,110],[32,96],[36,84]],
PALM=[[49,185],[58,185],[60.5,195],[61.3,205.5],[55,208],[48.8,205],[48.3,195]],
FG=[[57.5,191,64.3,206.5,2.2],[59.5,205,60.8,222,1.75],[56.4,206,57.3,226,1.75],[53.2,206,53.8,223.5,1.7],[50.2,204,50.6,218.5,1.55]],
AL=[[45,79],[47.5,95],[48.5,112],[50.5,129],[52.5,146],[55,166],[58,187]],
AM=[[32,96],[33.5,110],[35.5,124],[38,136],[40.5,148],[44,166],[49,187]];
function lp(P,t){var s=t*6,j=Math.max(0,Math.min(5,Math.floor(s))),r=s-j,a=P[j],b=P[j+1];return[a[0]+(b[0]-a[0])*r,a[1]+(b[1]-a[1])*r];}
function AP(t,v){var a=lp(AL,t),b=lp(AM,t);return[a[0]+(b[0]-a[0])*v,a[1]+(b[1]-a[1])*v];}
function arm(t0,t1,v0,v1){var p=[],j;for(j=0;j<=6;j++)p.push(AP(t0+(t1-t0)*j/6,v0));for(j=6;j>=0;j--)p.push(AP(t0+(t1-t0)*j/6,v1));return p;}
function trunk(v){var r=TR.concat(v==='f'?FF:FB,TL);return sm(r.concat(r.slice(1,-1).reverse().map(mx)));}
function limbs(){var o=[sm(ARM),sm(ARM.map(mx)),sm(PALM),sm(PALM.map(mx))];FG.forEach(function(g){var c=cap(g[0],g[1],g[2],g[3],g[4]);o.push(poly(c),poly(c.map(mx)));});return o;}
function head(){return[ell(0,30.5,16,22.5),ell(16.2,32,2.6,5.2),ell(-16.2,32,2.6,5.2)];}

/* ---------- dermatome bands: [level, clip, points|path, flags m=mirror h=hole] ---------- */
/* trunk boundary lines: [level below line, y at midline, slope]; front rises laterally, back falls laterally */
var FT=[['C2',30,0],['C3',55,.1],['C4',62,.1],['T2',83,.12],['T3',91,.15],['T4',97,.2],['T5',107,.2],['T6',115,.2],['T7',124,.22],['T8',131,.25],['T9',137,.25],['T10',143.5,.25],['T11',152,.25],['T12',161,.33],['L1',175,.55],['_',199,.55]],
BT=[['C2',30,0],['C3',53,.1],['C4',61,.1],['T2',79,.12],['T3',87,.15],['T4',95,.15],['T5',103,.15],['T6',111,.15],['T7',118,.15],['T8',125,.15],['T9',132,.15],['T10',139,.15],['T11',146,.15],['T12',153,.15],['L1',160,.15],['L2',167,.35,'h'],['L3',174,.5,'h'],['S2',182,.7,'h'],['_',288,0]],
RC=[0,186];
function ring(a,b){return circ(RC[0],RC[1],b)+(a?circ(RC[0],RC[1],a):'');}
var BANDS={f:[],b:[]},AN={f:{},b:{}};
[['f',FT,-1],['b',BT,1]].forEach(function(x){var v=x[0],t=x[1],s=x[2];for(var j=0;j<t.length-1;j++){var a=t[j],b=t[j+1];if(a[0]==='_')continue;
function y(q,X){return q[1]+s*q[2]*X;}
BANDS[v].push([a[0],'T',[[-72,y(a,72)],[0,a[1]],[72,y(a,72)],[72,y(b,72)],[0,b[1]],[-72,y(b,72)]],a[3]||'']);AN[v][a[0]]=[14,(y(a,14)+y(b,14))/2];}});
[['L2',[[0,199],[45,174.25],[45,203],[0,238]]],['L3',[[0,238],[45,203],[45,266],[0,290]]],['L4',[[0,290],[16,281.5],[14,318],[11,343],[7.2,356],[5,361],[3.5,376],[0,376]]],
['L5',[[16,281.5],[45,266],[45,334],[18.5,343],[16,352],[14.5,376],[3.5,376],[5,361],[7.2,356],[11,343],[14,318]]],['S1',[[45,334],[45,376],[14.5,376],[16,352],[18.5,343]]]].forEach(function(b){BANDS.f.push([b[0],'T',b[1],'m']);});
[['L4',[[0,288],[11,288],[9,340],[5,376],[0,376]]],['L5',[[24,288],[45,288],[45,322],[23.5,322]]],['S1',[[11,288],[24,288],[23.5,322],[45,322],[45,376],[5,376],[9,340]]]].forEach(function(b){BANDS.b.push([b[0],'T',b[1],'m']);});
BANDS.b.push(['S3','T',ring(9.5,16)],['S4','T',ring(4.5,9.5)],['S5','T',ring(0,4.5)]);
[['C4',-.6,.03,-.7,.5],['C5',.03,.64,-.7,.5],['C6',.64,1,-.7,.5],['T2',-.6,.33,.5,1.7],['T1',.33,.8,.5,1.7],['C8',.8,1,.5,1.7]].forEach(function(a){BANDS.f.push([a[0],'A',arm(a[1],a[2],a[3],a[4]),'m']);});
[['C4',-.6,.03,-.7,.64],['C5',.03,.64,-.7,.4],['C5',.03,.25,.4,.64],['C6',.64,1,-.7,.4],['C7',.25,1,.4,.64],['T2',-.6,.35,.64,1.7],['T1',.35,.8,.64,1.7],['C8',.8,1,.64,1.7]].forEach(function(a){BANDS.b.push([a[0],'A',arm(a[1],a[2],a[3],a[4]),'m']);});
var HD=[['C6',[[57.3,186],[76,186],[76,234],[59.1,234],[57.95,206]]],['C7',[[54.1,186],[57.3,186],[57.95,206],[59.1,234],[55.7,234],[54.8,206]]],['C8',[[40,186],[54.1,186],[54.8,206],[55.7,234],[40,234]]]];
HD.forEach(function(b){BANDS.f.push([b[0],'A',b[1],'m']);BANDS.b.push([b[0],'A',b[1],'m']);});
BANDS.f.push(['V','H',[[-40,0],[40,0],[40,60],[-40,60]]]);
BANDS.b.push(['V','H',[[-40,0],[40,0],[40,15],[0,17.5],[-40,15]]],['C2','H',[[-40,15],[0,17.5],[40,15],[40,60],[-40,60]]]);
function ext(o,v){for(var q in o)AN[v][q]=o[q];}
ext({V:[0,26],C2:[6,52.5],C3:[5,58.5],C4:[26,73],C5:AP(.35,.2),C6:AP(.8,.2),C7:[57,219],C8:[51,213],T1:AP(.55,.85),T2:AP(.12,.85),T4:[17,100],T6:[5,119.5],T10:[5,147.5],L1:[12,183],L2:[20,203],L3:[17,250],L4:[11,318],L5:[20,312],S1:[17.5,356]},'f');
ext({V:[0,10],C2:[0,36],C3:[5,57.5],C4:[26,72],C5:AP(.35,.15),C6:AP(.8,.15),C7:AP(.62,.52),C8:[51,213],T1:AP(.55,.9),T2:AP(.12,.9),L2:[22,178],L3:[27,192],S2:[17,240],S3:[12.5,186],S4:[7,186],S5:[0,186],L4:[6,320],L5:[33,305],S1:[17,335]},'b');
var PRI={C2:'b',S1:'b',S2:'b',S3:'b',S4:'b',S5:'b'};
var LMK={f:'<circle cx="17" cy="100" r=".9"/><circle cx="-17" cy="100" r=".9"/><circle cx="0" cy="148" r="1.1"/><path d="M-2.2,114.5L0,118.5L2.2,114.5"/><path d="M2,73Q16,69.5 34,74.5M-2,73Q-16,69.5 -34,74.5"/>',
b:'<path d="M12,84L30,81L34,89L18,123ZM13,90L37,84M-12,84L-30,81L-34,89L-18,123ZM-13,90L-37,84M6,172Q18,160 31,168M-6,172Q-18,160 -31,168M2.5,207Q15,214 28,206M-2.5,207Q-15,214 -28,206"/><path class="dash" d="M0,60V176"/><circle cx="0" cy="66" r="1.1"/>'};

/* ---------- helpers ---------- */
function fam(lv){if(lv==='V')return 'v';if(lv.indexOf('Co')===0)return 's1';return lv[0].toLowerCase()+(parseInt(lv.slice(1),10)%2?'1':'2');}
function nm(s){s=String(s).trim().toUpperCase();return s.indexOf('CO')===0?'Co'+(s.slice(2)||'1'):s;}
function parse(h){var out=[];(Array.isArray(h)?h:h?[h]:[]).join(',').split(',').forEach(function(s){if(!s.trim())return;var r=s.split(/[-–—]/).map(nm),a=ORD.indexOf(r[0]),b=ORD.indexOf(r[1]||r[0]),t;if(a<0||b<0)return;if(a>b){t=a;a=b;b=t;}for(var j=a;j<=b;j++)if(out.indexOf(ORD[j])<0)out.push(ORD[j]);});
return out.sort(function(x,y){return ORD.indexOf(x)-ORD.indexOf(y);});}
function runs(L){var R=[];L.forEach(function(l){var c=R[R.length-1];if(c&&ORD.indexOf(l)===ORD.indexOf(c[c.length-1])+1)c.push(l);else R.push([l]);});return R;}
function rl(r){return r.length>1?r[0]+'–'+r[r.length-1]:r[0];}
function rd(r){return r.length>1?D[r[0]]+' → '+D[r[r.length-1]]:D[r[0]];}
function dl(lv){return lv==='V'?0:Math.round((ORD.indexOf(lv)+1)*8);}
function ea(s){return String(s).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;');}
function emc(list,H){return (list||'').split(' ').some(function(l){return H[l];})?' em':'';}

/* ---------- figure ---------- */
function figure(v,cx,id,H){var sh=[trunk(v)].concat(limbs(),head()),o='<g transform="translate('+cx+',0)">',hl='';
o+='<g class="ol">'+sh.map(function(d){return '<path d="'+d+'" pathLength="1"/>';}).join('')+'</g><g class="bs">'+sh.map(function(d){return '<path d="'+d+'"/>';}).join('')+'</g><g class="bn">';
var L=BANDS[v].slice().sort(function(a,b){var o={T:0,A:1,H:2};return o[a[1]]-o[b[1]];});
L.forEach(function(b){var lv=b[0],fl=b[3]||'',cl=' clip-path="url(#'+id+b[1]+(b[1]==='T'?v:'')+')"',ev=typeof b[2]==='string'||fl.indexOf('h')>=0?' fill-rule="evenodd"':'';
(fl.indexOf('m')>=0?[1,-1]:[1]).forEach(function(s){var d=typeof b[2]==='string'?b[2]:poly(s>0?b[2]:b[2].map(mx));if(fl.indexOf('h')>=0)d+=circ(RC[0],RC[1],16);
var at=' data-lv="'+lv+'" d="'+d+'"'+cl+ev;o+='<path class="b"'+at+' fill="var(--bd-'+fam(lv)+')" style="--d:'+dl(lv)+'ms"><title>'+lv+' · '+D[lv]+'</title></path>';if(H[lv])hl+='<path class="h"'+at+'/>';});});
o+='</g><g class="lm">'+LMK[v]+'</g><g class="hlg" filter="url(#'+id+'g)">'+hl+'</g><text class="vl" x="0" y="386" text-anchor="middle">'+(v==='f'?'FRONT':'BACK')+'</text></g>';return o;}

/* ---------- spine panel ---------- */
function spine(id,H){var X=150,y=18,vb={},o='',W={C:[14,6.5],T:[17,7.2],L:[21,10]},vt='',n,j=0;
['C','T','L'].forEach(function(g){for(n=1;n<=(g==='C'?7:G[g]);n++){var w=W[g][0],h=W[g][1],nn=g+n;vb[nn]={t:y,b:y+h};
vt+='<rect class="vt'+(H[nn]?' on':'')+'" data-lv="'+nn+'" x="'+(X-w/2)+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="1.6" fill="var(--bd-'+fam(nn)+')" style="--d:'+(j++*7)+'ms"/>';y+=h+2;}});
var sT=y;for(n=1;n<=5;n++){var w1=22-(n-1)*2.6,w2=22-n*2.6,nn='S'+n;vb[nn]={t:y,b:y+7};
vt+='<path class="vt'+(H[nn]?' on':'')+'" data-lv="'+nn+'" d="'+poly([[X-w1/2,y],[X+w1/2,y],[X+w2/2,y+7],[X-w2/2,y+7]])+'" fill="var(--bd-'+fam(nn)+')" style="--d:'+(j++*7)+'ms"/>';y+=7;}
var sB=y;y+=2;for(n=1;n<=4;n++){var w=8-n*1.2,nn='Co'+n;vb[nn]={t:y,b:y+3.2};vt+='<rect class="vt'+(n===1&&H.Co1?' on':'')+'" data-lv="Co1" x="'+(X-w/2)+'" y="'+y+'" width="'+w+'" height="3.2" rx="1" fill="var(--bd-s1)" style="--d:'+(j++*7)+'ms"/>';y+=4.2;}
var VH=Math.ceil(y+10);
function mid(a,b){return(vb[a].b+vb[b].t)/2;}
var ex={C1:vb.C1.t-3};for(n=2;n<=7;n++)ex['C'+n]=mid('C'+(n-1),'C'+n);ex.C8=mid('C7','T1');
for(n=1;n<=12;n++)ex['T'+n]=mid('T'+n,n<12?'T'+(n+1):'L1');for(n=1;n<=4;n++)ex['L'+n]=mid('L'+n,'L'+(n+1));ex.L5=(vb.L5.b+sT)/2;
for(n=1;n<=4;n++)ex['S'+n]=sT+(n-.4)*7;ex.S5=sB-1;ex.Co1=vb.Co1.b+.5;
var cy=mid('L1','L2'),rt='',rh='';
function lr(a,b,t){return a+(b-a)*t;}
ORD.forEach(function(lv,q){var g=lv.replace(/\d/g,''),m=+lv.replace(/\D/g,''),e=ex[lv],sy,d;
if(g==='C')sy=e-1.5;else if(g==='T')sy=lr(ex.C8+3,vb.T9.b,(m-1)/11);else if(g==='L')sy=lr(vb.T10.t+2,vb.T12.b-3,(m-1)/4);else sy=lr(vb.L1.t,cy-4,(q-25)/5);
if(g==='C'||g==='T')d='M170,'+sy.toFixed(1)+'Q175,'+e.toFixed(1)+' 178,'+e.toFixed(1);
else{var ln=(175-(q-20)*.75).toFixed(2);d='M170,'+sy.toFixed(1)+'Q'+ln+','+sy.toFixed(1)+' '+ln+','+(sy+5).toFixed(1)+'L'+ln+','+(e-4).toFixed(1)+'Q'+ln+','+e.toFixed(1)+' 178,'+e.toFixed(1);}
d+='M178,'+e.toFixed(1)+'H186';var p='<path class="rt'+(H[lv]?' on':'')+'" data-lv="'+lv+'" d="'+d+'" style="--d:'+(q*7)+'ms"><title>'+lv+' · '+D[lv]+'</title></path>';if(H[lv])rh+=p;else rt+=p;});
function lay(a,g,lo,hi){a.sort(function(p,q){return p[1]-q[1];});var yy=lo;a.forEach(function(p){p.y=Math.max(p[1],yy);yy=p.y+g;});for(var z=a.length-1;z>=0;z--){var cap2=z===a.length-1?hi:a[z+1].y-g;if(a[z].y>cap2)a[z].y=cap2;}return a;}
function vc(x){return(vb[x].t+vb[x].b)/2;}
var LL=lay([['C1',vc('C1'),'C1'],['C7 · vertebra prominens',vc('C7'),'C7'],['T1',vc('T1'),'T1'],['T3 · spine of scapula',vc('T3'),'T3'],['T7 · scapula inferior angle',vc('T7'),'T7'],['T12',vc('T12'),'T12'],['L1',vc('L1'),'L1'],['L4 · iliac crests',vc('L4'),'L4'],['LP at L3–4 or L4–5',vc('L4')+.5,'L4'],['L5',vc('L5'),'L5'],['Sacrum S1–S5, fused',(sT+sB)/2,'S1 S2 S3 S4 S5'],['Coccyx, 4 fused',vb.Co2.t+2,'Co1']],11,8,VH-4),
RL=lay([['C1–C7 exit above vertebra',ex.C2,'C1 C2 C3 C4 C5 C6 C7','nt'],['Biceps C5–6',(ex.C5+ex.C6)/2,'C5 C6','rx'],['Brachioradialis C6',ex.C6,'C6','rx'],['Triceps C7',ex.C7,'C7','rx'],['C8 exits between C7–T1',ex.C8,'C8','nt'],['T1 and below exit below',ex.T1,'T1','nt'],['Adult cord ends L1–L2',cy,'','nt'],['Cauda equina',ex.L2+6,'','nt'],['Patellar L4 (L2–4)',ex.L4,'L2 L3 L4','rx'],['Achilles S1',ex.S1,'S1','rx']],11.5,8,VH-4),tx='';
LL.forEach(function(p){tx+='<path class="ld" d="M'+(X-12)+','+p[1].toFixed(1)+'L'+(X-16)+','+p.y.toFixed(1)+'"/><text class="tx'+emc(p[2],H)+'" x="'+(X-18)+'" y="'+p.y.toFixed(1)+'" dy=".35em" text-anchor="end">'+p[0]+'</text>';});
RL.forEach(function(p){tx+='<path class="ld" d="M187,'+p[1].toFixed(1)+'L193,'+p.y.toFixed(1)+'"/><text class="tx '+p[3]+emc(p[2],H)+'" x="196" y="'+p.y.toFixed(1)+'" dy=".35em">'+p[0]+'</text>';});
o='<svg class="ssv" viewBox="0 0 340 '+VH+'" role="img" aria-label="Spine: 33 vertebrae and 31 spinal nerve pairs'+(Object.keys(H).length?', highlighted '+Object.keys(H).join(', '):'')+'"><path class="sk" d="M130,12Q152,2 178,10"/>'+vt+
'<path class="cd" d="M168,8L172,8L172,'+(cy-9).toFixed(1)+'Q172,'+(cy-3).toFixed(1)+' 170,'+cy.toFixed(1)+'Q168,'+(cy-3).toFixed(1)+' 168,'+(cy-9).toFixed(1)+'Z"/>'+rt+'<g filter="url(#'+id+'g)">'+rh+'</g>'+tx+'</svg>';
return o;}

/* ---------- styles ---------- */
var DK='--bd-c1:#1F2937;--bd-c2:#27354A;--bd-t1:#1B2E29;--bd-t2:#223A33;--bd-l1:#33291B;--bd-l2:#3E3321;--bd-s1:#2A2434;--bd-s2:#342B41;--bd-v:#2B2A27';
var CSS=
'.mua-bd{--bd-c1:#E3EAF5;--bd-c2:#D3DEEE;--bd-t1:#E0EFEA;--bd-t2:#CDE4DB;--bd-l1:#F5EAD6;--bd-l2:#ECDABA;--bd-s1:#ECE5F3;--bd-s2:#DDD1EA;--bd-v:#ECEAE4;--bd-hl:var(--text-accent,#D85A30);--bd-ink:var(--surface-2,#fff);--bd-ol:var(--border-strong,rgba(0,0,0,.3));--bd-mu:var(--text-muted,#888);position:relative;max-width:440px;margin:0 auto;color:var(--text-primary,#222);font-weight:400}'+
'[data-mode="dark"] .mua-bd{'+DK+'}@media (prefers-color-scheme:dark){:root:not([data-mode]) .mua-bd{'+DK+'}}'+
'.mua-bd *{box-sizing:border-box}.mua-bd svg{display:block;width:100%;height:auto;overflow:visible;font-family:inherit}'+
'.mua-bdw .qq{text-align:center;font-size:15px;color:var(--text-secondary);margin-bottom:12px}.mua-bdw .kw{position:relative;display:inline-block;font-family:var(--font-voice,inherit);font-style:italic;font-size:22px;color:var(--text-primary);padding:0 2px}'+
'.mua-bd .fig{position:relative;margin:0 auto;border-radius:12px;outline:none}.mua-bd .fig.one{max-width:210px}.mua-bd .fig:focus-visible{outline:2px solid var(--border-accent,var(--bd-hl));outline-offset:3px}'+
'.mua-bd .ol path{fill:none;stroke:var(--bd-ol);stroke-width:1.6;stroke-linejoin:round}.mua-bd .bs path{fill:var(--bd-v)}'+
'.mua-bd .b{stroke:var(--bd-ink);stroke-width:.55;cursor:pointer;transition:fill .25s}.mua-bd .b.tp{fill:color-mix(in srgb,var(--bd-hl) 38%,var(--bd-v))}'+
'.mua-bd .h{fill:var(--bd-hl);stroke:var(--bd-hl);stroke-width:.4;cursor:pointer}.mua-bd .lm{pointer-events:none;fill:var(--bd-ol);stroke:var(--bd-ol);stroke-width:.5;opacity:.6}.mua-bd .lm path{fill:none}.mua-bd .lm .dash{stroke-dasharray:1 3}'+
'.mua-bd .vl{font-size:9px;letter-spacing:.14em;fill:var(--text-muted,#888);font-family:var(--font-mono,ui-monospace,monospace)}'+
'.mua-bd .dot{fill:var(--bd-ink);stroke:var(--bd-hl);stroke-width:1.4;pointer-events:none}'+
'.mua-bd .hc{position:absolute;transform:translate(var(--tx),-50%);font-size:11px;font-weight:500;line-height:1;padding:4px 7px;border-radius:999px;background:var(--bd-hl);color:var(--bd-ink);white-space:nowrap;pointer-events:none}'+
'.mua-bd .tip{display:none;position:absolute;z-index:3;max-width:240px;font-size:12px;line-height:1.45;padding:6px 10px;border-radius:10px;background:var(--surface-2,#fff);color:var(--text-primary,#222);border:0.5px solid var(--border-strong,#bbb);pointer-events:none}.mua-bd .tip.on{display:block}.mua-bd .tip b{font-weight:500;color:var(--bd-hl)}'+
'.mua-bd .lg{display:flex;flex-direction:column;gap:6px;margin-top:10px}.mua-bd .lr{display:flex;align-items:baseline;gap:8px;font-size:13px;line-height:1.5;color:var(--text-secondary)}.mua-bd .lr b{flex:none;font-weight:500;font-size:11px;padding:3px 7px;border-radius:999px;background:var(--bd-hl);color:var(--bd-ink)}.mua-bd .cap{font-size:13px;line-height:1.55;color:var(--text-secondary);text-align:center;margin-top:8px}'+
'.mua-bd .sp{margin-top:16px;padding-top:12px;border-top:0.5px solid var(--border,rgba(0,0,0,.1))}.mua-bd .lab{font-family:var(--font-mono,ui-monospace,monospace);font-size:11px;letter-spacing:.12em;color:var(--text-muted,#888);text-align:center;margin-bottom:6px}'+
'.mua-bd .vt{stroke:var(--bd-ol);stroke-width:.5;cursor:pointer}.mua-bd .vt.on{fill:var(--bd-hl);stroke:var(--bd-hl)}.mua-bd .cd{fill:var(--bd-mu);opacity:.35}.mua-bd .sk{fill:none;stroke:var(--bd-mu);stroke-width:1;opacity:.5}'+
'.mua-bd .rt{fill:none;stroke:var(--bd-mu);stroke-width:.7;opacity:.55;cursor:pointer}.mua-bd .rt.on{stroke:var(--bd-hl);stroke-width:1.6;opacity:1}.mua-bd .ld{fill:none;stroke:var(--bd-ol);stroke-width:.5}'+
'.mua-bd .tx{font-size:9.5px;fill:var(--text-secondary,#666)}.mua-bd .tx.nt{fill:var(--text-muted,#888)}.mua-bd .tx.rx{fill:var(--text-primary,#222)}.mua-bd .tx.em{fill:var(--bd-hl);font-weight:500}.mua-bd text{pointer-events:none}'+
'.mua-bd .rule{font-size:12.5px;line-height:1.6;color:var(--text-secondary);background:var(--surface-1,rgba(0,0,0,.04));border-radius:10px;padding:8px 12px;margin-top:8px}.mua-bd .rule span{white-space:nowrap}.mua-bd .rule .em{color:var(--text-primary);font-weight:500;text-decoration:underline;text-decoration-color:var(--bd-hl);text-underline-offset:2px}'+
'.mua-bd .cnt{font-size:11px;color:var(--text-muted,#888);text-align:center;margin-top:6px}.mua-bd .sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap}'+
'@media (prefers-reduced-motion:no-preference){.mua-bd .b,.mua-bd .vt,.mua-bd .rt{animation:muabdIn .28s cubic-bezier(.32,.72,0,1) both;animation-delay:var(--d,0ms)}'+
'.mua-bd .ol path{stroke-dasharray:1;stroke-dashoffset:1;animation:muabdDraw .5s cubic-bezier(.32,.72,0,1) forwards}'+
'.mua-bd .hlg,.mua-bd .rt.on{animation:muabdIn .25s cubic-bezier(.32,.72,0,1) .3s both,muabdPulse .8s ease-in-out .55s 3}.mua-bd .dot{animation:muabdIn .25s ease .45s both}'+
'.mua-bd .hc{animation:muabdChip .35s cubic-bezier(.32,.72,0,1) .45s both}.mua-bd .tip.on{animation:muabdTip .3s cubic-bezier(.32,.72,0,1) both}.mua-bd .lg,.mua-bd .sp{animation:muabdIn .4s cubic-bezier(.32,.72,0,1) .2s both}}'+
'@keyframes muabdIn{from{opacity:0}}@keyframes muabdDraw{to{stroke-dashoffset:0}}@keyframes muabdPulse{50%{opacity:.45}}'+
'@keyframes muabdChip{from{opacity:0;transform:translate(var(--tx),calc(-50% + 6px))}}@keyframes muabdTip{from{opacity:0;transform:translateY(6px)}}';
function css(){if(document.getElementById('mua-bd-css'))return;var s=document.createElement('style');s.id='mua-bd-css';s.textContent=CSS;document.head.appendChild(s);}

/* ---------- render ---------- */
function anchor(lv,views){var pv=PRI[lv]||'f',ord=pv==='f'?['f','b']:['b','f'];for(var j=0;j<2;j++){var v=ord[j],x=views.indexOf(v);if(x>=0&&AN[v][lv]&&BANDS[v].some(function(b){return b[0]===lv;})){var a=AN[v][lv],s=v==='f'?-1:1;return{v:v,x:75+150*x+s*a[0],y:a[1],side:v==='f'?'l':'r'};}}return null;}
function render(host,o){css();o=o||{};var id='muabd'+(++U),view=o.view||'both',views=view==='both'?['f','b']:[view==='back'?'b':'f'],W=150*views.length,VH=392,hl=parse(o.hl),H={},R=document.createElement('div');
hl.forEach(function(l){H[l]=1;});var RS=runs(hl),desc=RS.map(function(r){return rl(r)+' — '+rd(r);}).join('; ');
var defs='<defs>'+views.map(function(v){return '<clipPath id="'+id+'T'+v+'"><path d="'+trunk(v)+'"/></clipPath>';}).join('')+'<clipPath id="'+id+'A">'+limbs().map(function(d){return '<path d="'+d+'"/>';}).join('')+'</clipPath><clipPath id="'+id+'H">'+head().map(function(d){return '<path d="'+d+'"/>';}).join('')+'</clipPath>'+
'<filter id="'+id+'g" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="2.2" result="b"/><feComponentTransfer in="b" result="c"><feFuncA type="linear" slope=".7"/></feComponentTransfer><feMerge><feMergeNode in="c"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>';
var chips=[],dots='';RS.forEach(function(r){var lv=r.filter(function(l){return anchor(l,views);})[0];if(!lv)return;var a=anchor(lv,views);if(chips.some(function(c){return Math.abs(c.a.x-a.x)<30&&Math.abs(c.a.y-a.y)<14;}))a.side=a.side==='l'?'r':'l';chips.push({a:a,t:rl(r)});dots+='<circle class="dot" cx="'+a.x.toFixed(1)+'" cy="'+a.y.toFixed(1)+'" r="2.3"/>';});
var h='<div class="fig'+(views.length<2?' one':'')+'" tabindex="0" role="group" aria-label="Dermatome map. Arrow keys step through levels, Escape closes."><svg viewBox="0 0 '+W+' '+VH+'" role="img" aria-label="Dermatome map, '+(views.length>1?'front and back':views[0]==='f'?'front':'back')+' view'+(desc?'. Highlighted: '+ea(desc):'')+'">'+defs+views.map(function(v,x){return figure(v,75+150*x,id,H);}).join('')+dots+'</svg>';
chips.forEach(function(c){h+='<span class="hc" data-s="'+c.a.side+'" style="left:'+(c.a.x/W*100).toFixed(2)+'%;top:'+(c.a.y/VH*100).toFixed(2)+'%;--tx:'+(c.a.side==='l'?'calc(-100% - 7px)':'7px')+'">'+c.t+'</span>';});
h+='</div>';
if(RS.length)h+='<div class="lg">'+RS.map(function(r){return '<div class="lr"><b>'+rl(r)+'</b><span>'+rd(r)+'</span></div>';}).join('')+'</div>';
if(o.caption)h+='<div class="cap">'+o.caption+'</div>';
if(o.spine!==false)h+='<div class="sp"><div class="lab">SPINE · CORD · ROOTS</div>'+spine(id,H)+'<div class="rule">Disc herniation hits the root of the <b>lower</b> vertebra: <span class="'+emc('C6',H).trim()+'">C5–C6 → C6</span> · <span class="'+emc('L5',H).trim()+'">L4–L5 → L5</span> · <span class="'+emc('S1',H).trim()+'">L5–S1 → S1</span></div><div class="cnt">33 vertebrae 7·12·5·5·4 &nbsp;·&nbsp; 31 nerve pairs 8·12·5·5·1</div></div>';
h+='<div class="tip" aria-hidden="true"></div><div class="sr" aria-live="polite"></div>';
R.className='mua mua-bd';R.innerHTML=h;host.appendChild(R);wire(R,views,W,hl);return R;}
function wire(R,views,W,hl){var F=R.querySelector('.fig'),T=R.querySelector('.tip'),S=R.querySelector('.sr'),cur=-1,
LV=['V'].concat(ORD).filter(function(l){return anchor(l,views);});
function show(lv,x,y){T.innerHTML='<b>'+lv+'</b> · '+D[lv];T.classList.remove('on');void T.offsetWidth;T.classList.add('on');var w=T.offsetWidth,h=T.offsetHeight,rw=R.clientWidth;
T.style.left=Math.max(4,Math.min(rw-w-4,x-w/2))+'px';T.style.top=(y-h-12<0?y+14:y-h-12)+'px';S.textContent=lv+', '+D[lv];
R.querySelectorAll('.b.tp').forEach(function(e){e.classList.remove('tp');});R.querySelectorAll('.b[data-lv="'+lv+'"]').forEach(function(e){e.classList.add('tp');});}
R._hide=function(){T.classList.remove('on');R.querySelectorAll('.b.tp').forEach(function(e){e.classList.remove('tp');});};
R.addEventListener('click',function(e){var t=e.target.closest&&e.target.closest('[data-lv]');if(!t)return;var r=R.getBoundingClientRect();show(t.getAttribute('data-lv'),e.clientX-r.left,e.clientY-r.top);});
F.addEventListener('keydown',function(e){var k=e.key,n=LV.length;if(k==='ArrowRight'||k==='ArrowDown')cur=(cur+1)%n;else if(k==='ArrowLeft'||k==='ArrowUp')cur=(cur-1+n)%n;else if(k==='Enter'||k===' '){if(cur<0)cur=Math.max(0,LV.indexOf(hl[0]));}else{if(k==='Escape')R._hide();return;}
e.preventDefault();var lv=LV[cur],a=anchor(lv,views),sv=F.querySelector('svg').getBoundingClientRect(),r=R.getBoundingClientRect(),sc=sv.width/W;show(lv,sv.left-r.left+a.x*sc,sv.top-r.top+a.y*sc);});
requestAnimationFrame(function(){var fr=F.getBoundingClientRect();if(!fr.width)return;F.querySelectorAll('.hc').forEach(function(c){var b=c.getBoundingClientRect(),s=c.getAttribute('data-s');
if(s==='l'&&b.left<fr.left+2||s==='r'&&b.right>fr.right-2){c.setAttribute('data-s',s==='l'?'r':'l');c.style.setProperty('--tx',s==='l'?'7px':'calc(-100% - 7px)');}});});}
document.addEventListener('click',function(e){var t=e.target;document.querySelectorAll('.mua-bd .tip.on').forEach(function(x){var R=x.closest('.mua-bd');if(!(R.contains(t)&&t.closest&&t.closest('[data-lv]'))&&R._hide)R._hide();});});

/* ---------- API + auto-init of hook placeholders ---------- */
function init(el){if(el.getAttribute('data-mua-done'))return;el.setAttribute('data-mua-done','1');var o={};try{o=JSON.parse(el.getAttribute('data-mua-body')||'{}');}catch(e){}render(el,o);}
function scan(n){if(!n||n.nodeType!==1)return;if(n.hasAttribute('data-mua-body'))init(n);n.querySelectorAll('[data-mua-body]').forEach(init);}
M.body=function(id,o){var host=typeof id==='string'?document.getElementById(id):id;if(!host)return null;return render(host,o);};
M.body.v='1.2.0';M.body.levels=ORD.slice();M.body.desc=D;
M.h.body=function(o){o=o||{};var c={};['view','hl','spine','caption'].forEach(function(x){if(o[x]!=null)c[x]=o[x];});
return '<div class="mua-h mua-bdw">'+(o.q?'<div class="qq">'+o.q.replace('{kw}','<span class="kw hl">'+(o.kw||'')+'</span>')+'</div>':'')+'<div data-mua-body="'+ea(JSON.stringify(c))+'"></div></div>';};
if(window.MutationObserver)new MutationObserver(function(ms){ms.forEach(function(m){m.addedNodes.forEach(scan);});}).observe(document.documentElement,{childList:true,subtree:true});
if(document.body)scan(document.body);else document.addEventListener('DOMContentLoaded',function(){scan(document.body);});
})();
