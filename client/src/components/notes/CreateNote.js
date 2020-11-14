import React, { useState } from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'

export default function CreateNote() { 

    const [note, setNote] = useState({
        title:'',
        content:'',
        date:''
    })

    const history = useHistory()

    const onChangeInput = e =>{
        const {name, value} = e.target
        setNote({...note, [name]:value})
    }

    const createNote = async e =>{
        e.preventDefault()
        try{    
            const token = localStorage.getItem('tokenStore')
            if(token){
                const {title, content, date} = note;
                const newNote = {
                    title,content,date
                }
                await axios.post('/api/notes', newNote,{
                    headers:{Authorization: token}
                })

                return history.push('/')
            }
        }catch(err){
            window.location.href = "/"
        }
    }


    return(
        <div className="createnote">
            <form className="createnoteform" onSubmit={createNote}>
                <input type="text" className="createnoteele" value={note.title} placeholder="Title" id="title" name="title" required onChange={onChangeInput}/>
                <textarea type="text" className="createnoteele" placeholder="Type your note here...." value={note.content} id="content" name="content" required rows="10" onChange={onChangeInput}/>
                <div className="datecreate">
                <input  type="date" className="createnoteele" id="date" name="date" required onChange={onChangeInput}/>
                </div>
                <button className="createsave" type="submit">Save</button>
            </form>
        </div>
    )
 }