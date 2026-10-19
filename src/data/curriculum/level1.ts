import type { Module } from '../types.ts'

/** Trim every line so the markdown below can be indented with the code. */
const md = (s: string): string =>
  s
    .trim()
    .split('\n')
    .map((line) => line.trim())
    .join('\n')

const START = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
const EMPTY = '8/8/8/8/8/8/8/8 w - - 0 1'

// ---------------------------------------------------------------------------
// Module 1 · The chessboard
// ---------------------------------------------------------------------------

const boardModule: Module = {
  id: 'l1-board',
  level: 1,
  title: 'The Chessboard',
  description: 'What chess is, how to set up the board, and how every square gets its name.',
  lessons: [
    {
      id: 'l1-what-is-chess',
      title: 'What is chess?',
      summary: 'Two armies, one goal: trap the enemy king.',
      estMinutes: 4,
      blocks: [
        {
          type: 'text',
          md: md(`
            Welcome! Chess is a game for two players, **White** and **Black**. Each player commands an army of 16 pieces on a board of 64 squares.

            You do not need any experience to start this course. We will build your chess knowledge one small, solid step at a time, and you will play through every idea on a real board.
          `),
        },
        {
          type: 'board',
          fen: START,
          caption: 'The starting position. White\'s army is at the bottom, Black\'s army is at the top.',
        },
        {
          type: 'text',
          md: md(`
            ### The rules in a nutshell

            1. **White always moves first.**
            2. Then the players take turns, one move each. You are not allowed to "pass".
            3. You **capture** an enemy piece by moving one of your pieces onto its square. The captured piece is removed from the board.
            4. You win by **checkmate**: attacking the enemy king so that it has no way to escape.

            You can never capture your own pieces, and only one piece may stand on a square at a time.
          `),
        },
        {
          type: 'board',
          fen: '8/8/8/n7/8/8/8/R7 w - - 0 1',
          arrows: [['a1', 'a5']],
          caption: 'A capture: the white rook moves onto the black knight\'s square, and the knight leaves the board.',
        },
        {
          type: 'tip',
          title: 'Meet the army',
          md: md(`
            Each side starts with:

            - 1 king
            - 1 queen
            - 2 rooks
            - 2 bishops
            - 2 knights
            - 8 pawns

            In the next lessons you will learn exactly how each of them moves.
          `),
        },
        {
          type: 'text',
          md: md(`
            The king is never actually taken off the board. When it is trapped with no escape, that is **checkmate** and the game is over on the spot. That is why everything in chess, in the end, is about the kings.
          `),
        },
      ],
    },
    {
      id: 'l1-setup',
      title: 'Setting up the board',
      summary: 'Light square on the right, queen on her colour.',
      estMinutes: 5,
      blocks: [
        {
          type: 'text',
          md: md(`
            The chessboard has 8 rows and 8 columns: 64 squares in all, alternating light and dark.

            The first thing to get right is which way round the board goes. Remember: **light on the right**. The corner square nearest your right hand must be a light square.
          `),
        },
        {
          type: 'board',
          fen: EMPTY,
          highlights: ['h1', 'a8'],
          caption: 'White\'s right-hand corner (h1) is light. So is Black\'s right-hand corner (a8).',
        },
        {
          type: 'text',
          md: md(`
            Now place the pieces, starting in the corners and working inwards. Both armies mirror each other exactly.
          `),
        },
        {
          type: 'board',
          fen: 'r6r/8/8/8/8/8/8/R6R w - - 0 1',
          caption: 'Step 1: the rooks go in the four corners.',
        },
        {
          type: 'board',
          fen: 'rn4nr/8/8/8/8/8/8/RN4NR w - - 0 1',
          caption: 'Step 2: the knights stand next to the rooks.',
        },
        {
          type: 'board',
          fen: 'rnb2bnr/8/8/8/8/8/8/RNB2BNR w - - 0 1',
          caption: 'Step 3: the bishops stand next to the knights.',
        },
        {
          type: 'board',
          fen: 'rnbq1bnr/8/8/8/8/8/8/RNBQ1BNR w - - 0 1',
          highlights: ['d1', 'd8'],
          caption: 'Step 4: the queen goes on her own colour. The white queen on a light square, the black queen on a dark square.',
        },
        {
          type: 'board',
          fen: 'rnbqkbnr/8/8/8/8/8/8/RNBQKBNR w KQkq - 0 1',
          highlights: ['e1', 'e8'],
          caption: 'Step 5: the king takes the last square, next to his queen. The two kings face each other.',
        },
        {
          type: 'board',
          fen: START,
          caption: 'Step 6: a row of eight pawns in front of the pieces. Ready to play!',
        },
        {
          type: 'tip',
          title: 'Two rules to remember',
          md: md(`
            - **Light on the right**: the bottom-right square is light.
            - **Queen on her colour**: white queen on a light square, black queen on a dark square.

            If you get these two right, everything else falls into place. A common mistake is to swap the king and queen, so check the queens every time you set up.
          `),
        },
      ],
    },
    {
      id: 'l1-coordinates',
      title: 'Files, ranks and square names',
      summary: 'Every square has a name like e4. Learn to find them quickly.',
      estMinutes: 7,
      blocks: [
        {
          type: 'text',
          md: md(`
            To talk about chess, every square needs a name. Chess players use a simple grid system.

            - The columns are called **files**. They are lettered **a** to **h**, from White's left to White's right.
            - The rows are called **ranks**. They are numbered **1** to **8**, starting from White's side.

            A square's name is its file letter followed by its rank number. The square where the e-file meets the 4th rank is called **e4**.
          `),
        },
        {
          type: 'board',
          fen: EMPTY,
          highlights: ['e1', 'e2', 'e3', 'e4', 'e5', 'e6', 'e7', 'e8'],
          caption: 'The e-file: a column running from White\'s side to Black\'s side.',
        },
        {
          type: 'board',
          fen: EMPTY,
          highlights: ['a4', 'b4', 'c4', 'd4', 'e4', 'f4', 'g4', 'h4'],
          caption: 'The 4th rank: a row running from left to right.',
        },
        {
          type: 'board',
          fen: EMPTY,
          highlights: ['e4'],
          arrows: [['e1', 'e4'], ['a4', 'e4']],
          caption: 'e4 is where the e-file and the 4th rank cross.',
        },
        {
          type: 'text',
          md: md(`
            ### Diagonals

            A **diagonal** is a slanting line of squares that all share the same colour. We name a diagonal by its two end squares. The two longest diagonals, a1–h8 and h1–a8, cross the whole board and are called the **long diagonals**.

            Square names never change. Even when you play Black and see the board from the other side, e4 is still e4.
          `),
        },
        {
          type: 'board',
          fen: EMPTY,
          highlights: ['a1', 'b2', 'c3', 'd4', 'e5', 'f6', 'g7', 'h8', 'h1', 'g2', 'f3', 'e4', 'd5', 'c6', 'b7', 'a8'],
          caption: 'The two long diagonals: a1–h8 (all dark squares) and h1–a8 (all light squares).',
        },
        {
          type: 'tip',
          title: 'Quick landmarks',
          md: md(`
            - White's pieces start on ranks 1 and 2; Black's on ranks 7 and 8.
            - The queens start on the **d-file** and the kings on the **e-file**.
            - a1 is always a dark square, in White's left corner.
          `),
        },
        {
          type: 'text',
          md: md(`
            Time to practise. In these exercises you move a rook (it slides in straight lines, as many squares as you like). Collect every star by landing on its square. Say each square's name to yourself as you go.
          `),
        },
        {
          type: 'exercise',
          exercise: {
            id: 'l1-coord-ex1',
            prompt: 'Your rook is on **a1**. Move it to **d1**, the square on the d-file and the 1st rank.',
            fen: '8/8/8/8/8/8/8/R7 w - - 0 1',
            goal: 'stars',
            stars: ['d1'],
            maxMoves: 1,
            hint: 'Count the files from the left: a, b, c, d. Stay on the bottom row (rank 1).',
            explanation: 'd1 is on the d-file and the 1st rank. It is the square where the white queen starts the game.',
          },
        },
        {
          type: 'exercise',
          exercise: {
            id: 'l1-coord-ex2',
            prompt: 'Visit **a8** and **h8**, the two corners on Black\'s side, in 2 moves.',
            fen: '8/8/8/8/8/8/8/R7 w - - 0 1',
            goal: 'stars',
            stars: ['a8', 'h8'],
            maxMoves: 2,
            hint: 'First go straight up the a-file to the 8th rank, then slide right along it.',
            explanation: 'a8 and h8 are both on the 8th rank, the row where Black\'s pieces start. a8 is light and h8 is dark.',
          },
        },
        {
          type: 'exercise',
          exercise: {
            id: 'l1-coord-ex3',
            prompt: 'From **d4**, visit **d7**, **g7**, **g2** and **b2** in 4 moves.',
            fen: '8/8/8/8/3R4/8/8/8 w - - 0 1',
            goal: 'stars',
            stars: ['d7', 'g7', 'g2', 'b2'],
            maxMoves: 4,
            hint: 'Visit them in the order given: up the d-file, right along the 7th rank, down the g-file, then left along the 2nd rank.',
            explanation: 'You drew a square around the middle of the board: d7 and g7 share the 7th rank, g7 and g2 share the g-file, g2 and b2 share the 2nd rank.',
          },
        },
      ],
    },
  ],
}

// ---------------------------------------------------------------------------
// Module 2 · Rook, bishop, queen and king
// ---------------------------------------------------------------------------

