import './Sidebar.css'
import logo from '../../assets/images/logo.png'

import React from 'react'
import { Link } from 'react-router-dom'

export default function Sidebar() {
    return (
        <div className='sidebar-container'> 
            <img src={logo} alt="Caffetterie Bom Sabor" className='sidebar-logo' />

            <nav className='sidebar-nav'>
                <Link className='sidebar-text-button' to='/' > Inicio </Link>
                <Link className='sidebar-text-button' to='/cardapio'> Cardápio </Link>
                <Link className='sidebar-text-button' to='/fluxodecaixa'> Fluxo de Caixa </Link>
                <Link className='sidebar-text-button' to='/estoque'> Estoque </Link>
                <Link className='sidebar-text-button' to='/ajuda'> Ajuda </Link>
            </nav>
        </div>
    )
}
