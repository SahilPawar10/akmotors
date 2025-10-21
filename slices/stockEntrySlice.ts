/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "@/lib/axiosInterceptor";

interface StocksEntryState {
  data: any[];
  fetchEntryStatus: "idle" | "loading" | "succeeded" | "failed";
  addStockEntryStatus: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: StocksEntryState = {
  data: [],
  fetchEntryStatus: "idle",
  addStockEntryStatus: "idle",
  error: null,
};

// Fetch users
export const fetchStocksEntries = createAsyncThunk(
  "stocks/fetchStocksEntries",
  async () => {
    const response = await axiosInstance.get("/stock-entry");
    // Flatten objects once here
    return response.data;
  }
);

// Add stock
export const addStockEntry = createAsyncThunk(
  "stocks/addStockEntry",
  async ({
    payload,
    headers,
  }: {
    payload: any;
    headers: Record<string, string>;
  }) => {
    const response = await axiosInstance.post("/stock-entry", payload, {
      headers,
    });
    return response.data;
  }
);

const stockEntrySlice = createSlice({
  name: "stocksEntry",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStocksEntries.pending, (state) => {
        state.fetchEntryStatus = "loading";
        state.error = null;
      })
      .addCase(
        fetchStocksEntries.fulfilled,
        (state, action: PayloadAction<any[]>) => {
          state.fetchEntryStatus = "succeeded";
          state.data = action.payload;
        }
      )
      .addCase(fetchStocksEntries.rejected, (state, action) => {
        state.fetchEntryStatus = "failed";
        state.error = action.error.message || "Failed to fetch stocks";
      })

      // ADD STOCK ENTRY
      .addCase(addStockEntry.pending, (state) => {
        state.addStockEntryStatus = "loading";
        state.error = null;
      })
      .addCase(addStockEntry.fulfilled, (state, action: PayloadAction<any>) => {
        state.addStockEntryStatus = "succeeded";
        // state.data.push(action.payload);
      })
      .addCase(addStockEntry.rejected, (state, action) => {
        state.addStockEntryStatus = "failed";
        state.error = action.error.message || "Failed to add stock";
      });
  },
});
export const selectStocksEntry = (state: { stockEntry: StocksEntryState }) =>
  state.stockEntry;

export default stockEntrySlice.reducer;
