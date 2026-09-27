# _claude

Public helper code that Claude loads into chat widgets during study sessions, so each card only has to send its content, not its whole UI.

**Rule: nothing private goes here.** No questions, notes, scores, transcripts, names or API keys. Only generic UI code and tools.

## Contents
- `cards/card.js`: answer card (predict → options → strike → confidence tray with optional reasoning) and feedback card (quote → trap rows → hook). Load it pinned to a commit (tags can't be pushed from Claude sessions, and a commit pin never changes):
  `https://cdn.jsdelivr.net/gh/yinkev/_claude@43148ad4c51372f72ddfe8137e2fd5bede9e0706/cards/card.js`  (v1.0.0)

## Versions
| Version | Commit | Notes |
|---|---|---|
| v1.0.0 | 43148ad | First engine: answer card v6 look (tinted confidence buttons, plain eye strike, pencil note) + feedback card (quote, trap rows, hook) |
