import authSaga from './sagas/authSaga';

import { all } from 'redux-saga/effects';


//* Nơi đăng kí các Saga
export default function* rootSaga() {
  yield all([authSaga()]);
}