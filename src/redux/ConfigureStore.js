// import { createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
// import reducers from './reducers';

// /**
//  * @method ConfigureStore
//  * @description Create store and return it
//  */
// export default function ConfigureStore() {
//   let store = createStore(reducers, applyMiddleware(thunk));
//   return store;
// }


import { persistStore, persistReducer } from 'redux-persist';
import { createStore, applyMiddleware } from 'redux';
import AsyncStorage from '@react-native-community/async-storage';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  timeout: null
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));
export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);