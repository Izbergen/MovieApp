// SearchBar.tsx
import { FC, useState } from 'react';
import { useDispatch } from "react-redux";
import classes from "./style.module.css";
import {clearState, setQuery} from "@/modules/MoviesCatalog/store/searchSlice.ts";


const SearchBar: FC = () => {
    const [searchName, setSearchName] = useState('');
    const dispatch = useDispatch();

    const handleSearch = () => {
        dispatch(clearState());
        dispatch(setQuery(searchName));
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
