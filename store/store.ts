// import AsyncStorage from '@react-native-async-storage/async-storage'
import { combineReducers, createStore } from 'redux'
// import { persistStore, persistReducer } from 'redux-persist'
 
import authReducer from './reducers/AuthReducer'

const rootReducer = combineReducers({
    auth: authReducer
})

export const store = createStore(rootReducer)
 
// const persistConfig = {
//   key: 'root',
//   storage: AsyncStorage,
// }
 
// const persistedReducer = persistReducer(persistConfig, rootReducer)
// let store: any = createStore(rootReducer)
// let persistor = persistStore(store)
// export default { store, persistor }
