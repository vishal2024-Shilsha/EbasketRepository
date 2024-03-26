import React, { useEffect, useState } from 'react'
import 
 {BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch}
 from 'react-icons/bs'

import './Header.css';
import { useDispatch } from 'react-redux';
import {searchData} from './slices/ProductSlice';

function Header() {

  const [data,setData] = useState('');

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(searchData(data));
  },[data])
  return (
    <header className=' h-16 sticky ml-[260px] shadow-sm flex flex-row'>
      <div className='w-[95%] mx-auto h-full flex flex-row justify-between px-3 items-center'>
        
          <div className='border bg-[#f5f7fb] box-border rounded-3xl border-blue-900 h-10 p-1 text-[#0e2238] flex flex-row justify-between items-center'>
            <input className='input-field placeholder-blue-900 px-1 bg-[#f5f7fb]' onChange={(e) => setData(e.target.value)}  type='text' placeholder='Search'></input>
            <BsSearch  className='icon mx-1 text-blue-900'/>
          </div>
          <div className='flex flex-row gap-4'>
            <BsFillBellFill className='text-xl text-blue-900'/>
            <BsFillEnvelopeFill className='text-xl text-blue-900'/>
            <BsPersonCircle className='text-xl text-blue-900'/> 
          </div> 
           
        
      </div>

      
    </header>
  )
}

export default Header