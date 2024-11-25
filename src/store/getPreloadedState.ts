import { getMapCenterFromHashParams } from '@utils/url-hash-params';
import { initialMapState } from './Map/reducer';
import { PartialRootState } from './configureStore';
import { MAP_CENTER, MAP_ZOOM } from '@constants/map';

const getPreloadedState = (): PartialRootState => {
    const { center, zoom } = getMapCenterFromHashParams() || {};

    return {
        Map: {
            ...initialMapState,
            center: center || MAP_CENTER,
            zoom: zoom || MAP_ZOOM,
        },
    };
};

export default getPreloadedState;
