import './ItemCardEstoque.css'

import React from 'react'

export default function ItemCardEstoque({product}) {
    
    return (           
        <div className='estoque-item-container'>
            <span className='cstk-product-name'> {product.name} </span>
            <span className='cstk-product-qtd'> {product.quantity} </span>
            <span className='cstk-product-qtd'> {product.currentQuantity} </span>
            <span className='cstk-product-value'> R$ {product.price.toFixed(2).replace('.', ',')} </span>
        </div>
    )
}
