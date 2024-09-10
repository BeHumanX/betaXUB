import React, { useState } from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'

import './App.css'
import Home from './Pages/Home'
import Login from './Pages/Login'

function App() {
  

  return (
    <>
      <Router>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Router>  
    </>

  )
}

export default App
