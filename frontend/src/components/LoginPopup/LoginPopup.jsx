import React, { useContext, useEffect, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { storeContext } from '../../context/storeContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const LoginPopup = ({setLoginPopup}) => {

    const {url, token, setToken}= useContext(storeContext);
    const[currState, setCurrState]=useState('LogIn')
    const[data, setData]=useState({
        username: '',
        email: '',
        password: '',
    });

    const onChangeHandler=(event)=>{
        const name=event.target.name;
        const value=event.target.value;

        setData(data => ({ ...data, [name]: value}))

    }


    const onLogin=async(event)=>{
        event.preventDefault();
        let newUrl=url;
        if(currState === 'LogIn'){
            newUrl +=`/api/user/login`
        } else if(currState === 'SignUp'){
            newUrl +=`/api/user/register`
        }

        const response= await axios.post(newUrl, data);
        if(response.data.success){
            setToken(response.data.token);
            toast.success('Welcome to Tomato App! Dive through your favs ');
            localStorage.setItem('token', response.data.token);//verify sign in-console application
            setLoginPopup(false);

        } else {
            // alert(response.data.message);
            toast.error(response.data.message);
        }

    }

    // useEffect(()=>{
    //     console.log(data);
    // }, [data]);

  return (
    <div className='login-popup'>
        <form onSubmit={onLogin} className="login-popup-container">
            <div className="login-popup-title">
                <h2>{currState}</h2>
                <img onClick={() => setLoginPopup(false)} src={assets.cross_icon} alt="close" />
            </div>
            <div className="login-popup-inputs">
                { currState === 'LogIn'
                ? '' 
                : <input onChange={onChangeHandler} value={data.username}
                type="text" name='username' placeholder='Your Good Name' required /> 
                }
                <input onChange={onChangeHandler} value={data.email}
                type="email" name='email' placeholder='Enter your email' required />
                <input onChange={onChangeHandler} value={data.password}
                 type="password" name='password' placeholder='your password' required />
            </div>
            
            <div className="login-popup-condition">
                <input type="checkbox" required/>
                <p>By continuing, I agree to the Terms of use and Privacy Policy</p>
            </div>
            <button type='submit'>{currState === 'SignUp'? 'Create a New Account' : 'LogIn'}</button>
            {
                currState === 'LogIn'
                ? <p>Create a new account? <button onClick={()=>setCurrState('SignUp')}>SignUp</button></p>
                : <p>Already Registered? <button onClick={()=>setCurrState('LogIn')}>LogIn</button></p>
            }
            
        </form>
    </div>
  )
}

export default LoginPopup