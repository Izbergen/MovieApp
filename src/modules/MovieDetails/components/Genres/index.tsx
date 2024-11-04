import { FC } from "react";
import classes from './style.module.css'

import IGenre from '@/shared/types/IGenre.ts'


interface GenresProps {
    genres: IGenre[];
}

function renderGenres(genres: IGenre[]) {
    return (
        genres.map((genre) => (
            <li key={genre.id} className={classes.genresItem}>
               <div className={classes.genre}>
                   {genre.name}
               </div>
            </li>
        ))
    );
}

const Genres: FC<GenresProps> = ({ genres }) => {
    return (
        <ul className={classes.genres}>
            {renderGenres(genres)}
        </ul>
    );
};

export default Genres;
