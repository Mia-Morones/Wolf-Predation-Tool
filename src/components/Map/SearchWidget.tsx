// import './SearchWidget.css';

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

import React, { useRef } from 'react';

import MapView from '@arcgis/core/views/MapView';
import Extent from '@arcgis/core/geometry/Extent';
import Graphic from '@arcgis/core/Graphic';
import Search from '@arcgis/core/widgets/Search';
import classNames from 'classnames';
import { SEARCH_WIDGET_CONTAINER_ID } from '@constants/UI';

type SearchResult = {
    extent: Extent;
    feature: Graphic;
    name: string;
    target: string;
};

type Props = {
    // containerId?: string;
    mapView?: MapView;
    searchCompletedHandler?: (result: SearchResult) => void;
};

const SearchWidget: React.FC<Props> = ({
    // containerId,
    mapView,
    searchCompletedHandler,
}: Props) => {
    // const containerRef = useRef<HTMLDivElement>();

    const init = async () => {
        const searchWidget = new Search({
            view: mapView,
            resultGraphicEnabled: false,
            popupEnabled: false,
            container: document.getElementById(SEARCH_WIDGET_CONTAINER_ID), //containerRef.current,
            autoSelect: true,
        });

        // mapView.ui.add(searchWidget, 'top-right');

        if (searchCompletedHandler) {
            searchWidget.on('search-complete', (evt) => {
                if (
                    searchWidget.results[0] &&
                    searchWidget?.results[0]?.results[0]
                ) {
                    const searchResult: SearchResult =
                        searchWidget.results[0].results[0];
                    // console.log(searchResult);
                    searchCompletedHandler(searchResult);
                }
            });
        }
    };

    React.useEffect(() => {
        if (mapView) {
            init();
        }
    }, [mapView]);

    return (
        // <div
        //     className={classNames(
        //         'absolute bottom-4 w-full pointer-events-none '
        //     )}
        //     style={{
        //         bottom: 30,
        //         left: 0,
        //     }}
        // >
        //     <div
        //         className="mx-auto w-96 shadow-md pointer-events-auto"
        //         ref={containerRef}
        //     ></div>
        // </div>
        null
    );
};

export default SearchWidget;
