import {
    CalciteStepper,
    CalciteStepperItem,
} from '@esri/calcite-components-react';
import React from 'react';

export const WorkflowPanel = () => {
    return (
        <div className=" w-full">
            <CalciteStepper layout="vertical" icon>
                <CalciteStepperItem
                    heading="Step 1: Select a location"
                    selected
                ></CalciteStepperItem>

                <CalciteStepperItem heading="Step 2: Risk Adjustments"></CalciteStepperItem>

                <CalciteStepperItem heading="Step 3: Questions about your operation"></CalciteStepperItem>

                <CalciteStepperItem heading="Step 4: Value of Damage"></CalciteStepperItem>

                <CalciteStepperItem heading="Step 5: Management Practice Cost Adjustments"></CalciteStepperItem>

                <CalciteStepperItem heading="Step 6: Benefit of Management Practices"></CalciteStepperItem>
            </CalciteStepper>
        </div>
    );
};
