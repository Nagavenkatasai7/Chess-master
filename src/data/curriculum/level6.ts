import type { Module } from '../types.ts'

// Level 6 "Master & GM path" (2200+): learning from the classics, building a
// repertoire, training like a grandmaster, psychology and the title path.
// Every line and exercise is checked by scripts/check-content.ts (legality)
// and scripts/verify-content.ts (engine soundness).

export const level6: Module[] = [
  // ─────────────────────────── 2. OPENING REPERTOIRE ───────────────────────────
  {
    id: 'l6-repertoire',
    level: 6,
    title: 'Building an opening repertoire',
    description:
      'Choosing openings that fit your style, how deep to prepare at each rating, ideas versus memorisation, model games, and preparing with engines and databases.',
    lessons: [
      {
        id: 'l6-rep-style',
        title: 'Choosing openings that fit your style',
        summary: 'A repertoire is a system, not a list of moves. Pick openings that lead to positions you understand and enjoy.',
        estMinutes: 12,
        blocks: [
          {
            type: 'text',
            md:
              "Below 2000 you can get away with almost any sound opening. At master level your opponents know their lines, prepare against you with databases, and punish inaccuracies in the first fifteen moves. Your opening choice becomes part of your *strategy*: it decides which kinds of middlegames you will play for the next several years.\n\n" +
              "A good repertoire is **stable** (you do not change it every month), **coherent** (the openings lead to related structures) and **suited to you**.",
          },
          {
            type: 'text',
            md:
              "### Know your style\n\n" +
              "Look honestly at your best and worst games and ask:\n\n" +
              "- Do I enjoy **initiative and tactics**, or **slow manoeuvring** and squeezing small advantages?\n" +
              "- Do I calculate well in sharp positions, or do I make my best decisions in quiet ones?\n" +
              "- Do I like to memorise, or do I prefer to understand typical plans and play on general principles?\n" +
              "- Which pawn structures do I handle well: open centres, closed centres, isolated pawns, hanging pawns?\n\n" +
              "Roughly speaking, openings fall into families:\n\n" +
              "- **Sharp and theoretical**: the Najdorf and Dragon Sicilians, the King's Indian, the Grünfeld, the Open Sicilian with White, the Botvinnik Semi-Slav.\n" +
              "- **Solid and classical**: the Caro-Kann, the Queen's Gambit Declined, the Berlin Defence, the Petroff, the Slav.\n" +
              "- **Flexible and positional**: the Catalan, the English, the Réti, the Queen's Indian.",
          },
          {
            type: 'tip',
            title: 'Coherence saves study time',
            md:
              "Choose openings that share structures and ideas. The Caro-Kann against 1.e4 and the Slav against 1.d4 both put a pawn on c6 and develop the light-squared bishop before ...e6. A 1.d4 player who plays the Catalan and the Queen's Gambit with White, and the Queen's Gambit Declined with Black, studies the same structures from both sides of the board.",
          },
          {
            type: 'line',
            moves: ['e4', 'c6', 'd4', 'd5', 'Nc3', 'dxe4', 'Nxe4', 'Bf5'],
            caption: 'Caro-Kann, Classical: the same idea as the Slav',
            notes: {
              2: 'Black prepares ...d5 with the c-pawn, keeping the c8-bishop free.',
              8: 'The light-squared bishop comes out to f5 *before* ...e6 locks it in. A Slav player will recognise this plan immediately.',
            },
          },
          {
            type: 'text',
            md:
              "### White and Black have different goals\n\n" +
              "- **With White**, aim for a lasting advantage or a durable initiative. You choose the battlefield, so choose lines where you know the plans better than your opponent.\n" +
              "- **With Black**, aim for a sound position with clear counterplay. A position that is objectively slightly worse but rich in ideas is often a better practical choice than a dry equality you do not understand.\n" +
              "- **Against weaker opponents**, prefer openings that keep pieces on the board and imbalances in the position. Against stronger opponents, a solid line you know well is often the best weapon.",
          },
        ],
      },
    ],
  },
]
