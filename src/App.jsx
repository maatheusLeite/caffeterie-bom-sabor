import './App.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cardapio from './pages/Cardapio/Cardapio'
import Estoque from './pages/Estoque/Estoque'
import FluxoDeCaixa from './pages/FluxoDeCaixa/FluxoDeCaixa'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cardapio' element={<Cardapio />} />
        <Route path='/fluxodecaixa' element={<FluxoDeCaixa />} />
        <Route path='/estoque' element={<Estoque />} />
      </Routes>
    </Router>
  )
}
