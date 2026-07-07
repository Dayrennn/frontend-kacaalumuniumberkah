import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../lib/baseQuery';

export const mutasiAPI = createApi({
    reducerPath: 'mutasiAPI',
    refetchOnFocus: true,
    refetchOnReconnect: true,
    baseQuery: baseQueryWithReauth,
    tagTypes: ['mutasiAPI'],
    endpoints: (builder) => ({
        addBarangMasuk: builder.mutation({
            query: ({ data }) => ({
                url: '/mutasi/create/masuk',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['mutasiAPI'],
        }),
        seeAllMutasiMasuk: builder.query({
            query: () => '/mutasi/masuk',
            providesTags: ['mutasiAPI'],
        }),
        seeMutasiMasukByBarang: builder.query({
            query: ({ barangId }) => `/mutasi/masuk/${barangId}`,
            providesTags: ['mutasiAPI'],
        }),
    }),
});

export const { useAddBarangMasukMutation, useSeeAllMutasiMasukQuery, useSeeMutasiMasukByBarangQuery } = mutasiAPI;
