import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../lib/baseQuery';
import { barangAPI } from './barangSliceAPI';

export const mutasiAPI = createApi({
    reducerPath: 'mutasiAPI',
    refetchOnFocus: true,
    refetchOnReconnect: true,
    baseQuery: baseQueryWithReauth,
    tagTypes: ['mutasiAPI', 'barangAPI'],
    endpoints: (builder) => ({
        // barang masuk
        addBarangMasuk: builder.mutation({
            query: ({ data }) => ({
                url: '/mutasi/create/masuk',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['mutasiAPI'],
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(barangAPI.util.invalidateTags(['barangAPI']));
                } catch {
                    // gak perlu invalidate kalau mutation gagal
                }
            },
        }),
        seeAllMutasiMasuk: builder.query({
            query: ({ startDate, endDate } = {}) => {
                const params = new URLSearchParams();
                if (startDate) params.append('startDate', startDate);
                if (endDate) params.append('endDate', endDate);

                const queryString = params.toString();
                return `/mutasi/masuk${queryString ? `?${queryString}` : ''}`;
            },
            providesTags: ['mutasiAPI'],
        }),
        seeMutasiMasukByBarang: builder.query({
            query: ({ barangId }) => `/mutasi/masuk/${barangId}`,
            providesTags: ['mutasiAPI'],
        }),
        addBarangKeluar: builder.mutation({
            query: ({ data }) => ({
                url: '/mutasi/create/keluar',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['mutasiAPI'],
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(barangAPI.util.invalidateTags(['barangAPI']));
                } catch {
                    // gak perlu invalidate kalau mutation gagal
                }
            },
        }),
        seeAllMutasiKeluar: builder.query({
            query: ({ startDate, endDate } = {}) => {
                const params = new URLSearchParams();
                if (startDate) params.append('startDate', startDate);
                if (endDate) params.append('endDate', endDate);

                const queryString = params.toString();
                return `/mutasi/keluar${queryString ? `?${queryString}` : ''}`;
            },
            providesTags: ['mutasiAPI'],
        }),
    }),
});

export const {
    useAddBarangMasukMutation,
    useSeeAllMutasiMasukQuery,
    useSeeMutasiMasukByBarangQuery,
    useAddBarangKeluarMutation,
    useSeeAllMutasiKeluarQuery,
} = mutasiAPI;
