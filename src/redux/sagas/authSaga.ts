// import { City, ListResponse } from 'models';
import { call, put, takeLatest } from 'redux-saga/effects';
import { authAction } from '../slices/authSlice';
import { authApi } from '@/services/AuthService';
import { User } from '@/types/User';
import { PayloadAction } from '@reduxjs/toolkit';

function* login(action: PayloadAction<any>) {
    try {
        const response: { data: { user: User } } = yield call(authApi._login, action.payload);
        console.log('response', response['data']['user']);

        yield put(authAction.loginSuccess(response['data']['user']));
    } catch (error: any) {
        console.log('Failed to login', error);
        if (error['status'] === 401) {
            alert(error['response']['data']['error']);
        }
        yield put(authAction.loginFail(action.payload));
    }
}

export default function* authSaga() {
    yield takeLatest(authAction.login.type, login);
}