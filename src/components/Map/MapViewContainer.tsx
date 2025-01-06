/* Copyright 2024 Esri
 *
 * Licensed under the Apache License Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import classNames from 'classnames';
import React, { FC, useEffect, useMemo, useState } from 'react';
import MapView from './MapView';
// import { WEB_MAP_ID } from '../../constants/map';
import { useSelector } from 'react-redux';
import {
    selectMapCenter,
    selectMapZoom,
    selectWebmapId,
} from '@store/Map/selectors';

import EventHandlers from './EventHandlers';
import { useDispatch } from 'react-redux';
import { batch } from 'react-redux';
import { centerChanged, zoomChanged } from '@store/Map/reducer';

import { Point } from '@arcgis/core/geometry';
import SearchWidget from './SearchWidget';
import { SektchWidget } from './SektchWidget';
import { HighlightSelectedHexgons } from './HighlightSelectedHexgons';

type Props = {
    /**
     * emits when user click on the map
     * @param point map point where the user has clicked
     * @returns
     */
    mapOnClick?: (point: Point) => void;
    children?: React.ReactNode;
};

const MapViewContainer: FC<Props> = ({ mapOnClick, children }) => {
    const dispatch = useDispatch();

    const center = useSelector(selectMapCenter);

    const zoom = useSelector(selectMapZoom);

    const webmapId = useSelector(selectWebmapId);

    return (
        <div className={classNames('absolute top-0 left-0 w-full h-full')}>
            <MapView webmapId={webmapId} center={center} zoom={zoom}>
                {children}

                <EventHandlers
                    onStationary={(center, zoom, extent, resolution, scale) => {
                        // console.log('map view is stationary', center, zoom, extent);

                        batch(() => {
                            dispatch(
                                centerChanged([
                                    center.longitude,
                                    center.latitude,
                                ])
                            );
                            dispatch(zoomChanged(zoom));
                        });
                    }}
                    onClickHandler={(point) => {
                        // console.log('clicked on map', point);
                        const { latitude, longitude } = point;

                        const queryLocation = {
                            x: +longitude,
                            y: +latitude,
                            longitude,
                            latitude,
                            spatialReference: {
                                wkid: 4326,
                            },
                        } as Point;

                        if (mapOnClick) {
                            mapOnClick(queryLocation);
                        }
                    }}
                    mapViewUpdatingOnChange={(isUpdating) => {
                        // console.log('map view is updating', isUpdating);
                    }}
                />

                <SearchWidget
                    searchCompletedHandler={(result) => {
                        // console.log(result)
                        const { feature } = result;
                        // console.log(feature)
                        if (!feature) {
                            return;
                        }
                        const { latitude, longitude } =
                            feature.geometry as Point;

                        const queryLocation = {
                            x: +longitude,
                            y: +latitude,
                            longitude,
                            latitude,
                            spatialReference: {
                                wkid: 4326,
                            },
                        } as Point;

                        if (mapOnClick) {
                            mapOnClick(queryLocation);
                        }
                    }}
                />

                <SektchWidget />

                <HighlightSelectedHexgons />
            </MapView>
        </div>
    );
};

export default MapViewContainer;
