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

// ---------------------------------------------------------------------------
// Module 3 · Basic checkmates
// ---------------------------------------------------------------------------

const matesModule: Module = {
  id: 'l2-mates',
  level: 2,
  title: 'Basic Checkmates',
  description: 'Finish the job: the two-rook ladder, queen and king against king, rook and king against king, and the back-rank mate.',
  lessons: [
    {
      id: 'l2-mate-ladder',
      title: 'The two-rook ladder',
      summary: 'Two rooks take turns giving check and walk the king to the edge like climbing a ladder.',
      estMinutes: 7,
      blocks: [
        {
          type: 'text',
          md: md(`
            Winning lots of material is great, but you still have to **deliver checkmate**. In this module you will learn the basic mates that every chess player must know by heart. They come up again and again at the end of games.

            The easiest one uses **two rooks** (or a rook and a queen). You do not even need your king!

            ### How the ladder works

            - One rook **cuts off** the king along a rank, like a wall it cannot cross.
            - The other rook gives **check** on the next rank, pushing the king back one step.
            - Now the rooks swap jobs: the rook that was the wall jumps ahead and gives the next check.

            Step by step, the king is pushed to the edge, where the final check is checkmate.
          `),
        },
        {
          type: 'board',
          fen: '8/8/8/4k3/R7/8/8/1R4K1 w - - 0 1',
          arrows: [['b1', 'b5']],
          highlights: ['b4', 'c4', 'd4', 'e4', 'f4', 'g4', 'h4'],
          caption: 'The rook on a4 is a wall: the black king may not cross the 4th rank. Next, Rb5+ pushes it back again.',
        },
        {
          type: 'line',
          fen: '8/8/8/4k3/R7/8/8/1R4K1 w - - 0 1',
          moves: ['Rb5+', 'Kd6', 'Ra6+', 'Kc7', 'Rh5', 'Kb7', 'Rg6', 'Kc7', 'Rh7+', 'Kd8', 'Rg8#'],
          caption: 'Climbing the ladder, and what to do when the king attacks a rook.',
          notes: {
            1: 'Check! The king must go up to the 6th rank, because the a4-rook guards the 4th.',
            3: 'The rooks swap jobs. Now the b5-rook is the wall and the a-rook checks.',
            4: 'The king runs towards the rooks. If White played Rb7+ now, the king would simply take it.',
            5: 'So the rook swings far away to h5, where the king can never reach it. From there it can still give the next check on the 7th rank.',
            6: 'The king attacks the rook on a6.',
            7: 'That rook also escapes to the far side, while still guarding the 6th rank.',
            9: 'Check from far away. The king must go to the back rank.',
            11: 'Checkmate. One rook guards the 7th rank, the other checks along the 8th.',
          },
        },
        {
          type: 'tip',
          title: 'If the king gets close',
          md: md(`
            When the enemy king walks up to one of your rooks, do not panic and do not defend it. Just **move that rook to the far side of the board**, on the same rank, and carry on climbing the ladder.
          `),
        },
        {
          type: 'exercise',
          exercise: {
            id: 'l2-mate-ladder-ex1',
            prompt: 'Your rook on a2 already guards the 2nd rank. Black to move: checkmate in one.',
            fen: '8/8/8/4k3/8/1r6/r7/6K1 b - - 0 1',
            goal: 'mate',
            solution: ['Rb1#'],
            hint: 'The wall is in place. Use the other rook to check along the edge.',
            explanation: '...Rb1# is mate. The rook on a2 stops the king from stepping up to the 2nd rank, and the rook on b1 checks along the 1st rank. The king has nowhere to go.',
          },
        },
        {
          type: 'exercise',
          exercise: {
            id: 'l2-mate-ladder-ex2',
            prompt: 'Climb the ladder. White to move: checkmate in two.',
            fen: '8/4k3/R7/8/8/8/8/1R4K1 w - - 0 1',
            goal: 'mate',
            solution: ['Rb7+', 'Kd8', 'Ra8#'],
            hint: 'The a6-rook is the wall. Check with the other rook on the 7th rank.',
            explanation: 'Rb7+ pushes the king to the back rank, because the a6-rook guards the 6th. Then Ra8# finishes: one rook on the 7th rank, the other giving check on the 8th.',
          },
        },
      ],
    },
    {
      id: 'l2-mate-queen',
      title: 'Queen and king against king',
      summary: 'Box the king in with your queen, bring your own king, and never forget about stalemate.',
      estMinutes: 9,
      blocks: [
        {
          type: 'text',
          md: md(`
            With a queen and king against a lone king you can **always** force checkmate. But the queen cannot do it alone: you need your king to help at the end.

            ### The plan

            1. **Box the king in.** Use the queen to make the black king's area smaller and smaller. A handy trick is to put your queen a **knight's move** away from the enemy king: then it controls many of the squares around it without giving check.
            2. **Push it to the edge.** Keep shrinking the box until the king is stuck on the edge of the board.
            3. **Bring your king.** Once the enemy king is trapped on the edge, march your own king up to help.
            4. **Checkmate**, with the queen protected by your king or with the king blocking the escape squares.
          `),
        },
        {
          type: 'board',
          fen: '6k1/4Q3/8/8/8/4K3/8/8 w - - 0 1',
          highlights: ['g8', 'h8'],
          caption: 'The box is complete: the queen on e7 guards the whole 7th rank and f8. The black king can only shuffle between g8 and h8.',
        },
        {
          type: 'line',
          fen: '6k1/4Q3/8/8/8/4K3/8/8 w - - 0 1',
          moves: ['Kf4', 'Kh8', 'Kg5', 'Kg8', 'Kg6', 'Kh8', 'Qe8#'],
          caption: 'The queen keeps the box closed while the king walks up.',
          notes: {
            1: 'The queen does not need to move. White simply brings the king closer.',
            2: 'Black can only shuffle in the corner.',
            3: 'Closer still.',
            5: 'The white king arrives. Now it guards g7, h7 and f7.',
            6: 'Stop and look before you play! 4.Qf7?? would leave Black with no legal moves and NOT in check: stalemate, a draw!',
            7: 'Checkmate. The queen checks along the 8th rank and the king covers every escape square.',
          },
        },
        {
          type: 'tip',
          title: 'Common mistake: stalemate',
          md: md(`
            The biggest danger with a queen is **stalemate**: the enemy king is not in check but has no legal move, and the game is a draw. It happens when the queen takes away the last free squares without giving check.

            Before every queen move near a cornered king, ask: **"After my move, does Black still have a move?"** If the answer is "no" and it is not check, find another move!
          `),
        },
        {
          type: 'board',
          fen: '7k/5Q2/6K1/8/8/8/8/8 b - - 0 1',
          highlights: ['h8'],
          caption: 'Stalemate! Black to move: the king is not in check, but every square around it is covered. White threw away a certain win.',
        },
        {
          type: 'exercise',
          exercise: {
            id: 'l2-mate-queen-ex1',
            prompt: 'White to move: checkmate in one. Several queen moves give stalemate instead, so be careful!',
            fen: '7k/8/5QK1/8/8/8/8/8 w - - 0 1',
            goal: 'mate',
            solution: ['Qf8#'],
            hint: 'Give check along the back rank, or put the queen next to the black king where your king protects her.',
            explanation: 'Qf8# (or Qd8#, Qe8#, Qg7#) is mate: the queen checks and the white king covers g7 and h7. A move like Qf7?? or Qe6?? would take away the g8-square without giving check: stalemate.',
          },
        },
        {
          type: 'exercise',
          exercise: {
            id: 'l2-mate-queen-ex2',
            prompt: 'The box is closed. White to move: checkmate in two.',
            fen: '6k1/4Q3/8/5K2/8/8/8/8 w - - 0 1',
            goal: 'mate',
            solution: ['Kg6', 'Kh8', 'Qe8#'],
            hint: 'The queen is already perfectly placed. Bring your king one step closer.',
            explanation: 'Kg6! brings the king next to the black king\'s escape squares. Black can only play ...Kh8, and then Qe8# (or Qg7# or Qh7#) is mate. The queen does the boxing; the king does the helping.',
          },
        },
      ],
    },
    {
      id: 'l2-mate-rook',
      title: 'Rook and king against king',
      summary: 'The box method: the rook builds a box, the king pushes, and the rook mates on the edge.',
      estMinutes: 10,
      blocks: [
        {
          type: 'text',
          md: md(`
            A rook and king can also force checkmate against a lone king. It takes a little longer than with a queen, but the idea is just as clear. We use the **box method**.

            ### The box method

            1. **Build a box.** Use the rook to cut the enemy king off on one part of the board. The rook's rank and file are walls the king cannot cross.
            2. **Bring your king.** Walk your king towards the enemy king. Protect your rook if the enemy king attacks it, or move it far away along the same line.
            3. **Shrink the box.** When the kings stand face to face, a rook check pushes the enemy king back one row. Each time the box gets smaller.
            4. **Mate on the edge.** When the enemy king is on the edge, facing your king, the rook gives check along the edge: checkmate.
          `),
        },
        {
          type: 'board',
          fen: '8/8/4k3/7R/4K3/8/8/8 w - - 0 1',
          arrows: [['h5', 'a5']],
          highlights: ['e5', 'd5', 'f5'],
          caption: 'The rook on h5 is a wall along the 5th rank. The kings face each other, so Rh6+ will push the black king back to the 7th rank.',
        },
        {
          type: 'text',
          md: md(`
            ### Why the kings must face each other

            When the white king stands directly opposite the black king with one square between them, the black king cannot step forward. A rook check then forces it **backwards**. On the edge of the board there is no "backwards" left, so the check is mate.
          `),
        },
        {
          type: 'line',
          fen: '2k5/8/3K4/8/8/8/8/7R w - - 0 1',
          moves: ['Rh7', 'Kb8', 'Kc6', 'Ka8', 'Kb6', 'Kb8', 'Rh8#'],
          caption: 'The final phase of the box method.',
          notes: {
            1: 'The box: the rook seals off the 7th rank. The black king is stuck on the back rank.',
            2: 'Black avoids standing opposite the white king.',
            3: 'The white king follows along the 6th rank.',
            4: 'Careful here! 3.Kc7?? would be stalemate: Black would have no legal move.',
            5: 'Now the king stands where it covers a7 and b7, and Black must step in front of it.',
            6: 'The only move. The kings face each other.',
            7: 'Checkmate along the back rank.',
          },
        },
        {
          type: 'exercise',
          exercise: {
            id: 'l2-mate-rook-ex1',
            prompt: 'The kings face each other. White to move: checkmate in one.',
            fen: '3k4/7R/3K4/8/8/8/8/8 w - - 0 1',
            goal: 'mate',
            solution: ['Rh8#'],
            hint: 'The black king is on the edge and cannot step forward. Check it along the edge.',
            explanation: 'Rh8# is mate. The white king takes away c7, d7 and e7, and the rook checks along the whole 8th rank.',
          },
        },
        {
          type: 'exercise',
          exercise: {
            id: 'l2-mate-rook-ex2',
            prompt: 'The black king is in the corner. White to move: checkmate in one.',
            fen: '7k/5K2/8/8/8/8/8/6R1 w - - 0 1',
            goal: 'mate',
            solution: ['Rh1#'],
            hint: 'The white king already covers g7 and g8. Which square is left for the black king?',
            explanation: 'Rh1# is mate. The king on f7 covers g7 and g8, and the rook checks along the h-file, also covering h7.',
          },
        },
        {
          type: 'exercise',
          exercise: {
            id: 'l2-mate-rook-ex3',
            prompt: 'White to move: checkmate in two. First bring your king into position.',
            fen: '7k/8/5K2/8/8/8/8/R7 w - - 0 1',
            goal: 'mate',
            solution: ['Kg6', 'Kg8', 'Ra8#'],
            hint: 'Put your king where it covers g7 and h7. Then the rook can finish along the back rank.',
            explanation: 'Kg6! leaves Black only one move, ...Kg8, and now the kings face each other. Ra8# is mate along the back rank.',
          },
        },
      ],
    },
    {
      id: 'l2-mate-backrank',
      title: 'The back-rank mate',
      summary: 'A king trapped behind its own pawns can be mated by a single rook or queen.',
      estMinutes: 8,
      blocks: [
        {
          type: 'text',
          md: md(`
            After castling, the king sits safely behind three pawns. But those same pawns can become a **prison**. If a rook or queen reaches the back rank with check, the king cannot step forward because its own pawns are in the way.

            This is the **back-rank mate**, and it decides a huge number of games at every level.
          `),
        },
        {
          type: 'board',
          fen: '6k1/5ppp/8/8/8/8/1q3PPP/3R2K1 w - - 0 1',
          arrows: [['d1', 'd8']],
          highlights: ['f7', 'g7', 'h7'],
          caption: 'Black\'s king is boxed in by its own pawns on f7, g7 and h7. Rd8 will be checkmate.',
        },
        {
          type: 'tip',
          title: 'Give your king some air',
          md: md(`
            To protect yourself, make an escape square, called **luft** (German for "air"), with a quiet pawn move such as h3 (or ...h6 for Black) once the opening is over. Also keep a rook or the queen guarding your back rank while the enemy rooks and queen are still on the board.
          `),
        },
        {
          type: 'exercise',
          exercise: {
            id: 'l2-mate-backrank-ex1',
            prompt: 'Black has a queen and you only have a rook, but look at Black\'s king. White to move: checkmate in one.',
            fen: '6k1/5ppp/8/8/8/8/1q3PPP/3R2K1 w - - 0 1',
            goal: 'mate',
            solution: ['Rd8#'],
            hint: 'The black king cannot step forward. Check it along the back rank.',
            explanation: 'Rd8# is a back-rank mate. The black king is blocked by its own pawns, and nothing can capture the rook or block the check. Material does not matter when the king is mated!',
          },
        },
        {
          type: 'exercise',
          exercise: {
            id: 'l2-mate-backrank-ex2',
            prompt: 'Now it is White who forgot to make luft. Black to move: checkmate in one.',
            fen: '6k1/5ppp/8/3N4/8/8/r4PPP/6K1 b - - 0 1',
            goal: 'mate',
            solution: ['Ra1#'],
            hint: 'Which rook move reaches White\'s back rank with check?',
            explanation: '...Ra1# is mate. White\'s pawns on f2, g2 and h2 trap the king, and the knight cannot get back to defend the first rank.',
          },
        },
        {
          type: 'exercise',
          exercise: {
            id: 'l2-mate-backrank-ex3',
            prompt: 'Black\'s rook on e8 is defended by the queen. White to move: checkmate in two.',
            fen: '4r1k1/3q1ppp/8/8/8/8/4QPPP/4R1K1 w - - 0 1',
            goal: 'mate',
            solution: ['Qxe8+', 'Qxe8', 'Rxe8#'],
            hint: 'Your queen and rook are lined up on the e-file. Give up the queen to drag the black queen away.',
            explanation: 'Qxe8+! forces ...Qxe8, and then Rxe8# is a back-rank mate. Giving up the queen is fine when it leads to checkmate. The black queen was overloaded: it could not guard e8 twice.',
          },
        },
      ],
    },
  ],
}

