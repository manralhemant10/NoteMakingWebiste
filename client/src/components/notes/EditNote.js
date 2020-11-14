import React, { useState ,useEffect} from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'

export default function EditNote({match}) { 

    const [note, setNote] = useState({
        title:'title',
        content:'content',
        date:'20-1-1',
        id: ''
    })

    const history = useHistory()

    useEffect(()=>{
        const getNote = async()=>{
            const token = localStorage.getItem('tokenStore')
            if(match.params.id){
                const res = await axios.get(`/api/notes/${match.params.id}`,{
                    headers:{Authorization:token}
                })
                setNote({
                    title: res.data.title,
                    content: res.data.content,
                    date: new Date(res.data.date).toLocaleDateString(),
                    id: res.data._id
                })
            }
        }
        getNote()
    },[match.params.id])

    const onChangeInput = e =>{
        const {name, value} = e.target
        setNote({...note, [name]:value})
    }

    const editNote = async e =>{
        e.preventDefault()
        try{    
            const token = localStorage.getItem('tokenStore')
            if(token){
                const {title, content, date, id} = note;
                const newNote = {
                    title,content,date
                }
                await axios.put(`/api/notes/${id}`, newNote,{
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
            <form className="createnoteform" onSubmit={editNote}>
                    <input type="text" value={note.title} className="editnoteele" id="title" name="title" required onChange={onChangeInput}/>
                    <textarea type="text" value={note.content} className="editnoteele" id="content" name="content" required rows="10" onChange={onChangeInput}/>
                    <div className="datecreate">
                        <input type="date" id="date" name="date" className="editnoteele" required onChange={onChangeInput}/>
                    </div>
                <button className="createsave" type="submit">Save</button>
            </form>
        </div>
    )
 }