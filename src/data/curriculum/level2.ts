import type { Module } from '../types.ts'

/** Trim every line so the markdown below can be indented with the code. */
const md = (s: string): string =>
  s
    .trim()
    .split('\n')
    .map((line) => line.trim())
    .join('\n')

const START = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'

// ---------------------------------------------------------------------------
// Module 1 · Opening principles
// ---------------------------------------------------------------------------

const openingModule: Module = {
  id: 'l2-opening-principles',
  level: 2,
  title: 'Opening Principles',
  description: 'How to start a game well: control the centre, develop your pieces, castle early and keep your queen safe.',
  lessons: [
    {
      id: 'l2-op-centre',
      title: 'Fight for the centre',
      summary: 'The four middle squares are the most valuable real estate on the board.',
      estMinutes: 8,
      blocks: [
        {
          type: 'text',
          md: md(`
            Welcome to Level 2! You know how the pieces move and how to win a game. Now we start learning how to **play well**, and that begins with the first few moves.

            You do not need to memorise long opening lines yet. Instead, you will learn a handful of **opening principles**: simple rules that tell you what a good move looks like. Strong players follow them almost without thinking.

            The first principle: **fight for the centre**.
          `),
        },
        {
          type: 'board',
          fen: START,
          highlights: ['d4', 'e4', 'd5', 'e5'],
          caption: 'The centre: d4, e4, d5 and e5. Whoever controls these squares usually controls the game.',
        },
        {
          type: 'text',
          md: md(`
            ### Why the centre matters

            - Pieces in the centre **reach more squares**. They can quickly swing to either side of the board, to attack or to defend.
            - Pieces on the edge are slow and see very little.
            - Pawns in the centre **take squares away** from enemy pieces and give your own pieces safe homes behind them.

            Look at how much more a knight does in the middle than in the corner.
          `),
        },
        {
          type: 'board',
          fen: '8/8/8/8/4N3/8/8/N7 w - - 0 1',
          highlights: ['c3', 'c5', 'd2', 'd6', 'f2', 'f6', 'g3', 'g5', 'b3', 'c2'],
          caption: 'The knight on e4 attacks 8 squares. The knight in the corner on a1 attacks only 2. "A knight on the rim is dim!"',
        },
        {
          type: 'line',
          moves: ['e4', 'e5', 'Nf3', 'Nc6', 'd4', 'exd4', 'Nxd4'],
          caption: 'Both sides fight for the centre from move one.',
          notes: {
            1: 'A great first move. The pawn takes the centre and opens lines for the queen and the light-squared bishop.',
            2: 'Black answers in the same way and stakes a claim to the centre too.',
            3: 'The knight develops towards the centre and attacks the e5-pawn.',
            4: 'Black defends e5 with a knight, also developing towards the centre.',
            5: 'White strikes at the centre with a second pawn.',
            6: 'Black captures.',
            7: 'White recaptures with the knight, which now sits proudly in the centre.',
          },
        },
        {
          type: 'tip',
          title: 'Rule of thumb',
          md: md(`
            **Start with a centre pawn.** 1.e4 or 1.d4 (and for Black, ...e5 or ...d5) is never a bad way to begin. Then bring out your knights towards the centre: f3 and c3 for White, f6 and c6 for Black.
          `),
        },
        {
          type: 'exercise',
          exercise: {
            id: 'l2-op-centre-ex1',
            prompt: 'White opened with 1.d4 and Black replied 1...e5, offering a centre pawn. White to move: take it!',
            fen: 'rnbqkbnr/pppp1ppp/8/4p3/3P4/8/PPP1PPPP/RNBQKBNR w KQkq - 0 2',
            solution: ['dxe5'],
            hint: 'Your d4-pawn attacks e5, and nothing defends it.',
            explanation: 'dxe5 wins a pawn for free. Black hoped to grab space in the centre, but the pawn on e5 was simply undefended. Always check whether a central pawn can be taken!',
          },
        },
        {
          type: 'exercise',
          exercise: {
            id: 'l2-op-centre-ex2',
            prompt: 'After 1.e4 d5, Black attacks your e4-pawn. White to move: what is the best answer?',
            fen: 'rnbqkbnr/ppp1pppp/8/3p4/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2',
            solution: ['exd5'],
            hint: 'Pawns capture diagonally. Can your e-pawn take something?',
            explanation: 'exd5 wins a central pawn. Black will usually win it back, but only by bringing the queen out early or spending extra moves, and that gives you time to develop.',
          },
        },
        {
          type: 'exercise',
          exercise: {
            id: 'l2-op-centre-ex3',
            prompt: 'Black has just given up a knight with 4...Nxe4 5.Nxe4. Black to move: win the piece back with a central pawn.',
            fen: 'r1bqkb1r/pppp1ppp/2n5/4p3/2B1N3/5N2/PPPP1PPP/R1BQK2R b KQkq - 0 5',
            solution: ['d5'],
            hint: 'One pawn move attacks two white pieces at once.',
            explanation: '...d5! is a **pawn fork**: the pawn attacks both the bishop on c4 and the knight on e4. White can only save one, so Black wins the piece back and has a strong pawn centre. This trick is called the **centre fork**.',
          },
        },
      ],
    },
    {
      id: 'l2-op-develop',
      title: 'Develop your pieces',
      summary: 'Knights and bishops out early, and each piece moves once.',
      estMinutes: 9,
      blocks: [
        {
          type: 'text',
          md: md(`
            At the start, your knights and bishops are stuck on the back rank, doing nothing. **Developing** a piece means moving it to a square where it is active.

            The opening is a race. The player who brings more pieces into play is usually the one who can attack first.

            ### The development rules

            1. **Knights before bishops.** You usually know where a knight belongs (f3, c3, f6, c6) before you know the best square for a bishop.
            2. **Move each piece once.** Moving the same piece twice in the opening wastes time, unless you are winning something or must escape an attack.
            3. **Do not grab pawns with pieces you have not finished developing.** Being greedy often costs you the game.
            4. **Get all your minor pieces off the back rank** before starting an attack.
          `),
        },
        {
          type: 'board',
          fen: 'r1bqk1nr/pppp1ppp/2n5/2b1p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',
          arrows: [['f3', 'e5'], ['c6', 'd4'], ['c4', 'f7'], ['c5', 'f2']],
          caption: 'After 1.e4 e5 2.Nf3 Nc6 3.Bc4 Bc5: each side has developed two pieces to active squares that aim at the centre and at the enemy king.',
        },
        {
          type: 'line',
          moves: ['e4', 'e5', 'Nf3', 'Nc6', 'Bc4', 'Bc5', 'c3', 'Nf6', 'd3', 'd6', 'O-O', 'O-O', 'Re1', 'a6', 'Nbd2', 'Ba7'],
          caption: 'A model opening: the Italian Game, played calmly by both sides.',
          notes: {
            1: 'Centre pawn first.',
            3: 'Knight towards the centre, attacking e5.',
            4: 'Black defends with a developing move.',
            5: 'The bishop aims at f7, the weakest point near Black\'s king (only the king defends it).',
            6: 'Black mirrors White and aims at f2.',
            7: 'A quiet pawn move that prepares d4 later to build a big centre.',
            8: 'Another knight comes out and attacks e4.',
            9: 'White defends e4 and opens a diagonal for the dark-squared bishop.',
            11: 'White castles: the king is safe and the rook comes towards the centre.',
            12: 'Black castles too.',
            13: 'The rook goes to e1, the file where the centre pawn stands.',
            14: 'A useful little move: it gives the bishop a retreat square on a7, so it cannot be chased by ...b5 or Na4 ideas.',
            15: 'White\'s last knight joins the game. Every minor piece has now moved, and almost always only once.',
            16: 'Both sides have finished their development and can start making plans. This is what a healthy opening looks like.',
          },
        },
        {
          type: 'tip',
          title: 'Count your developed pieces',
          md: md(`
            Every few moves, count how many pieces each side has developed. If your opponent has four pieces out and you have one, stop everything else and **develop**.
          `),
        },
        {
          type: 'text',
          md: md(`
            ### What goes wrong: grabbing a pawn

            In the next line White's knight has already moved once and moves again to grab a pawn. It looks free, but Black's queen punishes the greed at once.
          `),
        },
        {
          type: 'line',
          moves: ['e4', 'e5', 'Nf3', 'Nc6', 'Bc4', 'Nd4', 'Nxe5', 'Qg5', 'Nxf7', 'Qxg2', 'Rf1', 'Qxe4+', 'Be2', 'Nf3#'],
          caption: 'The Blackburne Shilling trap: a greedy knight leads to disaster.',
          notes: {
            6: 'Black moves the knight a second time. It is a trick: the e5-pawn is now undefended.',
            7: 'White grabs the pawn with a knight that has already moved. Greedy!',
            8: 'The queen attacks the knight on e5 AND the pawn on g2.',
            9: 'White gets greedier still and takes on f7, forking the queen and rook.',
            10: 'The queen takes on g2 and attacks the rook on h1.',
            12: 'Check! The queen joins the knight on d4.',
            13: 'The only way to block the check.',
            14: 'Smothered! The knight gives checkmate, because White\'s own pieces block every escape square.',
          },
        },
        {
          type: 'exercise',
          exercise: {
            id: 'l2-op-develop-ex1',
            prompt: 'After 1.e4 e5 2.Nf3 Nc6, White has moved the same knight again with 3.Ng5?. Black to move: punish it.',
            fen: 'r1bqkbnr/pppp1ppp/2n5/4p1N1/4P3/8/PPPP1PPP/RNBQKB1R b KQkq - 3 3',
            solution: ['Qxg5'],
            hint: 'Is the knight on g5 defended? Which of your pieces can reach it?',
            explanation: 'Qxg5 simply wins a knight. Moving a piece twice without a good reason is bad enough, but here it also left the knight undefended. Always ask: "Is the piece my opponent just moved safe?"',
          },
        },
        {
          type: 'exercise',
          exercise: {
            id: 'l2-op-develop-ex2',
            prompt: 'White has just played 4.Nxe5?, grabbing a pawn. Black to move: find the queen move that hits two targets.',
            fen: 'r1bqkbnr/pppp1ppp/8/4N3/2BnP3/8/PPPP1PPP/RNBQK2R b KQkq - 0 4',
            solution: ['Qg5'],
            hint: 'Find a square where the queen attacks the knight on e5 and the pawn in front of White\'s king.',
            explanation: '...Qg5! attacks the knight on e5 and the pawn on g2 at the same time. If White saves the knight, ...Qxg2 hits the rook on h1 and White\'s position falls apart.',
          },
        },
        {
          type: 'exercise',
          exercise: {
            id: 'l2-op-develop-ex3',
            prompt: 'The trap has worked. Black to move: give checkmate in one.',
            fen: 'r1b1kbnr/pppp1Npp/8/8/3nq3/8/PPPPBP1P/RNBQKR2 b Qkq - 1 7',
            goal: 'mate',
            solution: ['Nf3#'],
            hint: 'The white king is surrounded by its own pieces. A knight check cannot be blocked.',
            explanation: '...Nf3# is a **smothered mate**. The king on e1 cannot move because its own queen, bishop, rook and pawns block every square, and the knight\'s check cannot be blocked.',
          },
        },
      ],
    },
    {
      id: 'l2-op-queen',
      title: 'Keep your queen at home',
      summary: 'Bringing the queen out early gives your opponent free moves.',
      estMinutes: 7,
      blocks: [
        {
          type: 'text',
          md: md(`
            The queen is your strongest piece, so it is tempting to bring her out straight away and start attacking. Usually this is a mistake.

            ### Why an early queen is a problem

            - The queen is worth so much that she must run away from **any** attack, even from a pawn or a knight.
            - Every time she runs, your opponent develops a new piece **with a threat**, and you have wasted a move.
            - After a few moves your opponent is fully developed and you have only a queen out.

            The queen works best **after** the minor pieces have prepared the way.
          `),
        },
        {
          type: 'line',
          moves: ['e4', 'e5', 'Qh5', 'Nc6', 'Bc4', 'g6', 'Qf3', 'Nf6', 'Qb3', 'Nd4'],
          caption: 'An early queen attack, and how Black turns it around.',
          notes: {
            3: 'The queen comes out early. She attacks e5 and, together with a bishop, could threaten f7.',
            4: 'Black calmly defends e5 and develops.',
            5: 'Now White threatens Qxf7# (Scholar\'s mate).',
            6: 'Black blocks the queen\'s path to f7. The queen is attacked and must move again.',
            7: 'Again the threat is mate on f7.',
            8: 'Black develops and blocks the f-file. White has moved the queen twice; Black has developed two pieces.',
            9: 'The queen moves for the third time, now attacking f7 from b3.',
            10: 'Developing with a threat: the knight attacks the queen and eyes c2, where it would fork king and rook. White\'s queen has made four moves and achieved nothing.',
          },
        },
        {
          type: 'tip',
          title: 'Defending against Scholar\'s mate',
          md: md(`
            When a queen and bishop both aim at f7 (or f2), the threat is checkmate. Defend with ...g6 when the queen is on h5, or ...Nf6 when the queen is on f3. Then **develop with threats** and chase the queen around.
          `),
        },
        {
          type: 'exercise',
          exercise: {
            id: 'l2-op-queen-ex3',
            prompt: 'After 1.e4 d5 2.exd5 Qxd5, Black\'s queen is already in the middle of the board. White to move: develop a piece with a threat.',
            fen: 'rnb1kbnr/ppp1pppp/8/3q4/8/8/PPPP1PPP/RNBQKBNR w KQkq - 0 3',
            solution: ['Nc3'],
            hint: 'Which developing move attacks the queen on d5?',
            explanation: 'Nc3! develops a knight towards the centre **and** attacks the queen, so Black must spend another move running away. You gain a free move of development. This is exactly why the queen should not come out too early.',
          },
        },
        {
          type: 'exercise',
          exercise: {
            id: 'l2-op-queen-ex1',
            prompt: 'After 1.e4 e5 2.Bc4 Nc6 3.Qh5, Black attacked the queen with 3...Nf6?? and ignored White\'s threat. White to move: show what goes wrong.',
            fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 4 4',
            goal: 'mate',
            solution: ['Qxf7#'],
            hint: 'The queen and bishop both aim at the same weak square next to the black king.',
            explanation: 'Qxf7# is **Scholar\'s mate**. The queen is protected by the bishop, so the king cannot take her. Black should have defended f7 first with 3...g6 or 3...Qe7. Always check what your opponent is threatening before you make your own plans!',
          },
        },
        {
          type: 'exercise',
          exercise: {
            id: 'l2-op-queen-ex2',
            prompt: 'White\'s queen has come out early and moved again with 5.Qb3. Black to move: develop with a big threat.',
            fen: 'r1bqkb1r/pppp1p1p/2n2np1/4p3/2B1P3/1Q6/PPPP1PPP/RNB1K1NR b KQkq - 3 5',
            solution: ['Nd4'],
            hint: 'One knight move attacks the queen and threatens a fork on c2.',
            explanation: '...Nd4! attacks the queen, and the knight also eyes c2, where ...Nxc2+ would fork the king and the rook on a1. If White grabs a pawn with Bxf7+, Black takes the queen with ...Nxb3. The early queen has been chased all over the board.',
          },
        },
      ],
    },
    {
      id: 'l2-op-castle',
      title: 'Castle early and connect your rooks',
      summary: 'A king in the centre is a target. Castle, then link your rooks.',
      estMinutes: 9,
      blocks: [
        {
          type: 'text',
          md: md(`
            In the middle of the board, the king is exposed. As soon as the centre opens up, enemy rooks and queens can attack it along the open files.

            **Castling** solves two problems in one move:

            - It tucks the king away behind a wall of pawns.
            - It brings a rook towards the centre, where it can join the fight.

            A good target is to castle **within the first 10 moves**. To make it possible, develop the knight and bishop on the side where you want to castle.
          `),
        },
        {
          type: 'text',
          md: md(`
            ### Connect your rooks

            After castling, move your queen off the back rank and finish developing. When nothing stands between your two rooks, they **protect each other**: we say the rooks are **connected**. Connected rooks are the sign that your opening is complete.
          `),
        },
        {
          type: 'board',
          fen: 'r2q1rk1/bpp2pp1/p1npbn1p/4p3/4P3/1BPP1N2/PP3PPP/R1BQRNK1 w - - 0 11',
          arrows: [['f8', 'e8'], ['a8', 'b8']],
          caption: 'Black has castled and developed every minor piece. Once the queen moves, the rooks on a8 and f8 will be connected.',
        },
        {
          type: 'text',
          md: md(`
            ### What goes wrong: a king stuck in the centre

            In the next two games one side ignores king safety. Watch how quickly the punishment arrives along the e-file and on f7.
          `),
        },
        {
          type: 'line',
          moves: ['e4', 'e5', 'Nf3', 'Nf6', 'Nxe5', 'Nxe4', 'Qe2', 'Nf6', 'Nc6+'],
          caption: 'A trap on the e-file.',
          notes: {
            5: 'White takes a pawn.',
            6: 'Black copies, but this is careless with the king still on e8.',
            7: 'The queen goes to the open e-file and attacks the knight.',
            8: 'Black saves the knight, but forgets about the king.',
            9: 'Discovered check! The knight moves out of the way, the queen gives check on the e-file, and the knight attacks Black\'s queen. Black loses the queen.',
          },
        },
        {
          type: 'line',
          moves: ['e4', 'e5', 'Nf3', 'd6', 'Bc4', 'Bg4', 'Nc3', 'g6', 'Nxe5', 'Bxd1', 'Bxf7+', 'Ke7', 'Nd5#'],
          caption: 'Légal\'s mate: one of the oldest traps in chess.',
          notes: {
            6: 'The bishop pins the knight to the queen... or does it?',
            8: 'Black makes a slow pawn move instead of developing.',
            9: 'White offers the queen! The knight was never really pinned, because the queen is not the king.',
            10: 'Black greedily takes the queen.',
            11: 'Check! The king cannot take on f7 because the knight on e5 defends it.',
            12: 'The only move.',
            13: 'Checkmate with just three minor pieces. Black\'s undeveloped army watches helplessly.',
          },
        },
        {
          type: 'tip',
          title: 'The opening checklist',
          md: md(`
            1. Put a pawn in the centre.
            2. Develop knights, then bishops, towards the centre.
            3. Castle early.
            4. Move each piece once, unless there is a good reason.
            5. Keep the queen home until the minor pieces are out.
            6. Connect your rooks.

            And above all: **check what your opponent threatens** after every move.
          `),
        },
        {
          type: 'exercise',
          exercise: {
            id: 'l2-op-castle-ex1',
            prompt: 'Black\'s king and queen are both still on the e-file. White to move: win the black queen.',
            fen: 'rnbqkb1r/pppp1ppp/5n2/4N3/8/8/PPPPQPPP/RNB1KB1R w KQkq - 2 5',
            solution: ['Nc6+', 'Be7', 'Nxd8'],
            hint: 'Move the knight out of the queen\'s way with a discovered check, and make the knight attack something big at the same time.',
            explanation: 'Nc6+! is a **discovered check**: the white queen checks the king along the e-file while the knight attacks the queen on d8. Black must deal with the check, and then Nxd8 wins the queen. That is the price of leaving the king in the centre.',
          },
        },
        {
          type: 'exercise',
          exercise: {
            id: 'l2-op-castle-ex2',
            prompt: 'Black has just taken your queen with 5...Bxd1. White to move: checkmate in two moves.',
            fen: 'rn1qkbnr/ppp2p1p/3p2p1/4N3/2B1P3/2N5/PPPP1PPP/R1BbK2R w KQkq - 0 6',
            goal: 'mate',
            solution: ['Bxf7+', 'Ke7', 'Nd5#'],
            hint: 'Start with a check on f7. Your knight on e5 protects that square.',
            explanation: 'Bxf7+ Ke7 Nd5# is **Légal\'s mate**. The bishop and the e5-knight drive the king out, and the second knight seals every escape square. Black\'s pieces are still asleep on the back rank.',
          },
        },
      ],
    },
  ],
}


