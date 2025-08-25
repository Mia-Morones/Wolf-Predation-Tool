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

import React from 'react';

import MapView from '@arcgis/core/views/MapView';
import Extent from '@arcgis/core/geometry/Extent';
import Graphic from '@arcgis/core/Graphic';
import Search from '@arcgis/core/widgets/Search';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';

import { SEARCH_WIDGET_CONTAINER_ID } from '@constants/UI';

type SearchResult = {
  extent: Extent;
  feature: Graphic;
  name: string;
  target: string;
};

type Props = {
  mapView?: MapView;
  searchCompletedHandler?: (result: SearchResult) => void;
};

const SearchWidget: React.FC<Props> = ({ mapView, searchCompletedHandler }) => {
  // Create a GraphicsLayer reference
  const graphicsLayerRef = React.useRef<GraphicsLayer | null>(null);

  // Helper function to add marker and zoom to it
  const showMarker = (geometry: __esri.Geometry) => {
    const markerSymbol = {
      type: 'simple-marker',
      style: 'circle',
      color: 'red',
      size: 20,
      outline: {
        color: 'black',
        width: 3,
      },
    };

    const graphic = new Graphic({
      geometry,
      symbol: markerSymbol,
    });

    graphicsLayerRef.current?.removeAll();
    graphicsLayerRef.current?.add(graphic);

    mapView?.goTo({
      target: geometry,
      scale: 5000,
    });
  };

  const init = async () => {
    if (!mapView) return;

    await mapView.when();

    // Add graphics layer only once
    if (!graphicsLayerRef.current) {
      const newLayer = new GraphicsLayer({ title: 'Search Marker Layer' });
      mapView.map.add(newLayer);
      graphicsLayerRef.current = newLayer;
    }

    const searchWidget = new Search({
      view: mapView,
      resultGraphicEnabled: false,
      popupEnabled: false,
      container: document.getElementById(SEARCH_WIDGET_CONTAINER_ID),
      autoSelect: true,
    });

    // Listen for search results
    searchWidget.on('search-complete', (evt) => {
      if (
        searchWidget.results[0] &&
        searchWidget.results[0].results[0]
      ) {
        const searchResult: SearchResult = searchWidget.results[0].results[0];
        const point = searchResult.feature.geometry;

        showMarker(point);

        // Notify parent if handler provided
        if (searchCompletedHandler) {
          searchCompletedHandler(searchResult);
        }
      }
    });

    // Listen for map clicks to add a marker
    mapView.on('click', (event) => {
      const point = event.mapPoint;
      showMarker(point);
    });
  };

  React.useEffect(() => {
    if (mapView) {
      init();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapView]);

  return null;
};

export default SearchWidget;




