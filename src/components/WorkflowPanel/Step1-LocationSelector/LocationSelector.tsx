import React, { useEffect } from 'react';
import { StepperContentContainerClasses } from '../WorkflowPanel';
import { SEARCH_WIDGET_CONTAINER_ID } from '@constants/UI';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectIsSketching,
    selectQueryGeometry,
} from '@store/WolfPredation/selectors';
import {
    isSketchingChanged,
    queryGeometryTypeChanged,
} from '@store/WolfPredation/reducer';
import { CalciteButton } from '@esri/calcite-components-react';
import { resetQueryGeometry } from '@store/WolfPredation/thunks';
import { RootState } from '@store/configureStore'; 


export const LocationSelector = () => {
    const dispatch = useDispatch();

    const isSketching = useSelector(selectIsSketching);
    const queryGeometry = useSelector(selectQueryGeometry);
    const queryGeometryType = useSelector(
  (state: RootState) => state.WolfPredation.queryGeometryType
);

    const shouldDisableSketching = isSketching || Boolean(queryGeometry);
    const shouldHideClearSelection = !queryGeometry;

    // Force the geometry type to 'rectangle' on mount
    useEffect(() => {
        dispatch(queryGeometryTypeChanged('rectangle'));
    }, []);

    useEffect(() => {
    // Clear any leftover geometry when component mounts
    dispatch(resetQueryGeometry());
}, [dispatch]);

console.log("Geometry type:", queryGeometryType);
console.log('shouldDisableSketching:', shouldDisableSketching, typeof shouldDisableSketching);

    return (
        <div className={StepperContentContainerClasses}>
            <div className="py-4">
                <p className="mb-4">
                    WolfWise makes estimates of a conflict for any given location. Click the button below 
                    and then draw a rectangle on the map around your location. Draw the location larger 
                    than your property so that you can accurately reflect risk in your region. A risk of 50% 
                    would mean that you would expect to lose one head every other year. 100% would mean 1 
                    head every year.  The program does not go above 100%, but if you think you might lose 2 
                    head/year (200%), for example, you can double the value per head lost to account for that 
                    extra loss in step 4.
                </p>

                {/* Search widget container always visible */}
                <div id={SEARCH_WIDGET_CONTAINER_ID} className="w-full mb-4"></div>

                <CalciteButton
                    appearance="solid"
                    kind="brand" 
                    disabled={shouldDisableSketching}
                    width="full"
                      style={{
                        opacity: shouldDisableSketching ? 0.5 : 1,
                        cursor: shouldDisableSketching ? 'not-allowed' : 'pointer',
                    }}
                    onClick={() => {
                        dispatch(isSketchingChanged(true));
                    }}
                >
                    Start drawing rectangle on map
                </CalciteButton>

                {!shouldHideClearSelection && (
                    <CalciteButton
                        className="mt-2"
                        width="full"
                        iconStart="x"
                        onClick={() => {
                            dispatch(resetQueryGeometry());
                        }}
                    >
                        Clear rectangle
                    </CalciteButton>
                )}
            </div>
        </div>
    );
};


