import React from 'react';
import { StepperContentContainerClasses } from '../WorkflowPanel';
import { SEARCH_WIDGET_CONTAINER_ID } from '@constants/UI';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectIsSketching,
    selectQueryGeometry,
} from '@store/WolfPredation/selectors';
import classNames from 'classnames';
import { isSketchingChanged } from '@store/WolfPredation/reducer';
import { CalciteButton } from '@esri/calcite-components-react';
import {
    resetQueryGeometry,
    setQueryGeometry,
} from '@store/WolfPredation/thunks';

export const LocationSelector = () => {
    const dispatch = useDispatch();

    const isSeketching = useSelector(selectIsSketching);
    const queryGeometry = useSelector(selectQueryGeometry);

    const shouldDisableSketching =
        isSeketching || queryGeometry ? true : undefined;
    const shouldHideClearSelection = !queryGeometry;

    return (
        <div className={StepperContentContainerClasses}>
            <p className="mb-4">
                Type your address or coordinates into the address bar and from
                there drag and pull to customize your operation’s specific shape
                and size.
            </p>

            <div id={SEARCH_WIDGET_CONTAINER_ID} className="w-full"></div>

            <div className="mt-4">
                <CalciteButton
                    disabled={shouldDisableSketching}
                    iconStart="rectangle"
                    scale="s"
                    onClick={() => {
                        dispatch(isSketchingChanged(true));
                    }}
                >
                    Select features by rectange
                </CalciteButton>

                {shouldHideClearSelection === false && (
                    <CalciteButton
                        className={classNames({
                            hidden: shouldHideClearSelection,
                        })}
                        iconStart="x"
                        scale="s"
                        onClick={() => {
                            dispatch(resetQueryGeometry());
                        }}
                    >
                        Clear selection
                    </CalciteButton>
                )}
            </div>
        </div>
    );
};
