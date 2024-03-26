import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../slices/LoginSlice'
import UserSlice from '../slices/UserSlice';
import CategorySlice from '../slices/CategorySlice';
import ProductSlice from '../slices/ProductSlice';
import adminSlice from '../slices/AdminSlice';

const store = configureStore({
    reducer:{
        auth : authSlice,
        user :UserSlice,
        category : CategorySlice,
        product: ProductSlice,
        admin: adminSlice,
    }
    
})


export default store;