import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Async thunk to fetch products
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const res = await fetch("https://dummyjson.com/products/category/smartphones");
    const data = await res.json();
    return data.products;
  }
);


const storedProducts = localStorage.getItem("products");

const initialState = {
  items: storedProducts ? JSON.parse(storedProducts) : [],
  deletedItems: [], // track deleted items
  status: "idle",
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    editItem: (state, action) => {
      const updatedProduct = action.payload;
      const index = state.items.findIndex(item => item.id === updatedProduct.id);
      if (index !== -1) {
        state.items[index] = updatedProduct;
        console.log(updatedProduct);
        
        localStorage.setItem("products", JSON.stringify(state.items));
      }
    },
    deleteItem: (state, action) => {
      const id = action.payload;
      const removedItem = state.items.find(item => item.id === id);
    //   agr id mil jati ha 
      if (removedItem) {
        state.items = state.items.filter(item => item.id !== id);
        state.deletedItems.push(removedItem);
        console.log(id);
        localStorage.setItem("products", JSON.stringify(state.items));
      }
    },
    clearProducts: (state) => {
      state.items = [];
      state.deletedItems = [];
      localStorage.removeItem("products");
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
        localStorage.setItem("products", JSON.stringify(action.payload));
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { editItem, deleteItem, clearProducts } = productSlice.actions;
export default productSlice.reducer;
