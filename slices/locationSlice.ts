/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "@/lib/axiosInterceptor";

interface LocationEntryState {
  data: any[];
  fetchLocationStatus: "idle" | "loading" | "succeeded" | "failed";
  addLocationStatus: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: LocationEntryState = {
  data: [],
  fetchLocationStatus: "idle",
  addLocationStatus: "idle",
  error: null,
};

// Fetch users
export const fetchLocation = createAsyncThunk(
  "location/fetchLocation",
  async () => {
    const response = await axiosInstance.get("/location");
    // Flatten objects once here
    return response.data;
  }
);

// Add stock
export const addLocation = createAsyncThunk(
  "location/addLocation",
  async ({
    payload,
    headers,
  }: {
    payload: any;
    headers: Record<string, string>;
  }) => {
    const response = await axiosInstance.post("/location", payload, {
      headers,
    });
    return response.data;
  }
);

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLocation.pending, (state) => {
        state.fetchLocationStatus = "loading";
        state.error = null;
      })
      .addCase(
        fetchLocation.fulfilled,
        (state, action: PayloadAction<any[]>) => {
          state.fetchLocationStatus = "succeeded";
          state.data = action.payload;
        }
      )
      .addCase(fetchLocation.rejected, (state, action) => {
        state.fetchLocationStatus = "failed";
        state.error = action.error.message || "Failed to fetch Vehicle";
      })

      // ADD STOCK ENTRY
      .addCase(addLocation.pending, (state) => {
        state.addLocationStatus = "loading";
        state.error = null;
      })
      .addCase(addLocation.fulfilled, (state, action: PayloadAction<any>) => {
        state.addLocationStatus = "succeeded";
        // state.data.push(action.payload);
      })
      .addCase(addLocation.rejected, (state, action) => {
        state.addLocationStatus = "failed";
        state.error = action.error.message || "Failed to add stock";
      });
  },
});
export const selectLocation = (state: { location: LocationEntryState }) =>
  state.location;

export default locationSlice.reducer;
