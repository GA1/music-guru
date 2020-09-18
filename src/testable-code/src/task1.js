function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const TRIAD_TYPE = Object.freeze({
  MAJOR: 1,
  MINOR: 2,
  DIMINISHED: 3,
  AUGMENTED: 4,
})

const notes = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
// const notes = ['do', 're', 'mi', 'fa', 'so', 'la', 'si']

const convert = (letter) => {
  return {
    'A': 'la',
    'B': 'si',
    'C': 'do',
    'D': 're',
    'E': 'mi',
    'F': 'fa',
    'G': 'so',
  }[letter]
}

const generateAllPossibleSequences = length => {
  const generateAllPossibleSequencesRecursively = (sequence, notes, acc) => {
    if (sequence.length === length) {
      acc.push(sequence)
    } else {
      for (let i = 0; i < notes.length; i++) {
        const note = notes[i]
        generateAllPossibleSequencesRecursively(sequence + note, notes, acc)
      }
    }
  }
  const results = []
  generateAllPossibleSequencesRecursively('', notes, results)
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

generateTriadSeries([1, 2, 3])

const f = async () => {
  while (true) {
    const drawnSequence = itemsToDraw[Math.floor(Math.random() * itemsToDraw.length)]
    console.log('\n\n\n\n\n\n')
    console.log(drawnSequence.split('').map(l => convert(l)).join(' '))
    console.log('\n\n\n\n\n\n')
    await sleep(5000)
  }
}

f().then(r => {})