// ---------------------------------------------------------------------------
// Module 2 · Don't hang your pieces
// ---------------------------------------------------------------------------

const safetyModule: Module = {
  id: 'l2-safety',
  level: 2,
  title: 'Don\'t Hang Your Pieces',
  description: 'Stop giving away material: spot loose pieces, count attackers and defenders, and run a quick blunder check before every move.',
  lessons: [
    {
      id: 'l2-safe-hanging',
      title: 'What is a hanging piece?',
      summary: 'A piece that can be taken for free is "hanging". Learn to see them, yours and your opponent\'s.',
      estMinutes: 7,
      blocks: [
        {
          type: 'text',
          md: md(`
            Most games between beginners are not decided by clever plans. They are decided by **pieces left for free**. A piece that can be captured without anything being given back is called a **hanging** piece (or an *undefended* or *loose* piece).

            If you simply stop hanging pieces, and start taking the ones your opponent hangs, you will win far more games. It really is that simple, and that hard!

            ### First, know what things are worth

            - Pawn = **1**
            - Knight = **3**
            - Bishop = **3**
            - Rook = **5**
            - Queen = **9**
            - King = priceless (you can never trade it)
          `),
        },
        {
          type: 'board',
          fen: 'r1r3k1/pp2qppp/5n2/8/3b4/2N5/PP3PPP/R2Q1RK1 w - - 0 1',
          arrows: [['d1', 'd4']],
          highlights: ['d4'],
          caption: 'Black\'s bishop on d4 is attacked by the white queen, and no black piece protects it. It is hanging.',
        },
        {
          type: 'text',
          md: md(`
            ### How to spot a hanging piece

            For every enemy piece, ask two questions:

            1. **Is it attacked?** Can one of my pieces capture it?
            2. **Is it defended?** If I capture, can my opponent capture back?

            If the answers are "yes" and "no", the piece is hanging: take it! Do the same check for **your own** pieces, so your opponent never gets the chance.
          `),
        },
        {
          type: 'tip',
          title: 'Loose pieces drop off',
          md: md(`
            Strong players have a saying: **"Loose pieces drop off."** A piece with no defender is a target, even if nothing attacks it yet. When you can, keep your pieces protected by a pawn or another piece.
          `),
        },
        {
          type: 'exercise',
          exercise: {
            id: 'l2-safe-hanging-ex1',
            prompt: 'Black has just put a bishop on d4. Is it safe? White to move.',
            fen: 'r1r3k1/pp2qppp/5n2/8/3b4/2N5/PP3PPP/R2Q1RK1 w - - 0 1',
            solution: ['Qxd4'],
            hint: 'Ask the two questions about the bishop on d4: is it attacked, and is it defended?',
            explanation: 'Qxd4 wins a whole bishop. Nothing defends d4: the knight on f6 and the queen on e7 do not reach it. Free material is the easiest way to win a game.',
          },
        },
        {
          type: 'exercise',
          exercise: {
            id: 'l2-safe-hanging-ex2',
            prompt: 'White\'s knight has jumped into e5. Black to move: find the free piece.',
            fen: 'r4rk1/pbq2ppp/1p2pn2/4N3/2B5/8/PP3PPP/R2Q1RK1 b - - 0 1',
            solution: ['Qxe5'],
            hint: 'Which white piece is attacked by your queen? Does anything protect it?',
            explanation: '...Qxe5 wins a knight for nothing. A knight in the centre looks scary, but with no pawn or piece behind it, it is just a loose piece waiting to be taken.',
          },
        },
      ],
    },
    {
      id: 'l2-safe-count',
      title: 'Count attackers and defenders',
      summary: 'When a piece is defended, count who can capture on that square, and capture with your cheapest piece first.',
      estMinutes: 9,
      blocks: [
        {
          type: 'text',
          md: md(`
            Often a piece is attacked **and** defended. Can you still win it? You find out by **counting**.

            - Count how many of your pieces **attack** the square.
            - Count how many enemy pieces **defend** it.
            - If you have **more attackers than they have defenders**, you can usually win something.

            But the order matters too. Every capture is a trade, so think about the **value** of what you give and what you get.
          `),
        },
        {
          type: 'board',
          fen: '5rk1/ppp2ppp/2n5/4p3/8/3B1N2/PPP2PPP/4R1K1 w - - 0 1',
          arrows: [['f3', 'e5'], ['e1', 'e5'], ['c6', 'e5']],
          highlights: ['e5'],
          caption: 'The pawn on e5 is attacked twice (knight and rook) and defended once (knight). Two attackers beat one defender.',
        },
        {
          type: 'line',
          fen: '5rk1/ppp2ppp/2n5/4p3/8/3B1N2/PPP2PPP/4R1K1 w - - 0 1',
          moves: ['Nxe5', 'Nxe5', 'Rxe5'],
          caption: 'Capturing in the right order: cheapest piece first.',
          notes: {
            1: 'White starts with the knight, the cheaper of the two attackers. So far White has won a pawn.',
            2: 'Black recaptures: knight for knight.',
            3: 'The rook takes last. White has won a pawn and nothing can take back. If White had started with the rook, Black would win the rook for a knight!',
          },
        },
        {
          type: 'tip',
          title: 'Rule of thumb',
          md: md(`
            **Capture with your least valuable piece first.** Pawns before minor pieces, minor pieces before rooks, rooks before the queen. And remember: if the enemy piece is worth **more** than the piece you capture with, taking it is good even if it is defended. A pawn may always take a defended knight!
          `),
        },
        {
          type: 'exercise',
          exercise: {
            id: 'l2-safe-count-ex1',
            prompt: 'Black\'s bishop on e5 is defended by the knight on c6. Count, then win material. White to move.',
            fen: '5rk1/ppp2ppp/2n5/4b3/8/3B1N2/PPP2PPP/4R1K1 w - - 0 1',
            solution: ['Nxe5'],
            hint: 'You have two attackers against one defender. Which of your attackers is cheaper?',
            explanation: 'Nxe5! takes with the cheaper attacker. If ...Nxe5 Rxe5, White has won a bishop. Starting with Rxe5? would be a mistake: after ...Nxe5 Nxe5 you have given a rook (5) for a bishop and a knight, and wasted most of your advantage.',
          },
        },
        {
          type: 'exercise',
          exercise: {
            id: 'l2-safe-count-ex2',
            prompt: 'Black\'s knight on e5 attacks your bishop and your knight. It is defended by a pawn. White to move: what should you do?',
            fen: '3q1rk1/pppb1ppp/3p4/4n3/2BP4/2P2N2/PP3PPP/3Q1RK1 w - - 0 1',
            solution: ['dxe5'],
            hint: 'Something cheap can capture the knight. Does it matter that the knight is defended?',
            explanation: 'dxe5! A pawn is worth 1 and a knight is worth 3. Even after ...dxe5, White has traded a pawn for a knight and is up two points. Nxe5? dxe5 would only be an even trade, knight for knight.',
          },
        },
      ],
    },
    {
      id: 'l2-safe-threats',
      title: 'What does my opponent threaten?',
      summary: 'Before you think about your own plans, ask what your opponent\'s last move is trying to do.',
      estMinutes: 8,
      blocks: [
        {
          type: 'text',
          md: md(`
            Here is the most important habit in chess: **after every move your opponent makes, ask "What does that move want?"**

            A move can:

            - **attack** one of your pieces,
            - threaten a **check** or a **checkmate**,
            - set up a **fork** or another trick,
            - or open a line for another piece.

            Beginners often look only at their own ideas, and then lose a piece to a threat that was obvious one move earlier. Do not let that be you!
          `),
        },
        {
          type: 'line',
          moves: ['e4', 'e5', 'Nf3', 'Nc6', 'Bc4', 'Nf6', 'Ng5', 'd5', 'exd5', 'Na5'],
          caption: 'Spotting a threat in a real opening.',
          notes: {
            7: 'What does this move want? The knight and the bishop both attack f7. White threatens Nxf7, forking Black\'s queen and rook.',
            8: 'Black sees the threat and blocks the bishop\'s path to f7 with a pawn, while also hitting e4.',
            9: 'White takes the pawn, and the bishop\'s line to f7 is closed for now.',
            10: 'Black chases the bishop away from f7 by attacking it. Every move is a question and an answer.',
          },
        },
        {
          type: 'text',
          md: md(`
            ### When one of your pieces is attacked

            You have four ways to answer:

            1. **Capture the attacker**, if it is safe to do so. Often the best answer!
            2. **Move the piece** to a *safe square*: one that no enemy piece attacks.
            3. **Defend it**, if the trade would be fair.
            4. **Block** the attack (against long-range pieces).

            Check them in this order: capturing the attacker first, because it can win material.
          `),
        },
        {
          type: 'board',
          fen: 'r2q1rk1/pbp2ppp/1p1p4/8/4Pn2/2N5/PPPBQPPP/R4RK1 w - - 0 1',
          arrows: [['f4', 'e2'], ['d2', 'f4']],
          highlights: ['f4'],
          caption: 'Black\'s knight attacks the white queen. But the knight itself is attacked by the bishop on d2, and nothing defends it.',
        },
        {
          type: 'exercise',
          exercise: {
            id: 'l2-safe-threats-ex1',
            prompt: 'Black\'s last move ...Nf4 attacks your queen. White to move: what is the best answer?',
            fen: 'r2q1rk1/pbp2ppp/1p1p4/8/4Pn2/2N5/PPPBQPPP/R4RK1 w - - 0 1',
            solution: ['Bxf4'],
            hint: 'Before you run away with the queen, look at the piece that is attacking her.',
            explanation: 'Bxf4 captures the attacker, and it was undefended, so White wins a knight. Running away with the queen would have been safe, but it would have missed a free piece. **First check whether you can capture the attacker.**',
          },
        },
        {
          type: 'exercise',
          exercise: {
            id: 'l2-safe-threats-ex2',
            prompt: 'Black has just played ...b5, attacking your knight on a4. White to move: save the knight.',
            fen: '2r3k1/p1p2ppp/3pbn2/1p6/N7/8/PPP2PPP/2BR2K1 w - - 0 1',
            solution: ['Nc3'],
            hint: 'Check every square the knight can go to. Which one is not attacked by a black pawn?',
            explanation: 'Nc3 is the only safe square. b6 is covered by the a7- and c7-pawns, c5 by the d6-pawn, and b2 holds your own pawn. A knight on the edge has few squares, which is exactly why "a knight on the rim is dim".',
          },
        },
      ],
    },
    {
      id: 'l2-safe-check',
      title: 'The blunder check',
      summary: 'A ten-second routine before every move: checks, captures and threats, for both sides.',
      estMinutes: 10,
      blocks: [
        {
          type: 'text',
          md: md(`
            A **blunder** is a move that throws away material or the game. Even world champions blunder, but they blunder much less, because they check before they move.

            Before you play the move you have chosen, imagine it on the board and look for:

            1. **Checks**: what checks can my opponent give now?
            2. **Captures**: what can my opponent capture now? Is anything left undefended?
            3. **Threats**: what is my opponent threatening, and what will my move threaten?

            Do it for **your** moves too: your own checks, captures and threats are where your winning chances come from.
          `),
        },
        {
          type: 'tip',
          title: 'Checks, Captures, Threats',
          md: md(`
            Say it in your head before every move: **Checks, Captures, Threats.** Forcing moves come first because they give your opponent the fewest choices, and they are the moves you are most likely to overlook.
          `),
        },
        {
          type: 'line',
          moves: ['d4', 'e5', 'dxe5', 'Nc6', 'Nf3', 'Qe7', 'Bf4', 'Qb4+', 'Bd2', 'Qxb2', 'Bc3', 'Bb4', 'Qd2', 'Bxc3', 'Qxc3', 'Qc1#'],
          caption: 'The Englund Gambit trap: White skips the blunder check twice.',
          notes: {
            7: 'A natural developing move, but White forgot to look at Black\'s checks.',
            8: 'Check! The queen attacks the king, the bishop on f4 and the pawn on b2 all at once.',
            10: 'Black grabs the pawn and now attacks the rook on a1 and the knight on b1.',
            11: 'White attacks the queen, but again forgets to ask what Black threatens next.',
            12: 'A pin! Black\'s bishop pins the c3-bishop to the white king, so it is no longer allowed to take the queen. Now ...Qxa1 is threatened.',
            14: 'Black takes the defender of c1.',
            16: 'Checkmate. White\'s king is still on e1, and every one of these disasters started with a move made without a blunder check.',
          },
        },
        {
          type: 'board',
          fen: '2b1r1k1/pp3ppp/8/8/n7/2N5/PP3PPP/3Q2K1 w - - 0 1',
          arrows: [['e8', 'e1']],
          highlights: ['e1'],
          caption: 'White\'s queen on d1 is the only piece guarding e1. If she leaves the back rank, ...Re1 is checkmate.',
        },
        {
          type: 'exercise',
          exercise: {
            id: 'l2-safe-check-ex1',
            prompt: 'Black\'s knight on a4 is hanging, and two of your pieces can take it. White to move: capture it safely.',
            fen: '2b1r1k1/pp3ppp/8/8/n7/2N5/PP3PPP/3Q2K1 w - - 0 1',
            solution: ['Nxa4'],
            hint: 'Do the blunder check for each capture. After you take, what checks does Black have?',
            explanation: 'Nxa4 wins the knight safely. Qxa4?? looks just as good, but after it Black has a check: ...Re1#, because the queen has left the back rank. Always look at your opponent\'s checks before you capture.',
          },
        },
        {
          type: 'exercise',
          exercise: {
            id: 'l2-safe-check-ex2',
            prompt: 'From the Englund Gambit trap: White has just played 6.Bc3?, attacking your queen. Black to move: punish it.',
            fen: 'r1b1kbnr/pppp1ppp/2n5/4P3/8/2B2N2/PqP1PPPP/RN1QKB1R b KQkq - 1 6',
            solution: ['Bb4'],
            hint: 'Do not move the queen. Bring another piece into the attack on c3.',
            explanation: '...Bb4! pins the bishop on c3 to the king, so it cannot take your queen. Now ...Qxa1 is coming. If 7.Qd2, then ...Bxc3 8.Qxc3 Qc1# is mate. White should have asked "What does Black threaten?" one move earlier.',
          },
        },
      ],
    },
  ],
}

export const level2: Module[] = [openingModule, safetyModule]
