function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const TRIAD_TYPE = Object.freeze({
  MAJOR: 1,
  MINOR: 2,
  DIMINISHED: 3,
  AUGMENTED: 4,
})

const toSolfegeNote = note => {
  let result = note
  result = result.replace('C', 'do')
  result = result.replace('D', 're')
  result = result.replace('E', 'mi')
  result = result.replace('F', 'fa')
  result = result.replace('G', 'sol')
  result = result.replace('A', 'la')
  result = result.replace('B', 'si')
  return result
}

const toSolfegeNotes = notes => {
  return notes.map(n => toSolfegeNote(n))
}

const C_major = 'C D E F G A B'.split(' ')
const G_major = 'F♯ G A B C D E'.split(' ')
const D_major = 'D E F♯ G A B C♯'.split(' ')
const A_major = 'A B C D E F G'.split(' ')
const E_major = 'E F♯ G♯ A B C♯ D♯'.split(' ') // C♯ minor
const F_sharp_major = 'F♯ G♯ A♯ B C♯ D♯ E♯'.split(' ') // D♯ minor

const B_flat_major = 'B♭ C D E♭ F G A'.split(' ')

const F_major = 'F G A B♭ C D E'.split(' ')

const NUMBER_OF_CHORDS = 4

const PAUSE_LENGTH = 15000
const ALLOW_CONSECUTIVE_DUPLICATES = false

const toMajorChords = scale => scale.map(note => note + 'maj')
const toMinorChords = scale => scale.map(note => note + 'm')
const to7Chords = scale => scale.map(note => note + '7')
const toMinor7Chords = scale => scale.map(note => note + 'm7')

// const notes = toSolfegeNotes(B_flat_major.split(' '))
// const notes = [...toMajorChords(C_major), ...toMinorChords(C_major), ...to7Chords(C_major)]
const notes = [ ...to7Chords(C_major), ...toMinor7Chords(C_major)]

const convert = letter => {
  return {
    A: 'la',
    B: 'si',
    C: 'do',
    D: 're',
    E: 'mi',
    F: 'fa',
    G: 'sol',
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
        if (0 === N || ((0 < N && sequence[N - 1] !== note) || ALLOW_CONSECUTIVE_DUPLICATES)) {
          generateAllPossibleSequencesRecursively(
            [...sequence, note],
            notes,
            acc
          )
        }
      }
    }
  }
  const results = []
  generateAllPossibleSequencesRecursively([], notes, results)
  return results
}

let itemsToDraw = []
function generateChordProgression(lengths) {
  for (let i = 0; i < lengths.length; i++) {
    const length = lengths[i]
    const allPossibleSequencesOfLength = generateAllPossibleSequences(length)
    itemsToDraw = [...itemsToDraw, ...allPossibleSequencesOfLength]
  }
}

generateChordProgression([NUMBER_OF_CHORDS])

const f = async () => {
  while (true) {
    const drawnSequence =
      itemsToDraw[Math.floor(Math.random() * itemsToDraw.length)]
    console.log('\n\n\n\n\n\n')
    // console.log(drawnSequence.split('').map(l => convert(l)).join(' '))

    console.log(drawnSequence.join(' '))
    console.log('\n\n\n\n\n\n')
    await sleep(PAUSE_LENGTH)
  }
}

f().then(() => {})