const piecesOneModule: Module = {
  id: 'l1-pieces-1',
  level: 1,
  title: 'The Pieces, Part 1',
  description: 'How the rook, bishop, queen and king move and capture.',
  lessons: [
    {
      id: 'l1-rook',
      title: 'The rook',
      summary: 'Straight lines, any distance.',
      estMinutes: 7,
      blocks: [
        {
          type: 'text',
          md: md(`
            The **rook** moves in straight lines: up, down, left or right, as many squares as it likes. It cannot jump over other pieces.

            Like every piece except the pawn, the rook captures the same way it moves: it lands on the enemy piece's square.
          `),
        },
        {
          type: 'board',
          fen: '8/8/8/8/3R4/8/8/8 w - - 0 1',
          arrows: [['d4', 'd8'], ['d4', 'd1'], ['d4', 'a4'], ['d4', 'h4']],
          caption: 'From d4 the rook can reach any square on the d-file or the 4th rank: 14 squares.',
        },
        {
          type: 'board',
          fen: '8/8/3P4/8/3R1n2/8/8/8 w - - 0 1',
          highlights: ['d5', 'd3', 'd2', 'd1', 'c4', 'b4', 'a4', 'e4', 'f4'],
          caption: 'Its own pawn on d6 blocks the way up. It can capture the knight on f4, but cannot go past it.',
        },
        {
          type: 'tip',
          title: 'Rooks love open lines',
          md: md(`
            A rook is strongest on a file with no pawns in the way. At the start of the game the rooks are stuck in the corners, so they usually join the fight later. A rook is worth about **5 points** (more on piece values soon).
          `),
        },
        {
          type: 'exercise',
          exercise: {
            id: 'l1-rook-ex1',
            prompt: 'Collect both stars with the rook in 2 moves.',
            fen: '8/8/8/8/8/2R5/8/8 w - - 0 1',
            goal: 'stars',
            stars: ['c8', 'h8'],
            maxMoves: 2,
            hint: 'Go up the c-file first, then along the 8th rank.',
            explanation: 'The rook can travel the whole length of the board in a single move, as long as nothing is in the way.',
          },
        },
        {
          type: 'exercise',
          exercise: {
            id: 'l1-rook-ex2',
            prompt: 'Your own pawns are in the way. Reach the star on **e6** in 3 moves.',
            fen: '8/8/8/8/P7/8/8/R2P4 w - - 0 1',
            goal: 'stars',
            stars: ['e6'],
            maxMoves: 3,
            hint: 'The rook cannot jump. Step out sideways or upwards first, then find a clear file or rank leading to e6.',
            explanation: 'One route is Ra3, Re3, Re6. Another is Rc1, Rc6, Re6. Planning a route around obstacles is a big part of playing with rooks.',
          },
        },
        {
          type: 'exercise',
          exercise: {
            id: 'l1-rook-ex3',
            prompt: 'Capture all the black pieces in 3 moves. They will not move.',
            fen: '8/8/2n4p/8/8/8/2b5/7R w - - 0 1',
            goal: 'capture-all',
            maxMoves: 3,
            hint: 'Which black piece can the rook capture right now? Start there and keep going.',
            explanation: 'Rxh6, Rxc6, Rxc2. Each capture lands the rook on a line leading to the next target.',
          },
        },
        {
          type: 'exercise',
          exercise: {
            id: 'l1-rook-ex4',
            prompt: 'Capture all four pawns in 4 moves.',
            fen: '1p2p3/8/8/p3p3/8/8/8/R7 w - - 0 1',
            goal: 'capture-all',
            maxMoves: 4,
            hint: 'Start with the pawn on the a-file and then zig-zag: right, up, left.',
            explanation: 'Rxa5, Rxe5, Rxe8, Rxb8. With one move per pawn there is no time to waste, so the order matters.',
          },
        },
      ],
    },
    {
      id: 'l1-bishop',
      title: 'The bishop',
      summary: 'Diagonals only, and always on one colour.',
      estMinutes: 7,
      blocks: [
        {
          type: 'text',
          md: md(`
            The **bishop** moves diagonally, any number of squares, and cannot jump over pieces.

            Because it only moves diagonally, a bishop **never changes colour**. A bishop that starts on a dark square stays on dark squares for the whole game. That is why each side has one **light-squared bishop** and one **dark-squared bishop**.
          `),
        },
        {
          type: 'board',
          fen: '8/8/8/8/3B4/8/8/8 w - - 0 1',
          arrows: [['d4', 'h8'], ['d4', 'a7'], ['d4', 'a1'], ['d4', 'g1']],
          caption: 'From d4 the bishop sweeps along two diagonals: 13 squares, all of them dark.',
        },
        {
          type: 'board',
          fen: '8/8/8/8/8/8/8/2B2B2 w - - 0 1',
          highlights: ['c1', 'f1'],
          caption: 'White\'s bishops start on c1 (a dark square) and f1 (a light square). They can never meet.',
        },
        {
          type: 'tip',
          title: 'Worth about 3 points',
          md: md(`
            A bishop is worth about the same as a knight: roughly **3 pawns**. Bishops are happiest on long, open diagonals, where they can attack from far away.
          `),
        },
        {
          type: 'exercise',
          exercise: {
            id: 'l1-bishop-ex1',
            prompt: 'Collect both stars with the bishop in 2 moves.',
            fen: '8/8/8/8/8/8/8/2B5 w - - 0 1',
            goal: 'stars',
            stars: ['f4', 'd6'],
            maxMoves: 2,
            hint: 'Go up and to the right to f4 first. From there, d6 is on another diagonal.',
            explanation: 'Bf4, then Bd6. Notice that all three squares are dark: this bishop can never visit a light square.',
          },
        },
        {
          type: 'exercise',
          exercise: {
            id: 'l1-bishop-ex2',
            prompt: 'Collect all three stars in 3 moves.',
            fen: '8/8/8/8/8/8/8/5B2 w - - 0 1',
            goal: 'stars',
            stars: ['b5', 'e8', 'h5'],
            maxMoves: 3,
            hint: 'Start with the star you can reach right now: b5.',
            explanation: 'Bb5, Be8, Bh5. The light-squared bishop zig-zags across the board along light squares only.',
          },
        },
        {
          type: 'exercise',
          exercise: {
            id: 'l1-bishop-ex3',
            prompt: 'Capture all the black pieces in 3 moves.',
            fen: '8/8/3r4/8/1n3p2/8/8/2B5 w - - 0 1',
            goal: 'capture-all',
            maxMoves: 3,
            hint: 'Only one black piece is on the bishop\'s diagonals right now. Take it, then look again.',
            explanation: 'Bxf4, Bxd6, Bxb4. Every target stood on a dark square, the only squares this bishop can ever reach.',
          },
        },
        {
          type: 'exercise',
          exercise: {
            id: 'l1-bishop-ex4',
            prompt: 'Capture all four black pieces in 4 moves.',
            fen: '8/3r4/8/1p6/6n1/8/4p3/5B2 w - - 0 1',
            goal: 'capture-all',
            maxMoves: 4,
            hint: 'Start with the pawn right next to your bishop.',
            explanation: 'Bxe2, Bxb5, Bxd7, Bxg4. Each capture puts the bishop on a diagonal with the next target.',
          },
        },
      ],
    },
    {
      id: 'l1-queen',
      title: 'The queen',
      summary: 'Rook plus bishop: the most powerful piece.',
      estMinutes: 6,
      blocks: [
        {
          type: 'text',
          md: md(`
            The **queen** combines the rook and the bishop. She moves any number of squares in a straight line **or** along a diagonal. Like them, she cannot jump.

            The queen is by far your strongest piece, worth about **9 points**. Treat her with care: losing your queen usually means losing the game.
          `),
        },
        {
          type: 'board',
          fen: '8/8/8/8/3Q4/8/8/8 w - - 0 1',
          arrows: [
            ['d4', 'd8'],
            ['d4', 'd1'],
            ['d4', 'a4'],
            ['d4', 'h4'],
            ['d4', 'h8'],
            ['d4', 'a7'],
            ['d4', 'a1'],
            ['d4', 'g1'],
          ],
          caption: 'From the centre the queen controls 27 squares in eight directions.',
        },
        {
          type: 'tip',
          title: 'Power means responsibility',
          md: md(`
            Because the queen is so valuable, the enemy can chase her with much cheaper pieces. Later you will learn why it is usually wrong to bring the queen out in the first few moves.
          `),
        },
        {
          type: 'exercise',
          exercise: {
            id: 'l1-queen-ex1',
            prompt: 'Collect all three stars with the queen in 3 moves.',
            fen: '8/8/8/8/8/8/8/3Q4 w - - 0 1',
            goal: 'stars',
            stars: ['a4', 'e8', 'h5'],
            maxMoves: 3,
            hint: 'Every star is on a diagonal from the one before. Start with a4 or h5.',
            explanation: 'For example Qa4, Qe8, Qh5. The queen uses diagonals just like a bishop.',
          },
        },
        {
          type: 'exercise',
          exercise: {
            id: 'l1-queen-ex2',
            prompt: 'Capture all five black pieces in 5 moves.',
            fen: 'r6b/8/8/3n4/8/1p5p/8/3Q4 w - - 0 1',
            goal: 'capture-all',
            maxMoves: 5,
            hint: 'You need one capture per move, so every move must take something. Look for a target that leads on to the next.',
            explanation: 'One solution: Qxd5, Qxa8, Qxh8, Qxh3, Qxb3. The queen switches between straight lines and diagonals whenever she likes.',
          },
        },
      ],
    },
    {
      id: 'l1-king',
      title: 'The king',
      summary: 'One step at a time, and never into danger.',
      estMinutes: 7,
      blocks: [
        {
          type: 'text',
          md: md(`
            The **king** is the most important piece: if he is checkmated, you lose. But he is not very fast. The king moves **one square in any direction**.

            Two rules make the king special:

            - The king may **never move onto a square that is attacked** by an enemy piece.
            - So the two kings can never stand next to each other.
          `),
        },
        {
          type: 'board',
          fen: '8/8/8/8/4K3/8/8/8 w - - 0 1',
          highlights: ['d3', 'd4', 'd5', 'e3', 'e5', 'f3', 'f4', 'f5'],
          caption: 'The king on e4 can step to any of the eight squares around him.',
        },
        {
          type: 'board',
          fen: '8/8/8/r7/4K3/8/8/8 w - - 0 1',
          highlights: ['d3', 'd4', 'e3', 'f3', 'f4'],
          caption: 'The black rook controls the 5th rank, so d5, e5 and f5 are forbidden. The king may only use the highlighted squares.',
        },
        {
          type: 'tip',
          title: 'A sleeping giant',
          md: md(`
            While there are lots of pieces on the board, keep your king safely tucked away. When most pieces have been traded, the king wakes up and becomes a strong fighter.
          `),
        },
        {
          type: 'exercise',
          exercise: {
            id: 'l1-king-ex1',
            prompt: 'Walk the king to all three stars in 5 moves.',
            fen: '8/8/8/8/8/8/8/3K4 w - - 0 1',
            goal: 'stars',
            stars: ['d3', 'f3', 'g2'],
            maxMoves: 5,
            hint: 'One step at a time: two steps up to d3, two steps right to f3, then one diagonal step to g2.',
            explanation: 'The king is slow, so plan the shortest route. Diagonal steps count as one move, just like straight ones.',
          },
        },
        {
          type: 'exercise',
          exercise: {
            id: 'l1-king-ex2',
            prompt: 'Capture both pawns with the king in 4 moves. Careful: the king may not step onto a square a pawn attacks.',
            fen: '8/8/3p4/2p5/K7/8/8/8 w - - 0 1',
            goal: 'capture-all',
            maxMoves: 4,
            hint: 'The pawn on d6 protects the pawn on c5, so you cannot take c5 first. Go round and take d6.',
            explanation: 'Kb5, Kc6, Kxd6 and then Kxc5. A king can only capture a piece that nothing else protects. Black pawns attack diagonally downwards, so the pawn on c5 also guards b4 and d4.',
          },
        },
      ],
    },
  ],
}

