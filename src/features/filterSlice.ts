import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
    sortBy: string,
    withGenres: string,
    sortByList : Array<{by: string , name: string}>
}

const initialState: FilterState = {
    sortBy: 'popularity.desc',
    withGenres : '',
    sortByList: [
        { by: 'popularity.desc', name: 'Popularity descending' },
        { by: 'popularity.asc', name: 'Popularity ascending' },
        { by: 'primary_release_date.desc', name: 'Release date descending' },
        { by: 'vote_average.desc', name: 'Vote average descending' },
    ]
};



const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        addSortBy: (state, action: PayloadAction<string>) => {
            state.sortBy = action.payload;
        },
        setGenres: (state, action: PayloadAction<string>) => {
            state.withGenres = action.payload;
        },
        clearFilter: (state) => {
            state.sortBy = 'popularity.desc';
            state.withGenres = '';
        }

    }
});

// Экспортируем action для использования в компонентах
export const { addSortBy ,setGenres ,clearFilter } = filterSlice.actions;
export default filterSlice.reducer;
