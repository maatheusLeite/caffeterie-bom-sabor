import axios from 'axios';
import TrashCanButton from '../TrashCanButton/TrashCanButton'
import './ItemFluxoDeCaixa.css'

import React, { useState } from 'react'

export default function ItemFluxoDeCaixa({product}) {

    const id = product.id
    const [cashFlowItems, setCashFlowItems] = useState([])

    const axiosClient = axios.create({
        baseURL: "http://localhost:8080/api/v1/cashflow"
    })

    function deleteProduct() {
        axiosClient.get().then((response) => {
            setCashFlowItems(response.data.content)
        })
        
        axiosClient.delete(`${id}`);
        setCashFlowItems(
           cashFlowItems.filter((item) => {
              return item.id !== id;
           })
        )
    }

    function getDate() {
        return new Date(product.sellDate).toLocaleString().split(',')[0]
    }

    return (           
        <div className='estoque-item-container'>
            <span className='caixa-product-name'> 
                {product.name +  ' - R$' + product.price.toFixed(2).replace('.', ',') + ' | Vendido em: ' + getDate()} 
            </span>
            <span className='caixa-product-qtd'> {product.quantity} </span>
            <span className='caixa-product-value'> R$ {product.price.toFixed(2).replace('.', ',')} </span>
            <form className='form-container' action="" onSubmit={deleteProduct}> <TrashCanButton /> </form>
        </div>
    )
}
