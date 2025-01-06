import { Geometry, Point, Polygon } from '@arcgis/core/geometry';
import { MAP_CENTER, MAP_ZOOM, WEB_MAP_ID } from '@constants/map';
import { queryFeatures } from '@esri/arcgis-rest-feature-service';
import {
    createSlice,
    // createSelector,
    PayloadAction,
    // createAsyncThunk
} from '@reduxjs/toolkit';

export enum Livestock {
    Calves = 'calves',
    Lambs = 'lambs',
    Yearlings = 'yearlings',
    Ewes = 'ewes',
    Cows = 'cows',
    Rams = 'rams',
}

export const LIVESTOCKS: Livestock[] = [
    Livestock.Calves,
    Livestock.Lambs,
    Livestock.Yearlings,
    Livestock.Ewes,
    Livestock.Cows,
    Livestock.Rams,
];

export type QueryGeometryType = 'point' | 'rectangle';

// import { RootState, StoreDispatch, StoreGetState } from '../configureStore';
export type WolfPredationState = {
    queryGeometryType: QueryGeometryType;
    /**
     * query point
     */
    queryPoint: Point;
    /**
     * query geometry
     */
    queryGeometry: Point | Polygon;
    /**
     * If true, the user is sketching on the map to draw the query geometry.
     */
    isSeketching: boolean;
    /**
     * base probability for wolf/cattle conflict
     */
    wolfCattleConflictProbability: number;
    /**
     * livestock herd size
     */
    livestockHerdSize: {
        [key in Livestock]: number;
    };
    /**
     * market value of livestock.
     */
    livestockMarketValue: {
        [key in Livestock]: number;
    };
    /**
     * handling cost of livestock.
     */
    livestockHandlingCost: {
        [key in Livestock]: number;
    };
    /**
     * total number of turbo fladry in miles
     */
    milesOfTurboFladry: number;
    /**
     * total number of range riders
     */
    numberOfRangeRiders: number;
    /**
     * total cost of carcass composting
     */
    carcassCompostingCost: number;
};

export const initialWolfPredationState: WolfPredationState = {
    queryGeometryType: 'point',
    queryPoint: null,
    queryGeometry: null,
    isSeketching: false,
    wolfCattleConflictProbability: 0,
    livestockHerdSize: {
        calves: 0,
        lambs: 0,
        yearlings: 0,
        ewes: 0,
        cows: 0,
        rams: 0,
    },
    livestockMarketValue: {
        calves: 0,
        lambs: 0,
        yearlings: 0,
        ewes: 0,
        cows: 0,
        rams: 0,
    },
    livestockHandlingCost: {
        calves: 0,
        lambs: 0,
        yearlings: 0,
        ewes: 0,
        cows: 0,
        rams: 0,
    },
    milesOfTurboFladry: 0,
    numberOfRangeRiders: 0,
    carcassCompostingCost: 0,
};
const slice = createSlice({
    name: 'WolfPredation',
    initialState: initialWolfPredationState,
    reducers: {
        queryGeometryTypeChanged: (
            state,
            action: PayloadAction<QueryGeometryType>
        ) => {
            state.queryGeometryType = action.payload;
        },
        queryPointChanged: (state, action: PayloadAction<Point>) => {
            state.queryPoint = action.payload;
        },
        queryGeomChanged: (state, action: PayloadAction<Point | Polygon>) => {
            state.queryGeometry = action.payload;
        },
        isSketchingChanged: (state, action: PayloadAction<boolean>) => {
            state.isSeketching = action.payload;
        },
        wolfCattleConflictProbabilityChanged: (
            state,
            action: PayloadAction<number>
        ) => {
            state.wolfCattleConflictProbability = action.payload;
        },
        livestockHerdSizeChanged: (
            state,
            action: PayloadAction<{
                livestock: Livestock;
                size: number;
            }>
        ) => {
            state.livestockHerdSize[action.payload.livestock] =
                action.payload.size;
        },
        livestockMarketValueChanged: (
            state,
            action: PayloadAction<{
                livestock: Livestock;
                value: number;
            }>
        ) => {
            state.livestockMarketValue[action.payload.livestock] =
                action.payload.value;
        },
        livestockHandlingCostChanged: (
            state,
            action: PayloadAction<{
                livestock: Livestock;
                value: number;
            }>
        ) => {
            state.livestockHandlingCost[action.payload.livestock] =
                action.payload.value;
        },
        milesOfTurboFladryChanged: (state, action: PayloadAction<number>) => {
            state.milesOfTurboFladry = action.payload;
        },
        numberOfRangeRidersChanged: (state, action: PayloadAction<number>) => {
            state.numberOfRangeRiders = action.payload;
        },
        carcassCompostingCostChanged: (
            state,
            action: PayloadAction<number>
        ) => {
            state.carcassCompostingCost = action.payload;
        },
    },
});
const { reducer } = slice;
export const {
    wolfCattleConflictProbabilityChanged,
    livestockHerdSizeChanged,
    livestockMarketValueChanged,
    livestockHandlingCostChanged,
    milesOfTurboFladryChanged,
    numberOfRangeRidersChanged,
    carcassCompostingCostChanged,
    queryPointChanged,
    queryGeomChanged,
    isSketchingChanged,
    queryGeometryTypeChanged,
} = slice.actions;
export default reducer;
