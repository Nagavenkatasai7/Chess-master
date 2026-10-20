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
]
