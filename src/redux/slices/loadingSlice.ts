import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { User } from '@/types/User'


// Define a type for the slice state
interface LoadingState {
    isLoading: boolean,
}

// Define the initial state using that type
const initialState: LoadingState = {
    isLoading: false,
}

export const loadingSlice = createSlice({
    name: 'loading',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setStartLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setEndLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
    },
})


export const loadingAction = loadingSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectLoading = (state: RootState) => state.loading.isLoading

export const loadingReducer = loadingSlice.reducer