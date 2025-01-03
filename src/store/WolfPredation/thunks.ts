import { Point, Polygon } from '@arcgis/core/geometry';
import { RootState, StoreDispatch, StoreGetState } from '../configureStore';
import { queryAverageWolfLivestockConflict } from '@services/wolf-livestock-conflict-risk';
import {
    isSketchingChanged,
    queryGeomChanged,
    wolfCattleConflictProbabilityChanged,
} from './reducer';
// import { webmapIdChanged } from './reducer';

// export const qeuryWolfLivestockConflictRiskFeatures =
//     (point: Point) =>
//     async (dispatch: StoreDispatch, getState: StoreGetState) => {
//         try {
//             const features = await queryWolfLivestockConflictFeatures(point);
//             console.log('feature', features);

//             const probability =
//                 features.length > 0
//                     ? features.reduce((acc, feature) => {
//                           return acc + feature.probability;
//                       }, 0) / features.length
//                     : 0;

//             dispatch(wolfCattleConflictProbabilityChanged(probability));
//         } catch (err) {
//             console.error(err);
//         }
//     };

export const resetQueryGeometry = () => async (dispatch: StoreDispatch) => {
    dispatch(queryGeomChanged(null));
    dispatch(isSketchingChanged(false));
    dispatch(wolfCattleConflictProbabilityChanged(0));
};

export const setQueryGeometry =
    (geometry: Point | Polygon) => async (dispatch: StoreDispatch) => {
        dispatch(queryGeomChanged(geometry));
        dispatch(isSketchingChanged(false));

        try {
            const features = await queryAverageWolfLivestockConflict(geometry);
            // console.log('feature', features);

            const probability = features[0]?.probability || 0;

            dispatch(wolfCattleConflictProbabilityChanged(probability));
        } catch (err) {
            console.error(err);
        }
    };
