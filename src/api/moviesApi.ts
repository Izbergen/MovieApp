import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MoviesResponse } from "./../types/MovieResponse.ts";
import {MovieDetail} from "@/types/MovieDetail.ts";

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
        addToFavorites: builder.mutation<any, { sessionId: string; accountId: string; movieId: number }>({
            query: ({ sessionId, accountId, movieId }) => ({
                url: `account/${accountId}/favorite?api_key=${API_KEY}&session_id=${sessionId}`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Убедитесь, что заголовок установлен
                },
                body: JSON.stringify({ // Убедитесь, что тело запроса сериализовано
                    media_type: 'movie',
                    media_id: movieId,
                    favorite: true,
                }),
            }),
        }),

        getMovies: builder.query<MoviesResponse, { page?: number; sortBy?: string; withGenres?: string , query?: string }>({
            query: ({ page = 1, sortBy = 'popularity.desc', withGenres = '', query = '' }) => ({
                url: query !== '' ? 'search/movie' : 'discover/movie',
                params: {
                    page,
                    sort_by: query === '' ? sortBy : undefined,
                    with_genres: query === '' ? withGenres : undefined,
                    query: query || undefined,
                },
            }),
        }),
        getMovieByID: builder.query<MovieDetail, { id: number }>({
            query: ({ id }) => ({
                url: `/movie/${id}`,
            }),
        }),
        getGenres: builder.query<{ genres: { id: number; name: string }[] }, void>({
            query: () => ({
                url: 'genre/movie/list',
            }),
        }),
        getFavoriteMovies: builder.query<MoviesResponse, { accountId: number; sessionId: string; page?: number }>({
            query: ({ accountId, sessionId, page = 1 }) => ({
                url: `account/${accountId}/favorite/movies`,
                params: {
                    page,
                    session_id: sessionId,
                    sort_by: 'created_at.asc',
                },
            }),
        }),
    }),

});

export const {
    useGetMoviesQuery,
    useGetMovieByIDQuery,
    useGetGenresQuery,
    useCreateSessionMutation,
    useCreateRequestTokenQuery,
    useAddToFavoritesMutation,
    useGetFavoriteMoviesQuery
} = MovieApi;