// ---------------------------------------------------------------------------
// Module 3 · Knight, pawn and piece values
// ---------------------------------------------------------------------------

const piecesTwoModule: Module = {
  id: 'l1-pieces-2',
  level: 1,
  title: 'The Pieces, Part 2',
  description: 'The jumping knight, the humble pawn, and how much every piece is worth.',
  lessons: [
    {
      id: 'l1-knight',
      title: 'The knight',
      summary: 'The L-shaped jumper.',
      estMinutes: 8,
      blocks: [
        {
          type: 'text',
          md: md(`
            The **knight** moves in an **L-shape**: two squares in a straight line, then one square to the side. (Or one square, then two. It is the same thing.)

            The knight is the only piece that can **jump over** other pieces, friend or enemy. It only captures on the square where it lands.
          `),
        },
        {
          type: 'board',
          fen: '8/8/8/8/3N4/8/8/8 w - - 0 1',
          arrows: [
            ['d4', 'b5'],
            ['d4', 'c6'],
            ['d4', 'e6'],
            ['d4', 'f5'],
            ['d4', 'f3'],
            ['d4', 'e2'],
            ['d4', 'c2'],
            ['d4', 'b3'],
          ],
          caption: 'A knight in the centre reaches 8 squares.',
        },
        {
          type: 'board',
          fen: '8/8/8/8/8/8/5PPP/6N1 w - - 0 1',
          arrows: [['g1', 'f3'], ['g1', 'h3'], ['g1', 'e2']],
          caption: 'Even when it is surrounded, the knight simply jumps out.',
        },
        {
          type: 'tip',
          title: 'Two handy facts',
          md: md(`
            - Every knight move lands on a square of the **opposite colour**. From a light square it always goes to a dark one, and the other way round.
            - "**A knight on the rim is dim.**" On the edge of the board a knight reaches only 3 or 4 squares, and in a corner just 2. Knights belong near the centre.
          `),
        },
        {
          type: 'exercise',
          exercise: {
            id: 'l1-knight-ex1',
            prompt: 'Collect both stars with the knight in 2 moves.',
            fen: '8/8/8/8/8/8/8/1N6 w - - 0 1',
            goal: 'stars',
            stars: ['c3', 'd5'],
            maxMoves: 2,
            hint: 'Two squares up and one to the right takes you to c3. Do it again!',
            explanation: 'Nc3 and Nd5. This is a very common route for a knight in real games.',
          },
        },
        {
          type: 'exercise',
          exercise: {
            id: 'l1-knight-ex2',
            prompt: 'Collect all three stars in 3 moves.',
            fen: '8/8/8/8/8/8/8/6N1 w - - 0 1',
            goal: 'stars',
            stars: ['f3', 'h4', 'g6'],
            maxMoves: 3,
            hint: 'Start with f3. From f3, which L-shape lands on h4?',
            explanation: 'Nf3, Nh4, Ng6. Picture each L before you move: two squares one way, one square to the side.',
          },
        },
        {
          type: 'exercise',
          exercise: {
            id: 'l1-knight-ex3',
            prompt: 'Tricky! Reach the star right next to your knight. It takes 3 moves.',
            fen: '8/8/8/8/3N4/8/8/8 w - - 0 1',
            goal: 'stars',
            stars: ['d5'],
            maxMoves: 3,
            hint: 'The knight can never move just one square. Swing out and come back, for example via f3 or b5.',
            explanation: 'One route is Ne6, Nc7, Nd5. Another is Nb5, Nc3, Nd5. For a knight, a square right next door is surprisingly far away, so always count knight routes carefully.',
          },
        },
        {
          type: 'exercise',
          exercise: {
            id: 'l1-knight-ex4',
            prompt: 'Capture all three black pieces in 3 moves.',
            fen: '8/8/5p2/3b4/8/2p5/8/1N6 w - - 0 1',
            goal: 'capture-all',
            maxMoves: 3,
            hint: 'Start with the pawn on c3. Each capture lands you an L-shape away from the next target.',
            explanation: 'Nxc3, Nxd5, Nxf6. Knights are wonderful at hopping from target to target.',
          },
        },
      ],
    },
    {
      id: 'l1-pawn',
      title: 'The pawn',
      summary: 'Forward only, captures diagonally.',
      estMinutes: 8,
      blocks: [
        {
          type: 'text',
          md: md(`
            The **pawn** is the smallest piece, but it has the most rules:

            - It moves **straight forward one square**. It can never move backwards.
            - On its **very first move**, a pawn may move **one or two squares** forward.
            - It **captures diagonally**: one square forward to the left or right.
            - It cannot capture straight ahead, so a piece directly in front of it blocks it completely.
          `),
        },
        {
          type: 'board',
          fen: '8/8/8/2n1p3/3P4/8/4P3/8 w - - 0 1',
          arrows: [['e2', 'e3'], ['e2', 'e4'], ['d4', 'd5'], ['d4', 'c5'], ['d4', 'e5']],
          highlights: ['c5', 'e5'],
          caption: 'The e2-pawn may move one or two squares. The d4-pawn may step to d5 or capture on c5 or e5.',
        },
        {
          type: 'board',
          fen: '8/8/8/4p3/4P3/8/8/8 w - - 0 1',
          caption: 'Head to head: these two pawns block each other. Neither can move, because pawns cannot capture straight ahead.',
        },
        {
          type: 'tip',
          title: 'Small but mighty',
          md: md(`
            A pawn is worth **1 point**, but it has a secret: when it reaches the far side of the board it **promotes** into a queen (or another piece). You will learn this, and a special pawn capture called *en passant*, in the Special Rules module.
          `),
        },
        {
          type: 'exercise',
          exercise: {
            id: 'l1-pawn-ex1',
            prompt: 'Collect both stars with the pawn in 3 moves.',
            fen: '8/8/8/8/8/8/4P3/8 w - - 0 1',
            goal: 'stars',
            stars: ['e4', 'e6'],
            maxMoves: 3,
            hint: 'From its starting square, a pawn may jump two squares at once.',
            explanation: 'e4 (two squares on its first move), then e5 and e6 (one square at a time from then on).',
          },
        },
        {
          type: 'exercise',
          exercise: {
            id: 'l1-pawn-ex2',
            prompt: 'Capture both black pieces with your pawn in 2 moves.',
            fen: '8/8/8/8/4n3/3p4/2P5/8 w - - 0 1',
            goal: 'capture-all',
            maxMoves: 2,
            hint: 'Pawns capture one square diagonally forward.',
            explanation: 'cxd3, then dxe4. Each capture moves the pawn one file sideways as well as forwards.',
          },
        },
        {
          type: 'exercise',
          exercise: {
            id: 'l1-pawn-ex3',
            prompt: 'Your pawn is blocked. Reach the star on **e6** in 2 moves.',
            fen: '8/8/8/3pn3/3P4/8/8/8 w - - 0 1',
            goal: 'stars',
            stars: ['e6'],
            maxMoves: 2,
            hint: 'The only way for a pawn to change files is to capture.',
            explanation: 'dxe5 moves the pawn onto the e-file, and then e6. A blocked pawn can still move if it has something to capture.',
          },
        },
        {
          type: 'exercise',
          exercise: {
            id: 'l1-pawn-ex4',
            prompt: 'Capture all four black pieces with your two pawns in 4 moves.',
            fen: '8/8/8/8/3p2r1/2n4b/1P4P1/8 w - - 0 1',
            goal: 'capture-all',
            maxMoves: 4,
            hint: 'Each pawn has a two-step capture path. The b-pawn goes right, the g-pawn goes left.',
            explanation: 'bxc3 and cxd4 with one pawn, gxh3 and hxg4 with the other. Pawns capture forward to the left or to the right.',
          },
        },
      ],
    },
    {
      id: 'l1-values',
      title: 'What are the pieces worth?',
      summary: 'Count points to know which trades are good.',
      estMinutes: 8,
      blocks: [
        {
          type: 'text',
          md: md(`
            Not all pieces are equally strong. Players use a simple point system to compare them:

            - Pawn = **1**
            - Knight = **3**
            - Bishop = **3**
            - Rook = **5**
            - Queen = **9**
            - King = priceless (he can never be traded)

            The total of your pieces is called your **material**. If you have more points than your opponent, you are "ahead in material", and that is usually enough to win.
          `),
        },
        {
          type: 'text',
          md: md(`
            ### Why this matters: trades

            When you capture a piece and your opponent captures one back, that is a **trade** (or exchange). Before trading, add up the points:

            - Knight for bishop (3 for 3) is an **equal trade**.
            - Your knight for their rook (3 for 5) **wins** you 2 points. This is called "winning the exchange".
            - Your queen for their rook (9 for 5) **loses** you 4 points. Avoid that!
          `),
        },
        {
          type: 'board',
          fen: 'r5k1/5ppp/8/8/8/2N5/5PPP/3R2K1 w - - 0 1',
          caption: 'Material count: White has a rook, a knight and three pawns (5 + 3 + 3 = 11). Black has a rook and three pawns (8). White is 3 points ahead.',
        },
        {
          type: 'tip',
          title: 'Rules of thumb',
          md: md(`
            - A knight and a bishop are about equal.
            - A rook is worth about a knight or bishop **plus two pawns**.
            - Two rooks are worth a little more than a queen.
            - A piece that nobody protects is called **undefended** (or "hanging"). Capturing it is free.
          `),
        },
        {
          type: 'exercise',
          exercise: {
            id: 'l1-values-ex1',
            prompt: 'White to move. Your knight on d5 can capture a rook or a bishop. Take the more valuable one!',
            fen: 'r6k/ppr1b1pp/8/3N4/8/8/PP3PPP/R5K1 w - - 0 1',
            solution: ['Nxc7'],
            hint: 'A rook is worth 5 points, a bishop only 3.',
            explanation: 'Nxc7 wins a whole rook (5 points). Nxe7 would only win a bishop (3 points). When you have a choice of captures, take the biggest prize.',
          },
        },
        {
          type: 'exercise',
          exercise: {
            id: 'l1-values-ex2',
            prompt: 'White to move. The rook on a8 is protected by Black\'s queen. Is capturing it still a good idea?',
            fen: 'r2q1rk1/p4ppp/1p6/8/8/6P1/PP2QPBP/5RK1 w - - 0 1',
            solution: ['Bxa8'],
            hint: 'Count the points. If the queen takes back, you give a bishop (3) and get a rook (5).',
            explanation: 'Bxa8! Qxa8 is a trade of a bishop (3) for a rook (5), so White gains 2 points. Even a protected piece can be worth capturing, if it is worth more than the piece you capture with.',
          },
        },
        {
          type: 'exercise',
          exercise: {
            id: 'l1-values-ex3',
            prompt: 'White to move. Your queen could take the pawn on d5 or the knight on a4. Which capture is safe?',
            fen: 'r4rk1/ppp2ppp/5n2/3p4/n7/8/PP3PPP/R2Q1RK1 w - - 0 1',
            solution: ['Qxa4'],
            hint: 'Before capturing, ask: can my piece be captured back? Look at what the f6-knight attacks.',
            explanation: 'Qxa4 wins a knight for free, because nothing protects it. Qxd5?? would be a disaster: the knight on f6 protects d5, so Nxd5 wins your queen (9) for a pawn (1).',
          },
        },
      ],
    },
  ],
}

