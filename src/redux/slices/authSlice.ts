import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { LoginPayload } from '@/services/AuthService'
import { User } from '@/types/User'


// Define a type for the slice state
interface AuthState {
    isAuthenticated: boolean,
    isLoading: boolean,
    user : User | null
}

// Define the initial state using that type
const initialState: AuthState = {
    isAuthenticated: false,
    isLoading: false,
    user : null
}

export const authSlice = createSlice({
    name: 'counter',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        login: (state, action: PayloadAction<LoginPayload>) => {
            state.isLoading = true;
        },
        loginSuccess: (state, action: PayloadAction<User | null>) => {
            state.isLoading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        loginFail: (state, action: PayloadAction<User | null>) => {
            console.log('login fail',action)
            state.isLoading = false;
            state.isAuthenticated = false;
        },


        getUserInfor: (state, action: PayloadAction<LoginPayload>) => {
            state.isLoading = true;
        },
        getUserInforSuccess: (state, action: PayloadAction<User | null>) => {
            state.isLoading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        getUserInforFail: (state, action: PayloadAction<User | null>) => {
            state.isLoading = false;
            state.isAuthenticated = false;
        },

        setAuth: (state, action: PayloadAction<User | null>) => {
            state.isLoading = false;
            state.isAuthenticated = true;
            state.user = action.payload
        },

        setLogout: (state) => {
            state.isLoading = false;
            state.isAuthenticated = false;
            state.user = null;
        },

    },
})


export const authAction = authSlice.actions;
// export const { login, loginSuccess, loginFail } = authSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectAuth = (state: RootState) => state.auth.user

export const authReducer = authSlice.reducer