import { configureStore } from "@reduxjs/toolkit";
import { MovieApi } from "./../api/moviesApi";
import moviesReducer from "@/features/moviesSlice";
import searchReducer from "@/features/searchSlice";
import filterReducer from "@/features/filterSlice";
import sessionReducer from "@/features/sessionSlice";
import featureReducer from "@/features/featuresSlice";

export const store = configureStore({
    reducer: {
        moviesApi: MovieApi.reducer,
        movies: moviesReducer,
        search: searchReducer,
        filter: filterReducer,
        session: sessionReducer,
        features: featureReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(MovieApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;
