import React from 'react'
import Button from './Button'
import { useTheme } from '../context/ThemeContext'

const ThemeToggelButton = () => {

  const { mode, setMode } = useTheme()

  console.log("mode", mode)

  return (
    <Button onButtonClick={() => setMode(mode === "light" ? "dark" : "light")} name='theme'/>
  )
}

export default ThemeToggelButton