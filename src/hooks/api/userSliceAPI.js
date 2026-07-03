import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../lib/baseQuery';

export const userAPI = createApi({
    reducerPath: 'userAPI',
    refetchOnFocus: true,
    refetchOnReconnect: true,
    baseQuery: baseQueryWithReauth,
    tagTypes: ['userAPI'],
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials,
            }),
            invalidatesTags: ['userAPI'],
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
            }),
            invalidatesTags: ['userAPI'],
        }),
        getMe: builder.query({
            query: () => '/auth/me',
            providesTags: ['userAPI'],
        }),
    }),
});

export const { useLoginMutation, useLogoutMutation, useGetMeQuery } = userAPI;
