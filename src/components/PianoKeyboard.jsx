import React, { useMemo } from 'react'
import { toMidi } from '../lib/music'

// Simple rectangular 2-octave piano keyboard (C3-B4)
export default function PianoKeyboard({ onPress }) {
  const { whiteKeys, blackKeys } = useMemo(() => {
    const whites = []
    const letters = ['C','D','E','F','G','A','B']
    let octave = 3
    for (let i = 0; i < 14; i++) {
      const letter = letters[i % 7]
      if (letter === 'C' && i > 0 && i % 7 === 0) octave++
      whites.push({ midi: toMidi({letter, octave, acc:0}), letter, octave })
    }
    const blacks = [
      { midi: toMidi({letter:'C',octave:3,acc:1}), left:3.5 },
      { midi: toMidi({letter:'D',octave:3,acc:1}), left:10.7 },
      { midi: toMidi({letter:'F',octave:3,acc:1}), left:25 },
      { midi: toMidi({letter:'G',octave:3,acc:1}), left:32.1 },
      { midi: toMidi({letter:'A',octave:3,acc:1}), left:39.3 },
      { midi: toMidi({letter:'C',octave:4,acc:1}), left:53.6 },
      { midi: toMidi({letter:'D',octave:4,acc:1}), left:60.7 },
      { midi: toMidi({letter:'F',octave:4,acc:1}), left:75 },
      { midi: toMidi({letter:'G',octave:4,acc:1}), left:82.1 },
      { midi: toMidi({letter:'A',octave:4,acc:1}), left:89.3 },
    ]
    return { whiteKeys: whites, blackKeys: blacks }
  }, [])

  return (
    <div className="relative w-full h-32 select-none">
      <div className="flex h-full">
        {whiteKeys.map((k,i) => (
          <button
            key={k.midi}
            onClick={() => onPress(k.midi)}
            aria-label={`${k.letter}${k.octave}`}
            className="flex-1 border mx-px bg-gray-100 rounded-b-xl active:shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        ))}
      </div>
      {blackKeys.map(b => (
        <button
          key={b.midi}
          onClick={() => onPress(b.midi)}
          aria-label={`black key ${b.midi}`}
          style={{left:`${b.left}%`, width:'5%'}}
          className="absolute h-20 -top-0 bg-gray-700 rounded-b-md active:shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      ))}
    </div>
  )
}
