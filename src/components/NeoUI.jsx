import React from 'react'

const base = 'bg-gray-100 rounded-xl shadow-[5px_5px_10px_#d1d5db,-5px_-5px_10px_#ffffff]'
const pressed = 'shadow-inner'

export function Card({children, className=''}){
  return <div className={`${base} p-4 ${className}`}>{children}</div>
}

export function Button({children, onClick, pressed: isPressed, ariaLabel}){
  return (
    <button
      aria-pressed={isPressed}
      aria-label={ariaLabel}
      onClick={onClick}
      className={`${base} px-3 py-2 m-1 focus:outline-none focus:ring-2 focus:ring-blue-500 active:shadow-inner ${isPressed?pressed:''}`}
    >
      {children}
    </button>
  )
}

export function Toggle({label, active, onToggle}){
  return (
    <Button ariaLabel={label} onClick={onToggle} pressed={active}>
      <span className={active?'font-bold':''}>{label}</span>
    </Button>
  )
}
