import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const backendURL = import.meta.env.VITE_APP_CIMB_PROXY_API_BASE;

// const backendURL='https://8900-2405-201-4041-c80c-50e0-e069-5fb3-bc8.ngrok-free.app/admin/login'

// console.log("url -> ",backendURL)


export const userLogin = createAsyncThunk(
    'auth/login',
    async ({ email, password }, { rejectWithValue }) => {
        
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            const { data } = await axios.post(
                `${backendURL}/admin/login`,
                { email, password },
                config
            )
            console.log({data});
            localStorage.setItem('userToken', data.userToken)
            console.log(data);
            return data
        } catch (error) {

            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)


const userToken = localStorage.getItem('userToken')
    ? localStorage.getItem('userToken')
    : null

const initialState = {
    loading: false,
    userInfo: null,
    userToken,
    error: null,
    success: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(userLogin.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(userLogin.fulfilled, (state, action) => {
                state.loading = false;
                state.isLoggedIn = true;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(userLogin.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                console.log(action.error.message);
                if(action.error.message === 'Request failed with status code 401'){
                    state.error = 'Access Denied! Invalid Credentials';
                }else{
                    state.error = action.error.message;

                }
            });
    },
    
})
export default authSlice.reducer
