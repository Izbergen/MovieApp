import { FC } from 'react'
import classes from "./style/index.module.css";
import SearchBar from "./components/SearchBar";
import FilterBar from "./components/FilterBar";
import MoviesList from "./components/MoviesList";

const MoviesCatalog: FC = () => {

    return (
        <div className={classes.moviesCatalog}>
            <div className={classes.searchBarWrapper}>
                <SearchBar/>
            </div>
            <div className={classes.contentWrapper}>
                <FilterBar/>
                <MoviesList/>
            </div>
        </div>
    )
}

export default MoviesCatalog;