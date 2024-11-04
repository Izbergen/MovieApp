import IGenre from "@/shared/types/IGenre.ts";

export interface MovieDetail {
    genres: Array<IGenre>,
    id: number,
    overview: string,
    poster_path: string
    title: string,
    vote_average: number,
    release_date: string,
}
