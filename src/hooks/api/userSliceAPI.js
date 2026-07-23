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
        createUser: builder.mutation({
            query: ({ data }) => ({
                url: '/auth/create',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['userAPI'],
        }),
        seeAllUser: builder.query({
            query: () => '/auth/all-user',
            providesTags: ['userAPI'],
        }),
        modifyUser: builder.mutation({
            query: ({ id, data }) => ({
                url: `/auth/update/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['userAPI'],
        }),
        removeUser: builder.mutation({
            query: ({ id, data }) => ({
                url: `/auth/delete/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['userAPI'],
        }),
    }),
});

export const {
    useLoginMutation,
    useLogoutMutation,
    useGetMeQuery,
    useCreateUserMutation,
    useSeeAllUserQuery,
    useModifyUserMutation,
    useRemoveUserMutation,
} = userAPI;
