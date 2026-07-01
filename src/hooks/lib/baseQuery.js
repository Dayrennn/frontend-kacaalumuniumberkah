import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import BACKEND_URL from './backendUrl';

const baseQuery = fetchBaseQuery({
    baseUrl: BACKEND_URL,
    prepareHeaders: (headers, { getState }) => {
        const token =
            getState().auth.token ||
            (typeof window !== 'undefined' ? localStorage.getItem('token') : null);

        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

export const baseQueryWithReauth = async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);

    if (result.error?.status === 401 || result.error?.status === 403) {
        // opsional: bersihkan state auth dulu
        api.dispatch({ type: 'auth/logout' });

        if (typeof window !== 'undefined') {
            window.location.href = '/login';
        }
    }

    return result;
};