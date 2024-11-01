import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SessionState {
    sessionId?: string;
    accountId?: string;

}

const initialState: SessionState = {
    sessionId: undefined,
    accountId: '21600826'
};

const sessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {
        setSessionId(state, action: PayloadAction<string>) {
            state.sessionId = action.payload;
        },
        clearSessionId(state) {
            state.sessionId = undefined;
        },
    },
});

export const { setSessionId, clearSessionId } = sessionSlice.actions;

export default sessionSlice.reducer;
