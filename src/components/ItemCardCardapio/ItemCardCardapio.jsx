import './ItemCardCardapio.css'

import React from 'react'

export default function ItemCardCardapio({product}) {
    return (           
        <div className='cardapio-item-container'>
            <span className='cardapio-product-name'> {product.name} </span>
            <span className='cardapio-product-value'> R$ {product.price.toFixed(2).replace('.', ',')} </span>
        </div>
    )
}
