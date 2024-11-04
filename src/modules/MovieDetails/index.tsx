import {FC} from 'react'
import Image from "@/shared/UI/Image";

import Genres from "./components/Genres";
import Cast from "./components/Cast";
import OverViewInfo from "./components/OverViewInfo";
import AddOrRemoveFromFavorites from "./components/AddOrRemoveFromFavorites";
import Rating from "./components/Rating";

import { useGetMovieByIDQuery } from "./api";
import classes from "./style/index.module.css";

interface MovieDetailsProps {
    sessionId: string | undefined;
    accountId: string | undefined;
    movieId: number;
}


const MovieDetails: FC<MovieDetailsProps> = ( {sessionId = '' , movieId , accountId = ''} ) => {
    const { data: movieDetails , isError , isLoading , isSuccess } = useGetMovieByIDQuery({id: movieId});


    return (
        <>
            {isError && 'Some kind of error occurred'}
            {isLoading && 'Loading ....'}
            {
                isSuccess && <div className={classes.movieDetails}>
                    <div className={classes.rightSide}>
                        <div className={classes.imageContainer}>
                            <Image src={movieDetails.poster_path} alt={`${movieDetails.title} poster`}/>
                        </div>
                        <Genres genres={movieDetails.genres}/>
                        <Cast id={movieDetails.id}/>
                    </div>
                    <div className={classes.leftSide}>
                        <OverViewInfo
                            title={movieDetails.title}
                            overview={movieDetails.overview}
                            vote_average={movieDetails.vote_average}
                        />
                        <AddOrRemoveFromFavorites movieId={movieId} accountId={accountId} sessionId={sessionId} movie={movieDetails} />
                        <Rating movieId={movieDetails.id} sessionId={sessionId} />
                    </div>
                </div>
            }
        </>
    )
};

export default MovieDetails;






