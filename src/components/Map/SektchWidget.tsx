import MapView from '@arcgis/core/views/MapView';
import React, { FC, useEffect, useRef } from 'react';
import SketchViewModel from '@arcgis/core/widgets/Sketch/SketchViewModel';
import GraphicLayer from '@arcgis/core/layers/GraphicsLayer';
import { useDispatch, useSelector } from 'react-redux';
import { isSketchingChanged } from '@store/WolfPredation/reducer';

import {
    selectIsSketching,
    selectQueryGeometry,
    selectQueryGeometryType,
} from '@store/WolfPredation/selectors';
import { Polygon, Point } from '@arcgis/core/geometry';
import { queryRiskProbabilityByRectangle } from '@store/WolfPredation/thunks';
import SimpleFillSymbol from '@arcgis/core/symbols/SimpleFillSymbol';
import SimpleMarkerSymbol from '@arcgis/core/symbols/SimpleMarkerSymbol';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '@store/rootReducer';
import { AnyAction } from 'redux';

type Props = {
    mapView?: MapView;
};

export const SektchWidget: FC<Props> = ({ mapView }) => {
    const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch();

    const isSeketching = useSelector(selectIsSketching);
    const queryGeometry = useSelector(selectQueryGeometry);
    const queryGeometryType = useSelector(selectQueryGeometryType);

    const layerRef = useRef<GraphicLayer>();
    const sketchViewModelRef = useRef<SketchViewModel>();

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
                pointSymbol: new SimpleMarkerSymbol({
                    style: 'circle',
                    color: 'red',
                    size: '12px',
                    outline: { color: 'white', width: 2 },
                }),
            });

            // When drawing is completed
            sketchViewModelRef.current.on('create', async (event) => {
                if (event.state === 'complete') {
                    if (queryGeometryType === 'rectangle') {
                        dispatch(
                            queryRiskProbabilityByRectangle(
                                event.graphic.geometry as Polygon
                            )
                        );

                    dispatch(isSketchingChanged(false));
                    } else if (queryGeometryType === 'point') {
                        // Handle point case if needed
                        // dispatch(queryRiskProbabilityByPoint(event.graphic.geometry as Point));
                    }
                }
            });

            // When updating is completed
            sketchViewModelRef.current.on('update', async (event) => {
                if (event.state === 'complete') {
                    if (queryGeometryType === 'rectangle') {
                        dispatch(
                            queryRiskProbabilityByRectangle(
                                event.graphics[0].geometry as Polygon
                            )
                        );
                    } else if (queryGeometryType === 'point') {
                        // Handle point case if needed
                    }
                }
            });
        }
    }, [mapView, dispatch, queryGeometryType]);

    useEffect(() => {
        if (!sketchViewModelRef.current || !isSeketching) {
            return;
        }

        // Create the shape depending on the current queryGeometryType
        if (queryGeometryType === 'rectangle') {
            sketchViewModelRef.current.create('rectangle');
        } else if (queryGeometryType === 'point') {
            sketchViewModelRef.current.create('point');
        }
    }, [isSeketching, queryGeometryType]);

    useEffect(() => {
        if (!sketchViewModelRef.current || !layerRef.current || queryGeometry) {
            return;
        }

        layerRef.current.removeAll();
    }, [queryGeometry]);

    return null;
};






