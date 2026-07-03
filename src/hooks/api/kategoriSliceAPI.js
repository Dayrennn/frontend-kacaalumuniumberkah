import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../lib/baseQuery';

export const kategoriAPI = createApi({
    reducerPath: 'kategoriAPI',
    refetchOnFocus: true,
    refetchOnReconnect: true,
    baseQuery: baseQueryWithReauth,
    tagTypes: ['kategoriAPI'],
    endpoints: (builder) => ({
        createKategori: builder.mutation({
            query: ({ data }) => ({
                url: '/kategori/create',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['kategoriAPI'],
        }),
        modifyKategori: builder.mutation({
            query: ({ id, data }) => ({
                url: `/kategori/update/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['kategoriAPI'],
        }),
        seeAllKategori: builder.query({
            query: () => '/kategori',
            providesTags: ['kategoriAPI'],
        }),
        removeKategori: builder.mutation({
            query: ({ id, data }) => ({
                url: `/kategori/delete/${id}`,
                method: 'DELETE',
                body: data,
            }),
            invalidatesTags: ['kategoriAPI'],
        }),
    }),
});

export const {
    useCreateKategoriMutation,
    useModifyKategoriMutation,
    useSeeAllKategoriQuery,
    useRemoveKategoriMutation,
} = kategoriAPI;
