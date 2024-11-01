import {FC} from "react";
import classes from "./style.module.css";
import {Link} from "react-router-dom";
interface MovieCardProps {
    id: number;
    posterUrl: string;
    title: string;
    rating: number;
    year: string;

}

const MovieCard: FC<MovieCardProps> = ({id,  posterUrl , year , rating , title }) => {
    const baseImageUrl = "https://image.tmdb.org/t/p/w500";

    return (
        <div className={classes.movieCard}>
            <div className={classes.imageContainer}>
                <img src={`${baseImageUrl}${posterUrl}`} alt={title} />
            </div>
            <div className={classes.content}>
                <div>
                    <Link className={classes.title} to={`/movie/${id}`}>{title}</Link>
                </div>
                <div>{rating}</div>
                <div>{year}</div>
            </div>
        </div>
    )
}
export default MovieCard;