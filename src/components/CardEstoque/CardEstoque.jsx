import './CardEstoque.css'

import React from 'react'
import NavButton from '../NavButton/NavButton'
import ItemCardEstoque from '../ItemCardEstoque/ItemCardEstoque'

export default function CardEstoque({stockItems}) {

    const nullItem = {'name': 'Nenhum produto encontrado', 'quantity': 0, 'currentQuantity': 0, 'price': 0}

    function getStockItems() {
        const finalItems = []
        
        stockItems.forEach(item => {
            finalItems.push(<ItemCardEstoque product={item} />)
        })

        if (stockItems[0] == null) {
            finalItems.push(<ItemCardEstoque product={nullItem} />)
        }

        return finalItems
    }

    return (
        <div className='card-estoque-main-container'>
            <div className='card-estoque-title-container'>
                <h2 className='card-title'> Estoque </h2>
                <div className='card-estoque-btn'> 
                    <NavButton 
                        className='nav-button'
                        title='Conferir Estoque' 
                        goTo='/estoque' 
                    />
                </div>
            </div>
            
            <div className='estoque-item-title-container'>
                <span className='estoque-pdt-title'> Produto </span>
                <span className='estoque-qtd-title'> QTD </span>
                <span className='estoque-qtd-title2'> QTD Atual </span>
                <span> Valor Pago </span>
            </div>

            <div className='estoque-scroll-container'>
                { getStockItems() }
            </div>
        </div>
    )
}
