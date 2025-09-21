import { combineReducers } from 'redux';
import Map from './Map/reducer';
import WolfPredation from './WolfPredation/reducer';

const rootReducer = combineReducers({
    Map,
    WolfPredation,
});

// This will infer the full state type from your reducers
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

