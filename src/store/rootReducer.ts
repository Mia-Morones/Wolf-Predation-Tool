import { combineReducers } from 'redux';
// import Map from './Map/reducer';
import Map from './Map/reducer';
import WolfPredation from './WolfPredation/reducer';

export default combineReducers({
    Map,
    WolfPredation,
});
