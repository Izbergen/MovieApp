import {FC} from "react";
import { useParams } from "react-router-dom";
import {useGetMovieByIDQuery} from "@/api/moviesApi.ts";
import MovieDetailCard from "@/components/MovieDetailCard";
import useAppSelector from "@/hooks/useAppSelector.ts";

const MoviePage: FC = () => {
    const params = useParams<{ id: string }>();
    const {sessionId , accountId} = useAppSelector(state => state.session)
    const movieId = Number(params.id);

    const { data, error, isLoading } = useGetMovieByIDQuery({ id: movieId });

    return (
        <div className={'container'}>
            {error && <div>Error ....</div>}
            {isLoading && <div>Loading ...</div>}

            {data && (
                <MovieDetailCard
                    poster_path={data.poster_path}
                    id={data.id} title={data.title}
                    overview={data.overview}
                    genres={data.genres}
                    vote_average={data.vote_average}
                    release_date={data.release_date}
                    accountId={accountId ? accountId : ''}
                    sessionId={sessionId ? sessionId : ''}
                />
            )}
        </div>
    );
};

export default MoviePage;
