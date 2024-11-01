// FilterBar.tsx
import { FC, FormEvent, ChangeEvent, useState } from 'react';
import classes from "./style.module.css";
import { useGetGenresQuery } from "@/api/moviesApi";
import { useDispatch } from "react-redux";
import useAppSelector from "@/hooks/useAppSelector.ts";
import { setGenres, addSortBy } from "@/features/filterSlice.ts";
import { clearSearchQuery } from "@/features/searchSlice.ts";
import { resetPages } from "@/features/moviesSlice.ts";

const FilterBar: FC = () => {
    const dispatch = useDispatch();
    const { sortByList } = useAppSelector(state => state.filter);
    const [genre, setGenre] = useState<string>('');
    const [sortBy, setSortBy] = useState('');
    const getGenresQuery = useGetGenresQuery();

    function handleGenreChange(e: ChangeEvent<HTMLSelectElement>) {
        setGenre(e.target.value);
    }

    function handleSortChange(e: ChangeEvent<HTMLSelectElement>) {
        setSortBy(e.target.value);
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        dispatch(clearSearchQuery());
        dispatch(resetPages());
        dispatch(setGenres(genre));
        dispatch(addSortBy(sortBy));
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
            <select value={sortBy} onChange={handleSortChange}>
                <option value="">Sort By</option>
                {renderSortOption()}
            </select>
            <input type='submit' value='Apply' />
        </form>
    );
};

export default FilterBar;
