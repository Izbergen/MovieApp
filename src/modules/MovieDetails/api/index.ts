import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {MovieDetail} from "@/shared/types/MovieDetail.ts";
import {IMovieCast} from "@/shared/types/IMovieCast.ts";

const API_KEY: string = import.meta.env.VITE_API_KEY;

export const movieDetailApi = createApi({
    reducerPath: 'movieDetailApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_URL,
        prepareHeaders: (headers) => {
            headers.set('Authorization', `Bearer ${API_KEY}`);
            return headers;
        },
    }),

    endpoints: (builder) => ({

        getMovieCredits: builder.query<IMovieCast, number>({
            query: (movieId) => `movie/${movieId}/credits?api_key=${API_KEY}`,
        }),

        getMovieByID: builder.query<MovieDetail, { id: number }>({
            query: ({ id }) => ({
                url: `/movie/${id}`,
            }),
        }),
        checkRating: builder.query<number | null, { sessionId: string; movieId: number }>({
            query: ({ sessionId, movieId }) => ({
                url: `/movie/${movieId}/account_states?session_id=${sessionId}`,
                headers: {
                    Authorization: `Bearer ${API_KEY}`,
                },
            }),
            transformResponse: (response: any) => response.rated?.value || null,
        }),
        addRating: builder.mutation<void, { sessionId: string; movieId: number; rating: number }>({
            query: ({ sessionId, movieId, rating }) => ({
                url: `/movie/${movieId}/rating?session_id=${sessionId}`,
                method: "POST",
                headers: {
                    Authorization: `Bearer ${API_KEY}`,
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: {
                    value: rating,
                },
            }),
        }),
        removeRating: builder.mutation<void, { sessionId: string; movieId: number }>({
            query: ({ sessionId, movieId }) => ({
                url: `/movie/${movieId}/rating?session_id=${sessionId}`,
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${API_KEY}`,
                    'Content-Type': 'application/json;charset=utf-8',
                },
            }),
        }),


    }),
});

export const {
    useGetMovieByIDQuery,
    useGetMovieCreditsQuery,
    useCheckRatingQuery,
    useAddRatingMutation,
    useRemoveRatingMutation,
} = movieDetailApi;
