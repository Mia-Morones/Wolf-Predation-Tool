import MapView from '@arcgis/core/views/MapView';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import FeatureLayerView from '@arcgis/core/views/layers/FeatureLayerView';
import React, { FC, useEffect, useRef } from 'react';
import { Point, Polygon, SpatialReference } from '@arcgis/core/geometry';
import { useSelector } from 'react-redux';
import {
    selectQueryGeometry,
    selectQueryGeometryType,
} from '@store/WolfPredation/selectors';
import Handles from '@arcgis/core/core/Handles.js';

type Props = {
    mapView?: MapView;
};

export const HighlightSelectedHexgons: FC<Props> = ({ mapView }) => {
    const [hexLayerViews, setHexLayerViews] = React.useState<
        FeatureLayerView[]
    >([]);

    const highlightHanldesRef = useRef<Handles>(new Handles());

    const queryGeometry = useSelector(selectQueryGeometry);
    const queryGeometryType = useSelector(selectQueryGeometryType);

    useEffect(() => {
        if (!hexLayerViews.length) return;

        if (highlightHanldesRef.current) {
            highlightHanldesRef.current.removeAll();
        }

        if (!queryGeometry) {
            return;
        }

        for (const layerView of hexLayerViews) {
            const query = layerView.createQuery();
            // console.log('queryGeometry', queryGeometry);

            if (queryGeometryType === 'point') {
                const { longitude, latitude } = queryGeometry as Point;

                query.geometry = new Point({
                    longitude,
                    latitude,
                });
            } else if (queryGeometryType === 'rectangle') {
                query.geometry = new Polygon({
                    rings: (queryGeometry as Polygon).rings,
                    spatialReference: new SpatialReference({ wkid: 4326 }),
                });
            }

            layerView.highlightOptions = {
                color: '#FF00FF', //bright fuchsia
                haloOpacity: 0.8,
                fillOpacity: 0.3,
            } as any;

            layerView.queryFeatures(query).then((result) => {
                console.log('result', result.features);

                highlightHanldesRef.current.add(
                    layerView.highlight(result.features) as Handles
                );
            });
        }

        //     console.log('query', query.geometry);

        //     layerView.highlightOptions = {
        //         color: "#FF00FF", //bright fuchsia
        //         haloOpacity: 0.8,
        //         fillOpacity: 0.3
        //     } as any;

        //     layer.queryFeatures(query).then(function(result){
        //         console.log('result', result.features);
        //         // highlight?.remove();
        //         highlight = layerView.highlight(result.features);
        //     });
    }, [queryGeometry]);

    useEffect(() => {
        console.log('mapView', mapView.map.layers);

        if (!mapView) return;

        (async () => {
            const hexLayers = mapView.map.layers.filter((layer) => {
  return layer.title === 'Prediction Statistics';
            });

            // console.log('visibleLayers', hexLayers);

            const layerViews = (await Promise.all(
                hexLayers.map((layer: FeatureLayer) => {
                    return mapView.whenLayerView(layer);
                })
            )) as FeatureLayerView[];

            setHexLayerViews(layerViews);
        })();

        // let highlight:any;

        // hexLayers.forEach(async(layer:FeatureLayer) => {
        //     const layerView = await mapView.whenLayerView(layer);

        //     let query = layer.createQuery();
        //     query.geometry = new Point({
        //         longitude: -106,
        //         latitude: 40
        //     });
        //     console.log('query', query.geometry);

        //     layerView.highlightOptions = {
        //         color: "#FF00FF", //bright fuchsia
        //         haloOpacity: 0.8,
        //         fillOpacity: 0.3
        //     } as any;

        //     layer.queryFeatures(query).then(function(result){
        //         console.log('result', result.features);
        //         // highlight?.remove();
        //         highlight = layerView.highlight(result.features);
        //     });
        // });
    }, [mapView]);

    useEffect(() => {
  if (!mapView) return;

  mapView.map.layers.forEach((layer) => {
    console.log('Layer title:', layer.title);
  });
}, [mapView]);

    return null;
};
