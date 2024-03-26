import React, { useEffect, useState } from 'react'
import './Category.css';
import { useDispatch, useSelector } from 'react-redux';
import {getCategoryData} from '../slices/CategorySlice';
import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import {addCategory , updateCategory ,deleteCategory} from '../slices/CategorySlice'
import SubCateModel from '../component/SubCateModel';


const Category = () => {
  const dispatch = useDispatch();
 
  useEffect(() => {
    dispatch(getCategoryData())
  },[])

  const Alldata = useSelector((state)=> state?.category?.content?.data?.content)
  
  const [categoryName, setName ] = useState('');
  const [categoryDetails, setCategoryDetail ] = useState('');
  const [editingCategoryId, setEditingCategoryId] = useState(null);

  const handleSubmitData = (e) =>{
    e.preventDefault();
    if(editingCategoryId){
      dispatch(updateCategory({editingCategoryId,categoryName,categoryDetails}))
    }else{
      console.log("add-->",categoryDetails);
      console.log("add-->",categoryName)
      dispatch(addCategory({categoryName,categoryDetails}))
    }
    setTimeout(() => {
      dispatch(getCategoryData())
    }, 1000);

    setCategoryDetail('');
    setName('');
    setEditingCategoryId(null);

  };
  
  const handleEditCategory = (categoryId, categoryName, categoryDetails) => {
    setEditingCategoryId(categoryId);
    setName(categoryName);
    setCategoryDetail(categoryDetails);
  };
  
  const handleDeleteCategory = (id)=>{
    dispatch(deleteCategory({id}));
    
    setTimeout(() => {
      dispatch(getCategoryData())
    }, 1000);

  }

  const [showPopup,setShowPopup] = useState(false)
  return (
    <div className='h-full overflow-hidden text-black  ml-[260px] bg-[#f5f7fb] py-4'>
      {showPopup && ( 
         <SubCateModel
          setShowPopup={setShowPopup}
        /> 
       )}
      <div className=' w-8/12 outer shadow-md rounded-lg px-4 bg-white text-blue-900'>
        <h1 className='text-center pb-2 text-xl font-semibold text-blue-900'>{editingCategoryId ? 'Edit Category' : 'Add Category(+)'}</h1>
        <form className=' w-11/12 pl-1 ' onSubmit={handleSubmitData}>
          <div class="form-group">
            <label for="exampleFormControlInput1">Catergory Name</label>
            <input type="name" class="form-control" required value={categoryName} onChange={(e)=> setName(e.target.value) } id="exampleFormControlInput1" placeholder="Catergory Name"></input>
          </div>
          
          <div class="form-group">
            <label for="exampleFormControlTextarea1">Category Description</label>
            <textarea class="form-control" value={categoryDetails} onChange={(e) => setCategoryDetail(e.target.value) } id="exampleFormControlTextarea1" rows="3"></textarea>
          </div>
          <div className='flex flex-row gap-5'>
            <div className='text-base '>
              <button className='btn btn-primary border p-2 rounded-md bg-[#214770] text-white font-medium' onClick={() => setShowPopup(true)}>Add SubCategory</button>  
            </div>
            <div class="form-group row">
              <div class="col-sm-10">
                <button type="submit" class="btn btn-primary" className='btn btn-primary bg-[#214770] text-white text-lg font-medium'>{editingCategoryId ? 'Update' : 'Submit'}</button>
              </div>
            </div>
          </div>
          
          
        </form>

      </div>
      <div className='mt-4'>
        <table className="table border  border-[#0e2238]  w-11/12 mx-auto">   
            <thead>
              <tr className='text-white  bg-[#214770]'>
                <th className='category-id ' scope="col">Category Id</th>
                <th className='category-name' scope="col">Category Name</th>
                <th className='category-names' scope="col">Description</th>
                <th className='del' scope="col"> Actions</th>

              </tr>
            </thead>
            <tbody>
              {
                Alldata?.map((data)=>(
                  <tr>
                    <td className=''>{data?.categoryId}</td>
                    <td>{data?.categoryName}</td>
                    <td>{data?.description}</td>
                    <td className='text-[#214770]' > 
                      <button className='text-xl flex gap-3 ' >
                        <AiFillDelete className='text-red-700' onClick={() => handleDeleteCategory(data?.categoryId)} />
                        <FaEdit onClick={() => handleEditCategory(data?.categoryId, data?.categoryName, data?.description)}/>
                      </button>
                    </td>
                  </tr>
                ))
              }
              
              
            </tbody>
        </table>
      </div>
    </div>
  )
}

export default Category;