import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const thunks = createApi({
  reducerPath: "thunksAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com" }),
  endpoints: (builder) => ({
    getCurrentUser: builder.query<any, any>({
      query: () => `/users/search?q=John`,
    }),
  }),
});

export const { useGetCurrentUserQuery } = thunks;
