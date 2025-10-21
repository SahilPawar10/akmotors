/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "@/lib/axiosInterceptor";
import { flattenObject } from "@/utils/commen";

interface StocksState {
  data: any[];
  fetchStatus: "idle" | "loading" | "succeeded" | "failed";
  addStatus: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: StocksState = {
  data: [],
  fetchStatus: "idle",
  addStatus: "idle",
  error: null,
};

// Fetch Stocks
export const fetchStocks = createAsyncThunk("stocks/fetchStocks", async () => {
  const response = await axiosInstance.get("/stocks");
  // Flatten objects once here
  return response.data;
});

// Add stock
export const addStock = createAsyncThunk(
  "stocks/addStock",
  async ({
    payload,
    headers,
  }: {
    payload: any;
    headers: Record<string, string>;
  }) => {
    const response = await axiosInstance.post("/stocks", payload, { headers });
    return response.data;
  }
);

export const downloadSampleExcel = createAsyncThunk(
  "stocks/downloadSample",
  async () => {
    const response = await axiosInstance.get("/stocks");
    // Flatten objects once here
    return response.data;
  }
);

const stockSlice = createSlice({
  name: "stocks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStocks.pending, (state) => {
        state.fetchStatus = "loading";
        state.error = null;
      })
      .addCase(fetchStocks.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.fetchStatus = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchStocks.rejected, (state, action) => {
        state.fetchStatus = "failed";
        state.error = action.error.message || "Failed to fetch stocks";
      })

      // ADD STOCK
      .addCase(addStock.pending, (state) => {
        state.addStatus = "loading";
        state.error = null;
      })
      .addCase(addStock.fulfilled, (state, action: PayloadAction<any>) => {
        state.addStatus = "succeeded";
        state.data.push(action.payload);
      })
      .addCase(addStock.rejected, (state, action) => {
        state.addStatus = "failed";
        state.error = action.error.message || "Failed to add stock";
      })

      // ADD STOCK
      .addCase(downloadSampleExcel.pending, (state) => {
        state.addStatus = "loading";
        state.error = null;
      })
      .addCase(
        downloadSampleExcel.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.addStatus = "succeeded";
          // state.data.push(action.payload);
        }
      )
      .addCase(downloadSampleExcel.rejected, (state, action) => {
        state.addStatus = "failed";
        state.error = action.error.message || "Failed to add stock";
      });
  },
});
export const selectStocks = (state: { stocks: StocksState }) => state.stocks;

export default stockSlice.reducer;
