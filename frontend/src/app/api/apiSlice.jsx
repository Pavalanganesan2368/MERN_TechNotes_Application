import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials } from "../../Features/Auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://mern-technotes-app.onrender.com',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  }
})

const baseQueryWithReAuth = async (args, api, extraOptions) => {

  let result = await baseQuery(args, api, extraOptions);
  // console.log(result);
  if (result?.error?.status === 403) {
    console.log("Sending Refresh Token");

    const refreshResult = await baseQuery('/auth/refresh', api, extraOptions);
    if (refreshResult?.data) {
      api.dispatch(setCredentials({ ...refreshResult.data }));
      result = await baseQuery(args, api, extraOptions);
    } else {
      if (refreshResult?.error?.status === 403) refreshResult.error.data.message = "Your Login has Expired.";
      return refreshResult;
    }
  }

  return result;
}

export const apiSlice = createApi({
  baseQuery: baseQueryWithReAuth,
  tagTypes: ['Note', 'User'],
  endpoints: builder => ({})
})