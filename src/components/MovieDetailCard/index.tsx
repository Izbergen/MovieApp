import { FC, useState } from "react";
import { MovieDetail } from "@/types/MovieDetail.ts";
import { useAddToFavoritesMutation } from "@/api/moviesApi";
import {useDispatch} from "react-redux";
import {addToFeatures} from "@/features/featuresSlice.ts"; // Подключаем мутацию добавления в избранное

const ratingOptions: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const MovieDetailCard: FC<MovieDetail & { sessionId: string; accountId: string }> =
    ({
         poster_path,
         title,
         overview,
         genres,
         vote_average,
         id,
         sessionId,
         accountId,
        release_date
    }) => {
    const baseImageUrl = "https://image.tmdb.org/t/p/w500";
    const [rating, setRating] = useState<number>(vote_average || 0);
    const [addToFavorites] = useAddToFavoritesMutation();
    const dispatch = useDispatch();

    function renderGenres() {
        return genres.map(genre => (
            <li key={genre.id}>
                <div className="genre">{genre.name}</div>
            </li>
        ));
    }

    function renderOptions() {
        return ratingOptions.map(option => (
            <option key={option} value={option}>{option}</option>
        ));
    }

    async function handleAddFeatures() {
        try {
            await addToFavorites({ sessionId, accountId, movieId: id });
            dispatch(addToFeatures({
                id,
                title,
                poster_path,
                vote_average,
                release_date

        }))
            alert(`${title} добавлен в избранное!`);
        } catch (error) {
            console.error("Ошибка при добавлении в избранное:", error);
        }
    }

    function handleSetRating() {
        alert(`Ваш рейтинг для фильма "${title}": ${rating}`);
    }

    return (
        <div className="movieDetail">
            <div className="rightSide">
                <div className="imageContainer">
                    <img src={`${baseImageUrl}${poster_path}`} alt={`${title} poster`} />
                </div>
                <ul className="genres">
                    {renderGenres()}
                </ul>
            </div>
            <div className="leftSide">
                <h1>{title}</h1>
                <div>Рейтинг TMDB: {vote_average}</div>
                <p>{overview}</p>

                <button type="button" onClick={handleAddFeatures}>Добавить в избранное</button>

                <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
                    {renderOptions()}
                </select>
                <button type="button" onClick={handleSetRating}>Установить рейтинг</button>
            </div>
        </div>
    );
}

export default MovieDetailCard;
