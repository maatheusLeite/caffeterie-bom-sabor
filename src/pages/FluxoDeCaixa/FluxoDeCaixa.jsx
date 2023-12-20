import './FluxoDeCaixa.css'

import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import ItemFluxoDeCaixa from '../../components/ItemFluxoDeCaixa/ItemFluxoDeCaixa'
import axios from 'axios'

export default function FluxoDeCaixa() {
    
    const nullItem = {
        'name': 'Nenhum produto encontrado', 
        'quantity': 0, 
        'price': 0,
        'sellDate': new Date()
    }

    const [cashFlowItems, setCashFlowItems] = useState([])
    const [menuItems, setMenuItems] = useState([])
    const [name, setName] = useState('')
    const [quantity, setQuantity] = useState('')
    const [minDate, setMinDate] = useState(new Date())
    const [maxDate, setMaxDate] = useState(new Date())

    useEffect(() => {
        axiosClient.get().then((response) => {
           setCashFlowItems(response.data.content)
        })

        axios.get('http://localhost:8080/api/v1/menu').then((response) => {
            setMenuItems(response.data.content)
        })
    }, [])
    
    const axiosClient = axios.create({
        baseURL: "http://localhost:8080/api/v1/cashflow"
    })

    function getCashFlowItems() {
        const finalItems = []
        
        cashFlowItems.forEach(item => {
            if (handleDates(item.sellDate, minDate, maxDate)){
                finalItems.push(<ItemFluxoDeCaixa product={item} />)
            }
        })

        if (finalItems[0] == null) {
            finalItems.push(<ItemFluxoDeCaixa product={nullItem} />)
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

    function getMenuItems() {
        const finalItems = []

        menuItems.forEach(item => {
            finalItems.push(<option value={item.name}> {item.name} - R${item.price.toFixed(2).replace('.', ',')} </option>)
        })

        return finalItems
    }

    function handleSubmit()  {
        addCashFlowItem(name, quantity)
        alert('Venda Adicionada!')
    } 
    
    function addCashFlowItem(name, quantity) {
        menuItems.forEach(item => {
            if(item.name == name) {
                axiosClient.post('', {
                    name: name,
                    quantity: quantity,
                    price: item.price * quantity,
                    sellDate: new Date()
                })
                .then((response) => {
                    setCashFlowItems(cashFlowItems => [response.data, ...cashFlowItems])
                })
            }
        })
    }

    function getTotalValue() {
        let totalValue = 0

        const today = new Date().getDay()

        cashFlowItems.forEach(item => {
            if (handleDates(item.sellDate, minDate, maxDate)){
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
        <div className='caixa-page-main-container'> 
            <Sidebar />
             
            <div className='caixa-container'>
                <div className='card-caixa-title-container'>
                    <h2 className='card-title margin-btn-20 white'> Fluxo de Caixa </h2>
                </div>
                
                <h4 className='width-1020'> Adicionar uma nova venda </h4>
                <form 
                    className='caixa-add-item-container'
                    action=''
                    onSubmit={handleSubmit}
                >
                    
                    <select
                        className='caixa-add-pdt-title-top'
                        name='item'
                        value={name}
                        onChange={event => setName(event.target.value)}
                    >
                        <option value='null'> Escolha um produto do cardapio </option>

                        { getMenuItems() }
                    </select>
                    <input 
                        className='caixa-add-qtd-title-top'
                        type='number'
                        placeholder='QTD'
                        min={0}
                        max={1000}
                        value={quantity}
                        onChange={(event) => setQuantity(event.target.value)} 
                    /> 
                    <button className='add-btn'> + </button>
                </form>

                <div className='caixa-add-title-container-2'>
                    <span className='caixa-pdt-title margin-rgt-755 white bold'> Produto </span>
                    <span className='caixa-qtd-title white bold'> QTD </span>
                    <span className='white bold'> Valor da venda </span>
                </div>
                
                <div className='caixa-page-scroll-container'>
                    { getCashFlowItems() }
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
                        <span className='av-total-value'> R$ { getTotalValue() } </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
