import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { AlgoContext } from '../context/AlgoContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const Login = () => {

  const [currentState, setCurrentState] = useState('Login');
  const { token, setToken, navigate, backendUrl } = useContext(AlgoContext);

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  // prevents page from reloading when we submit form
  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (currentState === 'Sign up') {
        const response = await axios.post(backendUrl + '/api/user/register', {
          name,
          email,
          password
        });
        if(response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token',response.data.token);
        } else {
           toast.error(response.data.message);
        }
      } else {
        // login api
        const response = await axios.post(backendUrl + '/api/user/login', {email,password});
        if(response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token',response.data.token);
        } else {
          toast.error(response.data.message);
        }
      } 
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  useEffect(()=> {
    if(token) {
      navigate('/');
    }
  },[token]) // whenever token is updated, this function will execute


  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>
      {currentState === 'Login' ? '' : <input onChange={(e) => setName(e.target.value)} type="text" className='w-full px-3 py-2 border border-gray-800' placeholder='Name' required />}
      <input onChange={(e) => setEmail(e.target.value)} type="email" className='w-full px-3 py-2 border border-gray-800' placeholder='Email' required />
      <input onChange={(e) => setPassword(e.target.value)} type="password" className='w-full px-3 py-2 border border-gray-800' placeholder='Password' required />
      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p className='cursor-pointer'>Forgot your password?</p>
        {
          currentState === 'Login'
            ? <p onClick={() => setCurrentState('Sign up')} className='cursor-pointer'>Create account</p>
            : <p onClick={() => setCurrentState('Login')} className='cursor-pointer'>Login</p>
        }
      </div>
      <button className='bg-pink-400 text-white font-light px-8 py-2 mt-4'>{currentState === 'Login' ? 'Sign In' : 'Sign Up'}</button>
    </form>
  )
}

export default Login
