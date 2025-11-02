/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "@/lib/axiosInterceptor";

interface BikeServices {
  data: any[];
  fetchServiceStatus: "idle" | "loading" | "succeeded" | "failed";
  addServiceStatus: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: BikeServices = {
  data: [],
  fetchServiceStatus: "idle",
  addServiceStatus: "idle",
  error: null,
};

// Fetch users
export const fetchServiceEntries = createAsyncThunk(
  "services/fetchServiceEntries",
  async () => {
    const response = await axiosInstance.get("/service");
    // Flatten objects once here
    return response.data;
  }
);

// Add stock
export const addServiceEntry = createAsyncThunk(
  "services/addServiceEntry",
  async ({
    payload,
    headers,
  }: {
    payload: any;
    headers: Record<string, string>;
  }) => {
    const response = await axiosInstance.post("/service", payload, {
      headers,
    });
    return response.data;
  }
);

const bikeServiceSlice = createSlice({
  name: "services",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServiceEntries.pending, (state) => {
        state.fetchServiceStatus = "loading";
        state.error = null;
      })
      .addCase(
        fetchServiceEntries.fulfilled,
        (state, action: PayloadAction<any[]>) => {
          state.fetchServiceStatus = "succeeded";
          state.data = action.payload;
        }
      )
      .addCase(fetchServiceEntries.rejected, (state, action) => {
        state.fetchServiceStatus = "failed";
        state.error = action.error.message || "Failed to fetch stocks";
      })

      // ADD STOCK ENTRY
      .addCase(addServiceEntry.pending, (state) => {
        state.addServiceStatus = "loading";
        state.error = null;
      })
      .addCase(
        addServiceEntry.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.addServiceStatus = "succeeded";
          // state.data.push(action.payload);
        }
      )
      .addCase(addServiceEntry.rejected, (state, action) => {
        state.addServiceStatus = "failed";
        state.error = action.error.message || "Failed to add stock";
      });
  },
});
export const selectedServices = (state: { services: BikeServices }) =>
  state.services;

export default bikeServiceSlice.reducer;
