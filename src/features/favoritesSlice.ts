import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { MovieResponseCard } from "@/shared/types/MovieResponse.ts";

const API_KEY: string = import.meta.env.VITE_API_KEY;
const API_URL: string = import.meta.env.VITE_BASE_URL;

interface FavoritesState {
    favorites: MovieResponseCard[];
    loading: boolean;
    error: string | null;
}

const initialState: FavoritesState = {
    favorites: [],
    loading: false,
    error: null,
};


export const addToFavorites = createAsyncThunk(
    "favorites/addToFavorites",
    async ({ sessionId, accountId, movie }: { sessionId: string; accountId: string; movie: MovieResponseCard }) => {
        const response = await fetch(`${API_URL}/account/${accountId}/favorite?session_id=${sessionId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                media_type: "movie",
                media_id: movie.id,
                favorite: true,
            }),
        });
        if (!response.ok) throw new Error("Failed to add to favorites");
        return movie;
    }
);

export const removeFromFavorites = createAsyncThunk(
    "favorites/removeFromFavorites",
    async ({ sessionId, accountId, movieId }: { sessionId: string; accountId: string; movieId: number }) => {
        const response = await fetch(`${API_URL}/account/${accountId}/favorite?session_id=${sessionId}`, {
            method: "POST",
            headers: {
                accept: 'application/json',
                "Content-Type": "application/json",
                Authorization: `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                media_type: "movie",
                media_id: movieId,
                favorite: false,
            }),
        });
        if (!response.ok) throw new Error("Failed to remove from favorites");
        return movieId;
    }
);

const favoritesSlice = createSlice({
    name: "favorites",
    initialState,
    reducers: {
        setFavorites: (state, action: PayloadAction<MovieResponseCard[]>) => {
            state.favorites = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addToFavorites.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addToFavorites.fulfilled, (state, action: PayloadAction<MovieResponseCard>) => {
                state.loading = false;
                const exists = state.favorites.find((favorite) => favorite.id === action.payload.id);
                if (!exists) {
                    state.favorites.push(action.payload);
                }
            })
            .addCase(addToFavorites.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to add to favorites";
            })
            .addCase(removeFromFavorites.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeFromFavorites.fulfilled, (state, action: PayloadAction<number>) => {
                state.loading = false;
                state.favorites = state.favorites.filter((favorite) => favorite.id !== action.payload);
            })
            .addCase(removeFromFavorites.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to remove from favorites";
            });
    },
});

export const { setFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;
