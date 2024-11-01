// MoviesList.tsx
import { FC } from 'react';
import useAppSelector from "@/hooks/useAppSelector";
import { useDispatch } from "react-redux";
import classes from './style.module.css';
import { setPage } from "@/features/moviesSlice";
import MovieCard from "@/components/MovieCard";
import { useGetMoviesQuery } from "@/api/moviesApi.ts";

const MoviesList: FC = () => {
    const query = useAppSelector(state => state.search.query);
    const { sortBy, withGenres } = useAppSelector(state => state.filter);
    const page = useAppSelector(state => state.movies.page);
    const { data, isLoading, error } = useGetMoviesQuery({ query, sortBy, withGenres, page });
    const dispatch = useDispatch();

    const movies = data?.results || [];

    const handleNextBtnClick = () => {
        dispatch(setPage(page + 1));
    };

    const handlePrevBtnClick = () => {
        if (page > 1) {
            dispatch(setPage(page - 1));
        }
    };

    const renderMovieCard = () => {
        return movies.map(movie => (
            <MovieCard
                key={movie.id}
                id={movie.id}
                title={movie.title}
                posterUrl={movie.poster_path}
                rating={movie.vote_average}
                year={movie.release_date}
            />
        ));
    };

    return (
        <div className={classes.moviesList}>
            {isLoading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error loading movies</p>
            ) : (
                <>
                    <div className={classes.movies}>
                        {movies.length > 0 ? renderMovieCard() : 'No movies found'}
                    </div>

                    <div className={classes.pagination}>
                        <button onClick={handlePrevBtnClick} disabled={page <= 1}>
                            Prev
                        </button>
                        <span>Page {page}</span>
                        <button onClick={handleNextBtnClick} disabled={movies.length === 0}>
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default MoviesList;

