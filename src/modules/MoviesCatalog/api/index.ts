import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MoviesResponse } from "@/shared/types/MovieResponse.ts";
import {SearchMoviesQuery} from "@/shared/types/RequestQuery.ts";

const API_KEY: string = import.meta.env.VITE_API_KEY;

export const catalogApi = createApi({
    reducerPath: 'catalogApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_URL,
        prepareHeaders: (headers) => {
            headers.set('Authorization', `Bearer ${API_KEY}`);
            return headers;
        },
    }),

    endpoints: (builder) => ({
        getMovies: builder.query<MoviesResponse, SearchMoviesQuery>({
            query: ({ page = 1, sortBy = 'popularity.desc', withGenres = '', query = '' }) => {
                const isSearch = query !== '';
                return {
                    url: isSearch ? 'search/movie' : 'discover/movie',
                    params: {
                        page,
                        ...(isSearch ? {} : { sort_by: sortBy, with_genres: withGenres }),
                        query: isSearch ? query : undefined,
                    },
                };
            },
        }),

        getGenres: builder.query<{ genres: { id: number; name: string }[] }, void>({
            query: () => ({
                url: 'genre/movie/list',
            }),
        }),
    }),

});

export const {
    useGetMoviesQuery,
    useGetGenresQuery,
} = catalogApi;