// ---------------------------------------------------------------------------
// Module 4 · First tactics
// ---------------------------------------------------------------------------

const tacticsModule: Module = {
  id: 'l2-tactics',
  level: 2,
  title: 'First Tactics',
  description: 'Your first winning tricks: double attacks, forks, pins, skewers and discovered attacks.',
  lessons: [
    {
      id: 'l2-tac-double',
      title: 'The double attack',
      summary: 'Attack two things with one move. Your opponent can only save one of them.',
      estMinutes: 8,
      blocks: [
        {
          type: 'text',
          md: md(`
            In the last modules you learned to take pieces that are simply left hanging. But a careful opponent will not leave pieces hanging for long. So how do you win material against someone who is paying attention?

            With a **tactic**: a short, forcing sequence of moves that wins something. Tactics are where most games at your level are won and lost.

            The most important tactic of all is the **double attack**: one move that creates **two threats at once**. Your opponent has only one move to reply, so they can usually deal with only one of the threats. You collect the other.
          `),
        },
        {
          type: 'board',
          fen: '3Q2k1/p4pp1/7p/r7/8/8/PP3PPP/6K1 b - - 1 1',
          arrows: [['d8', 'g8'], ['d8', 'a5']],
          highlights: ['g8', 'a5'],
          caption: 'A double attack. The queen on d8 gives check AND attacks the rook on a5. Black must answer the check, and then the rook falls.',
        },
        {
          type: 'text',
          md: md(`
            ### What makes a good target?

            A double attack works best when it hits things that cannot simply be defended together:

            - The **king** (a check must be answered at once, so it is the strongest threat of all).
            - **Loose pieces**: pieces with no defender.
            - Pieces worth **more** than the attacker.
            - A **checkmate threat**. If your move threatens mate *and* attacks a piece, your opponent must stop the mate and lose the piece.

            The queen is the best double-attacker because she moves in eight directions. Whenever your queen is free, ask: **"Is there a square where she attacks two things?"**
          `),
        },
        {
          type: 'tip',
          title: 'Look for two targets',
          md: md(`
            Train your eyes: every time it is your move, quickly list the enemy pieces that are **loose** and the enemy **king**. If two of them can be hit from the same square, you may have a double attack.
          `),
        },
        {
          type: 'exercise',
          exercise: {
            id: 'l2-tac-double-ex1',
            prompt: 'Black\'s rook on a5 has no defender. White to move: win it with a double attack.',
            fen: '6k1/p4pp1/7p/r7/8/8/PP3PPP/3Q2K1 w - - 0 1',
            solution: ['Qd8+', 'Kh7', 'Qxa5'],
            hint: 'Find a queen check that also lines up with the rook on a5.',
            explanation: 'Qd8+! checks the king along the back rank and attacks the rook along the diagonal at the same time. Black must save the king with ...Kh7, and then Qxa5 picks up the rook. One move, two threats.',
          },
        },
        {
          type: 'exercise',
          exercise: {
            id: 'l2-tac-double-ex2',
            prompt: 'Black\'s bishop on h4 is loose. White to move: win it with a check.',
            fen: 'r3k2r/ppp2ppp/8/8/7b/8/PP3PPP/3Q1RK1 w - - 0 1',
            solution: ['Qa4+', 'Kf8', 'Qxh4'],
            hint: 'The black king on e8 is open on the diagonal towards a4. What else can a queen on a4 see?',
            explanation: 'Qa4+! checks the king along the a4-e8 diagonal and attacks the bishop along the 4th rank. Black has to get out of check first, and then Qxh4 wins the bishop. Checks are the best first half of a double attack, because they must be answered.',
          },
        },
        {
          type: 'exercise',
          exercise: {
            id: 'l2-tac-double-ex3',
            prompt: 'Your bishop on d3 aims at h7. White to move: threaten checkmate and attack a loose piece at the same time.',
            fen: '5rk1/ppq2ppp/8/8/1b6/3B4/PPP1QPPP/4R1K1 w - - 0 1',
            solution: ['Qe4', 'g6', 'Qxb4'],
            hint: 'Put the queen on the bishop\'s diagonal towards h7. Which square also attacks the bishop on b4?',
            explanation: 'Qe4! threatens Qxh7# (the queen is protected by the bishop) and also attacks the loose bishop on b4 along the 4th rank. Black must stop the mate, for example with ...g6, and then Qxb4 wins a piece. A mate threat is a wonderful partner in a double attack.',
          },
        },
      ],
    },
    {
      id: 'l2-tac-fork',
      title: 'Knight and pawn forks',
      summary: 'A fork is a double attack by one piece on two enemy pieces. Knights and pawns are the champion forkers.',
      estMinutes: 9,
      blocks: [
        {
          type: 'text',
          md: md(`
            When one piece attacks two or more enemy pieces at the same time, we call it a **fork**. Any piece can fork, but two pieces are especially good at it:

            - **Knights**, because they jump in an unusual shape. A knight can attack a king, a queen and a rook all at once, and none of them can attack the knight back!
            - **Pawns**, because they are worth only 1 point. If a pawn forks two pieces, you win a piece even if the pawn is captured.

            A knight fork that includes the king is called a **royal fork**. If it hits the king, queen and rook together, it is sometimes called a **family fork**.
          `),
        },
        {
          type: 'board',
          fen: 'r3k3/2N5/4q3/8/8/8/5PPP/6K1 b - - 0 1',
          arrows: [['c7', 'e8'], ['c7', 'a8'], ['c7', 'e6']],
          highlights: ['e8', 'a8', 'e6'],
          caption: 'A family fork. The knight on c7 checks the king and attacks the rook and the queen. Black must move the king, and White takes the queen.',
        },
        {
          type: 'tip',
          title: 'Spotting knight forks',
          md: md(`
            Knight forks are easy to miss because the knight does not move in a straight line. Look for **enemy pieces that stand a knight's jump apart from the same empty square**, especially the king and queen, or the king and a rook. Squares like c7 and f7 (or c2 and f2 for White) are classic fork squares.
          `),
        },
        {
          type: 'line',
          moves: ['e4', 'e5', 'Nf3', 'Nc6', 'Bc4', 'Bc5', 'Nc3', 'Nf6', 'Nxe5', 'Nxe5', 'd4', 'Bd6', 'dxe5', 'Bxe5'],
          caption: 'The fork trick: a pawn fork wins back a piece.',
          notes: {
            9: 'White gives up a knight for a pawn... on purpose!',
            10: 'Black takes the knight. It looks as if White is simply a piece down.',
            11: 'The pawn fork! The d4-pawn attacks both the bishop on c5 and the knight on e5. Black can save only one.',
            12: 'Black saves the bishop.',
            13: 'White wins the piece back.',
            14: 'Material is equal again, and White has a strong centre and easy development. A pawn fork turned a sacrifice into a good trade.',
          },
        },
        {
          type: 'exercise',
          exercise: {
            id: 'l2-tac-fork-ex1',
            prompt: 'White to move: find the royal fork.',
            fen: 'r3kb2/1p3ppp/8/3N4/8/8/PP3PPP/3R2K1 w - - 0 1',
            solution: ['Nc7+', 'Ke7', 'Nxa8'],
            hint: 'Which square lets the knight check the king and attack the rook on a8?',
            explanation: 'Nc7+! forks the king on e8 and the rook on a8. The king must move, and Nxa8 wins a whole rook. Notice that neither the king nor the rook can capture the knight on c7.',
          },
        },
        {
          type: 'exercise',
          exercise: {
            id: 'l2-tac-fork-ex2',
            prompt: 'Black\'s queen and king are a knight\'s jump apart from the same square. White to move: win the queen.',
            fen: '6k1/pp3ppp/2q5/3N4/8/8/PP3PPP/3R2K1 w - - 0 1',
            solution: ['Ne7+', 'Kf8', 'Nxc6'],
            hint: 'Find a knight check from a square that also attacks c6.',
            explanation: 'Ne7+! forks the king on g8 and the queen on c6. After the king moves, Nxc6 wins the queen for a knight. Always check whether the enemy king and queen are a knight\'s move apart from one square.',
          },
        },
        {
          type: 'exercise',
          exercise: {
            id: 'l2-tac-fork-ex3',
            prompt: 'White\'s bishop on d3 and knight on f3 stand side by side. Black to move: fork them with a pawn.',
            fen: '4r1k1/ppp2ppp/3b1n2/3pp3/8/3B1N2/PPP2PPP/4R1K1 b - - 0 1',
            solution: ['e4'],
            hint: 'A pawn on e4 would attack both d3 and f3. Is e4 safe for your pawn?',
            explanation: '...e4! forks the bishop and the knight. The pawn is protected by the d5-pawn and the f6-knight, so taking it costs White a piece anyway. White can save only one of the two pieces, and Black wins material. A pawn is the cheapest forker of all.',
          },
        },
      ],
    },
    {
      id: 'l2-tac-pin',
      title: 'Pins: absolute and relative',
      summary: 'A pinned piece cannot move without exposing something more valuable behind it.',
      estMinutes: 10,
      blocks: [
        {
          type: 'text',
          md: md(`
            A **pin** happens when a bishop, rook or queen attacks an enemy piece, and behind that piece stands something **more valuable**. The front piece is stuck: if it moves, the piece behind it is exposed.

            There are two kinds of pins:

            - **Absolute pin**: the piece behind is the **king**. The pinned piece is *not allowed* to move at all, because that would put its own king in check.
            - **Relative pin**: the piece behind is something else, like the queen or a rook. The pinned piece *may* move, but it costs the piece behind it.
          `),
        },
        {
          type: 'board',
          fen: 'r1bqkbnr/ppp2ppp/2np4/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 4',
          arrows: [['b5', 'e8']],
          highlights: ['c6'],
          caption: 'An absolute pin. The knight on c6 cannot move, because the bishop on b5 would then be checking the black king.',
        },
        {
          type: 'text',
          md: md(`
            ### How to use a pin

            1. **Win the pinned piece** if it is worth more than the pinner, like a queen pinned by a bishop.
            2. **Attack the pinned piece again**, ideally with a pawn. It cannot run away.
            3. **Ignore its "defence"**. A pinned piece does not really defend anything, because moving it would expose the piece behind.

            But be careful with relative pins: the pinned piece is *allowed* to move, and sometimes it moves with a nasty surprise. Here is a famous trap where White forgets this.
          `),
        },
        {
          type: 'line',
          moves: ['d4', 'd5', 'c4', 'e6', 'Nc3', 'Nf6', 'Bg5', 'Nbd7', 'cxd5', 'exd5', 'Nxd5', 'Nxd5', 'Bxd8', 'Bb4+', 'Qd2', 'Bxd2+', 'Kxd2', 'Kxd8'],
          caption: 'The Elephant Trap: a relative pin is not a real pin.',
          notes: {
            7: 'A relative pin: the knight on f6 is pinned to the black queen on d8.',
            11: 'White grabs a pawn, thinking the f6-knight cannot recapture because of the pin.',
            12: 'But it can! The pin is only relative, so the knight is allowed to move.',
            13: 'White takes the queen, as planned...',
            14: 'Check! This was Black\'s idea all along.',
            15: 'White\'s only sensible way to block the check is with the queen.',
            16: 'Black takes White\'s queen, with check.',
            18: 'Black also takes the bishop on d8. Black has won a whole piece. Lesson: a relative pin can be broken if moving the pinned piece creates a bigger threat.',
          },
        },
        {
          type: 'tip',
          title: 'Rule of thumb',
          md: md(`
            **Pins are strongest against the king.** An absolutely pinned piece is frozen, so pile up on it. A relatively pinned piece can still move, so before you rely on a relative pin, ask: "What happens if the pinned piece moves anyway?"
          `),
        },
        {
          type: 'exercise',
          exercise: {
            id: 'l2-tac-pin-ex1',
            prompt: 'Black\'s queen and king stand on the same diagonal. White to move: pin the queen and win it.',
            fen: '4k2r/pp1q1ppp/4p3/8/8/2NB4/PPP2PPP/3R2K1 w - - 0 1',
            solution: ['Bb5'],
            hint: 'Which bishop move attacks the queen with the king standing behind her? Make sure the bishop is protected.',
            explanation: 'Bb5! pins the queen to the king. The queen is not allowed to move off the diagonal, so the best Black can do is ...Qxb5, and after Nxb5 Black has given up a queen (9) for a bishop (3). The knight on c3 was important: it protects the bishop.',
          },
        },
        {
          type: 'exercise',
          exercise: {
            id: 'l2-tac-pin-ex2',
            prompt: 'Black\'s knight on c6 is pinned to the king. White to move: attack it again.',
            fen: 'r3k3/1pp1pppp/2n5/1B6/3P4/8/PPP2PPP/5RK1 w - - 0 1',
            solution: ['d5'],
            hint: 'A pinned piece cannot run away. Attack it with your cheapest piece.',
            explanation: 'd5! attacks the pinned knight with a pawn. The knight is not allowed to move because of the bishop on b5, so Black will lose it for a pawn at most. This is the classic way to punish a pin: **pile up on the pinned piece**.',
          },
        },
        {
          type: 'exercise',
          exercise: {
            id: 'l2-tac-pin-ex3',
            prompt: 'Black\'s bishop on g4 attacks your queen, and it is "defended" by the knight on e5. But that knight is pinned to the black queen by your rook. White to move.',
            fen: '6k1/ppp1qpp1/7p/4n3/6b1/8/PPP2PPP/3QR2K w - - 0 1',
            solution: ['Qxg4'],
            hint: 'Does the knight on e5 really protect the bishop? What happens if it recaptures?',
            explanation: 'Qxg4! wins the bishop. If Black recaptures with ...Nxg4, the knight leaves the e-file and Rxe7 wins the black queen. The knight is in a **relative pin**, so its defence of g4 was an illusion.',
          },
        },
      ],
    },
    {
      id: 'l2-tac-skewer',
      title: 'Skewers',
      summary: 'A skewer is a pin turned around: attack the big piece in front, and take the piece behind it.',
      estMinutes: 7,
      blocks: [
        {
          type: 'text',
          md: md(`
            A **skewer** is like a pin in reverse. A bishop, rook or queen attacks a **valuable** piece, and behind it on the same line stands **another** piece. When the valuable piece moves out of the way, the piece behind it is captured.

            The most common skewer is a **check**: the king must move, and you take whatever was hiding behind it.

            - In a **pin**, the *less* valuable piece is in front.
            - In a **skewer**, the *more* valuable piece is in front.
          `),
        },
        {
          type: 'board',
          fen: '8/5p2/R2k3r/6p1/8/8/5PPP/6K1 b - - 1 1',
          arrows: [['a6', 'd6'], ['d6', 'h6']],
          highlights: ['d6', 'h6'],
          caption: 'A skewer. The rook checks the king along the 6th rank. When the king steps aside, the rook on h6 is undefended and falls.',
        },
        {
          type: 'tip',
          title: 'Where skewers hide',
          md: md(`
            Look for an enemy **king and another piece on the same line** (a rank, a file or a diagonal) with nothing between them. Then ask: can one of my long-range pieces give check on that line, from a safe square? Skewers are especially common in endgames, when kings walk into the open.
          `),
        },
        {
          type: 'exercise',
          exercise: {
            id: 'l2-tac-skewer-ex1',
            prompt: 'Black\'s king and rook are both on the 6th rank. White to move: skewer them.',
            fen: '8/5p2/3k3r/6p1/8/8/5PPP/R5K1 w - - 0 1',
            solution: ['Ra6+', 'Ke5', 'Rxh6'],
            hint: 'Give check along the 6th rank from a square the king cannot reach.',
            explanation: 'Ra6+! checks the king along the 6th rank. The king has to leave the rank, and then Rxh6 wins the rook. The rook checks from far away on a6, where the king cannot capture it.',
          },
        },
        {
          type: 'exercise',
          exercise: {
            id: 'l2-tac-skewer-ex2',
            prompt: 'Black\'s king on e5 and queen on h8 share a long diagonal. White to move: win the queen.',
            fen: '7q/pp3p1p/8/4k3/8/8/PP3PPP/4B1K1 w - - 0 1',
            solution: ['Bc3+', 'Kf5', 'Bxh8'],
            hint: 'Your bishop can reach the long diagonal with check.',
            explanation: 'Bc3+! checks the king along the a1-h8 diagonal. When the king steps off the diagonal, Bxh8 takes the queen. A bishop worth 3 points has won a queen worth 9.',
          },
        },
        {
          type: 'exercise',
          exercise: {
            id: 'l2-tac-skewer-ex3',
            prompt: 'Black\'s king on f5 and rook on c8 are on the same diagonal. White to move: skewer them with your queen.',
            fen: '2r5/pp3p1p/b7/5k2/8/4Q3/PP3PPP/6K1 w - - 0 1',
            solution: ['Qh3+', 'Kg6', 'Qxc8'],
            hint: 'Find the queen check along the h3-c8 diagonal.',
            explanation: 'Qh3+! checks along the diagonal h3-g4-f5, and the rook on c8 is hiding behind the king on the same line. After the king moves, Qxc8 wins the rook.',
          },
        },
      ],
    },
    {
      id: 'l2-tac-discover',
      title: 'Discovered attacks',
      summary: 'Move one piece out of the way and unleash the piece behind it: two attackers in one move.',
      estMinutes: 9,
      blocks: [
        {
          type: 'text',
          md: md(`
            A **discovered attack** happens when you move one piece and, by moving it, **uncover** an attack by another piece standing behind it.

            It is a special kind of double attack: the piece that moves can make its own threat, while the piece behind it attacks something else. Your opponent faces two threats from two different pieces.

            ### Discovered check

            The strongest version is a **discovered check**: the uncovered piece gives check. Your opponent *must* deal with the check, so the piece that moved can attack almost anything, even the queen, and get away with it.

            If both pieces give check at the same time, it is a **double check**. Then the king *must* move, because you cannot block or capture two checkers at once.
          `),
        },
        {
          type: 'board',
          fen: '4k3/pp3ppp/8/4N3/8/8/PP3PPP/4R1K1 w - - 0 1',
          arrows: [['e1', 'e8']],
          highlights: ['e5'],
          caption: 'A loaded gun: only the knight on e5 stands between the rook and the black king. Wherever the knight jumps, the rook gives check, so the knight can attack anything it likes.',
        },
        {
          type: 'tip',
          title: 'Look behind your own pieces',
          md: md(`
            Whenever one of your pieces stands **in front of** your own bishop, rook or queen, and an enemy king or queen is further down that line, you have a loaded gun. Find a move for the front piece that **creates a second threat**, ideally a check or a capture.
          `),
        },
        {
          type: 'exercise',
          exercise: {
            id: 'l2-tac-discover-ex1',
            prompt: 'Your bishop on e5 blocks your rook\'s attack on the black king. White to move: move the bishop and win material.',
            fen: 'r3k2r/ppp2p1p/8/4B3/8/8/PP3PPP/4R1K1 w - - 0 1',
            solution: ['Bxh8+'],
            hint: 'Every bishop move gives discovered check. Which one also captures something valuable?',
            explanation: 'Bxh8+! The bishop captures the rook, and at the same time the rook on e1 gives check. Black must answer the check and cannot win back the bishop. With a discovered check, the moving piece can grab almost anything.',
          },
        },
        {
          type: 'exercise',
          exercise: {
            id: 'l2-tac-discover-ex2',
            prompt: 'Your knight on e5 stands between your rook and the black king. White to move: win the black queen.',
            fen: '4k2r/pp3ppp/8/2p1N3/5B2/q1P5/P4PPP/4R1K1 w - - 0 1',
            solution: ['Nc4+', 'Kd7', 'Nxa3'],
            hint: 'Move the knight with discovered check to a square where it attacks the queen on a3.',
            explanation: 'Nc4+! uncovers a check from the rook on e1, and the knight itself attacks the queen on a3. Black must deal with the check first, and then Nxa3 takes the queen.',
          },
        },
        {
          type: 'exercise',
          exercise: {
            id: 'l2-tac-discover-ex3',
            prompt: 'Black\'s queen on d5 is hiding behind your bishop on d3. White to move: unleash your rook.',
            fen: '5rk1/pp3ppp/8/3q4/8/3B1N2/PP3PPP/3R2K1 w - - 0 1',
            solution: ['Bxh7+', 'Kxh7', 'Rxd5'],
            hint: 'If the bishop just moves away, the queen can take your rook. So the bishop must move with check!',
            explanation: 'Bxh7+! gives check, so Black has no time to save the queen. After ...Kxh7, Rxd5 wins the queen for a bishop. If the bishop had moved without check, Black would have played ...Qxd1+. That is why the moving piece should make a **forcing** threat.',
          },
        },
      ],
    },
  ],
}