// ---------------------------------------------------------------------------
// Module 4 · Check, checkmate and stalemate
// ---------------------------------------------------------------------------

const checkModule: Module = {
  id: 'l1-check-mate',
  level: 1,
  title: 'Check and Checkmate',
  description: 'Attacking the king, escaping check, delivering checkmate, and avoiding stalemate.',
  lessons: [
    {
      id: 'l1-check',
      title: 'Check!',
      summary: 'When the king is attacked, you must deal with it at once.',
      estMinutes: 5,
      blocks: [
        {
          type: 'text',
          md: md(`
            When a piece attacks the enemy king, the king is **in check**.

            Check is an emergency. The player in check **must** get out of it on their very next move. Nothing else is allowed.

            The same idea gives us one of the most important rules in chess: **you may never make a move that puts or leaves your own king in check.** Such a move is simply illegal.
          `),
        },
        {
          type: 'board',
          fen: '4r1k1/8/8/8/8/8/8/4K3 w - - 0 1',
          arrows: [['e8', 'e1']],
          highlights: ['d1', 'd2', 'f1', 'f2'],
          caption: 'The black rook gives check along the e-file. The white king must step aside to one of the highlighted squares. e2 is no good: it is still on the e-file.',
        },
        {
          type: 'text',
          md: md(`
            Because a king may never move into check, the two kings can never stand side by side. There must always be at least one square between them.
          `),
        },
        {
          type: 'tip',
          title: 'Do I have to say "check"?',
          md: md(`
            Many friends say "check" out loud as a courtesy, but it is not required, and in tournaments players usually stay silent. It is always **your** job to notice when your king is attacked.
          `),
        },
      ],
    },
    {
      id: 'l1-escape-check',
      title: 'Three ways out of check',
      summary: 'Move the king, block the check, or capture the checking piece.',
      estMinutes: 8,
      blocks: [
        {
          type: 'text',
          md: md(`
            There are exactly **three ways** to get out of check. Remember them as **Move, Block, Capture**:

            1. **Move** the king to a safe square.
            2. **Block** the check by putting a piece in between. (This only works against a rook, bishop or queen checking from a distance.)
            3. **Capture** the piece that is giving check.

            When you are in check, quickly look at all three, then choose the best one.
          `),
        },
        {
          type: 'board',
          fen: '6k1/8/8/8/8/8/8/r5K1 w - - 0 1',
          arrows: [['a1', 'g1']],
          highlights: ['f2', 'g2', 'h2'],
          caption: '1. Move: the king escapes to the 2nd rank.',
        },
        {
          type: 'board',
          fen: '6k1/8/8/8/8/3B4/5PPP/r5K1 w - - 0 1',
          arrows: [['d3', 'f1']],
          caption: '2. Block: the bishop steps in between on f1 (b1 also blocks, but there the rook could simply take it).',
        },
        {
          type: 'board',
          fen: 'R7/7k/8/8/8/8/5PPP/r5K1 w - - 0 1',
          arrows: [['a8', 'a1']],
          caption: '3. Capture: the white rook takes the checking rook.',
        },
        {
          type: 'tip',
          title: 'Knight checks cannot be blocked',
          md: md(`
            A knight jumps, so you cannot put anything in its way. Against a knight check you must move the king or capture the knight. The same goes for a check from a piece standing right next to your king.
          `),
        },
        {
          type: 'exercise',
          exercise: {
            id: 'l1-escape-ex1',
            prompt: 'White is in check from the knight. Find the best way out.',
            fen: '3r2k1/5ppp/8/8/8/5n2/5PPP/4R1K1 w - - 0 1',
            solution: ['gxf3'],
            hint: 'The knight is attacking your king AND your rook. Can you get rid of it?',
            explanation: 'gxf3 captures the checking knight and wins 3 points. Moving the king with Kf1 or Kh1 would be legal, but then the knight captures your rook on e1.',
          },
        },
        {
          type: 'exercise',
          exercise: {
            id: 'l1-escape-ex2',
            prompt: 'White is in check from the rook on b1, and the king cannot move. Block the check the right way.',
            fen: '6k1/5ppp/8/8/8/8/4BPPP/1r4K1 w - - 0 1',
            solution: ['Bf1'],
            hint: 'Your bishop can block on d1 or on f1. On which square is it protected by your king?',
            explanation: 'Bf1 blocks, and the bishop is protected by the king. If Black plays Rxf1+, then Kxf1. Bd1? loses at once: Rxd1 is checkmate.',
          },
        },
        {
          type: 'exercise',
          exercise: {
            id: 'l1-escape-ex3',
            prompt: 'Black\'s rook checks your king on the back rank. You cannot block or capture. Find the escape!',
            fen: '6k1/R4ppp/8/8/8/7P/5PP1/4r1K1 w - - 0 1',
            solution: ['Kh2'],
            hint: 'Earlier in the game White played h3. Which square did that create for the king?',
            explanation: 'Kh2 is the only move. The little pawn move h3 gave the king an escape square. Without it, this would be checkmate. Players call such an escape square "luft" (German for "air").',
          },
        },
      ],
    },
    {
      id: 'l1-checkmate',
      title: 'Checkmate',
      summary: 'Check with no escape wins the game.',
      estMinutes: 8,
      blocks: [
        {
          type: 'text',
          md: md(`
            **Checkmate** (or just "mate") is a check that cannot be escaped: the king cannot move to safety, the check cannot be blocked, and the checking piece cannot be captured.

            Checkmate ends the game immediately. The side that gives checkmate wins, even if it has fewer pieces.
          `),
        },
        {
          type: 'board',
          fen: '4R1k1/5ppp/8/8/8/8/5PPP/6K1 b - - 0 1',
          arrows: [['e8', 'g8']],
          caption: 'The back-rank mate. The rook checks along the 8th rank, and Black\'s own pawns stop the king from escaping.',
        },
        {
          type: 'board',
          fen: '6k1/6Q1/5K2/8/8/8/8/8 b - - 0 1',
          caption: 'The queen right in front of the king, protected by her own king. The black king cannot capture her and has no safe square.',
        },
        {
          type: 'text',
          md: md(`
            To check whether a position is checkmate, ask the three questions from the last lesson:

            1. Can the king **move** to a safe square?
            2. Can the check be **blocked**?
            3. Can the checking piece be **captured**?

            If the answer to all three is "no", it is checkmate. Now it is your turn to deliver some!
          `),
        },
        {
          type: 'exercise',
          exercise: {
            id: 'l1-checkmate-ex1',
            prompt: 'White to move. Checkmate in one move.',
            fen: '6k1/5ppp/8/8/8/8/5PPP/R5K1 w - - 0 1',
            goal: 'mate',
            solution: ['Ra8#'],
            hint: 'Black\'s king is stuck behind its own pawns. Attack it along the 8th rank.',
            explanation: 'Ra8# is a back-rank mate. The king cannot go forward because its own pawns are in the way, and nothing can block or capture the rook.',
          },
        },
        {
          type: 'exercise',
          exercise: {
            id: 'l1-checkmate-ex2',
            prompt: 'White to move. Checkmate in one move with your queen.',
            fen: '7k/1Q6/6K1/8/8/8/8/8 w - - 0 1',
            goal: 'mate',
            solution: ['Qg7#'],
            hint: 'Your king on g6 protects the squares g7 and h7. Put the queen right next to the black king there.',
            explanation: 'Qg7# (Qh7# works too, and so does Qb8#). The queen gives check, and the black king cannot take her because your king protects her.',
          },
        },
        {
          type: 'exercise',
          exercise: {
            id: 'l1-checkmate-ex3',
            prompt: 'White to move. Checkmate in one with the rook.',
            fen: '7k/8/6K1/8/8/8/8/R7 w - - 0 1',
            goal: 'mate',
            solution: ['Ra8#'],
            hint: 'Your king already covers g7 and h7. The rook just needs to check along the edge.',
            explanation: 'Ra8#. The rook attacks the whole 8th rank and the white king takes away the squares in front of the black king. King and rook working together: you will master this mate in the next level.',
          },
        },
      ],
    },
    {
      id: 'l1-mate-practice',
      title: 'Mate-in-one practice',
      summary: 'Five more checkmates to find.',
      estMinutes: 8,
      blocks: [
        {
          type: 'text',
          md: md(`
            Finding checkmates quickly is a skill you build with practice. In each puzzle, look at **every check** you can give. For each one, ask whether the king can move, block or capture.
          `),
        },
        {
          type: 'exercise',
          exercise: {
            id: 'l1-mate-practice-ex1',
            prompt: 'White to move. Use your two rooks to checkmate in one.',
            fen: 'k7/6R1/8/8/8/8/4K3/7R w - - 0 1',
            goal: 'mate',
            solution: ['Rh8#'],
            hint: 'One rook already guards the 7th rank. The other one can check along the 8th.',
            explanation: 'Rh8#. The rook on g7 stops the king from coming forward, and the rook on h8 gives check. Two rooks working like this are called a "ladder".',
          },
        },
        {
          type: 'exercise',
          exercise: {
            id: 'l1-mate-practice-ex2',
            prompt: 'White to move. Checkmate in one.',
            fen: 'r5k1/5p1p/5PpQ/q7/8/8/5PPP/6K1 w - - 0 1',
            goal: 'mate',
            solution: ['Qg7#'],
            hint: 'Your pawn on f6 protects a square right in front of the black king.',
            explanation: 'Qg7#. The queen is protected by the f6-pawn, so the king cannot capture her, and f8 and h8 are covered by the queen too.',
          },
        },
        {
          type: 'exercise',
          exercise: {
            id: 'l1-mate-practice-ex3',
            prompt: 'White to move. Checkmate in one.',
            fen: '3q1rk1/pp3pp1/8/6NQ/8/8/PP3PPP/6K1 w - - 0 1',
            goal: 'mate',
            solution: ['Qh7#'],
            hint: 'The knight on g5 protects h7.',
            explanation: 'Qh7#. The knight protects the queen, the rook on f8 blocks the king\'s escape, and the pawns on f7 and g7 do the rest.',
          },
        },
        {
          type: 'exercise',
          exercise: {
            id: 'l1-mate-practice-ex4',
            prompt: 'White to move. Checkmate in one.',
            fen: 'r4rk1/pp3ppp/8/q7/6Q1/8/PB3PPP/6K1 w - - 0 1',
            goal: 'mate',
            solution: ['Qxg7#'],
            hint: 'Look at the long diagonal from b2. What does your bishop protect?',
            explanation: 'Qxg7#. The bishop on b2 protects g7 from far away, so the king cannot take the queen.',
          },
        },
        {
          type: 'exercise',
          exercise: {
            id: 'l1-mate-practice-ex5',
            prompt: 'Black to move this time. Checkmate in one.',
            fen: '4r1k1/5ppp/8/8/8/8/5PPP/6K1 b - - 0 1',
            goal: 'mate',
            solution: ['Re1#'],
            hint: 'White\'s king has the same problem as many black kings: no escape square.',
            explanation: 'Re1# is a back-rank mate, this time for Black. Checkmating patterns work for both colours.',
          },
        },
      ],
    },
    {
      id: 'l1-stalemate',
      title: 'Stalemate: don\'t let the win slip away',
      summary: 'No legal move and not in check means a draw.',
      estMinutes: 7,
      blocks: [
        {
          type: 'text',
          md: md(`
            **Stalemate** happens when the player to move is **not in check** but has **no legal move**. The game ends immediately as a **draw**.

            Stalemate is a nasty surprise for beginners: you can be a whole queen ahead and still only draw if you stalemate your opponent.
          `),
        },
        {
          type: 'board',
          fen: 'k7/8/1Q6/8/8/8/8/4K3 b - - 0 1',
          highlights: ['a7', 'b7', 'b8'],
          caption: 'Black to move. The king is not in check, but every square around it is covered by the queen. Stalemate: a draw!',
        },
        {
          type: 'board',
          fen: '7k/7P/6K1/8/8/8/8/8 b - - 0 1',
          caption: 'Another stalemate. The black king is not in check, but g8 is covered by the pawn and g7 and h7 by the white king.',
        },
        {
          type: 'tip',
          title: 'The stalemate check',
          md: md(`
            When you are winning, ask before every move: **"After my move, does my opponent have a legal move?"** If the answer is no and you are not giving check, find a different move!
          `),
        },
        {
          type: 'exercise',
          exercise: {
            id: 'l1-stalemate-ex1',
            prompt: 'White to move. Checkmate in one, but beware: one natural queen move is stalemate!',
            fen: 'k7/8/1K6/2Q5/8/8/8/8 w - - 0 1',
            goal: 'mate',
            solution: ['Qc8#'],
            hint: 'Qc7 takes away every square but gives no check: stalemate. Give check along the 8th rank instead.',
            explanation: 'Qc8# (or Qf8#, Qg8#, Qa7#). The queen checks the king and your king covers a7 and b7. Qc7?? would cover all the squares without giving check: stalemate.',
          },
        },
        {
          type: 'exercise',
          exercise: {
            id: 'l1-stalemate-ex2',
            prompt: 'White to move. Checkmate in one with the rook. Do not stalemate!',
            fen: '7k/5K2/8/8/8/8/8/6R1 w - - 0 1',
            goal: 'mate',
            solution: ['Rh1#'],
            hint: 'Rg7?? would take away h7 without giving check. Check the king along the h-file instead.',
            explanation: 'Rh1#. Your king covers g7 and g8, and the rook gives check along the h-file. Rg7?? looks strong, but the black king would have no moves and not be in check: stalemate.',
          },
        },
      ],
    },
  ],
}

