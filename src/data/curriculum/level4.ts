import type { Module } from '../types.ts'

// Level 4 "Advanced" (1400–1800): positional chess. Pawn structure, piece
// play, squares and space, planning, exchanges and the typical middlegame
// structures. Every exercise has been checked with Stockfish
// (scripts/verify-content.ts).

export const level4: Module[] = [
  // ───────────────────────────── 1. PAWN STRUCTURE ─────────────────────────────
  {
    id: 'l4-pawns',
    level: 4,
    title: 'Pawn structure',
    description:
      'Pawns are the soul of chess. Isolated, doubled, backward, hanging and passed pawns, pawn islands, pawn chains and how to turn a majority into a passed pawn.',
    lessons: [
      {
        id: 'l4-pawns-weak',
        title: 'Isolated, doubled and backward pawns',
        summary: 'The three classic pawn weaknesses: what makes them weak, and when they are strong after all.',
        estMinutes: 16,
        blocks: [
          {
            type: 'text',
            md:
              "\"Pawns are the soul of chess,\" wrote François-André Philidor in 1749. Pieces come and go, but pawns cannot move backwards, so every pawn move changes the position *permanently*. The pawn structure decides where your pieces belong, which squares are weak, and which plans make sense.\n\n" +
              "A pawn is **weak** when it cannot easily be defended by another pawn. Then it must be guarded by pieces, and a piece that guards a pawn is a piece that is not doing anything else. There are three classic weaknesses.",
          },
          {
            type: 'text',
            md:
              "### 1. The isolated pawn\n\n" +
              "A pawn with **no friendly pawns on the neighbouring files** is isolated. The most important case is the isolated queen's pawn (the IQP) on d4 or d5.\n\n" +
              "- **Its weakness:** it can never be defended by a pawn, so in an endgame it is a target.\n" +
              "- **The square in front of it** (d5 for a white pawn on d4) can never be attacked by a pawn either. It is the perfect square for an enemy knight to *blockade* the pawn.\n" +
              "- **Its strength:** it controls e5 and c5 and gives its owner half-open files and free development. In the middlegame the IQP side often attacks.",
          },
          {
            type: 'board',
            fen: 'r1bq1rk1/pp2bppp/2n1pn2/8/3P4/2NB1N2/PP3PPP/R1BQ1RK1 w - - 0 10',
            caption: 'A typical IQP position. White has active pieces and the outpost on e5; Black wants to blockade on d5 and trade pieces.',
            arrows: [['f3', 'e5'], ['d4', 'd5']],
            highlights: ['d4', 'd5'],
          },
          {
            type: 'text',
            md:
              "### 2. Doubled pawns\n\n" +
              "Two pawns of the same colour on one file are **doubled**. The front pawn blocks the back one, the pair cannot defend each other, and in an endgame two doubled pawns are often worth little more than one.\n\n" +
              "But doubled pawns are not always bad. They usually appear after a capture *towards the centre*, which gives you an extra half-open file and more central control. The famous example is the Nimzo-Indian: White accepts doubled c-pawns in exchange for the bishop pair and a strong centre.",
          },
          {
            type: 'line',
            moves: ['d4', 'Nf6', 'c4', 'e6', 'Nc3', 'Bb4', 'a3', 'Bxc3+', 'bxc3'],
            caption: 'The Sämisch Nimzo-Indian: doubled pawns as a fair price.',
            notes: {
              6: 'Black pins the knight and is ready to double White\'s pawns.',
              7: 'White asks the question at once.',
              9: 'White has doubled c-pawns, and the c4-pawn will be a target. In return White has the bishop pair, the half-open b-file and pawns ready for e3–e4. Black will blockade with ...c5, ...b6, ...Ba6 and ...Nc6–a5.',
            },
          },
          {
            type: 'text',
            md:
              "### 3. The backward pawn\n\n" +
              "A pawn is **backward** when its neighbours have advanced and it can no longer move forward safely, because the square in front of it is controlled by an enemy pawn. It is especially weak on a half-open file, where enemy rooks can attack it.\n\n" +
              "The Najdorf and Sveshnikov Sicilians give Black a backward d6-pawn on purpose. The real fight is over the square in front of it: **d5**. If White can plant a piece there for ever, Black suffers; if Black achieves ...d6–d5, the weakness disappears.",
          },
          {
            type: 'line',
            moves: ['e4', 'c5', 'Nf3', 'd6', 'd4', 'cxd4', 'Nxd4', 'Nf6', 'Nc3', 'a6', 'Be2', 'e5', 'Nb3', 'Be7', 'O-O', 'O-O', 'Be3', 'Be6'],
            caption: 'Najdorf Sicilian, 6.Be2 e5: Black accepts a backward d-pawn.',
            notes: {
              12: '6...e5 gains space and kicks the knight, but leaves d6 backward and d5 a hole.',
              16: 'Both sides complete development. White would love a knight on d5; Black wants ...d5.',
              18: 'The bishop covers d5. Black will add ...Nbd7, ...Rc8 and ...Qc7, and play ...d6–d5 as soon as it is safe. Fighting for one square is the whole middlegame.',
            },
          },
          {
            type: 'tip',
            title: 'Rule of thumb: fix, then attack',
            md:
              "A weak pawn is only a target if it cannot run away. First **fix** it (stop it from advancing, ideally with a piece on the square in front), then **attack** it with more pieces than can defend it. Count attackers and defenders exactly, as you would in a tactic.",
          },
          {
            type: 'exercise',
            exercise: {
              id: 'l4-pawns-weak-ex1',
              prompt: 'White to move. Black\'s isolated d5-pawn is attacked three times and defended only twice. Win it in the cleanest way.',
              fen: '3r2k1/pp3ppp/4b1n1/3p4/8/2N1PB2/PP3PPP/3R2K1 w - - 0 1',
              solution: ['Bxd5'],
              hint: 'Count: bishop, knight and rook attack d5; bishop and rook defend it. Which piece should capture first?',
              explanation:
                "1.Bxd5! Bxd5 2.Rxd5 wins a clean pawn, and after 2...Rxd5 3.Nxd5 White has a healthy extra pawn in the endgame. Capture with the *least valuable* attacker first and keep the knight for last. If White hesitates, Black plays ...Ne7 and the pawn is defended three times. 1.Nxd5? is weaker: after 1...Rc8 the knight is loose, the black rook gets active and White wins the pawn with much less effect.",
            },
          },
        ],
      },
      {
        id: 'l4-pawns-hanging',
        title: 'Hanging pawns and pawn islands',
        summary: 'Two pawns side by side without neighbours: a strong centre or a target? And why fewer pawn islands is usually better.',
        estMinutes: 15,
        blocks: [
          {
            type: 'text',
            md:
              "### Hanging pawns\n\n" +
              "**Hanging pawns** are two pawns side by side on half-open files, with no friendly pawns next to them, typically on c5 and d5 (or c4 and d4 for White). They usually arise from an IQP position after a trade on c6 or c3.\n\n" +
              "- **While they stand side by side** they control four central squares (b4, c4, d4, e4 for black pawns on c5/d5) and support active piece play. A well-timed advance of one of them can break open the position.\n" +
              "- **Once one of them advances**, the other becomes backward or isolated, and the square in front of the advanced pawn becomes a perfect blockade square.\n\n" +
              "**How to play against them:** attack them with pieces and pawns (e3–e4 or ...e6–e5 are typical) to *force one of them to advance*, then blockade the advanced pawn and attack the one that is left behind.",
          },
          {
            type: 'text',
            md:
              "### Fischer – Spassky, World Championship game 6, Reykjavik 1972\n\n" +
              "In one of the most admired games of the match, Fischer played 1.c4 for the first time in his career. Spassky ended up with hanging pawns, and Fischer showed the textbook method against them.",
          },
          {
            type: 'line',
            moves: [
              'c4', 'e6', 'Nf3', 'd5', 'd4', 'Nf6', 'Nc3', 'Be7', 'Bg5', 'O-O', 'e3', 'h6', 'Bh4', 'b6', 'cxd5', 'Nxd5',
              'Bxe7', 'Qxe7', 'Nxd5', 'exd5', 'Rc1', 'Be6', 'Qa4', 'c5', 'Qa3', 'Rc8', 'Bb5', 'a6', 'dxc5', 'bxc5',
              'O-O', 'Ra7', 'Be2', 'Nd7', 'Nd4', 'Qf8', 'Nxe6', 'fxe6', 'e4', 'd4', 'f4', 'Qe7', 'e5', 'Rb8',
            ],
            caption: 'Fischer – Spassky 1972, game 6: how to fight hanging pawns.',
            notes: {
              14: 'The Tartakower Defence of the Queen\'s Gambit Declined.',
              24: 'Black challenges d4. After an exchange on c5 he will have hanging pawns.',
              30: 'After 15.dxc5 bxc5 Black has hanging pawns on c5 and d5. They control the centre, but they need protection.',
              37: 'Fischer exchanges Black\'s light-squared bishop, the piece that defended the light squares around the pawns.',
              39: '20.e4! The thematic attack on the hanging pawns. If 20...dxe4, the c5-pawn is isolated and White\'s bishop comes to c4.',
              40: 'Spassky advances. The d4-pawn is passed, but it is firmly blockaded, the c5-pawn is fixed, and e5 and c4 are now White\'s squares.',
              43: 'White has a pawn wedge on e5, a free f-file and the bishop heading for c4 to hit e6. Black\'s pawns, once proud, are frozen.',
            },
          },
          {
            type: 'text',
            md:
              "Fischer continued with Bc4, Qh3 and the pawn break f4–f5, opening the f-file against the black king. The finish was an exchange sacrifice, 38.Rxf6!, and after 41.Qf4 Spassky resigned and joined the audience in applauding.",
          },
          {
            type: 'board',
            fen: '4q2k/2r1r3/4PR1p/p1p5/P1Bp1Q1P/1P6/6P1/6K1 b - - 4 41',
            caption: 'The final position (after 41.Qf4). Black\'s centre pawns c5 and d4 never moved again after move 20, while every white piece joined the attack.',
            highlights: ['c5', 'd4', 'e6'],
          },
          {
            type: 'text',
            md:
              "### Pawn islands\n\n" +
              "A **pawn island** is a group of pawns on adjacent files, separated from the other pawns by at least one empty file. José Raúl Capablanca gave the simple rule: **the side with fewer pawn islands usually has the better structure.** Every island has a weakest pawn at its edge or base, so more islands means more targets to defend, and more holes between them.",
          },
          {
            type: 'board',
            fen: '6k1/p4ppp/2p1p3/8/8/4P3/PP3PPP/6K1 w - - 0 1',
            caption: 'White has two pawn islands (a–b and e–h). Black has three (a, c and e–h). The isolated a7-pawn and the c6-pawn are long-term targets.',
            highlights: ['a7', 'c6'],
          },
          {
            type: 'tip',
            title: 'Think before you capture with a pawn',
            md:
              "Most structural weaknesses are created by a pawn capture: doubled pawns, isolated pawns and extra islands appear when you recapture *away from* the centre or let your structure be broken up. Before each pawn capture ask: how many islands will I have afterwards, and what does my opponent get in return?",
          },
        ],
      },
      {
        id: 'l4-pawns-chains',
        title: 'Pawn chains: attack the base',
        summary: "Nimzowitsch's rule for blocked centres: the base of a pawn chain is its weak point, and the side of the chain tells you where to play.",
        estMinutes: 14,
        blocks: [
          {
            type: 'text',
            md:
              "A **pawn chain** is a diagonal line of pawns, each defending the next: for example White pawns on c3–d4–e5 or d4–e5. The front pawn is the **head**, the rear pawn is the **base**.\n\n" +
              "Aron Nimzowitsch, in *My System* (1925), formulated the two key ideas:\n\n" +
              "1. **Attack the chain at its base.** The base is the only pawn not protected by another pawn. If it falls or is exchanged, the whole chain becomes weak.\n" +
              "2. **Play on the side where your chain points.** A chain pointing towards the kingside gives you more space there, so that is where you attack. Your opponent attacks on the other wing.",
          },
          {
            type: 'line',
            moves: ['e4', 'e6', 'd4', 'd5', 'e5', 'c5', 'c3', 'Nc6', 'Nf3', 'Qb6', 'a3'],
            caption: 'The French Advance: Black attacks the base of White\'s chain.',
            notes: {
              5: 'White builds the chain d4–e5. Its base is d4.',
              6: 'Black strikes at the base at once.',
              7: 'White supports the base with another pawn. Now c3 would become the base if Black exchanges on d4.',
              10: 'Knight, queen and c-pawn all hit d4: the base is under maximum pressure.',
              11: 'A flexible move that prepares b4, gaining space on the queenside. Later Black will also attack the e5-pawn (the next base) with ...f6.',
            },
          },
          {
            type: 'board',
            fen: '6k1/ppp2p1p/3p2p1/3Pp3/2P1P3/8/PP3PPP/6K1 w - - 0 1',
            caption: 'The King\'s Indian chain. White\'s chain c4–d5 points to the queenside, so White plays c4–c5 against the base d6. Black\'s chain d6–e5 points to the kingside, so Black plays ...f7–f5 against the base e4.',
            arrows: [['c4', 'c5'], ['f7', 'f5']],
            highlights: ['d6', 'e4'],
          },
          {
            type: 'text',
            md:
              "### Why the base?\n\n" +
              "Attacking the head of a chain (for example ...f6 against e5) only makes the defender recapture or advance. Attacking the base (...c5 against d4) threatens to remove the pawn that holds everything up. If d4 disappears, e5 is just a lonely advanced pawn that needs piece protection.\n\n" +
              "In practice, strong players attack **both** in turn: first the base, and when the opponent has committed his pieces to its defence, the head. Nimzowitsch called this \"shifting the attack\".",
          },
          {
            type: 'tip',
            title: 'Blocked centre, flank attacks',
            md:
              "When the centre is locked by pawn chains, the game is decided on the wings. Both sides race with pawn storms on the side their chain points to. Speed matters more than material, and a single wasted tempo can decide the game, as we will see in the King's Indian lesson later in this level.",
          },
        ],
      },
      {
        id: 'l4-pawns-passed',
        title: 'Passed pawns and pawn majorities',
        summary: "Passed pawns must be pushed, blockaders must be strong, and a healthy majority is a passed pawn in waiting.",
        estMinutes: 20,
        blocks: [
          {
            type: 'text',
            md:
              "A **passed pawn** has no enemy pawns in front of it or on the neighbouring files. Nothing but pieces can stop it, and every step it takes makes it more dangerous. Nimzowitsch spoke of its \"lust to expand\".\n\n" +
              "- **Passed pawns must be pushed** (an old saying). A passed pawn on the sixth rank ties down whole enemy pieces.\n" +
              "- **Blockade it with a knight.** The best defence is to put a piece directly in front of the pawn. A knight is ideal: it loses none of its power while blockading.\n" +
              "- **Rooks belong behind passed pawns** (Tarrasch's rule): behind your own to push it, behind the enemy pawn to stop it.\n" +
              "- **A protected passed pawn** (defended by another pawn) is a permanent trump, especially in the endgame.",
          },
          {
            type: 'text',
            md:
              "### Pawn majorities\n\n" +
              "If you have more pawns than your opponent on one side of the board, you have a **majority**. A healthy majority can produce a passed pawn by force. Two practical rules:\n\n" +
              "1. **The candidate moves first.** Advance the pawn that has no enemy pawn directly in front of it (the *candidate*), supported by its neighbours.\n" +
              "2. **A queenside majority is a long-term plus** when the kings have castled kingside, because the resulting passed pawn is far from the kings (an *outside passed pawn*). A central majority, on the other hand, can be used for attack in the middlegame.",
          },
          {
            type: 'text',
            md:
              "### Botvinnik – Capablanca, AVRO 1938\n\n" +
              "One of the most famous games ever played. Capablanca gets a queenside majority and even wins a pawn, but Botvinnik's central majority (e- and f-pawns) rolls forward and produces a passed pawn on e6 that decides the game.",
          },
          {
            type: 'line',
            moves: [
              'd4', 'Nf6', 'c4', 'e6', 'Nc3', 'Bb4', 'e3', 'd5', 'a3', 'Bxc3+', 'bxc3', 'c5', 'cxd5', 'exd5', 'Bd3', 'O-O',
              'Ne2', 'b6', 'O-O', 'Ba6', 'Bxa6', 'Nxa6', 'Bb2', 'Qd7', 'a4', 'Rfe8', 'Qd3', 'c4', 'Qc2', 'Nb8',
              'Rae1', 'Nc6', 'Ng3', 'Na5', 'f3', 'Nb3', 'e4', 'Qxa4', 'e5', 'Nd7', 'Qf2', 'g6', 'f4', 'f5',
              'exf6', 'Nxf6', 'f5', 'Rxe1', 'Rxe1', 'Re8', 'Re6', 'Rxe6', 'fxe6', 'Kg7', 'Qf4', 'Qe8', 'Qe5', 'Qe7',
            ],
            caption: 'Botvinnik – Capablanca 1938: the central majority wins the race.',
            notes: {
              11: 'White accepts doubled c-pawns for the bishop pair and a solid pawn centre that supports e3–e4.',
              28: '14...c4 releases the tension. Black gets a queenside majority and the b3 square, but White now has a free hand in the centre: the plan is f3, e4, e5 and f4–f5.',
              36: 'The knight goes to b3, far from the kingside where the game will be decided.',
              38: 'Capablanca wins a pawn. His queenside majority is now two connected passed pawns in the making, but they are very slow.',
              39: 'The central majority rolls. The knight on f6 is driven away from the defence of the king.',
              47: 'f4–f5: the pawns open lines and create a passed pawn.',
              53: 'The e6-pawn is a protected-looking passed pawn deep in Black\'s camp. It ties the black queen to e7 and e8.',
              58: 'Black has blockaded the pawn with the queen. Now find Botvinnik\'s famous shot.',
            },
          },
          {
            type: 'exercise',
            exercise: {
              id: 'l4-pawns-passed-ex1',
              prompt: 'Botvinnik – Capablanca 1938. White to move. The black queen is the only blockader of the e-pawn. Deflect it!',
              fen: '8/p3q1kp/1p2Pnp1/3pQ3/2pP4/1nP3N1/1B4PP/6K1 w - - 5 30',
              solution: ['Ba3', 'Qxa3', 'Nh5+'],
              hint: 'Offer a piece to the queen on a square she cannot refuse. Then use the knight against the f6-knight.',
              explanation:
                "30.Ba3!! attacks the queen and deflects her from the blockade. If 30...Qe8 31.Qc7+ and the e-pawn marches. After 30...Qxa3 31.Nh5+! the knight sacrifice removes the f6-knight, the last guard of e7 and e8: 31...gxh5 32.Qg5+ Kf8 33.Qxf6+ Kg8 34.e7 and the pawn promotes. Capablanca tried a few checks and resigned on move 41. The passed pawn was worth more than a bishop and a knight.",
            },
          },
          {
            type: 'tip',
            title: 'Majority checklist',
            md:
              "- Which majority is healthier (no doubled pawns)?\n" +
              "- Which one is closer to the enemy king (useful for attack) and which one is further away (useful in the endgame)?\n" +
              "- Who is faster? Count the moves needed to create a passed pawn, just as you count tempi in a pawn race.",
          },
        ],
      },
    ],
  },

  // ───────────────────────────── 2. PIECE PLAY ─────────────────────────────
  {
    id: 'l4-pieces',
    level: 4,
    title: 'Piece play',
    description:
      'Good and bad bishops, the bishop pair, knight outposts, rooks on open files and the seventh rank, and the habit of improving your worst piece.',
    lessons: [
      {
        id: 'l4-pieces-bishops',
        title: 'Good bishops, bad bishops and the bishop pair',
        summary: 'A bishop is only as good as the pawns around it. Learn to judge bishops, and why two of them are a long-term asset.',
        estMinutes: 15,
        blocks: [
          {
            type: 'text',
            md:
              "A bishop can only ever visit squares of one colour. That makes it extremely sensitive to the pawn structure.\n\n" +
              "- A **bad bishop** is one whose own central pawns are fixed on squares of its colour. They block its diagonals, and the squares of the other colour (which it can never control) become weak.\n" +
              "- A **good bishop** has its own pawns on the opposite colour, so its diagonals are open and it can attack enemy pawns.\n\n" +
              "The most famous bad bishop in chess is Black's light-squared bishop in the French Defence, locked in behind the pawns on e6 and d5.",
          },
          {
            type: 'board',
            fen: 'r1b1kbnr/pp3ppp/1qn1p3/2ppP3/3P4/P1P2N2/1P3PPP/RNBQKB1R b KQkq - 0 6',
            caption: 'French Advance. The c8-bishop is hemmed in by the pawns on e6 and d5. Black often tries to trade it (...Bd7–b5 or ...b6 and ...Ba6), or frees it with the ...f6 break.',
            highlights: ['c8', 'd5', 'e6'],
          },
          {
            type: 'board',
            fen: '8/8/3kb3/1p1p1p2/1P1P1P2/3BK3/8/8 w - - 0 1',
            caption: 'Good bishop against bad bishop. Black\'s pawns stand on light squares, so his bishop can only defend them. White\'s bishop attacks b5 and f5, and the dark squares (e5, c5) are entry points for the white king.',
            arrows: [['d3', 'b5'], ['d3', 'f5']],
          },
          {
            type: 'tip',
            title: '"Bad" bishops can be useful',
            md:
              "Hungarian grandmaster Mihai Suba put it neatly: *bad bishops protect good pawns.* A \"bad\" bishop that defends its pawn chain can be an excellent defender, and an active bad bishop outside the chain (for example a French bishop on g6 or b5) is not bad at all. Judge a bishop by what it *does*, not by a label.",
          },
          {
            type: 'text',
            md:
              "### The bishop pair\n\n" +
              "Two bishops working together cover squares of both colours, and nothing can hide from them. Wilhelm Steinitz was the first to explain their value. In open positions with pawns on both wings the bishop pair is worth roughly an extra half-pawn.\n\n" +
              "**With the bishops:** open the position (pawn breaks, exchanges of pawns), keep pawns on both wings, and use the bishops to restrict the enemy knights. Often you can give one bishop back at the right moment for a winning endgame.\n\n" +
              "**Against the bishops:** keep the position closed, create fixed outposts for your knights, and try to exchange one of the bishops.",
          },
          {
            type: 'board',
            fen: '2r3k1/pp3ppp/3bpn2/8/8/1P2P3/PB3PPP/2R2BK1 w - - 0 1',
            caption: 'An open position with pawns on both wings: the ideal setting for the bishop pair. The b2-bishop already rakes the long diagonal, and the f1-bishop will come to c4 or b5.',
            arrows: [['b2', 'f6'], ['f1', 'c4']],
          },
        ],
      },
      {
        id: 'l4-pieces-knights',
        title: 'Knight outposts',
        summary: 'A knight on a protected square deep in enemy territory, where no pawn can ever chase it, can be stronger than a rook.',
        estMinutes: 18,
        blocks: [
          {
            type: 'text',
            md:
              "Knights are short-range pieces: they need to be close to the action, and they need stable squares. An **outpost** is a square in or near the enemy camp that\n\n" +
              "1. **cannot be attacked by an enemy pawn** (there are no enemy pawns on the neighbouring files that could advance to hit it), and\n" +
              "2. **is protected by one of your own pawns** (or at least by a piece).\n\n" +
              "A knight on such a square, ideally on the fifth or sixth rank, attacks eight squares in the enemy position and can only be removed by exchanging a piece for it. Tarrasch's advice: \"A knight on the sixth rank is a bone in the throat.\"",
          },
          {
            type: 'text',
            md:
              "### Kasparov – Karpov, World Championship game 16, Moscow 1985\n\n" +
              "Kasparov (Black) sacrificed a pawn in the opening to plant a knight on d3. It stayed there for 18 moves, paralysing White's whole position. Commentators called it \"the octopus\".",
          },
          {
            type: 'line',
            moves: [
              'e4', 'c5', 'Nf3', 'e6', 'd4', 'cxd4', 'Nxd4', 'Nc6', 'Nb5', 'd6', 'c4', 'Nf6', 'N1c3', 'a6', 'Na3', 'd5',
              'cxd5', 'exd5', 'exd5', 'Nb4', 'Be2', 'Bc5', 'O-O', 'O-O', 'Bf3', 'Bf5', 'Bg5', 'Re8', 'Qd2', 'b5',
              'Rad1', 'Nd3', 'Nab1',
            ],
            caption: 'Kasparov – Karpov 1985, game 16: the octopus on d3.',
            notes: {
              16: '8...d5!? A prepared pawn sacrifice. Black gets fast development in return.',
              19: 'White has won a pawn, but his knight on a3 is far from the centre.',
              20: 'The knight sets off for d3.',
              30: '15...b5 takes the c4 square away from White\'s knight and prepares ...b4.',
              32: '16...Nd3! The knight is protected by the f5-bishop and can never be attacked by a pawn. It controls b2, c1, e1, f2 and f4, and cuts White\'s position in half.',
              33: 'The a3-knight retreats to b1 to find a route back into the game. White\'s pieces are tripping over each other.',
            },
          },
          {
            type: 'board',
            fen: 'r2qr1k1/5ppp/p4n2/1pbP1bB1/8/2Nn1B2/PP1Q1PPP/1N1R1RK1 b - - 3 17',
            caption: 'The octopus. White is a pawn up, but the knight on d3 is the strongest piece on the board. No white pawn can ever attack it, and White has no minor piece that can easily trade itself for it.',
            highlights: ['d3'],
            arrows: [['f5', 'd3']],
          },
          {
            type: 'text',
            md:
              "Karpov never found a way to remove the knight. On move 34, having finally captured it, he walked into a combination. Black's pieces, coordinated around the d3-square, struck at once.",
          },
          {
            type: 'exercise',
            exercise: {
              id: 'l4-pieces-knights-ex1',
              prompt: 'Kasparov – Karpov 1985. White has just captured the knight with 34.Qxd3. Black to move and win.',
              fen: '2r1r3/5pk1/6bp/8/Np1qnRP1/1P1Q2P1/6BP/1N1R3K b - - 0 34',
              solution: ['Nf2+', 'Rxf2', 'Bxd3'],
              hint: 'A knight check uncovers an attack on the white queen.',
              explanation:
                "34...Nf2+! is a discovered attack: the knight gives check, and the g6-bishop now attacks the queen on d3. After 35.Rxf2 Bxd3 Black has won the queen for a knight. Karpov played on, but resigned after 40...Re1+. The whole game was won by one outpost.",
            },
          },
          {
            type: 'tip',
            title: 'Rules of thumb for knights',
            md:
              "- Knights need **support points**: look for holes in the opponent's pawn structure (squares no pawn can attack) and plan a route there, even if it takes three or four moves.\n" +
              "- **A knight on the rim is dim**: on the edge it controls only half as many squares.\n" +
              "- A knight on an outpost often deserves a rook: giving the exchange to remove such a knight is a common positional sacrifice.",
          },
        ],
      },
      {
        id: 'l4-pieces-rooks',
        title: 'Rooks on open files and the seventh rank',
        summary: 'Rooks need open lines. Seize the open file, double on it, and break through to the seventh rank.',
        estMinutes: 16,
        blocks: [
          {
            type: 'text',
            md:
              "Rooks are the last pieces to get into play, because they need **open lines**.\n\n" +
              "- An **open file** has no pawns on it. The first player to occupy it with a rook (and to double rooks there) usually controls it.\n" +
              "- A **half-open file** has only enemy pawns on it. A rook there puts pressure on the pawn at the end of the file (think of the rook on c1 against a Sicilian, or the minority attack on the b-file).\n" +
              "- The point of controlling a file is to **enter the enemy position**, usually on the seventh rank (the second rank for Black).\n\n" +
              "Nimzowitsch: *the goal of every operation on a file is the eventual occupation of the seventh or eighth rank.*",
          },
          {
            type: 'text',
            md:
              "### Alekhine – Nimzowitsch, San Remo 1930\n\n" +
              "In one of the most crushing wins of his career, Alekhine gained space on the queenside, opened the c-file and lined up his queen and both rooks on it. A battery of two rooks with the queen *behind* them is still called **Alekhine's gun**.",
          },
          {
            type: 'line',
            moves: [
              'e4', 'e6', 'd4', 'd5', 'Nc3', 'Bb4', 'e5', 'c5', 'Bd2', 'Ne7', 'Nb5', 'Bxd2+', 'Qxd2', 'O-O', 'c3', 'b6',
              'f4', 'Ba6', 'Nf3', 'Qd7', 'a4', 'Nbc6', 'b4', 'cxb4', 'cxb4', 'Bb7', 'Nd6', 'f5', 'a5', 'Nc8', 'Nxb7', 'Qxb7',
              'a6', 'Qf7', 'Bb5', 'N8e7', 'O-O', 'h6', 'Rfc1', 'Rfc8', 'Rc2', 'Qe8', 'Rac1', 'Rab8', 'Qe3', 'Rc7', 'Rc3', 'Qd7',
              'R1c2', 'Kf8', 'Qc1', 'Rbc8', 'Ba4', 'b5', 'Bxb5', 'Ke8', 'Ba4', 'Kd8', 'h4',
            ],
            caption: 'Alekhine – Nimzowitsch 1930: Alekhine\'s gun on the c-file.',
            notes: {
              25: 'The c-file is open. Whoever controls it controls the game.',
              33: 'The a6-pawn fixes the b7-square and cramps Black for ever.',
              39: 'The rooks head for the open file.',
              49: 'Two rooks on the c-file...',
              51: '...and the queen behind them: Alekhine\'s gun. White has three heavy pieces on the file against Black\'s two rooks.',
              59: 'Black has no useful move left. His pieces are tied to the defence of c6 and c7, and White threatens to undermine the c6-knight with b4–b5. Nimzowitsch resigned.',
            },
          },
          {
            type: 'board',
            fen: '2rk4/p1rqn1p1/P1n1p2p/3pPp2/BP1P1P1P/2R2N2/2R3P1/2Q3K1 b - - 0 30',
            caption: 'The final position. Every black piece is pinned or tied down; White controls the only open file completely.',
            arrows: [['c1', 'c3'], ['c3', 'c6']],
          },
          {
            type: 'text',
            md:
              "### The seventh rank\n\n" +
              "A rook on the seventh rank attacks pawns that are still on their starting squares, **from the side**, where they cannot defend each other. It also cuts off the enemy king on the back rank. Two rooks on the seventh (\"pigs on the seventh\") often win outright or force perpetual check.",
          },
          {
            type: 'exercise',
            exercise: {
              id: 'l4-pieces-rooks-ex1',
              prompt: 'White to move. Material is equal, but White\'s rook has reached the seventh rank. Cash in.',
              fen: '1r3rk1/p2R1ppp/1p6/8/8/8/PP3PPP/2R3K1 w - - 0 1',
              solution: ['Rxa7'],
              hint: 'Which black pawn on the seventh rank is undefended?',
              explanation:
                "1.Rxa7! wins a pawn, and the rook stays on the seventh rank. Black cannot defend pawns on their original squares against a rook attacking from the side. Next White doubles with Rc7, and Black's rooks are reduced to passive defence. Typical slow moves like 1.g3 allow ...a5 or ...Rbd8, and the chance is gone.",
            },
          },
        ],
      },
      {
        id: 'l4-pieces-worst',
        title: 'Improving your worst piece',
        summary: 'When there is nothing to calculate, find your least active piece and give it a job.',
        estMinutes: 12,
        blocks: [
          {
            type: 'text',
            md:
              "In quiet positions many players do not know what to do and make aimless moves. Strong players have a simple method: **find your worst piece and improve it.**\n\n" +
              "Siegbert Tarrasch said: *\"If one piece stands badly, the whole game stands badly.\"* A position is like a team: the weakest member decides its strength. A single knight stuck on the rim, a bishop biting on its own pawns or a rook that has never moved can cost you the game.",
          },
          {
            type: 'text',
            md:
              "### How to find the worst piece\n\n" +
              "1. Look at each of your pieces and ask: **what is it doing?** Does it attack anything, defend anything important, control key squares?\n" +
              "2. Find the piece with the least useful job.\n" +
              "3. Find a better square for it, one with a future: an outpost, an open file, a long diagonal, a square near the action.\n" +
              "4. Find the **route** there. It may take three or four moves; in a quiet position that is fine.",
          },
          {
            type: 'line',
            moves: [
              'e4', 'e5', 'Nf3', 'Nc6', 'Bb5', 'a6', 'Ba4', 'Nf6', 'O-O', 'Be7', 'Re1', 'b5', 'Bb3', 'd6', 'c3', 'O-O',
              'h3', 'Na5', 'Bc2', 'c5', 'd4', 'Qc7', 'Nbd2', 'Nc6', 'd5', 'Nd8', 'a4', 'Rb8', 'axb5', 'axb5', 'b4', 'Nb7',
              'Nf1', 'Bd7', 'Be3', 'Ra8', 'Qd2', 'Rfc8', 'Bd3', 'g6', 'Ng3',
            ],
            caption: 'The Closed Ruy Lopez: two knights, two journeys.',
            notes: {
              23: 'The b1-knight starts the famous Spanish manoeuvre: Nb1–d2–f1–g3 (or e3).',
              25: 'The centre is closed. Black\'s knight has to find a new route.',
              32: 'Black\'s knight has gone a5–c6–d8–b7: it is safe, but it does very little on b7.',
              33: 'White\'s knight continues to f1...',
              41: '...and arrives on g3, eyeing f5 and h5. White\'s worst piece has become a useful attacker, while Black\'s knight on b7 is still looking for a job.',
            },
          },
          {
            type: 'tip',
            title: 'Typical improvements',
            md:
              "- A knight on the rim heads for an outpost (Na3–c2–e3–d5 is a classic route).\n" +
              "- A bad bishop gets outside its pawn chain or is exchanged for an enemy good piece.\n" +
              "- A passive rook is lifted (Ra1–a3–g3) or moved to an open file.\n" +
              "- The king becomes a fighting piece in the endgame: centralise it.",
          },
          {
            type: 'text',
            md:
              "Anatoly Karpov was the great master of this style. He seemed to do \"nothing\" for many moves, yet each move improved a piece slightly, until the opponent's position collapsed without any obvious mistake. Compare your pieces with your opponent's: if all of yours have better squares, the tactics will come by themselves.",
          },
        ],
      },
    ],
  },

  // ───────────────────────────── 3. SQUARES AND SPACE ─────────────────────────────
  {
    id: 'l4-squares',
    level: 4,
    title: 'Squares and space',
    description:
      'Weak squares and holes, colour complexes, the space advantage and how to free a cramped position.',
    lessons: [
      {
        id: 'l4-squares-holes',
        title: 'Weak squares and holes',
        summary: 'Pawns cannot move backwards, so every pawn move gives up control of some squares for ever. Those squares become homes for enemy pieces.',
        estMinutes: 16,
        blocks: [
          {
            type: 'text',
            md:
              "A **weak square** is a square that can no longer be defended by a pawn. When it lies in your half of the board, near your king or in front of your pawns, it is called a **hole**, and an enemy piece that lands there can only be removed by exchanging it.\n\n" +
              "Holes are created by pawn moves. A pawn controls two squares diagonally in front of it; when it advances, those squares lose their protection *permanently*, because pawns cannot move back. That is the deep meaning of the old advice not to push pawns without a reason.",
          },
          {
            type: 'text',
            md:
              "### Typical holes\n\n" +
              "- **d5 in the Sicilian** after ...e5: the square in front of the backward d6-pawn.\n" +
              "- **e6 or e3** when both the d- and f-pawns have advanced (the Stonewall and Dutch structures).\n" +
              "- **f6/h6 and f3/h3** after a fianchetto when the g-pawn has moved and the bishop has been exchanged.\n" +
              "- **The square in front of an isolated pawn** (d5 against an IQP on d4).",
          },
          {
            type: 'line',
            moves: ['e4', 'c5', 'Nf3', 'Nc6', 'd4', 'cxd4', 'Nxd4', 'Nf6', 'Nc3', 'e5', 'Ndb5', 'd6', 'Bg5', 'a6', 'Na3', 'b5', 'Bxf6', 'gxf6', 'Nd5', 'f5'],
            caption: 'The Sveshnikov Sicilian: holes for activity.',
            notes: {
              10: '5...e5 gains time against the knight but gives up control of d5 for ever. The d6-pawn is backward and d5 is a hole.',
              17: 'White exchanges the f6-knight, the best defender of d5.',
              19: 'The knight lands on the hole. It can be exchanged, but never chased away by a pawn.',
              20: 'Black accepts more holes (f5 and d5), but gets the bishop pair and attacks White\'s centre with ...f5. Holes are a price to be paid, not a death sentence: Black must get enough activity in return.',
            },
          },
          {
            type: 'tip',
            title: 'Before every pawn move',
            md:
              "Ask: *which squares does this pawn stop guarding, and can an enemy piece reach them?* If the answer is \"yes, a knight can get there in two moves\", think twice. Good players create holes only when they get something concrete in return.",
          },
          {
            type: 'board',
            fen: '2rq1rk1/pp2b2p/6p1/3p1pNn/3P4/2PB4/PP1Q2PP/4RRK1 w - - 0 1',
            caption: 'Black\'s pawns on d5 and f5 and the missing light-squared bishop have left a hole on e6. Black\'s bishop on e7 now attacks the knight on g5.',
            highlights: ['e6'],
            arrows: [['e7', 'g5']],
          },
          {
            type: 'exercise',
            exercise: {
              id: 'l4-squares-holes-ex1',
              prompt: 'White to move. The knight on g5 is attacked. Where should it go?',
              fen: '2rq1rk1/pp2b2p/6p1/3p1pNn/3P4/2PB4/PP1Q2PP/4RRK1 w - - 0 1',
              solution: ['Ne6'],
              hint: 'Use the hole. Which squares does a knight attack from there?',
              explanation:
                "1.Ne6! jumps into the hole with tempo. From e6 the knight forks the queen on d8 and the rook on f8 (and eyes c7 and g7), and no black pawn or bishop can ever attack it. Black must save the queen, and White wins the exchange with Nxf8. A retreat like 1.Nf3 would leave the position roughly equal.",
            },
          },
        ],
      },
      {
        id: 'l4-squares-colours',
        title: 'Colour complexes',
        summary: 'When your pawns and your remaining bishop live on the same colour, the squares of the other colour can collapse all at once.',
        estMinutes: 14,
        blocks: [
          {
            type: 'text',
            md:
              "Sometimes it is not one square that is weak but a whole group of squares of the same colour: a **colour complex**. It happens when\n\n" +
              "1. your pawns stand on squares of one colour, so they do not guard the other colour, **and**\n" +
              "2. the bishop that could have guarded the other colour has been exchanged.\n\n" +
              "The classic case is a fianchetto with ...g6 after the g7-bishop has gone: f6, g7 and h6 are dark squares that no black pawn or bishop can protect. An enemy queen, bishop or knight can then settle on them and the king is in mortal danger.",
          },
          {
            type: 'text',
            md:
              "This is why in the Dragon and the King's Indian White so often plays Be3, Qd2 and Bh6 to **exchange the fianchetto bishop**: without it, the dark squares around Black's king are a highway for the white queen. The defender, in turn, should avoid that exchange (...Bh8 or ...Re8–f8 ideas), or keep a knight near the king to cover the weak squares.",
          },
          {
            type: 'board',
            fen: '2qrr1k1/ppp2p1p/3p1Bp1/8/4P3/8/PPPQ1PPP/R5K1 w - - 0 1',
            caption: 'Black is an exchange up, but his dark squares are a disaster. The white bishop on f6 cannot be challenged, and the queen is one move from h6.',
            highlights: ['f6', 'g7', 'h6', 'h8'],
            arrows: [['d2', 'h6']],
          },
          {
            type: 'exercise',
            exercise: {
              id: 'l4-squares-colours-ex1',
              prompt: 'White to move and mate in 2. Use the dark squares.',
              fen: '2qrr1k1/ppp2p1p/3p1Bp1/8/4P3/8/PPPQ1PPP/R5K1 w - - 0 1',
              goal: 'mate',
              solution: ['Qh6', 'g5', 'Qg7#'],
              hint: 'The bishop already controls g7 and h8. The queen needs one dark square next to the king.',
              explanation:
                "1.Qh6! threatens Qg7#, and there is no defence: no black piece can reach g7, f8 is covered by the queen and h8 by the bishop. After any move, 2.Qg7# follows. Material does not matter when a whole colour complex around the king is in enemy hands.",
            },
          },
          {
            type: 'tip',
            title: 'Fighting for a colour',
            md:
              "- If you have a bad bishop, try to **exchange it for your opponent's good bishop** of the same colour.\n" +
              "- If your opponent's weak squares are dark, put **your** pawns on light squares so they do not get in the way of your pieces on the dark squares.\n" +
              "- Knights are great at exploiting colour complexes: they can sit on weak squares of either colour.\n" +
              "- Tigran Petrosian, the great defender, would often give up material just to keep the colour complex around his king under control.",
          },
        ],
      },
      {
        id: 'l4-squares-space',
        title: 'Space: using it and freeing yourself',
        summary: 'More space means more room for your pieces. Learn to squeeze with a space advantage, and how the cramped side breaks free.',
        estMinutes: 18,
        blocks: [
          {
            type: 'text',
            md:
              "**Space** is the territory behind your pawns that your pieces can use. Pawns on your fifth rank (fourth for Black) mean a space advantage. Its benefits:\n\n" +
              "- Your pieces can manoeuvre easily from one wing to the other.\n" +
              "- The opponent's pieces get in each other's way and cannot all find good squares.\n" +
              "- You can prepare an attack behind your pawns while the opponent can only wait.\n\n" +
              "Two rules about space, both from Siegbert Tarrasch:\n\n" +
              "1. **The side with more space should avoid exchanges.** Fewer pieces need less room.\n" +
              "2. **The cramped side should exchange pieces** and look for a **freeing pawn break**.",
          },
          {
            type: 'text',
            md:
              "### Sämisch – Nimzowitsch, Copenhagen 1923: the \"Immortal Zugzwang Game\"\n\n" +
              "Nimzowitsch (Black) gains space on both wings, drives White's pieces back, and ends the game with a quiet pawn move, after which White has no useful move at all.",
          },
          {
            type: 'line',
            moves: [
              'd4', 'Nf6', 'c4', 'e6', 'Nf3', 'b6', 'g3', 'Bb7', 'Bg2', 'Be7', 'Nc3', 'O-O', 'O-O', 'd5', 'Ne5', 'c6',
              'cxd5', 'cxd5', 'Bf4', 'a6', 'Rc1', 'b5', 'Qb3', 'Nc6', 'Nxc6', 'Bxc6', 'h3', 'Qd7', 'Kh2', 'Nh5', 'Bd2', 'f5',
              'Qd1', 'b4', 'Nb1', 'Bb5', 'Rg1', 'Bd6', 'e4', 'fxe4', 'Qxh5', 'Rxf2', 'Qg5', 'Raf8', 'Kh1', 'R8f5', 'Qe3', 'Bd3',
              'Rce1', 'h6',
            ],
            caption: 'Sämisch – Nimzowitsch 1923: space, then zugzwang.',
            notes: {
              22: 'Black gains space on the queenside.',
              32: '...f5 grabs space on the kingside as well and stops e2–e4.',
              34: '...b4 drives the knight back to b1, its worst square.',
              36: 'The bishop is heading for d3, in the heart of White\'s position.',
              39: 'White tries to break free, but opening lines only helps the better-placed pieces.',
              42: 'Black has given a knight for two pawns and a rook on the seventh rank.',
              48: 'The bishop on d3 freezes White\'s queenside: the knight on b1, the rook and the bishop on d2 are all tied up.',
              50: 'A quiet waiting move. White has no useful move left: every move loses material or worsens the position. Sämisch resigned.',
            },
          },
          {
            type: 'board',
            fen: '6k1/3q2p1/p2bp2p/3p1r2/1p1Pp3/3bQ1PP/PP1B1rB1/1N2R1RK w - - 0 26',
            caption: 'The final position. White to move, and almost every move loses material. Notice how little room White\'s pieces have compared with Black\'s.',
          },
          {
            type: 'text',
            md:
              "### Freeing a cramped position\n\n" +
              "If you are the cramped side, do not just wait. Use Tarrasch's second rule: **trade pieces**, then **break with a pawn** to gain room. In the Queen's Gambit Declined, Black's freeing breaks are ...c5 and ...e5. José Raúl Capablanca's freeing manoeuvre is the model.",
          },
          {
            type: 'line',
            moves: ['d4', 'd5', 'c4', 'e6', 'Nc3', 'Nf6', 'Bg5', 'Be7', 'e3', 'O-O', 'Nf3', 'Nbd7', 'Rc1', 'c6', 'Bd3', 'dxc4', 'Bxc4', 'Nd5', 'Bxe7', 'Qxe7', 'O-O', 'Nxc3', 'Rxc3', 'e5'],
            caption: "Capablanca's freeing manoeuvre in the Queen's Gambit Declined.",
            notes: {
              14: "Black's position is solid but cramped. The c8-bishop is shut in by the pawn on e6.",
              16: 'Black waits until White has moved the bishop to d3, then captures on c4 to win a tempo.',
              18: 'The knight offers exchanges. Every trade gives Black\'s remaining pieces more room.',
              22: 'Two pairs of minor pieces have gone.',
              24: 'The freeing break. After ...exd4 or dxe5, the c8-bishop will finally see daylight, and Black is fully equal.',
            },
          },
          {
            type: 'tip',
            title: 'Space can be overextended',
            md:
              "Advanced pawns gain space, but they can also become targets, and they leave holes behind them. A space advantage is only useful if your pieces can use the room behind the pawns. Hypermodern players like Réti and Nimzowitsch deliberately *let* their opponents build a big centre, in order to attack it later.",
          },
        ],
      },
    ],
  },

  // ───────────────────────────── 4. PLANNING AND EVALUATION ─────────────────────────────
  {
    id: 'l4-plan',
    level: 4,
    title: 'Planning and evaluation',
    description:
      'How to read a position like a master: imbalances, a step-by-step evaluation, forming a plan, and prophylaxis — asking what your opponent wants.',
    lessons: [
      {
        id: 'l4-plan-imbalances',
        title: 'Imbalances: what is different?',
        summary: "Jeremy Silman's method: list the differences between the two positions, then play where your differences are strongest.",
        estMinutes: 15,
        blocks: [
          {
            type: 'text',
            md:
              "When there is no tactic on the board, many players drift. American IM Jeremy Silman (*How to Reassess Your Chess*) offers a cure: look for the **imbalances**, the differences between White's position and Black's. Every plan grows out of them.\n\n" +
              "### The main imbalances\n\n" +
              "1. **Minor pieces**: bishop against knight, good against bad bishop, the bishop pair.\n" +
              "2. **Pawn structure**: weak, isolated, doubled, backward and passed pawns, majorities.\n" +
              "3. **Space**: who has more room behind his pawns?\n" +
              "4. **Material**: who is ahead, and is it a useful extra pawn or a weak one?\n" +
              "5. **Files**: who controls the open and half-open files?\n" +
              "6. **Squares**: holes and outposts, colour complexes.\n" +
              "7. **Development**: who has more pieces in play?\n" +
              "8. **Initiative**: who is making threats, who is reacting?\n" +
              "9. **King safety**: whose king is easier to attack?",
          },
          {
            type: 'text',
            md:
              "### Static and dynamic\n\n" +
              "Some imbalances are **static** (long-lasting): pawn structure, material, a bad bishop, a permanent hole. Others are **dynamic** (temporary): a lead in development, the initiative, an exposed king that may soon reach safety.\n\n" +
              "- If your advantages are **dynamic**, act *now*: open lines, attack, and do not allow the opponent time to consolidate. Steinitz: *the side with the advantage is obliged to attack, or the advantage will disappear.*\n" +
              "- If your advantages are **static**, you can be patient: avoid complications, trade when it helps, and let the long-term trumps tell.",
          },
          {
            type: 'board',
            fen: 'r3r1k1/p2q1ppp/np3n2/3p4/P1pP4/2PQP3/1B2NPPP/R4RK1 w - - 0 15',
            caption: 'Botvinnik – Capablanca 1938 after 14...c4. Black: queenside majority, the b3 square, a good knight route. White: a central majority (d-, e- and f-pawns) ready to roll with f3 and e4, and the bishop on b2 waiting for the centre to open.',
            arrows: [['f2', 'f3'], ['e3', 'e4'], ['a6', 'b8']],
          },
          {
            type: 'text',
            md:
              "In this position (from the game we studied in the pawn-structure module) the imbalances tell both players what to do. Black's trumps are on the queenside, so Capablanca brought his knight to b3 and won the a4-pawn. White's trumps are in the centre and near Black's king, so Botvinnik played f3, e4, e5 and f4–f5. Botvinnik's trumps were closer to the king, and his attack came first.",
          },
          {
            type: 'tip',
            title: 'Play where you are strong',
            md:
              "After listing the imbalances, ask: *which ones favour me, and on which part of the board do they matter?* Play there. Avoid playing on the side where your opponent's trumps are; there you can only react. A good plan makes your imbalances more important and your opponent's less important.",
          },
        ],
      },
      {
        id: 'l4-plan-evaluate',
        title: 'Evaluating a position and forming a plan',
        summary: 'A practical checklist for judging a position, and how to turn the evaluation into a plan of a few concrete steps.',
        estMinutes: 16,
        blocks: [
          {
            type: 'text',
            md:
              "Savielly Tartakower: *\"Tactics is knowing what to do when there is something to do. Strategy is knowing what to do when there is nothing to do.\"* Strategy starts with an honest evaluation.\n\n" +
              "### The evaluation checklist\n\n" +
              "1. **Threats first.** Does either side have a tactic or a direct threat? If yes, that comes before any strategy.\n" +
              "2. **Material.** Count it.\n" +
              "3. **King safety.** Which king has fewer defenders and more open lines nearby?\n" +
              "4. **Piece activity.** Compare the pieces one by one. Who has the worst piece on the board?\n" +
              "5. **Pawn structure.** Weaknesses, targets, passed pawns, majorities, holes.\n" +
              "6. **Space and the centre.**\n\n" +
              "Then sum up in one sentence: *\"White is slightly better because of the weak d5-pawn and the better bishop\"*. That sentence already contains your plan.",
          },
          {
            type: 'text',
            md:
              "### From evaluation to plan\n\n" +
              "1. **Choose a target**: a weak pawn, a weak square, the enemy king, or a favourable endgame.\n" +
              "2. **Imagine the ideal set-up**: where would your pieces stand if you could put them anywhere? Knight on the outpost, rooks on the open file, bishop on the long diagonal.\n" +
              "3. **Work out the moves** to get there, starting with the worst-placed piece.\n" +
              "4. **Check the opponent's counterplay** at every step (prophylaxis, see the next lesson).\n\n" +
              "A plan is not a fixed sequence of moves. It is a direction. If the opponent changes the position (a pawn break, an exchange), evaluate again.",
          },
          {
            type: 'text',
            md:
              "### The principle of two weaknesses\n\n" +
              "One weakness can usually be defended: the defender simply puts enough pieces around it. The winning method, perfected by Capablanca and Karpov, is to **create a second weakness on the other side of the board**. The defender's pieces cannot be in two places at once, and sooner or later one of the weaknesses falls.",
          },
          {
            type: 'board',
            fen: '6k1/1r3ppp/pr6/1p6/1P6/P7/2R2PPP/2R3K1 w - - 0 1',
            caption: 'White controls the c-file and Black\'s a6-pawn is weak, but Black\'s rooks can defend it. The plan: exchange a pair of rooks, bring the king to the queenside, and then advance on the kingside with g4–g5 or h4–h5 to create a second target.',
            highlights: ['a6'],
            arrows: [['c2', 'c7'], ['g1', 'f1']],
          },
          {
            type: 'tip',
            title: 'Do not rush',
            md:
              "Once your opponent has no counterplay, you are allowed to take your time. Strong players often make a few \"useless\" improving moves (a king step, a pawn move that takes away a square) before the decisive break, simply because there is no need to hurry. As the Soviet trainers used to say: *do not hurry* when the opponent has nothing to do.",
          },
        ],
      },
      {
        id: 'l4-plan-prophylaxis',
        title: 'Prophylaxis: what does my opponent want?',
        summary: 'The question that separates strong players from the rest. Stop the opponent\'s plan before it starts.',
        estMinutes: 15,
        blocks: [
          {
            type: 'text',
            md:
              "Most players think only about their own ideas. **Prophylaxis** (a word Nimzowitsch borrowed from medicine) means preventing the opponent's ideas *before* they become threats.\n\n" +
              "Mark Dvoretsky, the great trainer, said that the habit of asking **\"What does my opponent want to do?\"** after every move is the single most important difference between a strong player and an average one. Tigran Petrosian and Anatoly Karpov built their whole style on it: their opponents often lost without understanding where they went wrong, because their plans simply never worked.",
          },
          {
            type: 'text',
            md:
              "### Three kinds of prophylaxis\n\n" +
              "1. **Stopping a threat**: the simplest kind, and every tactic lesson already taught it.\n" +
              "2. **Stopping a plan**: preventing a manoeuvre, a pawn break or an exchange that the opponent wants. For example, preventing ...d5 in a Sicilian or ...f5 in a King's Indian.\n" +
              "3. **Pre-empting tactics**: taking away squares (a luft for the king, a square for an enemy knight) before they become a problem.",
          },
          {
            type: 'line',
            moves: ['e4', 'e5', 'Nf3', 'Nc6', 'Bb5', 'a6', 'Ba4', 'Nf6', 'O-O', 'Be7', 'Re1', 'b5', 'Bb3', 'd6', 'c3', 'O-O', 'h3', 'Na5', 'Bc2', 'c5', 'd4'],
            caption: 'Prophylaxis in the Closed Ruy Lopez.',
            notes: {
              15: 'c3 prepares d4, and also gives the bishop a retreat square on c2 in case Black hunts it with ...Na5.',
              17: '9.h3! is the classic prophylactic move. White wants to play d4, and then ...Bg4 pinning the knight would increase the pressure on d4. So White takes g4 away first.',
              18: 'Black goes after the bishop.',
              19: 'Thanks to c3, the bishop has a safe home.',
              21: 'Only now does White play the central break, with everything prepared and no ...Bg4 possible.',
            },
          },
          {
            type: 'text',
            md:
              "The Najdorf move 5...a6 is prophylaxis too: it stops Nb5 and Bb5+ before they happen, and prepares ...b5 or ...e5 without allowing White's pieces to use b5.",
          },
          {
            type: 'board',
            fen: 'rnbqkb1r/1p2pppp/p2p1n2/8/3NP3/2N5/PPP2PPP/R1BQKB1R w KQkq - 0 6',
            caption: 'The Najdorf: 5...a6 takes the b5 square away from White\'s knight and bishop.',
            highlights: ['b5'],
            arrows: [['a6', 'b5']],
          },
          {
            type: 'tip',
            title: 'A thinking habit',
            md:
              "After your opponent moves, ask three questions:\n\n" +
              "1. What does this move threaten?\n" +
              "2. What does it *prepare* — what would he play next if it were his move again?\n" +
              "3. What has it given up — which squares or pieces are no longer defended?\n\n" +
              "If the answer to question 2 is dangerous, the best move is often the one that stops it, even if it looks modest.",
          },
        ],
      },
    ],
  },

  // ───────────────────────────── 5. EXCHANGES ─────────────────────────────
  {
    id: 'l4-trades',
    level: 4,
    title: 'The art of exchanging',
    description:
      'Every exchange changes the character of the position. When to trade and when to avoid it, good and bad trades, and simplifying into a won endgame.',
    lessons: [
      {
        id: 'l4-trades-when',
        title: 'When to trade, and when not to',
        summary: 'A handful of reliable rules decide most exchanging decisions. Learn them, and learn why they work.',
        estMinutes: 14,
        blocks: [
          {
            type: 'text',
            md:
              "Beginners trade pieces whenever they can, \"to simplify\". Strong players treat every exchange as a decision: an exchange removes one of your pieces *and* one of your opponent's, so the question is always **which piece was more useful**, and **how does the position change** afterwards.\n\n" +
              "### Trade pieces when...\n\n" +
              "- **You are ahead in material.** Each trade makes your extra material count for more. An extra pawn with all the pieces is a small edge; with only kings and pawns it is usually decisive.\n" +
              "- **You are defending against an attack.** Every attacker you exchange is one less attacker.\n" +
              "- **You are cramped.** Fewer pieces need less room (Tarrasch).\n" +
              "- **You can trade your bad piece for the opponent's good one**, for example your bad bishop for his good bishop, or any piece for a monster knight on an outpost.",
          },
          {
            type: 'text',
            md:
              "### Avoid trades when...\n\n" +
              "- **You are behind in material.** Keep pieces on and look for activity; if you must trade, trade *pawns*, because fewer pawns mean more drawing chances.\n" +
              "- **You are attacking.** Do not exchange your attackers; exchange the opponent's defenders.\n" +
              "- **You have more space.** Your advantage is that the opponent's pieces get in each other's way: do not relieve him.\n" +
              "- **The recapture improves the opponent's position**: it opens a file for his rook, removes his weak pawn, or brings a passive piece into play.",
          },
          {
            type: 'tip',
            title: 'The key question',
            md:
              "Before an exchange, imagine the position *after* it and ask: **who would be happier with this position, me or my opponent?** Do not trade just because you can, and do not avoid a trade just because it is \"boring\". Capablanca won many games with simple exchanges that left the opponent with one weakness and no counterplay.",
          },
          {
            type: 'board',
            fen: '8/5pk1/6p1/7p/P4P1P/6PK/8/8 w - - 0 1',
            caption: 'The ideal result of trading when ahead: a king-and-pawn ending with an outside passed pawn. The black king must go to stop the a-pawn, and the white king then eats the kingside.',
            highlights: ['a4'],
            arrows: [['a4', 'a8']],
          },
          {
            type: 'text',
            md:
              "### Recapturing\n\n" +
              "Often the decision is not whether to trade, but **how to recapture**. General rules: recapture *towards the centre* with pawns; recapture with a piece that becomes more active; and consider what the recapture does to your pawn islands. When in doubt, choose the recapture that keeps your pieces coordinated and your structure healthy.",
          },
        ],
      },
      {
        id: 'l4-trades-good-bad',
        title: 'Good trades and bad trades',
        summary: 'Exchanging the right pieces: removing defenders, getting rid of bad pieces, and the surprising trade that wins a world-championship candidates match.',
        estMinutes: 18,
        blocks: [
          {
            type: 'text',
            md:
              "### Good trades\n\n" +
              "1. **Trade your worst piece for his best piece.** The classic: a bad bishop for a good bishop or a strong knight.\n" +
              "2. **Remove a key defender.** If one piece holds the opponent's position together (the knight on f6 guarding h7 and d5, the bishop guarding the dark squares), trade it off.\n" +
              "3. **Trade into a favourable endgame.** If the endgame suits your pawn structure (an outside passed pawn, a better king, a good minor piece against a bad one), steer towards it.\n" +
              "4. **Trade queens when the opponent's king is safer** or when your structure is better: it ends his attacking chances and brings the endgame closer.",
          },
          {
            type: 'text',
            md:
              "### Fischer – Petrosian, Candidates final game 7, Buenos Aires 1971\n\n" +
              "Fischer won this match 6½–2½. Game 7 is the most famous: Fischer trades queens to make Black's isolated pawn a pure weakness, then makes a trade that astonished the experts.",
          },
          {
            type: 'line',
            moves: [
              'e4', 'c5', 'Nf3', 'e6', 'd4', 'cxd4', 'Nxd4', 'a6', 'Bd3', 'Nc6', 'Nxc6', 'bxc6', 'O-O', 'd5', 'c4', 'Nf6',
              'cxd5', 'cxd5', 'exd5', 'exd5', 'Nc3', 'Be7', 'Qa4+', 'Qd7', 'Re1', 'Qxa4', 'Nxa4', 'Be6', 'Be3', 'O-O', 'Bc5', 'Rfe8',
              'Bxe7', 'Rxe7', 'b4', 'Kf8', 'Nc5', 'Bc8', 'f3', 'Rea7', 'Re5', 'Bd7', 'Nxd7+', 'Rxd7',
            ],
            caption: 'Fischer – Petrosian 1971, game 7: purposeful exchanges.',
            notes: {
              20: 'Black now has an isolated d5-pawn.',
              23: '12.Qa4+ offers a queen trade. Without queens, Black has no attacking chances to compensate for the weak pawn.',
              33: 'Fischer exchanges dark-squared bishops. Black is left with the light-squared bishop, hemmed in by his own pawn on d5.',
              37: 'The knight takes up a superb post on c5, attacking a6 and blocking the c-file.',
              43: '22.Nxd7+!! A shock: Fischer gives up his magnificent knight for Black\'s bad bishop. The point: after the trade White\'s bishop is better than Black\'s knight (pawns on both wings, an open board), and White\'s rooks get the c-file and the seventh rank.',
              44: 'Next comes Rc1–c7. The exchange has transformed one advantage (the strong knight) into another (rook activity and a superior minor piece).',
            },
          },
          {
            type: 'text',
            md:
              "Fischer continued 23.Rc1 Rd6 24.Rc7 and doubled rooks on the seventh rank. Ten moves later the position had become decisive.",
          },
          {
            type: 'exercise',
            exercise: {
              id: 'l4-trades-good-bad-ex1',
              prompt: 'Fischer – Petrosian 1971. White to move. Both rooks are on the seventh rank. How does White turn their activity into a decisive attack?',
              fen: 'r4k2/2R1R3/p2r2p1/3n1p2/1P1p1P1p/3B4/P2K2PP/8 w - - 4 32',
              solution: ['Rf7+', 'Ke8', 'Rb7'],
              hint: 'First drive the king to the eighth rank with check, then reposition the other rook so that both rooks control the seventh and threaten to reach the eighth.',
              explanation:
                "32.Rf7+ Ke8 33.Rb7! The black king is trapped on the back rank between the two rooks, and White threatens ideas like Bb5+ and Rh7–h8+. Petrosian tried 33...Nxb4, but after 34.Bc4! (threatening Rh7 and Rh8+) he resigned. The trade on move 22 was played for exactly this: two rooks on the seventh rank against a king on the eighth.",
            },
          },
          {
            type: 'tip',
            title: 'Transforming advantages',
            md:
              "Fischer's 22.Nxd7+ is a model of **transformation**: one advantage (a strong knight) is exchanged for another, more useful one (control of the c-file and the seventh rank). Advantages are not sacred. Ask which one wins the game, and do not be afraid to trade a \"good\" piece to get it.",
          },
        ],
      },
      {
        id: 'l4-trades-simplify',
        title: 'Simplifying into a won endgame',
        summary: 'When you are ahead, the cleanest win is often a well-chosen exchange that leads to a simple endgame. Calculate it precisely.',
        estMinutes: 14,
        blocks: [
          {
            type: 'text',
            md:
              "Converting an advantage is a skill of its own. The most reliable technique is **simplification**: exchanging pieces until the win is easy. The king-and-pawn ending is the final destination, because it is the simplest of all, and very often decisive when you have a healthy extra pawn.\n\n" +
              "But king-and-pawn endings are also completely unforgiving. There are no pieces left to fix a mistake: a single tempo or a wrong pawn structure turns a win into a draw or even a loss. So before you trade the last piece, **calculate the pawn ending to the end** (or be sure you know the evaluation).",
          },
          {
            type: 'text',
            md:
              "### What makes a pawn ending winning?\n\n" +
              "- **An outside passed pawn**: it decoys the enemy king, and your king attacks the other pawns.\n" +
              "- **A more active king**: in pawn endings the king is a strong piece, and the side whose king gets in first usually wins.\n" +
              "- **A healthy majority** against a crippled one (doubled pawns cannot create a passed pawn).\n" +
              "- **The opposition and spare tempi**: the knowledge from your endgame lessons decides the close cases.",
          },
          {
            type: 'exercise',
            exercise: {
              id: 'l4-trades-simplify-ex1',
              prompt: 'White to move. White has an extra a-pawn. Find the clearest way to win.',
              fen: '3r4/4kppp/8/8/P7/8/5PPP/3R1K2 w - - 0 1',
              solution: ['Rxd8'],
              hint: 'Rook endings are the most drawish of all endgames. Which endgame is the least drawish?',
              explanation:
                "1.Rxd8! Kxd8 leads to a winning king-and-pawn ending. The a-pawn is an *outside* passed pawn: the black king must run to the queenside to stop it (...Kc7–b6–a5), and meanwhile the white king marches to the kingside and eats Black's pawns. With rooks on the board Black's rook would get behind the a-pawn and the win would be very difficult.",
            },
          },
          {
            type: 'tip',
            title: 'Simplification checklist',
            md:
              "1. **Trade pieces, not pawns**, when you are ahead.\n" +
              "2. **Rook endings are drawish**: an extra pawn in a rook ending often is not enough. Minor-piece and pawn endings are easier to win.\n" +
              "3. **Avoid opposite-coloured bishops** when you are trying to win: they draw even two pawns down.\n" +
              "4. **Calculate the pawn ending**, because it cannot be undone.\n" +
              "5. **Do not hurry.** Remove counterplay first, then trade.",
          },
          {
            type: 'text',
            md:
              "Capablanca, perhaps the greatest endgame player of all, was famous for wins that looked effortless: one exchange, then another, and suddenly the opponent was in a lost ending without having made an obvious mistake. The secret was always the same: he knew which endgames were won before he entered them.",
          },
        ],
      },
    ],
  },

  // ───────────────────────────── 6. TYPICAL STRUCTURES ─────────────────────────────
  {
    id: 'l4-struct',
    level: 4,
    title: 'Typical structures and plans',
    description:
      'The pawn structures that appear again and again, and the plans that go with them: the IQP, the Carlsbad and the minority attack, the Maróczy Bind, the Hedgehog, the French chain and the King\'s Indian.',
    lessons: [
      {
        id: 'l4-struct-iqp',
        title: 'The isolated queen\'s pawn',
        summary: 'The most important structure in chess, from both sides: attack with the IQP, or blockade it and head for the endgame.',
        estMinutes: 18,
        blocks: [
          {
            type: 'text',
            md:
              "The IQP arises from many openings: the Queen's Gambit Accepted, the Tarrasch Defence, the Caro-Kann Panov Attack, the Nimzo-Indian, the Semi-Tarrasch, the c3-Sicilian. If you know its plans, you know what to do in dozens of openings.\n\n" +
              "The basic rule is simple: **the IQP is a middlegame asset and an endgame liability.** The side with the IQP wants to attack before the pieces come off; the other side wants to trade pieces and reach an ending where the pawn is just weak.",
          },
          {
            type: 'line',
            moves: ['e4', 'c6', 'd4', 'd5', 'exd5', 'cxd5', 'c4', 'Nf6', 'Nc3', 'e6', 'Nf3', 'Be7', 'cxd5', 'Nxd5', 'Bd3', 'Nc6', 'O-O', 'O-O', 'Re1', 'Bf6'],
            caption: 'Caro-Kann, Panov Attack: White gets the IQP.',
            notes: {
              7: 'The Panov Attack. White accepts an isolated pawn in return for quick development.',
              14: 'After 7.cxd5 Nxd5, White\'s d4-pawn is isolated: there is no white c- or e-pawn.',
              15: 'The bishop aims at h7, the classic target in IQP positions.',
              19: 'The rook supports a knight on e5 and the d4–d5 break, and can later swing to e3 and g3 or h3.',
              20: 'Black piles up on d4 and keeps the d5-square for his pieces.',
            },
          },
          {
            type: 'board',
            fen: 'r1bq1rk1/pp3ppp/2n1pb2/3n4/3P4/2NB1N2/PP3PPP/R1BQR1K1 w - - 6 11',
            caption: 'White\'s IQP plans: a knight on e5, the queen and bishop battery against h7 (Qd3 or Bc2 plus Qd3), a rook lift Re3–g3, and the d4–d5 break to open lines.',
            arrows: [['f3', 'e5'], ['d3', 'h7'], ['e1', 'e3'], ['d4', 'd5']],
          },
          {
            type: 'text',
            md:
              "### Playing with the IQP\n\n" +
              "- **Avoid exchanges**, especially of minor pieces. Every trade brings the endgame closer.\n" +
              "- **Use the outposts on e5 and c5.** A knight on e5 supported by the d4-pawn is a powerful attacker.\n" +
              "- **Attack the king**: battery against h7, rook lift, Bg5 to remove the f6-knight.\n" +
              "- **Break with d4–d5** when your pieces are ready: it opens files and diagonals at the moment the defender's pieces are least coordinated.",
          },
          {
            type: 'text',
            md:
              "### Playing against the IQP\n\n" +
              "- **Blockade the square in front of it** (d5 against a pawn on d4), ideally with a knight. Nimzowitsch: *first restrain, then blockade, then destroy.*\n" +
              "- **Exchange pieces**, especially the attacking minor pieces.\n" +
              "- **Pressure the pawn** with rooks on the d-file and a bishop on the long diagonal (a fianchetto against d5 is a classic weapon).\n" +
              "- **Head for the endgame**, where the pawn becomes a target and the square in front of it a home for your king.",
          },
          {
            type: 'line',
            moves: ['d4', 'd5', 'c4', 'e6', 'Nc3', 'c5', 'cxd5', 'exd5', 'Nf3', 'Nc6', 'g3', 'Nf6', 'Bg2', 'Be7', 'O-O', 'O-O', 'Bg5', 'cxd4', 'Nxd4', 'h6', 'Be3', 'Re8'],
            caption: 'The Tarrasch Defence: now Black has the IQP, and White fights against it.',
            notes: {
              6: 'Tarrasch\'s favourite: Black plays for free piece play and accepts an isolated pawn.',
              11: 'The Rubinstein system: the fianchettoed bishop will put permanent pressure on d5.',
              17: 'White pins the f6-knight, one of the defenders of d5.',
              19: 'The knight on d4 blockades the pawn and eyes c6, b5 and f5.',
              22: 'Black is active, with his pieces aimed at the kingside and the e-file. White will continue the fight against d5 with Rc1, Qa4 or Qb3 and Rfd1. A rich, balanced battle.',
            },
          },
          {
            type: 'tip',
            title: 'A useful guideline',
            md:
              "Count the minor pieces. With three or four minor pieces each, the IQP side usually has good attacking chances. With one or two minor pieces each, the defender is usually better. So the IQP side keeps knights and bishops, and the defender tries to exchange them.",
          },
        ],
      },
      {
        id: 'l4-struct-carlsbad',
        title: 'The Carlsbad structure and the minority attack',
        summary: 'Why White attacks with two pawns against three on the queenside, and what Black does in the meantime.',
        estMinutes: 16,
        blocks: [
          {
            type: 'text',
            md:
              "The **Carlsbad structure** (named after the 1923 Carlsbad tournament) arises from the Exchange Variation of the Queen's Gambit Declined: White has pawns on d4 and e3, Black on d5 and c6, and the c-file is half-open for White, the e-file for Black.\n\n" +
              "White's most famous plan is the **minority attack**: advancing the a- and b-pawns (the *minority*, two against three) with b4–b5. The point is not to win a pawn but to **create a weakness**. After b5xc6, Black is left with a backward c-pawn on a half-open file or an isolated d-pawn.",
          },
          {
            type: 'line',
            moves: ['d4', 'd5', 'c4', 'e6', 'Nc3', 'Nf6', 'cxd5', 'exd5', 'Bg5', 'Be7', 'e3', 'c6', 'Bd3', 'Nbd7', 'Qc2', 'O-O', 'Nf3', 'Re8', 'O-O', 'Nf8', 'Rab1', 'Ng6', 'b4', 'a6', 'a4'],
            caption: 'QGD Exchange Variation: preparing the minority attack.',
            notes: {
              8: 'The Carlsbad structure is born. White has the half-open c-file, Black the half-open e-file.',
              15: 'The queen and bishop eye h7 and keep Black\'s knight from settling on e4 or g6 comfortably.',
              20: 'The typical regrouping: the knight goes to g6 (or e6) to support Black\'s kingside play.',
              21: 'The rook supports the coming b4–b5.',
              24: 'Black slows down b5, but this only gives White a lever: a2–a4 prepares b4–b5 anyway.',
              25: 'Next comes b5. If ...axb5 axb5, the b-file opens for White\'s rook; if ...cxb5, Black\'s d5-pawn is isolated.',
            },
          },
          {
            type: 'board',
            fen: 'r1bqr1k1/1p2bppp/p1p2nn1/3p2B1/PP1P4/2NBPN2/2Q2PPP/1R3RK1 b - - 0 13',
            caption: 'The minority attack in motion. After b4–b5 and bxc6, the c6-pawn (or the d5-pawn) becomes a target, and c5 can become a hole for a white knight.',
            arrows: [['b4', 'b5'], ['b5', 'c6']],
            highlights: ['c6', 'c5'],
          },
          {
            type: 'text',
            md:
              "### Black's counterplay\n\n" +
              "Black should not sit and wait. His main ideas are:\n\n" +
              "- **A kingside attack**: ...Ne4, ...Bd6, ...Qf6 or ...Qh4, ...Ng6, and even ...f5 with a Stonewall-like set-up. White has used pawns on the queenside, so his king may be short of defenders.\n" +
              "- **Using the e4-square** for a knight, supported by ...f5.\n" +
              "- **Meeting b5 with ...c5** at a moment when the resulting hanging pawns or IQP are active.\n\n" +
              "White also has a second plan: **the central break e3–e4**, usually prepared by Nge2 and f3. Botvinnik often chose it, and it shows that one structure can allow several plans.",
          },
          {
            type: 'tip',
            title: 'Minority attack in one sentence',
            md: "Advance the minority to create a weakness, then attack the weakness with pieces. The pawns that made the attack are usually exchanged; what remains is a permanent target on c6 or d5.",
          },
        ],
      },
      {
        id: 'l4-struct-bind-hedgehog',
        title: 'The Maróczy Bind and the Hedgehog',
        summary: 'Two structures where White grips the centre with pawns on c4 and e4, and Black waits for the right moment to break out.',
        estMinutes: 16,
        blocks: [
          {
            type: 'text',
            md:
              "### The Maróczy Bind\n\n" +
              "Named after Géza Maróczy, the **Maróczy Bind** is White's set-up with pawns on **c4 and e4** against a Sicilian, usually the Accelerated Dragon. The pawns clamp the d5-square, making Black's freeing break ...d6–d5 almost impossible, and they restrict ...b5 too.\n\n" +
              "- **White's plan:** keep the bind, prevent ...b5 and ...d5, and slowly gain space (b3, Rc1, f3 or f4). White is happy to trade pieces, because Black has less space.\n" +
              "- **Black's plan:** trade a pair of knights (cramped side trades!), put a bishop on c6 and the knight on d7, and play for ...a5–a4, ...b5 or ...f5 at the right moment. The dark-squared bishop on g7 is Black's best piece.",
          },
          {
            type: 'line',
            moves: ['e4', 'c5', 'Nf3', 'Nc6', 'd4', 'cxd4', 'Nxd4', 'g6', 'c4', 'Bg7', 'Be3', 'Nf6', 'Nc3', 'O-O', 'Be2', 'd6', 'O-O', 'Bd7', 'Qd2', 'Nxd4', 'Bxd4', 'Bc6', 'f3', 'a5'],
            caption: 'Accelerated Dragon, Maróczy Bind.',
            notes: {
              9: '5.c4: the bind. The pawns on c4 and e4 control d5.',
              20: 'Black trades a pair of knights to ease the cramp.',
              22: 'The bishop presses on e4 and prepares ...Nd7 and ...a5.',
              24: 'Black gains space on the queenside and plans ...a4 and ...Qa5 or ...Nd7–c5. White will try b3, Rac1 and Nd5 at a good moment.',
            },
          },
          {
            type: 'text',
            md:
              "### The Hedgehog\n\n" +
              "In the **Hedgehog** Black puts his pawns on **a6, b6, d6 and e6**: a compact, low wall behind which his pieces wait. It looks passive, but it is like a coiled spring. Black's breaks are **...b6–b5** and **...d6–d5**, and they come exactly when White over-extends or misplaces a piece.\n\n" +
              "- **White's plan:** keep control of b5 and d5, gain more space carefully, and avoid weakening pawn moves.\n" +
              "- **Black's plan:** complete development (...Be7, ...Bb7, ...Nbd7, ...Qc7, ...Rfe8, ...Bf8), wait, and strike with ...b5 or ...d5 when the moment comes.",
          },
          {
            type: 'line',
            moves: ['c4', 'c5', 'Nf3', 'Nf6', 'Nc3', 'e6', 'g3', 'b6', 'Bg2', 'Bb7', 'O-O', 'Be7', 'd4', 'cxd4', 'Qxd4', 'd6', 'Rd1', 'a6', 'b3', 'Nbd7', 'e4', 'Qc7', 'Bb2', 'O-O'],
            caption: 'The Hedgehog arises from the English Opening.',
            notes: {
              16: 'Black\'s pawns are on b6, d6 and e6; ...a6 will complete the hedgehog.',
              18: 'The fourth spike: ...a6 prepares ...b5.',
              21: 'White has the Maróczy-style pawns on c4 and e4 and a big space advantage.',
              24: 'Every black piece is developed. Now Black waits for ...d5 or ...b5. White must not relax: a single loose move often lets one of these breaks explode.',
            },
          },
          {
            type: 'tip',
            title: 'Playing against a cramped position',
            md:
              "Both structures teach the same lesson. The side with more space should *restrict* the opponent's freeing breaks before trying anything active. The cramped side should trade a piece or two, keep all pieces flexible, and break at the exact moment the opponent loses control of the key square. In these structures, the pawn break is the whole game.",
          },
        ],
      },
      {
        id: 'l4-struct-french-kid',
        title: 'The French chain and the King\'s Indian',
        summary: 'Two closed centres with pawn chains: attack the base, and race on the wing your chain points to.',
        estMinutes: 18,
        blocks: [
          {
            type: 'text',
            md:
              "### The French Advance chain\n\n" +
              "After 1.e4 e6 2.d4 d5 3.e5, White has the chain d4–e5 pointing to the kingside, Black the chain e6–d5 pointing to the queenside. Following Nimzowitsch's rules:\n\n" +
              "- **Black** attacks the base d4 with ...c5, ...Nc6, ...Qb6 and ...Nf5, and later the head e5 with ...f6.\n" +
              "- **White** defends d4, gains space on the kingside, and attacks there. White's light-squared bishop is very good; Black's c8-bishop is the problem piece.",
          },
          {
            type: 'line',
            moves: ['e4', 'e6', 'd4', 'd5', 'e5', 'c5', 'c3', 'Nc6', 'Nf3', 'Bd7', 'Be2', 'Nge7', 'Na3', 'cxd4', 'cxd4', 'Nf5', 'Nc2', 'Qb6', 'O-O'],
            caption: 'French Advance: every black piece hits d4.',
            notes: {
              10: 'A flexible move: the bishop may go to b5 to trade itself for White\'s good bishop.',
              12: 'The knight heads for f5, the ideal square to attack d4.',
              14: 'Black exchanges on d4 to fix the base and open the c-file.',
              16: 'Knight on f5, knight on c6, and soon the queen on b6: three pieces on d4.',
              19: 'White holds d4 with the knight on c2 and the bishop on e3 to come. Black will continue with ...Be7, ...O-O and ...f6 to attack the head.',
            },
          },
          {
            type: 'text',
            md:
              "### The King's Indian structure\n\n" +
              "In the main line of the King's Indian Defence, White closes the centre with d4–d5. White's chain c4–d5 points to the queenside, Black's chain d6–e5 points to the kingside. The result is one of the sharpest races in chess:\n\n" +
              "- **White** attacks on the queenside with c4–c5 (against the base d6), b4 and a knight on d3 or a4.\n" +
              "- **Black** attacks on the kingside with ...f5–f4 (against the base e4), ...g5–g4 and ...h5, often sacrificing material to reach the white king.\n\n" +
              "Black's g7-bishop looks bad behind the e5-pawn, but it often becomes a defender of the king or springs to life after ...f4 and ...g4. White's position is solid but must be fast.",
          },
          {
            type: 'line',
            moves: ['d4', 'Nf6', 'c4', 'g6', 'Nc3', 'Bg7', 'e4', 'd6', 'Nf3', 'O-O', 'Be2', 'e5', 'O-O', 'Nc6', 'd5', 'Ne7', 'Ne1', 'Nd7', 'Be3', 'f5', 'f3', 'f4', 'Bf2', 'g5'],
            caption: 'King\'s Indian, Mar del Plata Variation: the race begins.',
            notes: {
              15: 'White closes the centre. Now both sides know where to play.',
              17: 'The knight heads for d3, from where it supports c4–c5.',
              18: 'Black\'s knight leaves f6 to clear the way for the f-pawn.',
              20: '...f5 attacks the base of White\'s chain.',
              22: '...f4 gains space and locks the e3-square. Now the g-pawn will follow.',
              24: '...g5–g4 is coming, often followed by ...Ng6, ...Rf7, ...h5 and a direct assault on the white king. White must break through with c5 just as quickly.',
            },
          },
          {
            type: 'board',
            fen: 'r1bq1rk1/pppnn1bp/3p4/3Pp1p1/2P1Pp2/2N2P2/PP2BBPP/R2QNRK1 w - - 0 13',
            caption: 'The race. White attacks the base d6 with c4–c5 on the queenside; Black attacks with ...g4 and ...h5 on the kingside. A tempo here is worth more than a pawn.',
            arrows: [['c4', 'c5'], ['g5', 'g4']],
            highlights: ['d6', 'e4'],
          },
          {
            type: 'tip',
            title: 'Closed centres, fast wings',
            md:
              "With a closed centre, the king's position matters more than material: an attack on the wing can be decisive before the opponent's counterattack arrives. Count tempi, as in a pawn race. Defensive moves on your own wing are only good if they cost the opponent more time than they cost you.",
          },
        ],
      },
    ],
  },
];
