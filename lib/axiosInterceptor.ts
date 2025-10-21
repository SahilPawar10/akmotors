/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { InternalAxiosRequestConfig, AxiosError } from "axios";
import { jwtDecode } from "jwt-decode";

// Define JWT payload type
interface JwtPayload {
  exp: number; // expiration timestamp in seconds
  [key: string]: any;
}

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/v1", // local server
});

axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const access_token = localStorage.getItem("access_token");
    const refresh_token = localStorage.getItem("refresh_token");

    if (access_token && config.headers) {
      const decoded: JwtPayload = jwtDecode(access_token);
      console.log(decoded.exp, "expiry");

      if (Date.now() >= decoded.exp * 1000) {
        // Token expired
        localStorage.clear();

        if (refresh_token) {
          // Redirect to login
          window.location.href = "/";
          localStorage.clear();

          // Optional: refresh token flow (uncomment if needed)
          /*
          try {
            const response = await axios.post(
              'http://localhost:3000/v1/auth/refresh-tokens',
              { refreshToken: refresh_token }
            );
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            config.headers['Authorization'] = `Bearer ${response.data.access}`;
          } catch (err) {
            console.error(err);
          }
          */
        }
      } else {
        config.headers["Authorization"] = `Bearer ${access_token}`;
      }
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    // Do something with the response data
    return response;
  },
  (error: AxiosError) => {
    if (error.response && error.response.status === 401) {
      // Redirect to login page if user is unauthorized
      // window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
