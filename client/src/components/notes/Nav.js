import React from 'react'
import {Link} from 'react-router-dom'
import '../../com.css'

export default function Nav({setIsLogin}) { 
    const logoutSubmit = ()=>{
        localStorage.clear()
        setIsLogin(false)
    }

    return(
        <header className="header-class">
            <div className="nav">
                <nav className="navigation-bar">
                    <Link className="nav-item" to="/">Home</Link>
                    <Link className="nav-item" to="/create">Create Note</Link>
                    <Link className="nav-item" onClick={logoutSubmit} to="/">Logout</Link>
                </nav>
            </div>
        </header>
    )
 }