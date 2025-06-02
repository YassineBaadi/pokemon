import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Layout from './pages/Layout/Layout'
import Intro from './pages/intro/Intro'

function App() {


  return (
    <>
      <Routes>
          <Route path='/intro' element={<Intro/>} />
       
      </Routes>
    </>
  )
}

export default App
