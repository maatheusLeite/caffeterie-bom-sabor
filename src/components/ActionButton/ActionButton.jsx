import './ActionButton.css'

import React from 'react'
import { Link } from 'react-router-dom'

export default function ActionButton(props) {
    return (
        <Link className={props.className}> {props.title} </Link>
    )
}
