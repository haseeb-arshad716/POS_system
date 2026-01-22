import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slices/userSlice";
import productReducer from "./Slices/productSlice"; // Ensure path is correct
import itemReducer from "./Slices/itemSlice";
import posReducer from "./Slices/posSlice";
import orderReducer from "./Slices/orderSlice";


const store = configureStore({
    reducer: {
        users: userReducer,      // Account management ke liye
        products: productReducer, // Items/Products management ke liye
        items: itemReducer,
        pos: posReducer,
        orders: orderReducer,
        
    }
});

export default store;