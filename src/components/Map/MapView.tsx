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

import React, { useEffect, useState, useRef } from 'react';
import classNames from 'classnames';

import ArcGISMapView from '@arcgis/core/views/MapView';
import Map from '@arcgis/core/Map';
import TileInfo from '@arcgis/core/layers/support/TileInfo';
import GeoJSONLayer from '@arcgis/core/layers/GeoJSONLayer';

interface Props {
  webmapId: string;
  center?: number[];
  zoom?: number;
  children?: React.ReactNode | ((mapView: ArcGISMapView) => React.ReactNode);
}

const MapView: React.FC<Props> = ({
  webmapId,
  center,
  zoom,
  children,
}: Props) => {
  const mapDivRef = useRef<HTMLDivElement>(null);
  const [mapView, setMapView] = useState<ArcGISMapView | null>(null);
  const mapViewRef = useRef<ArcGISMapView | null>(null);

  // Initialize map and view only once on mount
  useEffect(() => {
    if (!mapDivRef.current) return;

    // 1. Create Map instance
    const map = new Map({
      basemap: 'topo-vector', // your basemap
    });

    // 2. Create MapView instance
    const view = new ArcGISMapView({
      container: mapDivRef.current,
      center,
      zoom,
      map,
      constraints: {
        lods: TileInfo.create().lods,
        snapToZoom: false,
      },
      popupEnabled: false,
    });

    // 3. Wait for view to be ready
    view.when(() => {
      // Now the view and map are ready!
      setMapView(view);
      mapViewRef.current = view;

      // Safely use map and view here, for example layers:
      const oldHexLayer = map.layers.find(layer => layer.title === 'Old Hex Layer Name');
      if (oldHexLayer) {
        map.remove(oldHexLayer);
      }

      const hexLayer = new GeoJSONLayer({
        url: './data/Hex_updated.geojson',
        title: 'Prediction Statistics',
        popupTemplate: {
          title: 'Prediction Statistics',
          content: `
            <strong>Mean:</strong> {MEAN}<br/>
            <strong>Std Dev:</strong> {STD}<br/>
            <strong>Variance:</strong> {VARIANCE}<br/>
            <strong>Mode:</strong> {MODE}<br/>
            <strong>Skewness:</strong> {SKEWNESS}
          `,
        },
        renderer: {
          type: 'simple',
          symbol: {
            type: 'simple-fill',
            color: 'rgba(84, 39, 143, 0.9)',
            outline: {
              color: 'rgba(255, 255, 255, 0.2)',
              width: 0.1,
            },
          },
          visualVariables: [
            {
              type: 'color',
              field: 'MEAN',
              stops: [
                { value: 0, color: '#f2f0f7' },
                { value: 20, color: '#dadaeb' },
                { value: 40, color: '#bcbddc' },
                { value: 60, color: '#9e9ac8' },
                { value: 80, color: '#756bb1' },
                { value: 100, color: '#54278f' },
              ],
            },
            {
              type: 'opacity',
              field: 'MEAN',
              stops: [
                { value: 0, opacity: 0.01 },
                { value: 100, opacity: 0.01 },
              ],
            },
          ],
        } as any,
      });

      map.add(hexLayer);

      hexLayer.when(() => {
        view.goTo(hexLayer.fullExtent);
      });
    });

    // Cleanup on unmount
    return () => {
      if (mapViewRef.current) {
        mapViewRef.current.destroy();
        mapViewRef.current = null;
      }
      setMapView(null);
    };
  }, []); // run only once on mount

  // Watch for center/zoom prop changes, update view accordingly
  useEffect(() => {
    if (!mapView || !center || !zoom) return;

    const [longitude, latitude] = center;

    // Avoid redundant goTo calls by checking if view already at target
    if (
      mapView.center.longitude.toFixed(6) === longitude.toFixed(6) &&
      mapView.center.latitude.toFixed(6) === latitude.toFixed(6) &&
      mapView.zoom.toFixed(3) === zoom.toFixed(3)
    ) {
      return;
    }

    mapView.goTo({ center, zoom });
  }, [center, zoom, mapView]);

  return (
    <>
      <div
        className={classNames('absolute top-0 left-0 w-full bottom-0')}
        ref={mapDivRef}
      />

      {mapView && (
          <>
    {typeof children === 'function'
  ? children(mapView)
  : children
    ? React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return null;
        return React.cloneElement(child as React.ReactElement<{ mapView: ArcGISMapView }>, { mapView });
      })
    : null}
  </>
      )}
    </>
  );
};

export default MapView;

