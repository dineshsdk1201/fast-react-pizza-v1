import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  name: "",
  email: "",
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    createAccount: {
      prepare(name, email) {
        return {
          payload: { name, email },
        };
      },
      reducer(state, action) {
        state.name = action.payload.name;
        state.email = action.payload.email;
      },
    },
  },
});

export const { createAccount } = UserSlice.actions;
export default UserSlice.reducer;
