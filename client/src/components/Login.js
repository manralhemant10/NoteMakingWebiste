import React, {useState} from 'react'
import axios from 'axios';


export default function Login({setIsLogin}){
    const [user, setUser] = useState({
        name: '',
        email:'',
        password:''
    })

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


   const showreg=()=>{
   
        document.getElementById("regdiv").style.visibility="visible";
        document.getElementById("regdiv").style.opacity=1;
        document.getElementById("logindiv").style.visibility="hidden";
        document.getElementById("logindiv").style.opacity=0;

   }
   const showlog=()=>{ 
        document.getElementById("regdiv").style.visibility="hidden";
        document.getElementById("regdiv").style.opacity=0;
        document.getElementById("logindiv").style.visibility="visible";
        document.getElementById("logindiv").style.opacity=1;
   }
   

    return(
        <section className="login-page">
            <div className="login" id="logindiv">
                <h3 className="logh2">Login</h3>
                <form onSubmit={loginSubmit} className="login-form">
                    <table className="tableclass">
                    <tr className="trclass">
                        <td><input type="email" name="email" id="login-email"
                        placeholder="Email" required value={user.email} onChange={onChangeInput}/></td>
                    </tr>
                    <tr className="trclass">
                        <td><input type="password" name="password" id="login-password"
                        placeholder="Password" required value={user.password} autoComplete="true"  onChange={onChangeInput}/></td>
                    </tr>
                    <tr className="trclass">
                        <td>
                            <button className="btnlog" type="submit">Login</button>
                            </td>
                    </tr>
                        <p style={{color:"#06a1cc"}}>You don't have an account?
                            <span id="sp" onClick={showreg}>Register Now</span>
                        </p>
                        <h3 style={{color: "#06a1cc"}}>{err}</h3>
                    </table>
                </form>
            </div>
            <div className="register" id="regdiv" style={{visibility:"hidden",opacity:0}}>
                <h3  className="logh2">Register</h3>
                    <form onSubmit={registerSubmit} className="reg-form">
                        <table className="tableclass">
                            <tr className="trclass">
                                <td>
                                    <input type="text" name="name" id="register-name"
                                    placeholder="User Name" required value={user.name}  onChange={onChangeInput}/>
                                </td>
                            </tr>
                            <tr className="trclass"> 
                                <td>
                                    <input type="email" name="email" id="register-email"
                                    placeholder="Email" required value={user.email}  onChange={onChangeInput}/>
                                </td>
                            </tr>
                            <tr className="trclass">
                                <td>
                                    <input type="password" name="password" id="register-password"
                                    placeholder="Password" required value={user.password} autoComplete="true"  onChange={onChangeInput}/>
                                </td>
                            </tr>
                            <tr className="trclass">
                                <td>
                                    <button class="btnlog" type="submit">Register</button>
                                </td>
                            </tr>
                            <p style={{color:"#06a1cc"}}>You have an account?
                                <span id="sp" onClick={showlog}>Login Now</span>
                            </p>
                            <h3 style={{color: "#06a1cc"}}>{err}</h3>
                        </table>
                    </form>
                </div>
        </section>
    )
}