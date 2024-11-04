import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";

import searchReducer from "@/modules/MoviesCatalog/store/searchSlice";
import sessionReducer from "@/features/sessionSlice";
import favoritesReducer from "@/features/favoritesSlice.ts";


import { MovieApi } from "../api/moviesApi";
import { catalogApi } from "@/modules/MoviesCatalog/api";
import {movieDetailApi} from "@/modules/MovieDetails/api";


export const store = configureStore({
    reducer: {
        moviesApi: MovieApi.reducer,
        catalogApi: catalogApi.reducer,
        movieDetailApi: movieDetailApi.reducer,

        search: searchReducer,
        session: sessionReducer,
        favorites: favoritesReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(MovieApi.middleware)
            .concat(catalogApi.middleware)
            .concat(movieDetailApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<RootDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
