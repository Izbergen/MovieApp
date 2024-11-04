import { FC } from "react";
import {useAppSelector} from "@/store";
import MovieCard from "@/shared/UI/MovieCard";
import classes from "./style.module.css";


const FavoritesPage: FC = () => {
    const favorites = useAppSelector(state => state.favorites.favorites)
    return (
        <div className={'container'}>
            <h1 className={classes.title}>Избранные фильмы</h1>
            <div className={classes.content}>
                {
                    favorites.map(favorite => (
                        <MovieCard
                            key={favorite.id}
                            title={favorite.title}
                            posterUrl={favorite.poster_path}
                            rating={favorite.vote_average}
                            year={favorite.release_date}
                            id={favorite.id} ></MovieCard>
                    ))
                }
            </div>

        </div>
    );
}

export default FavoritesPage;
