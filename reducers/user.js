import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: { username: null, token: null,favorites:[] },
};

export const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logUser: (state, action) => {
      state.value = {
        username: action.payload.username,
        token: action.payload.token,
        favorites : action.payload.favorites
      };
    },
    logOut: (state, action) => {
      state.value = {
        username: null,
        token: null,
        favorites : []
      }
    }
  },
});

export const { logUser, logOut } = user.actions;
export default user.reducer;
