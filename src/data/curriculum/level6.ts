import type { Module } from '../types.ts'

// Level 6 "Master & GM path" (2200+): learning from the classics, building a
// repertoire, training like a grandmaster, psychology and the title path.
// Every line and exercise is checked by scripts/check-content.ts (legality)
// and scripts/verify-content.ts (engine soundness).

export const level6: Module[] = [
  // ─────────────────────────── 2. OPENING REPERTOIRE ───────────────────────────
  {
    id: 'l6-repertoire',
    level: 6,
    title: 'Building an opening repertoire',
    description:
      'Choosing openings that fit your style, how deep to prepare at each rating, ideas versus memorisation, model games, and preparing with engines and databases.',
    lessons: [
      {
        id: 'l6-rep-style',
        title: 'Choosing openings that fit your style',
        summary: 'A repertoire is a system, not a list of moves. Pick openings that lead to positions you understand and enjoy.',
        estMinutes: 12,
        blocks: [
          {
            type: 'text',
            md:
              "Below 2000 you can get away with almost any sound opening. At master level your opponents know their lines, prepare against you with databases, and punish inaccuracies in the first fifteen moves. Your opening choice becomes part of your *strategy*: it decides which kinds of middlegames you will play for the next several years.\n\n" +
              "A good repertoire is **stable** (you do not change it every month), **coherent** (the openings lead to related structures) and **suited to you**.",
          },
          {
            type: 'text',
            md:
              "### Know your style\n\n" +
              "Look honestly at your best and worst games and ask:\n\n" +
              "- Do I enjoy **initiative and tactics**, or **slow manoeuvring** and squeezing small advantages?\n" +
              "- Do I calculate well in sharp positions, or do I make my best decisions in quiet ones?\n" +
              "- Do I like to memorise, or do I prefer to understand typical plans and play on general principles?\n" +
              "- Which pawn structures do I handle well: open centres, closed centres, isolated pawns, hanging pawns?\n\n" +
              "Roughly speaking, openings fall into families:\n\n" +
              "- **Sharp and theoretical**: the Najdorf and Dragon Sicilians, the King's Indian, the Grünfeld, the Open Sicilian with White, the Botvinnik Semi-Slav.\n" +
              "- **Solid and classical**: the Caro-Kann, the Queen's Gambit Declined, the Berlin Defence, the Petroff, the Slav.\n" +
              "- **Flexible and positional**: the Catalan, the English, the Réti, the Queen's Indian.",
          },
          {
            type: 'tip',
            title: 'Coherence saves study time',
            md:
              "Choose openings that share structures and ideas. The Caro-Kann against 1.e4 and the Slav against 1.d4 both put a pawn on c6 and develop the light-squared bishop before ...e6. A 1.d4 player who plays the Catalan and the Queen's Gambit with White, and the Queen's Gambit Declined with Black, studies the same structures from both sides of the board.",
          },
          {
            type: 'line',
            moves: ['e4', 'c6', 'd4', 'd5', 'Nc3', 'dxe4', 'Nxe4', 'Bf5'],
            caption: 'Caro-Kann, Classical: the same idea as the Slav',
            notes: {
              2: 'Black prepares ...d5 with the c-pawn, keeping the c8-bishop free.',
              8: 'The light-squared bishop comes out to f5 *before* ...e6 locks it in. A Slav player will recognise this plan immediately.',
            },
          },
          {
            type: 'text',
            md:
              "### White and Black have different goals\n\n" +
              "- **With White**, aim for a lasting advantage or a durable initiative. You choose the battlefield, so choose lines where you know the plans better than your opponent.\n" +
              "- **With Black**, aim for a sound position with clear counterplay. A position that is objectively slightly worse but rich in ideas is often a better practical choice than a dry equality you do not understand.\n" +
              "- **Against weaker opponents**, prefer openings that keep pieces on the board and imbalances in the position. Against stronger opponents, a solid line you know well is often the best weapon.",
          },
        ],
      },
      {
        id: 'l6-rep-depth',
        title: 'How deep to prepare at each rating',
        summary: 'Breadth before depth, depth where the play is forcing, and always a plan for the moment your preparation ends.',
        estMinutes: 12,
        blocks: [
          {
            type: 'text',
            md:
              "How much theory do you really need? Less than you fear at 2000, more than you think at 2300. The right amount depends on three things: your rating, how *forcing* your openings are, and how much study time you have.\n\n" +
              "Opening study is also the easiest kind of study to overdo. It feels productive, but a player who knows 25 moves of theory and cannot convert a won endgame is not using his time well.",
          },
          {
            type: 'text',
            md:
              "### A rough guide by rating band\n\n" +
              "- **1800–2000**: know the first 8–10 moves of your main lines and, more importantly, the typical plans and pawn breaks. Have an answer to every reasonable reply in the first 5–6 moves so you are never surprised early. Most of your games will leave theory early anyway.\n" +
              "- **2000–2200**: 10–15 moves in your main lines and deeper in forcing lines. Know the critical tries against your repertoire and at least one good answer to each. This is the time to start a proper repertoire file.\n" +
              "- **2200–2400**: 15–20 moves in critical lines, with a worked-out answer to every serious system. Opponents now prepare for you specifically, so you need a back-up line and should check your main lines regularly.\n" +
              "- **2400+ and norm events**: professional preparation: 20–30 moves in forcing lines, novelties prepared at home, several openings in reserve and a yearly review of the whole repertoire.",
          },
          {
            type: 'tip',
            title: 'Depth follows forcingness',
            md:
              "In a quiet system such as the London or the Exchange Caro-Kann, a misremembered move costs a tempo. In the Najdorf Poisoned Pawn, the Botvinnik Semi-Slav or the Marshall Attack, a misremembered move can lose by force. The sharper the line, the deeper and more exact your preparation must be. If you do not have the time to maintain a sharp line, choose a quieter one.",
          },
          {
            type: 'line',
            moves: ['e4', 'c5', 'Nf3', 'd6', 'd4', 'cxd4', 'Nxd4', 'Nf6', 'Nc3', 'a6', 'Bg5', 'e6', 'f4', 'Qb6', 'Qd2', 'Qxb2', 'Rb1', 'Qa3'],
            caption: 'Najdorf, Poisoned Pawn: a line where only exact knowledge helps',
            notes: {
              11: '6.Bg5, one of the sharpest tries against the Najdorf.',
              14: 'Black attacks b2 and the d4-knight at the same time.',
              16: 'Black grabs the "poisoned" pawn. White gets a big lead in development for it.',
              18: 'From here the main lines (10.f5, 10.e5) are forcing for another 15–20 moves. Players who choose this line study it with an engine, and a single slip is usually decisive.',
            },
          },
          {
            type: 'line',
            moves: ['d4', 'd5', 'Bf4', 'Nf6', 'e3', 'e6', 'Nf3', 'c5', 'c3', 'Nc6', 'Nbd2', 'Bd6', 'Bg3', 'O-O', 'Bd3'],
            caption: 'London System: understanding matters more than move order',
            notes: {
              3: 'The bishop comes out before e3 so that it is not shut in.',
              13: 'The standard answer to ...Bd6: White keeps the bishop and invites ...Bxg3, which opens the h-file for a rook.',
              15: 'White has a set-up that hardly changes whatever Black does. Knowing the plans (Ne5 and f4, a kingside attack, or meeting Black\'s ...e5 or ...b6 and ...Ba6) matters far more than memorising moves.',
            },
          },
          {
            type: 'text',
            md:
              "### Breadth before depth\n\n" +
              "Most of your games will leave your main line early. Opponents play sidelines, transpose or simply forget theory. A common mistake is to know one main line 25 moves deep and nothing against a rare third move. Build your file in layers:\n\n" +
              "1. Every reasonable reply in the first 4–6 moves, with one good answer to each.\n" +
              "2. The main lines to the point where the middlegame begins, with a short note on the plans.\n" +
              "3. The critical, forcing lines, as deep as necessary.\n" +
              "4. A back-up line for when an opponent has clearly prepared your main line.",
          },
          {
            type: 'text',
            md:
              "### Know what to do when theory ends\n\n" +
              "The real test is the position just after your preparation stops. For every line in your file, write one or two sentences in words: what is the pawn structure, what are the plans for both sides, which pieces are good and which are bad, and which tactical motifs recur.\n\n" +
              "\"I left book on move 12, but I knew the plan\" beats \"I knew 22 moves and then had no idea what to do\" every time.",
          },
          {
            type: 'tip',
            title: 'Prepare what you actually meet',
            md:
              "If you have ten hours for openings this month, spend most of them on the lines you actually face. Load your own games into a database and sort them by opening: which systems do your opponents choose against you most often, and where did you get bad positions? Fix those first, before you study a fashionable line you have never had on the board.",
          },
        ],
      },
      {
        id: 'l6-rep-ideas',
        title: 'Ideas versus memorisation: model games',
        summary: 'Understanding the structure, the plans and the typical tactics of your openings, and how to learn them from model games.',
        estMinutes: 14,
        blocks: [
          {
            type: 'text',
            md:
              "Memorised moves without understanding are fragile. The moment your opponent deviates, or you forget a single move, you are on your own. Understanding is robust: if you know *why* each move is played, you can often reconstruct the line at the board, and you will find good moves when your opponent leaves theory.\n\n" +
              "Strong players do memorise a lot, but the memory sits on top of understanding. A grandmaster remembers a 20-move line partly because every move in it makes sense to him.",
          },
          {
            type: 'text',
            md:
              "### What to understand about every opening you play\n\n" +
              "- **The pawn structure** that usually arises, and the typical plans for both sides.\n" +
              "- **The pawn breaks**: which pawn moves free your position, and when they work.\n" +
              "- **Piece placement**: the best squares for each piece, and which piece is the \"problem piece\".\n" +
              "- **Typical tactics**: the recurring sacrifices and combinations, such as Bxh7+, Nd5 in the Sicilian, or the exchange sacrifice ...Rxc3.\n" +
              "- **Typical endgames**: which endings are good for you if the queens come off early.",
          },
          {
            type: 'text',
            md:
              "### Example: the Carlsbad structure and the minority attack\n\n" +
              "In the Exchange Variation of the Queen's Gambit Declined, the pawn structure is fixed early. White's classic plan is the **minority attack**: the b-pawn advances to b5 to create a weak pawn on c6, or, after ...cxb5, an isolated pawn on d5. Black's chances lie on the kingside, with a knight on e4, the break ...f5 or a direct piece attack.\n\n" +
              "Once you know these plans, you can play the position well even if you have never seen the exact move order.",
          },
          {
            type: 'line',
            moves: ['d4', 'd5', 'c4', 'e6', 'Nc3', 'Nf6', 'cxd5', 'exd5', 'Bg5', 'Be7', 'e3', 'c6', 'Bd3', 'Nbd7', 'Qc2', 'O-O', 'Nf3', 'Re8', 'O-O', 'Nf8', 'Rab1'],
            caption: 'Queen\'s Gambit Declined, Exchange Variation: the Carlsbad structure',
            notes: {
              7: 'The exchange on d5 fixes the pawn structure early.',
              12: 'Black\'s pawns on c6 and d5 against White\'s d4 and e3: the **Carlsbad** structure, named after a tournament held in Carlsbad in 1923.',
              20: 'A typical regrouping: the knight goes to g6 or e6 to defend the kingside, and the c8-bishop can come to g4.',
              21: 'White prepares b4 and b5. Two queenside pawns attack three: the *minority* attack.',
            },
          },
          {
            type: 'board',
            fen: 'r1bqrnk1/pp2bppp/2p2n2/3p2B1/3P4/2NBPN2/PPQ2PPP/1R3RK1 b - - 9 11',
            caption: 'The plan: b2-b4-b5 to attack c6. If Black allows bxc6, the c6-pawn (or the d5-pawn after ...cxb5) becomes a lasting target.',
            arrows: [['b2', 'b4'], ['b4', 'b5']],
            highlights: ['c6', 'd5'],
          },
          {
            type: 'text',
            md:
              "### How to study model games\n\n" +
              "1. Collect 10–20 games in your opening played by strong players. Filter a database for games where both players are rated 2500+, and include a few classics.\n" +
              "2. Play through them quickly first, just to absorb the typical plans and piece placements. Patterns appear fast: the same manoeuvres, the same pawn breaks, the same endgames.\n" +
              "3. Pick two or three games and study them deeply. Cover the moves and guess each one before you look, annotate the game yourself, and only then compare with a strong annotator or an engine.\n" +
              "4. Note the moment each game leaves theory and what the strong player did next.\n" +
              "5. Replay your model games before a tournament. It is the fastest way to refresh an opening.",
          },
          {
            type: 'tip',
            title: 'Learn from the opening\'s champions',
            md:
              "Most openings have a few players whose games define them: Karpov in the Caro-Kann and the Queen's Indian, Fischer and Kasparov in the Najdorf, Kramnik in the Berlin Defence, Carlsen in many quiet systems. A collection of one great player's games in your opening is a ready-made textbook.",
          },
          {
            type: 'text',
            md:
              "### When memorisation is necessary\n\n" +
              "Some things you simply have to know by heart: forcing lines where one wrong move loses, move-order tricks and transpositions, and the exact sequence of your main lines up to the critical position.\n\n" +
              "Use spaced repetition for these: a training app or flashcards that show you each position again just before you would forget it. Ten minutes a day works far better than cramming the night before a tournament.",
          },
        ],
      },
      {
        id: 'l6-rep-engines',
        title: 'Preparing with engines and databases',
        summary: 'A practical workflow: database first, engine second, conclusions in your own words.',
        estMinutes: 14,
        blocks: [
          {
            type: 'text',
            md:
              "The modern player has two tools that Botvinnik and Fischer never had: a database of millions of games and an engine far stronger than any human. Used well, they make preparation fast and reliable. Used badly, they produce a repertoire of computer moves that you do not understand and cannot play.",
          },
          {
            type: 'text',
            md:
              "### The tools\n\n" +
              "- **Databases**: large collections of master games (for example ChessBase's Mega Database or the free master databases online), plus databases of millions of online games. An opening explorer lets you switch between master games and amateur games filtered by rating.\n" +
              "- **Engines**: Stockfish, the strongest classical engine, and Leela Chess Zero, a neural-network engine that is often better at judging long-term compensation. When an evaluation really matters, ask both.\n" +
              "- **A repertoire file**: a database, an online study or a training-app course where you store your lines together with your notes.",
          },
          {
            type: 'text',
            md:
              "### A workflow for preparing a line\n\n" +
              "1. **Start with the database, not the engine.** What do strong players play here? Which moves are popular and which score well? A 70% score from six games means very little; a trend in hundreds of games means a lot.\n" +
              "2. **Play through the top games** in the line and note the typical plans. This is the model-game work from the previous lesson.\n" +
              "3. **Find the critical positions**: where the main lines branch, where the opponent has a dangerous sideline, where a typical mistake happens.\n" +
              "4. **Use the engine to check, not to choose.** Let it think on the critical positions and look at its top three moves (multi-PV), not just the first one.\n" +
              "5. **Look for practical choices.** Two moves may both be 0.00, but one leads to a position where the opponent must find three only-moves. That is the move to prepare.\n" +
              "6. **Write your conclusions in words** in your file: the main idea, the dangerous replies and the plans when the line ends.\n" +
              "7. **Revisit regularly.** Theory moves fast at master level. Check your critical lines a few times a year and after every game in which you were surprised.",
          },
          {
            type: 'tip',
            title: 'Engine evaluations in the opening',
            md:
              "The difference between +0.30 and +0.10 is almost meaningless in human play. What matters is the *type* of position: do you understand it, and is it harder for your opponent than for you? Be sceptical of quick evaluations too. A \"novelty\" that looks good after ten seconds may be refuted after ten minutes of deeper search.",
          },
          {
            type: 'tip',
            title: 'Common mistake: copying the engine',
            md:
              "Never put a move in your repertoire that you do not understand. If the engine's first choice is a bizarre manoeuvre that you would never find yourself, work out what it is trying to achieve. If you still cannot explain it, choose a more human move that is almost as good. At the board, you will have to play the position that follows, not the engine.",
          },
          {
            type: 'text',
            md:
              "### Novelties and surprise weapons\n\n" +
              "Professional players hunt for **novelties**: new moves in known positions, prepared at home with the engine, that set the opponent new problems. You do not need to discover novelties to reach master level, but you can borrow the idea:\n\n" +
              "- Keep one or two **surprise weapons** (a rare but sound line) for important games.\n" +
              "- Prefer surprises that are sound but uncomfortable: positions with a clear plan for you and no obvious plan for an unprepared opponent.\n" +
              "- Do not use a surprise you have not tested in training games first.\n\n" +
              "In the psychology module we look at how to prepare against a *specific* opponent, which is where databases are most powerful.",
          },
        ],
      },
    ],
  },

  // ─────────────────────────── 2. TRAINING LIKE A GM ───────────────────────────
  {
    id: 'l6-training',
    level: 6,
    title: 'Training like a grandmaster',
    description:
      'Deliberate practice, daily tactics, calculation training, analysing your own games, an endgame plan, long games and coaching, a book path and sample weekly schedules.',
    lessons: [
      {
        id: 'l6-train-deliberate',
        title: 'Deliberate practice and daily tactics',
        summary: 'Why playing a thousand blitz games is not training, and how to make every training hour count.',
        estMinutes: 12,
        blocks: [
          {
            type: 'text',
            md:
              "Many club players are stuck at the same rating for years even though they play every day. They are *practising*, but not *training*. Playing blitz is fun and keeps your patterns fresh, but it rarely forces you to do the hard thinking that makes you stronger.\n\n" +
              "Psychologists who study expertise, such as K. Anders Ericsson and Neil Charness, found that the amount of time chess players spent on serious study on their own was one of the best predictors of their strength. They called this kind of work **deliberate practice**.",
          },
          {
            type: 'text',
            md:
              "### The four ingredients of deliberate practice\n\n" +
              "1. **A specific goal.** Not \"study chess\" but \"solve six rook-endgame positions\" or \"annotate my last loss\".\n" +
              "2. **Difficulty at the edge of your ability.** If every position is easy, you are only revising. If none can be solved, you are only guessing. Aim for work you can do with real effort.\n" +
              "3. **Full concentration.** Phone in another room, no notifications, no engine running in the background. Sixty focused minutes beat three distracted hours.\n" +
              "4. **Feedback.** Check every answer, write down what you got wrong and why, and come back to your mistakes.",
          },
          {
            type: 'text',
            md:
              "### Daily tactics: two kinds of work\n\n" +
              "- **Pattern work (speed).** Many easy and medium puzzles, solved quickly. This builds the library of patterns that lets you *see* tactics at a glance. 15–20 minutes a day is enough.\n" +
              "- **Depth work (calculation).** A few hard positions, each solved completely before you check. This is calculation training, covered in the next lesson.\n\n" +
              "A popular method for pattern work is the **Woodpecker Method** (Axel Smith and Hans Tikkanen): take a fixed set of a few hundred to a thousand puzzles, solve them all, then solve the *same set* again in less time, and again, in shorter and shorter cycles. The repetition burns the patterns into your memory.",
          },
          {
            type: 'tip',
            title: 'Calculate, then move',
            md:
              "Online puzzle streaks reward fast clicking, and that builds a bad habit: playing the first move that looks right and seeing what happens. When you train, force yourself to see the whole solution, including the opponent's best defences, *before* you touch a piece. If you could not have written the solution down, count the puzzle as failed even if your first move was correct.",
          },
          {
            type: 'tip',
            title: 'Keep a training log',
            md:
              "Write down what you did each day and what went wrong: \"missed a back-rank tactic\", \"miscounted a pawn race\", \"spent 25 minutes on move 14\". After a month the log shows your real weaknesses, and those become next month's training plan.",
          },
        ],
      },
      {
        id: 'l6-train-calc',
        title: 'Calculation training, Dvoretsky-style',
        summary: 'Solving hard positions without moving the pieces, writing your variations down and learning from the difference.',
        estMinutes: 14,
        blocks: [
          {
            type: 'text',
            md:
              "Mark Dvoretsky (1947–2016) was the most famous chess trainer of his era. His pupils included Artur Yusupov, Sergey Dolmatov and Alexei Dreev, and a whole generation of top players trained with his books and exercises.\n\n" +
              "His core idea was simple: calculation improves when you solve **difficult** positions under **tournament conditions** and then honestly compare your analysis with the truth.",
          },
          {
            type: 'text',
            md:
              "### The method\n\n" +
              "1. **Set up the position and do not move the pieces.** Use a diagram or a board you do not touch, just as in a real game.\n" +
              "2. **Set a time limit**: 10–20 minutes for a middlegame position, up to 30–45 minutes for a hard endgame study.\n" +
              "3. **Write down your full solution**, including the opponent's main defences and the side lines, as if you were annotating the position for a book.\n" +
              "4. **Only then check the answer.** Give yourself an honest score.\n" +
              "5. **Find the reason for each error**: a candidate move you never considered, a defence you missed, a wrong evaluation at the end of a line, or a visualisation error (a piece \"seen\" on the wrong square).",
          },
          {
            type: 'text',
            md:
              "### What to solve\n\n" +
              "- **Critical moments from master games**, especially positions with several tempting candidate moves, where you must compare lines rather than find one trick.\n" +
              "- **Endgame studies.** Composed studies have a unique solution and are full of surprising resources: stalemates, underpromotions, quiet moves. They train imagination and precision at the same time.\n" +
              "- **Defensive positions.** Most puzzle books show the attacker's view. Positions where you must find the only defence train the blind spots that cost points in real games.\n\n" +
              "Good sources include Dvoretsky's own books, Artur Yusupov's training series, and Jacob Aagaard's *Grandmaster Preparation: Calculation*.",
          },
          {
            type: 'board',
            fen: 'b2r3r/k4p1p/p2q1np1/NppP4/3p1Q2/P4PPB/1PP4P/1K1RR3 w - - 1 24',
            caption: 'Kasparov – Topalov, Wijk aan Zee 1999. White to move. A classic calculation exercise: Kasparov played 24.Rxd4!!, and the main line runs another 20 moves. Give yourself 30 minutes, write down what you see, then compare with the game in the classics module.',
            arrows: [['d1', 'd4']],
          },
          {
            type: 'tip',
            title: 'Train visualisation separately',
            md:
              "If your lines fall apart after four or five moves, the problem is often visualisation, not calculation. Play through annotated games from a book *without a board* for a few moves at a time, solve simple positions blindfold, and replay the openings you know in your head. A few minutes a day makes a noticeable difference within weeks.",
          },
          {
            type: 'text',
            md:
              "### Playing out positions\n\n" +
              "Dvoretsky also used **training games from set positions**: a pupil and a partner (or an engine at a suitable strength) play out an interesting position with a clock, then swap colours. It is excellent practice for positions you will meet in your openings, for typical endgames, and for converting an advantage or defending a worse position.",
          },
        ],
      },
      {
        id: 'l6-train-own-games',
        title: 'Analysing your own games',
        summary: 'Your own games show your real weaknesses. Analyse them yourself first and switch the engine on last.',
        estMinutes: 12,
        blocks: [
          {
            type: 'text',
            md:
              "Your own games are the most valuable training material you have, because they show your *actual* weaknesses rather than the ones you imagine. Every strong player has a habit of analysing his games seriously. Botvinnik even published his own analysis so that others could check it and point out his mistakes.",
          },
          {
            type: 'text',
            md:
              "### The order matters: you first, engine last\n\n" +
              "1. **Straight after the game**, note what you were thinking: the lines you calculated, what you were afraid of, where you used a lot of time. These thoughts disappear within a day. If your opponent is willing, a short post-mortem together is valuable too.\n" +
              "2. **The next day, analyse alone without an engine.** Find the critical moments, write variations and, above all, *words*: why was this move played, what was the plan, what did you misjudge?\n" +
              "3. **If you have a coach or a stronger friend**, show them your annotated game before anyone switches an engine on.\n" +
              "4. **Then check with the engine.** Look at the moments where the evaluation jumps and ask why you went wrong there, not just what the better move was.\n" +
              "5. **Classify each mistake**: tactical oversight, calculation error, wrong plan, opening knowledge, endgame technique, time trouble, or a psychological error such as overconfidence or fear.\n" +
              "6. **Record the pattern** in your training log. Three games with the same kind of mistake tell you exactly what to train next.",
          },
          {
            type: 'tip',
            title: 'Why not switch the engine on first?',
            md:
              "The engine tells you *what* was best, never *why* you missed it. Once you have seen its line you can no longer think independently about the position, so you lose the chance to train your own evaluation. Analysing first also makes the engine's verdict far more instructive: you see exactly where your thinking parted from the truth.",
          },
          {
            type: 'text',
            md:
              "### What to look for\n\n" +
              "- **Critical moments**: positions where the game could have gone in a different direction. Did you notice them during the game and spend your time there?\n" +
              "- **Clock usage**: note your remaining time every few moves. Many players think too long in the opening and play the decisive phase in time trouble.\n" +
              "- **Your opponent's ideas**: were you surprised by his plans or tactics? Missing the opponent's intentions is a separate weakness from missing your own chances.\n" +
              "- **Your wins as well as your losses**: in a win, the opponent's mistakes often hide your own.",
          },
        ],
      },
      {
        id: 'l6-train-play',
        title: 'Long games, coaches and training partners',
        summary: 'Slow games are where you improve, and a good coach or training group multiplies the value of your work.',
        estMinutes: 10,
        blocks: [
          {
            type: 'text',
            md:
              "### Play long games\n\n" +
              "Rating improvements come from **classical games**: time controls such as 90 minutes plus a 30-second increment, where you have time to think, calculate and plan. Rapid and blitz have their place, but they reward reflexes and pattern recognition, not deep thinking.\n\n" +
              "- Aim for **at least four classical games a month**, more in tournament periods.\n" +
              "- If over-the-board events are rare where you live, play long online games (45+45 leagues are popular) and treat them like real tournament games.\n" +
              "- Use blitz to test openings and to relax, not as your main diet. Ten blitz games do not equal one serious game analysed properly.",
          },
          {
            type: 'text',
            md:
              "### Working with a coach\n\n" +
              "A good coach sees patterns in your play that you cannot see yourself, chooses training material at the right level, and holds you accountable. At master level, look for a titled player who is also an experienced *trainer*: playing strength and teaching skill are different things.\n\n" +
              "- Send your coach your **annotated** games, not raw scores. Your thoughts are what the coach needs to see.\n" +
              "- Agree on a plan for the next few months: two or three main goals, not ten.\n" +
              "- Do the homework. A weekly lesson without work in between brings little.",
          },
          {
            type: 'text',
            md:
              "### Training partners and groups\n\n" +
              "Not everyone can afford a coach. A training partner of similar strength is the next best thing: you can analyse your games together, solve positions against the clock and compare answers, play training games from set positions, and prepare for tournaments together. Many strong players came from small training groups where everyone pushed everyone else.",
          },
          {
            type: 'tip',
            title: 'Strong opposition',
            md:
              "Play in sections and tournaments where most opponents are *stronger* than you, even if your score suffers at first. Losing to stronger players teaches you more than beating weaker ones, and it prepares you for the norm events you will want to play later.",
          },
        ],
      },
      {
        id: 'l6-train-endgames',
        title: 'An endgame study plan',
        summary: 'Theoretical positions, technique and endgame calculation, in stages that fit your rating.',
        estMinutes: 12,
        blocks: [
          {
            type: 'text',
            md:
              "Endgames are where many players between 2000 and 2300 lose the most points, and also where study pays off for the rest of your chess life. Opening theory changes every year, but the Lucena and Philidor positions have been known for centuries and will never change.\n\n" +
              "Endgame skill has three parts:\n\n" +
              "- **Theoretical knowledge**: the exact positions you must know (won, drawn, and how).\n" +
              "- **Technique**: converting an advantage and defending a worse position in practical endings.\n" +
              "- **Endgame calculation**: precise counting of pawn races, king marches and zugzwang.",
          },
          {
            type: 'text',
            md:
              "### Stage 1 (up to about 2000)\n\n" +
              "Work through Jeremy Silman's *Silman's Complete Endgame Course*, which is organised by rating, up to the sections for your level. Master the essentials: king and pawn endings (opposition, key squares, outside passed pawns), the Lucena and Philidor positions, the basic queen and rook endings, and the bishop and knight mate.\n\n" +
              "### Stage 2 (2000–2300)\n\n" +
              "Move on to Mark Dvoretsky's *Dvoretsky's Endgame Manual*. Start with the core positions (highlighted in the book), which are the minimum knowledge for a master: the Vancura position, rook against pawns, queen against rook, opposite-coloured bishops, bishop against knight, and the main rook-and-pawn positions.\n\n" +
              "### Stage 3 (2300 and beyond)\n\n" +
              "Study the rest of the *Endgame Manual*, add a book on technique such as Mark Shereshevsky's *Endgame Strategy*, keep *Fundamental Chess Endings* (Müller and Lamprecht) as a reference, and solve endgame studies regularly.",
          },
          {
            type: 'tip',
            title: 'Principles of technique',
            md:
              "- **Do not hurry.** If the opponent has no counterplay, improve your position move by move before you go for the decisive action.\n" +
              "- **The principle of two weaknesses.** One weakness can usually be defended. Create a second one on the other wing and the defence collapses.\n" +
              "- **When ahead, trade pieces, not pawns.** Every pawn exchange brings the defender closer to a theoretical draw.\n" +
              "- **Activate the king.** In the endgame the king is a strong piece. Bring it to the centre before the fight starts.\n" +
              "- **Think in schemes.** Decide where your pieces belong and move them there, rather than calculating every move from scratch.",
          },
          {
            type: 'text',
            md:
              "### Habits that make endgame study stick\n\n" +
              "- Spend **one to two hours a week** on endgames, all year, not just when you remember.\n" +
              "- **Play out** each theoretical position against a partner or an engine until you can win (or draw) it reliably. Knowing the method on paper is not the same as finding it with the clock running.\n" +
              "- Every month, **review the core positions** with flashcards or a spaced-repetition app.\n" +
              "- Analyse every endgame from your own games with extra care. They show which positions you really need to learn next.",
          },
        ],
      },
      {
        id: 'l6-train-books',
        title: 'A book path by rating',
        summary: 'Six classic books, and a few more, in the order that suits a rising player.',
        estMinutes: 10,
        blocks: [
          {
            type: 'text',
            md:
              "Good books are still the most concentrated chess knowledge you can buy. The trick is to read the right book at the right time, and to *work* through it rather than skim it. Here is a path from club level to the edge of grandmaster strength.",
          },
          {
            type: 'text',
            md:
              "### 1. Logical Chess: Move by Move (Irving Chernev)\n\n" +
              "Thirty-three complete games in which *every* move is explained in plain words. Ideal when you are moving from club level towards 1800: it shows how master moves follow from simple principles.\n\n" +
              "### 2. Silman's Complete Endgame Course (Jeremy Silman)\n\n" +
              "The endgame book that grows with you, organised by rating class from beginner to master. Read each section as you reach its rating.\n\n" +
              "### 3. My System (Aron Nimzowitsch)\n\n" +
              "The classic of positional chess (1925): open files, the seventh rank, passed pawns and blockade, prophylaxis, overprotection and pawn chains. Some of the language is old-fashioned, but the ideas are still used by every strong player. Best read at about 1800–2100.\n\n" +
              "### 4. Think Like a Grandmaster (Alexander Kotov)\n\n" +
              "The book that introduced candidate moves and the tree of analysis (1971). Read it once you can solve basic tactics reliably and want to calculate long lines in an organised way.\n\n" +
              "### 5. Dvoretsky's Endgame Manual (Mark Dvoretsky)\n\n" +
              "The standard reference for theoretical endgames at master level. Start with the core positions at about 2000 and return to it for years.\n\n" +
              "### 6. Grandmaster Preparation series (Jacob Aagaard)\n\n" +
              "Six volumes (*Calculation*, *Positional Play*, *Strategic Play*, *Attack & Defence*, *Endgame Play* and *Thinking Inside the Box*) built around very hard exercises. This is training material for players of about 2200 and above who are aiming at IM and GM titles.",
          },
          {
            type: 'text',
            md:
              "### Also highly recommended\n\n" +
              "- Bobby Fischer, *My 60 Memorable Games*, and David Bronstein's book on the *Zurich 1953* Candidates tournament: two of the best annotated game collections ever written.\n" +
              "- Mark Shereshevsky, *Endgame Strategy*: how to convert endgame advantages.\n" +
              "- Axel Smith and Hans Tikkanen, *The Woodpecker Method*: a large tactics set designed for repetition.\n" +
              "- Artur Yusupov's nine-volume training course, which takes a player from club level to about 2100 step by step.",
          },
          {
            type: 'tip',
            title: 'How to read a chess book',
            md:
              "Use a real board. Before each move in an annotated game, cover the page and guess. Solve every exercise properly before reading the answer. Read one book at a time, slowly, and finish it. One book worked through properly is worth more than ten on the shelf.",
          },
        ],
      },
      {
        id: 'l6-train-schedule',
        title: 'Sample weekly schedules',
        summary: 'How a 2000, a 2200 and a 2400 player might divide their training week.',
        estMinutes: 10,
        blocks: [
          {
            type: 'text',
            md:
              "A training plan only works if you can keep it up. **Consistency beats heroics**: an hour a day for a year will take you further than a ten-hour weekend once a month. The schedules below are examples to adapt, not rules. Adjust them to your job or studies, and keep at least one day a week free of chess.",
          },
          {
            type: 'text',
            md:
              "### Around 1800–2000 (about 8 hours a week)\n\n" +
              "- **Mon**: 20 min tactics, 40 min endgames (Silman)\n" +
              "- **Tue**: 20 min tactics, 40 min annotated games (Chernev, guess the move)\n" +
              "- **Wed**: 20 min tactics, 40 min openings (plans and model games)\n" +
              "- **Thu**: rest\n" +
              "- **Fri**: 20 min tactics, 40 min calculation (two or three harder positions)\n" +
              "- **Sat**: one long game (club, tournament or online 45+45)\n" +
              "- **Sun**: analyse Saturday's game yourself (one hour), then check with the engine\n\n" +
              "Rough split: tactics and calculation 35%, own games 30%, endgames 15%, openings 10%, master games 10%.",
          },
          {
            type: 'text',
            md:
              "### Around 2000–2200 (about 12 hours a week)\n\n" +
              "- **Mon**: 20 min tactics, 60 min endgames (*Dvoretsky's Endgame Manual*, core positions)\n" +
              "- **Tue**: 20 min tactics, 60 min calculation (three or four positions, solutions written down)\n" +
              "- **Wed**: 20 min tactics, 60 min openings (repertoire file, model games)\n" +
              "- **Thu**: 60 min strategy (*My System*, classic games)\n" +
              "- **Fri**: rest\n" +
              "- **Sat**: one long game\n" +
              "- **Sun**: analyse Saturday's game, update your training log, plan next week\n\n" +
              "Rough split: calculation 30%, own games 25%, endgames 20%, openings 15%, strategy and classics 10%.",
          },
          {
            type: 'text',
            md:
              "### Around 2200–2400 (about 15–20 hours a week)\n\n" +
              "- **Mon**: 90 min calculation (Aagaard, studies), 30 min tactics\n" +
              "- **Tue**: 90 min openings (critical lines checked with the engine, back-up lines)\n" +
              "- **Wed**: 60 min endgames, 60 min training games from set positions with a partner\n" +
              "- **Thu**: 90 min annotated master games and classics, 30 min tactics\n" +
              "- **Fri**: rest or light work (blitz with a friend, review flashcards)\n" +
              "- **Sat and Sun**: tournament games, or one long game plus deep analysis\n\n" +
              "Rough split: calculation 25%, own games 25%, openings 20%, endgames 15%, strategy and classics 15%.\n\n" +
              "Players aiming at IM and GM norms often train 25–40 hours a week, with regular coaching and several tournaments per year abroad.",
          },
          {
            type: 'tip',
            title: 'Before a tournament: taper',
            md:
              "In the last week before an important event, cut the volume. Refresh your openings with model games and your repertoire file, solve a few easy puzzles each day for confidence and sharpness, and sleep well. Heavy new study the night before a game only adds fatigue.",
          },
        ],
      },
    ],
  },

  // ───────────────────────── 3. PSYCHOLOGY AND TOURNAMENTS ─────────────────────────
  {
    id: 'l6-psychology',
    level: 6,
    title: 'Psychology and tournament play',
    description:
      'Nerves and tilt, time trouble, draw offers, preparing for a specific opponent, sleep and fitness, and how to handle losses.',
    lessons: [
      {
        id: 'l6-psy-nerves',
        title: 'Nerves, tilt and emotional control',
        summary: 'Everyone feels pressure. Strong players have routines that let them play well anyway.',
        estMinutes: 12,
        blocks: [
          {
            type: 'text',
            md:
              "At master level most players know enough chess to beat each other. Results are often decided by who handles pressure better: who stays objective when the position turns, who recovers after a mistake, who keeps playing good moves in the fifth hour.\n\n" +
              "Nerves are normal. World champions have described feeling sick with nerves before important games. The goal is not to feel nothing; it is to play well *while* feeling nervous.",
          },
          {
            type: 'text',
            md:
              "### Before the game\n\n" +
              "- **Have a routine**: the same wake-up time, the same short preparation, the same walk to the venue. Routine tells your brain that this is normal.\n" +
              "- **Arrive early** enough to find your board calmly, but not so early that you sit and worry.\n" +
              "- **Breathe**: a few slow breaths with a longer exhale than inhale (for example in for four counts, out for six) calm the body quickly.\n" +
              "- **Reframe the feeling.** A racing heart is your body getting ready to perform. Tell yourself \"I am ready\", not \"I am scared\".",
          },
          {
            type: 'text',
            md:
              "### Tilt: when emotions take over\n\n" +
              "**Tilt** (a word borrowed from poker) is the state in which emotions, not thinking, choose your moves. Typical signs:\n\n" +
              "- you play quickly right after a mistake, as if to get away from it;\n" +
              "- you hope for tricks instead of looking for the best move;\n" +
              "- you cannot accept that your position is now worse, so you refuse the sensible defence;\n" +
              "- you think about the result, your rating or the prize instead of the position.\n\n" +
              "The cure is a **reset**. Stand up if the rules allow it, walk, drink some water, and come back with one question: *what is the best move in this position?* Treat the position as a new game. A worse position is not a lost one, and many games are saved by the player who accepts reality first.",
          },
          {
            type: 'tip',
            title: 'The most dangerous move comes after a mistake',
            md:
              "One error is very often followed by a second, because the player is upset and stops calculating carefully. When you realise you have made a mistake, take *more* time on the next move, not less. The same applies when you have just missed a win: let the disappointment go before you move.",
          },
          {
            type: 'tip',
            title: 'Play the position, not the rating',
            md:
              "Against stronger players we tend to play too passively and accept their ideas; against weaker ones we become careless or overpress. Before the game, remind yourself that the board does not know the ratings. During the game, ask only what the position needs.",
          },
        ],
      },
      {
        id: 'l6-psy-time',
        title: 'Time trouble',
        summary: 'Chronic time trouble is a decision-making problem, not a clock problem. How to diagnose and fix it.',
        estMinutes: 12,
        blocks: [
          {
            type: 'text',
            md:
              "Some players are in time trouble in almost every game. They often have good positions after 25 moves and then throw them away with a few seconds on the clock. This is rarely bad luck: it is a habit with causes you can find and fix.\n\n" +
              "Common causes are **perfectionism** (looking for the absolute best move in every position), **indecision** (switching between two moves for half an hour), **calculating the same line again and again**, weak **opening knowledge** that costs time early, and **fear** of making a mistake.",
          },
          {
            type: 'text',
            md:
              "### Diagnose first\n\n" +
              "Write your remaining time on your scoresheet every five moves, or check the clock times in the game record afterwards. Where did the time go? On critical decisions (good) or on routine moves and opening positions you should know (bad)?",
          },
          {
            type: 'text',
            md:
              "### Cures\n\n" +
              "- **Know your openings**, so that you are not spending 30 minutes on move 10 in a line you have played before.\n" +
              "- **Make a rough time plan.** With 90 minutes plus 30 seconds per move, having around 45–60 minutes left at move 20 is comfortable. Glance at the clock every few moves.\n" +
              "- **Spend time where it matters.** Recapturing a piece or making an obvious developing move should take seconds. Save your time for critical moments: before a pawn break, an exchange that changes the structure, or a sacrifice.\n" +
              "- **Calculate each line once** (Kotov's rule). If you notice that you are calculating the same variation for the third time, stop and decide.\n" +
              "- **Trust your intuition between equal choices.** If after 10–15 minutes you cannot separate two moves, they are probably about equally good. Play the one you like better.\n" +
              "- **Practise decisiveness**: some rapid games, played seriously, train you to make good decisions quickly.",
          },
          {
            type: 'text',
            md:
              "### When you are in time trouble\n\n" +
              "- Play **simple, safe moves**: keep your pieces protected and your king covered.\n" +
              "- Avoid starting complications unless you are forced to.\n" +
              "- Think on your **opponent's time** about your next move and his threats.\n" +
              "- With an increment, keep a few seconds in reserve on every move and remember the rules about recording moves. Under FIDE rules you may stop writing the moves when you have less than five minutes only if there is no increment of 30 seconds or more.\n\n" +
              "### When your opponent is in time trouble\n\n" +
              "Do not start playing fast yourself: that is the most common mistake. Keep thinking normally, make solid moves that pose problems, and avoid giving him forcing lines that make his decisions easy.",
          },
        ],
      },
      {
        id: 'l6-psy-draws',
        title: 'Draw offers and tournament strategy',
        summary: 'When to offer or accept a draw, the rules and etiquette, and playing for the result your tournament needs.',
        estMinutes: 10,
        blocks: [
          {
            type: 'text',
            md:
              "### The rules and etiquette\n\n" +
              "Under FIDE rules you offer a draw **after making your move and before pressing the clock**. The offer stands until your opponent accepts it, rejects it orally, or makes a move. Repeated offers after your opponent has declined can be treated as disturbing him, and the arbiter may penalise you.\n\n" +
              "Some events forbid draw offers before a certain move, or forbid agreed draws altogether (often called **Sofia rules**). Read the tournament rules before the first round.",
          },
          {
            type: 'text',
            md:
              "### When should you offer a draw?\n\n" +
              "- The position is **objectively equal** and you would be happy with half a point.\n" +
              "- The **tournament situation** favours it: a draw secures a norm, a prize or qualification.\n" +
              "- You are tired, short of time, or the position no longer offers you real chances.\n\n" +
              "### When you receive an offer\n\n" +
              "You do not have to answer at once: the offer stands while you think. Judge the position as if no offer had been made. Consider the position, both clocks and the tournament situation, and then decide calmly. A draw offer from your opponent is information too: he may be worried about something you have not seen, or simply tired.",
          },
          {
            type: 'tip',
            title: 'Do not play for a draw',
            md:
              "Playing \"for a draw\" from the opening usually means playing passively, and passive positions often lose. If a draw is a good result for you, play solid, healthy chess and take the draw when it comes. With White in particular, play normal chess and let your opponent show he can equalise.",
          },
          {
            type: 'text',
            md:
              "### Tournament strategy\n\n" +
              "- **Swiss events**: in the early rounds you often meet weaker players, and a win is expected. Keep the game going; do not accept quick draws against lower-rated players without a good reason.\n" +
              "- **Middle rounds**: keep track of your score and the standings, but focus on one game at a time.\n" +
              "- **Last rounds**: know exactly what you need. Half a point for a norm calls for a different approach from a must-win game. Decide your strategy before the game, not in the middle of it.\n" +
              "- **Round-robins**: you know your opponents in advance, so preparation matters more. Plan which games you will press in, often the ones where you have White.",
          },
        ],
      },
      {
        id: 'l6-psy-opponent',
        title: 'Preparing for an opponent',
        summary: 'Using a database to find what your opponent plays, choosing a good line against it, and not over-preparing.',
        estMinutes: 12,
        blocks: [
          {
            type: 'text',
            md:
              "Once pairings are published, often the evening before or the morning of the game, strong players look up their opponent. With a database this takes minutes and can decide the game before it starts. Remember that your opponent can do exactly the same with *your* games.",
          },
          {
            type: 'text',
            md:
              "### A preparation routine\n\n" +
              "1. **Collect the opponent's games** with the colour he will have against you. Recent games matter most: players change their openings.\n" +
              "2. **Find his repertoire**: which openings, which main lines, which sidelines. Note where he has scored badly or obtained bad positions.\n" +
              "3. **Choose your line.** Prefer a line you know well that leads to positions he seems to handle badly. A sharp tactician may be uncomfortable in a quiet endgame; a solid positional player may dislike early complications.\n" +
              "4. **Prepare the critical moves** of that line: refresh your repertoire file, check the engine at the key branching points, and play through two or three model games.\n" +
              "5. **Build a short profile**: does he get into time trouble? Does he defend badly? Does he accept draws easily?\n" +
              "6. **Stop in time.** Finish your preparation one or two hours before the game, then rest, eat and clear your head.",
          },
          {
            type: 'tip',
            title: 'Do not let preparation become a trap',
            md:
              "A line you studied for one hour the morning of the game is not part of your repertoire. If you do not understand the resulting positions, the preparation can do more harm than good. And if your opponent deviates early, do not panic: you prepared to play good chess, not only to recite moves.",
          },
          {
            type: 'text',
            md:
              "### Making yourself hard to prepare against\n\n" +
              "- Have **two systems** against the main openings so that your opponent cannot be sure what you will play.\n" +
              "- Vary your **move orders** and keep a surprise weapon or two for important games.\n" +
              "- Know your own weak spots: if you have lost twice in the same line recently, expect your opponents to aim for it, and repair it first.",
          },
          {
            type: 'tip',
            title: 'Time budget',
            md:
              "On a normal tournament day, 60–90 minutes of preparation is plenty. On a double-round day, 20–30 minutes on the critical decision (which line to choose) is enough. Rest is part of preparation.",
          },
        ],
      },
      {
        id: 'l6-psy-body',
        title: 'Sleep, fitness and tournament routine',
        summary: 'A classical game can last six hours. Your body has to support your brain for all of it.',
        estMinutes: 10,
        blocks: [
          {
            type: 'text',
            md:
              "A classical game can last five or six hours, and a tournament may have nine rounds in nine days. Concentration depends on sleep, fitness and food much more than most players admit. Many top players, including Magnus Carlsen and Fabiano Caruana, take physical training seriously for exactly this reason.",
          },
          {
            type: 'text',
            md:
              "### Sleep\n\n" +
              "- Aim for **7–9 hours** and keep the same sleep schedule throughout the event.\n" +
              "- After evening rounds, give yourself time to calm down before bed: a walk, no deep analysis, little screen time.\n" +
              "- Avoid caffeine in the late afternoon if you play in the morning, and avoid heavy meals and alcohol late in the evening.\n\n" +
              "### Fitness\n\n" +
              "- Regular **aerobic exercise** (running, cycling, swimming, ball games) improves stamina and helps you stay sharp in the fifth hour.\n" +
              "- During a tournament, a light walk or a short workout on the morning of a game helps many players feel fresh.\n\n" +
              "### Food and drink\n\n" +
              "- Eat a light, balanced meal two to three hours before the game, not a heavy one just before.\n" +
              "- Bring **water** and simple snacks (fruit, nuts) to keep your energy steady over a long game.\n" +
              "- Be careful with sugar and coffee: a quick rise in energy is often followed by a crash at the critical moment.",
          },
          {
            type: 'text',
            md:
              "### A sample tournament day (round at 15:00)\n\n" +
              "- **08:00** wake up, breakfast, short walk\n" +
              "- **09:30** check the pairing and prepare for 60–90 minutes\n" +
              "- **12:00** light lunch\n" +
              "- **12:45** rest: read, listen to music, no chess\n" +
              "- **14:35** arrive at the venue, find the board, settle in\n" +
              "- **After the game**: dinner, a short look at the game with your opponent or alone, then switch off. Deep analysis can wait until after the tournament.",
          },
          {
            type: 'tip',
            title: 'Double-round days',
            md:
              "On days with two games, keep the break between rounds for food and rest. Do not analyse the morning game in depth, whatever the result. A quick look at the opening for the second game is enough.",
          },
        ],
      },
      {
        id: 'l6-psy-losses',
        title: 'Handling losses',
        summary: 'Every strong player has lost thousands of games. What matters is how you respond.',
        estMinutes: 10,
        blocks: [
          {
            type: 'text',
            md:
              "Every grandmaster has lost thousands of games on the way to the title, and world champions still lose. Capablanca is often quoted as saying that you learn much more from a game you lose than from a game you win, and that you will have to lose hundreds of games before becoming a good player.\n\n" +
              "Losses hurt. The question is how quickly you recover, and whether you learn from them.",
          },
          {
            type: 'text',
            md:
              "### Straight after the loss\n\n" +
              "- Shake hands, sign the scoresheet and behave with dignity. Your reputation lasts longer than any result.\n" +
              "- It is fine to be upset for a while. Go for a walk; talk to a friend.\n" +
              "- **Do not make big decisions** right after a loss: no throwing out your repertoire, no vows to give up chess.\n\n" +
              "### During the tournament\n\n" +
              "- Use a **reset ritual** before the next round: the same routine as always, and a clear statement to yourself that the next game is a new game.\n" +
              "- Avoid the **revenge mentality**: trying to win back the lost point at all costs leads to overpressing and a second loss.\n" +
              "- A quick look at what went wrong is fine. The deep analysis belongs after the event.",
          },
          {
            type: 'text',
            md:
              "### After the tournament\n\n" +
              "Analyse your losses properly, using the method from the training module. Separate two kinds of loss:\n\n" +
              "- **Good process, bad result**: you played reasonable chess and your opponent played better, or you lost a close game in time trouble. Learn the lesson and move on.\n" +
              "- **Bad process**: you played too fast, ignored your opponent's threats or did not know your opening. These are the losses that tell you what to change.",
          },
          {
            type: 'tip',
            title: 'Plateaus and losing streaks',
            md:
              "Ratings go up in steps, not in a straight line, and a swing of 50 points either way is often just noise. If you hit a losing streak, take a few days off, go back to basics (tactics, simple endgames), play a few lower-pressure games, and replay some of your best wins to restore your confidence. Judge your progress by the quality of your play, not only by the number next to your name.",
          },
        ],
      },
    ],
  },

  // ───────────────────────────── 4. THE TITLE PATH ─────────────────────────────
  {
    id: 'l6-titles',
    level: 6,
    title: 'The title path',
    description:
      'How Elo and FIDE ratings work, the requirements for CM, FM, IM and GM, how norms and norm tournaments work, and using engines and AI without becoming dependent on them.',
    lessons: [
      {
        id: 'l6-title-ratings',
        title: 'Elo and FIDE ratings',
        summary: 'Where your rating comes from, how it changes after each game, and why online ratings are different.',
        estMinutes: 12,
        blocks: [
          {
            type: 'text',
            md:
              "The rating system used in chess was designed by the Hungarian-American physics professor **Arpad Elo**. The US Chess Federation adopted it in 1960 and FIDE, the world chess federation, in 1970. Ever since, \"Elo\" has been the common word for a chess rating.\n\n" +
              "The idea is simple. Your rating is an estimate of your playing strength. The difference between two ratings predicts the expected score, and after each game your rating moves according to how your actual result compared with that expectation.",
          },
          {
            type: 'text',
            md:
              "### The formula\n\n" +
              "Your **expected score** against an opponent is\n\n" +
              "`E = 1 / (1 + 10^((Ropp - Ryou) / 400))`\n\n" +
              "and after the game your rating changes by\n\n" +
              "`change = K × (score - E)`\n\n" +
              "where the score is 1 for a win, ½ for a draw and 0 for a loss. A difference of 200 points means the stronger player is expected to score about 76%; a difference of 400 points, about 91%.\n\n" +
              "**Example.** You are rated 2200 and play an opponent rated 2400. Your expected score is about 0.24. With K = 20, a win gains you about 15 points, a draw about 5, and a loss costs you about 5.",
          },
          {
            type: 'text',
            md:
              "### FIDE's rules in brief\n\n" +
              "- **K-factor**: 40 for new players (until they have played 30 games) and for players under 18 rated below 2300; 20 for players rated below 2400; 10 once you have reached 2400, permanently.\n" +
              "- **The 400-point rule**: for rating purposes, a difference of more than 400 points is counted as 400.\n" +
              "- **Rating lists** are published every month.\n" +
              "- **Separate ratings** exist for standard (classical), rapid and blitz. Titles and norms are based on standard games.\n" +
              "- The lower end of the list was reformed in 2024: the minimum rating was raised to 1400 and most ratings below 2000 were lifted. The details change from time to time, so check the current rules in the FIDE Handbook.",
          },
          {
            type: 'tip',
            title: 'Online ratings are a different currency',
            md:
              "Online sites use related systems (often Glicko or Glicko-2) on different player pools, so a \"2200 online\" may be far from a 2200 FIDE rating. Different sites and different time controls are not comparable either. If you want to measure progress on the title path, the FIDE standard rating is the number that counts.",
          },
          {
            type: 'text',
            md:
              "### What a rating means in practice\n\n" +
              "A rating is a statistical estimate, not a judgement. It goes up and down by tens of points through normal variation, so look at the trend over a year rather than the change after one event. Your **performance rating** in a single tournament (the rating at which your result would have been exactly expected) is a useful measure of how well you played there, and, as we will see, it is the basis of title norms.",
          },
        ],
      },
      {
        id: 'l6-title-titles',
        title: 'Titles: CM, FM, IM and GM',
        summary: 'What each FIDE title requires, and how ratings and norms combine for the IM and GM titles.',
        estMinutes: 12,
        blocks: [
          {
            type: 'text',
            md:
              "FIDE awards titles for life: once you have earned one, it is never taken away, even if your rating later falls. The titles open to all players are, from lowest to highest:\n\n" +
              "- **Candidate Master (CM)**: a FIDE rating of at least **2200** at some point.\n" +
              "- **FIDE Master (FM)**: a FIDE rating of at least **2300** at some point.\n" +
              "- **International Master (IM)**: a rating of at least **2400** at some point, *plus* IM norms totalling at least 27 games (normally three norms).\n" +
              "- **Grandmaster (GM)**: a rating of at least **2500** at some point, *plus* GM norms totalling at least 27 games (normally three norms).\n\n" +
              "There are also women's titles (Woman Candidate Master at 2000, Woman FIDE Master at 2100, and Woman International Master and Woman Grandmaster, which need 2200 and 2300 plus norms). Women can and do earn all the open titles as well.",
          },
          {
            type: 'text',
            md:
              "### Rating and norms are separate requirements\n\n" +
              "For the IM and GM titles you need **both** parts, and they can come in either order. Some players collect three norms years before they reach the rating; others pass 2500 and still need a final norm. The rating does not have to be on an official list at the moment you complete your norms: reaching it at some point is enough, and the rules allow it to be reached during a tournament.\n\n" +
              "Some events, such as the World Junior Championship and continental championships, award titles or norms directly to their top finishers.",
          },
          {
            type: 'text',
            md:
              "### What is a norm?\n\n" +
              "A **norm** is a tournament result at title level against a strong, international field. Broadly, for a norm you need:\n\n" +
              "- a **performance rating** of at least **2600** for a GM norm or **2450** for an IM norm;\n" +
              "- normally at least **nine games**, in a standard (classical) FIDE-rated event;\n" +
              "- an average opponent rating of at least about **2380** (GM norm) or **2230** (IM norm);\n" +
              "- at least half of your opponents holding FIDE titles, with at least three GMs for a GM norm (IMs or GMs for an IM norm);\n" +
              "- opponents from several federations: normally at least two federations other than your own, and limits on how many opponents come from a single federation.\n\n" +
              "There are exceptions (national championships, team events and some large opens follow special rules), and the regulations are updated from time to time. Before you chase a norm, read the current FIDE Title Regulations or ask the chief arbiter.",
          },
          {
            type: 'tip',
            title: 'A rule of thumb',
            md:
              "In a typical nine-round GM-norm event, you need about 7 points out of 9 if the average rating of your opponents is around 2400, and a little less if the field is stronger. An IM norm in a similar field needs a performance about 150 points lower. Norm calculators are available online, and many arbiters will tell you before the last round exactly what you need.",
          },
        ],
      },
      {
        id: 'l6-title-norms',
        title: 'How tournaments and norms work',
        summary: 'Round-robins and opens, planning a norm campaign, and what happens when you score one.',
        estMinutes: 10,
        blocks: [
          {
            type: 'text',
            md:
              "### Two kinds of norm events\n\n" +
              "- **Closed round-robins** (\"norm tournaments\"). Usually ten players, carefully chosen by the organiser so that the field meets all the norm conditions: enough GMs, enough foreigners, a high enough average rating. You know in advance exactly what score you need. Budapest's long-running First Saturday tournaments are a well-known example, and many federations and clubs organise similar events.\n" +
              "- **Strong international opens** (Swiss system). Large fields with many grandmasters. You do not know your opponents in advance, so a norm depends on being paired with enough strong players, which usually happens only if you keep winning. A good start is essential.",
          },
          {
            type: 'text',
            md:
              "### Planning a norm campaign\n\n" +
              "1. **Get your rating close first.** Norm attempts make most sense once your rating is within about 100 points of the norm performance level, so roughly 2350+ for IM norms and 2450+ for GM norms.\n" +
              "2. **Choose events carefully.** A closed norm tournament gives a guaranteed chance; a strong open gives more experience against strong players but less certainty.\n" +
              "3. **Budget for it.** Entry fees, travel and accommodation add up. Many players combine two or three events in one trip.\n" +
              "4. **Prepare for the field.** In a round-robin you know your opponents: prepare for each of them as described in the psychology module.\n" +
              "5. **Know your target before each round.** Arbiters and online calculators can tell you exactly which score earns a norm, and whether a draw in the last round is enough.",
          },
          {
            type: 'text',
            md:
              "### When you score a norm\n\n" +
              "The chief arbiter prepares a **norm certificate**, signed by the arbiter and the organiser. Keep a copy. When you have enough norms and the required rating, your national federation submits the title application to FIDE (there is a fee), and the title is confirmed at one of FIDE's regular council meetings.",
          },
          {
            type: 'tip',
            title: 'Do not chase norms at the expense of chess',
            md:
              "Players who obsess about norms often play worse: every game becomes a calculation of what they \"need\". Play to improve and to win games. If your level is right, the norms follow. And in the last round, decide your strategy before the game, then forget about the norm and play the position.",
          },
        ],
      },
      {
        id: 'l6-title-engines',
        title: 'Engines and AI without over-reliance',
        summary: 'The engine is the best sparring partner ever built, and the easiest way to stop thinking for yourself.',
        estMinutes: 12,
        blocks: [
          {
            type: 'text',
            md:
              "Every modern grandmaster uses engines every day. The difference between those who keep improving and those who stagnate is not *whether* they use engines, but *how*. An engine used as a checker makes you stronger. An engine used as a replacement for your own thinking makes you weaker, because you stop training the very skills you need at the board.",
          },
          {
            type: 'text',
            md:
              "### Good uses of the engine\n\n" +
              "- **Checking your own analysis** of your games, *after* you have done it yourself.\n" +
              "- **Opening preparation**, testing critical positions and finding practical choices (see the repertoire module).\n" +
              "- **Blunder checks** of your training analysis, studies and books: even famous annotations contain errors.\n" +
              "- **Sparring**: playing out middlegame and endgame positions against the engine, at full strength to test a defence or at reduced strength for practice. Human-like engines trained on human games (Maia is one example) make good practice opponents.\n\n" +
              "### Bad habits\n\n" +
              "- **Watching the evaluation bar** while you play through a game. You see the numbers but stop asking why.\n" +
              "- **Analysing with the engine running from move one**, so you never form your own opinion.\n" +
              "- **Trusting short searches**: a quick evaluation is not a verdict.\n" +
              "- **Memorising engine lines** you do not understand.",
          },
          {
            type: 'tip',
            title: 'Hide the numbers',
            md:
              "When you study a master game or your own game with an engine, turn the evaluation display off. Decide first what you think of the position and which move you would play, then reveal the engine's view. This turns every engine session into training.",
          },
          {
            type: 'text',
            md:
              "### AI assistants and chatbots\n\n" +
              "General AI assistants can be genuinely useful: they can explain an opening's typical plans, summarise a strategic concept, help you build a training schedule or quiz you on theory. But language models can state wrong moves and invented variations with complete confidence. Treat their concrete chess claims as suggestions to check on a board and with an engine, never as facts. Use them for ideas and organisation; use the engine and your own analysis for the moves.",
          },
          {
            type: 'text',
            md:
              "### Fair play\n\n" +
              "Any outside help during a game is cheating: no engines, no databases, no AI, no advice. In over-the-board events, FIDE rules forbid having a phone or any other electronic device with you while you play, unless the event explicitly allows it to be kept switched off in your bag; breaking this rule normally costs you the game. Online platforms detect engine use and close accounts, and FIDE and national federations ban players caught cheating over the board. A title earned honestly is the only kind worth having.",
          },
        ],
      },
    ],
  },

  // ─────────────────────────── 5. LEARNING FROM THE CLASSICS ───────────────────────────
  {
    id: 'l6-classics',
    level: 6,
    title: 'Learning from the classics',
    description:
      'One great player or era per lesson, from Anderssen to Carlsen: a famous game with notes at the key moments, a short biography and what to learn from each of them.',
    lessons: [
      {
        id: 'l6-cl-anderssen',
        title: 'Anderssen: the Immortal Game (1851)',
        summary: 'The romantic era at its most spectacular: Anderssen gives up both rooks, a bishop and his queen to mate with three minor pieces.',
        estMinutes: 15,
        blocks: [
          {
            type: 'text',
            md:
              "**Adolf Anderssen** (1818–1879) was a German mathematics teacher who won the first international chess tournament, London 1851, and was widely regarded as the strongest player in the world for much of the 1850s and 1860s, apart from Morphy's brief reign.\n\n" +
              "He played in the **romantic** style of his time: open games, gambits and sacrifices, with the aim of attacking the enemy king as quickly as possible. Defence was poorly understood, and declining a sacrifice was considered almost cowardly.\n\n" +
              "During the London tournament he played a casual game against Lionel Kieseritzky that was later christened **the Immortal Game**.",
          },
          {
            type: 'line',
            moves: [
              'e4', 'e5', 'f4', 'exf4', 'Bc4', 'Qh4+', 'Kf1', 'b5', 'Bxb5', 'Nf6', 'Nf3', 'Qh6', 'd3', 'Nh5', 'Nh4', 'Qg5',
              'Nf5', 'c6', 'g4', 'Nf6', 'Rg1', 'cxb5', 'h4', 'Qg6', 'h5', 'Qg5', 'Qf3', 'Ng8', 'Bxf4', 'Qf6', 'Nc3', 'Bc5',
              'Nd5', 'Qxb2', 'Bd6', 'Bxg1', 'e5', 'Qxa1+', 'Ke2', 'Na6', 'Nxg7+', 'Kd8',
            ],
            caption: 'Anderssen – Kieseritzky, London 1851 (casual game)',
            notes: {
              3: 'The King\'s Gambit, the most popular opening of the romantic era. White gives a pawn for quick development and the open f-file.',
              6: 'White loses the right to castle. In 1851 nobody worried much about that.',
              8: 'A counter-gambit: Black gives back a pawn to deflect the bishop.',
              17: 'The knight lands on f5, eyeing g7.',
              19: 'Another pawn offered, to drive the black queen and knight around.',
              21: 'Anderssen calmly leaves the b5-bishop to be taken and keeps developing.',
              30: 'Black\'s queen has already moved six times, while most of Black\'s other pieces are still at home.',
              34: 'Black wins a pawn with an attack on the a1-rook.',
              35: 'Anderssen offers *both* rooks. The bishop takes away f8 and e7 from the black king.',
              37: 'A quiet move. The pawn cuts the black queen off from g7 and from the defence of the king.',
              38: 'Black has won two rooks, but his king is about to be mated.',
              41: 'The knight checks and drives the king to d8. White has a queen, two bishops and two knights left. How does he finish?',
            },
          },
          {
            type: 'exercise',
            exercise: {
              id: 'l6-cl-anderssen-ex1',
              prompt: 'Anderssen – Kieseritzky 1851. White to move: mate in 2.',
              fen: 'r1bk2nr/p2p1pNp/n2B4/1p1NP2P/6P1/3P1Q2/P1P1K3/q5b1 w - - 1 22',
              goal: 'mate',
              solution: ['Qf6+', 'Nxf6', 'Be7#'],
              hint: 'Give up the last heavy piece too. Which bishop move then covers d8?',
              explanation:
                "22.Qf6+!! deflects the g8-knight. After 22...Nxf6 23.Be7# the bishop gives mate, protected by the d5-knight. The knight on d5 also covers c7, and the knight on g7 covers e8. White mates with three minor pieces after giving away both rooks, a bishop and the queen.",
            },
          },
          {
            type: 'text',
            md:
              "### What to learn from Anderssen\n\n" +
              "- **Development and open lines win attacks.** At the end, White's minor pieces were all active while Black's queen was far away and his queenside pieces had never moved.\n" +
              "- **Material is only one factor.** Anderssen counted *active* pieces, not captured ones.\n" +
              "- **Look critically, too.** Modern engines find improvements for both sides: Black's greedy queen moves and White's 18.Bd6 are not the best moves objectively. The romantic era teaches you imagination and courage; the next generations taught chess players how to defend.",
          },
        ],
      },
      {
        id: 'l6-cl-morphy',
        title: 'Morphy: the Opera Game (1858)',
        summary: 'Development, open lines and pins: the most instructive short game ever played, seen through a master\'s eyes.',
        estMinutes: 12,
        blocks: [
          {
            type: 'text',
            md:
              "**Paul Morphy** (1837–1884) from New Orleans was the first player who seemed to *understand* why attacks succeed. In 1858–59 he toured Europe and beat almost every leading master, including Anderssen, and then retired from serious chess while still in his early twenties.\n\n" +
              "Morphy's games look like the romantic games of his time, but there is a difference: his attacks were prepared by rapid development and the opening of lines, and he only sacrificed when his pieces were ready. Later writers such as Emanuel Lasker saw him as a forerunner of positional thinking.\n\n" +
              "You may have met the Opera Game before. Play through it again, this time noting how *every* move serves development, the opening of lines or a pin.",
          },
          {
            type: 'line',
            moves: [
              'e4', 'e5', 'Nf3', 'd6', 'd4', 'Bg4', 'dxe5', 'Bxf3', 'Qxf3', 'dxe5', 'Bc4', 'Nf6', 'Qb3', 'Qe7', 'Nc3', 'c6',
              'Bg5', 'b5', 'Nxb5', 'cxb5', 'Bxb5+', 'Nbd7', 'O-O-O', 'Rd8', 'Rxd7', 'Rxd7', 'Rd1', 'Qe6', 'Bxd7+', 'Nxd7',
            ],
            caption: 'Morphy – Duke Karl of Brunswick and Count Isouard, Paris 1858',
            notes: {
              5: 'Morphy opens the centre at once.',
              6: 'A pin that costs Black the bishop pair and time.',
              9: 'White has the two bishops and a lead in development.',
              13: 'A double attack on f7 and b7.',
              14: 'This defends f7 but blocks the f8-bishop, so Black falls further behind in development.',
              15: 'Morphy prefers development to grabbing the b7-pawn. A lead in development is worth more than a pawn.',
              19: 'A piece sacrifice to open lines against the uncastled king.',
              22: 'The d7-knight is pinned to the king.',
              23: 'Castling brings the rook to the d-file with gain of time: the d7-knight is now attacked twice.',
              25: 'Morphy gives up the exchange to remove a defender.',
              27: 'The last white piece joins in, renewing the pin.',
              30: 'Black has a rook and a knight more than White. Find the finish.',
            },
          },
          {
            type: 'exercise',
            exercise: {
              id: 'l6-cl-morphy-ex1',
              prompt: 'The Opera Game. White to move: mate in 2.',
              fen: '4kb1r/p2n1ppp/4q3/4p1B1/4P3/1Q6/PPP2PPP/2KR4 w k - 0 16',
              goal: 'mate',
              solution: ['Qb8+', 'Nxb8', 'Rd8#'],
              hint: 'The d7-knight is the only piece guarding d8.',
              explanation:
                "16.Qb8+!! deflects the knight from d7. After 16...Nxb8 17.Rd8# the rook mates, protected by the g5-bishop. Morphy finished with just two pieces, but every one of his pieces had played a part.",
            },
          },
          {
            type: 'text',
            md:
              "### What to learn from Morphy\n\n" +
              "- **Develop first, attack second.** Morphy did not move a piece twice in the opening without a reason, and he did not grab pawns while behind in development.\n" +
              "- **Open lines towards the king** when you are better developed. A lead in development is temporary: use it before the opponent catches up.\n" +
              "- **Pins are a weapon.** Morphy built the whole finish on the pin of the d7-knight, adding attackers until it collapsed.",
          },
        ],
      },
      {
        id: 'l6-cl-capablanca',
        title: 'Capablanca: simplicity and technique',
        summary: 'Clear plans, active pieces and an eye for the decisive tactic: Bernstein – Capablanca, Moscow 1914.',
        estMinutes: 14,
        blocks: [
          {
            type: 'text',
            md:
              "**José Raúl Capablanca** (1888–1942) from Havana was world champion from 1921, when he beat Emanuel Lasker, until 1927, when he lost to Alekhine. He was famous for losing very few games, for his effortless endgame technique and for his ability to find the simplest way to win.\n\n" +
              "His book *Chess Fundamentals* (1921) is still recommended today. In the game below he plays Black against Ossip Bernstein, one of the strongest players of the time. Watch how Capablanca's pieces become steadily more active until a single tactical blow decides.",
          },
          {
            type: 'line',
            moves: [
              'd4', 'd5', 'c4', 'e6', 'Nc3', 'Nf6', 'Nf3', 'Be7', 'Bg5', 'O-O', 'e3', 'Nbd7', 'Rc1', 'b6', 'cxd5', 'exd5',
              'Qa4', 'Bb7', 'Ba6', 'Bxa6', 'Qxa6', 'c5', 'Bxf6', 'Nxf6', 'dxc5', 'bxc5', 'O-O', 'Qb6', 'Qe2', 'c4',
              'Rfd1', 'Rfd8', 'Nd4', 'Bb4', 'b3', 'Rac8', 'bxc4', 'dxc4', 'Rc2', 'Bxc3', 'Rxc3', 'Nd5', 'Rc2', 'c3',
              'Rdc1', 'Rc5', 'Nb3', 'Rc6', 'Nd4', 'Rc7', 'Nb5', 'Rc5', 'Nxc3', 'Nxc3', 'Rxc3', 'Rxc3', 'Rxc3',
            ],
            caption: 'Bernstein – Capablanca, Moscow 1914',
            notes: {
              26: 'Black has accepted "hanging pawns" on c5 and d5 in return for free piece play.',
              30: 'Capablanca advances, gaining space and cramping White. The d4-square is given up, but Black\'s pieces are ready to fight for it.',
              34: 'The bishop pins the c3-knight and prepares to exchange it, increasing the pressure on c3.',
              44: 'A passed pawn on c3, deep in White\'s position. It ties White\'s pieces down.',
              53: 'White finally wins the c3-pawn. It looks as if the danger is over, but White\'s back rank has no escape square.',
              57: 'Black to move. White\'s queen and rook look safe. Are they?',
            },
          },
          {
            type: 'exercise',
            exercise: {
              id: 'l6-cl-capablanca-ex1',
              prompt: 'Bernstein – Capablanca 1914. Black to move: find the move Capablanca played.',
              fen: '3r2k1/p4ppp/1q6/8/8/2R1P3/P3QPPP/6K1 b - - 0 29',
              solution: ['Qb2'],
              hint: 'White\'s back rank is weak. Attack two pieces at once with your queen.',
              explanation:
                "29...Qb2!! attacks both the queen on e2 and the rook on c3, and the queen cannot be taken: 30.Qxb2 Rd1#. White cannot keep everything: 30.Qe1 Qxc3! 31.Qxc3 Rd1+ 32.Qe1 Rxe1#, or 30.Rc2 Qb1+ 31.Qf1 Qxc2. Bernstein resigned. The whole game prepared this moment: active pieces, a weak back rank, and an overloaded defence.",
            },
          },
          {
            type: 'text',
            md:
              "### What to learn from Capablanca\n\n" +
              "- **Simplicity.** Capablanca looked for the clearest plan, not the most spectacular one. When you are better, ask which move makes your task easiest.\n" +
              "- **Piece activity beats static weaknesses.** His hanging pawns were a static weakness, but his pieces were more active, and activity decided.\n" +
              "- **Endgame first.** Capablanca advised studying endgames before openings. Strong endgame technique lets you simplify into winning endings with confidence.\n" +
              "- **Technique still needs tactics.** Even the great positional player finished with a sharp tactical blow.",
          },
        ],
      },
      {
        id: 'l6-cl-alekhine',
        title: 'Alekhine: the dynamic bind',
        summary: 'Deep preparation, energy and the famous tripled pieces on the c-file: Alekhine – Nimzowitsch, San Remo 1930.',
        estMinutes: 14,
        blocks: [
          {
            type: 'text',
            md:
              "**Alexander Alekhine** (1892–1946), born in Moscow and later a French citizen, took the world title from Capablanca in 1927 after a long, hard match. He lost it to Max Euwe in 1935, won it back in 1937, and died as champion in 1946.\n\n" +
              "Alekhine combined thorough preparation with enormous energy at the board. He is remembered for brilliant combinations, but his deepest skill was creating positions in which combinations became possible, often by seizing space and squeezing the opponent first.\n\n" +
              "At San Remo 1930 he scored 14 points from 15 games. Here he paralyses Aron Nimzowitsch, the great theoretician of positional chess, with his own weapons.",
          },
          {
            type: 'line',
            moves: [
              'e4', 'e6', 'd4', 'd5', 'Nc3', 'Bb4', 'e5', 'c5', 'Bd2', 'Ne7', 'Nb5', 'Bxd2+', 'Qxd2', 'O-O', 'c3', 'b6',
              'f4', 'Ba6', 'Nf3', 'Qd7', 'a4', 'Nbc6', 'b4', 'cxb4', 'cxb4', 'Bb7', 'Nd6', 'f5', 'a5', 'Nc8', 'Nxb7', 'Qxb7',
              'a6', 'Qf7', 'Bb5', 'N8e7', 'O-O', 'h6', 'Rfc1', 'Rfc8', 'Rc2', 'Qe8', 'Rac1', 'Rab8', 'Qe3', 'Rc7', 'Rc3', 'Qd7',
              'R1c2', 'Kf8', 'Qc1', 'Rbc8', 'Ba4', 'b5', 'Bxb5', 'Ke8', 'Ba4', 'Kd8', 'h4',
            ],
            caption: 'Alekhine – Nimzowitsch, San Remo 1930',
            notes: {
              6: 'The Winawer Variation of the French Defence, one of Nimzowitsch\'s favourite systems.',
              11: 'An unusual idea: the knight heads for d6, the hole in Black\'s position.',
              23: 'Alekhine opens the queenside, where he has more space.',
              27: 'The knight lands on d6.',
              31: 'Alekhine exchanges the knight for Black\'s light-squared bishop, leaving Black weak on the light squares on the queenside.',
              33: 'The a6-pawn cramps Black and fixes the b7-square as a permanent hole.',
              35: 'The bishop pins the c6-knight, which becomes the target of the whole white army.',
              43: 'The rooks double on the c-file.',
              51: 'Rook, rook and queen are *tripled* on the c-file against the pinned knight. This is often called "Alekhine\'s gun".',
              53: 'Threatening b5, winning the pinned knight.',
              59: 'Black resigned. His pieces can barely move without losing the c6-knight, and after a couple of pawn moves he will run out of safe moves altogether.',
            },
          },
          {
            type: 'text',
            md:
              "### What to learn from Alekhine\n\n" +
              "- **Space and restriction.** Alekhine's pawns on e5, f4, b4 and a6 took squares away from Black's pieces long before any tactics happened.\n" +
              "- **Pile up on a fixed target.** Once the c6-knight was pinned, every white piece joined the pressure. This idea, of attacking a weakness with more pieces than can defend it, is a cornerstone of master strategy.\n" +
              "- **Preparation and energy.** Alekhine prepared openings and opponents more thoroughly than anyone before him, and played every game at full intensity.",
          },
        ],
      },
      {
        id: 'l6-cl-nimzowitsch',
        title: 'Nimzowitsch: prophylaxis and zugzwang',
        summary: 'The hypermodern revolution and the "Immortal Zugzwang Game": Sämisch – Nimzowitsch, Copenhagen 1923.',
        estMinutes: 14,
        blocks: [
          {
            type: 'text',
            md:
              "**Aron Nimzowitsch** (1886–1935), born in Riga and later living in Denmark, was one of the leading players of the 1920s and the most influential chess writer of his age. His book *My System* (1925) gave names to ideas that strong players had used without explaining: **prophylaxis**, **blockade**, **overprotection**, the open file and the seventh rank.\n\n" +
              "With Réti and Breyer he led the **hypermodern** school, which argued that the centre need not be occupied by pawns at once: it can be controlled from a distance by pieces, and the opponent's pawn centre can become a target.\n\n" +
              "In this famous game, Nimzowitsch slowly takes away every useful move from his opponent until White is in zugzwang in the middlegame, with most of the pieces still on the board.",
          },
          {
            type: 'line',
            moves: [
              'd4', 'Nf6', 'c4', 'e6', 'Nf3', 'b6', 'g3', 'Bb7', 'Bg2', 'Be7', 'Nc3', 'O-O', 'O-O', 'd5', 'Ne5', 'c6',
              'cxd5', 'cxd5', 'Bf4', 'a6', 'Rc1', 'b5', 'Qb3', 'Nc6', 'Nxc6', 'Bxc6', 'h3', 'Qd7', 'Kh2', 'Nh5', 'Bd2', 'f5',
              'Qd1', 'b4', 'Nb1', 'Bb5', 'Rg1', 'Bd6', 'e4', 'fxe4', 'Qxh5', 'Rxf2', 'Qg5', 'Raf8', 'Kh1', 'R8f5', 'Qe3', 'Bd3',
              'Rce1', 'h6',
            ],
            caption: 'Sämisch – Nimzowitsch, Copenhagen 1923',
            notes: {
              6: 'The Queen\'s Indian Defence, a typical hypermodern opening: Black controls e4 with pieces rather than pawns.',
              22: 'Black gains space on the queenside.',
              32: 'Black takes control of e4 and prepares to use the f-file.',
              34: 'The c3-knight is driven back to b1, where it blocks the white queenside.',
              36: 'The bishop takes the f1–a6 diagonal, so the white rooks cannot easily coordinate.',
              39: 'White tries to break free in the centre.',
              40: 'Nimzowitsch gives up the h5-knight. In return he gets two pawns, a rook on the second rank and total control of the position.',
              42: 'The rook invades f2.',
              44: 'Black doubles on the f-file.',
              48: 'The bishop occupies d3, cutting White\'s position in two.',
              50: 'A quiet waiting move, and White resigned. He is in **zugzwang**: almost every white move loses material or allows a decisive blow, while Black can simply wait.',
            },
          },
          {
            type: 'text',
            md:
              "### What to learn from Nimzowitsch\n\n" +
              "- **Prophylaxis.** Before making your own plans, ask what your opponent wants to do and how to prevent it. Nimzowitsch spent the whole game taking away White's ideas.\n" +
              "- **Restrict, then strike.** The white knight on b1, the bishop on g2 and the rooks on the first rank were not lost, just useless. A piece that has no good moves is almost as bad as a piece that has been captured.\n" +
              "- **Zugzwang is not only for endgames.** When the opponent has no useful moves left, a quiet waiting move can be the strongest move on the board.",
          },
        ],
      },
      {
        id: 'l6-cl-tal',
        title: 'Tal: the magician from Riga',
        summary: 'Initiative, sacrifices and practical pressure: Tal – Smyslov, Candidates Tournament 1959.',
        estMinutes: 15,
        blocks: [
          {
            type: 'text',
            md:
              "**Mikhail Tal** (1936–1992) from Riga was the most daring attacking player of the twentieth century. He won the Candidates Tournament of 1959 and then beat Mikhail Botvinnik in 1960 to become world champion at 23. Botvinnik won the return match in 1961, partly because Tal was often seriously ill, but Tal remained among the world's best for thirty years.\n\n" +
              "Tal's sacrifices were not always objectively correct, and engines have since refuted some of them. But at the board they were very hard to answer. He believed in creating positions so complicated that the opponent would go wrong first.\n\n" +
              "Against former world champion Vasily Smyslov, Tal chose a quiet opening and then threw his pieces at the black king.",
          },
          {
            type: 'line',
            moves: [
              'e4', 'c6', 'd3', 'd5', 'Nd2', 'e5', 'Ngf3', 'Nd7', 'd4', 'dxe4', 'Nxe4', 'exd4', 'Qxd4', 'Ngf6', 'Bg5', 'Be7',
              'O-O-O', 'O-O', 'Nd6', 'Qa5', 'Bc4', 'b5', 'Bd2', 'Qa6', 'Nf5', 'Bd8', 'Qh4', 'bxc4', 'Qg5', 'Nh5', 'Nh6+', 'Kh8',
              'Qxh5', 'Qxa2', 'Bc3', 'Nf6', 'Qxf7', 'Qa1+', 'Kd2', 'Rxf7', 'Nxf7+', 'Kg8', 'Rxa1', 'Kxf7', 'Ne5+', 'Ke6',
              'Nxc6', 'Ne4+', 'Ke3', 'Bb6+', 'Bd4',
            ],
            caption: 'Tal – Smyslov, Candidates Tournament, Yugoslavia 1959',
            notes: {
              3: 'A quiet, unusual move against the Caro-Kann, avoiding Smyslov\'s preparation.',
              18: 'Opposite-side castling: both sides will race to attack.',
              19: 'The knight jumps into d6, deep in the black position.',
              21: 'Tal develops the bishop to c4, where it can be attacked by ...b5. He does not mind.',
              27: 'Tal ignores the attack on his bishop and moves the queen towards the black king.',
              28: 'Black wins a piece.',
              29: 'The queen and the f5-knight both attack g7.',
              31: 'The knight check drives the king into the corner, and next move the queen wins back the piece on h5.',
              34: 'Smyslov counterattacks against the white king.',
              37: 'Another sacrifice. The queen takes on f7, and the knight on h6 is ready to give check on f7 if Black recaptures.',
              38: 'Black first gives a check with his own queen.',
              41: 'The knight recaptures with check, and the black queen on a1 is about to fall.',
              44: 'The dust settles: White has won back the queen and is the exchange ahead.',
              47: 'The second knight wins the c6-pawn and attacks the d8-bishop and the a7-pawn.',
              51: 'Black resigned. White is the exchange and a pawn up, and his pieces dominate.',
            },
          },
          {
            type: 'text',
            md:
              "### What to learn from Tal\n\n" +
              "- **The initiative has value.** Tal measured positions by activity and attacking chances, not only by material. A lasting initiative is often worth a pawn or even a piece.\n" +
              "- **Create problems.** A position full of threats is hard to defend even if it is objectively fine. In practical play, the side asking the questions often wins.\n" +
              "- **Calculate *and* trust your intuition.** Tal calculated superbly, but he also accepted that some sacrifices cannot be calculated to the end. Learn to judge when the risk is worth it.\n" +
              "- **But check your attacks later.** Analyse your own sacrifices with an engine after the game. You will learn which ones were sound and which ones only worked because your opponent went wrong.",
          },
        ],
      },
      {
        id: 'l6-cl-petrosian',
        title: 'Petrosian: prophylaxis and safety',
        summary: 'The great defender who prevented his opponents\' plans before they began, and could also strike like lightning: Petrosian – Pachman, Bled 1961.',
        estMinutes: 14,
        blocks: [
          {
            type: 'text',
            md:
              "**Tigran Petrosian** (1929–1984), born in Tbilisi to an Armenian family, was world champion from 1963, when he beat Botvinnik, until 1969, when he lost to Boris Spassky (whom he had beaten in 1966). His nickname was \"Iron Tigran\": in some years he hardly lost a game.\n\n" +
              "Petrosian took Nimzowitsch's idea of **prophylaxis** further than anyone. He often sensed his opponent's plan several moves before it appeared and quietly stopped it. He was also the master of the **positional exchange sacrifice**: giving a rook for a minor piece to gain lasting control of key squares.",
          },
          {
            type: 'line',
            moves: ['d4', 'Nf6', 'c4', 'e6', 'Nf3', 'b6', 'a3'],
            caption: 'The Petrosian System against the Queen\'s Indian',
            notes: {
              7: 'A pure prophylactic move: 4.a3 prevents ...Bb4, so White can play Nc3, d5 or e4 later without being pinned. Petrosian used it for decades, and Kasparov made it one of his main weapons.',
            },
          },
          {
            type: 'text',
            md:
              "Prophylaxis does not mean passivity. When the position called for it, Petrosian attacked with deadly precision. Here is one of his best-known combinations.",
          },
          {
            type: 'line',
            moves: [
              'Nf3', 'c5', 'g3', 'Nc6', 'Bg2', 'g6', 'O-O', 'Bg7', 'd3', 'e6', 'e4', 'Nge7', 'Re1', 'O-O', 'e5', 'd6',
              'exd6', 'Qxd6', 'Nbd2', 'Qc7', 'Nb3', 'Nd4', 'Bf4', 'Qb6', 'Ne5', 'Nxb3', 'Nc4', 'Qb5', 'axb3', 'a5',
              'Bd6', 'Bf6', 'Qf3', 'Kg7', 'Re4', 'Rd8',
            ],
            caption: 'Petrosian – Pachman, Bled 1961',
            notes: {
              3: 'A King\'s Indian Attack set-up: quiet and flexible.',
              15: 'White gains space in the centre and cramps Black\'s kingside.',
              25: 'An in-between move. If Black takes on b3, White attacks the queen first and recaptures afterwards.',
              29: 'Material is level, White\'s knight is strong on c4 and the a-file is half-open.',
              31: 'The bishop lands on d6, a superb square inside Black\'s camp.',
              33: 'The queen attacks the f6-bishop and eyes the long diagonal.',
              35: 'The rook swings to the kingside along the fourth rank.',
              36: 'Black attacks the d6-bishop. White to move has a crushing reply.',
            },
          },
          {
            type: 'exercise',
            exercise: {
              id: 'l6-cl-petrosian-ex1',
              prompt: 'Petrosian – Pachman 1961. White to move and win: find the sacrifice and the follow-up (three white moves).',
              fen: 'r1br4/1p2npkp/3Bpbp1/pqp5/2N1R3/1P1P1QP1/1PP2PBP/R5K1 w - - 6 19',
              solution: ['Qxf6+', 'Kxf6', 'Be5+', 'Kg5', 'Bg7'],
              hint: 'Remove the f6-bishop with check and drag the king forward. The final move is a quiet one.',
              explanation:
                "19.Qxf6+!! Kxf6 (declining with 19...Kg8 leaves White a piece up with a crushing attack) 20.Be5+ Kg5 21.Bg7!, a quiet move that takes h6 away from the king. White threatens 22.h4+ Kf5 23.Ne3#, and 21...Kh5 is met by 22.Rh4+ Kg5 23.f4+ Kf5 24.Be4#. Pachman resigned.",
            },
          },
          {
            type: 'text',
            md:
              "### What to learn from Petrosian\n\n" +
              "- **Ask what your opponent wants**, every move. Often the strongest move is the one that makes his plan impossible.\n" +
              "- **Safety first, then the win.** Petrosian rarely took risks he did not need, which made him extremely hard to beat.\n" +
              "- **The exchange is not sacred.** A rook for a minor piece can be a good deal if it gives you lasting control of key squares or kills the opponent's counterplay.\n" +
              "- **Know when to switch.** A defensive player who spots a combination must play it. Petrosian did.",
          },
        ],
      },
      {
        id: 'l6-cl-fischer',
        title: 'Fischer: the Game of the Century (1956)',
        summary: 'A 13-year-old punishes neglected development with a queen sacrifice and a windmill of discovered checks: Byrne – Fischer, New York 1956.',
        estMinutes: 16,
        blocks: [
          {
            type: 'text',
            md:
              "**Robert James \"Bobby\" Fischer** (1943–2008) from Brooklyn won the US Championship at 14 and became a grandmaster at 15. In the 1971 Candidates matches he beat Mark Taimanov and Bent Larsen without losing a game, and in 1972 he defeated Boris Spassky in Reykjavik to become world champion. He did not defend his title in 1975, and it passed to Karpov.\n\n" +
              "Fischer's play was clear, energetic and enormously well prepared. His book *My 60 Memorable Games* is one of the best game collections ever written, and he also invented the increment clock and Fischer Random Chess (Chess960).\n\n" +
              "In October 1956, aged 13, he played this game against Donald Byrne, one of America's leading players. Hans Kmoch called it **\"The Game of the Century\"**.",
          },
          {
            type: 'line',
            moves: [
              'Nf3', 'Nf6', 'c4', 'g6', 'Nc3', 'Bg7', 'd4', 'O-O', 'Bf4', 'd5', 'Qb3', 'dxc4', 'Qxc4', 'c6', 'e4', 'Nbd7',
              'Rd1', 'Nb6', 'Qc5', 'Bg4', 'Bg5', 'Na4', 'Qa3', 'Nxc3', 'bxc3', 'Nxe4', 'Bxe7', 'Qb6', 'Bc4', 'Nxc3', 'Bc5',
              'Rfe8+', 'Kf1',
            ],
            caption: 'Donald Byrne – Robert Fischer, Rosenwald Memorial, New York 1956',
            notes: {
              10: 'The position becomes a Grünfeld Defence.',
              13: 'White wins back the pawn, but his queen has already moved twice.',
              19: 'The queen moves yet again. White has not castled and his f1-bishop is still at home.',
              20: 'Black develops with a pin on the f3-knight.',
              22: 'A stunning move: the knight offers itself. If 12.Nxa4, 12...Nxe4 opens the long diagonal and the e-file with a powerful attack.',
              26: 'Black has won a pawn and the e-file is opening against the white king.',
              27: 'The bishop takes on e7 and attacks the queen and the f8-rook.',
              28: 'Fischer leaves the rook to be taken.',
              30: 'Another blow: the knight takes on c3 and attacks the rook on d1.',
              31: 'The bishop attacks the black queen.',
              32: 'A check first, before dealing with the queen.',
              33: 'The black queen is still attacked. What did the 13-year-old play?',
            },
          },
          {
            type: 'exercise',
            exercise: {
              id: 'l6-cl-fischer-ex1',
              prompt: 'Byrne – Fischer 1956. Black to move. Your queen is attacked: find Fischer\'s famous reply.',
              fen: 'r3r1k1/pp3pbp/1qp3p1/2B5/2BP2b1/Q1n2N2/P4PPP/3R1K1R b - - 3 17',
              solution: ['Be6'],
              hint: 'Do not save the queen. Look at the white king on f1 and the bishop on c4.',
              explanation:
                "17...Be6!! offers the queen to start a decisive attack. If 18.Bxe6, then 18...Qb5+ 19.Kg1 Ne2+ 20.Kf1 Ng3+ 21.Kg1 Qf1+!! 22.Rxf1 Ne2# is a smothered mate. In the game Byrne took the queen with 18.Bxb6, and Black's bishop and knight started a 'windmill' of checks that collected far more than enough material for the queen.",
            },
          },
          {
            type: 'line',
            fen: 'r3r1k1/pp3pbp/1qp1b1p1/2B5/2BP4/Q1n2N2/P4PPP/3R1K1R w - - 4 18',
            moves: [
              'Bxb6', 'Bxc4+', 'Kg1', 'Ne2+', 'Kf1', 'Nxd4+', 'Kg1', 'Ne2+', 'Kf1', 'Nc3+', 'Kg1', 'axb6', 'Qb4', 'Ra4',
              'Qxb6', 'Nxd1', 'h3', 'Rxa2', 'Kh2', 'Nxf2', 'Re1', 'Rxe1', 'Qd8+', 'Bf8', 'Nxe1', 'Bd5', 'Nf3', 'Ne4',
              'Qb8', 'b5', 'h4', 'h5', 'Ne5', 'Kg7', 'Kg1', 'Bc5+', 'Kf1', 'Ng3+', 'Ke1', 'Bb4+', 'Kd1', 'Bb3+', 'Kc1',
              'Ne2+', 'Kb1', 'Nc3+', 'Kc1', 'Rc2#',
            ],
            caption: 'The windmill and the final hunt',
            notes: {
              1: 'Byrne takes the queen.',
              2: 'The bishop takes with check, and the windmill begins.',
              6: 'A discovered check from the c4-bishop, picking up the d4-pawn.',
              10: 'Another discovered check. Only now does Black take time to recapture on b6.',
              12: 'Black has two bishops and two extra pawns for the queen, and more is coming: the a8-rook attacks the white queen and the knight attacks the d1-rook.',
              16: 'Black now has two rooks, two bishops and a knight against queen, rook and knight.',
              25: 'The white queen and knight cannot hold back Black\'s rook, two bishops, knight and extra pawns.',
              36: 'The minor pieces start to hunt the white king.',
              48: 'Rook, bishop and knight combine for mate.',
            },
          },
          {
            type: 'text',
            md:
              "### What to learn from Fischer\n\n" +
              "- **Punish neglected development.** Byrne moved his queen four times in the first twelve moves and never castled. Fischer opened lines at once and let his better-developed pieces decide.\n" +
              "- **Count activity, not just material.** After the queen sacrifice Black's pieces worked together perfectly, while the white queen was out of play.\n" +
              "- **Clarity and hard work.** Fischer's adult games are models of clear plans and exact technique, built on hours of daily study. He studied the classics, including Morphy and Steinitz, as seriously as the latest theory.",
          },
        ],
      },
      {
        id: 'l6-cl-karpov',
        title: 'Karpov: the positional squeeze',
        summary: 'Space, restriction and the second weakness: Karpov – Unzicker, Nice Olympiad 1974.',
        estMinutes: 15,
        blocks: [
          {
            type: 'text',
            md:
              "**Anatoly Karpov** (born 1951) became world champion in 1975, when Fischer did not defend his title. He proved he was a worthy champion by defending it twice against Viktor Korchnoi (1978 and 1981) and by winning an enormous number of tournaments. He lost the title to Garry Kasparov in 1985, in the second of their five world championship matches, and was FIDE world champion again from 1993 to 1999.\n\n" +
              "Karpov's style was economical and almost risk-free. He gained space, took away his opponent's active possibilities one by one, and converted small advantages with remarkable smoothness. Many of his wins look simple, which is exactly what makes them so hard to imitate.",
          },
          {
            type: 'line',
            moves: [
              'e4', 'e5', 'Nf3', 'Nc6', 'Bb5', 'a6', 'Ba4', 'Nf6', 'O-O', 'Be7', 'Re1', 'b5', 'Bb3', 'd6', 'c3', 'O-O',
              'h3', 'Na5', 'Bc2', 'c5', 'd4', 'Qc7', 'Nbd2', 'Nc6', 'd5', 'Nd8', 'a4', 'Rb8', 'axb5', 'axb5', 'b4', 'Nb7',
              'Nf1', 'Bd7', 'Be3', 'Ra8', 'Qd2', 'Rfc8', 'Bd3', 'g6', 'Ng3', 'Bf8', 'Ra2', 'c4', 'Bb1', 'Qd8', 'Ba7', 'Ne8',
              'Bc2', 'Nc7', 'Rea1', 'Qe7', 'Bb1', 'Be8', 'Ne2', 'Nd8', 'Nh2', 'Bg7', 'f4', 'f6', 'f5', 'g5', 'Bc2', 'Bf7',
              'Ng3', 'Nb7', 'Bd1', 'h6', 'Bh5', 'Qe8', 'Qd1', 'Nd8', 'Ra3', 'Kf8', 'R1a2', 'Kg8', 'Ng4', 'Kf8', 'Ne3', 'Kg8',
              'Bxf7+', 'Nxf7', 'Qh5', 'Nd8', 'Qg6', 'Kf8', 'Nh5',
            ],
            caption: 'Karpov – Unzicker, Nice Olympiad 1974',
            notes: {
              25: 'White closes the centre. Black\'s knights now have few good squares.',
              27: 'Karpov starts play on the queenside, where he has more space.',
              31: 'The b4-pawn fixes the queenside and takes the a5-square away from the black knight.',
              43: 'White prepares to double rooks on the a-file.',
              44: 'Black closes the queenside, but now the pawns there are fixed and White owns the a-file.',
              47: 'A striking move: the bishop plants itself in front of Black\'s rook on a8. Black can never challenge the a-file, while White\'s rooks can double behind the bishop.',
              51: 'Both white rooks are on the a-file. Black can only wait.',
              59: 'With the queenside under control, Karpov opens a second front on the kingside: the principle of two weaknesses.',
              61: 'More space on the kingside.',
              69: 'The bishop comes to h5 to exchange Black\'s important light-squared bishop.',
              81: 'The exchange weakens the light squares around the black king.',
              85: 'The queen invades on g6.',
              87: 'Black resigned. Nothing is lost yet, but he has no useful moves at all, and White can prepare the breakthrough at leisure.',
            },
          },
          {
            type: 'text',
            md:
              "### What to learn from Karpov\n\n" +
              "- **Restrict before you attack.** Karpov took away Black's play on the queenside first, and only then opened a second front.\n" +
              "- **The principle of two weaknesses.** One front can be defended; two fronts, far apart, usually cannot.\n" +
              "- **Small moves matter.** Moves such as 24.Ba7 or the slow regrouping of the knights look modest, but each one removed an option from the opponent.\n" +
              "- **Economy.** Karpov rarely spent more energy, time or risk than the position required. That is a skill every tournament player can learn.",
          },
        ],
      },
      {
        id: 'l6-cl-kasparov',
        title: 'Kasparov: dynamism and deep calculation',
        summary: 'A rook sacrifice that drags the king across the board: Kasparov – Topalov, Wijk aan Zee 1999.',
        estMinutes: 18,
        blocks: [
          {
            type: 'text',
            md:
              "**Garry Kasparov** (born 1963) beat Karpov in 1985 to become the youngest world champion up to that time, and held the title until he lost to Vladimir Kramnik in 2000. He was the world's top-rated player for most of twenty years, and his peak rating of 2851 (1999) stood as the record until Carlsen passed it. He retired from professional chess in 2005.\n\n" +
              "Kasparov combined unprecedented opening preparation with fierce dynamism: the initiative, piece activity and concrete calculation mattered more to him than static factors. He was also one of the first top players to build his preparation around computers.\n\n" +
              "His game against Veselin Topalov at Wijk aan Zee 1999 is often called **Kasparov's Immortal**.",
          },
          {
            type: 'line',
            moves: [
              'e4', 'd6', 'd4', 'Nf6', 'Nc3', 'g6', 'Be3', 'Bg7', 'Qd2', 'c6', 'f3', 'b5', 'Nge2', 'Nbd7', 'Bh6', 'Bxh6',
              'Qxh6', 'Bb7', 'a3', 'e5', 'O-O-O', 'Qe7', 'Kb1', 'a6', 'Nc1', 'O-O-O', 'Nb3', 'exd4', 'Rxd4', 'c5', 'Rd1', 'Nb6',
              'g3', 'Kb8', 'Na5', 'Ba8', 'Bh3', 'd5', 'Qf4+', 'Ka7', 'Rhe1', 'd4', 'Nd5', 'Nbxd5', 'exd5', 'Qd6',
            ],
            caption: 'Kasparov – Topalov, Wijk aan Zee 1999: the build-up',
            notes: {
              6: 'The Pirc Defence.',
              9: 'White plans Bh6 to exchange Black\'s important dark-squared bishop, and long castling.',
              12: 'Topalov expands on the queenside.',
              26: 'Black also castles queenside, behind his advanced pawns.',
              35: 'The knight lands on a5, next to the black king, and cannot easily be driven away.',
              37: 'The bishop aims at the c8–h3 diagonal.',
              39: 'A check that drives the king to a7.',
              41: 'Every white piece is in play.',
              46: 'This is the position from the calculation lesson. Kasparov now played one of the most famous combinations in chess history.',
            },
          },
          {
            type: 'line',
            fen: 'b2r3r/k4p1p/p2q1np1/NppP4/3p1Q2/P4PPB/1PP4P/1K1RR3 w - - 1 24',
            moves: [
              'Rxd4', 'cxd4', 'Re7+', 'Kb6', 'Qxd4+', 'Kxa5', 'b4+', 'Ka4', 'Qc3', 'Qxd5', 'Ra7', 'Bb7', 'Rxb7', 'Qc4',
              'Qxf6', 'Kxa3', 'Qxa6+', 'Kxb4', 'c3+', 'Kxc3', 'Qa1+', 'Kd2', 'Qb2+', 'Kd1', 'Bf1', 'Rd2', 'Rd7', 'Rxd7',
              'Bxc4', 'bxc4', 'Qxh8', 'Rd3', 'Qa8', 'c3', 'Qa4+', 'Ke1', 'f4', 'f5', 'Kc1', 'Rd2', 'Qa7',
            ],
            caption: 'The combination: 24.Rxd4!!',
            notes: {
              1: 'A rook sacrifice to drag the black king forward.',
              3: 'The second rook joins with check.',
              6: 'The king takes the a5-knight and now stands in front of all his own pieces.',
              8: 'The king is forced further up the board.',
              9: 'A quiet move in the middle of the attack, threatening Qb3#.',
              10: 'The black queen covers b3.',
              11: 'The rook attacks the a8-bishop.',
              13: 'White removes the bishop that was guarding a6.',
              15: 'The queen picks up the f6-knight and prepares to return to the a-file.',
              16: 'The black king walks into White\'s camp.',
              19: 'Another pawn sacrifice drives the king on.',
              24: 'The black king has been chased from a7 to d1.',
              25: 'The most famous move of the game: a quiet bishop move with the black king on d1. The bishop attacks the black queen.',
              27: 'A deflection: after 37...Rxd7 the black rook no longer attacks the white queen on b2, so White can take the black queen and then the h8-rook.',
              31: 'The smoke has cleared: queen against rook.',
              41: 'Topalov resigned. Queen against rook is a technical win.',
            },
          },
          {
            type: 'text',
            md:
              "### What to learn from Kasparov\n\n" +
              "- **Dynamic factors can outweigh material.** Kasparov gave up a rook because the black king's exposure was worth more than the material.\n" +
              "- **Calculate concretely, but trust your judgement.** Engines have since found improvements for both sides, so the combination was not fully forced. No human could have calculated all of it at the board; Kasparov judged that the attack *had* to work and calculated enough to be sure the risk was justified.\n" +
              "- **Preparation and energy.** Kasparov prepared openings more deeply than anyone before him and played every game at full intensity. His *My Great Predecessors* series is also a superb history of the world champions.",
          },
        ],
      },
      {
        id: 'l6-cl-carlsen',
        title: 'Carlsen: the universal player',
        summary: 'The highest-rated player in history. A sacrificial attack at 13, and a style built on pressure, technique and practical decisions.',
        estMinutes: 15,
        blocks: [
          {
            type: 'text',
            md:
              "**Magnus Carlsen** (born 1990) from Norway became a grandmaster in 2004 at the age of 13. He won the world title from Viswanathan Anand in 2013, defended it against Anand, Sergey Karjakin, Fabiano Caruana and Ian Nepomniachtchi, and chose not to defend it in 2023. His peak rating of 2882 (2014) is the highest in history, and he has also won many world titles in rapid and blitz.\n\n" +
              "Carlsen is a **universal** player. He is comfortable in every type of position, but his trademark is grinding out wins from positions that look equal: keeping the pieces on, posing small problems move after move, and outplaying opponents in long endgames.\n\n" +
              "The game below, from the year he became a grandmaster, shows another side of him: a young player calculating a sacrificial attack to the end.",
          },
          {
            type: 'line',
            moves: [
              'e4', 'c6', 'd4', 'd5', 'Nc3', 'dxe4', 'Nxe4', 'Bf5', 'Ng3', 'Bg6', 'h4', 'h6', 'Nf3', 'Nd7', 'h5', 'Bh7',
              'Bd3', 'Bxd3', 'Qxd3', 'e6', 'Bf4', 'Ngf6', 'O-O-O', 'Be7', 'Ne4', 'Qa5', 'Kb1', 'O-O', 'Nxf6+', 'Nxf6',
              'Ne5', 'Rad8', 'Qe2', 'c5', 'Ng6', 'fxg6', 'Qxe6+', 'Kh8', 'hxg6', 'Ng8', 'Bxh6', 'gxh6', 'Rxh6+', 'Nxh6',
              'Qxe7', 'Nf7', 'gxf7', 'Kg7', 'Rd3', 'Rd6', 'Rg3+', 'Rg6',
            ],
            caption: 'Carlsen – Ernst, Wijk aan Zee 2004',
            notes: {
              8: 'The Classical Caro-Kann.',
              11: 'White gains space and harasses the bishop.',
              23: 'White castles queenside.',
              28: 'Black castles on the other side, so both sides can attack.',
              34: 'Black strikes back in the centre.',
              35: 'The 13-year-old sacrifices a knight. If Black takes, the e6-pawn falls with check and the h-file opens.',
              39: 'The pawn on g6 takes the f7- and h7-squares from the black king.',
              41: 'Another sacrifice to tear open the kingside.',
              43: 'And a rook sacrifice.',
              45: 'Black is still well ahead in material, but his king has no defenders left.',
              49: 'The last white piece joins the attack along the third rank.',
              52: 'Black blocks the check. How does White finish?',
            },
          },
          {
            type: 'exercise',
            exercise: {
              id: 'l6-cl-carlsen-ex1',
              prompt: 'Carlsen – Ernst 2004. White to move and win. Find the queen checks Carlsen played.',
              fen: '5r2/pp2QPk1/6r1/q1p5/3P4/6R1/PPP2PP1/1K6 w - - 5 27',
              solution: ['Qe5+', 'Kxf7', 'Qf5+', 'Rf6', 'Qd7#'],
              hint: 'Check from e5 on the long diagonal. The f7-pawn is a powerful helper.',
              explanation:
                "27.Qe5+ Kxf7 28.Qf5+ Rf6? 29.Qd7# and the queen and the g3-rook trap the king in the middle of the board. 28...Ke7 would have lasted longer, but 29.Re3+ Kd8 30.Qxf8+ wins easily. Black's extra material was no help: none of his pieces could reach the king in time.",
            },
          },
          {
            type: 'text',
            md:
              "### What to learn from Carlsen\n\n" +
              "- **Keep playing.** Carlsen wins many \"equal\" positions simply because he keeps asking questions long after others would agree a draw.\n" +
              "- **Endgames are a weapon.** He happily exchanges into endings where he can outplay his opponent slowly. Strong endgame technique turns small edges into points.\n" +
              "- **Practical decisions.** He often chooses the move that is most unpleasant for the opponent rather than the engine's top line, and manages his clock and energy superbly.\n" +
              "- **Fitness and joy.** Carlsen takes physical training seriously and has always played with obvious enjoyment. Both help over a long career.",
          },
        ],
      },
    ],
  },
]
