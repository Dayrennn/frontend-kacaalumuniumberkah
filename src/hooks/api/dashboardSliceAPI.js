import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../lib/baseQuery';

export const dashboardAPI = createApi({
    reducerPath: 'dashboardAPI',
    refetchOnFocus: true,
    refetchOnReconnect: true,
    baseQuery: baseQueryWithReauth,
    tagTypes: ['dashboardAPI'],
    endpoints: (builder) => ({
        totalBarang: builder.query({
            query: () => '/dashboard/total-barang',
            providesTags: ['dashboardAPI'],
        }),
        stokTipis: builder.query({
            query: () => '/dashboard/stok-tipis',
            providesTags: ['dashboardAPI'],
        }),
        barangKeluarHariIni: builder.query({
            query: () => '/dashboard/barang-keluar',
            providesTags: ['dashboardAPI'],
        }),
        barangMasukHariIni: builder.query({
            query: () => '/dashboard/barang-masuk',
            providesTags: ['dashboardAPI'],
        }),
    }),
});

export const { useTotalBarangQuery, useStokTipisQuery, useBarangKeluarHariIniQuery, useBarangMasukHariIniQuery } =
    dashboardAPI;
