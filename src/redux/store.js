import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slices/userSlice";
import productReducer from "./Slices/productSlice"; 
import itemReducer from "./Slices/itemSlice";
import posReducer from "./Slices/posSlice";
import orderReducer from "./Slices/orderSlice";


const store = configureStore({
    reducer: {
        users: userReducer,     
        products: productReducer,
        items: itemReducer,
        pos: posReducer,
        orders: orderReducer,

    }
});

export default store;