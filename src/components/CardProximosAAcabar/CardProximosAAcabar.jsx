import './CardProximosAAcabar.css'

import React from 'react'
import NavButton from '../NavButton/NavButton'
import ItemProximoAAcabar from '../ItemProximoAAcabar/ItemProximoAAcabar'

export default function CardProximosAAcabar({products}) {

    const nullItem = {'name': 'Nenhum produto proximo a acabar', 'currentQuantity': '-'}

    function getProducts() {
        const finalItems = []
        let noItems = true
        
        products.forEach(item => {
            if (item.currentQuantity <= 5 && item.currentQuantity > 0) {
                finalItems.push(<ItemProximoAAcabar product={item} />)
                noItems = false
            }
        })

        if (noItems == true) {
            finalItems.push(<ItemProximoAAcabar product={nullItem} />)
        }

        return finalItems
    }

    return (
        <div className='card-paa-main-container'>
            <div className='card-paa-title-container'>
                <h2 className='card-title'> Proximos a acabar </h2>
            </div>

            <div>
                <div className='paa-item-title-container'>
                    <span className='paa-pdt-title'> Produto </span>
                    <span className='paa-qtd-title'> QTD </span>
                </div>
                
                <div className='paa-scroll-container'>
                    { getProducts() }
                </div>

                <div className='paa-item-btn-container'>   
                    <NavButton 
                        className='nav-button' 
                        title='Conferir Estoque' 
                        goTo='/estoque' 
                    />
                </div>
            </div>
        </div>
    )
}
