import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slices/counterSlice'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './rootSaga'
import { authReducer } from './slices/authSlice'
import { loadingReducer } from './slices/loadingSlice'

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware()
const middleware = [sagaMiddleware]


export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    loading : loadingReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
})

// Then run the saga
sagaMiddleware.run(rootSaga)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch