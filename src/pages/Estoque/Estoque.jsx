import './Estoque.css'

import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import ItemEstoque from '../../components/ItemEstoque/ItemEstoque'
import axios from 'axios'

export default function Estoque() {
    
    const nullItem = {
        'name': 'Nenhum produto encontrado', 
        'quantity': 0, 
        'currentQuantity': 0, 
        'price': 0, 
        'buyDate': new Date()}

    const [stockItems, setStockItems] = useState([])
    const [name, setName] = useState('')
    const [quantity, setQuantity] = useState('')
    const [price, setPrice] = useState('')
    const [minDate, setMinDate] = useState(new Date())
    const [maxDate, setMaxDate] = useState(new Date())

    useEffect(() => {
        axiosClient.get().then((response) => {
           setStockItems(response.data.content)
        })
    }, [])
    
    const axiosClient = axios.create({
        baseURL: "http://localhost:8080/api/v1/stock"
    })

    function getStockItems() {
        const finalItems = []
        
        stockItems.forEach(item => {
            if (handleDates(item.buyDate, minDate, maxDate)){
                finalItems.push(<ItemEstoque product={item} />)
            }
        })

        if (finalItems[0] == null) {
            finalItems.push(<ItemEstoque product={nullItem} />)
        }
        
        return finalItems
    }

    function handleDates(item, minDate, maxDate) {
        if ((
                new Date(item).toISOString().split('T')[0] == new Date(minDate).toISOString().split('T')[0] 
                &&
                new Date(item).toISOString().split('T')[0] == new Date(maxDate).toISOString().split('T')[0]
            )
            ||
            (
                new Date(item).toISOString().split('T')[0] >= new Date(minDate).toISOString().split('T')[0] 
                &&
                new Date(item).toISOString().split('T')[0] <= new Date(maxDate).toISOString().split('T')[0]
            )) {
            return true
        }
        else {
            return false
        }
    }

    function handleSubmit()  {
        addStockItem(name, quantity, price)
        alert('Produto adicionado ao estoque!')
    } 
    
    function addStockItem(name, quantity, price) {
        axiosClient.post('', {
            name: name,
            quantity: quantity,
            price: price
        })
        .then((response) => {
            setStockItems((stockItems) => [response.data, ...stockItems])
        })
    }

    function getTotalValue() {
        let totalValue = 0

        stockItems.forEach(item => {
            if (handleDates(item.buyDate, minDate, maxDate)){
                totalValue += item.price
            }
        })

        return totalValue.toFixed(2).replace('.', ',')
    }

    function setToday() {
        setMaxDate(new Date())
        setMinDate(new Date())
    }

    function setThisMonth() {
        const thisMonth = new Date().toISOString().split('-')[1] 
        const thisYear = new Date().toISOString().split('-')[0] 

        setMinDate(thisYear + '-' + thisMonth + '-'+ '01' +'T05:05:05.000Z')
        setMaxDate(thisYear + '-' + thisMonth + '-' + setMonthDays() +'T05:05:05.000Z')
    }

    function setThisyear() {
        const thisYear = new Date().toISOString().split('-')[0] 

        setMinDate(thisYear + '-' + '01-01T05:05:05.000Z')
        setMaxDate(thisYear + '-' + '12-31T05:05:05.000Z')
    }

    function setMonthDays(month) {
        const thisYear = new Date().toISOString().split('-')[0] 
        let februaryDays = 28

        if (isLeapYear(thisYear)) {
            februaryDays = 29
        }

        if (month == 2) {
            return februaryDays
        }
        if (month % 2 == 0 && month < 8) {
            return 30
        }
        if (month % 2 == 0 && month >= 8) {
            return 31
        }
        if (month % 2 == 1 && month > 8) {
            return 30
        }
        else {
            return 31
        }
    }

    function isLeapYear(year) {
        if (year % 4 == 0) {
            return true
        }
        else {
            return false
        }
    }

    return (
        <div className='estoque-page-main-container'> 
            <Sidebar />
             
            <div className='estoque-container'>
                <div className='card-caixa-title-container'>
                    <h2 className='card-title margin-btn-20 white'> Estoque </h2>
                </div>
                
                <h4 className='width-1020'> Adicionar um novo produto ao estoque </h4>
                <form 
                    className='estoque-add-item-container'
                    action=''
                    onSubmit={handleSubmit}
                >

                    <input 
                        className='estoque-add-pdt-title-top'
                        type='text'
                        placeholder='Digite o nome do produto'
                        value={name}
                        onChange={(event) => setName(event.target.value)} 
                    /> 
                    <input 
                        className='estoque-add-qtd-title-top'
                        type='number'
                        placeholder='QTD'
                        min={0}
                        max={1000}
                        value={quantity}
                        onChange={(event) => setQuantity(event.target.value)} 
                    /> 
                    <input 
                        className='estoque-add-value-title-top'
                        type='number'
                        placeholder='Valor pago'
                        max={100000}
                        min={0}
                        step={.01}
                        value={price}
                        onChange={(event) => setPrice(event.target.value)} 
                    /> 
                    <button className='add-btn'> + </button>
                </form>

                <div className='estoque-add-title-container-2'>
                    <span className='estoque-pdt-title-margin white bold'> Produto </span>
                    <span className='margin-rgt-20 white bold'> QTD </span>
                    <span className='margin-rgt-20 white bold'> QTD Atual </span>
                    <span className='margin-lft-10 white bold'> Valor Pago </span>
                </div>
                
                <div className='estoque-page-scroll-container'>
                    { getStockItems() }
                </div>

                <div className='av-total-value-container'>
                    <div className='date-container'>
                        <p className='date-text'> Consultar entradas entre: </p>
                        <input 
                            type="date" 
                            value={minDate}
                            onChange={(event) => setMinDate(event.target.value)}
                            className='date-item'
                        />

                        e

                        <input 
                            type="date" 
                            value={maxDate}
                            onChange={(event) => setMaxDate(event.target.value)}
                            className='date-item'
                        />
                    </div>

                    <button onClick={() => setToday()} className='date-btn'> Consultar dia atual </button>
                    <button onClick={() => setThisMonth()} className='date-btn'> Consultar mês atual </button>
                    <button onClick={() => setThisyear()} className='date-btn'> Consultar ano atual </button>
                    <div>
                        <span className='av-total white'> Total: </span>
                        <span className='stock-total-value'> R$ { getTotalValue() } </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
