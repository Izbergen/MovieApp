export interface ICastMember {
    id: number;
    name: string;
    profile_path: string | null;
    character: string;
}

export interface IMovieCast {
    id: number;
    cast: ICastMember[];
}
