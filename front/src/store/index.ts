import { configureStore, combineReducers } from '@reduxjs/toolkit'
import categories from './categories/categoriesSlice';
import products from "./Products/productsSlice"
import cart from './cart/CartSlices';
import storage from 'redux-persist/lib/storage';
import { FLUSH, PAUSE, persistReducer, PURGE, REGISTER, REHYDRATE ,PERSIST} from 'redux-persist';
import persistStore from 'redux-persist/es/persistStore';
import wishList from './wishlist/wishlistSlice';
import auth from "./auth/authSlice";
import Order from './orders/ordersSlice'




const cartPersistConfig = {
    key: 'cart',
    storage,
    whitelist:['items']
    
}



// const wishlistPersistConfig = {
//     key: 'wishlist',
//     storage,
//     whitelist:['itemsId']
    
// }
const authPersistConfig = {
    key: 'auth',
    storage,
    whitelist:["user"," accessToken"]
    
}

const rootReducer = combineReducers({
    categories,
    products,
    Order,
    cart:persistReducer(cartPersistConfig,cart),
    wishlist:  wishList,
    auth: persistReducer(authPersistConfig, auth),

})


const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
            ignoredActions:[FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER]
            }
        })
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
const persistor = persistStore(store);
export { store,persistor };