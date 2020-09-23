function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const TRIAD_TYPE = Object.freeze({
  MAJOR: 1,
  MINOR: 2,
  DIMINISHED: 3,
  AUGMENTED: 4,
})


const notes1 = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
const notes2 = ['D♭', 'E♭', 'F', 'G♭', 'A♭', 'B♭', 'C']
const notes3 = ['D', 'E', 'G♭', 'G', 'A', 'B', 'D♭']
const notes4 = ['E♭', 'F', 'G', 'A♭', 'B♭', 'C', 'D']
const notes5 = ['F', 'G', 'A', 'B♭', 'C', 'D', 'E']
const notes6 = ['G♭', 'A♭', 'B♭', 'B', 'D♭', 'E♭', 'F']

const notes = notes3

const convert = (letter) => {
  return {
    'A': 'la',
    'B': 'si',
    'C': 'do',
    'D': 're',
    'E': 'mi',
    'F': 'fa',
    'G': 'sol',
  }[letter]
}

const generateAllPossibleSequences = length => {
  const generateAllPossibleSequencesRecursively = (sequence, notes, acc) => {
    if (sequence.length === length) {
      acc.push(sequence)
    } else {
      for (let i = 0; i < notes.length; i++) {
        const note = notes[i]
        const N = sequence.length
        if (0 < N && sequence[N - 1] === note) {
          return
        } else {
          generateAllPossibleSequencesRecursively([...sequence, note], notes, acc)
        }
      }
    }
  }
  const results = []
  generateAllPossibleSequencesRecursively([], notes, results)
  return results
}

let itemsToDraw = []

function generateTriadSeries(lengths) {
  for (let i = 0; i < lengths.length; i++) {
    const length = lengths[i]
    const allPossibleSequencesOfLength = generateAllPossibleSequences(length);
    itemsToDraw = [...itemsToDraw, ...allPossibleSequencesOfLength]
  }
}

generateTriadSeries([4])

const f = async () => {
  while (true) {
    const drawnSequence = itemsToDraw[Math.floor(Math.random() * itemsToDraw.length)]
    console.log('\n\n\n\n\n\n')
    // console.log(drawnSequence.split('').map(l => convert(l)).join(' '))

    console.log(drawnSequence.join(' '))
    console.log('\n\n\n\n\n\n')
    await sleep(15000)
  }
}

f().then(() => {})




