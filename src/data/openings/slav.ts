import type { Opening } from '../types.ts'

export const slavDefence: Opening = {
  id: 'slav-defence',
  name: 'Slav Defence',
  eco: 'D10–D19',
  side: 'black',
  difficulty: 'intermediate',
  summary:
    'The Slav is a rock-solid defence to the Queen’s Gambit: …c6 supports d5 while keeping the light-squared bishop free to go to f5 or g4. Black gets a healthy structure without the passive bishop of the Queen’s Gambit Declined. It suits solid players who still want active pieces; Kramnik and Anand were regular Slav players.',
  ideas: [
    'Support d5 with …c6 to keep the c8 bishop’s diagonal open.',
    'Develop the light-squared bishop to f5 or g4 before …e6.',
    'When White allows it, take on c4 and make White spend time regaining the pawn.',
    'After a4, use the weakened b4 square for your bishop or knight.',
    'Free your position with …c5 or …e5 once development is complete.',
  ],
  pitfalls: [
    'After 3.Nc3 Nf6 4.e3, …Bf5? runs into cxd5 and Qb3, hitting b7 and d5.',
    'Trying to hold the c4 pawn with …b5 can backfire once White has a4 and b3 available.',
    'Do not leave b7 undefended when White’s queen can reach b3.',
    'When White chases the f5 bishop with Nh4, keep it on the diagonal with …Bg6 rather than letting it be trapped.',
    'In the Exchange Slav, copying White’s moves for too long can leave you a tempo behind in a symmetrical position.',
  ],
  lines: [
    {
      name: 'Main line: 4…dxc4 5.a4 Bf5',
      moves: ['d4', 'd5', 'c4', 'c6', 'Nf3', 'Nf6', 'Nc3', 'dxc4', 'a4', 'Bf5', 'e3', 'e6', 'Bxc4', 'Bb4', 'O-O', 'O-O', 'Qe2', 'Nbd7', 'e4', 'Bg6'],
      notes: {
        4: '**The Slav**: support d5 with the c-pawn and keep the c8 bishop’s diagonal open.',
        6: 'Develop.',
        8: 'Now take: White must spend time winning back the pawn.',
        9: 'White stops …b5.',
        10: '**…Bf5**: develop the bishop outside the pawn chain, the whole point of the Slav.',
        12: 'Now …e6 is fine, because your bishop is already active.',
        14: 'Use the b4 hole to pin the knight.',
        16: 'Castle.',
        18: 'Develop and prepare …e5 or …c5.',
        20: 'The bishop retreats but stays on the b1–h7 diagonal. Plans: …Re8 and …e5, or …Bh5 and …c5. Solid and equal.',
      },
    },
    {
      name: 'Exchange Slav',
      moves: ['d4', 'd5', 'c4', 'c6', 'cxd5', 'cxd5', 'Nc3', 'Nf6', 'Bf4', 'Nc6', 'e3', 'Bf5', 'Nf3', 'e6', 'Qb3', 'Bb4', 'Bb5', 'O-O'],
      notes: {
        5: '**The Exchange Slav**: a symmetrical position where White hopes the extra tempo matters.',
        6: 'Recapture with the pawn; the structure is equal.',
        10: 'Develop and pressure d4.',
        12: 'Develop the bishop outside the chain.',
        14: 'Open the f8 bishop.',
        15: 'White eyes b7.',
        16: 'Counter-pin the c3 knight instead of defending passively.',
        18: 'Castle. Equal and solid; plans are …Rc8, …Qa5 and pressure on the c-file.',
      },
    },
    {
      name: 'Quiet 4.e3 Bf5 5.Nc3 e6 6.Nh4',
      moves: ['d4', 'd5', 'c4', 'c6', 'Nf3', 'Nf6', 'e3', 'Bf5', 'Nc3', 'e6', 'Nh4', 'Bg6', 'Nxg6', 'hxg6', 'Bd3', 'Nbd7', 'O-O', 'Bd6'],
      notes: {
        7: 'White plays solidly, protecting c4 in advance.',
        8: 'Develop the bishop outside the chain before …e6.',
        11: 'White chases the bishop to win the bishop pair.',
        12: 'Retreat; after Nxg6 hxg6 you get the half-open h-file.',
        14: 'Recapture towards the centre. The h-file is now open for your rook.',
        16: 'Develop.',
        18: 'Black is solid, with the h-file as a bonus. Plans: …Qe7, …dxc4 and …e5; castling on either side is possible.',
      },
    },
    {
      name: 'Chebanenko vs 3.Nc3 and 4.e3',
      moves: ['d4', 'd5', 'c4', 'c6', 'Nc3', 'Nf6', 'e3', 'a6', 'Nf3', 'b5', 'b3', 'Bg4', 'h3', 'Bxf3', 'Qxf3', 'e6'],
      notes: {
        7: 'After 4.e3, the immediate …Bf5? runs into cxd5 and Qb3.',
        8: '**The Chebanenko (…a6)**: prepare …b5 and keep the options open.',
        10: 'Grab space on the queenside.',
        11: 'White supports c4.',
        12: 'Develop the bishop outside the chain.',
        14: 'Give up the bishop for the knight and reach a solid structure.',
        16: 'Open the f8 bishop. Plans: …Nbd7, …Bd6 or …Be7, and …c5 or …e5.',
      },
    },
  ],
}
