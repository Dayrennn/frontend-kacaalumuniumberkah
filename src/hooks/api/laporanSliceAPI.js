import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../lib/baseQuery';

export const laporanAPI = createApi({
    reducerPath: 'laporanAPI',
    refetchOnFocus: true,
    refetchOnReconnect: true,
    baseQuery: baseQueryWithReauth,
    tagTypes: ['laporanAPI'],
    endpoints: (builder) => ({
        printLaporanMasuk: builder.query({
            query: ({ startDate, endDate }) => {
                const params = new URLSearchParams();
                if (startDate) params.append('startDate', startDate);
                if (endDate) params.append('endDate', endDate);

                return {
                    url: `/laporan/masuk/pdf?${params.toString()}`,
                    method: 'GET',
                    responseHandler: (response) => response.blob(),
                };
            },
        }),
        printLaporanKeluar: builder.query({
            query: ({ startDate, endDate }) => {
                const params = new URLSearchParams();
                if (startDate) params.append('startDate', startDate);
                if (endDate) params.append('endDate', endDate);

                return {
                    url: `/laporan/keluar/pdf?${params.toString()}`,
                    method: 'GET',
                    responseHandler: (response) => response.blob(),
                };
            },
        }),
    }),
});

export const { useLazyPrintLaporanKeluarQuery, useLazyPrintLaporanMasukQuery } = laporanAPI;
