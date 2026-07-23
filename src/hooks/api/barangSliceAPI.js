import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../lib/baseQuery';
import { dashboardAPI } from './dashboardSliceAPI';

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
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(dashboardAPI.util.invalidateTags(['dashboardAPI']));
                } catch {
                    // gak perlu invalidate kalau mutation gagal
                }
            },
        }),
        seeAllBarang: builder.query({
            query: () => '/barang',
            providesTags: ['barangAPI'],
        }),
        modifyBarang: builder.mutation({
            query: ({ id, data }) => ({
                url: `/barang/update/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['barangAPI'],
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(dashboardAPI.util.invalidateTags(['dashboardAPI']));
                } catch {
                    // gak perlu invalidate kalau mutation gagal
                }
            },
        }),
        removeBarang: builder.mutation({
            query: ({ id, data }) => ({
                url: `/barang/delete/${id}`,
                method: 'DELETE',
                body: data,
            }),
            invalidatesTags: ['barangAPI'],
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(dashboardAPI.util.invalidateTags(['dashboardAPI']));
                } catch {
                    // gak perlu invalidate kalau mutation gagal
                }
            },
        }),
        seeBarangAktif: builder.query({
            query: () => '/barang/aktif',
            providesTags: ['barangAPI'],
        }),
    }),
});

export const {
    useCreateBarangMutation,
    useSeeAllBarangQuery,
    useModifyBarangMutation,
    useRemoveBarangMutation,
    useSeeBarangAktifQuery,
} = barangAPI;
