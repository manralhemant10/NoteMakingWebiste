import React from 'react'
import Header from './notes/Nav'
import Home from './notes/Home'
import CreateNote from './notes/CreateNote'
import EditNote from './notes/EditNote'
import {Switch, Route} from 'react-router-dom'

export default function Notes({setIsLogin}){
    return(
        <>
        <div className="notes-page">
            <Header setIsLogin={setIsLogin}/>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/home" component={Home} />
                    <Route path="/create" component={CreateNote} />
                    <Route path="/edit/:id" component={EditNote} />
                </Switch>
        </div>
        </>
    )
}