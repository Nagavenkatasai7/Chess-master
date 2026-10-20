import type { Module } from '../types.ts'

// Level 3 "Intermediate" (1000–1400): the full tactical toolbox, mating
// patterns, essential endgames and the basics of attacking the king.
// Every exercise has been checked with Stockfish (scripts/verify-content.ts).

export const level3: Module[] = [
  // ───────────────────────────── 1. TACTICS II ─────────────────────────────
  {
    id: 'l3-tactics',
    level: 3,
    title: 'Tactics II: the full toolbox',
    description:
      'Beyond forks and pins: discovered and double check, removing the defender, deflection, decoys, overloading, interference, clearance, X-rays, in-between moves, desperadoes and trapped pieces.',
    lessons: [
      {
        id: 'l3-discovered',
        title: 'Discovered check and double check',
        summary: 'When the piece that moves is not the piece that gives check, the moving piece gets a free move.',
        estMinutes: 14,
        blocks: [
          {
            type: 'text',
            md:
              "In Level 2 you met the **discovered attack**: one piece moves out of the way and uncovers an attack by the piece behind it. The most powerful version is the **discovered check**, where the uncovered piece attacks the *king*.\n\n" +
              "Why is it so strong? Because the opponent *must* deal with the check, the piece that moved can go almost anywhere and do almost anything: grab a queen, attack two pieces, even sit on a square where it can be captured. Your opponent simply has no time to punish it.\n\n" +
              "### The rule of thumb\n\n" +
              "- When your piece stands between your long-range piece (queen, rook or bishop) and the enemy king, you have a **loaded gun**. Look at *every* move of the front piece.\n" +
              "- When the enemy has such a battery aimed at *your* king, get out of the line before it fires.",
          },
          {
            type: 'line',
            moves: ['e4', 'e5', 'Nf3', 'Nf6', 'Nxe5', 'Nxe4', 'Qe2', 'Nf6'],
            caption: 'A classic trap in the Petroff Defence.',
            notes: {
              5: 'White takes the e5-pawn. The correct reply is 3...d6, kicking the knight first.',
              6: 'Copying White is a mistake here: the e-file is about to open towards the black king.',
              7: 'The queen lines up on the e-file. The knight on e5 is now the front piece of a battery aimed at e8.',
              8: 'A blunder. Black had to play 4...Qe7 5.Qxe4 d6, losing only a pawn. Now White has a deadly discovered check.',
            },
          },
          {
            type: 'exercise',
            exercise: {
              id: 'l3-discovered-ex1',
              prompt: 'White to move. Fire the battery on the e-file and win the black queen.',
              fen: 'rnbqkb1r/pppp1ppp/5n2/4N3/8/8/PPPPQPPP/RNB1KB1R w KQkq - 2 5',
              solution: ['Nc6+', 'Be7', 'Nxd8'],
              hint: 'Which knight move gives a discovered check AND attacks something big?',
              explanation:
                "5.Nc6+! uncovers check from the queen on e2, and the knight attacks the queen on d8 at the same time. Black must answer the check (5...Be7 or 5...Qe7), and then 6.Nxd8 (or 6.Nxe7) collects the queen. The knight could also have gone to g6 or d7 with check, but only c6 also attacks the queen: always look for the discovered check that does the most damage.",
            },
          },
          {
            type: 'text',
            md:
              "### Double check: the strongest check of all\n\n" +
              "If the piece that moves *also* gives check, the king is attacked twice at once. Against a **double check** you cannot capture both checkers or block both lines, so **the king must move**. If it has no safe square, it is mate, even if every white piece is hanging.\n\n" +
              "The most famous example is Réti – Tartakower (Vienna 1910): 9.Qd8+!! Kxd8 10.Bg5+ (double check from bishop and rook) and mate next move. You will meet that game again at Level 5. Below is a similar pattern.",
          },
          {
            type: 'board',
            fen: 'r1b1kb1r/ppp2ppp/8/8/8/5Q2/Pq2BPPP/4R1K1 w kq - 0 1',
            caption: 'The bishop on e2 is the front piece of a battery on the e-file. Where can it go to give a second check at the same time?',
            arrows: [['e1', 'e8'], ['e2', 'b5']],
          },
          {
            type: 'exercise',
            exercise: {
              id: 'l3-discovered-ex2',
              prompt: 'White to move: mate in 2. Black has grabbed the b2-pawn, but his king is still in the centre.',
              fen: 'r1b1kb1r/ppp2ppp/8/8/8/5Q2/Pq2BPPP/4R1K1 w kq - 0 1',
              goal: 'mate',
              solution: ['Bb5+', 'Kd8', 'Re8#'],
              hint: 'A double check: the bishop checks along the diagonal, the rook along the e-file.',
              explanation:
                "1.Bb5+ is a double check (bishop and rook), so Black cannot block or capture: the king must move, and its only square is d8. Then 2.Re8# finishes, because the rook is protected by the bishop on b5 and the black king is boxed in by its own pawn on c7 and bishop on c8. White's queen never had to move.",
            },
          },
          {
            type: 'text',
            md:
              "### The windmill\n\n" +
              "When a rook can give discovered check, then return to give check itself, then discover check again, it can go round and round like the sails of a **windmill**, eating a piece each time. The most famous windmill is **Torre – Lasker, Moscow 1925**: Carlos Torre sacrificed his queen and then his rook on g7 swept up Lasker's pawns and queen. Watch the same mechanism here.",
          },
          {
            type: 'line',
            fen: '5nk1/pp3pp1/5B1p/7q/8/6R1/PPP5/1K6 w - - 0 1',
            moves: ['Rxg7+', 'Kh8', 'Rxf7+', 'Kg8', 'Rg7+', 'Kh8', 'Rxb7+', 'Kg8', 'Rg7+', 'Kh8', 'Rg5+', 'Kh7', 'Rxh5'],
            caption: 'A windmill: bishop on f6, rook on the seventh rank.',
            notes: {
              1: 'The rook takes with check. 1...Kxg7 is impossible because the bishop guards g7.',
              3: 'Discovered check from the bishop on f6. The rook grabs the f7-pawn for free.',
              5: 'The rook returns with check: the windmill turns.',
              7: 'Another discovered check, another pawn.',
              11: 'The final turn: the rook leaves the seventh rank with discovered check...',
              13: '...and captures the queen on h5. White is a rook up.',
            },
          },
          {
            type: 'tip',
            title: 'Checks first, always',
            md:
              "Discovered and double checks are forcing moves, so your opponent's reply is almost always predictable. That makes them easy to calculate. Whenever you have a piece in front of your own queen, rook or bishop on a line towards the enemy king, ask: *what would happen if that piece could move for free?*",
          },
        ],
      },
      {
        id: 'l3-defenders',
        title: 'Attacking the defenders',
        summary: 'Removing the defender, deflection, decoy and overloading: four ways to beat a piece that holds the position together.',
        estMinutes: 18,
        blocks: [
          {
            type: 'text',
            md:
              "Many positions are held together by one or two key defenders: a knight that guards h7, a queen that guards the back rank, a rook that protects another piece. If you can get rid of that defender, the whole position collapses. There are four main methods:\n\n" +
              "1. **Removing the defender**: capture it (or chase it away).\n" +
              "2. **Deflection**: force it to leave its post, usually by offering something it must take.\n" +
              "3. **Decoy (attraction)**: lure an enemy piece, often the king, *onto* a square where it gets hit.\n" +
              "4. **Overloading**: a piece that defends two things cannot do both jobs at once.",
          },
          {
            type: 'text',
            md:
              "### Removing the defender\n\n" +
              "First ask: *what stops my attack from working?* Then ask: *can I capture that piece?* In the diagram below, White's queen and bishop aim at h7, but the knight on f6 defends it. The white knight on e4 can take it with check, which also opens the diagonal for the queen.",
          },
          {
            type: 'board',
            fen: 'rnbq1rk1/ppp1bppp/3ppn2/8/3PN3/2PQ4/PPB2PPP/R1B2RK1 w - - 0 1',
            caption: 'The battery Bc2 + Qd3 aims at h7, but the knight on f6 guards it and the white knight on e4 is in the way.',
            arrows: [['c2', 'h7'], ['e4', 'f6']],
            highlights: ['h7'],
          },
          {
            type: 'exercise',
            exercise: {
              id: 'l3-defenders-ex1',
              prompt: 'White to move: mate in 2.',
              fen: 'rnbq1rk1/ppp1bppp/3ppn2/8/3PN3/2PQ4/PPB2PPP/R1B2RK1 w - - 0 1',
              goal: 'mate',
              solution: ['Nxf6+', 'gxf6', 'Qxh7#'],
              hint: 'Capture the defender of h7, and open the queen\'s diagonal at the same time.',
              explanation:
                "1.Nxf6+ removes the only defender of h7 and, by leaving e4, opens the b1-h7 diagonal for the queen. Whatever Black does (1...gxf6, 1...Bxf6 or 1...Kh8), 2.Qxh7# follows, with the queen protected by the bishop on c2.",
            },
          },
          {
            type: 'text',
            md:
              "### Deflection\n\n" +
              "A deflection forces a defender away from the square or piece it protects. The classic illustration is the (possibly embellished) game **Adams – Torre, New Orleans 1920**. Black's back rank is weak, and his queen and rook on c8 must both keep guarding the rook on e8. White offers his queen again and again; Black can never take it, because each capture would deflect a defender from e8.",
          },
          {
            type: 'line',
            fen: '2r1r1k1/1p1q1ppp/3p1b2/p2P4/3Q4/5N2/PP2RPPP/4R1K1 w - - 0 18',
            moves: ['Qg4', 'Qb5', 'Qc4', 'Qd7', 'Qc7', 'Qb5', 'a4', 'Qxa4', 'Re4', 'Qb5'],
            caption: 'Adams – Torre: the queen offers.',
            notes: {
              1: 'Offer number one: 18...Qxg4?? 19.Rxe8+ Rxe8 20.Rxe8# (back-rank mate).',
              2: 'The queen must stay on the a4-e8 diagonal to protect e8.',
              3: 'Offer two: 19...Qxc4 20.Rxe8+ and mates; 19...Rxc4 20.Rxe8+ Qxe8 21.Rxe8#.',
              5: 'Offer three: on c7 the queen attacks the rook on c8 and still cannot be taken.',
              7: 'A clever pawn move to push the black queen off the diagonal.',
              9: 'The rook attacks the queen along the fourth rank. It must return to b5 to keep guarding e8.',
            },
          },
          {
            type: 'exercise',
            exercise: {
              id: 'l3-defenders-ex2',
              prompt: 'Adams – Torre, after 22...Qb5. White to move: deliver the final blow.',
              fen: '2r1r1k1/1pQ2ppp/3p1b2/pq1P4/4R3/5N2/1P3PPP/4R1K1 w - - 2 23',
              solution: ['Qxb7'],
              hint: 'The black queen must keep guarding e8. Offer it the queen one more time and grab a pawn while you are at it.',
              explanation:
                "23.Qxb7! attacks the black queen, which has nowhere to go: it must keep watching e8. 23...Qxb7 24.Rxe8+ Rxe8 25.Rxe8# is back-rank mate, and any queen move off the a4-e8 diagonal loses the same way. In the game Black resigned. Every queen move in this sequence was a **deflection** offer.",
            },
          },
          {
            type: 'text',
            md:
              "### Decoy (attraction)\n\n" +
              "A decoy *drags* an enemy piece onto a bad square, usually with a sacrifice. Very often the target is the king: you force it onto a square where it can be forked, skewered or mated. The idea \"sacrifice to bring the king to the fork square\" wins countless games.",
          },
          {
            type: 'exercise',
            exercise: {
              id: 'l3-defenders-ex3',
              prompt: 'White to move. 1.Nd7 at once fails to 1...Rxf1 mate. Find the right order and win the black queen.',
              fen: '5rk1/1p4pp/1q6/4N3/4b3/8/PP1B2PP/5R1K w - - 0 1',
              solution: ['Rxf8+', 'Kxf8', 'Nd7+', 'Ke8', 'Nxb6'],
              hint: 'First drag the black king to f8. Where can a knight then attack f8 and b6 together?',
              explanation:
                "1.Rxf8+! Kxf8 decoys the king to f8 (and removes Black's dangerous rook). Now 2.Nd7+ is a royal fork of king and queen, and 3.Nxb6 wins the queen. Order matters: 1.Nd7? allows 1...Rxf1#, because the bishop on e4 pins the g2-pawn and the white king has no escape.",
            },
          },
          {
            type: 'text',
            md:
              "### Overloading\n\n" +
              "A piece is **overloaded** when it has two defensive jobs. Attack one of the things it defends; when it recaptures, the other falls. To spot it, ask for each enemy piece: *what is it protecting?* If the answer is \"two things\", you may already have a combination.",
          },
          {
            type: 'board',
            fen: '6k1/pp2qp1p/5bp1/2n5/8/5Q2/PP2BPPP/2R3K1 w - - 0 1',
            caption: 'The black queen on e7 is the only defender of both the knight on c5 and the bishop on f6.',
            arrows: [['e7', 'c5'], ['e7', 'f6'], ['c1', 'c5'], ['f3', 'f6']],
          },
          {
            type: 'exercise',
            exercise: {
              id: 'l3-defenders-ex4',
              prompt: 'White to move and win material. Exploit the overloaded black queen.',
              fen: '6k1/pp2qp1p/5bp1/2n5/8/5Q2/PP2BPPP/2R3K1 w - - 0 1',
              solution: ['Rxc5', 'Qxc5', 'Qxf6'],
              hint: 'Capture with the less valuable piece first, so the recapture costs you less.',
              explanation:
                "1.Rxc5! Qxc5 2.Qxf6: the queen could not protect c5 and f6 at the same time, so White wins a knight and a bishop for a rook, and the white queen on f6 now dominates the dark squares around the black king. The order is important: 1.Qxf6? Qxf6 would lose the queen for a bishop.",
            },
          },
          {
            type: 'tip',
            title: 'Ask "who defends what?"',
            md:
              "Before every move in a sharp position, make a quick list of the enemy's key defenders and what each of them guards. Defenders with **two jobs** are overloaded; defenders that can be **captured with tempo** can be removed; defenders that can be **offered something** can be deflected. This simple habit finds more combinations than any amount of luck.",
          },
        ],
      },
      {
        id: 'l3-lines',
        title: 'Interference, clearance, X-rays and in-between moves',
        summary: 'Blocking enemy lines, clearing your own, attacking through pieces and the surprise of the zwischenzug.',
        estMinutes: 18,
        blocks: [
          {
            type: 'text',
            md:
              "Long-range pieces work along **lines**: files, ranks and diagonals. Many tactics are about these lines:\n\n" +
              "- **Interference**: you put a piece *between* an enemy defender and the square it protects, cutting the line.\n" +
              "- **Clearance**: you move one of *your own* pieces out of the way, often with a sacrifice, so that another piece can use the square or line.\n" +
              "- **X-ray**: a piece attacks or defends *through* another piece on the same line.\n\n" +
              "Finally, the **zwischenzug** (German for \"in-between move\") is about *timing*: instead of the expected recapture, you first play a stronger forcing move.",
          },
          {
            type: 'text',
            md:
              "### Interference\n\n" +
              "In the next position the white pawn on d7 wants to promote, but the black rook on a8 watches d8 along the back rank. White cuts the rank by placing a piece on c8. If the rook takes it, the pawn takes back *and promotes at the same time*.",
          },
          {
            type: 'board',
            fen: 'r7/p2P4/B5k1/8/8/8/6K1/8 w - - 0 1',
            caption: 'The rook guards d8 along the eighth rank. Can White block that line?',
            arrows: [['a8', 'd8'], ['a6', 'c8']],
            highlights: ['c8', 'd8'],
          },
          {
            type: 'exercise',
            exercise: {
              id: 'l3-lines-ex1',
              prompt: 'White to move and win. Cut the rook off from the queening square.',
              fen: 'r7/p2P4/B5k1/8/8/8/6K1/8 w - - 0 1',
              solution: ['Bc8'],
              hint: 'Put a piece on the line between the rook and d8, on a square the pawn can capture.',
              explanation:
                "1.Bc8! interferes with the rook's defence of d8. If 1...Rxc8 2.dxc8=Q, and on any other move 2.d8=Q comes next with a queen against a rook. Note that 1.d8=Q? Rxd8 only draws, and the slow 1.Bb7 lets the rook reach d8 and the black king come back in time.",
            },
          },
          {
            type: 'text',
            md:
              "### Clearance\n\n" +
              "Sometimes your own piece is standing on the very square another piece needs. A **clearance sacrifice** gets it out of the way with gain of time, usually with check. Here the rook on h7 blocks the queen's route to h7, the square where a protected queen would give mate.",
          },
          {
            type: 'exercise',
            exercise: {
              id: 'l3-lines-ex2',
              prompt: 'White to move: mate in 2.',
              fen: '3q1rk1/pp3ppR/2p5/6N1/8/3Q4/PPP2PPP/6K1 w - - 0 1',
              goal: 'mate',
              solution: ['Rh8+', 'Kxh8', 'Qh7#'],
              hint: 'The rook is in the way of the queen. Get it off h7 with check.',
              explanation:
                "1.Rh8+! clears h7 for the queen and decoys the king to h8. After the forced 1...Kxh8, 2.Qh7# is mate: the queen is protected by the knight on g5, and the black king's only other square, g8, is covered by the queen.",
            },
          },
          {
            type: 'text',
            md:
              "### X-ray\n\n" +
              "When two of your pieces stand on the same line, the back piece \"sees through\" the front one. Count the attackers on d8 in the next exercise: the rook on d4 attacks it directly, and the queen on d1 attacks it *through* the rook. Black defends d8 only once (with the queen), so it falls, and with it the back rank.",
          },
          {
            type: 'exercise',
            exercise: {
              id: 'l3-lines-ex3',
              prompt: 'White to move: mate in 2.',
              fen: '3r2k1/5ppp/1q6/8/3R4/8/PP3PPP/3Q2K1 w - - 0 1',
              goal: 'mate',
              solution: ['Rxd8+', 'Qxd8', 'Qxd8#'],
              hint: 'Count attackers and defenders of d8, remembering the queen behind your rook.',
              explanation:
                "1.Rxd8+ Qxd8 2.Qxd8#. The queen on d1 X-rayed through the rook, so d8 was attacked twice and defended only once. With no escape square for the king (the f7, g7 and h7 pawns never moved), the exchange ends in a back-rank mate.",
            },
          },
          {
            type: 'text',
            md:
              "### Zwischenzug: the in-between move\n\n" +
              "When your opponent captures, the natural reaction is to recapture at once. Strong players first ask: *is there a forcing move I can play before recapturing?* A check or a bigger threat inserted in the middle of an exchange can change the result completely.\n\n" +
              "The most famous example is the **Elephant Trap** in the Queen's Gambit Declined. White thinks he can win a pawn on d5, because the knight on f6 is pinned... but it isn't really.",
          },
          {
            type: 'line',
            moves: ['d4', 'd5', 'c4', 'e6', 'Nc3', 'Nf6', 'Bg5', 'Nbd7', 'cxd5', 'exd5', 'Nxd5', 'Nxd5', 'Bxd8'],
            caption: 'The Elephant Trap.',
            notes: {
              8: 'Black seems to leave d5 under-protected, since the f6-knight is "pinned" to the queen.',
              11: 'White grabs the pawn, expecting 6...Nxd5 7.Bxd8 winning the queen.',
              12: 'Black takes anyway, ignoring the pin!',
              13: 'White has won the queen... or has he? Black to move has an in-between check.',
            },
          },
          {
            type: 'exercise',
            exercise: {
              id: 'l3-lines-ex4',
              prompt: 'Black to move. White has just captured your queen. Do not recapture at once: find the in-between move that wins a piece.',
              fen: 'r1bBkb1r/pppn1ppp/8/3n4/3P4/8/PP2PPPP/R2QKBNR b KQkq - 0 7',
              solution: ['Bb4+', 'Qd2', 'Bxd2+', 'Kxd2', 'Kxd8'],
              hint: 'A check comes first. Which white piece is the only one that can block it?',
              explanation:
                "7...Bb4+! is the zwischenzug. White's only defence is 8.Qd2 (the king cannot go to d2, and nothing else can block), so 8...Bxd2+ 9.Kxd2 Kxd8 and Black has won a piece for a pawn. The check came first, so the queen trade happened on Black's terms.",
            },
          },
        ],
      },
      {
        id: 'l3-desperado',
        title: 'Desperadoes and trapped pieces',
        summary: 'A doomed piece should sell itself as dearly as possible, and a piece with no squares can be hunted down.',
        estMinutes: 14,
        blocks: [
          {
            type: 'text',
            md:
              "### Desperado\n\n" +
              "A **desperado** is a piece that is lost anyway, so it takes as much as it can before it dies. It often appears when *two* of your pieces are attacked at once, or when pieces of both sides are hanging. Instead of saving one piece and losing the other, you use the doomed one to capture something.\n\n" +
              "**Rule of thumb:** when one of your pieces is about to be lost, look at *every capture and check* it can still make.",
          },
          {
            type: 'board',
            fen: 'r1bqkb1r/ppp2ppp/2n2n2/3p4/2B1N3/5N2/PPPP1PPP/R1BQK2R w KQkq - 0 1',
            caption: 'The pawn on d5 forks the bishop on c4 and the knight on e4. Whichever piece White saves, the other one seems lost.',
            arrows: [['d5', 'c4'], ['d5', 'e4']],
          },
          {
            type: 'exercise',
            exercise: {
              id: 'l3-desperado-ex1',
              prompt: 'White to move. Both the bishop and the knight are attacked. Save the material.',
              fen: 'r1bqkb1r/ppp2ppp/2n2n2/3p4/2B1N3/5N2/PPPP1PPP/R1BQK2R w KQkq - 0 1',
              solution: ['Nxf6+'],
              hint: 'The knight is doomed. Let it take something on its way out, with check.',
              explanation:
                "1.Nxf6+! The knight was lost anyway, so it takes the black knight and gives check. After 1...gxf6 (or 1...Qxf6) White has time to save the bishop and material is level. Saving one piece first (1.Bb5 or 1.Nc3) loses the other, and 1.Bxd5? Nxd5 just loses a piece for a pawn.",
            },
          },
          {
            type: 'text',
            md:
              "### Trapped pieces\n\n" +
              "A piece does not have to be attacked to be in danger: it is **trapped** when it has no safe squares. Bishops that grab pawns on a7 or h2, knights on the rim, and queens that go pawn-hunting are the usual victims. Before you grab a pawn with a piece, always ask: *how will this piece get back?*\n\n" +
              "In the first game of the 1972 World Championship, Bobby Fischer took a pawn with 29...Bxh2?! and Boris Spassky trapped the bishop with 30.g3. Here is a similar position.",
          },
          {
            type: 'exercise',
            exercise: {
              id: 'l3-desperado-ex2',
              prompt: 'White to move. Black\'s bishop has just taken the pawn on h2. Trap it.',
              fen: '8/pp3pkp/6p1/8/8/1P2P3/P2N1PPb/5K2 w - - 0 1',
              solution: ['g3'],
              hint: 'The bishop has only two exits, g1 and g3. One of them is already covered by your king.',
              explanation:
                "1.g3! shuts the bishop in: g1 is covered by the king on f1 and g3 is protected by the f2-pawn. White follows up with Kg2 and wins the bishop. The best Black can do is to get a pawn or two for it, as Fischer did with ...h5-h4.",
            },
          },
          {
            type: 'text',
            md:
              "### Noah's Ark Trap\n\n" +
              "This old trap in the Ruy Lopez catches a bishop on b3 with a chain of black pawns: ...a6, ...b5, ...c5 and ...c4. It got its name because it is supposedly as old as Noah's Ark.",
          },
          {
            type: 'line',
            moves: ['e4', 'e5', 'Nf3', 'Nc6', 'Bb5', 'a6', 'Ba4', 'd6', 'd4', 'b5', 'Bb3', 'Nxd4', 'Nxd4', 'exd4', 'Qxd4'],
            caption: 'Noah\'s Ark Trap: White recaptures on d4 with the queen.',
            notes: {
              10: 'The b-pawn chases the bishop to b3.',
              12: 'Black gives up the centre... on purpose.',
              15: 'A natural recapture, and a serious mistake. Look at the bishop on b3: where can it go?',
            },
          },
          {
            type: 'exercise',
            exercise: {
              id: 'l3-desperado-ex3',
              prompt: 'Black to move. Trap the bishop on b3.',
              fen: 'r1bqkbnr/2p2ppp/p2p4/1p6/3QP3/1B6/PPP2PPP/RNB1K2R b KQkq - 0 8',
              solution: ['c5', 'Qc3', 'c4'],
              hint: 'Attack the queen with a pawn first, then take away the bishop\'s last square.',
              explanation:
                "8...c5! gains time on the queen, and 9...c4 entombs the bishop: a4 is covered by the b5-pawn, c4 is the pawn itself, and a2 and c2 are blocked by White's own pawns. White can only get a pawn or two for it. The lesson: before you recapture, check that your other pieces will still have squares.",
            },
          },
        ],
      },
    ],
  },
]
