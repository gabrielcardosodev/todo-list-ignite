import React from 'react'

import logoImg from '../assets/logo.svg'

export function Header() {
  return (
    <header className="flex h-[12.5rem] w-screen items-center justify-center bg-gray-700">
      <img src={logoImg} alt="logotipo do site" />
    </header>
  )
}
