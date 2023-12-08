import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value : []
}

export const favCities = createSlice({
    name: 'favCities',
    initialState,
    reducers: {
        defineListFavoriteCities: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { defineListFavoriteCities } = favCities.actions
export default favCities.reducer