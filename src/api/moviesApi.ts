import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_KEY: string = import.meta.env.VITE_API_KEY;

export const MovieApi = createApi({
    reducerPath: 'moviesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_URL,
        prepareHeaders: (headers) => {
            headers.set('Authorization', `Bearer ${API_KEY}`);
            return headers;
        },
    }),

    endpoints: (builder) => ({
        createRequestToken: builder.query<string, void>({
            query: () => `authentication/token/new?api_key=${API_KEY}`,
            transformResponse: (response: { request_token: string }) => response.request_token,
        }),
        createSession: builder.mutation<string, string>({
            query: (requestToken) => ({
                url: `authentication/session/new?api_key=${API_KEY}`,
                method: 'POST',
                body: { request_token: requestToken },
            }),
            transformResponse: (response: { session_id: string }) => response.session_id,
        }),

    }),

});

export const {
    useCreateSessionMutation,
    useCreateRequestTokenQuery,
} = MovieApi;
