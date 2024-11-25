import { selectMapCenter, selectMapZoom } from '@store/Map/selectors';
import { saveMapCenterToHashParams } from '@utils/url-hash-params';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

export const useSaveAppState2HashParams = () => {
    const mapCenter = useSelector(selectMapCenter);
    const zoom = useSelector(selectMapZoom);

    useEffect(() => {
        saveMapCenterToHashParams(mapCenter, zoom);
    }, [mapCenter, zoom]);
};
