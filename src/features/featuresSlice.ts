import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MovieResponseCard } from "@/types/MovieResponse.ts";

interface FeaturesState {
    features: MovieResponseCard[];
}

const initialState: FeaturesState = {
    features: [],
};

const featuresSlice = createSlice({
    name: 'features',
    initialState,
    reducers: {
        setFeatures: (state, action: PayloadAction<MovieResponseCard[]>) => {
            state.features = action.payload;
        },
        addToFeatures: (state, action: PayloadAction<MovieResponseCard>) => {
            const exists = state.features.find(feature => feature.id === action.payload.id);
            if (!exists) {
                state.features.push(action.payload);
            }
        },
        removeFromFeatures: (state, action: PayloadAction<{ id: number }>) => {
            state.features = state.features.filter(
                (feature) => feature.id !== action.payload.id
            );
        }
    },
});

export const { addToFeatures, setFeatures, removeFromFeatures } = featuresSlice.actions;

export default featuresSlice.reducer;
