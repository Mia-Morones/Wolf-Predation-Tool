import { MAP_CENTER, MAP_ZOOM, WEB_MAP_ID } from '@constants/map';
import {
    createSlice,
    // createSelector,
    PayloadAction,
    // createAsyncThunk
} from '@reduxjs/toolkit';

// import { RootState, StoreDispatch, StoreGetState } from '../configureStore';
export type WolfPredationState = {
    /**
     * base probability for wolf/cattle conflict
     */
    wolfCattleConflictProbability: number;
};

export const initialWolfPredationState: WolfPredationState = {
    wolfCattleConflictProbability: 0,
};
const slice = createSlice({
    name: 'WolfPredation',
    initialState: initialWolfPredationState,
    reducers: {
        wolfCattleConflictProbabilityChanged: (
            state,
            action: PayloadAction<number>
        ) => {
            state.wolfCattleConflictProbability = action.payload;
        },
    },
});
const { reducer } = slice;
export const { wolfCattleConflictProbabilityChanged } = slice.actions;
export default reducer;
