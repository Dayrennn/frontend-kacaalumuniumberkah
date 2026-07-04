import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../lib/baseQuery';

export const barangAPI = createApi({
    reducerPath: 'barangAPI',
    refetchOnFocus: true,
    refetchOnReconnect: true,
    baseQuery: baseQueryWithReauth,
    tagTypes: ['barangAPI'],
    endpoints: (builder) => ({
        createBarang: builder.mutation({
            query: ({ data }) => ({
                url: '/barang/create',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['barangAPI'],
        }),
        seeAllBarang: builder.query({
            query: () => '/barang',
            providesTags: ['barangAPI'],
        }),
    }),
});

export const { useCreateBarangMutation, useSeeAllBarangQuery } = barangAPI;
