import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../../public/images/logo.png'
import {userLogin} from '../slices/LoginSlice'
import { useNavigate } from 'react-router-dom';

function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  
  const dispatch= useDispatch();
  const navigate = useNavigate();
  const { loading ,error} =useSelector(state => state.auth)

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userLogin({email,password})).then((result)=>{
      console.log("result show => ",result);
      if(result.payload === 'Request failed with status code 400'){
        console.log("hello")
        console.log("--->",result.payload);
        setEmail('');
        setPassword('');
        
      }else{
        navigate('/admin');
      }
    })
    
  };

  return (
    <div className='w-full h-screen flex flex-col items-center justify-center gap-1 '>
      
      <div className='border w-96 bg-white m-auto  p-10 pt-6 shadow-xl'>
      <div className='w-32 mx-auto mb-10'>
        {/* <img className='w-full h-full' src={logo} alt=''/> */}
        <h2 className='text-3xl font-semibold'>EBasket</h2>
      </div>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <div className='flex flex-col gap-1 '>
            <label className='text-lg font-medium'>Email Address</label>
            <input className='border w-full h-10' type="email" value={email} required placeholder='Enter email' onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className='flex flex-col gap-1'>
            <label className='text-lg font-medium'>Password:</label>
            <input className='border w-full  h-10' type="password" placeholder='Enter password' required value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button className='w-full my-2 p-1 py-2 text-lg font-semibold text-white border  bg-green-600' type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
          {error && <p className="text-red-500">{error} :- Enter valid Email & Password</p>}
          
      
        </form>
      </div>
      
    </div>
  );
}

export default Login;
