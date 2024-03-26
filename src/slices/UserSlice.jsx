import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axios from "axios";


// const URL="https://8900-2405-201-4041-c80c-50e0-e069-5fb3-bc8.ngrok-free.app"

const URL = import.meta.env.VITE_APP_CIMB_PROXY_API_BASE;


const initialState = {
    content:null,
    isLoading: false,
    error:null,
    TempData:null,
}

export const fetchData = createAsyncThunk(
    'getuserdata',
    async ({ page,size,active,SearchData }) => {
        const res = await axios(`${URL}/users/get_users?page=${page}&size=${size}&active=${active}&searchText=${SearchData}`);  
        const data= await res.data
        return data;
    }
)   

export const toggleStatus = createAsyncThunk(
    'toggleStatus',async({id}) =>{
        try{
            const res = await axios.delete(`${URL}/users/deactivate_and_activate_user_by_id/${id}`);
            return res;
        }catch(error){
            return error;
        }
        
    }
)

export const getData = createAsyncThunk(
    'getdatabyId',
    async ({id}) => {
        const res = await axios(`${URL}/users/get_user_by_id?userId=${id}`);
        const data = await res.data
        return data;
    }
)

export const userdata = createSlice({
    name: 'user',
    initialState,
    reducers:{},
    extraReducers: builder =>{
        builder
        .addCase(fetchData.pending , state=>{
            state.isLoading = true;
            state.content=null;
        })
        .addCase(fetchData.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.content = action.payload;
        })
        .addCase(fetchData.rejected, (state,action) =>{
            state.isLoading= false;
            state.content=null;
            console.log(action.payload.message);
            state.error= action.payload.message;
        })
        .addCase(getData.pending , state=>{
            state.isLoading = true;
            state.TempData=null;
        })
        .addCase(getData.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.TempData = action.payload;
        })
        .addCase(getData.rejected, (state,action) =>{
            state.isLoading= false;
            state.content=null;
            console.log(action.payload.message);
            state.error= action.payload.message;
        })
        .addCase(toggleStatus.pending , state=>{
            state.isLoading = true;
            state.TempData=null;
        })
        .addCase(toggleStatus.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.TempData = action.payload;
        })
        .addCase(toggleStatus.rejected, (state,action) =>{
            state.isLoading= false;
            state.content=null;
            console.log(action.payload.message);
            state.error= action.payload.message;
        })
    }
})

export default userdata.reducer;

