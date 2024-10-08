import { createSlice } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    value: [],
  },
  
  reducers: {
    addToCart: (state,action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes.
      // Also, no return statement is required from these functions.
      state.value.push(action.payload)
    },
    removeFromCart: (state,action) => {
   state.value =   state.value.filter(current => current.id !== action.payload.id)
    },
    removeAll: (state, action) => {
      state.value = []
    },
  },
})

// Action creators are generated for each case reducer function
export const { addToCart, removeFromCart, removeAll } = cartSlice.actions

export default cartSlice.reducer