import React, { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { getData } from "../slices/UserSlice";
import './ViewModel.css';
import { FaWindowClose } from "react-icons/fa";

const ViewModel = ({getId,setShowPopup}) => {
  //  console.log("sec",getId);
  const dispatch = useDispatch();
  
  useEffect(()=>{
    dispatch(getData({id:getId}))
  },[getId])

  const userdata = useSelector((state) => state?.user?.TempData?.data);
  // console.log(userdata);
  //console.log(userdata?.id)

  return (
    <div className="modalBackground ml-[260px]">

      <div className="modalContainer bg-[#f5f7fb]">
        <div>
        <button className='text-2xl  text-[#21216e] mr-3 mt-2' onClick={() => setShowPopup(false)}><FaWindowClose /></button>
        </div>
        <div className=' model-content text-center text-[#21216e] '>
          <h2 className='text-xl p-2 text-[#21216e]'>User Information Details </h2>
          <table className='table border border-black bg-white  w-1/2 mx-auto'>
            <tbody>
              <tr className='col'>
                <th className='border row1 border-black' scope="row">UserId</th>
                <td className='border row2 border-black'>{userdata?.userId}</td>   
              </tr>  
              <tr className='col'>
                <th className='border row1 border-black' scope="row">First Name </th>
                <td className='border row2 border-black'>{userdata?.firstName}</td>
              </tr>
              <tr className='col'>
                <th className='border row1 border-black' scope="row">Last Name </th>
                <td className='border row2 border-black'>{userdata?.lastName}</td>
              </tr>
              <tr className='col'>
                <th className='border row1 border-black' scope="row">Email</th>
                <td className='border row2 border-black'>{userdata?.email}</td>
              </tr>
              <tr className='col'>
                <th className='border row1 border-black' scope="row"> MobileNo. </th>
                <td className='border row2 border-black'>{userdata?.mobileNo}</td>
              </tr>
            </tbody>
          </table>
        </div>
        
      </div>     
    </div>
  )
}

export default ViewModel