import {
    CalciteStepper,
    CalciteStepperItem,
} from '@esri/calcite-components-react';
import React from 'react';
import { LocationSelector } from './LocationSelector/LocationSelector';
import { RiskAdjustments } from './RiskAdjustments/RiskAdjustments';
import { QuizAboutOperation } from './QuizAboutOperation/QuizAboutOperation';
import { ValueOfDamage } from './ValueOfDamage/ValueOfDamage';
import { CostAdjustment } from './CostAdjustment/CostAdjustment';
import { BenefitsAndResults } from './BenefitsAndResults/BenefitsAndResults';

export const WorkflowPanel = () => {
    return (
        <div className=" w-full">
            <CalciteStepper layout="vertical" icon>
                <CalciteStepperItem
                    heading="Step 1: Select a location"
                    selected
                >
                    <LocationSelector />
                </CalciteStepperItem>

                <CalciteStepperItem heading="Step 2: Risk Adjustments">
                    <RiskAdjustments />
                </CalciteStepperItem>

                <CalciteStepperItem heading="Step 3: Questions about your operation">
                    <QuizAboutOperation />
                </CalciteStepperItem>

                <CalciteStepperItem heading="Step 4: Value of Damage">
                    <ValueOfDamage />
                </CalciteStepperItem>

                <CalciteStepperItem heading="Step 5: Management Practice Cost Adjustments">
                    <CostAdjustment />
                </CalciteStepperItem>

                <CalciteStepperItem heading="Step 6: Benefit of Management Practices">
                    <BenefitsAndResults />
                </CalciteStepperItem>
            </CalciteStepper>
        </div>
    );
};
