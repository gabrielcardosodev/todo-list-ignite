import React from 'react'

import { Header } from './components/Header'
import { Tasks } from './components/Tasks'

export function App() {
  return (
    <>
      <Header />
      <main className="mx-auto my-0 mt-[-1.7rem] flex max-w-[46rem] flex-col px-2">
        <Tasks />
      </main>
    </>
  )
}
