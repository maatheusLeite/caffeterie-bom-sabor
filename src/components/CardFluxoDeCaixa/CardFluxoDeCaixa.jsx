import './CardFluxoDeCaixa.css'

import React, { useEffect, useState } from 'react'
import NavButton from '../NavButton/NavButton'
import axios from 'axios'

export default function CardFluxoDeCaixa() {

    const [cashFlowItems, setCashFlowItems] = useState([])
    const [stockItems, setStockItems] = useState([])

    useEffect(() => {
        axios.get("http://localhost:8080/api/v1/cashflow").then((response) => {
           setCashFlowItems(response.data.content)
        })
        axios.get("http://localhost:8080/api/v1/stock").then((response) => {
            setStockItems(response.data.content)
         }) 
    }, [])

    function getDayFlow() {
        let totalValue = 0
        const today = new Date().getDay()
        
        cashFlowItems.forEach(item => {
            if (new Date(item.sellDate).getDay() == today){
                totalValue += item.price
            }
        })

        stockItems.forEach(item => {
            if (new Date(item.buyDate).getDay() == today){
                totalValue += item.price
            }
        })

        return totalValue.toFixed(2).replace('.', ',')
    }

    function getMonthFlow() {
        let totalValue = 0
        const month = new Date()
        
        cashFlowItems.forEach(item => {
            if (new Date(item.sellDate).getMonth() == month.getMonth()){
                totalValue += item.price
            }
        })

        stockItems.forEach(item => {
            if (new Date(item.buyDate).getMonth() == month.getMonth()){
                totalValue += item.price
            }
        })

        return totalValue.toFixed(2).replace('.', ',')
    }

    function getYearFlow() {
        let totalValue = 0
        const year = new Date()
        
        cashFlowItems.forEach(item => {
            if (new Date(item.sellDate).getFullYear() == year.getFullYear()){
                totalValue += item.price
            }
        })

        stockItems.forEach(item => {
            if (new Date(item.buyDate).getFullYear() == year.getFullYear()){
                totalValue += item.price
            }
        })

        return totalValue.toFixed(2).replace('.', ',')
    }

    function changeColor(cashFlow) {
        if (cashFlow.replace(',', '.') < 0) {
            return 'fc-card-value-red'
        }
        else {
            return 'fc-card-value'
        }
    }
    
    function getToday() {
        const day = new Date().toLocaleString().split('/')[0]
        const month = new Date().toLocaleString().split('/')[1]
        
        return day + '/' + month
    }

    function getMonth() {
        const month = new Date().toLocaleString().split('/')[1]
        const year = new Date().toLocaleString().split('/')[2].split(',')[0]
        
        return month + '/' + year
    }

    function getYear() {
        return new Date().getFullYear()
    }

    return (
        <div className='fc-container'>
            <h2 className='card-title'> Fluxo de caixa </h2>

            <div className='fc-card-container'>
                <h4 className='fc-card-title '> Saldo do Ano - { getYear() } </h4>
                <span className={changeColor(getMonthFlow())}> R$ {getYearFlow()} </span>
            </div>
            
            <div className='fc-card-container'>
                <h4 className='fc-card-title '> Saldo do Mês - { getMonth() } </h4>
                <span className={changeColor(getMonthFlow())}> R$ {getMonthFlow()} </span>
            </div>

            <div className='fc-card-container'>
                <h4 className='fc-card-title '> Saldo do Dia - { getToday() } </h4>
                <span className={changeColor(getDayFlow())}> R$ {getDayFlow()} </span>
            </div>

            <div> 
                <NavButton 
                    className='nav-button' 
                    title='Adicionar Vendas' 
                    goTo='/fluxodecaixa'
                    /> 
            </div>
        </div>
    )
}
