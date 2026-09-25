import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../lib/baseQuery";

export const projectApi = createApi({
    reducerPath: "projectApi",
    refetchOnFocus: true,
    refetchOnReconnect: true,
    baseQuery: baseQueryWithReauth,
    tagTypes: ["projectApi"],
    endpoints: (builder) => ({
        createProject: builder.mutation({
            query: ({ data }) => ({
                url: "/project/createProject",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["projectApi"],
        }),
        seeAllProject: builder.query({
            query: () => "/project",
            providesTags: ["projectApi"],
        }),
        modifyProject: builder.mutation({
            query: ({ id, data }) => ({
                url: `/project/update/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["projectApi"],
        }),
        removeProject: builder.mutation({
            query: (id) => ({
                url: `/project/delete/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["projectApi"],
        }),
    }),
});

export const { useCreateProjectMutation, useSeeAllProjectQuery, useModifyProjectMutation, useRemoveProjectMutation } = projectApi;
