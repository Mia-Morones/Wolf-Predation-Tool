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
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '@store/rootReducer';
import { AnyAction } from 'redux';

type Props = {
    mapView?: MapView;
};

export const SektchWidget: FC<Props> = ({ mapView }) => {
    // Type dispatch as ThunkDispatch
    const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch();

    const isSeketching = useSelector(selectIsSketching);
    const queryGeometry = useSelector(selectQueryGeometry);

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
            });

            // Once user is done drawing a rectangle on the map
            sketchViewModelRef.current.on('create', async (event) => {
                if (event.state === 'complete') {
                    dispatch(
                        queryRiskProbabilityByRectangle(
                            event.graphic.geometry as Polygon
                        )
                    );
                }
            });

            sketchViewModelRef.current.on('update', async (event) => {
                if (event.state === 'complete') {
                    dispatch(
                        queryRiskProbabilityByRectangle(
                            event.graphics[0].geometry as Polygon
                        )
                    );
                }
            });
        }
    }, [mapView, dispatch]); // Added dispatch as dependency

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

