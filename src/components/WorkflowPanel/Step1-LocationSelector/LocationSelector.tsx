import React from 'react';
import { StepperContentContainerClasses } from '../WorkflowPanel';
import { SEARCH_WIDGET_CONTAINER_ID } from '@constants/UI';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectIsSketching,
    selectQueryGeometry,
    selectQueryGeometryType,
} from '@store/WolfPredation/selectors';
import classNames from 'classnames';
import {
    isSketchingChanged,
    QueryGeometryType,
    queryGeometryTypeChanged,
} from '@store/WolfPredation/reducer';
import {
    CalciteButton,
    CalciteTab,
    CalciteTabNav,
    CalciteTabs,
    CalciteTabTitle,
} from '@esri/calcite-components-react';
import {
    resetQueryGeometry,
    setQueryGeometry,
} from '@store/WolfPredation/thunks';

const QUERY_GEMO_TYPES: QueryGeometryType[] = ['point', 'rectangle'];

export const LocationSelector = () => {
    const dispatch = useDispatch();

    const isSeketching = useSelector(selectIsSketching);
    const queryGeometry = useSelector(selectQueryGeometry);
    const queryGeometryType = useSelector(selectQueryGeometryType);

    const shouldDisableSketching =
        isSeketching || queryGeometry ? true : undefined;
    const shouldHideClearSelection = !queryGeometry;

    return (
        <div className={StepperContentContainerClasses}>
            <CalciteTabs>
                <CalciteTabNav slot="title-group">
                    {/* <CalciteTabTitle>By Point</CalciteTabTitle>
                    <CalciteTabTitle>By Rectangle</CalciteTabTitle> */}

                    {QUERY_GEMO_TYPES.map((type) => (
                        <CalciteTabTitle
                            key={type}
                            selected={
                                type === queryGeometryType ? true : undefined
                            }
                            onClick={() => {
                                dispatch(queryGeometryTypeChanged(type));
                            }}
                        >
                            By {type}
                        </CalciteTabTitle>
                    ))}
                </CalciteTabNav>

                <CalciteTab>
                    <div className="py-4">
                        <p className="mb-4">
                            Click on the map or use the address locator below to
                            select a hexgon.
                        </p>

                        <div
                            id={SEARCH_WIDGET_CONTAINER_ID}
                            className="w-full"
                        ></div>
                    </div>
                </CalciteTab>

                <CalciteTab>
                    <div className="mt-4">
                        <p className="mb-4">
                            Draw a rectangle on the map to select hexgon
                            features. To draw a rectangle, click the button
                            below to enable the sketching tool on the map, then
                            click and drag on the map to draw a rectangle.
                        </p>

                        {
                            <CalciteButton
                                disabled={shouldDisableSketching}
                                width="full"
                                onClick={() => {
                                    dispatch(isSketchingChanged(true));
                                }}
                            >
                                Start drawing rectange on map
                            </CalciteButton>
                        }

                        {shouldHideClearSelection === false && (
                            <CalciteButton
                                className="mt-1"
                                width="full"
                                iconStart="x"
                                onClick={() => {
                                    dispatch(resetQueryGeometry());
                                }}
                            >
                                Clear rectange
                            </CalciteButton>
                        )}
                    </div>
                </CalciteTab>
            </CalciteTabs>
        </div>
    );
};
