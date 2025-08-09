import React from 'react'
import { relIndexTreble, relIndexBass, formatPitch } from '../lib/music'

// SVG staff rendering. Computes vertical placement based on relative index.
export default function Staff({ pitch, clef, showHint=true, locale='EN' }){
  const rel = clef === 'treble' ? relIndexTreble(pitch) : relIndexBass(pitch)
  const lineGap = 10
  const staffTop = 20
  const y = staffTop + (4 - rel) * (lineGap/2)

  const ledger = []
  if (rel < 0) {
    for (let i = rel; i <= -1; i++) if (i % 2 === 0) ledger.push(i)
  } else if (rel > 8) {
    for (let i = rel; i >= 9; i--) if (i % 2 === 0) ledger.push(i)
  }

  const stemUp = rel < 6
  const noteX = 100
  const stemLen = 30
  const acc = pitch.acc === -1 ? '♭' : pitch.acc === 1 ? '♯' : ''

  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 200 100" className="w-full h-32">
        {[0,1,2,3,4].map(i => (
          <line key={i} x1="20" x2="180" y1={staffTop + i*lineGap} y2={staffTop + i*lineGap} stroke="black" />
        ))}
        <text x="35" y={staffTop + lineGap*3} fontSize="30">{clef==='treble'?'𝄞':'𝄢'}</text>
        {ledger.map(l => (
          <line key={l} x1="80" x2="120" y1={staffTop + (4 - l)*(lineGap/2)} y2={staffTop + (4 - l)*(lineGap/2)} stroke="black" />
        ))}
        {acc && <text x="85" y={y+5} fontSize="20">{acc}</text>}
        <ellipse cx={noteX} cy={y} rx="6" ry="4" fill="black" />
        {stemUp ? (
          <line x1={noteX+6} y1={y} x2={noteX+6} y2={y - stemLen} stroke="black" />
        ) : (
          <line x1={noteX-6} y1={y} x2={noteX-6} y2={y + stemLen} stroke="black" />
        )}
      </svg>
      {showHint && <div className="text-sm mt-1">{formatPitch(pitch, locale)}</div>}
    </div>
  )
}
