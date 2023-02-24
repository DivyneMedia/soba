import AsyncStorage from '@react-native-async-storage/async-storage'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import thunk from 'redux-thunk'

import authReducer from './reducers/AuthReducer'
import outputFieldsReducer from './reducers/outputFieldsReducer'

const rootReducer = combineReducers({
  auth: authReducer,
  outputFields: outputFieldsReducer
})

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);


export let store = createStore(persistedReducer, applyMiddleware(thunk));
export let persistor = persistStore(store);
