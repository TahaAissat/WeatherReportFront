import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value : []
}

export const defaultCities = createSlice({
    name: 'defaultCities',
    initialState,
    reducers: {
        defineDefaultCities: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { defineDefaultCities } = defaultCities.actions
export default defaultCities.reducer