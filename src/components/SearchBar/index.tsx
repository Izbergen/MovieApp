// SearchBar.tsx
import { FC, useState } from 'react';
import { useDispatch } from "react-redux";
import classes from "./style.module.css";
import {clearFilter} from '@/features/filterSlice.ts'
import { setSearchQuery } from "@/features/searchSlice.ts";
import { resetPages } from "@/features/moviesSlice.ts";

const SearchBar: FC = () => {
    const [searchName, setSearchName] = useState('');
    const dispatch = useDispatch();

    const handleSearch = () => {
        dispatch(clearFilter());
        dispatch(resetPages());
        dispatch(setSearchQuery(searchName));
    };

    return (
        <div className={classes.searchBar}>
            <input
                type="text"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                placeholder="Search for a movie..."
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
};

export default SearchBar;
