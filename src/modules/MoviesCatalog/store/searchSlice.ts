import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchState {
    query: string;
    sortBy: string,
    withGenres: string,
    sortByList : Array<{by: string , name: string}>
    page: number,
}

const initialState: SearchState = {
    query: '',
    page: 1,
    sortBy: 'popularity.desc',
    withGenres : '',
    sortByList: [
        { by: 'popularity.desc', name: 'Popularity descending' },
        { by: 'popularity.asc', name: 'Popularity ascending' },
        { by: 'primary_release_date.desc', name: 'Release date descending' },
        { by: 'vote_average.desc', name: 'Vote average descending' },
    ]
};

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        clearState: (state) => {
            state.query = '';
            state.sortBy = 'popularity.desc';
            state.withGenres = '';
            state.page = 1;
        },
        setQuery: (state, action: PayloadAction<string>) => {
            state.query = action.payload;
        },
        setPage: (state, action) => {
            state.page = action.payload;
        },
        setSortBy: (state, action: PayloadAction<string>) => {
            state.sortBy = action.payload;
        },
        setGenres: (state, action: PayloadAction<string>) => {
            state.withGenres = action.payload;
        },
    }
});

// Экспортируем action для использования в компонентах
export const { setQuery , setPage , setSortBy , setGenres , clearState } = searchSlice.actions;
export default searchSlice.reducer;
