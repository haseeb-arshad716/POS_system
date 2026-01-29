import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: JSON.parse(localStorage.getItem("all_items")) || [],
};

const itemSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
      localStorage.setItem("all_items", JSON.stringify(state.items));
    },
    deleteItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      localStorage.setItem("all_items", JSON.stringify(state.items));
    },

    addStock: (state, action) => {
      const { itemId, addedStock } = action.payload;
      const product = state.items.find((item) => item.id === itemId);
      if (product) {
        const currentStock = Number(product.stock || 0);
        product.stock = currentStock + Number(addedStock);
      }

      localStorage.setItem("all_items", JSON.stringify(state.items));
    },

    reduceStock: (state, action) => {
      const orderedItems = action.payload;

      orderedItems.forEach((cartItem) => {
        const product = state.items.find((item) => item.id === cartItem.id);

        if (product) {
          const currentStock = Number(product.stock || 0);
          const soldQty = Number(cartItem.quantity || 0);

          product.stock = currentStock - soldQty;
        }
      });

      localStorage.setItem("all_items", JSON.stringify(state.items));
    },
  },
});

export const { addItem, deleteItem, reduceStock, addStock } = itemSlice.actions;
export default itemSlice.reducer;
