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
          {
            type: 'text',
            md:
              "The game continued 25.d5 f5 26.Qc3 Qg2+ 27.Ke3 Rxe4+! 28.fxe4 f4+! 29.Kxf4. The white king has been dragged into the open — and Black has a forced mate.",
          },
          {
            type: 'exercise',
            exercise: {
              id: 'l5-combo-ex3',
              prompt: 'Nimzowitsch – Tarrasch 1914, move 29. Black to move: mate in 4.',
              fen: '3r2k1/p6p/6p1/2pP4/4PK2/1PQ5/PB4q1/2R2b2 b - - 0 29',
              goal: 'mate',
              solution: ['Rf8+', 'Ke5', 'Qh2+', 'Ke6', 'Re8+', 'Kd7', 'Bb5#'],
              hint: 'Bring the last rook in with check and keep the king on the run towards your bishop.',
              explanation:
                "29...Rf8+ 30.Ke5 (30.Qf6 Rxf6+ loses the queen) Qh2+ 31.Ke6 Re8+ 32.Kd7 Bb5# — the bishop that captured on f1 delivers the final blow. Every black move was a check, so the tree was tiny.",
            },
          },
        ],
      },
    ],
  },
  // ───────────────────────────── 2. DYNAMIC PLAY ─────────────────────────────
  {
    id: 'l5-dynamics',
    level: 5,
    title: 'Dynamic play',
    description:
      'The initiative, compensation, pawn and exchange sacrifices, positional piece sacrifices and attacking with opposite-side castling.',
    lessons: [
      {
        id: 'l5-initiative',
        title: 'The initiative and compensation',
        summary: 'Why time and activity can be worth more than material — and how to judge whether a sacrifice is justified.',
        estMinutes: 15,
        blocks: [
          {
            type: 'text',
            md:
              "The player with the **initiative** is the one making threats. The opponent has to react, so he cannot carry out his own plans. Each threat that must be answered gains a tempo, and a series of such tempi can be converted into a mating attack, a decisive weakness or the win of material.\n\n" +
              "Material is permanent; the initiative is temporary. That is the central tension of dynamic chess: a sacrifice is justified only if the initiative it buys turns into something permanent before it evaporates.",
          },
          {
            type: 'text',
            md:
              "### Kinds of compensation\n\n" +
              "When you are down material, ask what you have in return:\n\n" +
              "- **Development**: more pieces in play, especially in an open position.\n" +
              "- **King safety**: the enemy king is stuck in the centre or its pawn cover is broken.\n" +
              "- **Open lines**: files and diagonals for your rooks and bishops.\n" +
              "- **Space and piece activity**: your pieces have squares, his do not.\n" +
              "- **Structural trumps** (long-term): a passed pawn, weak enemy pawns, the bishop pair, a dominant knight.\n\n" +
              "The first three are *dynamic* — use them quickly or they disappear. The last two are *static* and last into the endgame. A pawn sacrifice for static compensation (like the Benko Gambit) can be played calmly; a sacrifice for development demands energetic play.",
          },
          {
            type: 'text',
            md:
              "### Example: the Danish Gambit\n\n" +
              "White gives two pawns for a lead in development and two raking bishops. Black's best defence is to give material back at the right moment.",
          },
          {
            type: 'line',
            moves: ['e4', 'e5', 'd4', 'exd4', 'c3', 'dxc3', 'Bc4', 'cxb2', 'Bxb2', 'd5', 'Bxd5', 'Nf6', 'Bxf7+', 'Kxf7', 'Qxd8', 'Bb4+', 'Qd2', 'Bxd2+', 'Nxd2'],
            caption: 'The Danish Gambit: two pawns for development — and Black\'s antidote.',
            notes: {
              5: 'The second pawn is offered.',
              9: 'White has given two pawns. Both bishops aim at f7 and g7, and White will develop with gain of time.',
              10: 'The antidote: Black returns a pawn to open lines for his own pieces and to kill the c4-bishop\'s pressure.',
              13: 'White grabs a pawn back with check.',
              16: 'A check that wins back the queen.',
              19: 'The dynamic phase is over: material is level and the position is about equal. Giving material back at the right moment is a key defensive skill.',
            },
          },
          {
            type: 'tip',
            title: 'Keep the momentum',
            md: "When you have the initiative, every move should create a new problem. A single slow move can let the opponent consolidate, and then your sacrificed material is simply missing. Conversely, when defending against a gambit, look for the moment to give material back in return for safety or simplification.",
          },
        ],
      },
      {
        id: 'l5-pawn-sacrifices',
        title: 'Pawn sacrifices for development and long-term pressure',
        summary: 'The Marshall Attack and the Benko Gambit: two very different reasons to give a pawn.',
        estMinutes: 15,
        blocks: [
          {
            type: 'text',
            md:
              "### The Marshall Attack: a pawn for a king attack\n\n" +
              "Frank Marshall prepared this gambit for years before springing it on Capablanca in 1918. Black gives a central pawn to open lines towards the white king while White's queenside pieces are still at home. Today it is one of the most respected defences to the Ruy Lopez at the very top level.",
          },
          {
            type: 'line',
            moves: ['e4', 'e5', 'Nf3', 'Nc6', 'Bb5', 'a6', 'Ba4', 'Nf6', 'O-O', 'Be7', 'Re1', 'b5', 'Bb3', 'O-O', 'c3', 'd5', 'exd5', 'Nxd5', 'Nxe5', 'Nxe5', 'Rxe5', 'c6', 'd4', 'Bd6', 'Re1', 'Qh4', 'g3', 'Qh3'],
            caption: 'The Marshall Attack main line.',
            notes: {
              16: 'The gambit.',
              21: 'White has won a pawn, but his queenside is undeveloped.',
              22: 'Supporting the d5-knight and preparing ...Bd6 with tempo on the rook.',
              26: 'The queen joins the attack, forcing a weakness.',
              28: 'The queen sits on h3 next to the white king. Black will bring the bishop to g4 or f5 and a rook to e6 or e8; White must defend precisely.',
            },
          },
          {
            type: 'text',
            md:
              "### The Benko Gambit: a pawn for permanent pressure\n\n" +
              "In the Benko, Black gives the b-pawn for **long-term** compensation: open a- and b-files for the rooks, a bishop on g7 raking the long diagonal, and pressure against a2 and b2 that often lasts deep into the endgame. Black is in no hurry — the compensation does not run away.",
          },
          {
            type: 'line',
            moves: ['d4', 'Nf6', 'c4', 'c5', 'd5', 'b5', 'cxb5', 'a6', 'bxa6', 'Bxa6', 'Nc3', 'd6', 'e4', 'Bxf1', 'Kxf1', 'g6', 'g3', 'Bg7', 'Kg2', 'O-O', 'Nf3', 'Nbd7'],
            caption: 'The Benko Gambit: Black\'s typical set-up.',
            notes: {
              6: 'The gambit pawn.',
              10: 'Black recaptures with the bishop, developing it to a6 where it can be exchanged to deprive White of castling.',
              15: 'White cannot castle, though he can tuck the king away with g3 and Kg2.',
              22: 'Black will continue with ...Qa5 or ...Qb6, ...Rfb8 and ...Ra7: all the pressure is aimed at the queenside.',
            },
          },
          {
            type: 'tip',
            title: 'Ask: is it dynamic or static?',
            md: "Before sacrificing a pawn, decide which kind of compensation you are getting. Dynamic compensation (development, attack) requires concrete, forcing play now. Static compensation (open files, weak pawns) allows patient manoeuvring — and often the best plan is to win the pawn back in a favourable endgame.",
          },
        ],
      },
      {
        id: 'l5-exchange-sac',
        title: 'The exchange sacrifice',
        summary: 'Giving a rook for a minor piece to gain squares, structure or initiative — the speciality of Petrosian and Kasparov.',
        estMinutes: 12,
        blocks: [
          {
            type: 'text',
            md:
              "A rook is \"worth\" five pawns and a minor piece three — but those numbers assume open lines where rooks are strong. In closed positions, or when a minor piece gets a dominant square, a rook can be worth less than a knight or bishop. Giving up the exchange (rook for minor piece) is then a powerful positional weapon.\n\n" +
              "### Typical reasons for an exchange sacrifice\n\n" +
              "- **To destroy the opponent's pawn structure**, especially in front of his king. In the Sicilian, ...Rxc3 followed by ...Nxe4 or ...Qa5 against a king on c1 or b1 is the classic example.\n" +
              "- **To win a key square** for a minor piece — for example a knight on d5 that can never be challenged.\n" +
              "- **To eliminate a strong defensive piece**, such as the bishop that guards the dark squares around the king.\n" +
              "- **Defensively**, to break the opponent's attack and reach a solid position with compensation (a pawn or two and a fortress).",
          },
          {
            type: 'board',
            fen: '3q1rk1/pp1bppbp/3p1np1/8/2r1P1P1/2N1BP2/PPPQN3/2KR3R b - - 2 16',
            caption: 'A Dragon Sicilian (Karpov – Korchnoi 1974). The rook on c4 eyes the knight on c3. In many such positions ...Rxc3, breaking up the white king\'s pawn cover, is Black\'s main attacking resource.',
            arrows: [['c4', 'c3']],
            highlights: ['b2', 'c1'],
          },
          {
            type: 'text',
            md:
              "### Petrosian and Kasparov\n\n" +
              "Tigran Petrosian, world champion 1963–69, was the great master of the *positional* exchange sacrifice. In Reshevsky – Petrosian (Zurich Candidates 1953) he gave up the exchange with 25...Re6!! simply to bring a knight to the d5-square, where it blockaded White's centre and neutralised all of White's play.\n\n" +
              "Garry Kasparov used the exchange sacrifice more aggressively: to tear open the opponent's king position or to keep the initiative when the game threatened to become quiet. For both, the point was the same — material is only one element of the position.",
          },
          {
            type: 'tip',
            title: 'Test it with this question',
            md: "After the sacrifice, which of my minor pieces is better than his rook? If your knight or bishop will dominate while his rook has no open file, the exchange sacrifice is probably good. If his rook can find an open file quickly, think again.",
          },
        ],
      },
      {
        id: 'l5-piece-sac',
        title: 'Positional piece sacrifices',
        summary: 'Sacrificing a piece without a forced win: for a lasting attack, a trapped king or overwhelming activity.',
        estMinutes: 15,
        blocks: [
          {
            type: 'text',
            md:
              "A *combination* is a forced sequence that wins: you can calculate it to the end. A **positional (or speculative) sacrifice** is different: you give material for long-term factors you cannot calculate completely — a king stuck in the centre, a ruined pawn shield, pieces that will never get into play.\n\n" +
              "Typical examples:\n\n" +
              "- **Nd5!** or **Nf5!** in the Sicilian, opening the e-file against a king on e8.\n" +
              "- **Bxb5!** or **Nxb5** against ...a6/...b5 structures, keeping the black king in the centre.\n" +
              "- **Nxe6** or **Bxe6** when the e6-pawn is the only shield of a king that has not castled.\n\n" +
              "Mikhail Tal made such sacrifices famous. He explained that there are two kinds of sacrifices: correct ones, and his. Today we know many of his sacrifices were objectively risky — but they forced opponents to solve problems at the board, which is exactly what makes them practically effective.",
          },
          {
            type: 'text',
            md:
              "### Deep Blue – Kasparov, game 6, New York 1997\n\n" +
              "In the deciding game of the famous match, Kasparov chose a sharp line of the Caro-Kann in which the knight sacrifice on e6 was known to be dangerous. The machine sacrificed at once and won in 19 moves. The black king never escaped from the centre.",
          },
          {
            type: 'exercise',
            exercise: {
              id: 'l5-piece-sac-ex1',
              prompt: 'Deep Blue – Kasparov 1997. White to move. Black has just played 7...h6, attacking the knight on g5. What did Deep Blue play?',
              fen: 'r1bqkb1r/pp1n1pp1/2p1pn1p/6N1/3P4/3B1N2/PPP2PPP/R1BQK2R w KQkq - 0 8',
              solution: ['Nxe6'],
              hint: 'Do not retreat. Which sacrifice keeps the black king in the centre?',
              explanation:
                "8.Nxe6! Qe7 9.O-O fxe6 10.Bg6+ Kd8 — Black is a piece up, but his king is stuck on d8, his queenside pieces are tangled, and White's attack is lasting. The engine prefers Nxe6 to any retreat. Kasparov resigned on move 19.",
            },
          },
          {
            type: 'line',
            fen: 'r1bqkb1r/pp1n1pp1/2p1pn1p/6N1/3P4/3B1N2/PPP2PPP/R1BQK2R w KQkq - 0 8',
            moves: ['Nxe6', 'Qe7', 'O-O', 'fxe6', 'Bg6+', 'Kd8', 'Bf4', 'b5', 'a4', 'Bb7', 'Re1', 'Nd5', 'Bg3', 'Kc8', 'axb5', 'cxb5', 'Qd3', 'Bc6', 'Bf5', 'exf5', 'Rxe7', 'Bxe7', 'c4'],
            caption: 'Deep Blue – Kasparov 1997: the rest of the game.',
            notes: {
              3: 'White calmly castles: the knight on e6 is not running away.',
              5: 'The king must go to d8; it will never find safety.',
              9: 'Opening the a-file against the king.',
              19: 'Giving back material to open lines.',
              21: 'The rook takes the black queen; Black only gets a rook for it.',
              23: 'Black resigned: the c-pawn opens more lines against the exposed king, and Black\'s pieces are hopelessly uncoordinated.',
            },
          },
          {
            type: 'tip',
            title: 'Judging a speculative sacrifice',
            md: "Count the pieces that will take part in the attack after the sacrifice, compare them with the defenders, and ask whether the opponent's king can escape in two or three moves. If the king is permanently stuck and you have more attackers, the sacrifice is usually worth it.",
          },
        ],
      },
      {
        id: 'l5-opposite-castling',
        title: 'Attacking with opposite-side castling',
        summary: 'When the kings castle on opposite wings, the game becomes a race: speed matters more than material.',
        estMinutes: 18,
        blocks: [
          {
            type: 'text',
            md:
              "When the kings are on opposite wings, both sides can throw their pawns at the enemy king without weakening their own. The game becomes a **race**, and the rules change:\n\n" +
              "- **Every tempo counts.** A slow defensive move is often a lost tempo in the race.\n" +
              "- **Pawn storms** open files: h4–h5 and g4–g5 for White, ...b5–b4 and ...a5–a4 for Black.\n" +
              "- **Sacrifices to open lines** are normal — a pawn or even a piece to gain a file towards the king.\n" +
              "- **Exchange the defenders.** Trading the opponent's fianchetto bishop (Bh6 against ...Bg7) cripples his defence.\n" +
              "- **Defend actively.** The best defence is often a counter-strike in the centre, or a counterattack that comes first.",
          },
          {
            type: 'text',
            md:
              "### Karpov – Korchnoi, Candidates final (game 2), Moscow 1974\n\n" +
              "The Yugoslav Attack against the Dragon: White castles long, Black short, and both sides storm. Karpov's play is a model: open the h-file, exchange the g7-bishop, deflect the defending knight — and mate.",
          },
          {
            type: 'line',
            moves: [
              'e4', 'c5', 'Nf3', 'd6', 'd4', 'cxd4', 'Nxd4', 'Nf6', 'Nc3', 'g6', 'Be3', 'Bg7', 'f3', 'Nc6', 'Qd2', 'O-O',
              'Bc4', 'Bd7', 'h4', 'Rc8', 'Bb3', 'Ne5', 'O-O-O', 'Nc4', 'Bxc4', 'Rxc4', 'h5', 'Nxh5', 'g4', 'Nf6',
              'Nde2', 'Qa5', 'Bh6', 'Bxh6', 'Qxh6', 'Rfc8', 'Rd3', 'R4c5',
            ],
            caption: 'Karpov – Korchnoi 1974: the Yugoslav Attack.',
            notes: {
              13: 'f3 supports e4 and prepares g4; the Yugoslav set-up.',
              19: 'The h-pawn starts the storm at once.',
              23: 'Opposite-side castling: the race is on.',
              27: 'A pawn sacrifice to open the h-file.',
              29: 'Gaining another tempo against the knight.',
              33: 'Exchanging Black\'s best defender, the fianchettoed bishop.',
              37: 'The rook defends along the third rank (against ...Rxc3) and is ready to swing to d5.',
              38: 'Black prepares ...Rxg5 or ...Rxc3. White must strike first.',
            },
          },
          {
            type: 'exercise',
            exercise: {
              id: 'l5-oc-ex1',
              prompt: 'Karpov – Korchnoi 1974. White to move. How does White deflect the knight on f6, the last defender of h7?',
              fen: '2r3k1/pp1bpp1p/3p1npQ/q1r5/4P1P1/2NR1P2/PPP1N3/2K4R w - - 3 20',
              solution: ['g5', 'Rxg5', 'Rd5', 'Rxd5', 'Nxd5'],
              hint: 'Attack the knight with a pawn, and do not let the rook on g5 defend the kingside.',
              explanation:
                "20.g5! attacks the f6-knight, the only piece guarding h7. 20...Rxg5 21.Rd5! is the point: the rook on g5 is challenged and the black queen is cut off from the defence. After 21...Rxd5 22.Nxd5 the knight on d5 again hits f6. Karpov followed with 23.Nef4, 24.e5 and mate threats on h7; Korchnoi resigned on move 27.",
            },
          },
          {
            type: 'line',
            fen: '2r3k1/pp1bpp1p/3p1npQ/q1r5/4P1P1/2NR1P2/PPP1N3/2K4R w - - 3 20',
            moves: ['g5', 'Rxg5', 'Rd5', 'Rxd5', 'Nxd5', 'Re8', 'Nef4', 'Bc6', 'e5', 'Bxd5', 'exf6', 'exf6', 'Qxh7+', 'Kf8', 'Qh8+'],
            caption: 'The finish of Karpov – Korchnoi.',
            notes: {
              7: 'Bringing the second knight towards h5 and d5.',
              9: 'Another deflection: the f6-knight is attacked again.',
              13: 'The h-file finally opens.',
              15: 'Black resigned: after 27...Ke7 28.Nxd5+ Qxd5 29.Re1+ he must give up the queen.',
            },
          },
        ],
      },
    ],
  },

  // ─────────────────────────── 3. THEORETICAL ENDGAMES ───────────────────────────
  {
    id: 'l5-endgames',
    level: 5,
    title: 'Theoretical endgames',
    description:
      'The endgame positions every expert must know: rook endings revisited, rook vs minor piece, queen vs rook, the bishop and knight mate, opposite-coloured bishops, knight endings and zugzwang.',
    lessons: [
      {
        id: 'l5-rook-endings',
        title: 'Rook endings revisited: Lucena, Philidor, short side, Vančura',
        summary: 'Rook endings are the most common endings in practice. These four ideas decide most of them.',
        estMinutes: 20,
        blocks: [
          {
            type: 'text',
            md:
              "About half of all endgames that arise in practice are rook endgames, and most of them come down to a few key positions. Tarrasch's saying \"all rook endings are drawn\" is an exaggeration — but it reminds us how hard they are to win, and how important precise technique is for both sides.",
          },
          {
            type: 'text',
            md:
              "### 1. The Lucena position: building a bridge\n\n" +
              "The attacker's king is on the queening square, the pawn is on the seventh, and the defending king is cut off by at least one file. The winning method is to **cut the king off further, put the rook on the fourth rank, and walk the king out**: when the checks come, the rook interposes.",
          },
          {
            type: 'line',
            fen: '6K1/4k1P1/8/8/8/8/7r/5R2 w - - 0 1',
            moves: ['Re1+', 'Kd7', 'Re4', 'Rh1', 'Kf7', 'Rf1+', 'Kg6', 'Rg1+', 'Kf6', 'Rf1+', 'Kg5', 'Rg1+', 'Rg4'],
            caption: 'The Lucena position: building the bridge.',
            notes: {
              1: 'First push the black king one more file away.',
              3: 'The bridge: the rook goes to the fourth rank.',
              5: 'The king comes out and the checks begin.',
              9: 'The king approaches the rook...',
              13: 'and the rook blocks the last check. The pawn will queen.',
            },
          },
          {
            type: 'text',
            md:
              "### 2. The Philidor position: the third-rank defence\n\n" +
              "When the defending king is in front of the pawn, the defence is simple if you know it: keep your rook on your **third rank** (the sixth rank, seen from White) so the enemy king cannot come forward. When the pawn advances to that rank, the attacking king loses its shelter — then swing the rook to the back rank and check from behind.",
          },
          {
            type: 'line',
            fen: '4k3/R7/7r/3KP3/8/8/8/8 b - - 0 1',
            moves: ['Rb6', 'Ra8+', 'Ke7', 'Ra7+', 'Ke8', 'e6', 'Rb1', 'Kd6', 'Rd1+', 'Ke5', 'Re1+', 'Kd6', 'Rd1+'],
            caption: 'The Philidor defence.',
            notes: {
              1: 'The rook stays on the sixth rank. White\'s king cannot advance to d6 or e6.',
              6: 'The only way to make progress — but now the white king has no shelter from checks.',
              7: 'At once to the back rank.',
              9: 'Endless checks from behind. Draw.',
            },
          },
          {
            type: 'text',
            md:
              "### 3. The short-side defence\n\n" +
              "If the defender is too late for the Philidor and the attacking king reaches the sixth rank, the defending king should go to the **short side** of the pawn (the side with fewer files), leaving the long side free for the rook. Then the rook can check the enemy king *from the side* at a distance of at least three files, which is enough to stop it from hiding next to the pawn.",
          },
          {
            type: 'board',
            fen: '5k2/1R6/4K3/4P3/8/8/8/r7 b - - 0 1',
            caption: 'Short-side defence: Black\'s king is on f8 (short side of the e-pawn) and the rook checks from the long side: 1...Ra6+! The white king cannot escape the side checks without leaving the pawn.',
            arrows: [['a1', 'a6']],
          },
          {
            type: 'text',
            md:
              "### 4. The Vančura position\n\n" +
              "Rook and a-pawn against rook is the most drawish case. When the attacker's rook stands in front of the pawn (Ra8 with the pawn on a6), the defender places the rook **on the sixth rank, attacking the pawn from the side**, and keeps the king on g7/h7. The rook ties the white rook and checks the white king from the side whenever it approaches the pawn.",
          },
          {
            type: 'board',
            fen: 'R7/6k1/P4r2/8/3K4/8/8/8 w - - 0 1',
            caption: 'The Vančura position: the black rook on f6 attacks the a6-pawn from the side and the king guards g7 and h7. This is a known draw.',
            arrows: [['f6', 'a6']],
            highlights: ['g7', 'h7'],
          },
          {
            type: 'tip',
            title: 'The two golden rules of rook endings',
            md: "**Activity first:** an active rook is often worth a pawn. **Rooks behind passed pawns:** both behind your own and behind your opponent's. And cut off the enemy king whenever you can.",
          },
        ],
      },
      {
        id: 'l5-rook-vs-minor',
        title: 'Rook vs minor piece and queen vs rook',
        summary: 'When the rook wins and when it does not; the basic idea of queen against rook.',
        estMinutes: 12,
        blocks: [
          {
            type: 'text',
            md:
              "### Rook against bishop\n\n" +
              "Without pawns, rook against bishop is normally a draw — **if the defending king goes to the right corner**: the corner whose colour the bishop does *not* control. There, the bishop can always block a check from the rook without allowing a pin or a mate.",
          },
          {
            type: 'board',
            fen: '6bk/R7/6K1/8/8/8/8/8 b - - 0 1',
            caption: 'The safe corner: h8 is a dark square and the bishop is light-squared. Black simply shuffles the bishop; there is no way through.',
          },
          {
            type: 'text',
            md:
              "### Rook against knight\n\n" +
              "Rook against knight is also usually drawn, provided **the knight stays close to its king**. A knight separated from its king can be trapped or dominated, and the defending king driven into a corner is in great danger. When defending, keep king and knight together and avoid the corners.",
          },
          {
            type: 'board',
            fen: '8/R7/8/3k4/3n4/8/8/5K2 w - - 0 1',
            caption: 'King and knight side by side in the centre: a solid defence.',
          },
          {
            type: 'text',
            md:
              "### Queen against rook\n\n" +
              "Queen against rook is a win, but it is surprisingly difficult — even grandmasters have failed to win it within 50 moves. The defender keeps the rook **close to the king** to avoid forks. The attacker uses checks to push the king to the edge and then **zugzwang** to force the rook away from the king, after which a queen fork wins it.\n\n" +
              "You do not need to memorise the technique at this level, but you should know the result and the ideas: drive the king to the edge, keep your king close, and look for the moment when the rook must leave its king.",
          },
          {
            type: 'board',
            fen: '4k3/3r4/4K3/8/8/8/8/7Q w - - 0 1',
            caption: 'Queen against rook: the rook clings to its king. White will use checks and waiting moves until the rook is forced to separate.',
          },
        ],
      },
      {
        id: 'l5-bn-mate',
        title: 'The bishop and knight mate',
        summary: 'Mate can only be forced in a corner of the bishop\'s colour. The W-manoeuvre drives the king there.',
        estMinutes: 15,
        blocks: [
          {
            type: 'text',
            md:
              "King, bishop and knight against king is a forced win, but it can take up to 33 moves with best play, so you must know the method to finish within the 50-move rule.\n\n" +
              "The key fact: **mate is only possible in a corner of the same colour as the bishop.** With a light-squared bishop that means a8 or h1.\n\n" +
              "1. Drive the enemy king to the edge using your king and pieces.\n" +
              "2. If it escapes to the wrong corner, drive it along the edge towards the right corner.\n" +
              "3. The knight does this with the famous **W-manoeuvre** (on f7, e5, d7, c5 and so on — the knight's path draws a W), while the bishop takes away the escape squares of the other colour.",
          },
          {
            type: 'board',
            fen: '5k2/5N2/5K2/5B2/8/8/8/8 w - - 0 1',
            caption: 'White has a light-squared bishop, so the black king must be mated on a8 or h1. It is near h8 — the wrong corner — and must be driven along the eighth rank to a8.',
            highlights: ['a8', 'h1'],
          },
          {
            type: 'line',
            fen: '5k2/5N2/5K2/5B2/8/8/8/8 w - - 0 1',
            moves: [
              'Bh7', 'Ke8', 'Ne5', 'Kd8', 'Ke6', 'Kc7', 'Nd7', 'Kb7', 'Bd3', 'Kc6', 'Bf1', 'Kc7', 'Ke7', 'Kc8', 'Bd3', 'Kc7',
              'Bb5', 'Kc8', 'Kd6', 'Kb7', 'Bc4', 'Kc8', 'Nc5', 'Kd8', 'Bb5', 'Kc8', 'Bd7+', 'Kb8', 'Kc6', 'Ka7', 'Kc7', 'Ka8',
              'Kb6', 'Kb8', 'Na6+', 'Ka8', 'Bc6#',
            ],
            caption: 'The bishop and knight mate (engine line with the best defence).',
            notes: {
              1: 'The bishop seals g8 so the king cannot return to the h8 corner.',
              3: 'The knight starts its W-route: f7, e5, d7, c5.',
              5: 'The king follows to keep the black king boxed in.',
              7: 'The knight on d7 covers b8 and c5, the dark squares the bishop cannot reach.',
              11: 'A waiting move: the bishop loses a tempo while staying on the important diagonals.',
              17: 'The bishop takes away the light squares around the king.',
              23: 'The last step of the W.',
              27: 'The king is forced into the a8 corner.',
              35: 'The knight checks from a6 ...',
              37: '... and the bishop mates on the long diagonal.',
            },
          },
          {
            type: 'tip',
            title: 'Practise it against the computer',
            md: "Set up the position with the king in the wrong corner and try to mate within 33 moves. Once you can do it twice in a row, you will never forget it — and you will understand the coordination of bishop and knight much better.",
          },
        ],
      },
      {
        id: 'l5-ocb-fortress',
        title: 'Opposite-coloured bishops and fortresses',
        summary: 'Why opposite-coloured bishops draw in the endgame and attack in the middlegame; the idea of a fortress.',
        estMinutes: 12,
        blocks: [
          {
            type: 'text',
            md:
              "With **bishops of opposite colours** and no other pieces, the defender can often blockade the enemy pawns on squares his opponent's bishop cannot attack. Even two extra pawns are frequently not enough to win.\n\n" +
              "General rules:\n\n" +
              "- The defender puts his king in front of the pawns on squares of the colour his opponent's bishop does *not* control, and uses his bishop to stop the pawns from the other side.\n" +
              "- Two connected pawns are usually stopped; two pawns **far apart** (three or more files) usually win, because the defending king and bishop cannot cover both.\n" +
              "- With rooks or queens still on the board, the opposite-coloured bishops favour the **attacker**: his bishop attacks squares the defender's bishop can never cover.",
          },
          {
            type: 'board',
            fen: '8/5k2/3b4/5P2/4P1K1/8/4B3/8 w - - 0 1',
            caption: 'Two extra pawns, but a draw: the black bishop controls e5, and the king blocks the light squares f7 and f6. White can never advance safely.',
            highlights: ['e5', 'f6'],
          },
          {
            type: 'text',
            md:
              "### Fortresses\n\n" +
              "A **fortress** is a position where the stronger side cannot make progress even with a large material advantage. Classic examples:\n\n" +
              "- **Wrong rook pawn**: bishop and rook pawn against a lone king is a draw if the bishop does not control the queening square and the defending king reaches the corner.\n" +
              "- **Opposite-coloured bishops** with a blockade.\n" +
              "- **Rook against rook and bishop** with the defending king in the right corner (difficult but often holdable), and many queen against rook and pawn positions.\n\n" +
              "When you are worse, always ask: is there a fortress? Sacrificing material to reach one is a standard defensive technique.",
          },
          {
            type: 'board',
            fen: '7k/8/7P/8/8/8/2B5/6K1 w - - 0 1',
            caption: 'The wrong rook pawn: the queening square h8 is dark, the bishop is light-squared. Black simply keeps his king on h8/g8. A dead draw, despite White\'s extra bishop and pawn.',
            highlights: ['h8'],
          },
        ],
      },
      {
        id: 'l5-knight-endings',
        title: 'Knight endings',
        summary: '"Knight endings are pawn endings": the principles of king activity and passed pawns apply with full force.',
        estMinutes: 10,
        blocks: [
          {
            type: 'text',
            md:
              "Mikhail Botvinnik said that **knight endings are really pawn endings**: the same principles decide them. King activity, the outside passed pawn and tempo play are everything.\n\n" +
              "Important features of knight endings:\n\n" +
              "- **An outside passed pawn is very strong**, because a knight finds it hard to stop a passed pawn on the edge and also defend the other wing.\n" +
              "- **The knight cannot lose a tempo.** It always changes the colour of its square, so zugzwang positions are common.\n" +
              "- **Knights are short-range**: a knight on one wing cannot help on the other quickly. Centralise it.\n" +
              "- **The best blockader of a passed pawn is a knight** placed directly in front of it.\n" +
              "- Trading into a pawn ending is often the simplest winning method — but calculate it first!",
          },
          {
            type: 'board',
            fen: '8/4nppp/3k4/8/P2K4/2N5/5PPP/8 w - - 0 1',
            caption: 'White\'s outside passed a-pawn is a big trump (the engine rates White clearly better): the black king and knight must deal with it, and meanwhile White\'s king can invade on the other wing.',
            highlights: ['a4'],
          },
          {
            type: 'tip',
            title: 'Count the tempi',
            md: "In knight endings, races are common: your pawn promotes, his pawn promotes, who is first? Count carefully, and remember that a knight check can gain a tempo or win a newly promoted queen with a fork.",
          },
        ],
      },
      {
        id: 'l5-zugzwang',
        title: 'Zugzwang, triangulation and corresponding squares',
        summary: 'When the obligation to move is fatal — and how to give the move to your opponent.',
        estMinutes: 18,
        blocks: [
          {
            type: 'text',
            md:
              "**Zugzwang** is a position in which any move worsens your position. It is most common in pawn endings, but appears in every phase of the game.\n\n" +
              "- **Mutual zugzwang**: whoever is to move loses (or draws instead of winning). The opposition is the simplest example.\n" +
              "- **Triangulation**: if the opponent's king can only shuttle between two squares while yours can move around a triangle of three, you can \"lose\" a move and reach the same position with your opponent to move.\n" +
              "- **Corresponding squares**: in complex pawn endings, each square of your king corresponds to a square the defending king must occupy to hold. Working out these pairs tells you exactly how to manoeuvre.",
          },
          {
            type: 'text',
            md:
              "### Lasker – Reichhelm (1901)\n\n" +
              "The most famous corresponding-squares problem. All the pawns are blocked; White wants to win the a5- or d6-pawn by bringing his king to b5 or to c4 at the right moment. Only one first move wins: the king must go *backwards and sideways* to make the black king run out of corresponding squares.",
          },
          {
            type: 'exercise',
            exercise: {
              id: 'l5-zugzwang-ex1',
              prompt: 'Lasker – Reichhelm 1901. White to move and win. Find the only winning first move.',
              fen: '8/k7/3p4/p2P1p2/P2P1P2/8/8/K7 w - - 0 1',
              solution: ['Kb1'],
              hint: 'The black king must always be able to answer your king on the corresponding square. Find the square it cannot match.',
              explanation:
                "1.Kb1! is the only win. White's king heads for b5 (attacking a5) or c4 and then b5/d3–c4 combinations; Black's king must answer each white king move on its corresponding square, and White manoeuvres so that, after a few moves, Black runs out of them. All other first moves, such as 1.Kb2 or 1.Ka2, allow Black to keep the correspondence and draw.",
            },
          },
          {
            type: 'line',
            fen: '8/k7/3p4/p2P1p2/P2P1P2/8/8/K7 w - - 0 1',
            moves: ['Kb1', 'Kb7', 'Kc1', 'Kb8', 'Kc2', 'Kb7', 'Kc3', 'Kc7', 'Kd3', 'Kd8', 'Kc4', 'Ke8', 'Kb5', 'Kd7', 'Kxa5'],
            caption: 'One winning line (engine).',
            notes: {
              1: 'The only winning move.',
              7: 'White\'s king approaches, keeping the correspondence in his favour.',
              11: 'Now the king reaches c4, and b5 cannot be stopped.',
              15: 'The a-pawn falls and the white a-pawn will decide.',
            },
          },
          {
            type: 'tip',
            title: 'Zugzwang in the middlegame',
            md: "Zugzwang is not only an endgame weapon. In closed positions with few active moves, taking away your opponent's last useful moves can force him to weaken himself — see Sämisch – Nimzowitsch, the \"Immortal Zugzwang Game\", in Level 6.",
          },
        ],
      },
    ],
  },

  // ─────────────────────────── 4. CONVERTING AN ADVANTAGE ───────────────────────────
  {
    id: 'l5-convert',
    level: 5,
    title: 'Converting an advantage',
    description: 'How to win won positions: do not hurry, the principle of two weaknesses, simplification and killing counterplay.',
    lessons: [
      {
        id: 'l5-no-hurry',
        title: 'Do not hurry',
        summary: 'In a winning position, improve everything before you act. The opponent can only wait.',
        estMinutes: 10,
        blocks: [
          {
            type: 'text',
            md:
              "Many games are lost from winning positions. The usual cause is impatience: the stronger side tries to force matters, opens the position too early, and gives the opponent counterplay.\n\n" +
              "The Soviet trainer Mikhail Shereshevsky formulated the principle **\"do not hurry\"**: when your opponent has no counterplay, improve your position step by step before taking decisive action.\n\n" +
              "- Put every piece on its best square.\n" +
              "- Bring the king into play.\n" +
              "- Make useful waiting moves to see whether the opponent weakens himself.\n" +
              "- Repeat moves to gain time on the clock (and to reach the time control) — it does not change the position, but it can change your opponent's mood.\n" +
              "- Only then strike, at the moment of your choice.",
          },
          {
            type: 'tip',
            title: 'Capablanca\'s secret',
            md: "Capablanca's games often look effortless because he never allowed counterplay. Before every active move in a winning position, ask: \"What does my opponent want to do? Can I stop it first?\"",
          },
        ],
      },
      {
        id: 'l5-two-weaknesses',
        title: 'The principle of two weaknesses',
        summary: 'One weakness can usually be defended. Create a second one far away, and the defence collapses.',
        estMinutes: 12,
        blocks: [
          {
            type: 'text',
            md:
              "A single weakness — a backward pawn, an isolated pawn, a weak square — can often be defended, because the defender has enough pieces to protect it. The attacker's pieces are tied to attacking it, and the defender's pieces to defending it: no progress.\n\n" +
              "The **principle of two weaknesses** says: create a *second* weakness, preferably on the other side of the board. Now the defender's pieces cannot cover both, and something gives. The switch of attack from one wing to the other is the most typical winning method in technical positions.\n\n" +
              "### A typical plan\n\n" +
              "1. Fix the first weakness and tie the opponent's pieces to it.\n" +
              "2. Open a second front with a pawn break on the other wing (for example g4–g5 or h4–h5 to create a target on the kingside).\n" +
              "3. Use your better mobility — the side with more space can switch wings faster — to attack whichever weakness is less defended.\n" +
              "4. Bring your king to the side where it helps most.",
          },
          {
            type: 'tip',
            title: 'Mobility decides',
            md: "The principle works because switching wings takes time. Before you start, make sure your pieces can reach the second front faster than his.",
          },
        ],
      },
      {
        id: 'l5-technique',
        title: 'Technique: simplify and kill counterplay',
        summary: 'Trade when ahead, trade into endings you have calculated, and stop your opponent\'s only active plan.',
        estMinutes: 12,
        blocks: [
          {
            type: 'text',
            md:
              "When you are material ahead, simplification is your friend: each exchange brings the endgame closer, where an extra pawn counts most. But simplification must be **concrete**: trade the right pieces, and calculate the resulting ending.\n\n" +
              "- Trade pieces, not pawns (pawns are what you win with).\n" +
              "- Trade the opponent's active pieces, keep yours.\n" +
              "- A king and pawn ending is the ultimate simplification — and it can be calculated exactly. If it is winning, go for it.\n" +
              "- Before every move, look for your opponent's counterplay and stop it.",
          },
          {
            type: 'exercise',
            exercise: {
              id: 'l5-technique-ex1',
              prompt: 'White to move. White has an extra outside passed pawn. What is the cleanest way to win?',
              fen: '3r4/4kp1p/6p1/8/P3K3/6P1/5P1P/3R4 w - - 0 1',
              solution: ['Rxd8', 'Kxd8', 'Kd5'],
              hint: 'Rook endings are notoriously drawish. Is the pawn ending winning?',
              explanation:
                "1.Rxd8! Kxd8 2.Kd5! — the king and pawn ending is easily winning: the black king must go to stop the a-pawn, and the white king eats the kingside pawns (or vice versa). With rooks on the board, Black's active rook could cause problems; without them, it is pure calculation. The engine rates the pawn ending as completely winning, but the rook ending only as a modest advantage.",
            },
          },
          {
            type: 'tip',
            title: 'The outside passed pawn',
            md: "In pawn endings, a passed pawn far from the other pawns is a decoy: the defending king must chase it, and your king wins the pawns it leaves behind.",
          },
        ],
      },
    ],
  },

  // ─────────────────────────────── 5. DEFENCE ───────────────────────────────
  {
    id: 'l5-defence',
    level: 5,
    title: 'Defence',
    description: 'Active defence, counterattack, fortresses, swindles and practical resistance.',
    lessons: [
      {
        id: 'l5-active-defence',
        title: 'Active defence and counterattack',
        summary: 'Passive defence usually loses slowly. Look for counterplay, exchanges and the right moment to give material back.',
        estMinutes: 12,
        blocks: [
          {
            type: 'text',
            md:
              "Defending is a skill — many strong players are as proud of their defence as of their attacks. Emanuel Lasker, Tigran Petrosian and Magnus Carlsen are famous for saving \"lost\" positions.\n\n" +
              "### Principles of active defence\n\n" +
              "- **Look for counterplay first.** A counterattack that creates real threats is usually better than passive waiting.\n" +
              "- **Exchange attackers.** Every trade reduces the attacking force; trade the opponent's most dangerous piece.\n" +
              "- **Give back material** at the right moment to break the initiative.\n" +
              "- **Strike in the centre** against a wing attack.\n" +
              "- **Do not create new weaknesses.** Pawn moves in front of your king are usually what the attacker wants.\n" +
              "- **Defend with the king** in the endgame: an active king is the best defender.",
          },
          {
            type: 'tip',
            title: 'Steinitz\'s advice',
            md: "Steinitz taught that a sound position can withstand an attack, so the defender should accept sacrifices when he has calculated that he survives. Psychologically, defenders often panic before the danger is real. Calculate, then decide.",
          },
        ],
      },
      {
        id: 'l5-fortresses',
        title: 'Building fortresses',
        summary: 'When material is lost, look for a position the opponent cannot break.',
        estMinutes: 10,
        blocks: [
          {
            type: 'text',
            md:
              "A **fortress** is a defensive set-up the opponent cannot break, no matter how much material he has. When you are losing, the question is not \"How do I keep material?\" but \"Which position can I hold?\"\n\n" +
              "### Common fortresses\n\n" +
              "- Bishop and **wrong rook pawn** against a king in the corner.\n" +
              "- **Opposite-coloured bishops**: blockade on the colour of your bishop's opponent.\n" +
              "- **Queen against rook and pawn**: with the pawn on its second rank protecting the rook, many positions are drawn.\n" +
              "- **Closed pawn chains** where the attacker has no entry squares for his king.\n\n" +
              "A fortress often requires giving up material — for example sacrificing a piece for the last pawns. Engines sometimes misjudge fortresses; trust the logic of \"can he ever break in?\"",
          },
          {
            type: 'board',
            fen: '7k/8/7P/8/8/8/2B5/6K1 w - - 0 1',
            caption: 'A fortress: the black king can never be driven out of the corner, because the bishop cannot control h8.',
          },
        ],
      },
      {
        id: 'l5-swindles',
        title: 'Swindles and practical resistance',
        summary: 'Stalemate tricks, perpetual check and the art of making a winning position hard to win.',
        estMinutes: 12,
        blocks: [
          {
            type: 'text',
            md:
              "When the position is objectively lost, the game is not over. Strong players save many \"lost\" games through practical resistance:\n\n" +
              "- **Set problems.** Choose moves that require exact answers, even if they are objectively a little worse.\n" +
              "- **Avoid simplification.** Keep pieces on the board — the more there is to calculate, the more chances of an error.\n" +
              "- **Look for perpetual check and stalemate.** These are the classic saving resources, especially when your king has no moves.\n" +
              "- **Use the clock.** If your opponent is short of time, keep the position complicated.\n" +
              "- **Stay calm.** A swindle only works if you are still looking for it.",
          },
          {
            type: 'exercise',
            exercise: {
              id: 'l5-swindle-ex1',
              prompt: 'White to move. Black threatens ...Rh2#, and White is completely lost — unless you find the saving trick.',
              fen: '8/6pk/5p1p/5P2/2Q5/6q1/5r2/7K w - - 0 1',
              solution: ['Qg8+'],
              hint: 'Your king has no legal moves and your f-pawn is blocked. What happens if your queen disappears?',
              explanation:
                "1.Qg8+!! Kxg8 is forced (g6 is covered by the f5-pawn, and h8 by the queen) — and it is **stalemate**: the white king has no legal move and the f5-pawn is blocked. Every other move loses at once to ...Rh2# or a similar mate. Always check whether your king and pawns are immobile: then giving away your last pieces can save the game.",
            },
          },
          {
            type: 'tip',
            title: 'For the stronger side',
            md: "When winning, check for stalemate and perpetual check in every forcing line — especially when the defending king has no moves. The Saavedra position in the calculation module is the classic warning.",
          },
        ],
      },
    ],
  },

  // ─────────────────────────────── 6. PRACTICAL PLAY ───────────────────────────────
  {
    id: 'l5-practical',
    level: 5,
    title: 'Practical play',
    description: 'Time management, decision making under pressure, and when to calculate versus trusting intuition.',
    lessons: [
      {
        id: 'l5-time',
        title: 'Time management',
        summary: 'How to divide your clock in classical, rapid and blitz games — and how to avoid chronic time trouble.',
        estMinutes: 12,
        blocks: [
          {
            type: 'text',
            md:
              "Time is a resource like material. Players who are always in time trouble lose many games they \"should\" have won — not because they do not know enough, but because they spend their time badly.\n\n" +
              "### A time budget for classical games\n\n" +
              "- **Opening**: play the moves you know quickly, but stop and think when your opponent deviates or when you leave your preparation.\n" +
              "- **Early middlegame**: this is where the plan is decided. Spending 15–25 minutes on one key decision is normal.\n" +
              "- **Critical moments**: pawn breaks, sacrifices, exchanges that change the structure, and transitions to the endgame. Think longest here.\n" +
              "- **Obvious moves** (recaptures, only moves): play them quickly.\n" +
              "- **Keep a reserve** of at least 10 minutes for the last moves before the time control.",
          },
          {
            type: 'text',
            md:
              "### Curing chronic time trouble\n\n" +
              "- Use the **comparison method** instead of calculating every line to the end.\n" +
              "- Avoid **perfectionism**: in many positions several moves are equally good. Choose one and move on.\n" +
              "- Do not **re-check** the same line three times. Trust your first careful calculation.\n" +
              "- Play training games with a fixed rule, e.g. \"never more than 10 minutes on a move\".\n" +
              "- In rapid and blitz, rely on patterns and simple, safe moves; save thinking time for the one or two critical moments.",
          },
          {
            type: 'tip',
            title: 'Your opponent is in time trouble?',
            md: "Do not start playing fast yourself. Keep using your own time, keep the position complicated, and avoid giving him simple forced moves. Many players lose winning positions by playing at their opponent's speed.",
          },
        ],
      },
      {
        id: 'l5-pressure',
        title: 'Decision making under pressure',
        summary: 'How to choose a move when you cannot calculate everything — and how to handle critical moments.',
        estMinutes: 10,
        blocks: [
          {
            type: 'text',
            md:
              "In real games you rarely have the time to calculate everything. Strong players make good decisions under uncertainty using a few reliable habits:\n\n" +
              "- **Recognise the critical moment.** When the position is about to change (a pawn break, a sacrifice, an endgame transition), slow down. A useful trigger: your opponent's last move changed the structure, or there are forcing moves available for either side.\n" +
              "- **Evaluate before you calculate.** Know what you want before analysing variations: \"I want to trade queens\", \"I need to open the f-file\". Then check candidate moves that do this.\n" +
              "- **Prefer the safe move when unsure** in a good position; prefer the complicated move in a bad position.\n" +
              "- **Avoid irreversible decisions without a reason**: pawn moves, exchanges and sacrifices cannot be taken back.\n" +
              "- **Breathe.** Under pressure, players skip the blunder check. Make it a ritual.",
          },
          {
            type: 'tip',
            title: 'Risk management',
            md: "Your tournament situation matters. Needing a win, choose positions with imbalances and chances for both sides. When a draw is enough, choose solid structures — but do not play passively: passive play also loses.",
          },
        ],
      },
      {
        id: 'l5-intuition',
        title: 'When to calculate and when to trust intuition',
        summary: 'Intuition is compressed experience. Learn when it is reliable and when it must be checked.',
        estMinutes: 10,
        blocks: [
          {
            type: 'text',
            md:
              "Intuition is not magic. It is pattern recognition built from thousands of positions you have seen, played and analysed. Strong players often know the right move within seconds — and then spend minutes checking that it does not lose to a tactic.\n\n" +
              "### Trust intuition when...\n\n" +
              "- The position is **quiet** and positional: piece placement, plans, pawn structure.\n" +
              "- You have played the **structure** many times before.\n" +
              "- Several moves are roughly equal and the difference is small.\n\n" +
              "### Calculate when...\n\n" +
              "- There are **forcing moves** for either side: checks, captures, threats.\n" +
              "- The kings are exposed or the position is **open and sharp**.\n" +
              "- The decision is **irreversible**: a sacrifice, an exchange into an endgame, a pawn break.\n" +
              "- Your intuition suggests a move that \"looks too good\" — it may be a trap.",
          },
          {
            type: 'tip',
            title: 'Train your intuition',
            md: "Guess-the-move training with annotated master games is the best way to build intuition: cover the moves, choose yours, then compare. Over time your first impression will match the master's choice more and more often.",
          },
        ],
      },
    ],
  },
]
