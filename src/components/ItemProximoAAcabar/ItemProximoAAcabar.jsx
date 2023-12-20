import './ItemProximoAAcabar.css'

import React from 'react'

export default function ItemProximoAAcabar({product}) {
    return (           
        <div className='paa-item-container'>
            <span className='paa-product-name'> {product.name} </span>
            <span className='paa-product-qtd'> {product.currentQuantity} </span>
        </div>
    )
}
