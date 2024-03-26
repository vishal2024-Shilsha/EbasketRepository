import React, { useEffect, useState } from 'react';
import './Product.css';
import { addProduct,updateProduct,getProductData } from '../slices/ProductSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getBrandData, getCategoryData, getSubCategoryData } from '../slices/CategorySlice';
import { FaWindowClose } from "react-icons/fa";

const Product = ({setShowPopup1,productId,setProductId,pageNum,search,status,filter}) => {

  const [productNum,setProductNum] = useState(null);
  const allData = useSelector((state) => state?.product?.subData?.data?.content)

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const brandData = useSelector((state) => state?.category?.brandData?.data?.content);
  const categoryData = useSelector((state) => state?.category?.content?.data?.content);
  const subCategoryData = useSelector((state) => state?.category?.subdata?.data);


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBrandData());
    dispatch(getCategoryData());
    setProductNum(productId)
  }, []);

  useEffect(() => {
    if(productNum){
      const filteredProduct = allData?.find((data) => data.id === productId);
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

  useEffect(() => {
    if (formData.categoryId) {
      dispatch(getSubCategoryData({ categoryId: formData.categoryId }));
    }
  }, [formData.categoryId]);

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const validateForm = (formData) => {
    const newErrors = {};

    if (!formData.productName) {
      newErrors.productName = "Product Name is required";
    }

    if (!formData.price) {
      newErrors.price = "Price is required";
    }

    if (!formData.quantity) {
      newErrors.quantity = "quantity is required";
    }

    if (!formData.categoryId) {
      newErrors.categoryId = "Category Name is required";
    }

    if (!formData.subCategoryId) {
      newErrors.subCategoryId = "SubCategory Name is required";
    }

    if (!formData.brandId) {
      newErrors.brandId = "Brand Name is required";
    }

    if (!formData.productDescription) {
      newErrors.productDescription = "Product Description is required";
    }
    return newErrors;
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   setErrors(validateForm(formData))
  //   console.log("submit",formData)
  //   if (Object.keys(errors).length === 0 && submitted) {
  //     console.log("==->",formData);
  //     if(productNum){
  //       dispatch(updateProduct({productNum,formData}));
  //     }else{
  //       dispatch(addProduct(formData));  
  //     }
  //     setTimeout(()=>{
  //       dispatch(getProductData({number : pageNum ,search: search,status:status,filter:filter}))
  //       setShowPopup1(false);
  //       setProductNum('');
  //     },300)
  //     setFormData({ 
  //       productName: "",
  //       productDescription: "",
  //       offerPrice: "",
  //       price: "",
  //       discountPercentage: 0,
  //       categoryId: "",
  //       subCategoryId: "",
  //       quantity: "",
  //       brandId: ""
  //     });  
  //   }
  //   setSubmitted(true);
    
  // };


  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(validateForm(formData));
    console.log("submit", formData);
  
    if (!submitted && Object.keys(errors).length === 0) {
      console.log("==->", formData);
      if (productNum) {
        dispatch(updateProduct({ productNum, formData }));
      } else {
        dispatch(addProduct(formData));
      }
      
      setTimeout(() => {
        dispatch(
          getProductData({
            number: pageNum,
            search: search,
            status: status,
            filter: filter,
          })
        );
        setShowPopup1(false);
        setProductNum("");
      }, 300);
  
      setFormData({
        productName: "",
        productDescription: "",
        offerPrice: "",
        price: "",
        discountPercentage: 0,
        categoryId: "",
        subCategoryId: "",
        quantity: "",
        brandId: "",
      });
    }
  
    // Now, set submitted to true after the conditional block
    setSubmitted(true);
  };
  


  const handleClose = () =>{
    setProductNum('');
    setProductId(null)
    setShowPopup1(false);
  }


  return (
    <div className='modalBackground ml-[260px]'>
      <div className='modalContainer ml- bg-[#f5f7fb] h-full py-2 pb-20'>
        <button onClick={handleClose}><FaWindowClose className='text-2xl text-[#21216e] mr-3 mt-1' /></button>
        <h2 className='mb-3 text-center text-xl  w-full font-semibold text-[#21216e]'>Product Management Form</h2>
        <div className='w-9/12  model-contents shadow-md  rounded-lg bg-white p-4 mb-16 mx-auto'>
          { (
            <form className='w-full pl-3 ' class="needs-validation" onSubmit={handleSubmit}>
                  <div class="form-row" >
                    <div class="form-group col-md-6">
                      <label for="inputEmail4" className=''>Product Name</label>
                      <input type="text" class="form-control" id="inputEmail4" name='productName'  placeholder="Product Name" value={formData.productName}
                        onChange={handleInputChange}   />
                      <div className="error">{errors.productName}</div>
                    </div>
                    <div class="form-group col-md-6">
                      <label for="inputPassword4">Price</label>
                      <input type="number" class="form-control" id="inputPassword4" name='price' placeholder="Price" value={formData.price} onChange={handleInputChange} min="1" step="1" />
                      <div className="error">{errors.price}</div>
                    
                    </div>
                  </div>
                  
                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <label for="inputAddress">Product Description</label>
                      <input type="text" class="form-control alphabetic-input" id="inputAddress" name='productDescription' placeholder="Product Description" value={formData.productDescription} onChange={handleInputChange} />
                      <div className="error">{errors.productDescription}</div>
                    
                    </div>
                    <div class="form-group col-md-6">
                      <label for="inputAddress2">Discount</label>
                      <input type="number" class="form-control" id="inputAddress2" name='discountPercentage' placeholder="Discount" min="0" step="1" max="100" value={formData.discountPercentage} onChange={handleInputChange} />
                    
                    </div>
                  </div>
                  
                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <label for="inputCity">Category Name</label>
                      <select id="inputCity" name='categoryId' class="form-control"  onChange={handleInputChange} >
                        <option  value={formData.categoryId} >select</option>
                        {
                          categoryData?.map((data,index) =>(
                            <option key={index} selected={data?.categoryId === formData?.categoryId} value={data?.categoryId}>{data?.categoryName}</option>
                          ))
                        }
                      </select>
                      <div className="error">{errors.categoryId}</div>

                    </div>
                    <div class="form-group col-md-6">
                      <label for="inputState">Sub Category Name</label>
                      <select id="inputState" name='subCategoryId' class="form-control" onChange={handleInputChange}>
                        <option selected value={formData.subCategoryId} >select</option>
                        {
                          subCategoryData?.map((item,index) =>{
                            return <option key={index} selected={item?.subCategoryId === formData?.subCategoryId} value={item?.subCategoryId}>{item?.subCategoryName}</option>
                          })
                        }
                      </select>
                      <div className="error">{errors.subCategoryId}</div>

                    </div>
                  </div>
                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <label for="quantity">Quantity</label>
                      <input type="number" class="form-control" id="quantity" name="quantity" placeholder="Enter quantity" min="0" step="1"   value={formData.quantity} onChange={handleInputChange}  />
                      <div className="error">{errors.quantity}</div>
                    
                    </div>
                    <div class="form-group col-md-6">
                      <label for="brandname">Brand Name</label>
                      <select id="brandname" name='brandId' class="form-control" onChange={handleInputChange}>
                        <option selected value=''>select</option>
                        {
                          brandData?.map((item,index) =>{
                            return <option key={index} selected={item?.brandId === formData?.brandId} value={item?.brandId}>{item?.brandName}</option>
                          })
                        }
                      </select>
                      <div className="error">{errors.brandId}</div>
                    </div>
                  </div>
                  <div className='-3 '>
                    <button type="submit"  class="btn buttun btn-primary bg-[#2e2e88]">{productNum ? 'Edit Product' : 'Add Product'}</button>
                  </div>
            </form>
          )}
        </div>
      </div>
    </div>
    
  );
}

export default Product;


