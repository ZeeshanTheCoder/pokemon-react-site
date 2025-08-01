import React from 'react'
import Pokemon from './Pokemon'
import { ThemeProvider } from './Provider/ThemeProvider'

const App = () => {
  return (
    <>
      <ThemeProvider>
        <Pokemon />
      </ThemeProvider>
    </>
  )
}

export default App
