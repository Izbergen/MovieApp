import {FC} from "react";
import {useGetMovieCreditsQuery} from './../../api'
import {ICastMember} from "@/shared/types/IMovieCast.ts";
import classes from "./style.module.css";

interface CastProps {
    id: number
}


function renderCastMember(castMembers: ICastMember[] ){
    return (
        castMembers.map(castMember => (
            <li key={castMember.id} className={classes.castItem}>
                <div className={classes.castMember}>
                    <div className={classes.wrapper}><span className={classes.highlight}>Name:</span> {castMember.name}</div>
                    <div className={classes.wrapper}> <span className={classes.highlight}>Character:</span>{castMember.character}</div>
                </div>
            </li>
        ))
    )
}



const Cast: FC<CastProps> = ({id = 0}) => {
    const {data , isSuccess , isError , isLoading} = useGetMovieCreditsQuery(id)

    return (
        <>
            {isError && 'Some kind of Error occurred'}
            {isLoading && 'Loading ...'}
            {
                isSuccess &&
                <ul className={classes.cast}>
                    {renderCastMember(data.cast)}
                </ul>
            }
        </>
    );
}

export default Cast;