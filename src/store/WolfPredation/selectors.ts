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

export const selectMilesOfTurboFladry = createSelector(
    (state: RootState) => state.WolfPredation.milesOfTurboFladry,
    (milesOfTurboFladry) => milesOfTurboFladry
);

export const selectNumberOfRangeRiders = createSelector(
    (state: RootState) => state.WolfPredation.numberOfRangeRiders,
    (numberOfRangeRiders) => numberOfRangeRiders
);

export const selectCarcassCompostingCost = createSelector(
    (state: RootState) => state.WolfPredation.carcassCompostingCost,
    (carcassCompostingCost) => carcassCompostingCost
);

export const selectQueryPoint = createSelector(
    (state: RootState) => state.WolfPredation.queryPoint,
    (queryPoint) => queryPoint
);

export const selectQueryGeometry = createSelector(
    (state: RootState) => state.WolfPredation.queryGeometry,
    (queryGeometry) => queryGeometry
);

export const selectIsSketching = createSelector(
    (state: RootState) => state.WolfPredation.isSeketching,
    (isSeketching) => isSeketching
);

export const selectQueryGeometryType = createSelector(
    (state: RootState) => state.WolfPredation.queryGeometryType,
    (queryGeometryType) => queryGeometryType
);
