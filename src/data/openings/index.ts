import type { Opening } from '../types.ts'
import { caroKann } from './caro-kann.ts'
import { englishOpening } from './english.ts'
import { frenchDefence } from './french.ts'
import { italianGame } from './italian.ts'
import { kingsIndianDefence } from './kings-indian.ts'
import { londonSystem } from './london.ts'
import { nimzoIndianDefence } from './nimzo-indian.ts'
import { openGameBlack } from './open-game-black.ts'
import { queensGambit } from './queens-gambit.ts'
import { queensGambitDeclined } from './qgd.ts'
import { ruyLopez } from './ruy-lopez.ts'
import { scandinavianDefence } from './scandinavian.ts'
import { scotchGame } from './scotch.ts'
import { sicilianDefence } from './sicilian.ts'
import { slavDefence } from './slav.ts'
import { viennaGame } from './vienna.ts'

/**
 * Opening repertoire in suggested learning order: beginner openings first
 * (alternating a White system with a Black defence), then intermediate, then advanced.
 */
export const openings: Opening[] = [
  // Beginner
  italianGame,
  openGameBlack,
  londonSystem,
  queensGambitDeclined,
  scotchGame,
  caroKann,
  viennaGame,
  scandinavianDefence,
  // Intermediate
  ruyLopez,
  frenchDefence,
  queensGambit,
  slavDefence,
  englishOpening,
  // Advanced
  sicilianDefence,
  kingsIndianDefence,
  nimzoIndianDefence,
]
