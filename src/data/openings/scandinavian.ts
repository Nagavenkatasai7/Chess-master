import type { Opening } from '../types.ts'

export const scandinavianDefence: Opening = {
  id: 'scandinavian-defence',
  name: 'Scandinavian Defence',
  eco: 'B01',
  side: 'black',
  difficulty: 'beginner',
  summary:
    'The Scandinavian (1…d5) attacks e4 at once and usually recaptures with the queen. It is easy to learn: the pawn structure is similar in every line and Black develops quickly with …Nf6, …c6 and …Bf5. It suits beginners who want a low-theory, solid weapon, and Carlsen has used it against top opposition.',
  ideas: [
    'Challenge e4 immediately and steer the game into structures you know.',
    'After 3.Nc3, retreat the queen to a5 or d6, where it is safe from further attacks.',
    'Develop the light-squared bishop to f5 or g4 before …e6.',
    '…c6 gives the queen a retreat square and blunts Nb5 and Nd5 tricks.',
    'Castling long with pressure on d4 is a common active plan.',
  ],
  pitfalls: [
    'With the queen out early, watch for Nc3, Bf4 and Nd5 gaining time against it.',
    'With the queen on a5, beware of Bd2 followed by Nd5, a discovered attack on the queen.',
    'Do not play …e6 before your bishop is outside the pawn chain.',
    'The check 3…Qe5+ looks active, but after Be2 it blocks your development and loses time.',
    'Every extra queen move gives White another tempo, so finish your development first.',
  ],
  lines: [
    {
      name: 'Main line: 3…Qa5',
      moves: ['e4', 'd5', 'exd5', 'Qxd5', 'Nc3', 'Qa5', 'd4', 'Nf6', 'Nf3', 'c6', 'Bc4', 'Bf5', 'Bd2', 'e6', 'Qe2', 'Bb4', 'O-O-O', 'Nbd7', 'a3', 'Bxc3'],
      notes: {
        2: '**The Scandinavian**: challenge e4 on move one.',
        4: 'Recapture with the queen. White will gain a tempo with Nc3, but the knight must commit early.',
        6: '**…Qa5**: the queen is safe here, and once White plays d4 it pins the c3 knight to the king.',
        8: 'Develop.',
        10: '**…c6** gives the queen a retreat and takes b5 and d5 from White’s knights.',
        12: 'Develop the bishop before …e6.',
        13: 'Careful: Bd2 unpins the knight and sets up **Nd5**, a discovered attack on your queen.',
        14: '…e6 covers d5, so Nd5 is no longer a threat.',
        16: 'Pin the knight again.',
        18: 'Develop.',
        20: 'Trade the knight to relieve the pressure. Next: …Qc7, …O-O or …O-O-O, and …Nb6 or …Nd5.',
      },
    },
    {
      name: '3…Qa5: the Nd5 trick',
      moves: ['e4', 'd5', 'exd5', 'Qxd5', 'Nc3', 'Qa5', 'd4', 'Nf6', 'Nf3', 'c6', 'Bc4', 'Bf5', 'Bd2', 'e6', 'Nd5', 'Qd8', 'Nxf6+', 'Qxf6'],
      notes: {
        13: 'Bd2 prepares a discovered attack on your queen.',
        14: 'Develop and cover d5 with the e-pawn.',
        15: 'White tries the trick anyway: the d2 bishop now attacks your queen.',
        16: 'Retreat. **Never …cxd5??**, which loses the queen to Bxa5.',
        17: 'White trades the knight.',
        18: 'Recapture with the queen. Black has a sound structure and active pieces; plans are …Nd7, …Bd6 and …O-O.',
      },
    },
    {
      name: 'Modern: 3…Qd6',
      moves: ['e4', 'd5', 'exd5', 'Qxd5', 'Nc3', 'Qd6', 'd4', 'Nf6', 'Nf3', 'c6', 'Ne5', 'Nbd7', 'Nc4', 'Qc7', 'Qf3', 'Nb6'],
      notes: {
        6: '**…Qd6**: the modern retreat. The queen is more central and covers e5 and the dark squares.',
        8: 'Develop.',
        10: 'Give the queen a retreat and prepare …Bf5 or …Bg4.',
        11: 'White centralises the knight.',
        12: 'Challenge the e5 knight.',
        13: 'White attacks the queen.',
        14: 'The queen retreats to c7, keeping an eye on e5. If White later plays Bf4, the queen drops back to d8.',
        15: 'White prepares Bf4 and O-O-O.',
        16: 'Challenge the c4 knight. Plans: …Be6 or …Bg4, …e6 and castling, with a solid position.',
      },
    },
    {
      name: 'White delays Nc3: 3.Nf3',
      moves: ['e4', 'd5', 'exd5', 'Qxd5', 'Nf3', 'Bg4', 'Be2', 'Nc6', 'd4', 'O-O-O', 'Be3', 'Nf6', 'Nc3', 'Qa5'],
      notes: {
        5: 'White delays Nc3 so the queen is not hit straight away.',
        6: 'Pin the knight and put pressure on d4.',
        8: 'Develop and attack d4.',
        10: '**Castle long**: the rook joins the pressure on d4 at once.',
        12: 'Develop.',
        13: 'Now the knight hits the queen.',
        14: '**…Qa5** steps away and pins the c3 knight against White’s king. Black has active pieces and real pressure on d4.',
      },
    },
  ],
}
