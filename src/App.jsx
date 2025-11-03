import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Form from './components/pages/Form'
import Blackjack from './components/pages/Blackjack'
import Layout from './components/layout/Layout'
import { Routes, Route } from 'react-router-dom'
import FirstQcm from './components/pages/FirstQcm'
import SecondQcm from './components/pages/SecondQcm'
import ThirdQcm from './components/pages/ThirdQcm'

function App() {


  return (
    <Layout>
      <Routes> 
          <Route path="/" element={<Form />} />
          <Route path="/blackjack" element={<Blackjack />} />
          <Route path="/qcm" element={<FirstQcm />} />
          <Route path="/qcm2" element={<SecondQcm />} />
          <Route path="/qcm3" element={<ThirdQcm />} />
      </Routes>
    </Layout>
  )
}

export default App
