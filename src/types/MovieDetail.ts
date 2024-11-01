export interface MovieDetail {
  genres: Array<MovieGenre>,
  id: number,
  overview: string,
  poster_path: string
  title: string,
  vote_average: number,
    release_date: string,
}
export interface MovieGenre {
    id: number,
    name: string

}