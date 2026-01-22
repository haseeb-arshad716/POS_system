

import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
    users: JSON.parse(localStorage.getItem("users")) || [],
    currentUser: JSON.parse(localStorage.getItem("currentUser")) || null, 
    status: "idle",
    error: null
};

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
       registeredUser: (state, action) => {
    const exists = state.users.find(u => u.email === action.payload.email);

    if (!exists) {
        const lastUser = state.users[state.users.length - 1];
         const newId = lastUser ? lastUser.id + 1 : 1;
        
        const newUser = { ...action.payload, id: newId };
        
        state.users.push(newUser);
        
        localStorage.setItem("users", JSON.stringify(state.users));
        state.error = null;
    } else {
        state.error = "Email already registered!";
    }
},
logoutUser :(state) =>{
state.currentUser = null;
localStorage.removeItem("currentUser", JSON.stringify(state.users));

},
        loginuser: (state, action) => {
            const { email, password } = action.payload;
            const user = state.users.find(u => u.email === email && u.password === password);
            
            if (user) {
                state.currentUser = user;
                state.error = null;
                localStorage.setItem("currentUser", JSON.stringify(user));
                
            } else {
                state.error = "Invalid email or password";
                
            }
        },
        clearError: (state) => {
            state.error = null;
        },
      
       
    }
});

export const { registeredUser, loginuser, clearError, logoutUser } = userSlice.actions;
export default userSlice.reducer;