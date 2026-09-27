# _claude

Public helper code that Claude loads into chat widgets during study sessions, so each card only has to send its content, not its whole UI.

**Rule: nothing private goes here.** No questions, notes, scores, transcripts, names or API keys. Only generic UI code and tools.

## Contents
- `cards/card.js`: answer card (predict → options → strike → confidence tray with optional reasoning) and feedback card (quote → trap rows → hook). Load it pinned to a commit (tags can't be pushed from Claude sessions, and a commit pin never changes):
  `https://cdn.jsdelivr.net/gh/yinkev/_claude@01c1f4c5a18e460fce297635a4aeffe5ad8325b3/cards/card.js`  (v1.1.0)

## API (all data-only; the engine draws everything)
| Call | What it draws |
|---|---|
| `MUA.answer(id,{qid,label,stem,opts[5],img?,mark?:{x,y,arrow?},alt?})` | Answer card. With `img` it becomes a picture-ID card (tap to zoom, drag to pan, pulsing marker + optional arrow angle) |
| `MUA.feedback(id,{quote,who,traps:[{h,k?,p?}],note?,hook:{lab?,html},src,sr?})` | Feedback card. `k` = correct row, `p` = the student's wrong pick. Wrap the must-know fact in `<u class="bz">` |
| `MUA.h.fork/split/chain/timeline/ladder/grid/stamp/eq/mnemonic({...})` | Hook presets that return HTML for `hook.html`. Questions take `{kw}` for the highlighted keyword |
| `MUA.stepper(id,{lab,steps:[{t,d,chip,svg}],src})` | Tap/swipe-through diagram with cross-fading frames |
| `MUA.report(id,{items:[{q,ok,t}],kv:[[k,v]],bars:[{k,v,color}],insight})` | Session report: score ring, per-question strip, miss-type bars |

Design rules baked in: host CSS tokens only (light + dark), iOS curve `cubic-bezier(.32,.72,0,1)`, flat tinted buttons (no neumorphism), reduced-motion safe, phone-first (tested at 390 px).

## Versions
| Version | Commit | Notes |
|---|---|---|
| v1.1.0 | 01c1f4c | Picture-ID card (zoom, pan, pulsing marker), 9 hook presets, stepper, session report |
| v1.0.0 | 43148ad | First engine: answer card v6 look (tinted confidence buttons, plain eye strike, pencil note) + feedback card (quote, trap rows, hook) |
