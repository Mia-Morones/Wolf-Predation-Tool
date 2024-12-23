import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../configureStore';

export const selectWolfCattleConflictProbability = createSelector(
    (state: RootState) => state.WolfPredation.wolfCattleConflictProbability,
    (wolfCattleConflictProbability) => wolfCattleConflictProbability
);

export const selectLivestockHerdSize = createSelector(
    (state: RootState) => state.WolfPredation.livestockHerdSize,
    (livestockHerdSize) => livestockHerdSize
);

export const selectLivestockMarketValue = createSelector(
    (state: RootState) => state.WolfPredation.livestockMarketValue,
    (livestockMarketValue) => livestockMarketValue
);

export const selectLivestockHandlingCost = createSelector(
    (state: RootState) => state.WolfPredation.livestockHandlingCost,
    (livestockHandlingCost) => livestockHandlingCost
);