// ---------------------------------------------------------------------------
// Module 5 · Simple endgames
// ---------------------------------------------------------------------------

const endgameModule: Module = {
  id: 'l2-endgames',
  level: 2,
  title: 'Simple Endgames',
  description: 'When only a few pieces are left: activate your king, push passed pawns, use the rule of the square and learn the opposition.',
  lessons: [
    {
      id: 'l2-end-king',
      title: 'Your king is a fighting piece',
      summary: 'In the endgame the king comes out of hiding and becomes one of your best pieces.',
      estMinutes: 7,
      blocks: [
        {
          type: 'text',
          md: md(`
            In the opening and middlegame you keep your king safe behind its pawns. But when most of the pieces have been traded, and especially once the **queens are gone**, there is nobody left to attack your king. Now it is time for the king to **join the fight**.

            In the endgame the king is a strong piece, worth roughly as much as a minor piece. It can:

            - **attack enemy pawns** and eat them,
            - **defend its own pawns**,
            - **escort a passed pawn** all the way to promotion,
            - and **block enemy pawns** from promoting.
          `),
        },
        {
          type: 'board',
          fen: '8/pp3ppp/3k4/3p4/8/8/PP3PPP/6K1 w - - 0 1',
          arrows: [['d6', 'c5'], ['g1', 'f1']],
          highlights: ['d6', 'g1'],
          caption: 'Same pawns, very different kings. Black\'s king on d6 is ready to march forward and attack; White\'s king on g1 is still asleep in the corner.',
        },
        {
          type: 'tip',
          title: 'Rule of thumb',
          md: md(`
            **When the queens come off, bring your king to the centre.** In a pawn endgame, the side with the more active king usually wins. Count moves: whose king gets to the important squares first?
          `),
        },
        {
          type: 'exercise',
          exercise: {
            id: 'l2-end-king-ex1',
            prompt: 'Black\'s pawn on d4 has gone too far and has no protection. White to move: use your king to win it.',
            fen: '8/pp2kppp/8/8/3p4/8/PPP1KPPP/8 w - - 0 1',
            solution: ['Kd3'],
            hint: 'Walk your king straight towards the pawn, before the black king can come to defend it.',
            explanation: 'Kd3! attacks the pawn at once. The black king on e7 is two moves away from defending it, so the pawn falls within a move or two (if it runs with ...d3, Kxd3). The king is the perfect piece for hunting loose pawns in the endgame.',
          },
        },
        {
          type: 'exercise',
          exercise: {
            id: 'l2-end-king-ex2',
            prompt: 'White\'s passed pawn on d5 is dangerous, but White\'s king is not protecting it yet. Black to move.',
            fen: '8/pp2kppp/8/3P4/8/8/PP2KPPP/8 b - - 0 1',
            solution: ['Kd6'],
            hint: 'Your king can reach the pawn in two moves. White\'s king needs two moves to protect it. Who moves first?',
            explanation: '...Kd6! attacks the pawn, and next move ...Kxd5 wins it, because the white king cannot reach c4, d4 or e4 in time. A slower move like ...h5 would let White play Kd3 and Kd4, and then the passed pawn would be a monster.',
          },
        },
      ],
    },
    {
      id: 'l2-end-passed',
      title: 'Passed pawns',
      summary: 'A pawn with no enemy pawns in its way can become a queen. Push it, and support it with your king.',
      estMinutes: 9,
      blocks: [
        {
          type: 'text',
          md: md(`
            A **passed pawn** is a pawn with **no enemy pawns in front of it**, on its own file or on the files next to it. Nothing but pieces can stop it from walking to the end of the board and becoming a queen.

            In the endgame, a passed pawn is often worth much more than one point. The other side has to use a piece, sometimes even the king, just to stop it.

            ### Three ideas to remember

            1. **Passed pawns must be pushed.** Every step forward makes the pawn more dangerous.
            2. **The king is the pawn\'s best bodyguard.** Put your king next to or in front of the pawn and walk it home together.
            3. **You can create a passed pawn** by trading or sacrificing pawns, even when there is none on the board yet.
          `),
        },
        {
          type: 'board',
          fen: '8/5ppp/8/1P6/8/8/5PPP/8 w - - 0 1',
          highlights: ['b6', 'b7', 'b8'],
          arrows: [['b5', 'b8']],
          caption: 'The pawn on b5 is passed: no black pawn on the a-, b- or c-file can ever block or capture it.',
        },
        {
          type: 'text',
          md: md(`
            ### The breakthrough

            Sometimes three pawns face three pawns and nobody seems to have a passed pawn. But if the pawns are close to promotion, a clever **pawn sacrifice** can force one through. This trick is called a **breakthrough**. You will meet it in the first exercise.
          `),
        },
        {
          type: 'tip',
          title: 'Common mistake',
          md: md(`
            Do not push a passed pawn into the arms of the enemy king if your own king is far away. A lonely pawn is easy to capture. **Bring the king first**, then push.
          `),
        },
        {
          type: 'exercise',
          exercise: {
            id: 'l2-end-passed-ex1',
            prompt: 'Both kings are far away. White to move: create a passed pawn with a breakthrough!',
            fen: '7k/ppp5/8/PPP5/8/8/8/7K w - - 0 1',
            solution: ['b6', 'axb6', 'c6'],
            hint: 'Sacrifice the middle pawn first. Then push the pawn that is no longer blocked.',
            explanation: 'b6! and after ...axb6, c6! Now ...bxc6 allows a6, and the a-pawn queens; if Black ignores it, cxb7 and the pawn on b7 queens. (After ...cxb6, a6! works the same way.) Two pawns were given away so that the third one can become a queen, and the black king is far too slow to stop it.',
          },
        },
        {
          type: 'exercise',
          exercise: {
            id: 'l2-end-passed-ex2',
            prompt: 'Your king supports your c-pawn. White to move: get the pawn to the 8th rank.',
            fen: '2k5/8/1KP5/8/8/8/8/8 w - - 0 1',
            solution: ['c7', 'Kd7', 'Kb7'],
            hint: 'Push the pawn while your king protects it, then use the king to guard the promotion square.',
            explanation: 'c7! is protected by the king, so Black cannot take it. After ...Kd7, Kb7! guards c8, and next move the pawn becomes a queen. The king and pawn worked as a team: the king protects, the pawn advances.',
          },
        },
      ],
    },
    {
      id: 'l2-end-square',
      title: 'The rule of the square',
      summary: 'A quick way to tell whether a king can catch a passed pawn, without counting every move.',
      estMinutes: 8,
      blocks: [
        {
          type: 'text',
          md: md(`
            Imagine a passed pawn running towards the end of the board, with only the enemy king to stop it. Can the king catch it? You could count every move, but there is a faster trick: **the rule of the square**.

            ### How to draw the square

            1. Draw a line from the pawn to its **promotion square**.
            2. Use that line as one side of a **square** on the board, drawn towards the enemy king.
            3. If the king is **inside the square**, or can **step into it on its move**, it catches the pawn. If not, the pawn promotes.
          `),
        },
        {
          type: 'board',
          fen: '8/8/8/6k1/1P6/8/8/7K w - - 0 1',
          highlights: ['b4', 'c4', 'd4', 'e4', 'f4', 'f5', 'f6', 'f7', 'f8', 'b8', 'c8', 'd8', 'e8', 'b5', 'b6', 'b7'],
          caption: 'The square of the b4-pawn runs from b4 to f4, f8 and b8. If it is Black\'s move, the king steps into the square (to f4, f5 or f6) and catches the pawn.',
        },
        {
          type: 'text',
          md: md(`
            When the pawn moves forward, **the square shrinks**. That is why the side to move matters so much. In the diagram, if it is **White\'s** move, b4-b5 makes the square smaller (b5 to e5, e8 and b8), and the black king on g5 can no longer step into it.
          `),
        },
        {
          type: 'tip',
          title: 'Watch out: the first pawn move',
          md: md(`
            A pawn on its **starting square** can move two squares at once. So for a pawn on the 2nd rank (or the 7th rank for Black), draw the square as if the pawn were **already one square further forward**.
          `),
        },
        {
          type: 'exercise',
          exercise: {
            id: 'l2-end-square-ex1',
            prompt: 'White\'s a-pawn is running for a8. Black to move: catch it!',
            fen: '8/8/8/8/P7/5k2/8/7K b - - 0 1',
            solution: ['Ke4', 'a5', 'Kd5', 'a6', 'Kc6', 'a7', 'Kb7'],
            hint: 'The square of the a4-pawn runs from a4 to e4, e8 and a8. Step into it, and stay inside it every move.',
            explanation: '...Ke4! is the only move that enters the square of the pawn. After that, the black king stays inside the shrinking square with every step (d5, c6, b7) and reaches the pawn in time. Any other first move, like ...Ke3, is one tempo too slow and the pawn queens.',
          },
        },
        {
          type: 'exercise',
          exercise: {
            id: 'l2-end-square-ex2',
            prompt: 'White to move: should you push the pawn or bring the king? Use the rule of the square.',
            fen: '8/8/8/6k1/1P6/8/8/7K w - - 0 1',
            solution: ['b5'],
            hint: 'If you push now, does the black king still fit into the new, smaller square?',
            explanation: 'b5! shrinks the square to b5-e5-e8-b8. The black king on g5 cannot step into it in one move, so the pawn runs through to b8. Any other move lets the king step into the square of the b4-pawn (for example ...Kf4) and catch it.',
          },
        },
        {
          type: 'exercise',
          exercise: {
            id: 'l2-end-square-ex3',
            prompt: 'White\'s pawn is still on its starting square. Black to move: catch it. Careful how you draw the square!',
            fen: '8/8/8/7K/8/8/P5k1/8 b - - 0 1',
            solution: ['Kf3'],
            hint: 'The pawn can jump to a4 in one move, so draw the square from a3, not from a2.',
            explanation: '...Kf3! enters the square of a3 (a3-f3-f8-a8). If you drew the square from a2, you might think ...Kg3 is fine too, but after a2-a4 the king would be one step too slow. Always remember the two-square first move!',
          },
        },
      ],
    },
    {
      id: 'l2-end-opposition',
      title: 'King and pawn against king: the opposition',
      summary: 'When the kings stand face to face, the side that does NOT have to move holds the advantage.',
      estMinutes: 10,
      blocks: [
        {
          type: 'text',
          md: md(`
            King and one pawn against a lone king is the most important endgame of all, because so many games turn into it. Sometimes it is a win and sometimes a draw, and the difference often comes down to one idea: **the opposition**.

            ### What is the opposition?

            The kings stand on the same file (or rank) with **one square between them**. Neither king may step next to the other, so they block each other. The player who must move has to **give way**, and the other king gets through.

            We say the side that has **just moved** into this position *has the opposition*. It is like a game of chicken where the one who must move loses.
          `),
        },
        {
          type: 'board',
          fen: '8/4k3/8/4K3/4P3/8/8/8 w - - 0 1',
          arrows: [['e5', 'e7']],
          highlights: ['d6', 'e6', 'f6'],
          caption: 'The kings face each other with one square between them. It is White\'s move, so Black has the opposition and keeps the white king out of d6, e6 and f6. With correct play this is a draw.',
        },
        {
          type: 'text',
          md: md(`
            ### Rules for the attacker (the side with the pawn)

            - Put your king **in front of the pawn**, not behind it.
            - Use the opposition to push the enemy king aside.
            - A king on the **6th rank in front of its pawn** wins, whoever is to move (except with an edge pawn on the a- or h-file).

            ### Rules for the defender

            - Keep your king **in front of the pawn**.
            - When the enemy king comes close, **take the opposition**.
            - If the pawn reaches the 7th rank with check, go to the square **in front of the pawn**, never to the side, and hope for stalemate.
          `),
        },
        {
          type: 'line',
          fen: '4k3/8/4K3/4P3/8/8/8/8 w - - 0 1',
          moves: ['Kd6', 'Kd8', 'e6', 'Ke8', 'e7', 'Kf7', 'Kd7', 'Kf6', 'e8=Q'],
          caption: 'King on the 6th rank in front of the pawn: a textbook win.',
          notes: {
            1: 'The king steps beside the pawn\'s path and guards d7 and e7, the squares in front of the pawn.',
            2: 'Black takes the opposition, but it is too late: the white king already controls the squares in front of the pawn.',
            3: 'The pawn moves up, protected by the king.',
            5: 'The pawn reaches the 7th rank, guarded by the king on d6. Black still has a legal move, so there is no stalemate.',
            6: 'The black king must leave the queening square.',
            7: 'The king guards e8 and the pawn walks in.',
            9: 'A new queen. Now you already know how to checkmate with queen and king.',
          },
        },
        {
          type: 'tip',
          title: 'Stalemate alarm',
          md: md(`
            With king and pawn against king, the defender\'s last hope is **stalemate**. Before every move near the corner or the edge, check that the lonely king still has a legal move after you play.
          `),
        },
        {
          type: 'exercise',
          exercise: {
            id: 'l2-end-opp-ex1',
            prompt: 'You are defending. Black to move: find the only move that draws.',
            fen: '8/5k2/8/4K3/4P3/8/8/8 b - - 0 1',
            solution: ['Ke7', 'Kd5', 'Kd7'],
            hint: 'Face the white king with one square between you, and keep doing it.',
            explanation: '...Ke7! takes the opposition. When White steps to the side with Kd5, Black follows with ...Kd7! and keeps the opposition again. The white king can never reach d6, e6 or f6, so the game is a draw. Any other first move lets the white king through to the 6th rank.',
          },
        },
        {
          type: 'exercise',
          exercise: {
            id: 'l2-end-opp-ex2',
            prompt: 'White to move: take the opposition and win.',
            fen: '8/8/8/4k3/8/3K4/4P3/8 w - - 0 1',
            solution: ['Ke3'],
            hint: 'Put your king directly opposite the black king, with one square between them. Then it is Black who must give way.',
            explanation: 'Ke3! takes the opposition. Now Black must move and give way: if ...Kd5, then Kf4 and the white king gets in front of the pawn; if ...Kf5, then Kd4. With the white king in front of the pawn, the win is easy. Pushing the pawn first, with e3 or e4, would let Black hold the draw.',
          },
        },
      ],
    },
  ],
}

