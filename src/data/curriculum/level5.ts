import type { Module } from '../types.ts'

// Level 5 "Expert" (1800–2200): calculation technique, dynamic play,
// theoretical endgames, converting, defending and practical decision making.
// Every exercise has been checked with Stockfish (scripts/verify-content.ts).

export const level5: Module[] = [
  // ───────────────────────────── 1. CALCULATION ─────────────────────────────
  {
    id: 'l5-calc',
    level: 5,
    title: 'Calculation technique',
    description:
      'How strong players calculate: candidate moves, the tree of variations, forcing moves first, visualisation, blind spots and checking the final position.',
    lessons: [
      {
        id: 'l5-candidates',
        title: 'Candidate moves and the tree of analysis',
        summary: "Kotov's method: list the candidates first, then examine each branch once and only once.",
        estMinutes: 15,
        blocks: [
          {
            type: 'text',
            md:
              "Up to about 1800 most games are decided by simple tactics. Beyond that, your opponents rarely leave pieces hanging, and the result depends on *how well you calculate*: how far you see, how accurately, and how efficiently you use the clock.\n\n" +
              "In his classic book *Think Like a Grandmaster* (1971), Alexander Kotov described a disciplined method that is still the foundation of modern calculation training.",
          },
          {
            type: 'text',
            md:
              "### Kotov's tree of variations\n\n" +
              "1. **Find the candidate moves first.** Before analysing anything, look at the position and list every move that deserves attention — usually two to four. Write them down mentally: \"Nxe5, Bxh7+ and Qd2\".\n" +
              "2. **Examine each candidate once.** Go down one branch, reach a position you can evaluate, and then move to the next candidate. Do not jump back and forth between lines.\n" +
              "3. **In each branch, consider the opponent's candidates too.** Your line is only as good as its answer to the *best* defence.\n" +
              "4. **Stop when you can evaluate.** A branch ends when the position is clearly winning, clearly bad, or quiet enough to judge.\n" +
              "5. **Compare and choose.** Pick the candidate whose worst case is best for you.",
          },
          {
            type: 'tip',
            title: 'The Kotov syndrome',
            md:
              "Kotov described a familiar disaster: you calculate one move for 40 minutes, find a hole in every line, panic, and then play a completely different move *without checking it at all* — which loses at once. The cure is the list: if the first candidate fails, move calmly to the next one on your list and give it the same care.",
          },
          {
            type: 'text',
            md:
              "### Where do candidate moves come from?\n\n" +
              "- **Forcing moves**: every check, capture and threat (we look at these in the next lesson).\n" +
              "- **The demands of the position**: what is attacked, what is weak, which piece is bad.\n" +
              "- **Plans and patterns**: thematic pawn breaks, typical sacrifices, regrouping manoeuvres you know from similar positions.\n" +
              "- **The opponent's idea**: the move that stops his best plan (prophylaxis) is always a candidate.\n\n" +
              "A good habit is to include at least one move that looks *strange* — a quiet move, a retreat, a sacrifice. These are exactly the moves we miss when we only look at the obvious.",
          },
          {
            type: 'board',
            fen: '6k1/ppp5/8/PPP5/8/8/8/6K1 w - - 0 1',
            caption: 'White to move. The kings are far away. Which pawn move breaks through? List the candidates — a6, b6 and c6 — and test each one.',
            highlights: ['a5', 'b5', 'c5'],
          },
          {
            type: 'text',
            md:
              "In the diagram, the three candidates look similar, but they are not. After 1.a6? bxa6 or 1.c6? bxc6 Black's pawns stop everything. Only the *middle* pawn works, because it deflects two black pawns at once. Calculate every branch — including Black's choice of capture — before you look at the solution.",
          },
          {
            type: 'exercise',
            exercise: {
              id: 'l5-candidates-ex1',
              prompt: 'White to move and win. Calculate the breakthrough to the end: one white pawn must promote.',
              fen: '6k1/ppp5/8/PPP5/8/8/8/6K1 w - - 0 1',
              solution: ['b6', 'axb6', 'c6', 'bxa5', 'cxb7'],
              hint: 'Attack two pawns at once with the middle pawn.',
              explanation:
                "1.b6! threatens bxa7 and bxc7. After 1...axb6 2.c6! Black cannot stop both the c- and a-pawn: 2...bxc6 3.a6 queens, and 2...bxa5 3.cxb7 queens on b8. (1...cxb6 is answered by 2.a6! bxa6 3.c6.) The black king is far too slow. Every other first move only draws.",
            },
          },
          {
            type: 'text',
            md:
              "### Calculation is a skill you can train\n\n" +
              "- Solve positions *without moving the pieces*, and write down the full solution before checking.\n" +
              "- Use harder positions than you can solve at a glance — five to fifteen minutes per position is normal for this kind of training.\n" +
              "- After solving, compare your tree with the real solution: which candidate did you miss? Which defence did you overlook?",
          },
        ],
      },
      {
        id: 'l5-forcing',
        title: 'Forcing moves first',
        summary: 'Checks, captures and threats restrict the opponent, which makes long variations calculable.',
        estMinutes: 15,
        blocks: [
          {
            type: 'text',
            md:
              "A forcing move gives the opponent few choices. After a check he must deal with the check; after a capture he usually recaptures; after a strong threat he must parry it. That is why a ten-move forcing line can be easier to calculate than a three-move quiet one.\n\n" +
              "**Rule:** in every position, look at the forcing moves *first* — for both sides — in the order checks, captures, threats. Even moves that look absurd (a queen sacrifice, a rook capture defended three times) deserve a moment, because they are the ones you will otherwise never consider.",
          },
          {
            type: 'tip',
            title: 'Why sacrifices are easier than they look',
            md: "A sacrifice that gives check leaves the opponent with one, two or three legal replies. That is a tiny tree! Strong players see sacrifices quickly not because they are braver, but because forcing moves are cheap to calculate.",
          },
          {
            type: 'text',
            md:
              "### Réti – Tartakower, Vienna 1910\n\n" +
              "One of the most famous short games ever played. Black has just grabbed a knight with 8...Nxe4 and threatens the queen on d3 indirectly. White has a forced mate — and every move is a check.",
          },
          {
            type: 'line',
            moves: ['e4', 'c6', 'd4', 'd5', 'Nc3', 'dxe4', 'Nxe4', 'Nf6', 'Qd3', 'e5', 'dxe5', 'Qa5+', 'Bd2', 'Qxe5', 'O-O-O', 'Nxe4'],
            caption: 'Réti – Tartakower: the opening.',
            notes: {
              9: 'An unusual early queen move; the queen supports castling long.',
              10: 'Black gambits a pawn to open lines — but White is ready.',
              12: 'A check that prepares to regain the pawn.',
              14: 'Black has won the pawn back.',
              15: 'White castles queenside, offering the e4-knight. The d-file is now full of energy.',
              16: 'Black takes the piece. Now look for the forcing moves!',
            },
          },
          {
            type: 'exercise',
            exercise: {
              id: 'l5-forcing-ex1',
              prompt: 'Réti – Tartakower 1910. White to move: mate in 3.',
              fen: 'rnb1kb1r/pp3ppp/2p5/4q3/4n3/3Q4/PPPB1PPP/2KR1BNR w kq - 0 9',
              goal: 'mate',
              solution: ['Qd8+', 'Kxd8', 'Bg5+', 'Kc7', 'Bd8#'],
              hint: 'The queen is a decoy; the real weapon is a double check.',
              explanation:
                "9.Qd8+!! Kxd8 drags the king onto the d-file. 10.Bg5+ is a **double check** from the bishop and the rook on d1, so the king must move: 10...Kc7 11.Bd8# or 10...Ke8 11.Rd8#. Every move was forcing, so the whole tree has just a handful of branches.",
            },
          },
          {
            type: 'text',
            md:
              "### Rotlewi – Rubinstein, Łódź 1907\n\n" +
              "Rubinstein's \"Immortal\" is a model of forcing play. Black's bishops on b7 and b6 aim at the white king, and the white queen on e2 is overloaded. The combination starts with a queen sacrifice and ends with a quiet move — but every step is forced.",
          },
          {
            type: 'board',
            fen: '2rr2k1/1b3ppp/pb2p3/1p2P3/1P2BPnq/P1N3P1/1B2Q2P/R4R1K b - - 0 22',
            caption: 'Black to move. White has just attacked the queen with 22.g3. What is Black\'s most forcing continuation?',
            arrows: [['b7', 'e4'], ['b6', 'g1']],
          },
          {
            type: 'exercise',
            exercise: {
              id: 'l5-forcing-ex2',
              prompt: 'Rotlewi – Rubinstein 1907. Black to move. Find the forcing sequence that wins (four black moves).',
              fen: '2rr2k1/1b3ppp/pb2p3/1p2P3/1P2BPnq/P1N3P1/1B2Q2P/R4R1K b - - 0 22',
              solution: ['Rxc3', 'gxh4', 'Rd2', 'Qxd2', 'Bxe4+', 'Qg2', 'Rh3'],
              hint: 'Ignore the attack on your queen. Remove the defender of e4 first.',
              explanation:
                "22...Rxc3!! ignores the queen and removes a defender of e4. If 23.Bxc3 Bxe4+ 24.Qxe4 Qxh2#. After 23.gxh4 Rd2!! deflects the queen from the defence of e4 (23...Rd2 also attacks the queen and the b2-bishop). 24.Qxd2 Bxe4+ 25.Qg2 and the quiet 25...Rh3! threatens Rxh2# — it cannot be stopped. Rubinstein's moves were checks, captures and threats all the way.",
            },
          },
        ],
      },
      {
        id: 'l5-visualisation',
        title: 'Visualisation and blind spots',
        summary: 'Keeping the position in your head, and the moves we typically fail to see: retreats, quiet moves and long diagonals.',
        estMinutes: 18,
        blocks: [
          {
            type: 'text',
            md:
              "Calculation is impossible without **visualisation**: the ability to see the position clearly in your mind several moves ahead. Errors creep in when the imagined position becomes blurred — a piece that has moved is still \"seen\" on its old square, or a square that has just been vacated is \"seen\" as blocked.\n\n" +
              "Good visualisation is trained, not inherited. The best exercises are solving puzzles from a diagram without moving the pieces, playing through annotated games in your head, and blindfold practice on a small scale (e.g. playing simple endings without a board).",
          },
          {
            type: 'text',
            md:
              "### The classic blind spots\n\n" +
              "Psychologists of chess (and coaches such as Mark Dvoretsky) have catalogued the moves strong players overlook most often:\n\n" +
              "- **Backward moves.** We think forwards. A queen retreating to defend, a knight going back to its first rank, or a bishop dropping back to b1 to reach a new diagonal are easy to miss — for both sides.\n" +
              "- **Quiet moves in the middle of a combination.** After a sequence of checks we expect more checks. A calm move that adds a decisive threat is the hardest kind of move to see.\n" +
              "- **Long diagonals and long-range pieces.** A bishop or queen on the other side of the board, especially along a diagonal that has just opened.\n" +
              "- **Moves by pieces that have just moved**, and squares that a capture has just freed.\n" +
              "- **Horizontal moves** of rooks and queens along a rank, and moves by the king itself (the king walk!).",
          },
          {
            type: 'text',
            md:
              "### Edward Lasker – Thomas, London 1912\n\n" +
              "The most famous king hunt in chess history. After a queen sacrifice, the black king is chased from g8 all the way to g1. Play through it and try to *see* each position before the move is made.",
          },
          {
            type: 'line',
            moves: [
              'd4', 'e6', 'Nf3', 'f5', 'Nc3', 'Nf6', 'Bg5', 'Be7', 'Bxf6', 'Bxf6', 'e4', 'fxe4', 'Nxe4', 'b6',
              'Ne5', 'O-O', 'Bd3', 'Bb7', 'Qh5', 'Qe7', 'Qxh7+', 'Kxh7', 'Nxf6+', 'Kh6', 'Neg4+', 'Kg5', 'h4+', 'Kf4',
            ],
            caption: 'Edward Lasker – Thomas: the hunt begins.',
            notes: {
              19: 'The queen joins the attack on h7.',
              21: 'A queen sacrifice that drags the king into the open.',
              23: 'Double check from the knight and the d3-bishop. The king must step forward.',
              25: 'The king is driven further up the board.',
              28: 'The black king has walked to f4, deep in White\'s half. White now mates in four moves.',
            },
          },
          {
            type: 'exercise',
            exercise: {
              id: 'l5-vis-ex1',
              prompt: 'Edward Lasker – Thomas 1912. White to move: mate in 4. Visualise every king move before you start.',
              fen: 'rn3r2/pbppq1p1/1p2pN2/8/3P1kNP/3B4/PPP2PP1/R3K2R w KQ - 1 15',
              goal: 'mate',
              solution: ['g3+', 'Kf3', 'Be2+', 'Kg2', 'Rh2+', 'Kg1', 'Kd2#'],
              hint: 'Keep checking with pawns and pieces; the king will be mated on White\'s first rank.',
              explanation:
                "15.g3+ Kf3 16.Be2+ Kg2 17.Rh2+ Kg1 and now a king move gives a discovered mate: 18.Kd2# (castling long, 18.O-O-O#, is just as good). The black king ended its journey on g1 — a final position that is hard to visualise from the start, which is exactly why the exercise is useful.",
            },
          },
          {
            type: 'text',
            md:
              "### The quiet move: Fischer – Benko, US Championship 1963/64\n\n" +
              "Fischer has a strong attack against Black's king. The forcing moves do not quite work — but a quiet rook move on the sixth rank creates a threat that cannot be met.",
          },
          {
            type: 'exercise',
            exercise: {
              id: 'l5-vis-ex2',
              prompt: 'Fischer – Benko 1963. White to move. Find the quiet move that decides the game.',
              fen: 'r3qr1k/pp3pbp/2pn4/7Q/3pP3/2NB3P/PPP3P1/R4RK1 w - - 0 19',
              solution: ['Rf6'],
              hint: 'Do not look for a check. Which rook move threatens a mating attack on h7?',
              explanation:
                "19.Rf6!! is one of the most admired quiet moves in chess. The rook cannot be taken: 19...Bxf6 20.e5 opens the b1–h7 diagonal for the bishop on d3, and Qxh7# is threatened while the bishop on f6 is attacked too. White threatens Rxd6 as well as e4–e5, and after 19...Kg8 20.e5 h6 21.Ne2 Benko resigned. The engine confirms that every other move throws away most of the advantage.",
            },
          },
          {
            type: 'text',
            md:
              "### Geometry: Réti's study (1921)\n\n" +
              "Long-range thinking is not only for bishops. In this famous study the white king seems hopelessly far from both pawns — but a king walking along a *diagonal* can chase two goals at once.",
          },
          {
            type: 'exercise',
            exercise: {
              id: 'l5-vis-ex3',
              prompt: 'Réti 1921. White to move and draw. The h-pawn looks unstoppable, and the c-pawn is lost — or is it?',
              fen: '7K/8/k1P5/7p/8/8/8/8 w - - 0 1',
              solution: ['Kg7', 'Kb6', 'Kf6', 'h4', 'Ke5'],
              hint: 'Walk the king diagonally, so that each step approaches both the h-pawn and your own c-pawn.',
              explanation:
                "1.Kg7! h4 (1...Kb6 2.Kf6 h4 3.Ke5 transposes) 2.Kf6 Kb6 3.Ke5! and now 3...Kxc6 4.Kf4 catches the h-pawn, while 3...h3 4.Kd6 h2 5.c7 Kb7 6.Kd7 lets White queen as well — a draw. The diagonal path g7–f6–e5 is exactly as long as the straight path h7–h6–h5, but it heads towards both targets at once.",
            },
          },
        ],
      },
      {
        id: 'l5-final-position',
        title: 'Checking the final position and the comparison method',
        summary: 'The last position of a variation is where mistakes hide. And you do not always have to calculate to the end.',
        estMinutes: 15,
        blocks: [
          {
            type: 'text',
            md:
              "When you finish calculating a line, you reach a **final position** that you evaluate. This is the moment where most calculation errors happen: you have spent energy getting there and you want to be done.\n\n" +
              "Before you trust a line, \"set up\" the final position in your mind and ask:\n\n" +
              "- Whose move is it?\n" +
              "- Is any piece of mine loose or attacked? Is there a check for the opponent?\n" +
              "- Is there an **in-between move** (zwischenzug) in the middle of the line that I have not considered?\n" +
              "- Is it stalemate? Is there a perpetual check?\n" +
              "- Did I \"move\" a piece that is actually pinned?",
          },
          {
            type: 'text',
            md:
              "### The Saavedra position (1895)\n\n" +
              "The most famous endgame study of all shows why you must look at the final position. White's pawn is about to queen, and Black's rook has been checking the white king. After 1.c7 Rd6+ 2.Kb5 Rd5+ 3.Kb4 Rd4+ 4.Kb3 Rd3+ 5.Kc2 Rd4! Black sets a devilish trap: 6.c8=Q? Rc4+! 7.Qxc4 is **stalemate**.",
          },
          {
            type: 'line',
            fen: '8/8/1KP5/3r4/8/8/8/k7 w - - 0 1',
            moves: ['c7', 'Rd6+', 'Kb5', 'Rd5+', 'Kb4', 'Rd4+', 'Kb3', 'Rd3+', 'Kc2', 'Rd4'],
            caption: 'Saavedra: the king walks towards the rook to escape the checks.',
            notes: {
              1: 'The pawn threatens to queen.',
              3: 'The king approaches the rook step by step.',
              9: 'Now there are no more useful checks.',
              10: 'The trap: if 6.c8=Q, then 6...Rc4+! 7.Qxc4 stalemate.',
            },
          },
          {
            type: 'exercise',
            exercise: {
              id: 'l5-final-ex1',
              prompt: 'Saavedra 1895. White to move and win. Check the final position before you promote!',
              fen: '8/2P5/8/8/3r4/8/2K5/k7 w - - 9 6',
              solution: ['c8=R', 'Ra4', 'Kb3'],
              hint: 'A queen leads to stalemate. Promote to a piece that still threatens mate.',
              explanation:
                "6.c8=R!! avoids the stalemate and threatens 7.Ra8#. The main line is 6...Ra4, and now 7.Kb3! attacks the rook and threatens Rc1# at the same time — Black loses the rook or gets mated. Strong players reach the winning final position only because they look at it *as it really is*, not as they expect it to be.",
            },
          },
          {
            type: 'text',
            md:
              "### The comparison method\n\n" +
              "You do not always have to calculate everything to the end. Often two candidate moves lead to similar positions that differ in only one detail — a tempo, a weakened square, the position of one piece. Then you simply **compare**: which version of the position is better for me?\n\n" +
              "For example, if both 1.Rd1 and 1.Re1 lead to the same endgame after forced exchanges, but after 1.Rd1 your opponent gains a tempo attacking the rook, you can choose 1.Re1 without calculating the endgame itself. The comparison method saves enormous amounts of clock time and is how grandmasters keep their calculation \"budget\" for the critical moments.",
          },
          {
            type: 'tip',
            title: 'Blunder check — every move',
            md: "When you have decided on a move, take five more seconds: what are your opponent's checks, captures and threats after it? This last look catches most one-move blunders, which still decide many games even at master level.",
          },
        ],
      },
      {
        id: 'l5-combinations',
        title: 'Combination practice',
        summary: 'Longer combinations from classic games: windmills, double bishop sacrifices and decoys.',
        estMinutes: 20,
        blocks: [
          {
            type: 'text',
            md:
              "Time to put the method together. In each position: list the candidates, start with the forcing moves, calculate the opponent's best defence in every branch and check the final position. Do not move a piece until you have the whole solution in your head.",
          },
          {
            type: 'text',
            md:
              "### Torre – Lasker, Moscow 1925: the windmill\n\n" +
              "Carlos Torre sacrificed his queen to set up a **windmill**: a rook giving alternate discovered checks and captures while the enemy king shuttles between g8 and h8.",
          },
          {
            type: 'exercise',
            exercise: {
              id: 'l5-combo-ex1',
              prompt: 'Torre – Lasker 1925. White to move. Your queen on h5 is attacked. Find the start of the windmill.',
              fen: 'r3rnk1/pb3pp1/3pp2p/1q4BQ/1P1P4/4N1R1/P4PPP/4R1K1 w - - 4 25',
              solution: ['Bf6', 'Qxh5', 'Rxg7+'],
              hint: 'Pin the g7-pawn and threaten mate — even if it costs the queen.',
              explanation:
                "25.Bf6!! threatens Qxh6 and Rxg7+, so Lasker took the queen: 25...Qxh5 26.Rxg7+ Kh8. Now the windmill turns: 27.Rxf7+ Kg8 28.Rg7+ Kh8 29.Rxb7+ Kg8 30.Rg7+ Kh8 31.Rg5+ Kh7 32.Rxh5 — White has picked up two pawns and a bishop along the way and regained the queen, and he went on to win the endgame.",
            },
          },
          {
            type: 'text',
            md:
              "### Lasker – Bauer, Amsterdam 1889: the double bishop sacrifice\n\n" +
              "The prototype of a pattern every attacker must know: both bishops are sacrificed on h7 and g7 to strip the king, and a rook lift finishes the job.",
          },
          {
            type: 'line',
            moves: [
              'f4', 'd5', 'e3', 'Nf6', 'b3', 'e6', 'Bb2', 'Be7', 'Bd3', 'b6', 'Nc3', 'Bb7', 'Nf3', 'Nbd7', 'O-O', 'O-O',
              'Ne2', 'c5', 'Ng3', 'Qc7', 'Ne5', 'Nxe5', 'Bxe5', 'Qc6', 'Qe2', 'a6', 'Nh5', 'Nxh5', 'Bxh7+', 'Kxh7',
              'Qxh5+', 'Kg8', 'Bxg7', 'Kxg7', 'Qg4+', 'Kh7', 'Rf3', 'e5', 'Rh3+', 'Qh6', 'Rxh6+', 'Kxh6', 'Qd7',
            ],
            caption: 'Lasker – Bauer 1889: the double bishop sacrifice.',
            notes: {
              29: 'The first bishop sacrifice.',
              31: 'Regaining the piece with check.',
              33: 'The second bishop! The king is stripped bare.',
              35: 'Check, and now the rook joins in along the third rank.',
              37: 'The rook lift: Rh3# is threatened.',
              38: 'Clearing the sixth rank so that the queen can block on h6.',
              40: 'Black has to give the queen back to avoid mate.',
              43: 'The double attack wins one of the bishops, and Lasker went on to win.',
            },
          },
          {
            type: 'text',
            md:
              "### Nimzowitsch – Tarrasch, St Petersburg 1914\n\n" +
              "Tarrasch played the same double bishop sacrifice with Black: 19...Bxh2+! 20.Kxh2 Qh4+ 21.Kg1. Now the second bishop must go — and after that, Black's heavy pieces join the attack.",
          },
          {
            type: 'exercise',
            exercise: {
              id: 'l5-combo-ex2',
              prompt: 'Nimzowitsch – Tarrasch 1914. Black to move. Continue the attack (four black moves).',
              fen: '3r1rk1/p4p1p/2b3p1/2p5/3P3q/1P6/PBQN1PP1/2R2RK1 b - - 2 21',
              solution: ['Bxg2', 'f3', 'Rfe8', 'Ne4', 'Qh1+', 'Kf2', 'Bxf1'],
              hint: 'Strip away the last pawn shield, then bring a rook to the open e-file.',
              explanation:
                "21...Bxg2! 22.f3 (22.Kxg2 Qg4+ 23.Kh2 Rd5 and the rook swings to h5) 22...Rfe8! brings the last piece into the attack and threatens ...Re2. 23.Ne4 Qh1+ 24.Kf2 Bxf1 — Black has regained material with a raging attack. Tarrasch finished with a beautiful mate on move 32.",
            },
          },
        ],
      },
    ],
  },
]
