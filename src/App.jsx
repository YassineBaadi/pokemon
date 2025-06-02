import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Layout from './pages/Layout/Layout'
import Intro from './pages/intro/Intro'
import Pokedex from './pages/pokedex/Pokedex'
import Combat from './pages/combat/Combat'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Intro/>} />
        <Route path='/pokedex' element={<Pokedex/>} />
        <Route path='/combat' element={<Combat/>} />
        
      </Routes>
    </>
  )
}

export default App