// ---------------------------------------------------------------------------
// Module 5 · Special rules
// ---------------------------------------------------------------------------

const specialModule: Module = {
  id: 'l1-special',
  level: 1,
  title: 'Special Rules',
  description: 'Castling, en passant, promotion and all the ways a game can be drawn.',
  lessons: [
    {
      id: 'l1-castling',
      title: 'Castling',
      summary: 'Move your king to safety and bring a rook into play in one move.',
      estMinutes: 8,
      blocks: [
        {
          type: 'text',
          md: md(`
            **Castling** is the only move in which two pieces move at once: your king and one of your rooks. It is written **O-O** on the kingside and **O-O-O** on the queenside.

            - **Kingside (O-O):** the king moves two squares towards the h1-rook (e1 to g1) and the rook jumps over to f1.
            - **Queenside (O-O-O):** the king moves two squares towards the a1-rook (e1 to c1) and the rook jumps over to d1.

            Black castles the same way on the 8th rank.
          `),
        },
        {
          type: 'board',
          fen: 'r3k2r/8/8/8/8/8/8/R3K2R w KQkq - 0 1',
          arrows: [['e1', 'g1'], ['h1', 'f1'], ['e1', 'c1'], ['a1', 'd1']],
          caption: 'Kingside castling: king to g1, rook to f1. Queenside castling: king to c1, rook to d1.',
        },
        {
          type: 'line',
          moves: ['e4', 'e5', 'Nf3', 'Nc6', 'Bc4', 'Bc5', 'O-O', 'Nf6', 'd3', 'O-O'],
          caption: 'A typical opening where both sides castle kingside.',
          notes: {
            5: 'The knight and bishop have left, so the squares between the king and the h1-rook are now empty.',
            7: 'White castles: the king jumps to g1 and the rook to f1. The king is safe behind its pawns, and the rook is closer to the centre.',
            10: 'Black castles too. Both kings are now tucked away.',
          },
        },
        {
          type: 'text',
          md: md(`
            ### When can you castle?

            All of these must be true:

            1. Neither the king nor that rook has moved yet in the game.
            2. All the squares between them are empty.
            3. Your king is **not in check** right now. (You cannot castle out of check.)
            4. The king does not **pass through** a square that is attacked.
            5. The king does not **land** on an attacked square. (No move may put your king in check.)

            Note that these rules are about the **king**. The rook is allowed to be attacked, or to pass over an attacked square (b1 or b8 when castling queenside).
          `),
        },
        {
          type: 'board',
          fen: 'r3k2r/8/8/8/2b5/8/8/R3K2R w KQkq - 0 1',
          arrows: [['c4', 'f1']],
          highlights: ['f1'],
          caption: 'The black bishop attacks f1, so White cannot castle kingside (the king would pass through check). Castling queenside is fine.',
        },
        {
          type: 'tip',
          title: 'Why castle?',
          md: md(`
            In the middle of the board the king is exposed to attack. Castling hides him behind a wall of pawns **and** brings a rook towards the centre, all in one move. Most strong players castle within their first ten moves.
          `),
        },
        {
          type: 'exercise',
          exercise: {
            id: 'l1-castling-ex1',
            prompt: 'Castle kingside: get your king to the star on **g1** in one move.',
            fen: '8/8/8/8/8/8/8/R3K2R w KQ - 0 1',
            goal: 'stars',
            stars: ['g1'],
            maxMoves: 1,
            hint: 'Move the king two squares to the right. The rook will jump over automatically.',
            explanation: 'O-O: the king goes from e1 to g1 and the rook from h1 to f1. Castling is the only time the king moves two squares.',
          },
        },
        {
          type: 'exercise',
          exercise: {
            id: 'l1-castling-ex2',
            prompt: 'The black bishop stops you castling kingside. Castle queenside instead: king to **c1**.',
            fen: '8/8/8/8/2b5/8/8/R3K2R w KQ - 0 1',
            goal: 'stars',
            stars: ['c1'],
            maxMoves: 1,
            hint: 'Move the king two squares to the left, towards the a1-rook.',
            explanation: 'O-O-O: the king goes to c1 and the rook to d1. Kingside castling was illegal because the king would have passed through f1, which the bishop attacks.',
          },
        },
      ],
    },
    {
      id: 'l1-en-passant',
      title: 'En passant',
      summary: 'The special pawn capture "in passing".',
      estMinutes: 6,
      blocks: [
        {
          type: 'text',
          md: md(`
            **En passant** (French for "in passing") is a special pawn capture.

            Remember that a pawn may move two squares on its first move. If it does so and lands **right beside** an enemy pawn, that enemy pawn may capture it **as if it had only moved one square**.

            The capturing pawn moves diagonally onto the square the other pawn skipped over, and the pawn that moved two squares is removed.
          `),
        },
        {
          type: 'line',
          moves: ['e4', 'Nf6', 'e5', 'd5', 'exd6'],
          caption: 'An en passant capture.',
          notes: {
            3: 'White\'s pawn has reached the 5th rank.',
            4: 'Black pushes the d-pawn two squares. It lands on d5, right next to White\'s pawn on e5, skipping over d6.',
            5: 'En passant! White captures on d6, the square Black skipped, and the d5-pawn disappears.',
          },
        },
        {
          type: 'tip',
          title: 'The fine print',
          md: md(`
            - Only **pawns** can capture en passant, and only **pawns** that have just moved two squares can be captured this way.
            - It is allowed **only on the very next move**. If you wait, the chance is gone for good.
            - The capturing pawn must be on its 5th rank (White) or 4th rank (Black).
          `),
        },
        {
          type: 'exercise',
          exercise: {
            id: 'l1-en-passant-ex1',
            prompt: 'Black has just played d7-d5. Capture the pawn en passant.',
            fen: '8/8/8/3pP3/8/8/8/8 w - d6 0 1',
            goal: 'capture-all',
            maxMoves: 1,
            hint: 'Move your pawn diagonally to d6, the square the black pawn skipped over.',
            explanation: 'exd6! The pawn lands on d6 and the black pawn on d5 is removed, exactly as if it had only moved to d6.',
          },
        },
        {
          type: 'exercise',
          exercise: {
            id: 'l1-en-passant-ex2',
            prompt: 'Black has just played d7-d5, hoping to run past your pawn. White to move: stop it!',
            fen: '8/7k/8/3pP3/8/8/8/5K2 w - d6 0 2',
            solution: ['exd6'],
            hint: 'You can only capture en passant right now. Next move it will be too late.',
            explanation: 'exd6 removes Black\'s only pawn, and your new d-pawn is far too fast for the black king to catch. It will become a queen. Without en passant, Black\'s pawn would have escaped.',
          },
        },
      ],
    },
    {
      id: 'l1-promotion',
      title: 'Promotion',
      summary: 'A pawn that reaches the end becomes a queen.',
      estMinutes: 7,
      blocks: [
        {
          type: 'text',
          md: md(`
            When a pawn reaches the far side of the board (the 8th rank for White, the 1st rank for Black), it **promotes**. You replace it with a **queen, rook, bishop or knight** of your colour. It cannot stay a pawn or become a king.

            You choose a queen almost every time, because the queen is the strongest piece. You may even have two or more queens on the board at once.
          `),
        },
        {
          type: 'board',
          fen: '8/4P3/8/8/8/8/8/8 w - - 0 1',
          arrows: [['e7', 'e8']],
          caption: 'One more step and this pawn becomes a queen: the move is written e8=Q.',
        },
        {
          type: 'tip',
          title: 'Underpromotion',
          md: md(`
            Choosing a rook, bishop or knight is called **underpromotion**. It is rare, but useful when a new queen would cause stalemate, or when a knight gives a check or attack that a queen could not.
          `),
        },
        {
          type: 'exercise',
          exercise: {
            id: 'l1-promotion-ex1',
            prompt: 'March your pawn to the end of the board and promote it. Reach the star in 3 moves.',
            fen: '8/8/8/1P6/8/8/8/8 w - - 0 1',
            goal: 'stars',
            stars: ['b8'],
            maxMoves: 3,
            hint: 'One step at a time: b6, b7, b8. Choose a queen when you arrive.',
            explanation: 'The pawn walks b6, b7 and promotes on b8. A pawn that nothing can stop is a huge danger to the opponent.',
          },
        },
        {
          type: 'exercise',
          exercise: {
            id: 'l1-promotion-ex2',
            prompt: 'White to move. Promote your pawn with checkmate!',
            fen: '7k/4P3/6K1/8/8/8/8/8 w - - 0 1',
            goal: 'mate',
            solution: ['e8=Q#'],
            hint: 'The new piece on e8 will attack the whole 8th rank. Your king covers g7 and h7.',
            explanation: 'e8=Q# (e8=R# also works). The new queen checks along the 8th rank and the white king covers the escape squares.',
          },
        },
        {
          type: 'exercise',
          exercise: {
            id: 'l1-promotion-ex3',
            prompt: 'White to move. A new queen would not win here. Find the clever promotion that wins Black\'s queen.',
            fen: '8/3q1Ppk/8/8/8/8/6PP/6K1 w - - 0 1',
            solution: ['f8=N+', 'Kg8', 'Nxd7'],
            hint: 'Which piece on f8 would attack both the king on h7 and the queen on d7?',
            explanation: 'f8=N+! The new knight checks the king and attacks the queen at the same time (a "fork"). After the king moves, Nxd7 wins the queen. A new queen on f8 would let Black give endless checks instead.',
          },
        },
      ],
    },
    {
      id: 'l1-draws',
      title: 'How a game can be drawn',
      summary: 'Stalemate, repetition, the 50-move rule, insufficient material and agreement.',
      estMinutes: 7,
      blocks: [
        {
          type: 'text',
          md: md(`
            Not every game has a winner. A game is a **draw** (half a point each) in any of these cases:

            1. **Stalemate**: the player to move has no legal move and is not in check.
            2. **Threefold repetition**: the same position appears three times, with the same player to move.
            3. **The 50-move rule**: fifty moves in a row by each side without any capture or pawn move.
            4. **Insufficient material**: neither side has enough pieces left to checkmate, for example king against king, or king and one bishop or one knight against a lone king.
            5. **Agreement**: the players agree to a draw.
          `),
        },
        {
          type: 'board',
          fen: '8/8/4k3/8/8/2N5/8/4K3 w - - 0 1',
          caption: 'King and knight against king: checkmate is impossible, so the game is drawn at once.',
        },
        {
          type: 'line',
          fen: '6k1/6p1/8/8/4Q3/8/rr4PP/6K1 w - - 0 1',
          moves: ['Qe8+', 'Kh7', 'Qh5+', 'Kg8', 'Qe8+', 'Kh7', 'Qh5+', 'Kg8', 'Qe8+'],
          caption: 'Perpetual check: White is losing, but saves the game by checking forever.',
          notes: {
            1: 'Black has two rooks against a queen and threatens to crash through on g2. White starts checking.',
            2: 'The only move: f8, f7 and h8 are all covered by the queen.',
            3: 'Check again along the h-file.',
            4: 'Again the only move.',
            9: 'The same position has now appeared three times. Draw by threefold repetition. A never-ending series of checks like this is called **perpetual check**.',
          },
        },
        {
          type: 'tip',
          title: 'Ahead or behind?',
          md: md(`
            - **When you are winning**, watch out for stalemate and do not repeat the position.
            - **When you are losing**, look for these lifelines! A perpetual check or a stalemate trick can turn a lost game into a draw.
          `),
        },
        {
          type: 'text',
          md: md(`
            One more detail: if your clock runs out you lose, **unless** your opponent has no way at all to checkmate you (for example, a lone king). Then the game is a draw.
          `),
        },
      ],
    },
  ],
}

