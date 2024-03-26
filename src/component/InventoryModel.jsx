import React, { useEffect, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux';
import {updateProduct,getProductData} from '../slices/ProductSlice';

const InventoryModel = ({setShowPopup,productId,pageNum,search,status,filter}) => {
    console.log("--==> ,",productId)
    const [productNum,setProductNum] = useState(null);
    const allData = useSelector((state) => state?.product?.subData?.data?.content)
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        productName: "",
        productDescription: "",
        offerPrice: "",
        price: "", 
        discountPercentage: 0,
        categoryId: "",
        subCategoryId: "",
        quantity: "",
        brandId: ""
    });

    useEffect(() =>{
        setProductNum(productId)
    },[])

    useEffect(() =>{
        if(productNum){
            const filteredProduct = allData?.find((data) => data.id === productId);
            // console.log("data",filteredProduct)
            if(filteredProduct){
            setFormData({
            productName: filteredProduct.productName,
            productDescription: filteredProduct.productDescription,
            offerPrice: filteredProduct.offerPrice,
            price: filteredProduct.price, 
            discountPercentage: filteredProduct.discountPercentage,
            categoryId: filteredProduct.categoryId,
            subCategoryId: filteredProduct.subCategoryId,
            quantity: filteredProduct.quantity,
            brandId: filteredProduct.brandId
            });
            }
        }
    },[productNum])

    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(updateProduct({productNum,formData}));
        console.log("Form -tes ->" ,formData);
        setFormData({ 
            productName: "",
            productDescription: "",
            offerPrice: "",
            price: "",
            discountPercentage: 0,
            categoryId: "",
            subCategoryId: "",
            quantity: "",
            brandId: ""
        });  
        setProductNum('');
        setTimeout(()=>{
            dispatch(getProductData({ number: pageNum , search: search,status:status,filter:filter}));
            setShowPopup(false);
        },500)    
    }
  return (
    <div className='modalBackground ml-[260px]'>
        <div className='modalContainer bg-[#f5f7fb] p-4'>
        <button className=' p-1' onClick={() => [setShowPopup(false)]}>Close</button>
            <div className='mode w-full h-screen '>
                <h2 className='text-center text-xl text-[#0e2238]'>Product Quantity Form</h2>
                <form className='flex flex-col gap-10  bg-white rounded-md w-7/12 mx-auto my-10 p-10 text-[#1e3c5c]' onSubmit={submitHandler}>
                    <div className='flex flex-col gap-2'>
                        <label className='text-xl '>Quantity</label>
                        <input type='number' min='0' placeholder='0' className='border p-1 w-80' value={formData.quantity} onChange={(e) => setFormData(prev => ({...prev, quantity : e.target.value}))}></input>
                    </div>
                    <button className='border w-32 p-2 text-lg bg-[#1f4670] rounded-md text-white'>Submit</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default InventoryModel