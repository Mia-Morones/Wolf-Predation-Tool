import React, { useState } from 'react';
import {
    CalciteStepper,
    CalciteStepperItem,
} from '@esri/calcite-components-react';
import { LocationSelector } from './Step1-LocationSelector/LocationSelector';
import { RiskAdjustments } from './Step2-RiskAdjustments/RiskAdjustments';
import { QuizAboutOperation } from './Step3-QuizAboutOperation/QuizAboutOperation';
import { ValueOfDamage } from './Step4-ValueOfDamage/ValueOfDamage';
import PracticeSelection from './Step5.1-PracticeSelection/PracticeSelection';
import PracticeDetails from './Step5.2-PracticeDetails/PracticeDetails';
import CostAdjustments from './Step5.3-CostAdjustments/CostAdjustments';
import { BenefitsAndResults } from './Step6-BenefitsAndResults/BenefitsAndResults';
import { defaultResponses } from './Step5.2-PracticeDetails/PracticeDetails';


// Define the correct type for responses
type Responses = {
    turboFladryMiles: number;
    electrifiedNightPenningFeet: number;
    electrifiedNightPenningMonths: number;
    carcassesToCompost: number;
    livestockGuardianDogs: number;
    foxLights: number;
    solarSoundAlarms: number;
    gameCameras: number;
    turboFladryRockyTerrain: boolean;   
    turboFladrySnowMachine: boolean;   
    hoursPerWeek: number;
    rangeRidingMonths: number;
    transportationMethod: 'Horse' | 'ATV/UTV';
    numberOfTransport: number;
    milesFromOperation: number;
    rangeRidingRuggedTerrain: boolean;
};

export const StepperContentContainerClasses =
    'p-2 text-theme-foreground text-sm';

export const WorkflowPanel = () => {
    // Step 5.1: Manage selected practices and devices state
    const [selectedPractices, setSelectedPractices] = useState<{
        practices: string[];
        devices: string[];
    }>({
        practices: [],
        devices: [],
    });

    // Step 5.2: Manage user input responses for practices and devices
    const [responses, setResponses] = useState<Responses>(defaultResponses);

    const [userConflictProbability, setUserConflictProbability] = useState<number | null>(null);

    // Function to update selected practices and devices
    const handleSelectionChange = (
        selectedItems: string[],
        type: 'practices' | 'devices'
    ) => {
        setSelectedPractices((prev) => ({
            ...prev,
            [type]: selectedItems,
        }));
    };

    // Function to update responses in step 5.2
    const handleResponseChange = (newResponses: Responses) => {
        setResponses(newResponses);
    };

    return (
        <div className="w-full h-full overflow-y-auto">
            <CalciteStepper layout="vertical" icon>
                <CalciteStepperItem heading="Step 1: Select a location">
                    <LocationSelector />
                </CalciteStepperItem>

                <CalciteStepperItem heading="Step 2: Risk Adjustments">
                    <RiskAdjustments
                    userConflictProbability={userConflictProbability}
                    setUserConflictProbability={setUserConflictProbability}
                    />

                </CalciteStepperItem>

                <CalciteStepperItem heading="Step 3: Questions about your operation">
                    <QuizAboutOperation />
                </CalciteStepperItem>

                <CalciteStepperItem heading="Step 4: Damage Value">
                    <ValueOfDamage />
                </CalciteStepperItem>

                {/* Step 5.1: Pass handleSelectionChange to PracticeSelection */}
                <CalciteStepperItem heading="Step 5.1: Practice Selection">
                    <PracticeSelection
                        handleSelectionChange={handleSelectionChange}
                    />
                </CalciteStepperItem>

                {/* Step 5.2: Pass selectedPractices and handleResponseChange to PracticeDetails */}
                <CalciteStepperItem heading="Step 5.2: Practice Details">
                    <PracticeDetails
                        selectedPractices={selectedPractices}
                        handleResponseChange={handleResponseChange}
                    />
                </CalciteStepperItem>

                {/* Step 5.3: Pass selectedPractices and responses to CostAdjustments */}
                <CalciteStepperItem heading="Step 5.3: Cost Adjustments">
                    <CostAdjustments
                        selectedPractices={selectedPractices}
                        responses={responses}
                    />
                </CalciteStepperItem>

                <CalciteStepperItem heading="Step 6: Benefit Analysis">
                    <BenefitsAndResults userConflictProbability={userConflictProbability} />
                </CalciteStepperItem>
            </CalciteStepper>
        </div>
    );
};
