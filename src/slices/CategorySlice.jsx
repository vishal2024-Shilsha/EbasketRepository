import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from 'react-toastify';

const initialState ={
    content:null,
    isLoading:false,
    error:null,
    add:null,
    subdata:null,
    brandData:null,
}

// const URL="https://8900-2405-201-4041-c80c-50e0-e069-5fb3-bc8.ngrok-free.app"
const URL = import.meta.env.VITE_APP_CIMB_PROXY_API_BASE;
// console.log("baseurl-->",baseUrlProxy)

export const getCategoryData =createAsyncThunk(
    'getCAtegoryData', async ()=>{
        const res = await axios(`${URL}/category/get_category_list?pageNumber=0&pageSize=10`)
        const data= await res.data;
        return data;
    }
)


export const getSubCategoryData = createAsyncThunk(
    'getSubCategoryData', async ({categoryId})=>{
        const res = await axios.get(`${URL}/sub_category/get_sub_category_by_categoryId?categoryId=${categoryId}`)
        const data = await res.data;
        return data;
    }
)

export const getBrandData = createAsyncThunk(
    'getBrandData' , async()=>{
        const res = await axios.get(`${URL}/brand/get_brand_list?pageNumber=0&pageSize=10`)
        const data = await res.data;
        return data;
    }
)


export const addBrandData = createAsyncThunk(
    'addBrandData', async({name}) =>{
        try{
            let content ={
                brandName:name
            }
            const data = await axios.post(`${URL}/brand/add_brand`,content);
            toast.success("Brand Added Sucessfully");
            return data;
        }catch(error){
            console.log("AddBrandData --> ",error);
            toast.error("Network Error ! try after some times..");
            return error;
        }
    }
)

export const addSubCategory = createAsyncThunk(
    'adddSubCategory' , async({categoryId,subCategoryName}) =>{
        try{
            let content = {
                categoryId,subCategoryName
            }
            const data = await axios.post(`${URL}/sub_category/add_sub_category`,content);
            toast.success("subcategory added sucessfully..");
            return data;
        }catch(error){
            console.log("AddSubCategory Error -> ",error);
            toast.error("Error in adding subcategory data..");
            return error;
        }
    }
)

export const addCategory = createAsyncThunk(
    'addCategory', async ({categoryName,categoryDetails}) =>{    
        try{
            let content = {
                categoryName,
                description: categoryDetails
            }
            const data = await axios.post(`${URL}/category/add_category`,content);
            toast.success("category added sucessfully");
            return data;
        }catch(error){
            console.log(error);
            toast.error("Error in adding category data..");
            return error;
        }
    }
)

export const updateBrand = createAsyncThunk(
    'updateBrand',async({id,name}) =>{
        try{
            let content={
                brandId:id,
                brandName:name,
            }
            const data = await axios.put(`${URL}/brand/update_brand`,content);
            toast.success("brand Data added sucessfully...");
            return data;
        }catch(error){
            console.log("Update",error);
            toast.error("Error in updating brand data..");
            return error;
        }
    }
)

export const updateSubCategory = createAsyncThunk(
    'updateSubcategory',async({subCategoryId,subCategoryName}) => {
        try{
            let content={
                subCategoryId,subCategoryName
            }
            const data=await axios.put(`${URL}/sub_category/update_sub_category`,content);
            toast.success("subCategory data updated sucessfully..");
            return data;
        }catch(error){
            console.log("Update error ",error);
            toast.error("Error in updating subCategory data..");
            return error;
        }
    }
)

export const updateCategory = createAsyncThunk(
    'updateCategory', async ({editingCategoryId,categoryName,categoryDetails}) =>{
        try{
            let content ={
                categoryId:editingCategoryId,
                categoryName,
                description: categoryDetails
            }
            const data = await axios.patch(`${URL}/category/update_category`,content);
            toast.success("category data updated successfully...");
            return data;
        }catch(error){
            console.log("update Error -> ",error);
            toast.error("error in updating category data..");
            return error;
        }
    }
)

export const deleteBrand = createAsyncThunk(
    'deleteBrand', async({id}) =>{
        try{
            const data = await axios.delete(`${URL}/brand/delete_brand?brandId=${id}`);
            toast.success("brand data deleted sucessfully..");
            return data;
        }catch(error){
            console.log("delete Error -> ",error);
            toast.error("Error in deleting brand..");
            return error;
        }
    }
)


