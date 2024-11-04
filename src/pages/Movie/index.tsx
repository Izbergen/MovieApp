import {FC} from "react";
import { useParams } from "react-router-dom";
import MovieDetails from "@/modules/MovieDetails";

const MoviePage: FC = () => {
    const params = useParams<{ id: string }>();

    const sessionId =  localStorage.getItem('sessionId');
    const accountId = localStorage.getItem('accountId');
    const movieId = Number(params.id);

    return (
        <div className={'container'}>
            <MovieDetails sessionId={sessionId ? sessionId : ''} accountId={accountId ? accountId : ''} movieId={movieId} />
        </div>
    );
};

export default MoviePage;
