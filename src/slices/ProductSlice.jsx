import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

// const URL="https://8900-2405-201-4041-c80c-50e0-e069-5fb3-bc8.ngrok-free.app"

const URL = import.meta.env.VITE_APP_CIMB_PROXY_API_BASE;



export const addProduct = createAsyncThunk(
    'addProduct',async(formData) =>{
        try{
            console.log("data",formData);
            const data = await axios.post(`${URL}/product/addProduct`,formData);
            toast.success("Product Added Sucessfully");
            return data;
        }catch(error){
            console.log("AddProduct Error ",error);
            toast.error("Error in Adding Product");
            return error;
        }
    }
)

export const getProductData= createAsyncThunk(
    'getProduct',async({number,search,status,filter}) =>{
        try{
            const res = await axios(`${URL}/product/get_all_products?page=${number}&size=10&isDeleted=${status}&searchText=${search}&filterByQuantity=${filter}`);
            const data = await res.data;
            return data;

        }catch(error){
            console.log("Get data Error -> ",error)
            return error;
        }
    }
)

export const viewProduct = createAsyncThunk(
    'viewProduct',async({id}) =>{
        try{
            const data = await axios(`${URL}/product/get_product_by_id?productId=${id}`);
            return data;
        }catch(error){
            console.log("View Product Error => ",error);
            return error;
        }
    }
)

export const updateProduct = createAsyncThunk(
    'updateProduct',async({formData,productNum})=>{
        try{
            const data = await axios.put(`${URL}/product/update_Product/${productNum}`,formData);
            toast.success("Product Updates sucessfully ");
            return data;
        }catch(error){
            console.log("Error updateProduct -> ",error);
            toast.error("Product Updation Failed");

        }
    }
)

export const deleteProductData = createAsyncThunk(
    'deleteProduct',async({id}) =>{
        try{
            console.log("--del-->",id);
            const res = await axios.delete(`${URL}/product/delete_product_by_id/${id}`);
            toast.success("Product Deleted Sucessfully...");
            return res;
        }catch(error){
            toast.error("Error in deletion");
            console.log("delete Product Error -",error);
            return error;
        }
    }
)


const initialState={
    isloading:false,
    error:null,
    searchData:'',
    productData : null,
    subData: null,
}

export const productData = createSlice({
    name : 'product',
    initialState,
    reducers: {
        searchData: (state,action) =>{
            state.searchData = action.payload;
        },
    },
    extraReducers: builder =>{
        builder
        .addCase(addProduct.pending,(state,action)=>{
            state.isloading=true;
            state.productData=null;
        })
        .addCase(addProduct.fulfilled,(state,action)=>{
            state.isloading=false;
            state.productData=action.payload;
        })
        .addCase(addProduct.rejected,(state,action)=>{
            state.isloading=false;
            state.error=action.payload;
        })
        .addCase(getProductData.pending,(state,action)=>{
            state.isloading=true;
            state.subData=null;
        })
        .addCase(getProductData.fulfilled,(state,action)=>{
            state.isloading=false;
            state.subData=action.payload;
        })
        .addCase(getProductData.rejected,(state,action)=>{
            state.isloading=false;
            state.error=action.payload;
        })
        .addCase(deleteProductData.pending,(state,action)=>{
            state.isloading=true;
            state.productData=null;
        })
        .addCase(deleteProductData.fulfilled,(state,action)=>{
            state.isloading=false;
            state.productData=action.payload;
        })
        .addCase(deleteProductData.rejected,(state,action)=>{
            state.isloading=false;
            state.error=action.payload;
        })
        .addCase(updateProduct.pending,(state,action)=>{
            state.isloading=true;
            state.productData=null;
        })
        .addCase(updateProduct.fulfilled,(state,action)=>{
            state.isloading=false;
            state.productData=action.payload;
        })
        .addCase(updateProduct.rejected,(state,action)=>{
            state.isloading=false;
            state.error=action.payload;
        })
        .addCase(viewProduct.pending,(state,action)=>{
            state.isloading=true;
            state.productData=null;
        })
        .addCase(viewProduct.fulfilled,(state,action)=>{
            state.isloading=false;
            state.productData=action.payload;
        })
        .addCase(viewProduct.rejected,(state,action)=>{
            state.isloading=false;
            state.error=action.payload;
        })
    }
})

export default productData.reducer;

export const {searchData} = productData.actions;