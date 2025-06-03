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
import WebMap from '@arcgis/core/WebMap';
import TileInfo from '@arcgis/core/layers/support/TileInfo';
import GeoJSONLayer from '@arcgis/core/layers/GeoJSONLayer';

interface Props {
  webmapId: string;
  center?: number[];
  zoom?: number;
  children?: React.ReactNode;
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

  const initMapView = async () => {
    const map = new WebMap({
      portalItem: {
        id: webmapId,
      },
    });

    const view = new ArcGISMapView({
      container: mapDivRef.current as HTMLDivElement,
      center,
      zoom,
      map,
      constraints: {
        lods: TileInfo.create().lods,
        snapToZoom: false,
      },
      popupEnabled: false,
    });

    setMapView(view);
    mapViewRef.current = view;

    view.when(() => {
      // 🚫 REMOVE OLD HEX LAYER IF PRESENT
      const oldHexLayer = map.layers.find(
        (layer) => layer.title === 'Old Hex Layer Name' // <-- 🔁 Replace this with exact old layer title
      );
      if (oldHexLayer) {
        map.remove(oldHexLayer);
      }

      // ✅ ADD NEW GEOJSON LAYER
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
          type: 'simple', // @ts-ignore
          symbol: {
            type: 'simple-fill',
            color: 'transparent',
            outline: { color: 'white', width: 0.5 },
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
          ],
        } as any,
      });

      map.add(hexLayer);

      hexLayer.when(() => {
        view.goTo(hexLayer.fullExtent);
      });
    });
  };

  useEffect(() => {
    initMapView();

    return () => {
      mapViewRef.current?.destroy();
    };
  }, []);

  useEffect(() => {
    if (!mapView || !center || !zoom) return;

    const [longitude, latitude] = center;

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
      ></div>
      {mapView &&
        React.Children.map(children, (child) => {
          if (!child) return null;
          return React.cloneElement(child as React.ReactElement<any>, {
            mapView,
          });
        })}
    </>
  );
};

export default MapView;
