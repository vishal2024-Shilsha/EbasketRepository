import React, { useEffect, useState } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { getBrandData,addBrandData,updateBrand ,deleteBrand} from '../slices/CategorySlice';
import './BrandModel.css';
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { FaWindowClose } from "react-icons/fa";



const BrandModel = ({setShowPopup}) => {

  const [id,setId]=useState(null);
  const [name,setName] = useState('');

  const dispatch = useDispatch();
  useEffect(()=>{
      dispatch(getBrandData());
  },[])

  const AllBrandData = useSelector((state) => state?.category?.brandData?.data?.content);

  const handleSubmit =(event) =>{
    event.preventDefault();
    if(id){
      dispatch(updateBrand({id,name}));
    }else{
      dispatch(addBrandData({name}));
    }
    setTimeout(() =>{
      dispatch(getBrandData());
    },1000)
    setName('');
    setId('');

  }
  
  const handleEditBrand =(id,name) =>{
    setId(id);
    setName(name);
  }

  const handleDeleteBrand =(id) =>{
    dispatch(deleteBrand({id}));
    setTimeout(()=>{
      dispatch(getBrandData());
    },1000)
  }

  return (
    <div className="modalBackground ml-[260px] text-black ">
        <div className="modalContainer bg-[#f5f7fb] ">
            <button onClick={() => setShowPopup(false)}><FaWindowClose className='text-2xl text-[#21216e] mr-3 ' /></button>
            <div style={{ maxHeight: '100%', overflowY: 'auto',overflowX: 'hidden' }}  className='model-contents '>
                <h2 className='mb-4 mt-1 text-center text-xl font-semibold text-[#21216e]'>{ id ? 'Edit Brand Name' : 'Add Brand Name'} </h2>
                <form className=' w-8/12 mx-auto  p-3  mb-3 bg-white rounded-lg shadow-md' onSubmit={handleSubmit}>
                  <div class="form-group">
                    <label for="formGroupExampleInput">Brand Name</label>
                    <input type="text" class="form-control w-2/3" id="formGroupExampleInput" placeholder="Brand Name" required value={name} onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div class="form-group row">
                    <div class="col-sm-10">
                      <button type="submit" class="btn btn-primary border-[#21216e] bg-[#214770] font-semibold text-white">{id ? 'Edit Brand Name' : 'Add Brand Name'}</button>
                    </div>
                  </div>
                </form>
                <div >
                <table className="table border  border-[#0e2238]  w-9/12  mx-auto">   
                    <thead>
                        <tr className='text-white  bg-[#214770]'>
                        <th className='category-name' scope="col">All Brand Data</th>
                        <th className='del' scope="col"> Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        AllBrandData?.map((data)=>(
                            <tr className=' bg-white'>
                            <td className=' text-[#214770]'>{data?.brandName}</td>
                            <td className='text-[#214770]' > 
                                <button className='text-xl flex gap-3 ' >
                                <AiFillDelete className='text-red-700' onClick={() => handleDeleteBrand(data?.brandId)} />
                                <FaEdit onClick={() => handleEditBrand(data?.brandId,data?.brandName)}/>
                                </button>
                            </td>
                            </tr>
                        ))
                        }
                        
                        
                    </tbody>
                </table>
                </div>
            </div>
        </div>
    </div>
  )
}

export default BrandModel;

