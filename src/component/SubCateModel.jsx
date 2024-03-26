import React, { useEffect, useState } from 'react'
import './SubCateModel.css'
import { useSelector,useDispatch } from 'react-redux'
import { addSubCategory,getSubCategoryData,updateSubCategory,deleteSubCategory } from '../slices/CategorySlice';
import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { FaWindowClose } from "react-icons/fa";

const SubCateModel = ({setShowPopup}) => {

  const dispatch = useDispatch();
 
  const [categoryId,setCategoryId] = useState(null)
  const [categoryName, setCategoryName] = useState('');

  const [subCategoryId,setSubCategoryId] = useState(null);

  const [subCategoryName,setSubCateName] = useState('');
  
  const Alldata = useSelector((state)=> state?.category?.content?.data?.content)
  
  useEffect(() => {
    if (Alldata && Alldata.length > 0) {
      setCategoryId(Alldata[0]?.categoryId);
      setCategoryName(Alldata[0]?.categoryName);
    } 
  }, []);
  

  console.log("subnam-->",categoryName);
  useEffect(()=>{
    dispatch(getSubCategoryData({categoryId}));
  },[categoryId])
  
  const handleSubmit = (event) => {
    event.preventDefault(); 
    if(subCategoryId){
      dispatch(updateSubCategory({subCategoryId,subCategoryName}))
    }else{
      dispatch(addSubCategory({categoryId , subCategoryName}))
    }
    setTimeout(() =>{
      dispatch(getSubCategoryData({categoryId}));
    },1000)
    // setCategoryId(null);
    setCategoryName('');
    setSubCategoryId(null);
  };

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setCategoryId(categoryId);
    // const categoryName = Alldata.find(item => item.categoryId === categoryId)?.categoryName || '';
    // console.log("namme we are testing-->",categoryName);
  };

  const subCategoryData = useSelector((state) => state?.category?.subdata?.data);
  // console.log("SubCateData ==> ",subCategoryData);


  const handleEditSubCategory=(subCategoryId,subCategoryName) =>{
    setSubCategoryId(subCategoryId);
    setSubCateName(subCategoryName);
  }
  

  const handleDeleteSubCategory = (id) =>{
    console.log("testt --> ",id)
    dispatch(deleteSubCategory({id}));
    setTimeout(()=>{
      dispatch(getSubCategoryData({categoryId}));
    },1000)
  }

  return (
    <div className="modalBackground ml-[260px] text-black ">
      <div className="modalContainer bg-[#f5f7fb]">
      <button onClick={() => setShowPopup(false)}><FaWindowClose className='text-2xl text-[#214770]' /> </button>
        <div className='model-contents'>
          <form onSubmit={handleSubmit} className=' w-2/3 mx-auto border bg-white shadow-md rounded-md p-4 mb-4'>
            <div class="form-group">
              <label for="exampleFormControlSelect1">Select Category</label>
                <select class="form-control" id="exampleFormControlSelect1"  onAct   onChange={handleCategoryChange }>
                  {Alldata?.map((item, index) => (
                    <option key={index} value={item?.categoryId}> {item?.categoryName} </option>
                  ))}
                </select>
            </div>
            <div class="form-group">
              <label for="exampleFormControlInput1">Sub-Catergory Name</label>
              <input type="name" class="form-control" required  value={subCategoryName} id="exampleFormControlInput1" onChange={(e) => setSubCateName(e.target.value)} placeholder="Sub Catergory Name"></input>
            </div>
            
            <div class="form-group row">
              <div class="col-sm-10">
                <button type="submit" class="btn btn-primary bg-[#214770] text-white font-medium">{subCategoryId ? 'Edit SubCategory' : 'Add Sub-Category' }</button>
              </div>
            </div>
          </form>
          <div>
          <table className="table border  border-[#0e2238]  w-11/12 mx-auto">   
              <thead>
                <tr className='text-white  bg-[#214770]'>
                  <th className='category-name' scope="col">Selected subcategory</th>
                  <th className='del' scope="col"> Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                  subCategoryData?.map((data)=>(
                    <tr className='text-black'>
                      <td className='text-black'>{data?.subCategoryName}</td>
                      <td className='text-[#214770]' > 
                        <button className='text-xl flex gap-3 ' >
                          <AiFillDelete className='text-red-700' onClick={() => handleDeleteSubCategory(data?.subCategoryId)} />
                          <FaEdit onClick={() => handleEditSubCategory(data?.subCategoryId,data?.subCategoryName)}/>
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

export default SubCateModel;