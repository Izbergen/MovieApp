export type MoviesResponse = {
    page: number;
    results: Array<MovieResponseCard>;
}

export type MovieResponseCard = {
    id: number,
    title: string,
    poster_path: string,
    release_date: string,
    vote_average: number,
}