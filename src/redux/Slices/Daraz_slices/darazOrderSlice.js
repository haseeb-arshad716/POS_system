import { createSlice } from "@reduxjs/toolkit";

const storedOrders = JSON.parse(localStorage.getItem("daraz_orders")) || [];

const darazOrderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: storedOrders,
  },
  reducers: {
    placeOrder: (state, action) => {
        
      state.orders.push(action.payload);
      localStorage.setItem("daraz_orders", JSON.stringify(state.orders));
    },
 updateOrderStatus: (state, action) => {
  const { orderId, status } = action.payload;

  const order = state.orders.find(o => o.id === orderId);

  if (order && order.status === "Pending") {
    order.status = status;
    localStorage.setItem("daraz_orders", JSON.stringify(state.orders));
  }
},
  },
});

export const { placeOrder,updateOrderStatus } = darazOrderSlice.actions;
export default darazOrderSlice.reducer;
