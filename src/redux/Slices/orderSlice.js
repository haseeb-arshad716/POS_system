import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    history: JSON.parse(localStorage.getItem("orderHistory")) || [],
  },
  reducers: {
    confirmOrder: (state, action) => {
      const { items, totalAmount, tax, discount } = action.payload;
      const shortId = Math.floor(1000 + Math.random() * 90000);
      const newOrder = {
        orderId: `ORD-${shortId}`,
        items,
        tax,
        discount,
        totalAmount,
        date: new Date().toLocaleString(),
      };

      state.history.push(newOrder);
      localStorage.setItem("orderHistory", JSON.stringify(state.history));
    },
  },
});

export const { confirmOrder } = orderSlice.actions;
export default orderSlice.reducer;