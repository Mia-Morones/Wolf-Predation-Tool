import MapView from '@arcgis/core/views/MapView';
import React, { FC, useEffect, useRef } from 'react';
import SketchViewModel from '@arcgis/core/widgets/Sketch/SketchViewModel';
import GraphicLayer from '@arcgis/core/layers/GraphicsLayer';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectIsSketching,
    selectQueryGeometry,
    selectQueryGeometryType,
} from '@store/WolfPredation/selectors';
import { Polygon } from '@arcgis/core/geometry';
import { queryRiskProbabilityByRectangle } from '@store/WolfPredation/thunks';
import SimpleFillSymbol from '@arcgis/core/symbols/SimpleFillSymbol';
import SimpleMarkerSymbol from '@arcgis/core/symbols/SimpleMarkerSymbol';
import Point from '@arcgis/core/geometry/Point';
// import { queryRiskProbability } from '@store/WolfPredation/thunks';
// import { webMercatorToGeographic } from '@arcgis/core/geometry/support/webMercatorUtils';

type Props = {
    mapView?: MapView;
};

/**
 *
 * @param param0
 * @returns
 *
 * @see https://developers.arcgis.com/javascript/latest/sample-code/sandbox/?sample=highlight-features-by-geometry
 */
export const SektchWidget: FC<Props> = ({ mapView }) => {
    const dispatch = useDispatch();

    const isSeketching = useSelector(selectIsSketching);
    const queryGeometry = useSelector(selectQueryGeometry);
    // const queryGeometryType = useSelector(selectQueryGeometryType);

    const layerRef = useRef<GraphicLayer>();
    const sketchViewModelRef = useRef<SketchViewModel>();

    // const queryGeometryOnChanged = async (geometry: Polygon) => {

    //     if(queryGeometryType !== 'rectangle') {
    //         return;
    //     }

    //     geometry = webMercatorToGeographic(geometry) as Polygon;
    //     dispatch(queryRiskProbability(geometry.toJSON()));
    // };

    useEffect(() => {
        if (mapView) {
            layerRef.current = new GraphicLayer();

            mapView.map.add(layerRef.current);

            sketchViewModelRef.current = new SketchViewModel({
    view: mapView,
    layer: layerRef.current,
    polygonSymbol: new SimpleFillSymbol({
        color: [255, 255, 0, 0.4], // Yellow fill, 40% opacity
        outline: {
            color: [255, 165, 0, 1], // Orange outline
            width: 2,
        },
    }),
});


            // Once user is done drawing a rectangle on the map
            // use the rectangle to select features on the map and table
            sketchViewModelRef.current.on('create', async (event) => {
                if (event.state === 'complete') {
                    // console.log('sketchViewModel create complete', event)
                    // queryGeometryOnChanged(event.graphic.geometry as Polygon);
                    dispatch(
                        queryRiskProbabilityByRectangle(
                            event.graphic.geometry as Polygon
                        )
                    );

                    // this polygon will be used to query features that intersect it
                    // const geometries = polygonGraphicsLayer.graphics.map(function (graphic) {
                    //   return graphic.geometry;
                    // });
                }
            });

            sketchViewModelRef.current.on('update', async (event) => {
                if (event.state === 'complete') {
                    // console.log('sketchViewModel update complete', event)
                    // queryGeometryOnChanged(
                    //     event.graphics[0].geometry as Polygon
                    // );
                    dispatch(
                        queryRiskProbabilityByRectangle(
                            event.graphics[0].geometry as Polygon
                        )
                    );

                    // this polygon will be used to query features that intersect it
                    // const geometries = polygonGraphicsLayer.graphics.map(function (graphic) {
                    //   return graphic.geometry;
                    // });
                }
            });
        }
    }, [mapView]);

    useEffect(() => {
        if (!sketchViewModelRef.current || !isSeketching) {
            return;
        }

        sketchViewModelRef.current.create('rectangle');
    }, [isSeketching]);

    useEffect(() => {
        if (!sketchViewModelRef.current || !layerRef.current || queryGeometry) {
            return;
        }

        layerRef.current.removeAll();
    }, [queryGeometry]);

    return null;
};
