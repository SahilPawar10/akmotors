/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "@/lib/axiosInterceptor";

interface VehicleEntryState {
  data: any[];
  fetchStatus: "idle" | "loading" | "succeeded" | "failed";
  addVehicleStatus: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: VehicleEntryState = {
  data: [],
  fetchStatus: "idle",
  addVehicleStatus: "idle",
  error: null,
};

// Fetch users
export const fetchVehicals = createAsyncThunk(
  "vehicle/fetchVehicals",
  async () => {
    const response = await axiosInstance.get("/vehicle");
    // Flatten objects once here
    return response.data;
  }
);

// Add stock
export const addVehicleEntry = createAsyncThunk(
  "vehicle/addVehicleEntry",
  async ({
    payload,
    headers,
  }: {
    payload: any;
    headers: Record<string, string>;
  }) => {
    const response = await axiosInstance.post("/vehicle", payload, {
      headers,
    });
    return response.data;
  }
);

const vehicleEntrySlice = createSlice({
  name: "vehicals",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVehicals.pending, (state) => {
        state.fetchStatus = "loading";
        state.error = null;
      })
      .addCase(
        fetchVehicals.fulfilled,
        (state, action: PayloadAction<any[]>) => {
          state.fetchStatus = "succeeded";
          state.data = action.payload;
        }
      )
      .addCase(fetchVehicals.rejected, (state, action) => {
        state.fetchStatus = "failed";
        state.error = action.error.message || "Failed to fetch Vehicle";
      })

      // ADD STOCK ENTRY
      .addCase(addVehicleEntry.pending, (state) => {
        state.addVehicleStatus = "loading";
        state.error = null;
      })
      .addCase(
        addVehicleEntry.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.addVehicleStatus = "succeeded";
          // state.data.push(action.payload);
        }
      )
      .addCase(addVehicleEntry.rejected, (state, action) => {
        state.addVehicleStatus = "failed";
        state.error = action.error.message || "Failed to add stock";
      });
  },
});
export const selectVehicles = (state: { vehicals: VehicleEntryState }) =>
  state.vehicals;

export default vehicleEntrySlice.reducer;
