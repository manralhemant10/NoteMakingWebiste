import React from 'react'
import { NavLink} from 'react-router-dom'
import '../../com.css'

export default function Nav({setIsLogin}) { 
    
    const logoutSubmit = ()=>{
        localStorage.clear()
        setIsLogin(false)
    }

    return(
            <div className="nav">
                <nav className="navigation-bar">
                    <NavLink  activeClassName="activenav" className="nav-item" to="/home">Home</NavLink>
                    <NavLink  activeClassName="activenav" className="nav-item" to="/create">Create Note</NavLink>
                    <NavLink  exact className="nav-item" onClick={logoutSubmit} to="/">Logout</NavLink>
                </nav>
            </div>
    )
 }