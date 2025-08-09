import React, { useState, useEffect, useCallback } from 'react'
import Staff from './components/Staff'
import PianoKeyboard from './components/PianoKeyboard'
import { Card, Button, Toggle } from './components/NeoUI'
import { randomNoteInRange, LETTERS, LETTERS_PT, toMidi } from './lib/music'

export default function App(){
  const [clef, setClef] = useState('treble')
  const [accidentals, setAccidentals] = useState(true)
  const [ledger, setLedger] = useState(false)
  const [locale, setLocale] = useState('EN')
  const [mode, setMode] = useState('letters')
  const [hint, setHint] = useState(true)
  const [score, setScore] = useState({hit:0, miss:0})
  const [note, setNote] = useState(() => randomNoteInRange('treble', accidentals, ledger))
  const [feedback, setFeedback] = useState(null)

  const nextNote = useCallback(() => {
    setNote(randomNoteInRange(clef, accidentals, ledger))
  }, [clef, accidentals, ledger])

  const handleAnswer = useCallback((correct) => {
    setFeedback(correct ? 'hit' : 'miss')
    setScore(s => ({hit: s.hit + (correct?1:0), miss: s.miss + (correct?0:1)}))
    setTimeout(() => {
      setFeedback(null)
      nextNote()
    }, 500)
  }, [nextNote])

  const handleLetter = (letter) => handleAnswer(letter === note.letter)
  const handleKey = (midi) => handleAnswer(midi === toMidi(note))

  useEffect(() => { nextNote() }, [clef, accidentals, ledger])

  useEffect(() => {
    const handler = e => {
      if(e.code === 'Space'){ nextNote(); e.preventDefault() }
      if(e.key === '1') setClef('treble')
      if(e.key === '2') setClef('bass')
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [nextNote])

  const names = locale === 'PT' ? LETTERS_PT : LETTERS

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 flex flex-col items-center p-2">
      <header className="text-2xl font-bold mb-2">Treino Musical</header>
      <Card className="w-full max-w-md mb-2 flex flex-wrap justify-center">
        <Toggle label="♯/♭" active={accidentals} onToggle={() => setAccidentals(a=>!a)} />
        <Toggle label="Ledger" active={ledger} onToggle={() => setLedger(l=>!l)} />
        <Toggle label="𝄞" active={clef==='treble'} onToggle={() => setClef('treble')} />
        <Toggle label="𝄢" active={clef==='bass'} onToggle={() => setClef('bass')} />
        <Toggle label="PT" active={locale==='PT'} onToggle={() => setLocale(locale==='EN'?'PT':'EN')} />
        <Toggle label={mode==='letters'? 'Letters':'Piano'} active onToggle={() => setMode(m=>m==='letters'?'piano':'letters')} />
        <Toggle label="Hint" active={hint} onToggle={() => setHint(h=>!h)} />
      </Card>
      <Card className="w-full max-w-md mb-2 text-center">
        <div>✅ {score.hit} / ❌ {score.miss}</div>
      </Card>
      <Card className="w-full max-w-md mb-2">
        <Staff pitch={note} clef={clef} locale={locale} showHint={hint} />
        {feedback && <div className="text-center mt-2 text-xl">{feedback==='hit'?'✔':'✖'}</div>}
      </Card>
      <Card className="w-full max-w-md mb-4 flex justify-center">
        {mode==='letters' ? (
          <div className="flex flex-wrap justify-center">
            {names.map((n,i) => (
              <Button key={n} onClick={() => handleLetter(LETTERS[i])} ariaLabel={n}>{n}</Button>
            ))}
          </div>
        ) : (
          <PianoKeyboard onPress={handleKey} />
        )}
      </Card>
    </div>
  )
}
