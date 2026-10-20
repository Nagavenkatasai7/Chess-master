# ♛ Chess Master

A web app that teaches chess from your very first move to grandmaster-level understanding.

- **Learn**: a six-level curriculum (Foundations → Novice → Intermediate → Advanced → Expert → Master & GM path) with interactive boards. You get piece-movement challenges, find-the-move exercises, mating drills and step-through example games.
- **Puzzles**: a rated tactics trainer that adapts to your level, with theme practice (forks, pins, mates, endgames…), streaks and rating history.
- **Play**: 14 computer opponents from 250 to full Stockfish strength. Optional blunder alerts, hints, takebacks and an evaluation bar. Every game gets a **full review**: accuracy, best/inaccuracy/mistake/blunder labels, an evaluation graph, the engine's better moves and "retry from this position".
- **Openings**: about 16 major openings for White and Black. Study the ideas move by move, then drill the lines from memory with spaced repetition.
- **Tips & Traps**: practical rules of thumb for every phase of the game, plus the opening traps everyone should know.
- **Analysis board**: explore any position, or paste a FEN/PGN, with live Stockfish lines.
- **AI coach**: ask questions in plain English ("why was this a blunder?", "what's the plan here?"). It uses a **free** model on OpenRouter, and each question includes Stockfish's analysis so the explanations rest on accurate chess.
- **Progress**: rank ladder (Newcomer → Grandmaster), strength estimate, daily training plan, streaks, export/import.
- **Installs like a real app**: add it to your iPhone home screen (Safari → Share → Add to Home Screen) or install it from Chrome/Edge. It runs full screen and works offline. On phones you get native-style tab and title bars, a full-screen game mode with a bottom toolbar, swipe-back, launch screens, move sounds and haptics.

Everything runs in the browser. Stockfish 19 runs locally as WebAssembly, and progress is saved in `localStorage`.

## Getting started

```bash
npm install        # also copies the Stockfish engine into public/engine
npm run dev        # http://localhost:5173
```

Other scripts:

| Command | What it does |
| --- | --- |
| `npm run build` | Type-check and build a static site into `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm test` | Unit tests plus legality checks for all lessons, openings, traps and puzzles |
| `npm run verify:engine` | Runs Stockfish over every lesson exercise to confirm each solution really is the best move (`--level=N`, `--only=<id>`, `--openings`) |
| `node scripts/check-content.ts <level1…level6\|openings\|handbook\|puzzles>` | Legality check for one content area |
| `npm run puzzles:generate` | Regenerates/extends the puzzle set with Stockfish (see `scripts/puzzles/`) |

## Turning on the AI coach

There are two ways to power the coach. Both use **free** OpenRouter models.

**Shared key on the deployed site (recommended for hosting).** Set the `OPENROUTER_API_KEY` environment variable in Vercel; mark it *Sensitive*. The `api/chat.js` function forwards coach requests to OpenRouter with that key, so the key never reaches the browser. To keep a public site safe, the proxy:
- only allows free models (ids ending in `:free`);
- only accepts requests from the site's own pages;
- caps the size of each conversation.

`GET /api/chat?check=1&model=<id>` reports whether the key is valid and the model is available.

**Personal key in the browser.** Anyone can paste their own key under **Settings**. It is stored only in that browser and sent only to `openrouter.ai`. A personal key takes priority over the shared one. To get one, create a free account at [openrouter.ai](https://openrouter.ai), then create a key under **Settings → API Keys**. Free models need no credits.

The default model is `minimax/minimax-m3.1-flash:free`. The Settings dropdown lists OpenRouter's **live** free models. If a model is rate limited or unavailable, the coach automatically falls back to the next one: `minimax/minimax-m3:free`, then `nvidia/nemotron-3-ultra-550b-a55b:free`, and so on. Free models have daily request limits.

## How the content is kept correct

Language models are bad at chess, so this project doesn't trust hand-written positions:

- `src/data/validate.ts` (run by `npm test`) plays every lesson line, exercise, opening line and trap through chess.js. It also checks that mate exercises end in mate and that piece-movement drills can be solved within their move limit.
- `scripts/verify-content.ts` asks Stockfish whether each learner move in an exercise is actually the best move, and whether the scripted defence is the best defence.
- Puzzles are generated from Stockfish self-play, Lichess-style: a puzzle is kept only if the solution is the unique winning move at every step.

## Project structure

```
src/
  data/          lessons (curriculum/levelN.ts), openings, handbook, puzzles.json, schema + validators
  lib/           engine worker wrapper, bots, review, ratings, AI client, storage
  components/    Board, ExerciseBoard, LineViewer, GameReview, CoachPanel, …
  pages/         Home, Learn, Lesson, Puzzles, Play, Openings, Handbook, Analysis, Settings
scripts/         engine copy, content checks, puzzle generator
```

## Deploying

On Vercel (`vercel.json` is included), `npm install` runs the engine copy step, `npm run build` outputs `dist/`, and `api/chat.js` becomes the coach proxy function. Add `OPENROUTER_API_KEY` to enable the shared coach. Without Vercel, the static `dist/` folder runs on any host; the coach then needs a personal key in Settings.

## Licences

The Stockfish engine ([stockfish.js](https://github.com/nmrugg/stockfish.js)) is GPL-3.0 and ships with the built app. If you distribute the app, follow the GPL-3.0 terms for the engine.
