import { Point } from '@arcgis/core/geometry';
import { RootState, StoreDispatch, StoreGetState } from '../configureStore';
import { queryWolfLivestockConflictFeatures } from '@services/wolf-livestock-conflict-risk';
import { wolfCattleConflictProbabilityChanged } from './reducer';
// import { webmapIdChanged } from './reducer';

export const qeuryWolfLivestockConflictRiskFeatures =
    (point: Point) =>
    async (dispatch: StoreDispatch, getState: StoreGetState) => {
        try {
            const features = await queryWolfLivestockConflictFeatures(point);
            console.log('feature', features);

            const probability =
                features.length > 0
                    ? features.reduce((acc, feature) => {
                          return acc + feature.probability;
                      }, 0) / features.length
                    : 0;

            dispatch(wolfCattleConflictProbabilityChanged(probability));
        } catch (err) {
            console.error(err);
        }
    };
