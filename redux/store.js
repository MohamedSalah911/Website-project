import { combineReducers, configureStore } from '@reduxjs/toolkit'
import cartReducer from './featuers/cart/cartSlice'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
 
const persistConfig = {
  key: 'root',
  storage,
}
const reducer = combineReducers({
  cart: cartReducer
})
 
const persistedReducer = persistReducer(persistConfig, reducer)
export default configureStore({
  reducer: persistedReducer
})