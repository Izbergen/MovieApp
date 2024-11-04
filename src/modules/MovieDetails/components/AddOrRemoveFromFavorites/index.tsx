import { FC } from 'react';
import { useAppDispatch , useAppSelector} from "@/store";
import { addToFavorites, removeFromFavorites } from '@/features/favoritesSlice.ts';
import classes from "./style.module.css";
import {MovieResponseCard} from "@/shared/types/MovieResponse.ts";

interface AddOrRemoveFromFavoritesProps {
    sessionId: string;
    accountId: string;
    movieId: number;
    movie: MovieResponseCard
}

const AddOrRemoveFromFavorites: FC<AddOrRemoveFromFavoritesProps> = ({ sessionId, accountId, movieId , movie }) => {
    const dispatch = useAppDispatch();
    const favorites = useAppSelector((state) => state.favorites.favorites);
    const isFavorite = favorites.some(favorite => favorite.id === movieId);

    const handleAddToFavorites = () => {
        dispatch(addToFavorites({ sessionId, accountId, movie}));
    };

    const handleRemoveFromFavorites = () => {
        dispatch(removeFromFavorites({ sessionId, accountId, movieId }));
    };

    return (
        <div className={classes.btnWrapper}>
            {!isFavorite ? (
                <button className={classes.addToFav} onClick={handleAddToFavorites}>
                    Add to Favorites
                </button>
            ) : (
                <button className={classes.removeFromFav} onClick={handleRemoveFromFavorites}>
                    Remove From Favorites
                </button>
            )}
        </div>
    );
};

export default AddOrRemoveFromFavorites;
