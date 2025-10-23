/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "@/lib/axiosInterceptor";

interface VehicleEntryState {
  data: any[];
  fetchEntryStatus: "idle" | "loading" | "succeeded" | "failed";
  addVehicleStatus: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: VehicleEntryState = {
  data: [],
  fetchEntryStatus: "idle",
  addVehicleStatus: "idle",
  error: null,
};

// Fetch users
export const fetchVehicleEntries = createAsyncThunk(
  "vehicle/fetchVehicleEntries",
  async () => {
    const response = await axiosInstance.get("/vehicle");
    // Flatten objects once here
    return response.data;
  }
);

// Add stock
export const addVehicleEntry = createAsyncThunk(
  "Vehicle/addStockEntry",
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
  name: "vehicles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVehicleEntries.pending, (state) => {
        state.fetchEntryStatus = "loading";
        state.error = null;
      })
      .addCase(
        fetchVehicleEntries.fulfilled,
        (state, action: PayloadAction<any[]>) => {
          state.fetchEntryStatus = "succeeded";
          state.data = action.payload;
        }
      )
      .addCase(fetchVehicleEntries.rejected, (state, action) => {
        state.fetchEntryStatus = "failed";
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
export const selectVehicles = (state: { vehicles: VehicleEntryState }) =>
  state.vehicles;

export default vehicleEntrySlice.reducer;
