import axios from 'axios';
import TrashCanButton from '../TrashCanButton/TrashCanButton'
import './ItemEstoque.css'

import React, { useState } from 'react'
import UpdateButton from '../UpdateButton/UpdateButton';

export default function ItemEstoque({product}) {

    const id = product.id
    const [stockItems, setStockItems] = useState([])
    const [currentQuantity, setCurrentQuantity] = useState()

    const axiosClient = axios.create({
        baseURL: "http://localhost:8080/api/v1/stock"
    })

    function updateProduct() {
        axiosClient.put(`${id}`, product)
            .then(() => alert('Quantidade atualizada com sucesso!'))
    }

    function deleteProduct() {
        axiosClient.get().then((response) => {
            setStockItems(response.data.content)
        })
        
        axiosClient.delete(`${id}`)
        setStockItems(
           stockItems.filter((item) => {
              return item.id !== id
           })
        )
    }

    function plusCurrentQuantity() {
        product.currentQuantity++
        setCurrentQuantity(product.currentQuantity)
    }

    function minusCurrentQuantity() {
        product.currentQuantity--
        setCurrentQuantity(product.currentQuantity)
    }

    function getDate() {
        return new Date(product.buyDate).toLocaleString().split(',')[0]
    }

    return (           
        <div className='estoque-item-container'>
            <span className='product-name'> {product.name + ' | Comprado em: ' + getDate()} </span>
            <span className='product-qtd'> {product.quantity} </span>
            <div className='cq-container'>
                <div className='cq-container2'>
                    <span> {product.currentQuantity} </span>
                </div>
                <div className='btns-container'>
                    <span onClick={() => plusCurrentQuantity()} className='btn-item plus'> + </span>
                    <span onClick={() => minusCurrentQuantity()} className='btn-item minus'> - </span>
                </div>
                
            </div>
            <form className='form-container2' action="" onSubmit={updateProduct}> <UpdateButton /> </form>
            <span className='product-value'> R$ {product.price.toFixed(2).replace('.', ',')} </span>
            <form className='form-container' action="" onSubmit={deleteProduct}> <TrashCanButton /> </form>
        </div>
    )
}
