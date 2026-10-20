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
];