// ---------------------------------------------------------------------------
// Module 6 · How to think during a game
// ---------------------------------------------------------------------------

const thinkingModule: Module = {
  id: 'l2-thinking',
  level: 2,
  title: 'How to Think During a Game',
  description: 'A simple routine for choosing moves, plus what to do when you are ahead and when you are behind.',
  lessons: [
    {
      id: 'l2-think-routine',
      title: 'A move-selection routine',
      summary: 'Three questions to ask every move: what is the threat, what are my candidates, and is my move safe?',
      estMinutes: 10,
      blocks: [
        {
          type: 'text',
          md: md(`
            You now know a lot of chess: opening principles, how not to hang pieces, basic mates, tactics and endgames. But in a real game nobody tells you "find the fork!". You have to **notice** it yourself, and you also have to notice your opponent\'s ideas.

            The answer is a **routine**: the same short list of questions, every single move. At first it feels slow. After a few weeks it becomes a habit, and your results jump.

            ### The routine

            1. **What does my opponent threaten?** Look at the move they just played. What does it attack? Is there a check, a capture or a mate threat coming?
            2. **What are my candidate moves?** Look first at **checks, captures and threats**, for you. Then at good developing or improving moves. Pick two or three candidates.
            3. **Blunder check.** Before you touch the piece, imagine your move on the board and ask: what checks, captures and threats does my opponent have *now*?
          `),
        },
        {
          type: 'line',
          fen: 'r4rk1/p1p2ppp/3b4/8/7q/5B2/PPPNQPPP/5RK1 w - - 0 1',
          moves: ['Bxa8', 'Qxh2#'],
          caption: 'What happens when you skip step 1.',
          notes: {
            1: 'White grabs the rook on a8, without asking what Black was threatening.',
            2: 'Checkmate. The queen and the bishop on d6 were both aiming at h2. One question, "What does my opponent threaten?", would have saved the game.',
          },
        },
        {
          type: 'tip',
          title: 'Forcing moves first',
          md: md(`
            When you look for candidate moves, start with **checks, then captures, then threats**. These forcing moves give your opponent the fewest choices, so they are the easiest to calculate and the most likely to win something.
          `),
        },
        {
          type: 'exercise',
          exercise: {
            id: 'l2-think-routine-ex1',
            prompt: 'The black rook on a8 is attacked by your bishop. But first, step 1: what is Black threatening? White to move.',
            fen: 'r4rk1/p1p2ppp/3b4/8/7q/5B2/PPPNQPPP/5RK1 w - - 0 1',
            solution: ['g3'],
            hint: 'Black\'s queen and bishop both aim at h2. Find a defence that also attacks something.',
            explanation: 'g3! blocks the bishop\'s diagonal and attacks the queen at the same time, so Black has no time for anything else. The bishop still attacks the rook on a8, so White can win the exchange next move with Bxa8. Defend first, then grab.',
          },
        },
        {
          type: 'exercise',
          exercise: {
            id: 'l2-think-routine-ex2',
            prompt: 'Black threatens ...Qe1#. But it is your move, and checks come first. White to move: checkmate in one.',
            fen: '5rk1/pp3p1p/5QpB/q7/8/8/PP3PPP/6K1 w - - 0 1',
            goal: 'mate',
            solution: ['Qg7#'],
            hint: 'Look at every check you have. Which one is protected by your bishop?',
            explanation: 'Qg7# is mate: the queen is protected by the bishop on h6, and the black king has no squares. If White had only looked at defending against ...Qe1#, this would have been missed. **Always check your own checks first.**',
          },
        },
        {
          type: 'exercise',
          exercise: {
            id: 'l2-think-routine-ex3',
            prompt: 'Black\'s bishop on d4 can be taken by your queen or your knight. Do the blunder check before you choose. White to move.',
            fen: '5rk1/ppq2ppp/8/4n3/3b4/1N4P1/PPP2P1P/3Q1RK1 w - - 0 1',
            solution: ['Nxd4'],
            hint: 'Imagine each capture on the board. After Qxd4, which black knight move gives check?',
            explanation: 'Nxd4 wins the bishop safely. Qxd4?? looks just as good, but after it Black plays ...Nf3+, a royal fork of the king and the queen, and White loses the queen. Nothing can capture on f3, because the g-pawn is no longer on g2. The blunder check catches exactly this kind of trick.',
          },
        },
      ],
    },
    {
      id: 'l2-think-ahead',
      title: 'Trading when you are ahead',
      summary: 'Up material? Trade pieces, keep it simple, and let your extra material win the endgame.',
      estMinutes: 7,
      blocks: [
        {
          type: 'text',
          md: md(`
            You have won a piece. Congratulations! Now you have to **win the game**, and many players throw the advantage away by getting careless or by letting the opponent build an attack.

            The simplest plan: **trade pieces**.

            ### Why trading helps the side that is ahead

            - Being a piece up with **few pieces left** is a much bigger advantage than being a piece up with everything still on the board. 3 against 0 is easier than 23 against 20.
            - Every trade removes an enemy piece that could attack your king or set a trap.
            - Trading **queens** is especially good, because the queen is the opponent\'s best piece for tricks, checks and swindles.

            ### What NOT to trade

            Trade **pieces**, not **pawns**. Pawns are what you will promote in the endgame. If you trade off all the pawns, even an extra piece might not be enough to mate.
          `),
        },
        {
          type: 'board',
          fen: '3r4/4kppp/8/8/8/2N5/5PPP/3R2K1 w - - 0 1',
          arrows: [['d1', 'd8']],
          highlights: ['d8'],
          caption: 'White is a knight ahead. Rxd8 Kxd8 trades off the last pair of rooks. Then Black has nothing left to fight with, and the white king and knight will win the endgame.',
        },
        {
          type: 'tip',
          title: 'Rule of thumb',
          md: md(`
            **When ahead, trade pieces. When behind, avoid trades.** Before every trade, ask yourself: "Does this trade make my advantage bigger or smaller?"
          `),
        },
        {
          type: 'exercise',
          exercise: {
            id: 'l2-think-ahead-ex1',
            prompt: 'You are a whole rook ahead. White to move: find the move that trades queens at once.',
            fen: '6k1/ppp2pp1/3q3p/8/8/8/PPPQ1PPP/4R1K1 w - - 0 1',
            solution: ['Qxd6'],
            hint: 'The black queen is defended only by a pawn. Offer the trade by capturing it.',
            explanation: 'Qxd6! cxd6 removes Black\'s only dangerous piece. Now White has a rook against nothing, and can calmly bring the rook and the king into the game and promote a pawn. No queen, no tricks.',
          },
        },
        {
          type: 'exercise',
          exercise: {
            id: 'l2-think-ahead-ex2',
            prompt: 'You are a pawn up. White to move: trade into an endgame where your extra pawn decides.',
            fen: '3r4/pp2kpp1/8/8/8/8/PP3PPP/3R1K2 w - - 0 1',
            solution: ['Rxd8'],
            hint: 'With only kings and pawns left, an extra pawn usually wins. Which trade gets you there?',
            explanation: 'Rxd8! Kxd8 leads to a pawn endgame with an extra pawn for White. White has three pawns against two on the kingside, so sooner or later a passed pawn appears there, and the black king cannot stop it and defend the queenside at the same time. With the rooks still on, Black would have far more chances to fight back.',
          },
        },
      ],
    },
    {
      id: 'l2-think-behind',
      title: 'When you are behind: keep fighting',
      summary: 'A worse position is not a lost game. Look for checks, tricks, perpetual check and stalemate.',
      estMinutes: 8,
      blocks: [
        {
          type: 'text',
          md: md(`
            Everybody loses material sometimes. The question is what you do next. Players at your level resign far too early, and they give away lots of half-points and even full points by doing so.

            ### How to play when you are behind

            - **Do not trade pieces.** Every trade makes your opponent\'s job easier.
            - **Keep pieces active** and look for **checks and threats**. Your opponent may relax now that they are winning.
            - **Look for a fork or a pin** that wins the material back.
            - **Look for a draw**: **perpetual check** (checking forever, so the game is drawn) or **stalemate**.
          `),
        },
        {
          type: 'line',
          fen: 'k7/p7/2p5/4Q3/6n1/7p/5q1P/7K w - - 0 1',
          moves: ['Qb8+', 'Kxb8'],
          caption: 'A stalemate swindle: White is about to be mated, but finds a way out.',
          notes: {
            1: 'Black threatens ...Qxh2#. White offers the queen with check, and Black has to take it.',
            2: 'Stalemate! White is not in check, but the king has no squares and the h2-pawn is blocked. The game is a draw.',
          },
        },
        {
          type: 'tip',
          title: 'Perpetual check',
          md: md(`
            If your queen can keep checking the enemy king and it can never escape the checks, the game is a draw by **repetition**. When you are losing, perpetual check is a lifesaver. Look for a king with few defenders and no pawn shelter.
          `),
        },
        {
          type: 'exercise',
          exercise: {
            id: 'l2-think-behind-ex1',
            prompt: 'You are a rook down and Black threatens to mate your king. White to move: save the game with checks.',
            fen: '6k1/6p1/4p3/7Q/8/8/1qr2PPP/7K w - - 0 1',
            solution: ['Qe8+', 'Kh7', 'Qh5+'],
            hint: 'Check from e8. After the king hides on h7, check it again along the h-file.',
            explanation: 'Qe8+ Kh7 Qh5+ Kg8 Qe8+ and so on: the black king can only shuffle between g8 and h7, and Black cannot block the checks. White repeats the position and the game is drawn by **perpetual check**. Any quiet move would have let Black mate.',
          },
        },
        {
          type: 'exercise',
          exercise: {
            id: 'l2-think-behind-ex2',
            prompt: 'You are a rook down. Black to move: find the trick that wins your material back.',
            fen: '3r2k1/pp3ppp/8/8/3n4/8/PP3PPP/R3K1NR b - - 0 1',
            solution: ['Nc2+', 'Ke2', 'Nxa1'],
            hint: 'Your knight can check the king and attack the rook on a1 at the same time.',
            explanation: '...Nc2+! is a royal fork of the king and the rook on a1. The king cannot go to d1 or d2 because of your rook on d8, and after it moves, ...Nxa1 wins the rook back. Black is back in the game. Never stop looking for tactics, especially when you are behind!',
          },
        },
      ],
    },
  ],
}

export const level2: Module[] = [openingModule, safetyModule, matesModule, tacticsModule, endgameModule, thinkingModule]
