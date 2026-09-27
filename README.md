# _claude

Public helper code that Claude loads into chat widgets during study sessions, so each card only has to send its content, not its whole UI.

**Rule: nothing private goes here.** No questions, notes, scores, transcripts, names or API keys. Only generic UI code and tools.

## Contents
- `cards/card.js`: answer card (predict → options → strike → confidence tray with optional reasoning) and feedback card (quote → trap rows → hook). Load a pinned tag:
  `https://cdn.jsdelivr.net/gh/yinkev/_claude@v1.0.0/cards/card.js`
