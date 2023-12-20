import './CardCardapio.css'

import React, { useEffect, useState } from 'react'
import NavButton from '../NavButton/NavButton'
import ItemCardCardapio from '../ItemCardCardapio/ItemCardCardapio'
import axios from 'axios'

export default function CardCardapio() {
    const nullItem = {'name': 'Nenhum produto adicionado', 'price': 0}

    const [menuItems, setMenuItems] = useState([])

    useEffect(() => {
        axiosClient.get().then((response) => {
           setMenuItems(response.data.content)
        })
    }, [])
    
    const axiosClient = axios.create({
        baseURL: "http://localhost:8080/api/v1/menu"
    })

    function getMenuItems() {
        const finalItems = []
        
        menuItems.forEach(item => {
            finalItems.push(<ItemCardCardapio product={item} />)
        })

        if (menuItems[0] == null) {
            finalItems.push(<ItemCardCardapio product={nullItem} />)
        }

        return finalItems
    }

    return (
        <div className='card-cardapio-main-container'>
            <div className='card-cardapio-title-container'>
                <h2 className='card-title'> Cardápio </h2>
            </div>

            <div>
                <div className='cardapio-item-title-container'>
                    <span className='cardapio-pdt-title'> Produto </span>
                    <span className='cardapio-value-title'> Preço </span>
                </div>
                
                <div className='cardapio-scroll-container'>
                    { getMenuItems() }
                </div>

                <div className='cardapio-item-btn-container'>   
                    <NavButton 
                        className='nav-button' 
                        title='Conferir Cardápio' 
                        goTo='/cardapio' 
                    />
                </div>
            </div>
        </div>
    )
}
