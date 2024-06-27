import React, { useState } from 'react'
import './Css/Loginsignup.css'
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const LoginSignup = () => {
  const [state,setState] = useState("Login");
  const [formData,setFormData] = useState({
    username:"",
    password:"",
    email:""

  });
  // const [check,setCheck] = useState(false);
  // const handleCheckbox = (e) => {
  //   setCheck(true)
  // }
  const changeHandler = (e) => {
    setFormData({...formData,[e.target.name] : e.target.value})
  }
  const login = async()=>{
    console.log("Login function executed",formData);
    let responseData;
    await fetch('http://localhost:4000/login',{
      method:'POST',
      headers:{
        Accept:'application/form-data',
        'Content-Type':'application/json'
      },
      body:JSON.stringify(formData),
    }).then((response)=>response.json()).then((data)=>responseData=data)
    if(responseData.success){
      localStorage.setItem('auth-token',responseData.token);
      window.location.replace('/')
    }
    else{
      toast(responseData.error)
    }
  }
  const signup = async()=>{
    console.log("signup function executed",formData);
    let responseData;
    await fetch('http://localhost:4000/signup',{
      method:'POST',
      headers:{
        Accept:'application/form-data',
        'Content-Type':'application/json'
      },
      body:JSON.stringify(formData),
    }).then((response)=>response.json()).then((data)=>responseData=data)
    if(responseData.success){
      localStorage.setItem('auth-token',responseData.token);
      window.location.replace('/')
    }
    else{
      toast(responseData.error)
    }
  }

  return (
    <>
    <ToastContainer></ToastContainer>
    <div className='loginsignup'>
    
    <div className='loginsignup-container'>
      <h1>{state}</h1>
      <div className='loginsignup-fields'>
        {state==="Sign Up" ? <input type="text" name="username" placeholder="Your Name" value={formData.username} onChange={changeHandler}></input> : <></>}
        <input name="email" value={formData.email} onChange={changeHandler} type="email" placeholder="Your Email"></input>
        <input name="password" value={formData.password} onChange={changeHandler} type="password" placeholder="Your Password"></input>
      </div>
      <button onClick={()=> {state==="Sign Up" ? signup() : login()}}>
        {state==="Sign Up" ? "Register" : "Submit"}
      </button>
      {state==="Sign Up" ? <p className='loginsignup-login'>Alredy have an account? <span onClick={()=>setState("Login")}>Login here</span></p>
      : <p className='loginsignup-login'>Don't have an account? <span onClick={()=>{setState("Sign Up")}}>Register here</span></p>}
      <div className='loginsignup-agree'>
        <input type="checkbox" name="" id=""></input>
        <p>By continuing, i agree to the terms of use & privacy policy.</p>
      </div>
    </div>

    </div>
      </>
  )
}

export default LoginSignup