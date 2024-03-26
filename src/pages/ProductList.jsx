import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductData,deleteProductData} from '../slices/ProductSlice';
import ReactPaginate from 'react-paginate';
import { FaEye } from "react-icons/fa";
import { Link, } from 'react-router-dom';
import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import BrandModel from '../component/BrandModel';
import Product from '../component/Product';
import ViewProductModel from '../component/ViewProductModel';
import { toast } from 'react-toastify';

const ProductList = () => {
    const [pageNum,setPageNum] = useState(0);
    const [showPopup, setShowPopup] = useState(false);
    const [showPopup1,setShowPopup1] = useState(false);
    const [showPopup2,setShowPopup2] = useState(false);
    const [productId,setProductId] = useState(null);
    const [status,setStatus] = useState('');
    const [filter,setFilter] = useState(false)
    const dispatch=useDispatch();

    const search = useSelector((state) => state?.product?.searchData)
    const productData = useSelector((state) => state?.product?.subData?.data?.content);
    const totalPages = useSelector((state) => state?.product?.subData?.data?.totalPages)
    
    useEffect(() =>{
        dispatch(getProductData({number : pageNum ,search: search,status:status,filter:filter}))
    },[search,status])

    const handlePageClick = (pageNumber) => {
        console.log("-->",pageNumber.selected)
        setPageNum(pageNumber.selected);
        dispatch(getProductData({ number: pageNumber.selected ,search: search,status:status,filter:filter}));
    };

    const handleClickDelete = (id) =>{
        dispatch(deleteProductData({id}))
        setTimeout(() =>{
            dispatch(getProductData({ number: pageNum , search: search,status:status,filter:filter}));
        },1000)
    }

    const handleEdit=(id) =>{
        setShowPopup1(true)
        setProductId(id)
    }

  return (
    <div className=' ml-[260px] h-full bg-[#f5f7fb] '>
        {showPopup && <BrandModel setShowPopup={setShowPopup} />}
        {showPopup1 && <Product setShowPopup1={setShowPopup1} productId={productId} setProductId={setProductId} pageNum={pageNum} search={search} status={status} filter={filter} />}
        {showPopup2 && <ViewProductModel setShowPopup2 = {setShowPopup2} productId={productId} setProductId={setProductId} /> }
        <div className=' w-full '>
            <div className='ml-3 mb-2 mt-1 flex gap-4'>
                <button className='border p-2 rounded-md bg-[#214770] text-white hover:bg-[#627d99]' onClick={() => setShowPopup1(true)}>Add Product Item</button>
                <button className='border p-2 rounded-md bg-[#214770] text-white hover:bg-[#627d99]' onClick={() => setShowPopup(true)}>Add Brand Name</button>
                <div className=' box-border my-auto mt-1 font-medium  '>
                    <label className='text-xl text-[#214770] font-bold' htmlFor='status'>Status</label>
                    <select id='status' className='border mx-2 px-3 py-1 bg-[#214770] rounded-md text-white' onChange={(e) => setStatus(e.target.value)}>
                        <option value=''>All</option>
                        <option value='false'>Active</option>
                        <option value='true'>Inactive</option>
                    </select>
                </div>
            </div>
            <div className=' h-[29rem] 2xl:h-full '>
                <table className="table border   border-[#0e2238]  w-[97%]  mx-auto">
                <thead>
                <tr className='text-white bg-[#214770]'>
                    <th scope="col">Product Name</th>
                    <th scope="col">Product Description</th>
                    <th scope="col">Price</th>
                    <th scope="col">Offer Price</th>
                    <th scope="col"> Category </th>
                    <th scope='col'>Sub Category </th>
                    <th scope='col'>Quantity</th>
                    <th scope='col'>View</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {productData?.map((data,index) => (
                    <tr key={index} className={data?.quantity < 10 ? 'color' : ''}>
                    <td>{data?.productName}</td>
                    <td>{data?.productDescription}</td>
                    <td className='text-center'>{data?.price}</td>
                    <td className='text-center'>{data?.offerPrice}</td>
                    <td>{data?.categoryName}</td>
                    <td>{data?.subCategoryName} </td>
                    <td className='text-center'>{data?.quantity}</td>
                    <td className={data?.quantity < 10 ? 'color text-2xl text-center pl-3' : 'text-[#214770] text-2xl text-center pl-3'} onClick={() => [setShowPopup2(true) , setProductId(data?.id) ]} > <Link to=''><FaEye /></Link></td>
                    <td className={data?.quantity < 10 ? 'color' : 'text-[#214770]'} > 
                      <button className='text-xl flex gap-3 ' >
                        <AiFillDelete className={data?.quantity < 10 ? 'color' : 'text-red-700'} onClick={() => handleClickDelete(data?.id)} />
                        <FaEdit  onClick={() => handleEdit(data?.id)} />
                      </button>
                     </td>
                    </tr>
                ))}
                </tbody>
                </table>
            </div>
            <div className='text-center'>
                <ReactPaginate className='flex gap-3 border-2 m- bg-[#214770] text-white p-2 justify-center'
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={4}
                pageCount={totalPages}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
                activeClassName='active'
            />
            </div>
        </div>
    </div>
  )
}

export default ProductList


//onClick={() => [setId(data.id) ,setShowPopup(true)]} 







// import React, { useState } from "react";

// function LoginForm() {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: ""
//   });

//   const [errors, setErrors] = useState({});
//   const [submitted, setSubmitted] = useState(false);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;

//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   const validateForm = () => {
//     let isValid = true;
//     const newErrors = {};

//     // Validate email
//     if (!formData.email) {
//       newErrors.email = "Email is required";
//       isValid = false;
//     }

//     // Validate password
//     if (!formData.password) {
//       newErrors.password = "Password is required";
//       isValid = false;
//     }

//     setErrors(newErrors);
//     return isValid;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (validateForm()) {
//       // Form is valid, you can submit or process the data here
//       console.log("Form data:", formData);
//       setSubmitted(true); // Set a submitted flag
//     } else {
//       // Form is not valid, display error messages
//     }
//   };

//   const isFormValid = Object.keys(errors).length === 0;

//   return (
//     <div>
//       <h2>Login</h2>
//       {submitted ? (
//         <div className="success-message">Login successful!</div>
//       ) : (
//         <form onSubmit={handleSubmit}>
//           <div>
//             <label>Email:</label>
//             <input
//               type="text"
//               name="email"
//               value={formData.email}
//               onChange={handleInputChange}
//             />
//             {errors.email && <div className="error">{errors.email}</div>}
//           </div>

//           <div>
//             <label>Password:</label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleInputChange}
//             />
//             {errors.password && <div className="error">{errors.password}</div>}
//           </div>

//           <button type="submit" disabled={!isFormValid}>
//             Login
//           </button>
//         </form>
//       )}
//     </div>
//   );
// }

// export default LoginForm;