import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slices/userSlice";
import productReducer from "./Slices/productSlice"; 
import itemReducer from "./Slices/itemSlice";
import posReducer from "./Slices/posSlice";
import orderReducer from "./Slices/orderSlice";
import cartReducer from "./Slices/Daraz_slices/cartSlice";
import authReducer from './Slices/Daraz_slices/authSlice';
import darazOrderReducer from './Slices/Daraz_slices/darazOrderSlice';
const store = configureStore({
    reducer: {
        users: userReducer,     
        products: productReducer,
        items: itemReducer,
        pos: posReducer,
        orders: orderReducer,
        cart: cartReducer,
        auth: authReducer,
        orders: darazOrderReducer

    }
});

export default store;