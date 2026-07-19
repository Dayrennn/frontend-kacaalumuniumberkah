import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../lib/baseQuery';

export const companyAPI = createApi({
    reducerPath: 'companyAPI',
    refetchOnFocus: true,
    refetchOnReconnect: true,
    baseQuery: baseQueryWithReauth,
    tagTypes: ['companyAPI'],
    endpoints: (builder) => ({
        seeAllAds: builder.query({
            query: () => '/company/ads',
            providesTags: ['companyAPI'],
        }),
        createCompany: builder.mutation({
            query: (data) => ({
                url: '/company/kelola-landing-page',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['companyAPI'],
        }),
        seeAllCompany: builder.query({
            query: () => '/company',
            providesTags: ['companyAPI'],
        }),
        createBanner: builder.mutation({
            query: (data) => ({
                url: '/company/upload',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['companyAPI'],
        }),
        seeAllBanner: builder.query({
            query: () => '/company/banner',
            providesTags: ['companyAPI'],
        }),
    }),
});

export const {
    useSeeAllAdsQuery,
    useCreateCompanyMutation,
    useSeeAllCompanyQuery,
    useCreateBannerMutation,
    useSeeAllBannerQuery,
} = companyAPI;