// ---------------------------------------------------------------------------
// Module 6 · Reading and writing chess
// ---------------------------------------------------------------------------

const notationModule: Module = {
  id: 'l1-notation',
  level: 1,
  title: 'Reading and Writing Chess',
  description: 'Chess notation, following a game, and how to behave at the board.',
  lessons: [
    {
      id: 'l1-algebraic',
      title: 'Algebraic notation',
      summary: 'The language every chess book and app uses.',
      estMinutes: 9,
      blocks: [
        {
          type: 'text',
          md: md(`
            Chess players write moves using **algebraic notation**. It is short and easy once you know the square names.

            A move is written as **the piece letter + the square it moves to**:

            - **K** = king, **Q** = queen, **R** = rook, **B** = bishop, **N** = knight (K is already taken by the king).
            - **Pawns have no letter.** "e4" means a pawn moves to e4.

            So **Nf3** means "a knight moves to f3" and **Bc4** means "a bishop moves to c4".
          `),
        },
        {
          type: 'board',
          fen: START,
          arrows: [['g1', 'f3']],
          caption: 'Nf3: the knight moves to f3.',
        },
        {
          type: 'text',
          md: md(`
            ### The extra symbols

            - **x** means a capture: **Bxf7** (bishop captures on f7). A pawn capture names the file the pawn came from: **exd5**.
            - **+** means check: **Qh5+**.
            - **#** means checkmate: **Qh4#**.
            - **O-O** is kingside castling and **O-O-O** is queenside castling.
            - **=** shows a promotion: **e8=Q** (the pawn becomes a queen on e8).
          `),
        },
        {
          type: 'text',
          md: md(`
            ### Which knight?

            Sometimes two identical pieces can move to the same square. Then we add the **file** (or, if that is not enough, the **rank**) the piece comes from. **Nbd2** means "the knight from the b-file goes to d2". **R1e2** means "the rook on the 1st rank goes to e2".
          `),
        },
        {
          type: 'board',
          fen: '8/8/8/8/8/5N2/8/1N6 w - - 0 1',
          arrows: [['b1', 'd2'], ['f3', 'd2']],
          caption: 'Both knights can go to d2, so we must write Nbd2 or Nfd2.',
        },
        {
          type: 'line',
          moves: ['d4', 'd5', 'Nf3', 'Nf6', 'e3', 'e6', 'Bd3', 'c5', 'c3', 'Nc6', 'Nbd2', 'Bd6', 'O-O', 'O-O'],
          caption: 'Read along: an opening written in notation.',
          notes: {
            1: '1. d4: White\'s pawn moves to d4. Pawn moves have no piece letter.',
            2: '1... d5: the three dots mean this is Black\'s first move.',
            3: '2. Nf3: a knight goes to f3.',
            7: '4. Bd3: the bishop goes to d3.',
            11: '6. Nbd2: both white knights could go to d2, so we say it is the b-file knight.',
            13: '7. O-O: White castles kingside.',
            14: '7... O-O: and so does Black.',
          },
        },
        {
          type: 'tip',
          title: 'Practise reading',
          md: md(`
            The best way to learn notation is to use it. Each time you see a move in this course, find the square on the board in your head before you look. Soon you will read moves as easily as words.
          `),
        },
        {
          type: 'exercise',
          exercise: {
            id: 'l1-algebraic-ex1',
            prompt: 'White to move. Play **Re8#**.',
            fen: '6k1/5ppp/8/8/8/8/5PPP/4R1K1 w - - 0 1',
            goal: 'mate',
            solution: ['Re8#'],
            hint: 'R = rook. Move it to e8. The # tells you it will be checkmate.',
            explanation: 'Re8# means "rook to e8, checkmate". It is a back-rank mate.',
          },
        },
        {
          type: 'exercise',
          exercise: {
            id: 'l1-algebraic-ex2',
            prompt: 'White to move. Play **Nf7#**.',
            fen: '6rk/6pp/8/6N1/8/8/8/6K1 w - - 0 1',
            goal: 'mate',
            solution: ['Nf7#'],
            hint: 'N = knight. Find the f-file, then the 7th rank.',
            explanation: 'Nf7# is called a "smothered mate": the black king is surrounded by its own pieces, and the knight jumps in to give check.',
          },
        },
        {
          type: 'exercise',
          exercise: {
            id: 'l1-algebraic-ex3',
            prompt: 'White to move. Black has just played 2... g6??. Play **Qxe5+**.',
            fen: 'rnbqkbnr/pppp1p1p/6p1/4p2Q/4P3/8/PPPP1PPP/RNB1KBNR w KQkq - 0 3',
            solution: ['Qxe5+'],
            hint: 'Q = queen, x = capture, + = check. Capture the pawn on e5.',
            explanation: 'Qxe5+ captures the e5-pawn with check, and it also attacks the rook on h8. After Black deals with the check, White plays Qxh8 and wins a whole rook.',
          },
        },
      ],
    },
    {
      id: 'l1-following-games',
      title: 'Following a game',
      summary: 'Move numbers, results and the !? symbols.',
      estMinutes: 7,
      blocks: [
        {
          type: 'text',
          md: md(`
            A game score lists the moves in pairs, White first: **1. e4 e5 2. Nf3 Nc6**. When a comment interrupts, Black's move is written with three dots: **2... Nc6**.

            The result is written at the end:

            - **1-0**: White won.
            - **0-1**: Black won.
            - **½-½**: a draw.
          `),
        },
        {
          type: 'text',
          md: md(`
            ### Comment symbols

            Books and apps add symbols to judge moves:

            - **!** a good move, **!!** a brilliant move
            - **?** a mistake, **??** a blunder (a very bad mistake)
            - **!?** an interesting move, **?!** a dubious move
          `),
        },
        {
          type: 'line',
          moves: ['e4', 'e5', 'Nf3', 'Nc6', 'Bc4', 'Nd4', 'Nxe5', 'Qg5', 'Nxf7', 'Qxg2', 'Rf1', 'Qxe4+', 'Be2', 'Nf3#'],
          caption: 'A short game to read along: greed is punished. 0-1.',
          notes: {
            6: '3... Nd4?! Black leaves the e5-pawn undefended. This is a trap!',
            7: '4. Nxe5? White grabs the pawn. 4. Nxd4 was better.',
            8: '4... Qg5! Black attacks the knight on e5 and the pawn on g2 at once.',
            9: '5. Nxf7?? White gets even greedier, attacking the queen and the rook on h8.',
            10: '5... Qxg2: now the rook on h1 is attacked.',
            11: '6. Rf1: the rook runs away.',
            12: '6... Qxe4+: check! The only way out is to block.',
            13: '7. Be2: forced.',
            14: '7... Nf3#: checkmate. The bishop on e2 cannot take the knight because it would expose its own king to the queen. 0-1.',
          },
        },
        {
          type: 'tip',
          title: 'Learn from every game',
          md: md(`
            Writing down your own games lets you replay them later and find your mistakes. Online, the app records every move for you, so take a few minutes after each game to look back through it.
          `),
        },
      ],
    },
    {
      id: 'l1-etiquette',
      title: 'Touch-move, manners and the clock',
      summary: 'How to behave at the board and how chess clocks work.',
      estMinutes: 6,
      blocks: [
        {
          type: 'text',
          md: md(`
            ### The touch-move rule

            In over-the-board games (and in most clubs), if you **deliberately touch** one of your pieces, you must move it, as long as it has a legal move. If you touch an opponent's piece, you must capture it if you can. Once you let go of a piece on a square, the move is made.

            To straighten a piece on its square without moving it, say "**I adjust**" (or the French "*j'adoube*") **before** you touch it.
          `),
        },
        {
          type: 'text',
          md: md(`
            ### Good manners

            - Shake hands before and after the game.
            - Stay quiet and do not distract your opponent.
            - To offer a draw, make your move, say "draw?", then press your clock.
            - If you want to resign, say so, stop the clock or lay your king down. Never just walk away or (online) leave the game hanging.
            - Win modestly and lose gracefully. Every player loses thousands of games on the way up.
          `),
        },
        {
          type: 'text',
          md: md(`
            ### The chess clock

            In timed games each player has their own clock. After you move, you press your button, which stops your clock and starts your opponent's. If your time runs out, you lose.

            A time control like **15+10** means 15 minutes each, plus 10 extra seconds added after every move (the "increment"). Common types:

            - **Bullet**: less than 3 minutes each.
            - **Blitz**: about 3 to 10 minutes each.
            - **Rapid**: about 10 to 60 minutes each.
            - **Classical**: an hour or more each.
          `),
        },
        {
          type: 'tip',
          title: 'Play slow games while you learn',
          md: md(`
            Fast games are fun, but you learn far more when you have time to think. While you are improving, play mostly **rapid** games (15+10 or longer) and look at every move carefully.
          `),
        },
      ],
    },
  ],
}

