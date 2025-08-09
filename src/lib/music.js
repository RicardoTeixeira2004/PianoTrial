// Music theory helpers for pitch modeling and random note generation.
// Pitch: { letter: 'C'|'D'|'E'|'F'|'G'|'A'|'B', octave: number, acc: -1|0|1 }
// MIDI mapping uses C4 = 60.

export const LETTERS = ['C','D','E','F','G','A','B']
export const LETTERS_PT = ['Dó','Ré','Mi','Fá','Sol','Lá','Si']

// Map letter to semitone offset from C within octave
const LETTER_TO_SEMITONE = {C:0, D:2, E:4, F:5, G:7, A:9, B:11}

// Map letter to diatonic index within octave (0..6)
const LETTER_TO_INDEX = {C:0, D:1, E:2, F:3, G:4, A:5, B:6}

// Convert pitch to a diatonic index. Each letter step counts as 1.
export function diatonicIndex(p){
  return p.octave * 7 + LETTER_TO_INDEX[p.letter]
}

// Convert pitch to MIDI number (C4 = 60)
export function toMidi(p){
  return (p.octave - 4) * 12 + 60 + LETTER_TO_SEMITONE[p.letter] + p.acc
}

// Helpers to compute staff relative index
const TREBLE_BASE = diatonicIndex({letter:'E',octave:4,acc:0}) // bottom line E4
const BASS_BASE = diatonicIndex({letter:'G',octave:2,acc:0})   // bottom line G2

export function relIndexTreble(p){
  return diatonicIndex(p) - TREBLE_BASE
}
export function relIndexBass(p){
  return diatonicIndex(p) - BASS_BASE
}

// Ranges for training
export const RANGES = {
  treble: { low: {letter:'C', octave:4, acc:0}, high: {letter:'A', octave:5, acc:0} },
  bass:   { low: {letter:'E', octave:2, acc:0}, high: {letter:'C', octave:4, acc:0} },
}

function clone(p){
  return {letter:p.letter, octave:p.octave, acc:p.acc || 0}
}

function stepFrom(start, steps){
  // Move diatonically by steps from start and return new pitch
  const total = diatonicIndex(start) + steps
  const octave = Math.floor(total / 7)
  const letter = LETTERS[total % 7]
  return {letter, octave, acc:0}
}

export function randomNoteInRange(clef, allowAcc, extended){
  const range = RANGES[clef]
  let low = clone(range.low)
  let high = clone(range.high)
  if(extended){
    low = stepFrom(low, -4)
    high = stepFrom(high, 4)
  }
  const lowIndex = diatonicIndex(low)
  const highIndex = diatonicIndex(high)
  const randIndex = Math.floor(Math.random() * (highIndex - lowIndex + 1)) + lowIndex
  const letter = LETTERS[randIndex % 7]
  const octave = Math.floor(randIndex / 7)
  let acc = 0
  if(allowAcc){
    const opts = [-1,0,1]
    acc = opts[Math.floor(Math.random()*3)]
  }
  return {letter, octave, acc}
}

export function formatPitch(p, locale='EN'){
  const names = locale==='PT'?LETTERS_PT:LETTERS
  const letterName = names[LETTERS.indexOf(p.letter)]
  let accSym = ''
  if(p.acc === -1) accSym = '♭'
  if(p.acc === 1) accSym = '♯'
  return `${letterName}${accSym}${p.octave}`
}
