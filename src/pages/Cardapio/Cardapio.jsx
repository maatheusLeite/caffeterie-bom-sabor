import './Cardapio.css'

import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import ItemCardapio from '../../components/ItemCardapio/ItemCardapio'
import axios from 'axios'

export default function Cardapio() {
    
    const nullItem = {'name': 'Nenhum produto adicionado', 'price': 0}

    const [menuItems, setMenuItems] = useState([])
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')

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
            finalItems.push(<ItemCardapio product={item} />)
        })

        if (menuItems[0] == null) {
            finalItems.push(<ItemCardapio product={nullItem} />)
        }

        return finalItems
    }

    function handleSubmit()  {
        addMenuItem(name, price)
        alert('Produto adicionado ao cardápio!')
    } 
    
    function addMenuItem(name, price) {
        axiosClient.post('', {
            name: name,
            price: price
        })
        .then((response) => {
            setMenuItems((menuItems) => [response.data, ...menuItems])
        })
    }

    return (
        <div className='cardapio-page-main-container'> 
            <Sidebar />
             
            <div className='cardapio-container'>
                <div className='card-cardapio-title-container'>
                    <h2 className='card-title margin-btn-20 white'> Cardápio </h2>
                </div>
                
                <h4 className='width-1020'> Adicionar um novo produto ao cardápio </h4>
                <form 
                    className='cardapio-add-item-container'
                    action=''
                    onSubmit={handleSubmit}
                >

                    <input 
                        className='cardapio-add-pdt-title-top'
                        type='text'
                        placeholder='Digite o nome do produto'
                        value={name}
                        onChange={(event) => setName(event.target.value)} 
                    /> 
                    <input 
                        className='cardapio-add-value-title-top'
                        type='number'
                        placeholder='Preço'
                        max={100000}
                        min={0}
                        step={.01}
                        value={price}
                        onChange={(event) => setPrice(event.target.value)} 
                    /> 
                    <button className='add-btn'> + </button>
                </form>

                <div className='cardapio-add-title-container-2'>
                    <span className='cardapio-pdt-title margin-rgt-810 white bold'> Produto </span>
                    <span className='white bold'> Preço </span>
                </div>
                
                <div className='cardapio-page-scroll-container'>
                    { getMenuItems() }
                </div>
            </div>
        </div>
    )
}
