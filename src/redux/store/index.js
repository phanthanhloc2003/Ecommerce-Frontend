import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from"../features/user/userSlice"
import searchReducer from"../features/search/searchSlice"
import orderReducer from"../features/orderSlice/orderSlice"
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'


const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist:["search", "user"]
}
const rootReducer = combineReducers({
  user:userReducer,
  search:searchReducer,
  order:orderReducer

})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})
export let persistor = persistStore(store)