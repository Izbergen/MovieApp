import {FC} from "react";
import classes from "./style.module.css";

interface OverViewInfoProps {
    title: string;
    overview: string;
    vote_average: number,
}

const OverViewInfo: FC<OverViewInfoProps> = ({title , overview , vote_average}) => {
    return (
        <div className={classes.overViewInfo}>
            <h1 className={classes.title}>
                {title}
            </h1>
            <div className={classes.overview}>{overview}</div>
            <div className={classes.vote}>Vote Average : {vote_average}</div>
        </div>
    )
}

export default OverViewInfo;