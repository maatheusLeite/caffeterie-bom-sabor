import './Home.css'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CardFluxoDeCaixa from '../../components/CardFluxoDeCaixa/CardFluxoDeCaixa'
import CardProximosAAcabar from '../../components/CardProximosAAcabar/CardProximosAAcabar'
import CardCardapio from '../../components/CardCardapio/CardCardapio'
import CardEstoque from '../../components/CardEstoque/CardEstoque'
import Sidebar from '../../components/Sidebar/Sidebar'


export default function Home() {
  
    const [stockItems, setStockItems] = useState([])

    useEffect(() => {
        axiosClient.get().then((response) => {
           setStockItems(response.data.content)
        })
    }, [])
    
    const axiosClient = axios.create({
        baseURL: "http://localhost:8080/api/v1/stock"
    })

    return (
        <div className='home-main-container'> 
            <Sidebar />

            <div className='home-content-container'>
                <div className='home-first-row'>
                    <CardFluxoDeCaixa />
                    <CardProximosAAcabar products={stockItems} />
                    <CardCardapio />
                </div>

                <div className='home-second-row'>
                    <CardEstoque stockItems={stockItems} />
                </div>
                
            </div>

        </div>
    )
}
