import { createSlice } from '@reduxjs/toolkit';
import { MovieResponseCard } from "@/types/MovieResponse";

const initialState = {
    movies: [] as MovieResponseCard[],
    page: 1,
};

export const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        setPage: (state, action) => {
            state.page = action.payload;
        },
        setMovies: (state, action) => {
            state.movies = action.payload;
        },
        resetPages: (state) => {
            state.page = 1
        }
    },
});

export const { setPage, setMovies ,resetPages } = moviesSlice.actions;
export default moviesSlice.reducer;
