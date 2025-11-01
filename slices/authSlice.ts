/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/lib/axiosInterceptor";

interface AuthState {
  data: any;
  authStatus: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: AuthState = {
  data: null,
  authStatus: "idle",
  error: null,
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (
    { payload, headers }: { payload: any; headers: any },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post("/auth/register", payload, {
        headers,
      });
      localStorage.setItem("access_token", response.data.tokens.access.token);
      localStorage.setItem("refresh_token", response.data.tokens.refresh.token);
      localStorage.setItem("swarajya-user", JSON.stringify(response.data.user));
      localStorage.setItem("userRole", JSON.stringify(response.data.user.role));
      localStorage.setItem("userId", JSON.stringify(response.data.user.id));
      return response.data;
    } catch (err: any) {
      // Capture backend error message
      console.log(err, "err");

      const message =
        err.response?.data?.message || err.message || "Something went wrong.";
      return rejectWithValue(message);
    }
  }
);

export const LoginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ payload }: { payload: any; headers: any }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/login", payload);
      console.log(response.data, "response");

      localStorage.setItem("access_token", response.data.tokens.access.token);
      localStorage.setItem("refresh_token", response.data.tokens.refresh.token);
      localStorage.setItem("swarajya-user", JSON.stringify(response.data.user));
      localStorage.setItem("userRole", JSON.stringify(response.data.user.role));
      localStorage.setItem("userId", JSON.stringify(response.data.user.id));
      return response.data;
    } catch (err: any) {
      // Capture backend error message
      const message =
        err.response?.data?.message || err.message || "Something went wrong.";
      return rejectWithValue(message);
    }
  }
);

const authSlice = createSlice({
  name: "authuser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.authStatus = "loading";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.authStatus = "succeeded";
        state.data = action.payload;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.authStatus = "failed";
        state.error = action.payload as string;
      })

      .addCase(LoginUser.pending, (state) => {
        state.authStatus = "loading";
        state.error = null;
      })
      .addCase(LoginUser.fulfilled, (state, action) => {
        state.authStatus = "succeeded";
        state.data = action.payload;
        state.error = null;
      })
      .addCase(LoginUser.rejected, (state, action) => {
        state.authStatus = "failed";
        state.error = action.payload as string;
      });
  },
});

export const selectAuthUser = (state: { authuser: AuthState }) =>
  state.authuser;
export default authSlice.reducer;
