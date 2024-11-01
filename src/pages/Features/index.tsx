import { FC } from "react";
import useAppSelector from "@/hooks/useAppSelector.ts";
import MovieCard from "@/components/MovieCard";

const FeaturesPage: FC = () => {
    const { features } = useAppSelector(state => state.features);

    return (
        <div className={'container'}>
            <h2>Избранные фильмы</h2>
            {features && features.length > 0 ? (
                <ul>
                    {features.map(movie => (
                        <MovieCard key={movie.id} title={movie.title} id={movie.id} rating={movie.vote_average} posterUrl={movie.poster_path} year={movie.release_date} />
                    ))}
                </ul>
            ) : (
                <p>У вас нет избранных фильмов.</p>
            )}
        </div>
    );
}

export default FeaturesPage;
