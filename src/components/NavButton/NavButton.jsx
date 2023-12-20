import './NavButton.css'

import React from 'react'
import { Link } from 'react-router-dom'

export default function NavButton(props) {
    return (
        <Link className={props.className} to={props.goTo}> {props.title} </Link>
    )
}
