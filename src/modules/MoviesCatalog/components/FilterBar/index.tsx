// FilterBar.tsx
import { FC, FormEvent, ChangeEvent, useState } from 'react';

import classes from "./style.module.css";

import { useAppDispatch, useAppSelector } from "@/store";

import {useGetGenresQuery} from "@/modules/MoviesCatalog/api";
import {clearState , setSortBy , setGenres } from "@/modules/MoviesCatalog/store/searchSlice.ts";


const FilterBar: FC = () => {
    const dispatch = useAppDispatch();
    const { sortByList , sortBy } = useAppSelector(state => state.search);

    const [genre, setGenre] = useState<string>('');
    const [sortByLocal, setSortByLocal] = useState(sortBy);

    const getGenresQuery = useGetGenresQuery();

    function handleGenreChange(e: ChangeEvent<HTMLSelectElement>) {setGenre(e.target.value);}
    function handleSortChange(e: ChangeEvent<HTMLSelectElement>) {setSortByLocal(e.target.value);}

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        dispatch(clearState());

        dispatch(setGenres(genre));
        dispatch(setSortBy(sortByLocal));
    }

    function renderGenreOption() {
        return getGenresQuery.data?.genres.map((genre) => (
            <option key={genre.id} value={genre.id}>{genre.name}</option>
        ));
    }

    function renderSortOption() {
        return sortByList.map((sort) => (
            <option key={sort.by} value={sort.by}>{sort.name}</option>
        ));
    }

    return (
        <form className={classes.FilterBar} onSubmit={handleSubmit}>
            <select value={genre} onChange={handleGenreChange}>
                <option value="">Select Genre</option>
                {renderGenreOption()}
            </select>
            <select value={sortByLocal} onChange={handleSortChange}>
                <option value="">Sort By</option>
                {renderSortOption()}
            </select>
            <input type='submit' value='Apply' />
        </form>
    );
};

export default FilterBar;