export const deleteSubCategory = createAsyncThunk(
    'deleteSubCategory', async({id})=>{
        try{
            const data= await axios.delete(`${URL}/sub_category/delete_sub_category?subCategoryId=${id}`);
            toast.success("subCategory deleted sucessfully..");
            return data;
        }catch(error){
            console.log("delete SubCategory -> ",error)
            toast.error("Error in deleting subCategory Data..");
            return error;
        }
    }
)

export const deleteCategory = createAsyncThunk(
    'deleteCategory', async({id}) =>{
        try{
            const data = await axios.delete(`${URL}/category/delete_category?categoryId=${id}`);
            toast.success("Category data deleted sucessfully..");
            return data;
        }catch(error){
            console.log("delete Error -> ",error)
            toast.error("Error in deleting category data..");
            return error;
        }
    }
)

export const categoryData = createSlice({
    name : 'category',
    initialState,
    reducers:{},
    extraReducers: builder =>{
        builder
        .addCase(getCategoryData.pending,(state,action)=>{
            state.isLoading=true;
            state.content=null;
        })
        .addCase(getCategoryData.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.content = action.payload;
        })
        .addCase(getCategoryData.rejected,(state,action)=>{
            state.isLoading= false;
            state.content=null;
            state.error=action.payload;
        })
        .addCase(addCategory.pending,(state,action)=>{
            state.isLoading=true;
            state.add=null;
        })
        .addCase(addCategory.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.add = action.payload;

        })
        .addCase(addCategory.rejected,(state,action)=>{
            state.isLoading= false;
            state.add=null;
            state.error=action.payload;
        })
        .addCase(updateCategory.pending,(state,action)=>{
            state.isLoading = true;
            state.add = null;
        })
        .addCase(updateCategory.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.add = action.payload;
        })
        .addCase(updateCategory.rejected,(state,action)=>{
            state.isLoading = false;
            state.add = null;
            state.error = action.payload;
        })
        .addCase(deleteCategory.pending,(state,action)=>{
            state.isLoading = true;
            state.add = null;
        })
        .addCase(deleteCategory.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.add = action.payload;
        })
        .addCase(deleteCategory.rejected,(state,action)=>{
            state.isLoading = false;
            state.add = null;
            state.error = action.payload;

        })
        .addCase(addSubCategory.pending,(state,action)=>{
            state.isLoading=true;
            state.add = null;
        })
        .addCase(addSubCategory.fulfilled,(state,action) =>{
            state.isLoading=false;
            state.add=action.payload;
        })
        .addCase(addSubCategory.rejected,(state,action)=>{
            state.isLoading=false;
            state.error=action.payload;
        })
        .addCase(getSubCategoryData.pending,(state,action) =>{
            state.isLoading=true;
            state.subdata=null;
        })
        .addCase(getSubCategoryData.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.subdata=action.payload;
        })
        .addCase(getSubCategoryData.rejected,(action,state)=>{
            state.isLoading=false;
            state.error=action.payload;
        })
        .addCase(getBrandData.pending,(state,action) =>{
            state.isLoading=true;
            state.brandData=null;
        })
        .addCase(getBrandData.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.brandData=action.payload;
        })
        .addCase(getBrandData.rejected,(action,state)=>{
            state.isLoading=false;
            state.error=action.payload;
        })
        .addCase(addBrandData.pending,(state,action) =>{
            state.isLoading=true;
            state.add=null;
        })
        .addCase(addBrandData.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.add=action.payload;
        })
        .addCase(addBrandData.rejected,(action,state)=>{
            state.isLoading=false;
            state.error=action.payload;
        })
        .addCase(deleteBrand.pending,(state,action) =>{
            state.isLoading=true;
            state.add=null;
        })
        .addCase(deleteBrand.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.add=action.payload;
        })
        .addCase(deleteBrand.rejected,(action,state)=>{
            state.isLoading=false;
            state.error=action.payload;
        })
        .addCase(updateBrand.pending,(state,action) =>{
            state.isLoading=true;
            state.add=null;
        })
        .addCase(updateBrand.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.add=action.payload;
        })
        .addCase(updateBrand.rejected,(action,state)=>{
            state.isLoading=false;
            state.error=action.payload;
        })
        
    }
})

export default categoryData.reducer;



