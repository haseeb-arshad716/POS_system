import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: JSON.parse(localStorage.getItem("posCart")) || [],
};


const posSlice = createSlice({
  name: "pos",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { userId, item } = action.payload;

      const existing = state.cart.find(
        (i) => i.id === item.id && i.userId === userId
      );

      if (existing) {
        existing.quantity += 1;
      } else {
        state.cart.push({
          ...item,
          userId,
          quantity: 1,
        });
      }
      localStorage.setItem("posCart", JSON.stringify(state.cart));
    },

    updateQuantity: (state, action) => {
  const { userId, itemId, quantity } = action.payload;

  const item = state.cart.find(
    (i) => i.id === itemId && i.userId === userId
  );

  if (item) {
    item.quantity = quantity;
  }
  localStorage.setItem("posCart",JSON.stringify(state.cart));
},
    deleteProduct: (state, action) => {
      const { userId, itemId } = action.payload;
      state.cart = state.cart.filter(
        (item) => !(item.id === itemId && item.userId === userId)
      );
      localStorage.setItem("posCart", JSON.stringify(state.cart));
    },
    
    clearUserCart: (state, action) => {
  const { userId } = action.payload;
  state.cart = state.cart.filter((item) => item.userId !== userId);
  localStorage.setItem("posCart", JSON.stringify(state.cart));
}
  },
});

export const { addToCart, deleteProduct, updateQuantity,clearUserCart } = posSlice.actions;
export default posSlice.reducer;
