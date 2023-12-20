import './ItemCardapio.css'

import React, { useState } from 'react'
import TrashCanButton from '../TrashCanButton/TrashCanButton'
import axios from 'axios'

export default function ItemCardapio({product}) {
    
    const id = product.id
    const [menuItems, setMenuItems] = useState([])

    const axiosClient = axios.create({
        baseURL: "http://localhost:8080/api/v1/menu"
    })

    function deleteProduct() {
        axiosClient.get().then((response) => {
            setMenuItems(response.data.content)
        })
        
        axiosClient.delete(`${id}`);
        setMenuItems(
           menuItems.filter((item) => {
              return item.id !== id;
           })
        )
    }

    return (           
        <div className='estoque-item-container'>
            <span className='item-cardapio-product-name'> {product.name} </span>
            <span className='item-cardapio-product-value'> R$ {product.price.toFixed(2).replace('.', ',')} </span>
            <form className='form-container' action="" onSubmit={deleteProduct}> <TrashCanButton /> </form>
        </div>
    )
}