// ---------------------------------------------------------------------------
// Module 7 · Your first games
// ---------------------------------------------------------------------------

const firstGamesModule: Module = {
  id: 'l1-first-games',
  level: 1,
  title: 'Your First Games',
  description: 'The fastest checkmates, how to avoid them, and a complete classic game.',
  lessons: [
    {
      id: 'l1-fools-mate',
      title: 'Fool\'s Mate',
      summary: 'The fastest possible checkmate, in just two moves.',
      estMinutes: 5,
      blocks: [
        {
          type: 'text',
          md: md(`
            The fastest checkmate in chess takes only **two moves**. It is called **Fool's Mate**, because only a very careless player can fall for it. Seeing it will teach you an important lesson about king safety.
          `),
        },
        {
          type: 'line',
          moves: ['f3', 'e5', 'g4', 'Qh4#'],
          caption: 'Fool\'s Mate. 0-1 after Black\'s second move.',
          notes: {
            1: '1. f3? This pawn move does nothing useful and opens the diagonal between the queen\'s side and the white king.',
            2: '1... e5: Black opens a path for the queen and bishop.',
            3: '2. g4?? Another weakening pawn move. The diagonal from h4 to e1 is now wide open.',
            4: '2... Qh4#. The queen checks the king, nothing can block on g3 or f2, and the king has no square to run to. Checkmate!',
          },
        },
        {
          type: 'exercise',
          exercise: {
            id: 'l1-fools-mate-ex1',
            prompt: 'Black to move. White has played f3 and g4. Deliver Fool\'s Mate!',
            fen: 'rnbqkbnr/pppp1ppp/8/4p3/6P1/5P2/PPPPP2P/RNBQKBNR b KQkq - 0 2',
            goal: 'mate',
            solution: ['Qh4#'],
            hint: 'Your queen can reach the edge of the board on a diagonal that leads straight to the white king.',
            explanation: 'Qh4#. The f- and g-pawns used to guard the king; with them gone, the king is defenceless.',
          },
        },
        {
          type: 'tip',
          title: 'The lesson',
          md: md(`
            The pawns in front of your king are its bodyguards. In the opening, **leave the f- and g-pawns alone** and move the centre pawns (e and d) instead.
          `),
        },
      ],
    },
    {
      id: 'l1-scholars-mate',
      title: 'Scholar\'s Mate and how to stop it',
      summary: 'The four-move checkmate every beginner meets, and the easy defence.',
      estMinutes: 8,
      blocks: [
        {
          type: 'text',
          md: md(`
            The f7-square (f2 for White) is the weakest point at the start of the game, because only the king protects it. **Scholar's Mate** attacks f7 with the queen and bishop together.

            You will meet this trick in your first games, so let's make sure it never works against you.
          `),
        },
        {
          type: 'line',
          moves: ['e4', 'e5', 'Bc4', 'Nc6', 'Qh5', 'Nf6', 'Qxf7#'],
          caption: 'Scholar\'s Mate. 1-0.',
          notes: {
            3: '2. Bc4: the bishop aims at f7.',
            5: '3. Qh5: the queen attacks f7 too, and also the pawn on e5. White threatens Qxf7#.',
            6: '3... Nf6?? Black attacks the queen but ignores the threat.',
            7: '4. Qxf7#. The queen is protected by the bishop, so the king cannot capture it. Checkmate.',
          },
        },
        {
          type: 'exercise',
          exercise: {
            id: 'l1-scholars-mate-ex1',
            prompt: 'White to move. Black has just played 3... Nf6??. Checkmate in one.',
            fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 4 4',
            goal: 'mate',
            solution: ['Qxf7#'],
            hint: 'Your queen and bishop both aim at the same weak square next to the black king.',
            explanation: 'Qxf7#. The bishop on c4 protects the queen, so the king cannot take her, and every escape square is covered.',
          },
        },
        {
          type: 'text',
          md: md(`
            ### The defence

            The fix is simple: **block the queen's attack and gain time by attacking her**. After 3. Qh5, the move **3... g6!** shuts the queen out. If she comes back to f3 to aim at f7 again, **4... Nf6** blocks her path and develops a piece at the same time.
          `),
        },
        {
          type: 'line',
          moves: ['e4', 'e5', 'Bc4', 'Nc6', 'Qh5', 'g6', 'Qf3', 'Nf6'],
          caption: 'Defending against Scholar\'s Mate.',
          notes: {
            6: '3... g6! The queen is attacked and f7 is safe for now.',
            7: '4. Qf3: White tries again, aiming at f7 from a new direction.',
            8: '4... Nf6! The knight blocks the queen\'s path to f7. Black is developing nicely, and White\'s queen has wasted time.',
          },
        },
        {
          type: 'exercise',
          exercise: {
            id: 'l1-scholars-mate-ex2',
            prompt: 'Black to move. White keeps moving the queen around (5. Qb3, aiming at f7 and b7 again). Punish it with a developing move that attacks the queen!',
            fen: 'r1bqkb1r/pppp1p1p/2n2np1/4p3/2B1P3/1Q6/PPPP1PPP/RNB1K1NR b KQkq - 3 5',
            solution: ['Nd4'],
            hint: 'One of your knights can jump to a central square where it attacks the queen and also eyes the c2-pawn.',
            explanation: '5... Nd4! attacks the queen and threatens Nxc2+, forking the king and the rook on a1. White must move the queen yet again while Black develops. Bringing the queen out early often gives the opponent free moves like this.',
          },
        },
        {
          type: 'tip',
          title: 'Remember',
          md: md(`
            Whenever your opponent's queen and bishop line up on f7 (or f2), ask: **"Is f7 protected?"** Then block, defend or chase the queen. And never try Scholar's Mate yourself against a careful player: your queen just gets chased around.
          `),
        },
      ],
    },
    {
      id: 'l1-legals-mate',
      title: 'Légal\'s Mate: don\'t grab the queen blindly',
      summary: 'A famous trap where winning the queen loses the game.',
      estMinutes: 6,
      blocks: [
        {
          type: 'text',
          md: md(`
            Capturing your opponent's queen feels wonderful. But before you grab anything, ask: **"Why did my opponent allow this?"** This famous trap, named after the French master Légal, shows what can happen if you don't.
          `),
        },
        {
          type: 'line',
          moves: ['e4', 'e5', 'Nf3', 'd6', 'Bc4', 'Bg4', 'Nc3', 'g6', 'Nxe5', 'Bxd1', 'Bxf7+', 'Ke7', 'Nd5#'],
          caption: 'Légal\'s Mate. 1-0.',
          notes: {
            6: '3... Bg4: the bishop pins the knight to the queen. It looks as if the knight cannot move.',
            8: '4... g6? A slow move that does nothing for Black\'s development.',
            9: '5. Nxe5!! White moves the "pinned" knight anyway and offers the queen.',
            10: '5... Bxd1?? Black takes the queen and walks into mate. (5... dxe5 6. Qxg4 was necessary, though White is still a pawn up.)',
            11: '6. Bxf7+: the king is forced to e7.',
            13: '7. Nd5#. Three minor pieces checkmate the king. White is a queen down, but it does not matter: checkmate ends the game.',
          },
        },
        {
          type: 'exercise',
          exercise: {
            id: 'l1-legals-mate-ex1',
            prompt: 'White to move. Black has just taken your queen. Checkmate in two moves!',
            fen: 'rn1qkbnr/ppp2p1p/3p2p1/4N3/2B1P3/2N5/PPPP1PPP/R1BbK2R w KQkq - 0 6',
            goal: 'mate',
            solution: ['Bxf7+', 'Ke7', 'Nd5#'],
            hint: 'Start with a check on f7. Where can the king go? Then let a knight finish the job.',
            explanation: 'Bxf7+ Ke7 Nd5#. The d5-knight gives check and covers f6. The bishop covers e8 and e6, the e5-knight covers d7 and protects the bishop, and Black\'s own pieces block d8, f8 and d6. Checks first: forcing moves can be stronger than any amount of material.',
          },
        },
        {
          type: 'tip',
          title: 'The lesson',
          md: md(`
            When your opponent offers you something big for free, stop and look for the catch. Check what their pieces can do **after** you take.
          `),
        },
      ],
    },
    {
      id: 'l1-opera-game',
      title: 'A complete game: the Opera Game',
      summary: 'Play through the most famous short game ever played.',
      estMinutes: 10,
      blocks: [
        {
          type: 'text',
          md: md(`
            In 1858, the American genius **Paul Morphy** played this game at the opera house in Paris against two noblemen who teamed up against him. It is the perfect first game to study: Morphy develops quickly, gets his king safe, opens lines and finishes with a spectacular checkmate.

            Step through it slowly and read each note. You know all the rules you need!
          `),
        },
        {
          type: 'line',
          moves: [
            'e4', 'e5', 'Nf3', 'd6', 'd4', 'Bg4', 'dxe5', 'Bxf3', 'Qxf3', 'dxe5', 'Bc4', 'Nf6',
            'Qb3', 'Qe7', 'Nc3', 'c6', 'Bg5', 'b5', 'Nxb5', 'cxb5', 'Bxb5+', 'Nbd7', 'O-O-O', 'Rd8',
            'Rxd7', 'Rxd7', 'Rd1', 'Qe6', 'Bxd7+', 'Nxd7', 'Qb8+', 'Nxb8', 'Rd8#',
          ],
          caption: 'Morphy vs Duke Karl and Count Isouard, Paris 1858. 1-0.',
          notes: {
            1: '1. e4: White takes space in the centre.',
            4: '2... d6: a solid but rather passive defence.',
            6: '3... Bg4: the bishop pins the knight to the queen.',
            8: '4... Bxf3: Black gives up the bishop rather than lose the e5-pawn.',
            11: '6. Bc4: development with a threat. White\'s queen and bishop now both aim at f7: Qxf7 would be checkmate!',
            12: '6... Nf6: blocks the queen\'s path to f7.',
            13: '7. Qb3: a double attack on f7 and b7.',
            14: '7... Qe7: defends f7. Black\'s pieces are getting in each other\'s way.',
            15: '8. Nc3: Morphy prefers developing to grabbing the b7-pawn.',
            17: '9. Bg5: White has developed almost everything. Black\'s kingside bishop and rook are still at home.',
            18: '9... b5? Black attacks the bishop on c4 but wastes more time.',
            19: '10. Nxb5! Morphy gives up a knight to open lines to the black king.',
            21: '11. Bxb5+: check!',
            23: '12. O-O-O: castling with a purpose. The rook arrives on the d-file and attacks the pinned knight.',
            25: '13. Rxd7! Another sacrifice to keep the attack going.',
            27: '14. Rd1: the last white piece joins in.',
            29: '15. Bxd7+: Black\'s defenders are falling one by one.',
            31: '16. Qb8+!! The queen sacrifice, forcing the knight away from d7.',
            33: '17. Rd8#. The rook is protected by the bishop on g5. A beautiful finish. 1-0.',
          },
        },
        {
          type: 'exercise',
          exercise: {
            id: 'l1-opera-game-ex1',
            prompt: 'You are Morphy. White to move: find the stunning checkmate in two.',
            fen: '4kb1r/p2n1ppp/4q3/4p1B1/4P3/1Q6/PPP2PPP/2KR4 w k - 0 16',
            goal: 'mate',
            solution: ['Qb8+', 'Nxb8', 'Rd8#'],
            hint: 'The knight on d7 is the only piece guarding d8. Force it to move with a queen check.',
            explanation: 'Qb8+!! Nxb8 Rd8#. The queen sacrifice drags the knight away, and the rook mates on d8, protected by the bishop on g5.',
          },
        },
        {
          type: 'tip',
          title: 'What made Morphy win?',
          md: md(`
            - He **developed** a new piece almost every move.
            - He **castled** and brought his rooks to the open d-file.
            - Black wasted time and left the king in the centre.

            These ideas are the heart of the next level: opening principles.
          `),
        },
      ],
    },
  ],
}

export const level1: Module[] = [
  boardModule,
  piecesOneModule,
  piecesTwoModule,
  checkModule,
  specialModule,
  notationModule,
  firstGamesModule,
]
