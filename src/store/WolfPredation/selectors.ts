import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../configureStore';

export const selectWolfCattleConflictProbability = createSelector(
    (state: RootState) => state.WolfPredation.wolfCattleConflictProbability,
    (wolfCattleConflictProbability) => wolfCattleConflictProbability
);
