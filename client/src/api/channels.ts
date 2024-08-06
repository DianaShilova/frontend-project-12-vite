import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = import.meta.env.VITE_API_URL || '';

export const channelsApi = createApi({
  reducerPath: 'channelsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/api/v1/data`,
    prepareHeaders: (headers) => {
      headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getData: builder.query({
      query: () => '',
    }),
  }),
});
export const { useGetDataQuery } = channelsApi;
