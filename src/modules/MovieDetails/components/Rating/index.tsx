import { FC ,useState } from 'react';
import { useAddRatingMutation, useCheckRatingQuery, useRemoveRatingMutation } from './../../api';
import classes from './style.module.css';

interface RatingProps {
    sessionId: string;
    movieId: number;
}
const ratingOptions: Array<number> = [1,2,3,4,5,6,7,8,9,10];
function renderRatingOption() {
    return ratingOptions.map((rating) => (
        <option key={rating} value={rating}>{rating}</option>
    ))
}

const Rating: FC<RatingProps> = ({ sessionId, movieId }) => {
    const { data: rating, isLoading, isError, isSuccess , refetch } = useCheckRatingQuery({ sessionId, movieId });
    const [addRating] = useAddRatingMutation();
    const [removeRating] = useRemoveRatingMutation();
    const [currentRating, setCurrentRating] = useState<number>(0);

    async function handleAddRating(ratingValue: number) {
        try {
            await addRating({ sessionId, movieId, rating: ratingValue }).unwrap();
            refetch();
        } catch (e) {
            console.log("Error adding rating:", e);
        }
    }

    async function handleRemoveRating() {
        try {
            await removeRating({ sessionId, movieId }).unwrap();
            refetch();
        } catch (e) {
            console.log("Error removing rating:", e);
        }
    }

    return (
        <div className={classes.rating}>
            {isError && 'Some kind of Error ocurred'}
            {isLoading && 'Loading ...'}
            {isSuccess && rating && (
                <div className={classes.rated}>
                    You rated this film: {rating}
                    <button onClick={handleRemoveRating}>Remove Rating</button>
                </div>
            )}
            {!rating && (
                <>
                    <select value={currentRating}
                            onChange={(e) => setCurrentRating(Number(e.target.value))}
                    >
                        {renderRatingOption()}
                    </select>
                    <button onClick={() => handleAddRating(currentRating)}>Rate</button>
                </>

            )}
        </div>
    );
};

export default Rating;
