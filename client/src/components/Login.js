import React, {useState} from 'react'
import axios from 'axios';


export default function Login({setIsLogin}){
    const [user, setUser] = useState({
        name: '',
        email:'',
        password:''
    })
    const [reg, setReg] = useState(0)

    const [err, setErr] = useState('');
    const onChangeInput = e=>{
        const {name, value}=e.target;
        setUser({...user, [name]:value})
        setErr('')
    }

    const registerSubmit = async e =>{
        e.preventDefault()
        try{
            const res = await axios.post('/users/register',{
                username: user.name,
                email:user.email,
                password:user.password
            })
            setUser({name:'',email:'',password:''})
            setErr(res.data.msg)
        }catch(err){
            err.response.data.msg && setErr(err.response.data.msg)
        }
    }

    const loginSubmit = async e =>{
        
        e.preventDefault()
        try{
            const res = await axios.post('/users/login',{
                email:user.email,
                password:user.password
            })
            setUser({name:'',email:'',password:''})
            localStorage.setItem('tokenStore', res.data.token)
            setIsLogin(true)
        }catch(err){
            err.response.data.msg && setErr(err.response.data.msg)
        }
    }

   const showReg=()=> setReg(1)

   const showlog=()=> setReg(0)
   

    return(
        <>
        {reg?(<h1 className="logh2">Register</h1>):(<h1 className="logh2">Login</h1>)}
        {
        reg?(
            <div className="login" id="regdiv">
                    <form onSubmit={registerSubmit} className="login-form">
                        <input type="text" name="name" id="register-name"
                            placeholder="User Name" required value={user.name}  onChange={onChangeInput}/>
                        <input type="email" name="email" id="register-email"
                            placeholder="Email" required value={user.email}  onChange={onChangeInput}/>
                        <input type="password" name="password" id="register-password"
                            placeholder="Password" required value={user.password} autoComplete="true"  onChange={onChangeInput}/>
                        <button className="btnlog" type="submit">Register</button>
                            <p style={{color:"#06a1cc"}}>You have an account?<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span id="sp" onClick={showlog}>Login Now</span></p>
                        <h3 style={{color: "#06a1cc"}}>{err}</h3>
                    </form>
            </div>
        )
        :
        (
            <div className="login" id="logindiv">
                    <form onSubmit={loginSubmit} className="login-form">
                        <input type="email" name="email" id="login-email"
                            placeholder="Email" required value={user.email} onChange={onChangeInput}/>
                        <input type="password" name="password" id="login-password"
                            placeholder="Password" required value={user.password} autoComplete="true"  onChange={onChangeInput}/>
                        <button className="btnlog" type="submit">Login</button>
                            <p style={{color:"#06a1cc"}}>You don't have an account?<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span id="sp" onClick={showReg}>Register Now </span></p>
                        <h3 style={{color: "#06a1cc"}}>{err}</h3>
                    </form>
            </div>
        )
        }
        
        </>
    )
}