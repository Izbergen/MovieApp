import {FC} from 'react';
interface ImageProps {
    src: string;
    alt: string;
}
const baseImageUrl = "https://image.tmdb.org/t/p/w500";
const Image: FC<ImageProps> = ({ src = '' , alt = '' }) => {
    return (
        <img src={`${baseImageUrl}${src}`} alt={alt} />
    )
}

export default Image;