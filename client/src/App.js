import React,{useState, useEffect} from 'react';
import axios from 'axios';
import Login from './components/Login';
import Notes from './components/Notes';
import { BrowserRouter } from 'react-router-dom';

function App() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(()=>{
     const checkLogin = async () => {
      const token = localStorage.getItem('tokenStore')
      if(token){
        const verified = await axios.get('/users/verify',{
          headers:{Authorization:token}
        })
        setIsLogin(verified.data)
        if(verified.data === false) return localStorage.clear()

      }else{
        setIsLogin(false)
      }
     }
     checkLogin()
  },[])


  return (
    <div className="App">
     {
      isLogin ? <BrowserRouter><Notes setIsLogin={setIsLogin}/></BrowserRouter> :<Login setIsLogin={setIsLogin}/>
     }
    </div>
  );
}

export default App;
