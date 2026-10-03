# _claude

Public helper code that Claude loads into chat widgets during study sessions, so each card only has to send its content, not its whole UI.

**Rule: nothing private goes here.** No questions, notes, scores, transcripts, names or API keys. Only generic UI code and tools.

## Contents
- `cards/card.js`: answer card (predict → options → strike → confidence tray with optional reasoning) and feedback card (quote → trap rows → hook). Load it pinned to a commit (tags can't be pushed from Claude sessions, and a commit pin never changes):
  `https://cdn.jsdelivr.net/gh/yinkev/_claude@01c1f4c5a18e460fce297635a4aeffe5ad8325b3/cards/card.js`  (v1.1.0)
- `cards/body.js`: body map. Front + back dermatome figure with a spine panel (vertebrae, roots, cord end, landmarks, reflexes, disc rule). Separate file so `card.js` stays small; works alone or with `card.js`, in either load order:
  `<script src="https://cdn.jsdelivr.net/gh/yinkev/_claude@2598948377d26bcd4c2a1c8a0ceaa63a2a3a3dac/cards/body.js"></script>`
- `cards/cozy.js`: **Cozy Anatomy** design system (chunky outlines, jelly discs, noodle nerves with DRG beads, press-down buttons, sticker labels, inventory tiles). `MUA.cozy.disc(id)` disc herniation → root with arm/leg dermatome and quiz · `MUA.cozy.injury(id)` lower-limb nerve detective (front/back legs, injured nerve, numb skin, injury site, 12 cases, quiz) · `MUA.cozy.oocyte(id)` egg cell life clock · `MUA.cozy.week1(id)` first week + fertilization steps · `MUA.cozy.fetal(id)` blood-making site + placental barrier · `MUA.cozy.crest(id)` neural crest sorter · `MUA.cozy.defects(id)` AFP / defect-type sorter · `MUA.cozy.sort(id,{title,bins,items,tabs?})` any sorter · `MUA.cozy.review(id,{title,score,meta,insight,topics,groups,next})` mock review (misses grouped by habit, tap for the fix) · `MUA.cozy.signal(id)` signal switchboard (RTK, Gq, Gs, Gi, NO; break a step) · `MUA.cozy.fluid(id)` water-shift lab + Fick comparer · `MUA.cozy.fixit(id)` 504 weak-spot sorter · **v1.3.0** `MUA.cozy.lesson(id,{chip,title,sub,lo:[{n,t}],blocks,say,foot})` data-only teaching chunk; block types: `quote{q,who,scope?}` · `def{items:[{k,t,src?}]}` · `eq{items:[{t}|{op}|{frac:[part,part]}|part],hint,sum}` with tappable parts `{t,c,k,d}` (c = jel/nd/bone/leaf/sac/numb) · `steps{items:[{h,t}]}` · `rule{t}` · `trap{k,t}` · `ions{rows:[{n,o,i}],note}` · `tiles{items:[{v,k,t,hi}]}` · `html{html}`; every block takes optional `h` (heading) + `at` (badge).
- `cards/looks.js`: design-direction references. `MUA.look.cozy(id)` (original Cozy) and `MUA.look.atlas(id)` (original Atlas plate) are kept as two separate styles for future work; `manual`, `sketch`, `atlas(id,{play:true})`, `cozy(id,{rich:true})` are the explored variants.
- `cards/lab.js`: study lab. Interactive teaching widgets (sliders, simulators, sorters) that work alone or with `card.js` / `body.js`:
  `MUA.lab.disc(id)` disc herniation simulator (root, skin, muscle, reflex, body map) · `MUA.lab.oocyte(id)` egg cell life clock · `MUA.lab.week1(id)` first week + fertilization steps · `MUA.lab.fetal(id)` blood-making site + placental barrier by week · `MUA.lab.crest(id)` neural crest sorter · `MUA.lab.defects(id)` AFP and defect-type sorter · `MUA.lab.injury(id)` injury → nerve board · `MUA.lab.sort(id,{title,bins,items})` any custom sorter.

## API (all data-only; the engine draws everything)
| Call | What it draws |
|---|---|
| `MUA.answer(id,{qid,label,stem,opts[5],img?,mark?:{x,y,arrow?},alt?})` | Answer card. With `img` it becomes a picture-ID card (tap to zoom, drag to pan, pulsing marker + optional arrow angle) |
| `MUA.feedback(id,{quote,who,traps:[{h,k?,p?}],note?,hook:{lab?,html},src,sr?})` | Feedback card. `k` = correct row, `p` = the student's wrong pick. Wrap the must-know fact in `<u class="bz">` |
| `MUA.h.fork/split/chain/timeline/ladder/grid/stamp/eq/mnemonic({...})` | Hook presets that return HTML for `hook.html`. Questions take `{kw}` for the highlighted keyword |
| `MUA.stepper(id,{lab,steps:[{t,d,chip,svg}],src})` | Tap/swipe-through diagram with cross-fading frames |
| `MUA.report(id,{items:[{q,ok,t}],kv:[[k,v]],bars:[{k,v,color}],insight})` | Session report: score ring, per-question strip, miss-type bars |
| `MUA.body(id,{view?:'front'\|'back'\|'both',hl?:[levels],spine?:true,caption?})` | Body map (needs `body.js`). Dermatome bands per level, highlighted levels glow and get a label chip; tap a band for its area. Levels `C2`…`C8`, `T1`…`T12`, `L1`…`L5`, `S1`…`S5`, or ranges like `'C5-T1'` |
| `MUA.h.body({...same opts, q?, kw?})` | Body map as a hook for `hook.html`. Placeholders auto-render when inserted into the page |

Body map example (a missed L4–L5 disc question):
```js
MUA.feedback('y',{quote:'...',who:'...',traps:[...],hook:{lab:'THE MAP',html:MUA.h.body({hl:['L5'],q:'L4–L5 disc → {kw}',kw:'L5'})},src:'...'})
```

Design rules baked in: host CSS tokens only (light + dark), iOS curve `cubic-bezier(.32,.72,0,1)`, flat tinted buttons (no neumorphism), reduced-motion safe, phone-first (tested at 390 px).

## Versions
| Version | Commit | Notes |
|---|---|---|
| v1.2.0 | 2598948 | Body map: dermatomes front/back + spine panel, highlight API |
| v1.1.0 | 01c1f4c | Picture-ID card (zoom, pan, pulsing marker), 9 hook presets, stepper, session report |
| v1.0.0 | 43148ad | First engine: answer card v6 look (tinted confidence buttons, plain eye strike, pencil note) + feedback card (quote, trap rows, hook) |
