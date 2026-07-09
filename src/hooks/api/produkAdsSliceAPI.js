import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../lib/baseQuery';

export const adsAPI = createApi({
    reducerPath: 'adsAPI',
    refetchOnFocus: true,
    refetchOnReconnect: true,
    baseQuery: baseQueryWithReauth,
    tagTypes: ['adsAPI'],
    endpoints: (builder) => ({
        createAds: builder.mutation({
            query: ({ data }) => ({
                url: '/produk-ads/upload',
                method: 'POST',
                body: data,
            }),
        }),
        seeAllProdukAds: builder.query({
            query: ({ page = 1, limit = 10 } = {}) => `/produk-ads?page=${page}&limit=${limit}`,
            providesTags: ['adsAPI'],
        }),
    }),
});

export const { useCreateAdsMutation, useSeeAllProdukAdsQuery } = adsAPI;
