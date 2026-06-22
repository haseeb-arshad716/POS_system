import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: 'daraz_cart',
  initialState: {
    cartItems: JSON.parse(localStorage.getItem("daraz_cart_item")) || [],
    totalQuantity: JSON.parse(localStorage.getItem("daraz_total_qty")) || 0,
  },
  reducers: {
   addToCart: (state, action) => {
  const newItem = action.payload;
  if (state.cartItems.length> 0) {
    const currentVendorId = state.cartItems[0].vendorId;
    if(currentVendorId !== newItem.vendorId){
      alert("you cannout add items of different sellers");
      return
    }
  }
  const existingItem = state.cartItems.find(item => item.id === newItem.id);
  
  if (!existingItem) {
    state.cartItems.push({
      id: newItem.id,
      title: newItem.title,
      price: newItem.price,
      quantity: newItem.selectedQuantity, 
      totalPrice: newItem.price * newItem.selectedQuantity,
      vendorId: newItem.vendorId,   
      vendorName: newItem.vendorName
    });
  } else {
    existingItem.quantity += newItem.selectedQuantity;
    existingItem.totalPrice += newItem.price * newItem.selectedQuantity;
  }

  state.totalQuantity = state.cartItems.length;
  localStorage.setItem("daraz_cart_item", JSON.stringify(state.cartItems));
  localStorage.setItem("daraz_total_qty", JSON.stringify(state.totalQuantity));
}, 
    clearCart: (state) => {
      state.cartItems = [];
      state.totalQuantity = 0; 
      localStorage.removeItem("daraz_cart_item");
      localStorage.setItem("daraz_total_qty", JSON.stringify(state.totalQuantity));
    },

    removeItem: (state, action) => {
      const id = action.payload;
      state.cartItems = state.cartItems.filter(item => item.id !== id);
      
      state.totalQuantity = state.cartItems.length; 
      
      localStorage.setItem("daraz_cart_item", JSON.stringify(state.cartItems));
      localStorage.setItem("daraz_total_qty", JSON.stringify(state.totalQuantity));
    },

    updateQuantity: (state, action) => {
      const { id, change } = action.payload; 
      const item = state.cartItems.find(item => item.id === id);

      if (item) {
        const newQuantity = item.quantity + change;
        if (newQuantity > 0) {
          item.quantity = newQuantity;
          item.totalPrice = item.quantity * item.price;
        }
      }
      
      localStorage.setItem("daraz_cart_item", JSON.stringify(state.cartItems));
      state.totalQuantity = state.cartItems.length;
      localStorage.setItem("daraz_total_qty", JSON.stringify(state.totalQuantity));
    },

  }
});

export const { addToCart, clearCart, removeItem, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;