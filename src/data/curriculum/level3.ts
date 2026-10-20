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
  // ─────────────────────────── 2. CHECKMATE PATTERNS ───────────────────────────
  {
    id: 'l3-mates',
    level: 3,
    title: 'Checkmate patterns',
    description:
      'The classic mating nets every player must recognise at a glance: back-rank, smothered, Anastasia, Arabian, hook, Légal, Boden, Opera, Greco, Damiano and epaulette mates, plus the Greek gift sacrifice.',
    lessons: [
      {
        id: 'l3-mate-backrank',
        title: 'Back-rank, epaulette and smothered mates',
        summary: 'Kings hemmed in by their own pieces: the most common way games end at club level.',
        estMinutes: 15,
        blocks: [
          {
            type: 'text',
            md:
              "Strong players do not calculate every mate from scratch. They *recognise* patterns, the same way you recognise a word without spelling it out. Once a pattern is in your memory you will spot it in a second, both for you and against you.\n\n" +
              "The first family of patterns has one thing in common: **the king is trapped by its own pieces**. The pawns that shelter it, or the rooks standing next to it, take away its escape squares.\n\n" +
              "### Back-rank mate\n\n" +
              "A castled king behind three unmoved pawns (f7, g7, h7) cannot step forward. A rook or queen that reaches the back rank gives mate. It is the single most common mating pattern in club games.",
          },
          {
            type: 'board',
            fen: '3R2k1/5ppp/8/8/8/8/5PPP/6K1 b - - 0 1',
            caption: 'Back-rank mate. The black king is imprisoned by its own pawns on f7, g7 and h7.',
            highlights: ['f7', 'g7', 'h7'],
            arrows: [['d8', 'g8']],
          },
          {
            type: 'tip',
            title: 'Make luft',
            md:
              "The cure is simple: once the middlegame calms down, push one pawn in front of your king (h3/h6 or g3/g6) to give it **luft** (German for \"air\"). One quiet move can save the whole game. Before every move, also ask: *who guards my back rank?* If the answer is \"one piece\", that piece may be overloaded.",
          },
          {
            type: 'exercise',
            exercise: {
              id: 'l3-mate-backrank-ex1',
              prompt: 'White to move: mate in 2. The black queen is the only defender of e8.',
              fen: '4r1k1/pp3ppp/2q5/8/4Q3/8/PP3PPP/4R1K1 w - - 0 1',
              goal: 'mate',
              solution: ['Qxe8+', 'Qxe8', 'Rxe8#'],
              hint: 'Your rook stands behind your queen on the e-file. Trade the queen for the rook on e8.',
              explanation:
                "1.Qxe8+! Qxe8 2.Rxe8#. The black queen was guarding e8, so capturing there *deflects* it, and the rook behind finishes on the back rank. Careful: 1.Qxc6? bxc6 lets Black play ...Rxe1#, because White's back rank is just as weak.",
            },
          },
          {
            type: 'text',
            md:
              "### Epaulette mate\n\n" +
              "When a king is flanked by two of its own pieces on the same rank (like the epaulettes on a uniform's shoulders), a queen that checks from two squares in front covers both diagonal escapes at once. Rooks cannot block on a diagonal, so the king is helpless.",
          },
          {
            type: 'exercise',
            exercise: {
              id: 'l3-mate-backrank-ex2',
              prompt: 'White to move: mate in 1. Look at the black rooks on either side of the king.',
              fen: '3rkr2/ppp3pp/8/8/8/7Q/PPP3PP/6K1 w - - 0 1',
              goal: 'mate',
              solution: ['Qe6#'],
              hint: 'Check from two squares in front of the king, so the queen covers d7, e7 and f7.',
              explanation:
                "1.Qe6# is the epaulette mate. The queen covers d7, e7 and f7, and the black rooks on d8 and f8 take away the remaining squares. Neither rook can block on e7.",
            },
          },
          {
            type: 'text',
            md:
              "### Smothered mate\n\n" +
              "The most elegant mate of all: a **knight** gives mate to a king that is completely surrounded by its own pieces. The standard version is called **Philidor's Legacy**, although it was already published by Lucena around 1497. It is a four-move sequence you should know by heart:\n\n" +
              "1. A knight check on f7 drives the king from h8 to g8.\n" +
              "2. A knight check on h6 is a **double check** with the queen on the a2-g8 diagonal, so the king must go back to h8.\n" +
              "3. The queen sacrifices herself on g8, and the rook has to take.\n" +
              "4. The knight returns to f7: smothered mate.",
          },
          {
            type: 'line',
            fen: '4r2k/pp4pp/2p5/6N1/2Q5/8/PP3PPP/6K1 w - - 0 1',
            moves: ['Nf7+', 'Kg8', 'Nh6+', 'Kh8', 'Qg8+', 'Rxg8', 'Nf7#'],
            caption: "Philidor's Legacy.",
            notes: {
              1: 'The knight checks. The black rook on e8 cannot take on f7.',
              2: 'The only move: g8 is safe for now because the knight blocks the queen.',
              3: 'Double check from knight and queen. 3...Kf8 4.Qf7# is no better.',
              5: 'The queen is protected by the knight, so the king cannot take. The rook must.',
              7: 'Smothered mate: g8, g7 and h7 are all occupied by black pieces.',
            },
          },
          {
            type: 'exercise',
            exercise: {
              id: 'l3-mate-backrank-ex3',
              prompt: 'White to move: mate in 3. Your knight on f7 and queen on c4 form a battery aimed at g8.',
              fen: 'r4rk1/pp3Npp/2p5/q7/2Q5/8/PP3PPP/6K1 w - - 0 1',
              goal: 'mate',
              solution: ['Nh6+', 'Kh8', 'Qg8+', 'Rxg8', 'Nf7#'],
              hint: 'Fire the battery with a double check, then sacrifice the queen on g8.',
              explanation:
                "1.Nh6+! is a double check, so the king must move, and h8 is its only square (f7 is covered by the queen). 2.Qg8+! Rxg8 forces the rook to block the king's last flight square, and 3.Nf7# is the smothered mate. Black's queen and rook never got a single move.",
            },
          },
        ],
      },
      {
        id: 'l3-mate-knight',
        title: 'Knight mates: Anastasia, Arabian, hook and Légal',
        summary: 'A knight next to the king covers squares no other piece can reach. Combine it with a rook or queen.',
        estMinutes: 16,
        blocks: [
          {
            type: 'text',
            md:
              "A knight close to the enemy king is a nightmare for the defender, because the squares it covers cannot be blocked. Most of the patterns in this lesson combine a knight with a heavy piece.\n\n" +
              "### Anastasia's mate\n\n" +
              "Named after a 1803 novel, *Anastasia und das Schachspiel*. A knight on e7 covers g8 and g6; the black king on h7 is also blocked by its own pawn on g7. A rook or queen on the h-file then mates. Very often White first sacrifices the queen on h7 to drag the king there.",
          },
          {
            type: 'board',
            fen: '5r2/pp2Nppk/8/8/8/7R/PP3PPP/6K1 b - - 0 1',
            caption: "Anastasia's mate: the knight on e7 covers g8 and g6, the g7-pawn blocks the king, and the rook mates on the h-file.",
            highlights: ['g8', 'g6'],
          },
          {
            type: 'exercise',
            exercise: {
              id: 'l3-mate-knight-ex1',
              prompt: 'White to move: mate in 3.',
              fen: 'rq3rk1/pp3ppp/8/3N3Q/8/3R4/PP3PPP/6K1 w - - 0 1',
              goal: 'mate',
              solution: ['Ne7+', 'Kh8', 'Qxh7+', 'Kxh7', 'Rh3#'],
              hint: 'Knight check first, then a queen sacrifice on h7 to bring the king to the h-file.',
              explanation:
                "1.Ne7+ Kh8 2.Qxh7+!! Kxh7 3.Rh3#. This is Anastasia's mate: the knight on e7 covers g8 and g6, the pawn on g7 blocks the king, and the rook delivers mate along the h-file. The rook could swing over because the third rank was open.",
            },
          },
          {
            type: 'text',
            md:
              "### Arabian mate\n\n" +
              "One of the oldest recorded patterns, found in Arabic manuscripts over a thousand years old. A knight on f6 protects a rook on h7 (or g8) and also covers g8. The king in the corner has nowhere to go.",
          },
          {
            type: 'exercise',
            exercise: {
              id: 'l3-mate-knight-ex2',
              prompt: 'White to move: mate in 2.',
              fen: '3r1bk1/pp2R2p/8/3N4/8/8/PP3PPP/6K1 w - - 0 1',
              goal: 'mate',
              solution: ['Nf6+', 'Kh8', 'Rxh7#'],
              hint: 'Bring the knight to f6 with check. The rook on the seventh rank does the rest.',
              explanation:
                "1.Nf6+ Kh8 (g7 and f7 are covered by the rook) 2.Rxh7#. The rook on h7 is protected by the knight, which also covers g8: the Arabian mate.",
            },
          },
          {
            type: 'text',
            md:
              "### Hook mate\n\n" +
              "A rook gives check right next to the king, protected by a knight; the knight in turn is protected by a pawn, so the king cannot take it either. The king's own pawns block the last escape squares. The three white pieces hook into each other like links of a chain.",
          },
          {
            type: 'exercise',
            exercise: {
              id: 'l3-mate-knight-ex3',
              prompt: 'White to move: mate in 1.',
              fen: '3R4/5pk1/5N1p/4P3/8/8/r5PP/6K1 w - - 0 1',
              goal: 'mate',
              solution: ['Rg8#'],
              hint: 'The rook can check from right next to the king. Who protects it?',
              explanation:
                "1.Rg8# is the hook mate. The rook is protected by the knight on f6, the knight is protected by the pawn on e5, and the black pawns on f7 and h6 block the king's last squares. g6 is on the rook's line, and h7 is covered by the knight.",
            },
          },
          {
            type: 'text',
            md:
              "### Légal's mate\n\n" +
              "An opening trap from the 18th century, named after Légal de Kermur, Philidor's teacher. White \"blunders\" the queen to a pin, but if Black greedily takes it, the minor pieces deliver mate. The lesson: **a pin on a knight to the queen is not absolute**, and the side that gives up the queen may have a mate in hand.",
          },
          {
            type: 'line',
            moves: ['e4', 'e5', 'Nf3', 'd6', 'Bc4', 'Bg4', 'Nc3', 'g6', 'Nxe5', 'Bxd1', 'Bxf7+', 'Ke7', 'Nd5#'],
            caption: "Légal's mate.",
            notes: {
              6: 'The bishop pins the knight on f3 to the white queen.',
              8: 'A slow move. 4...Nf6 or 4...Nc6 was needed.',
              9: 'White ignores the pin! The best reply is 5...dxe5 6.Qxg4, when White is only a pawn up.',
              10: 'Greed. Black takes the queen...',
              11: '...and the king is driven out with check.',
              13: 'Mate by three minor pieces: the bishop on f7 covers e8 and e6, the knights cover the rest.',
            },
          },
          {
            type: 'exercise',
            exercise: {
              id: 'l3-mate-knight-ex4',
              prompt: 'Black has just taken your queen. White to move: mate in 2.',
              fen: 'rn1qkbnr/ppp2p1p/3p2p1/4N3/2B1P3/2N5/PPPP1PPP/R1BbK2R w KQkq - 0 6',
              goal: 'mate',
              solution: ['Bxf7+', 'Ke7', 'Nd5#'],
              hint: 'Start with a check on f7. Where can the king go, and which knight can then reach it?',
              explanation:
                "1.Bxf7+ Ke7 (the only move) 2.Nd5#. The king on e7 is attacked by the d5-knight, the e5-knight covers d7 and f7 is the bishop, which also covers e6 and e8. Three minor pieces beat a queen and two rooks.",
            },
          },
        ],
      },
      {
        id: 'l3-mate-bishop',
        title: "Boden's, Opera, Greco's and Damiano's mates",
        summary: 'Bishops cut off the king from long range. Learn the patterns where they do the decisive work.',
        estMinutes: 18,
        blocks: [
          {
            type: 'text',
            md:
              "### Boden's mate\n\n" +
              "Two bishops on **criss-crossing diagonals** mate a king that has castled queenside, usually after a queen sacrifice opens the b-file or the diagonals. The king's own pieces (a rook on d8, a pawn or knight on d7) block its escape. It is named after Samuel Boden, who won this way against Schulder in London, 1853.",
          },
          {
            type: 'line',
            moves: ['e4', 'e5', 'Nf3', 'd6', 'c3', 'f5', 'Bc4', 'Nf6', 'd4', 'fxe4', 'dxe5', 'exf3', 'exf6', 'Qxf6', 'gxf3', 'Nc6', 'f4', 'Bd7', 'Be3', 'O-O-O', 'Nd2', 'Re8', 'Qf3', 'Bf5', 'O-O-O', 'd5', 'Bxd5', 'Qxc3+', 'bxc3', 'Ba3#'],
            caption: 'Schulder – Boden, London 1853.',
            notes: {
              25: 'White castles queenside, into the line of fire of the black queen and bishops.',
              27: 'White grabs a pawn, but Black has prepared a combination.',
              28: 'The queen sacrifice removes the c3-pawn and drags the b2-pawn away, opening the f8-a3 diagonal for the other bishop.',
              30: "Boden's mate: the bishop on a3 checks, the bishop on f5 covers b1 and c2, and White's own rook and knight block d1 and d2.",
            },
          },
          {
            type: 'exercise',
            exercise: {
              id: 'l3-mate-bishop-ex1',
              prompt: 'Schulder – Boden. Black to move: mate in 2.',
              fen: '2k1rb1r/ppp3pp/2n2q2/3B1b2/5P2/2P1BQ2/PP1N1P1P/2KR3R b - - 0 14',
              goal: 'mate',
              solution: ['Qxc3+', 'bxc3', 'Ba3#'],
              hint: 'Your f5-bishop already controls c2 and d3. Open a diagonal for the other bishop with a queen sacrifice.',
              explanation:
                "14...Qxc3+! 15.bxc3 Ba3#. The b2-pawn was the only thing blocking the f8-a3 diagonal. Now the bishops cross: a3 gives check, f5 covers b1, c2 and d3, and the white king's neighbours d1 and d2 are its own pieces.",
            },
          },
          {
            type: 'text',
            md:
              "### The Opera mate\n\n" +
              "A rook mates on the back rank while a bishop guards it from a distance. It is named after the most famous game of all time, played by **Paul Morphy** in 1858 against the Duke of Brunswick and Count Isouard in a box at the Paris Opera, during a performance of *The Barber of Seville*. Morphy developed quickly, opened lines, sacrificed and finished with a queen sacrifice and this pattern.",
          },
          {
            type: 'line',
            moves: ['e4', 'e5', 'Nf3', 'd6', 'd4', 'Bg4', 'dxe5', 'Bxf3', 'Qxf3', 'dxe5', 'Bc4', 'Nf6', 'Qb3', 'Qe7', 'Nc3', 'c6', 'Bg5', 'b5', 'Nxb5', 'cxb5', 'Bxb5+', 'Nbd7', 'O-O-O', 'Rd8', 'Rxd7', 'Rxd7', 'Rd1', 'Qe6'],
            caption: 'Morphy – Duke of Brunswick and Count Isouard, Paris 1858.',
            notes: {
              13: 'Double attack on b7 and f7. Black is already struggling: White is far ahead in development.',
              19: 'Morphy sacrifices a knight to open lines against the king stuck in the centre.',
              23: 'Castling brings the rook to the open d-file with tempo.',
              25: 'White gives back the exchange to remove a defender. Now the rook on d7 is pinned.',
              28: 'Black defends d7 and offers a queen trade. Morphy has something much better.',
            },
          },
          {
            type: 'exercise',
            exercise: {
              id: 'l3-mate-bishop-ex2',
              prompt: 'The Opera game after 15...Nxd7. White to move: mate in 2.',
              fen: '4kb1r/p2n1ppp/4q3/4p1B1/4P3/1Q6/PPP2PPP/2KR4 w k - 0 16',
              goal: 'mate',
              solution: ['Qb8+', 'Nxb8', 'Rd8#'],
              hint: 'The knight on d7 is the only piece guarding d8. Deflect it with a queen sacrifice.',
              explanation:
                "16.Qb8+!! Nxb8 17.Rd8#. The queen sacrifice deflects the knight from d8. The rook mates on the back rank, protected by the bishop on g5, which also covers e7. The rook covers d7, and Black's own f7-pawn and f8-bishop block the king: the Opera mate.",
            },
          },
          {
            type: 'text',
            md:
              "### Greco's mate\n\n" +
              "Named after Gioachino Greco, the great 17th-century Italian player. A bishop on the a2-g8 diagonal takes away g8, the king's own g7-pawn blocks it, and a queen or rook mates along the open h-file. Often a knight sacrifice on g6 is used to open that file.",
          },
          {
            type: 'exercise',
            exercise: {
              id: 'l3-mate-bishop-ex3',
              prompt: 'White to move: mate in 2.',
              fen: 'r4r1k/ppq3pp/3b4/4N3/2B5/3Q4/PP3PPP/4R1K1 w - - 0 1',
              goal: 'mate',
              solution: ['Ng6+', 'hxg6', 'Qh3#'],
              hint: 'Your bishop already guards g8. Sacrifice the knight to open the h-file for the queen.',
              explanation:
                "1.Ng6+! hxg6 (the king cannot go to g8 because of the bishop on c4) 2.Qh3#. The h-file is open, g8 is covered by the bishop and g7 is blocked by Black's own pawn: Greco's mate.",
            },
          },
          {
            type: 'text',
            md:
              "### Damiano's mate\n\n" +
              "Published by Pedro Damiano in 1512. A pawn on g6 supports the queen on h7. The typical combination sacrifices a rook on h8 to drag the king into the corner, then the queen arrives on the h-file with check and mates on h7.",
          },
          {
            type: 'exercise',
            exercise: {
              id: 'l3-mate-bishop-ex4',
              prompt: 'White to move: mate in 3.',
              fen: 'r4rk1/pppq2p1/4p1P1/8/8/3Q4/PPP5/2K4R w - - 0 1',
              goal: 'mate',
              solution: ['Rh8+', 'Kxh8', 'Qh3+', 'Kg8', 'Qh7#'],
              hint: 'Give up the rook on h8 so that your queen can reach the h-file with check.',
              explanation:
                "1.Rh8+! Kxh8 2.Qh3+ Kg8 3.Qh7#. The pawn on g6 protects the queen on h7 and covers f7, and the black rook on f8 blocks the last escape: Damiano's mate. The rook sacrifice is the fastest way: every white move is a check, so Black never gets a free move to defend.",
            },
          },
          {
            type: 'tip',
            title: 'Collect the patterns',
            md:
              "When you solve a mate puzzle, give the pattern a name in your head. The next time you see a king in the corner with a pawn on g7 and your bishop on c4, you will think *\"Greco\"* immediately, and know what you are looking for.",
          },
        ],
      },
      {
        id: 'l3-mate-greek',
        title: 'The Greek gift sacrifice',
        summary: 'Bxh7+, Ng5+ and Qh5: the most famous attacking sacrifice against the castled king, and when it works.',
        estMinutes: 16,
        blocks: [
          {
            type: 'text',
            md:
              "The **Greek gift** is the bishop sacrifice **Bxh7+** against a king castled on g8, followed by **Ng5+** and **Qh5**, threatening mate on h7. Gioachino Greco already showed it in 1619, and it still wins games at every level. The name comes from the wooden horse of Troy: a gift that should not be accepted.\n\n" +
              "But it is not a trick that always works. Before you sacrifice, check the **conditions**:\n\n" +
              "1. **Bishop**: your light-squared bishop can take on h7 with check (typically from d3, on an open b1-h7 diagonal).\n" +
              "2. **Knight**: your knight can jump to g5 with check (from f3), and Black cannot simply take it, or you can recapture (a bishop on c1, a pawn on h4 or a rook on the h-file).\n" +
              "3. **Queen**: your queen can reach h5 (or the h-file) in one move.\n" +
              "4. **No defenders**: Black has no knight on f6 (very often a white pawn on e5 has chased it away and controls f6), and no piece that can quickly cover h7.\n\n" +
              "Then calculate Black's three replies after 2.Ng5+: **...Kg8**, **...Kg6** and **...Kh6**, and also what happens if Black declines with 1...Kh8.",
          },
          {
            type: 'board',
            fen: 'r1bq1rk1/ppp2ppp/1nn1p3/3pP3/1b1P4/2NB1N2/PPP2PPP/R1BQ1RK1 w - - 0 1',
            caption: 'All conditions are met: Bd3 hits h7, Nf3 can go to g5 (supported by Bc1), Qd1 can reach h5, and the pawn on e5 keeps black knights away from f6.',
            arrows: [['d3', 'h7'], ['f3', 'g5'], ['d1', 'h5']],
            highlights: ['h7', 'f6'],
          },
          {
            type: 'line',
            fen: 'r1bq1rk1/ppp2ppp/1nn1p3/3pP3/1b1P4/2NB1N2/PPP2PPP/R1BQ1RK1 w - - 0 1',
            moves: ['Bxh7+', 'Kxh7', 'Ng5+', 'Kg8', 'Qh5', 'Qxg5', 'Bxg5'],
            caption: 'The main line of the Greek gift.',
            notes: {
              1: 'The gift. Declining with 1...Kh8 keeps Black alive, but he is simply a pawn down with a bad position.',
              3: 'The knight check. 2...Kh6 runs into discovered checks from the c1-bishop, and 2...Kg6 brings the king into the open, where moves like Qd3+ or Qg4 keep the attack going.',
              5: 'The threat is Qh7#. Black has no knight to bring to f6.',
              6: 'The only way to stop mate is to give up the queen.',
              7: 'White has won the queen for a bishop and a knight and is completely winning.',
            },
          },
          {
            type: 'exercise',
            exercise: {
              id: 'l3-mate-greek-ex1',
              prompt: 'White to move. Check the conditions, then play the Greek gift and follow it up.',
              fen: 'r1bq1rk1/ppp2ppp/1nn1p3/3pP3/1b1P4/2NB1N2/PPP2PPP/R1BQ1RK1 w - - 0 1',
              solution: ['Bxh7+', 'Kxh7', 'Ng5+', 'Kg8', 'Qh5'],
              hint: 'Bishop, knight, queen: in that order, and every move is a check or a mate threat.',
              explanation:
                "1.Bxh7+! Kxh7 2.Ng5+ Kg8 3.Qh5 threatens Qh7#, and Black must give his queen with 3...Qxg5 4.Bxg5. The Bc1 was important: without it, Black could simply capture the knight on g5. If Black declines with 1...Kh8, White retreats the bishop and stays a healthy pawn up.",
            },
          },
          {
            type: 'text',
            md:
              "### The king walk to h6\n\n" +
              "After 1.Bxh7+ Kxh7 2.Ng5+, the king sometimes tries to escape forward with 2...Kh6. Now the queen comes with a mate threat on h7, and any knight move will uncover a check from the bishop on c1. The black king is in a cage.",
          },
          {
            type: 'exercise',
            exercise: {
              id: 'l3-mate-greek-ex2',
              prompt: 'Black has gone 2...Kh6. White to move and win: bring in the queen.',
              fen: 'r1bq1r2/ppp2pp1/1nn1p2k/3pP1N1/1b1P4/2N5/PPP2PPP/R1BQ1RK1 w - - 2 3',
              solution: ['Qd3', 'Qxg5', 'Bxg5+'],
              hint: 'Threaten mate on h7 with the queen. Black will have to give up his queen to stop it.',
              explanation:
                "3.Qd3! threatens 4.Qh7#. Black's only way to delay mate is 3...Qxg5, and 4.Bxg5+ Kxg5 leaves the black king exposed in the middle of the board with White a queen for a bishop up. Keep in mind the Bc1: the knight on g5 is defended and any knight move gives discovered check.",
            },
          },
          {
            type: 'tip',
            title: 'Common mistake',
            md:
              "Do not play Bxh7+ just because it looks exciting. If Black has a knight on f6, a bishop that can take on g5 without a recapture, or a quick defence like ...Re8 and ...Kf8, the attack runs out of steam and you are simply a piece down. Check the four conditions **and** the three king moves before you sacrifice.",
          },
        ],
      },
    ],
  },
  // ─────────────────────────── 3. KING AND PAWN ENDGAMES ───────────────────────────
  {
    id: 'l3-kp-endgames',
    level: 3,
    title: 'King and pawn endgames',
    description:
      'The foundation of all endgames: the opposition, key squares, distant opposition, triangulation, the outside passed pawn and the pawn breakthrough.',
    lessons: [
      {
        id: 'l3-kp-opposition',
        title: 'The opposition and key squares',
        summary: 'Whether one pawn wins or draws depends on two simple ideas: key squares and the opposition.',
        estMinutes: 16,
        blocks: [
          {
            type: 'text',
            md:
              "Every endgame can turn into a king and pawn endgame after a few trades, so you must know these positions perfectly. The good news: two ideas explain almost all of them.\n\n" +
              "### Key squares\n\n" +
              "For every pawn there are **key squares**. If the attacking king reaches one of them, the pawn promotes, *no matter where the defending king is*.\n\n" +
              "- Pawn on the 2nd, 3rd or 4th rank: the three squares **two ranks in front** of it. For a pawn on e3: d5, e5 and f5.\n" +
              "- Pawn on the 5th or 6th rank: the three squares one rank in front **and** the three squares two ranks in front.\n" +
              "- Rook pawns are the exception: if the defending king reaches the corner in front of the pawn, it is always a draw.\n\n" +
              "So the attacker's job is to get his king to a key square, and the defender's job is to keep it out.",
          },
          {
            type: 'board',
            fen: 'k7/8/8/8/8/4P3/8/4K3 w - - 0 1',
            caption: 'The key squares of a pawn on e3 are d5, e5 and f5. A white king there wins, wherever the black king stands.',
            highlights: ['d5', 'e5', 'f5'],
          },
          {
            type: 'text',
            md:
              "### The opposition\n\n" +
              "Kings can never stand next to each other. When the two kings face each other on the same file (or rank) with **one square between them**, they are in **opposition**. The player who does *not* have to move \"has the opposition\": the other king must step aside and let him through.\n\n" +
              "**Rule of thumb:** the attacker wants to take the opposition to push the enemy king away from the key squares; the defender wants to take the opposition to keep the attacking king out.",
          },
          {
            type: 'board',
            fen: '8/8/4k3/8/4K3/4P3/8/8 b - - 0 1',
            caption: 'Direct opposition with Black to move: White has the opposition. Black must give way, and the white king walks to d5 or f5.',
            arrows: [['e4', 'd5'], ['e4', 'f5']],
            highlights: ['d5', 'e5', 'f5'],
          },
          {
            type: 'exercise',
            exercise: {
              id: 'l3-kp-opposition-ex1',
              prompt: 'White to move and win. Take the opposition.',
              fen: '8/8/4k3/8/8/3KP3/8/8 w - - 0 1',
              solution: ['Ke4'],
              hint: 'Put your king directly in front of the black king with one square between them.',
              explanation:
                "1.Ke4! takes the opposition: now Black must move his king aside. After 1...Kd6 2.Kf5 or 1...Kf6 2.Kd5, the white king stands on a key square and the pawn will promote. Pushing the pawn first (1.e4?) lets Black take the opposition himself and draw.",
            },
          },
          {
            type: 'exercise',
            exercise: {
              id: 'l3-kp-opposition-ex2',
              prompt: 'Black to move. Find the only move that draws.',
              fen: '8/8/4k3/8/3K4/4P3/8/8 b - - 0 1',
              solution: ['Kd6'],
              hint: 'The white king wants to reach d5, e5 or f5. Stand in its way.',
              explanation:
                "1...Kd6! takes the opposition and keeps the white king off d5 and e5. If White pushes the pawn, Black keeps facing the white king and retreats straight back in front of the pawn, reaching a drawn position. Every other move loses: 1...Kf5? 2.Kd5 or 1...Kd7? 2.Kd5 puts White's king on a key square.",
            },
          },
          {
            type: 'exercise',
            exercise: {
              id: 'l3-kp-opposition-ex3',
              prompt: 'White to move and win. Head straight for a key square.',
              fen: '8/3k4/8/8/2K5/4P3/8/8 w - - 0 1',
              solution: ['Kd5'],
              hint: 'The key squares of a pawn on e3 are d5, e5 and f5. One of them is within reach.',
              explanation:
                "1.Kd5! occupies a key square, and Black cannot dislodge the king. White will follow with e4 and e5 (or Ke5 first), always keeping the king in front of the pawn. Note that the pawn is far behind: in pawn endgames the king leads and the pawn follows.",
            },
          },
          {
            type: 'tip',
            title: 'King in front of the pawn',
            md:
              "When you are the attacker, keep your king **in front** of the pawn, not beside or behind it. When you defend, put your king **in front of the pawn** too, and retreat straight back as it advances. If the defending king reaches the square in front of the pawn with the right timing, the game ends in stalemate or a draw.",
          },
        ],
      },
      {
        id: 'l3-kp-distant',
        title: 'Distant opposition and triangulation',
        summary: 'Opposition works from far away too, and a king can "lose a move" by walking in a triangle.',
        estMinutes: 14,
        blocks: [
          {
            type: 'text',
            md:
              "### Distant opposition\n\n" +
              "Kings can also be in opposition from far away: on the same file with **three or five squares** between them (an odd number). This is the **distant opposition**. As the kings come closer, the player who holds the distant opposition can turn it into the direct opposition at the right moment.\n\n" +
              "A quick way to check: if the kings stand on the same file and the number of squares between them is odd, the player who just moved has the opposition.",
          },
          {
            type: 'board',
            fen: '8/3k4/8/8/8/3KP3/8/8 w - - 0 1',
            caption: 'Distant opposition: three squares between the kings and White to move, so Black holds the opposition.',
            highlights: ['d4', 'd5', 'd6'],
          },
          {
            type: 'exercise',
            exercise: {
              id: 'l3-kp-distant-ex1',
              prompt: 'Black to move. Only one move draws.',
              fen: '2k5/8/8/8/8/3KP3/8/8 b - - 0 1',
              solution: ['Kd7'],
              hint: 'Put your king on the same file as the white king with an odd number of squares between them.',
              explanation:
                "1...Kd7! takes the distant opposition (three squares between the kings). If 2.Ke4 Ke6 or 2.Kd4 Kd6, Black turns it into the direct opposition and keeps the white king away from d5, e5 and f5. Moves like 1...Kc7? 2.Ke4! or 1...Kd8? 2.Ke4! hand the opposition to White.",
            },
          },
          {
            type: 'exercise',
            exercise: {
              id: 'l3-kp-distant-ex2',
              prompt: 'Black to move. Save the game.',
              fen: '1k6/8/8/8/8/2K1P3/8/8 b - - 0 1',
              solution: ['Kc7'],
              hint: 'Face the white king from a distance on the same file.',
              explanation:
                "1...Kc7! holds the distant opposition. Whenever the white king steps forward, the black king answers by facing it again, and White never reaches a key square. The black king is also ready to step over to the e-file in front of the pawn.",
            },
          },
          {
            type: 'text',
            md:
              "### Triangulation: losing a move on purpose\n\n" +
              "Sometimes you reach a position that would win *if it were the opponent's move*. This is called **zugzwang**: the obligation to move is a disadvantage. If you could only pass, you would win!\n\n" +
              "You cannot pass in chess, but your king can *lose a tempo* by walking around **three squares in the shape of a triangle** and returning to the same square in three moves. If the enemy king has only two squares to shuffle between (because it must keep guarding something), it cannot copy you, and after your triangle the same position appears with the other side to move.\n\n" +
              "1. Notice that the position is a mutual zugzwang: whoever has to move is worse off.\n" +
              "2. Check whether your king has a triangle of safe squares near its current square.\n" +
              "3. Check whether the defending king is tied to two squares.\n" +
              "4. Walk the triangle and arrive back with the opponent to move.",
          },
          {
            type: 'tip',
            title: 'Spare pawn moves',
            md:
              "The simplest way to lose a tempo is a **spare pawn move**. In pawn endgames, do not rush your pawns forward: a pawn that can still move one or two squares is a reserve tempo you may need later to win the opposition. Triangulation is the king's way of doing the same thing when no pawn moves are left.",
          },
        ],
      },
      {
        id: 'l3-kp-passed',
        title: 'The outside passed pawn and the breakthrough',
        summary: 'A passed pawn far from the kings drags the enemy king away; three pawns against three can create a queen out of nothing.',
        estMinutes: 14,
        blocks: [
          {
            type: 'text',
            md:
              "### The outside passed pawn\n\n" +
              "An **outside passed pawn** is a passed pawn far away from the other pawns, usually on the a- or h-file. In a king and pawn endgame it is a huge advantage even if material is level, because it works as a **decoy**: the enemy king must run over to stop it, and meanwhile your king eats the pawns on the other wing.\n\n" +
              "This is why strong players count *passed pawns* and *pawn majorities* before they trade into a pawn endgame. Bobby Fischer was a master of this technique.",
          },
          {
            type: 'line',
            fen: '8/8/6pp/4k3/P5PP/4K3/8/8 w - - 0 1',
            moves: ['a5', 'Kd6', 'Kf4', 'Kc5', 'g5', 'hxg5+', 'Kxg5', 'Kb5', 'Kxg6', 'Kxa5', 'h5'],
            caption: 'The outside passed pawn decides.',
            notes: {
              1: 'The a-pawn runs. The black king must go after it.',
              3: 'Meanwhile the white king heads for the kingside pawns.',
              5: 'Trading creates a target on g6.',
              9: 'The white king takes the last black pawn.',
              11: 'Black has won the a-pawn, but White\'s h-pawn is far ahead and promotes first.',
            },
          },
          {
            type: 'exercise',
            exercise: {
              id: 'l3-kp-passed-ex1',
              prompt: 'White to move. Use your outside passed pawn as a decoy, then bring your king to the other wing.',
              fen: '8/8/6pp/4k3/P5PP/4K3/8/8 w - - 0 1',
              solution: ['a5', 'Kd6', 'Kf4'],
              hint: 'First the passed pawn moves; once the black king has to chase it, your king goes the other way.',
              explanation:
                "1.a5! forces the black king towards the queenside (1...Kd6 2.Kf4). While Black spends three or four moves rounding up the a-pawn, the white king attacks g6 and h6, wins them and promotes a kingside pawn long before Black can do anything.",
            },
          },
          {
            type: 'text',
            md:
              "### The pawn breakthrough\n\n" +
              "When three pawns face three pawns and the kings are far away, the side whose pawns are further advanced can often **break through** by sacrificing two pawns to create one unstoppable passed pawn. The classic pattern: pawns on a5, b5, c5 against a7, b7, c7.\n\n" +
              "1. **b6!** attacks both a7 and c7.\n" +
              "2. If 1...axb6, then **2.c6!** and after 2...bxc6 3.a6 the a-pawn runs through (or 2...b5 3.cxb7).\n" +
              "3. If 1...cxb6, then **2.a6!** bxa6 3.c6, and the c-pawn queens.\n\n" +
              "The middle pawn goes first, then the pawn on the side the opponent captured *towards*.",
          },
          {
            type: 'exercise',
            exercise: {
              id: 'l3-kp-passed-ex2',
              prompt: 'White to move and win. The black king is too far away to help.',
              fen: '8/ppp4k/8/PPP5/8/8/8/7K w - - 0 1',
              solution: ['b6', 'axb6', 'c6', 'bxc6', 'a6'],
              hint: 'Start with the middle pawn. Sacrifice two pawns to free the third.',
              explanation:
                "1.b6! axb6 2.c6! bxc6 3.a6, and nothing can stop the a-pawn from queening. After 1...cxb6, 2.a6! bxa6 3.c6 works the same way. Black's king on h7 is outside the square of the new passed pawn, which is why the breakthrough works.",
            },
          },
          {
            type: 'exercise',
            exercise: {
              id: 'l3-kp-passed-ex3',
              prompt: 'White to move and win: the same breakthrough on the kingside.',
              fen: 'k7/5ppp/8/5PPP/8/8/8/K7 w - - 0 1',
              solution: ['g6', 'hxg6', 'f6'],
              hint: 'Mirror the queenside pattern: the middle pawn first.',
              explanation:
                "1.g6! hxg6 (1...fxg6 2.h6! gxh6 3.f6) 2.f6! and White promotes: 2...gxf6 3.h6, or 2...gxh5 3.fxg7. The black king on a8 is miles away.",
            },
          },
        ],
      },
    ],
  },
  // ─────────────────────────── 4. ROOK ENDGAME ESSENTIALS ───────────────────────────
  {
    id: 'l3-rook-endgames',
    level: 3,
    title: 'Rook endgame essentials',
    description:
      'The most common endgames of all: the Lucena position (building a bridge), the Philidor defence, rooks behind passed pawns and cutting off the enemy king.',
    lessons: [
      {
        id: 'l3-rook-lucena',
        title: 'The Lucena position: building a bridge',
        summary: 'How to promote a pawn on the seventh rank when the enemy rook checks your king from behind.',
        estMinutes: 16,
        blocks: [
          {
            type: 'text',
            md:
              "Rook endgames are the most common endgames in practice: about half of all endgames contain rooks. Siegbert Tarrasch joked that \"all rook endgames are drawn\", and many are, which is exactly why you need to know the few key positions that *win* and the ones that *hold*.\n\n" +
              "### The Lucena position\n\n" +
              "White has a pawn on the seventh rank with the king in front of it on the queening square. The black king is **cut off** by at least one file, and the black rook waits to give checks. White's problem: when the king steps out, it gets checked, and there is no shelter.\n\n" +
              "The solution is called **building a bridge**: White puts the rook on the **fourth rank**, walks the king out, and when the checks come, the rook blocks them.",
          },
          {
            type: 'board',
            fen: '1K6/1P1k4/8/8/8/8/r7/2R5 w - - 0 1',
            caption: 'The Lucena position. The white king is stuck on b8: the rook on a2 controls the a-file, and the black king guards c7 and c8.',
            arrows: [['c1', 'c8']],
            highlights: ['b8', 'b7'],
          },
          {
            type: 'line',
            fen: '1K6/1P1k4/8/8/8/8/r7/2R5 w - - 0 1',
            moves: ['Rd1+', 'Ke7', 'Rd4', 'Rb2', 'Ka7', 'Ra2+', 'Kb6', 'Rb2+', 'Ka6', 'Ra2+', 'Kb5', 'Rb2+', 'Rb4'],
            caption: 'Building the bridge.',
            notes: {
              1: 'First push the black king one more file away, so it cannot come back to c7 or c8.',
              3: 'The key move: the rook goes to the fourth rank to prepare the bridge.',
              5: 'The king finally leaves the queening square. Black can only check.',
              7: 'The king approaches the rook, step by step.',
              11: 'Now the king stands on the fifth rank, next to the bridge square b4.',
              13: 'The bridge! The rook blocks the check, and nothing can stop b8=Q.',
            },
          },
          {
            type: 'exercise',
            exercise: {
              id: 'l3-rook-lucena-ex1',
              prompt: 'White to move. The king has walked out and Black keeps checking. Build the bridge.',
              fen: '8/1P2k3/8/1K6/3R4/8/1r6/8 w - - 0 1',
              solution: ['Rb4'],
              hint: 'Your rook is already on the fourth rank. Use it as a shield.',
              explanation:
                "1.Rb4! blocks the check and ends Black's hopes: the rook is protected by the king, the b8-square is covered, and the pawn queens next move. Without the rook on the fourth rank, Black would keep checking forever or win the pawn.",
            },
          },
          {
            type: 'text',
            md:
              "### Getting to the Lucena: cut the king off\n\n" +
              "The Lucena only wins because the defending king is **cut off** from the pawn. So, long before the pawn reaches the seventh rank, use your rook to put a wall between the enemy king and your pawn. As a rule of thumb, with a centre pawn a cut-off of **two files or more** usually wins; a cut-off of one file is often not enough.",
          },
          {
            type: 'exercise',
            exercise: {
              id: 'l3-rook-lucena-ex2',
              prompt: 'White to move. Keep the black king away from your pawn.',
              fen: '1r6/8/6k1/8/3P4/3K4/8/R7 w - - 0 1',
              solution: ['Rf1'],
              hint: 'Use your rook to build a wall along a file between the black king and the d-pawn.',
              explanation:
                "1.Rf1! cuts the black king off along the f-file, two files away from the pawn. White's king and pawn can now advance together, and the king can hide from checks in front of the pawn, eventually reaching a Lucena position. Lazy moves like 1.Re1? (cutting off by only one file) or checking with 1.Ra6+? let the black king come back in time to draw.",
            },
          },
        ],
      },
      {
        id: 'l3-rook-philidor',
        title: 'The Philidor defence',
        summary: 'How to draw with rook against rook and pawn: keep the rook on your third rank, then check from behind.',
        estMinutes: 15,
        blocks: [
          {
            type: 'text',
            md:
              "If the defending king reaches the square in front of the pawn, rook and pawn against rook is usually a draw, but only if you know how to defend. The method was published by François-André Danican Philidor in 1777.\n\n" +
              "### The two steps of the Philidor defence\n\n" +
              "1. **Third-rank defence.** Keep your king in front of the pawn and put your rook on your **third rank** (the sixth rank for Black). The enemy king cannot advance to that rank without walking into checks.\n" +
              "2. **Checks from behind.** When the attacker finally pushes the pawn onto your third rank, it no longer gives shelter to its own king. Now swing your rook to the **first rank** (Black's ...Ra1) and check the king from behind. It can never escape the checks.",
          },
          {
            type: 'board',
            fen: '4k3/7R/r7/3KP3/8/8/8/8 w - - 0 1',
            caption: 'The Philidor position. The black rook on the sixth rank keeps the white king off d6, e6 and f6.',
            arrows: [['a6', 'f6']],
            highlights: ['d6', 'e6', 'f6'],
          },
          {
            type: 'line',
            fen: 'r3k3/7R/8/3KP3/8/8/8/8 b - - 0 1',
            moves: ['Ra6', 'e6', 'Ra1', 'Kd6', 'Rd1+', 'Ke5', 'Re1+', 'Kf6', 'Rf1+', 'Ke5', 'Re1+'],
            caption: 'The Philidor defence in action.',
            notes: {
              1: 'Step one: the rook goes to the third rank and stops the white king advancing.',
              2: 'White pushes the pawn to make progress, but now the pawn can no longer shield its king.',
              3: 'Step two: the rook goes to the back of the board.',
              4: 'White threatens Rh8 mate.',
              5: 'Check from behind. The king cannot hide.',
              11: 'And so on. White can make no progress: a draw.',
            },
          },
          {
            type: 'exercise',
            exercise: {
              id: 'l3-rook-philidor-ex1',
              prompt: 'Black to move. White threatens Rh8 mate. Find the only drawing move.',
              fen: '4k3/7R/3KP3/8/8/8/8/2r5 b - - 0 1',
              solution: ['Rd1+'],
              hint: 'The pawn on e6 gives the white king no shelter. Check it from behind.',
              explanation:
                "1...Rd1+! starts the checks from behind. The king must leave d6 (2.Ke5 Re1+ or 2.Kc5 Rc1+, and so on), and the mate threat disappears. Passive moves lose: 1...Rf1? 2.Rh8+ Rf8 3.Rxf8+ and the pawn queens, while 1...Kf8? 2.e7+ is decisive.",
            },
          },
          {
            type: 'text',
            md:
              "### The passive rook\n\n" +
              "The most common mistake is to put the rook on the back rank next to the king and wait. Then the attacking king walks to the sixth rank, and the defender is helpless against threats of mate and promotion. Worse, a rook on the back rank can be hit by tactics.",
          },
          {
            type: 'exercise',
            exercise: {
              id: 'l3-rook-philidor-ex2',
              prompt: 'Black has defended passively with his rook on the back rank. White to move and win.',
              fen: '1r2k3/7R/8/3KP3/8/8/8/8 w - - 0 1',
              solution: ['Rh8+', 'Kf7', 'Rxb8'],
              hint: 'King and rook on the same rank: look for a skewer.',
              explanation:
                "1.Rh8+! is a skewer: the king must move off the eighth rank, and 2.Rxb8 wins the rook. Even without this tactic, the passive rook would lose after Kd6 or Ke6. The lesson: keep your rook active, on the third rank or far away behind the pawn.",
            },
          },
          {
            type: 'tip',
            title: 'Remember',
            md:
              "**Rook on the third rank until the pawn arrives there; then rook to the first rank and check from behind.** This one sentence saves countless half-points.",
          },
        ],
      },
      {
        id: 'l3-rook-active',
        title: 'Active rooks: behind passed pawns, cutting off the king',
        summary: "Tarrasch's rule and the power of the rook as a wall.",
        estMinutes: 14,
        blocks: [
          {
            type: 'text',
            md:
              "### Rooks belong behind passed pawns\n\n" +
              "**Tarrasch's rule:** rooks belong *behind* passed pawns, both your own and your opponent's.\n\n" +
              "- Behind **your own** passed pawn, the rook gets *more* active with every step the pawn takes, and it supports the pawn all the way to the queening square.\n" +
              "- In **front** of your passed pawn, the rook gets *less* active with every step and ends up boxed in on the queening square.\n" +
              "- Behind the **opponent's** passed pawn, your rook stops it while staying active; in front of it, your rook becomes a passive blockader.",
          },
          {
            type: 'board',
            fen: '6k1/5ppp/8/1P6/8/8/r4PPP/1R4K1 w - - 0 1',
            caption: "White's rook stands behind the passed b-pawn and pushes it forward. Black's rook is not behind the pawn, so it cannot stop it in time.",
            arrows: [['b1', 'b8']],
          },
          {
            type: 'exercise',
            exercise: {
              id: 'l3-rook-active-ex1',
              prompt: 'White to move. Make the most of your rook behind the passed pawn.',
              fen: '6k1/5ppp/8/1P6/8/8/r4PPP/1R4K1 w - - 0 1',
              solution: ['b6'],
              hint: 'Passed pawns must be pushed. Your rook supports the pawn all the way.',
              explanation:
                "1.b6! The pawn runs with the rook's support from behind: after 1...Ra8 2.b7 Rb8 the black rook is tied to the pawn forever, and if Black ignores it, b7 and b8=Q follow. Slow moves like 1.Kf1 allow 1...Ra8 and 2...Rb8, when Black's rook blockades in front of the pawn.",
            },
          },
          {
            type: 'text',
            md:
              "### Cutting off the king\n\n" +
              "A rook is a perfect **wall**. Placed on a file (or rank) between the enemy king and your pawn, it keeps the king out. Very often the side with the extra pawn wins *only* because the defending king is cut off, so use the rook for this job before you push the pawn.\n\n" +
              "When the enemy king is cut off, advance the pawn with your king in front of it, so your king can also serve as a shield against rook checks.",
          },
          {
            type: 'exercise',
            exercise: {
              id: 'l3-rook-active-ex2',
              prompt: 'White to move. Use your rook as a wall.',
              fen: '6r1/8/1k6/8/4P3/4K3/8/7R w - - 0 1',
              solution: ['Rc1'],
              hint: 'Which file keeps the black king two files away from your e-pawn?',
              explanation:
                "1.Rc1! cuts the black king off along the c-file. It can never cross to help against the e-pawn, and White wins by advancing king and pawn together. 1.Rd1? cuts off by only one file and is not enough, because the black king can still reach the pawn's path in time.",
            },
          },
        ],
      },
    ],
  },
  // ─────────────────────────── 5. OTHER ESSENTIAL ENDINGS ───────────────────────────
  {
    id: 'l3-essential-endings',
    level: 3,
    title: 'Other essential endings',
    description:
      'Queen against a pawn on the seventh rank (when it wins and when stalemate saves the defender) and the famous wrong-coloured bishop with a rook pawn.',
    lessons: [
      {
        id: 'l3-end-qvp',
        title: 'Queen against a pawn on the seventh',
        summary: 'With checks and pins, force the king in front of its pawn, then bring your king one step closer. Repeat.',
        estMinutes: 14,
        blocks: [
          {
            type: 'text',
            md:
              "You have promoted a queen, but your opponent's pawn has reached the seventh rank, supported by its king. Your own king is far away. Can the queen stop the pawn on her own?\n\n" +
              "Against a **centre pawn** (d or e) or a **knight pawn** (b or g), the answer is yes. The method is like walking down a staircase:\n\n" +
              "1. Use **checks** and **pins** to bring the queen closer, always keeping an eye on the queening square.\n" +
              "2. Force the defending king to step **in front of its own pawn** (onto the queening square).\n" +
              "3. Now the pawn is blocked, so you have one free move: bring your **king one step closer**.\n" +
              "4. Repeat until your king arrives and the pawn falls, or you give mate.",
          },
          {
            type: 'line',
            fen: '6KQ/8/8/8/8/8/3pk3/8 w - - 0 1',
            moves: ['Qh5+', 'Ke1', 'Qh1+', 'Ke2', 'Qe4+', 'Kf2', 'Qd3', 'Ke1', 'Qe3+', 'Kd1', 'Kf7'],
            caption: 'Queen against a d-pawn: the staircase.',
            notes: {
              1: 'Checks bring the queen closer with gain of time.',
              6: 'The king steps aside, so the pawn is no longer defended directly.',
              7: 'The queen attacks the pawn and controls d1. Black must protect it.',
              9: 'The key check: the only way to keep the pawn is to step in front of it.',
              10: 'The black king blocks its own pawn.',
              11: 'The free move: the white king comes one step closer. Then the whole process starts again.',
            },
          },
          {
            type: 'exercise',
            exercise: {
              id: 'l3-end-qvp-ex1',
              prompt: 'White to move. Force the black king in front of its pawn, then use the free move.',
              fen: '6K1/8/8/8/8/3Q4/3p4/4k3 w - - 0 1',
              solution: ['Qe3+', 'Kd1', 'Kf7'],
              hint: 'A check on e3 leaves the king only one way to protect the pawn. Then march your king diagonally towards the action.',
              explanation:
                "1.Qe3+! Kd1 forces the king onto the queening square, where it blocks its own pawn. That gives White a free move, and 2.Kf7! brings the king one step closer. Each repetition of this cycle gains another king move until the white king arrives and the pawn falls.",
            },
          },
          {
            type: 'exercise',
            exercise: {
              id: 'l3-end-qvp-ex2',
              prompt: 'The white king has arrived. White to move: mate in 3.',
              fen: '8/8/8/8/3K4/4Q3/3p4/3k4 w - - 0 1',
              goal: 'mate',
              solution: ['Kc3', 'Kc1', 'Qxd2+', 'Kb1', 'Qb2#'],
              hint: 'Bring the king next to the pawn. Watch out for stalemate!',
              explanation:
                "1.Kc3! attacks the pawn a second time and leaves Black only one move, 1...Kc1, because the queen covers e1 and e2. Then 2.Qxd2+ Kb1 3.Qb2# finishes the job. Always check that the defending king still has a legal move before you play a quiet move: stalemate is the defender's last hope.",
            },
          },
        ],
      },
      {
        id: 'l3-end-qvp-draw',
        title: 'Rook and bishop pawns: the stalemate defence',
        summary: 'Against a rook pawn or a bishop pawn on the seventh, the defender hides in the corner, and taking the pawn gives stalemate.',
        estMinutes: 14,
        blocks: [
          {
            type: 'text',
            md:
              "The staircase method fails against a **bishop pawn** (c or f) and a **rook pawn** (a or h), because the defender has a stalemate trick.\n\n" +
              "- **Bishop pawn:** when the queen forces the king in front of the pawn, the king does not go to c1; it goes to the corner, **a1**. If the queen takes the pawn on c2, it is **stalemate**. So White never gets the free move to bring the king closer.\n" +
              "- **Rook pawn:** the king simply sits on a1 in front of its pawn on a2. White has no time to bring the king closer, because any quiet move gives stalemate or lets the pawn promote.\n\n" +
              "So, as a rule, queen against a rook pawn or bishop pawn on the seventh is a **draw**, unless the attacking king is already close.",
          },
          {
            type: 'line',
            fen: '8/8/8/8/8/8/1kp5/6KQ w - - 0 1',
            moves: ['Qe4', 'Kb1', 'Qb4+', 'Ka2', 'Qc3', 'Kb1', 'Qb3+', 'Ka1', 'Qxc2'],
            caption: 'The stalemate trick against a bishop pawn.',
            notes: {
              1: 'The queen attacks the pawn. The king defends it.',
              3: 'Check, trying to force the king to c1 in front of the pawn.',
              7: 'Against a centre pawn this check would force the king in front of the pawn...',
              8: '...but here the king hides in the corner and leaves the pawn hanging!',
              9: 'Stalemate: the black king has no legal move. A draw.',
            },
          },
          {
            type: 'text',
            md:
              "### The exception: the attacking king is close\n\n" +
              "If the attacking king is already near the pawn, there is no time for stalemate tricks and the queen usually wins, often by mate. But even then you must be careful: with the defending king in the corner, many natural moves are stalemate.",
          },
          {
            type: 'exercise',
            exercise: {
              id: 'l3-end-qvp-draw-ex1',
              prompt: 'White to move: mate in 1. Careful: many moves here are stalemate.',
              fen: '8/8/8/8/8/1K6/p1Q5/k7 w - - 0 1',
              goal: 'mate',
              solution: ['Qc1#'],
              hint: 'Give check along the first rank. Your king already covers a2 and b2.',
              explanation:
                "1.Qc1# (1.Qb2# and 1.Qxa2# also mate). The black king has no squares because the white king covers a2 and b2. But a move like 1.Kb4?? or 1.Kc3?? would be stalemate: Black would have no legal move at all.",
            },
          },
          {
            type: 'exercise',
            exercise: {
              id: 'l3-end-qvp-draw-ex2',
              prompt: 'The white king is close, so the bishop pawn loses. White to move: mate in 2.',
              fen: '8/8/8/8/8/1K6/2p1Q3/1k6 w - - 0 1',
              goal: 'mate',
              solution: ['Qxc2+', 'Ka1', 'Qc1#'],
              hint: 'With your king on b3, taking the pawn is no longer stalemate. Take it with check.',
              explanation:
                "1.Qxc2+ Ka1 2.Qc1#. Compare with the stalemate trick: there, 1.Qxc2 left the king in the corner without a move. Here the capture comes with check, and the white king on b3 covers a2 and b2, so the corner becomes a mating net.",
            },
          },
          {
            type: 'tip',
            title: 'Remember the files',
            md:
              "Centre and knight pawns on the seventh: **the queen wins**. Rook and bishop pawns on the seventh: **usually a draw**, unless the attacking king is close. When you are the one racing a pawn to promotion, it can be worth knowing which pawn you have!",
          },
        ],
      },
      {
        id: 'l3-end-wrongbishop',
        title: 'The wrong-coloured bishop',
        summary: 'Bishop and rook pawn against a lone king: a draw if the bishop cannot control the queening square.',
        estMinutes: 12,
        blocks: [
          {
            type: 'text',
            md:
              "A bishop and a pawn against a bare king should be easy to win... except with a **rook pawn**. If the bishop does **not** control the queening square, and the defending king reaches that corner, it is a draw. You can never drive the king out of the corner: the bishop cannot attack it there, and if you try too hard, it is stalemate.\n\n" +
              "- With an **h-pawn**, the queening square h8 is a dark square: a **light-squared** bishop is the wrong one.\n" +
              "- With an **a-pawn**, a8 is a light square: a **dark-squared** bishop is the wrong one.\n\n" +
              "So the defender's plan is simple: **run to the corner**. The attacker's plan: keep the king out of the corner, with the king or the bishop.",
          },
          {
            type: 'board',
            fen: '7k/8/8/7P/8/3B4/8/6K1 w - - 0 1',
            caption: 'A draw, even with an extra bishop and pawn: the light-squared bishop can never control h8, and the black king will never leave the corner.',
            highlights: ['h8'],
          },
          {
            type: 'exercise',
            exercise: {
              id: 'l3-end-wrongbishop-ex1',
              prompt: 'Black to move. Find the only drawing move.',
              fen: '8/8/4k3/7P/5K2/3B4/8/8 b - - 0 1',
              solution: ['Kf7'],
              hint: 'Your king belongs in one particular corner. Take the shortest road.',
              explanation:
                "1...Kf7! heads for g7 and h8. Once the king reaches the corner, White can never force it out, because the light-squared bishop cannot control h8. Any slower move lets White's king or pawn cut the black king off from the corner, and then the pawn promotes.",
            },
          },
          {
            type: 'exercise',
            exercise: {
              id: 'l3-end-wrongbishop-ex2',
              prompt: 'White to move and win. The black king wants to run to h8.',
              fen: '4k3/8/3K4/7P/8/3B4/8/8 w - - 0 1',
              solution: ['Bc4'],
              hint: 'Your bishop cannot guard h8, but it can guard the squares the king must cross to get there.',
              explanation:
                "1.Bc4! takes f7 and g8 away from the black king. Black's road to the corner is blocked, so the white king has time to come to f7 or g7 and the h-pawn walks through. If the black king reaches h8 or g8, it is a draw.",
            },
          },
          {
            type: 'tip',
            title: 'Before you trade',
            md:
              "When you are a piece and a rook pawn up, think twice before trading everything else. If you are left with the wrong-coloured bishop and the enemy king can reach the corner, your whole extra piece is worth nothing. As the defender, this is a draw to aim for: **trade pawns until only the rook pawn is left**.",
          },
        ],
      },
    ],
  },
]
