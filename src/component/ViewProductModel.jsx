import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {viewProduct} from '../slices/ProductSlice';
import './ViewProductModel.css';
import { FaWindowClose } from "react-icons/fa";

const ViewProductModel = ({setShowPopup2,productId,setProductId}) => {
    const dispatch=useDispatch();
    useEffect(() =>{
        dispatch(viewProduct({id:productId}));
    },[])

    const SingleProduct = useSelector((state) => state?.product?.productData?.data?.data)

  return (
        <div className="modalBackground ml-[260px]">
        <div className="modalContainer bg-[#f5f7fb]">
            <div>
            <button className='text-2xl mr-3 mt-2 text-[#21216e]' onClick={() => [setShowPopup2(false),setProductId('')]}><FaWindowClose/></button>
            </div>
            <div className=' model-content '>
                <h2 className='text-xl py-1'>Product Information</h2>
                <table className='table border border-black bg-white  w-1/2 mx-auto'>
                    <tr className='col'>
                        <th className='border row1 border-black' scope="row">Product Name</th>
                        <td className='border row2 border-black'>{SingleProduct?.productName}</td>
                        
                    </tr>
                    <tr className='col'>
                        <th className='border row1 border-black' scope="row">Product Description</th>
                        <td className='border row2 border-black'>{SingleProduct?.productDescription}</td>
                    </tr>
                    <tr className='col'>
                        <th className='border row1 border-black' scope="row">Price</th>
                        <td className='border row2 border-black'>{SingleProduct?.price}</td>
                    </tr>
                    <tr className='col'>
                        <th className='border row1 border-black' scope="row">Offer Price</th>
                        <td className='border row2 border-black'>{SingleProduct?.offerPrice}</td>
                    </tr>
                    <tr className='col'>
                        <th className='border row1 border-black' scope="row">Category</th>
                        <td className='border row2 border-black'>{SingleProduct?.categoryName}</td>
                    </tr>
                    <tr className='col'>
                        <th className='border row1 border-black' scope="row">Sub Category</th>
                        <td className='border row2 border-black'>{SingleProduct?.subCategoryName}</td>
                    </tr>
                    <tr className='col'>
                        <th className='border row1 border-black' scope="row">Quantity</th>
                        <td className='border row2 border-black'>{SingleProduct?.quantity}</td>
                    </tr>
                </table>
            </div>
        </div>     
        </div>  
  )
}

export default ViewProductModel