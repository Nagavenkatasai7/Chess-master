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

export const level2: Module[] = [openingModule]
