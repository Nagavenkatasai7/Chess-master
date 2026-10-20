import type { TipSection } from '../types.ts'

// The "tips & tricks" handbook: short, practical advice grouped by topic.
// A tip may carry a `fen` (diagram) or `fen` + `moves` (a short line from that
// position; without `fen` the moves start from the initial position).

export const tipSections: TipSection[] = [
  {
    id: 'tips-golden-rules',
    title: 'Golden rules for beginners',
    level: 1,
    tips: [
      {
        title: 'Before every move: checks, captures, threats',
        md: "Ask what your opponent's last move threatens, then look at every check, capture and threat for **both** sides. This one habit removes most blunders at every level.",
      },
      {
        title: 'Is it safe?',
        md: 'Before you let go of a piece, ask: can it be taken for free? Count attackers and defenders on the square it goes to. A piece that is attacked more often than it is defended is in danger.',
      },
      {
        title: 'Count the material',
        md: 'Pawn = 1, knight = 3, bishop = 3, rook = 5, queen = 9. Trade when you are ahead, avoid trades when you are behind, and never give something for nothing unless you see a concrete reason.',
      },
      {
        title: 'Develop, castle, connect',
        md: 'In the first ten moves aim to: put a pawn in the centre, bring out the knights and bishops, castle, and connect your rooks. A player who is "ahead in development" usually wins the fight that follows.',
        moves: ['e4', 'e5', 'Nf3', 'Nc6', 'Bc4', 'Bc5', 'c3', 'Nf6', 'd3', 'd6', 'O-O', 'O-O'],
      },
      {
        title: "Don't bring the queen out early",
        md: 'An early queen raid is easy to parry and the queen gets chased around while the opponent develops with tempo. Here Black has gained two developing moves while blocking the threat to f7.',
        moves: ['e4', 'e5', 'Qh5', 'Nc6', 'Bc4', 'g6', 'Qf3', 'Nf6'],
      },
      {
        title: 'Always have a reason',
        md: 'Every move should do something: develop a piece, defend, attack, or improve your worst piece. "I had nothing better" is still a reason — but then pick the move that helps your pieces most.',
      },
      {
        title: 'Look at the whole board',
        md: 'Beginners often stare at one corner. Before moving, sweep the board from left to right for loose pieces, open lines towards the kings and pieces that are doing nothing.',
      },
      {
        title: 'Checkmate beats material',
        md: 'Winning the queen is great — but only if your own king is not getting mated. When you are attacking the king, a sacrifice that leads to mate is worth more than any amount of wood.',
      },
      {
        title: 'Learn the basic mates first',
        md: 'Practise king + queen vs king and king + rook vs king until you can do them quickly and without stalemate. They are the foundation of every endgame and you will need them in real games.',
        fen: '8/8/8/4k3/8/8/8/R3K3 w - - 0 1',
      },
      {
        title: 'Play slower, think longer',
        md: 'Most beginners lose because they move too fast, not because they lack knowledge. Use your clock: in a 15-minute game you can afford 20 seconds on every move.',
      },
    ],
  },
  {
    id: 'tips-opening',
    title: 'Opening tips',
    level: 2,
    tips: [
      {
        title: 'Principles before theory',
        md: 'Below about 1600, centre + development + king safety will win you more games than memorised lines. Learn *why* the moves are played, then the moves themselves.',
      },
      {
        title: 'Knights before bishops',
        md: 'You usually know where the knights belong (f3/c3, f6/c6) before you know which diagonal the bishops want. Developing knights first keeps your options open.',
      },
      {
        title: "Don't move the same piece twice",
        md: 'Unless there is a concrete reason — winning material, avoiding a threat — every extra move with the same piece is a tempo your opponent spends on development.',
      },
      {
        title: 'Not too many pawn moves',
        md: 'Two or three pawn moves in the opening are normal (usually central pawns). Pawn moves on the wing, especially in front of your king, create weaknesses that cannot be taken back.',
      },
      {
        title: 'f7 and f2 are weak',
        md: 'In the opening the f7-square (f2 for White) is defended only by the king. Many traps — Scholar\'s mate, the Fried Liver, Légal\'s mate — target it. Keep it in mind for both sides.',
        moves: ['e4', 'e5', 'Nf3', 'Nc6', 'Bc4', 'Nf6', 'Ng5'],
      },
      {
        title: 'Castle before you attack',
        md: 'Castle early, usually by move 10. Opening the centre while your own king is still on e1 is the most common way to lose a game quickly.',
      },
      {
        title: 'Gambits: take with care',
        md: 'You may accept a gambit pawn, but then give it back if needed to finish development. Clinging to material while your king is stuck in the centre is how gambits succeed.',
      },
      {
        title: 'One system with each colour',
        md: 'Start with one opening as White and one defence against both 1.e4 and 1.d4. Play them every game, analyse what happens and add depth slowly instead of switching openings after every loss.',
      },
      {
        title: 'Know the pawn structure',
        md: 'Each opening leads to typical pawn structures, and the structure decides the plans. Knowing that the Queen\'s Gambit Exchange leads to the minority attack is worth more than knowing move 15 of the main line.',
      },
      {
        title: 'When your opponent leaves theory',
        md: 'Do not panic when your opponent plays a strange move. Ask: what does it threaten, what does it weaken, and how can I develop with tempo? Most unusual moves are simply worse than the main line.',
      },
    ],
  },
  {
    id: 'tips-tactical-vision',
    title: 'Tactical vision',
    level: 3,
    tips: [
      {
        title: 'Loose pieces drop off',
        md: 'An undefended piece is a target for forks and double attacks. Keep your pieces protected, and hunt for your opponent\'s loose pieces — they are where combinations start.',
      },
      {
        title: 'The king and queen are fork targets',
        md: 'Whenever the enemy king and queen (or king and rook) stand a knight\'s jump apart, look for a knight fork. Here Nc7+ wins the rook on a8.',
        fen: 'r3k3/8/8/1N6/8/8/8/4K3 w - - 0 1',
        moves: ['Nc7+'],
      },
      {
        title: 'Check the back rank',
        md: 'A castled king behind three unmoved pawns has no escape square. Before any move, ask whether your back rank — or your opponent\'s — is weak. Making *luft* with h3 or h6 is often a useful quiet move.',
        fen: '6k1/5ppp/8/8/8/8/5PPP/3R2K1 w - - 0 1',
        moves: ['Rd8#'],
      },
      {
        title: 'Pieces on the same line',
        md: 'King and queen on one diagonal, file or rank invite pins and skewers. Train yourself to notice when two valuable pieces line up, and look for a bishop or rook that can hit them.',
      },
      {
        title: 'Look for forcing moves first',
        md: 'Checks, captures and threats limit your opponent\'s replies, which makes them easy to calculate. Always consider them first — even "impossible" sacrifices — before quiet moves.',
      },
      {
        title: 'Find the overloaded defender',
        md: 'When one piece guards two things, attack one of them. The defender cannot do both jobs, and deflection or removing the guard wins material.',
      },
      {
        title: 'Patterns, patterns, patterns',
        md: 'Strong players do not calculate everything; they recognise patterns: back-rank mate, smothered mate, Greek gift, Arabian mate. Solve easy puzzles in volume to build this library.',
      },
      {
        title: 'Your opponent has tactics too',
        md: 'After finding a winning combination, check your opponent\'s strongest reply — especially checks and captures. The most common tactical error is stopping one move too early.',
      },
      {
        title: 'Tactics flow from good positions',
        md: 'Combinations appear when you have active pieces and the opponent has weaknesses. If you cannot find a tactic, improve your worst piece; the tactic often appears a few moves later.',
      },
    ],
  },
  {
    id: 'tips-middlegame',
    title: 'Middlegame tips',
    level: 4,
    tips: [
      {
        title: 'Improve your worst piece',
        md: 'When there is no tactic and no clear plan, find your least active piece and bring it into play. This simple rule is how strong players find good moves in quiet positions.',
      },
      {
        title: 'Plans come from the pawns',
        md: 'Look at the pawn structure to decide where to play: attack on the side where you have more space, or where your pawns point. Pawn breaks (moves that challenge enemy pawns) open lines for your pieces.',
      },
      {
        title: 'Knights need outposts',
        md: 'A knight on a protected square that enemy pawns cannot attack, in or near the enemy camp, is often worth more than a rook. Create outposts, then occupy them.',
        fen: 'r4rk1/pp3ppp/3p1b2/3Np3/4P3/8/PPP2PPP/R4RK1 w - - 0 1',
      },
      {
        title: 'Rooks on open files',
        md: 'Put rooks on open or half-open files and look to reach the seventh rank. A rook on the seventh attacks pawns from the side and cuts off the enemy king.',
      },
      {
        title: 'Bad bishop, good knight',
        md: 'A bishop blocked by its own pawns on the same colour is "bad". Trade it, or put your pawns on the other colour. A knight against a bad bishop is a classic winning recipe.',
      },
      {
        title: 'Attack where you are stronger',
        md: 'Before attacking the king, count attackers and defenders in that sector. An attack with two pieces against three defenders rarely works; bring more pieces first.',
      },
      {
        title: 'Meet a wing attack in the centre',
        md: 'The best answer to a flank attack is usually a counter-strike in the centre. Opening the centre while your opponent\'s pieces are on the wing often wins outright.',
      },
      {
        title: 'Prophylaxis: ask what they want',
        md: 'Before choosing your move, ask "What would my opponent play if it were his move?" Stopping his best plan is often stronger than pursuing your own.',
      },
      {
        title: 'Trade the right pieces',
        md: 'Trade your bad pieces for their good ones; trade attackers when you are defending; keep pieces when you are attacking. Every exchange changes the position — make sure it changes in your favour.',
      },
      {
        title: 'Space restricts the opponent',
        md: 'Extra space gives your pieces more room. When you have less space, free yourself with exchanges and pawn breaks; when you have more, avoid trades and squeeze.',
      },
    ],
  },
  {
    id: 'tips-endgame',
    title: 'Endgame tips',
    level: 4,
    tips: [
      {
        title: 'Activate the king',
        md: 'In the endgame the king is a strong piece. As soon as the queens are gone, march it towards the centre or the pawns. A centralised king is often worth a pawn.',
      },
      {
        title: 'King in front of the pawn',
        md: 'In king and pawn against king, put your king in front of the pawn, not behind it. With the king on the sixth rank in front of its pawn, White wins no matter who is to move (except with a rook pawn).',
        fen: '4k3/8/4K3/4P3/8/8/8/8 b - - 0 1',
      },
      {
        title: 'The rule of the square',
        md: 'Draw a square from the pawn to its promotion rank. If the defending king can step inside the square, it catches the pawn. Here White to move plays Ke2 and is in time.',
        fen: '7k/8/8/p7/8/8/8/5K2 w - - 0 1',
      },
      {
        title: 'Rooks belong behind passed pawns',
        md: 'Tarrasch\'s rule: put your rook behind passed pawns — your own and your opponent\'s. A rook in front of a pawn becomes passive; a rook behind it gains activity as the pawn advances.',
        fen: '8/r4k2/8/P7/8/8/6K1/R7 w - - 0 1',
      },
      {
        title: 'Know the Lucena: build a bridge',
        md: 'With king on the queening square and pawn on the seventh, cut off the enemy king, put your rook on the fourth rank, then walk the king out. The rook blocks the checks.',
        fen: '6K1/4k1P1/8/8/8/8/7r/5R2 w - - 0 1',
        moves: ['Re1+', 'Kd7', 'Re4', 'Rh1', 'Kf7', 'Rf1+', 'Kg6', 'Rg1+', 'Kf6', 'Rf1+', 'Kg5', 'Rg1+', 'Rg4'],
      },
      {
        title: 'Know the Philidor: third-rank defence',
        md: 'Defending rook and pawn against rook: keep your rook on your third rank so the enemy king cannot advance. Once the pawn steps forward, swing the rook to the back and check from behind.',
        fen: '4k3/R7/7r/3KP3/8/8/8/8 b - - 0 1',
        moves: ['Rb6', 'e6', 'Rb1', 'Kd6', 'Rd1+'],
      },
      {
        title: 'Passed pawns must be pushed',
        md: 'A passed pawn grows stronger as it advances and ties down enemy pieces. Support it with your king and rook — and blockade your opponent\'s passed pawns, ideally with a knight.',
      },
      {
        title: 'Do not hurry',
        md: 'In a winning endgame, improve everything before acting and take away counterplay first. There is no prize for winning quickly — only for winning.',
      },
      {
        title: 'Pawn endings are calculation',
        md: 'Before trading into a king and pawn ending, calculate it to the end. Opposition, the outside passed pawn and tempo moves decide these endings, and a single tempo can change the result.',
      },
      {
        title: 'Opposite bishops draw — mostly',
        md: 'With only opposite-coloured bishops, even two extra pawns are often not enough. When defending, aim for this; when attacking, keep the rooks or queens on — then the extra bishop helps the attacker.',
        fen: '8/5k2/3b4/5P2/4P1K1/8/4B3/8 w - - 0 1',
      },
    ],
  },
  {
    id: 'tips-calculation',
    title: 'Calculation tips',
    level: 5,
    tips: [
      {
        title: 'List candidate moves first',
        md: 'Before analysing anything, name two to four candidate moves. Choosing the move to analyse before you start stops you from drifting around the same line again and again.',
      },
      {
        title: 'Check the final position',
        md: 'At the end of every line, stop and look at the position as if it were on the board: whose move is it, what is hanging, is there a check? Many lines that "win a piece" end with your own queen loose.',
      },
      {
        title: 'Look backwards',
        md: 'Backward moves — a queen retreating to defend, a bishop going back to its first rank — are classic blind spots. When calculating, ask what retreats are available for both sides.',
      },
      {
        title: 'Quiet moves in the middle of a combination',
        md: 'A combination is not only checks. After the forcing moves, a calm move that adds a threat (or takes away a flight square) is often the hardest to see — and the most powerful.',
      },
      {
        title: 'Use the comparison method',
        md: 'You do not have to calculate everything to the end. Compare the candidate lines with each other: if both keep the same structure but one gains a tempo, choose it and save the clock.',
      },
      {
        title: 'Calculate the opponent\'s best reply',
        md: 'Do not analyse the replies you hope for. In every branch, look for the move you would least like to face, and calculate that one first.',
      },
      {
        title: 'Stop when the evaluation is clear',
        md: 'Calculation exists to reach a position you can evaluate. Once you can say "this is winning" or "this is bad for me", stop the line and move on.',
      },
      {
        title: 'Visualise with fixed images',
        md: 'Practise "freezing" the position after each move in your mind: where is every piece now? Solving puzzles from a book without moving the pieces is the best visualisation training.',
      },
      {
        title: 'Intuition first, then verify',
        md: 'Your first impression is often right. Use it to pick candidates, then calculate to make sure there is no tactical refutation. Intuition proposes, calculation disposes.',
      },
    ],
  },
  {
    id: 'tips-practical',
    title: 'Time management and practical play',
    level: 4,
    tips: [
      {
        title: 'Budget your time',
        md: 'A useful rule for classical games: about 10% of your time on the opening, the most on the early middlegame, and keep a reserve for the critical moments. Avoid spending half your clock on one move.',
      },
      {
        title: 'Spend time at the critical moments',
        md: 'Think longest when the position is changing: pawn breaks, exchanges, sacrifices, transitions to the endgame. Recaptures and obvious moves should be played quickly.',
      },
      {
        title: 'In time trouble, play safe',
        md: 'With little time left, choose solid moves that keep your pieces protected and your king safe. Avoid opening the position; complications favour the player with more time.',
      },
      {
        title: 'Use your opponent\'s time',
        md: 'While your opponent thinks, look at the position generally — plans, weaknesses, which pieces are bad — rather than calculating specific lines that may never happen.',
      },
      {
        title: 'Make the position hard for the opponent',
        md: 'When two moves are similar, choose the one that sets your opponent more problems. Practical chess is about giving the other player chances to go wrong.',
      },
      {
        title: 'When lost, complicate',
        md: 'In a bad position, avoid simple, clearly lost endings. Create imbalances, threats and chaos; a strong opponent may still make a mistake under pressure.',
      },
      {
        title: 'Write down your move first',
        md: 'In over-the-board games where it is allowed, writing your candidate down (or simply pausing) before playing it gives you one last moment to do a blunder check.',
      },
      {
        title: 'Sit on your hands',
        md: 'When you find a good move, look for a better one — and then check once more that it does not hang anything. Most blunders happen when we are excited.',
      },
    ],
  },
  {
    id: 'tips-online',
    title: 'Online chess tips',
    level: 2,
    tips: [
      {
        title: 'Play longer games to improve',
        md: 'Bullet and blitz are fun, but you learn mostly from games where you have time to think. Make 15+10 or longer your main time control while you are improving.',
      },
      {
        title: 'Turn off premoves when learning',
        md: 'Premoves save time in bullet but encourage moving without looking. In longer games, turn them off and use every move to check what your opponent just did.',
      },
      {
        title: 'Analyse every game you lose',
        md: 'After each serious game, go through it yourself first and write down where you think you went wrong. Only then check with the engine. Five minutes of analysis is worth more than five more games.',
      },
      {
        title: 'Avoid tilt',
        md: 'After two losses in a row, stop and take a break. Playing angry leads to rushed moves and a rating slide. Set yourself a session limit before you start.',
      },
      {
        title: 'Use a 2D board and good settings',
        md: 'Choose a clean board and piece set, enable move confirmation for daily games and highlight last moves. Small comforts reduce mouse slips and missed moves.',
      },
      {
        title: 'Puzzles every day',
        md: 'Fifteen minutes of puzzles a day is one of the most efficient ways to improve. Mix timed puzzle rush for speed with untimed puzzles where you solve completely before moving.',
      },
      {
        title: 'Do not use engines during games',
        md: 'Using assistance in rated games is cheating and leads to bans. Use engines only after the game to learn from your mistakes.',
      },
      {
        title: 'Check the clock, not just the board',
        md: 'Online, flagging decides many games. In the endgame of a fast game, simple moves that keep the material are often better than the "best" move that costs 20 seconds.',
      },
    ],
  },
  {
    id: 'tips-training',
    title: 'Training and mindset',
    level: 5,
    tips: [
      {
        title: 'Deliberate practice beats volume',
        md: 'Improvement comes from focused work on your weaknesses: solving hard positions, analysing your games and studying endgames. Playing thousands of blitz games without reflection mostly reinforces old habits.',
      },
      {
        title: 'Balance your training',
        md: 'A simple split for club players: tactics and calculation 40%, playing and analysing your games 30%, endgames 15%, openings 15%. Adjust it to what your own games tell you.',
      },
      {
        title: 'Analyse without an engine first',
        md: 'Write your own thoughts on critical moments before you switch the engine on. The difference between what you thought and what was true is exactly what you need to learn.',
      },
      {
        title: 'Study the classics',
        md: 'Annotated games of the great players show plans and ideas that engine lines do not explain. Play through them slowly and guess the next move before you look.',
      },
      {
        title: 'Keep a mistakes notebook',
        md: 'Record the type of every serious mistake: missed tactic, time trouble, wrong plan, opening gap. After twenty games you will see clearly what to work on.',
      },
      {
        title: 'Solve, do not just look',
        md: 'When solving a puzzle, calculate the whole line and commit to an answer before checking. Guessing the first move and peeking at the solution trains very little.',
      },
      {
        title: 'Rating follows understanding',
        md: 'Do not chase rating points day by day. Focus on playing good moves and learning from every game; the rating catches up, usually in sudden jumps after plateaus.',
      },
      {
        title: 'Look after your body',
        md: 'Sleep, exercise and hydration have a real effect on calculation and concentration. Strong players treat physical fitness as part of their chess training.',
      },
      {
        title: 'Find a sparring partner',
        md: 'Training games and joint analysis with a slightly stronger player — or a coach — reveal blind spots you cannot see alone.',
      },
    ],
  },
  {
    id: 'tips-tournament',
    title: 'Tournament tips',
    level: 4,
    tips: [
      {
        title: 'Prepare, but not too late',
        md: 'Look at your opponent\'s openings if they are available, but stop preparing at least an hour before the game. Arriving rested is worth more than one extra line.',
      },
      {
        title: 'Eat and drink sensibly',
        md: 'Bring water and a light snack (fruit, nuts) to long games. Heavy meals before a round make you sleepy; low blood sugar in hour four causes blunders.',
      },
      {
        title: 'Write the move, then check',
        md: 'Keep score accurately — you need it for draw claims and to analyse later. Use the moment of writing for a final blunder check where the rules allow it.',
      },
      {
        title: 'Know the rules',
        md: 'Learn the basics of touch-move, claiming a draw by repetition or the 50-move rule, and what to do if your opponent makes an illegal move. Stop the clock and call the arbiter when unsure.',
      },
      {
        title: 'Draw offers',
        md: 'Offer a draw only after making your move and before pressing the clock. Decide on draw offers by looking at the position and the clock — not at your opponent\'s rating.',
      },
      {
        title: 'Forget the last game',
        md: 'Win or lose, close the previous game mentally before the next round. Analyse it briefly, then focus on rest and preparation. One loss does not decide a tournament.',
      },
      {
        title: 'Walk around, but stay focused',
        md: 'A short walk while your opponent thinks can refresh you, but do not analyse other games for long or lose track of your own clock.',
      },
      {
        title: 'Play the board, not the opponent',
        md: 'A higher-rated opponent also blunders; a lower-rated one can play well. Respect every opponent, fear none, and make the best move in front of you.',
      },
    ],
  },
]
