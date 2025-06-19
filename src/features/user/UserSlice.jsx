import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAddress } from "../../services/apiGeocoding";
const initialState = {
  name: "",
  email: "",
  status: "idle",
  position: {},
  address: "",
  error: "",
};
function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}
export const fetchAddress = createAsyncThunk(
  "user/fetchAddress",
  async function () {
    // 1) We get the user's geolocation position
    const positionObj = await getPosition();
    const position = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
    };
    // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
    const addressObj = await getAddress(position);
    console.log(addressObj);
    console.log(position.latitude, position.longitude);
    const address = ` ${addressObj?.city} ${addressObj?.principalSubdivision}, ${addressObj?.countryName}`;

    // 3) Then we return an object with the data that we are interested in.
    // Payload of the FULFILLED state
    console.log(position);
    return { position, address };
  }
);
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddress.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.position = action.payload.position;
        state.address = action.payload.address;
        console.log(state);
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        state.status = "error";
        state.error =
          "There was a problem getting your address. Make sure to fill this field!";
      });
  },
});

export const { createAccount } = UserSlice.actions;
export default UserSlice.reducer;
