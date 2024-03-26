import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL = import.meta.env.VITE_APP_CIMB_PROXY_API_BASE;

const initialState = {
    adminData: null,
    subdata:null,
    isLoading:false,
    error:null,
}

export const getAdminData = createAsyncThunk(
    'getAdminData',async ({formattedDate,category}) =>{
        // console.log("date ->",formattedDate,category)
        const res= await axios.get(`${URL}/admin/dashboard_admin?createdAt=${formattedDate}&queryType=${category}`);
        const data = await res.data;
        return data;
    }   
)


export const adminSlice = createSlice({
    name : 'admin',
    initialState,
    reducers:{},
    extraReducers: builder =>{
        builder
        .addCase(getAdminData.pending, (state,action) =>{
            state.isLoading = true;
            state.adminData = null;
        })
        .addCase(getAdminData.fulfilled, (state,action) =>{
            state.isLoading = false;
            state.adminData = action.payload;
        })
        .addCase(getAdminData.rejected, (state,action) =>{
            state.isLoading = false;
            state.error = action.payload;
        })
    }
})


export default adminSlice.reducer