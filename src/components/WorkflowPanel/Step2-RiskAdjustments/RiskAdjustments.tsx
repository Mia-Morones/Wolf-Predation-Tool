import React from 'react';
import { useRoundedConflictProbability } from '@hooks/useRoundedConflictProbability';
import { StepperContentContainerClasses } from '../WorkflowPanel';
import { CalciteInputNumber } from '@esri/calcite-components-react';

interface RiskAdjustmentsProps {
  userConflictProbability: number | null;
  setUserConflictProbability: (value: number | null) => void;
}

export const RiskAdjustments: React.FC<RiskAdjustmentsProps> = ({
  userConflictProbability,
  setUserConflictProbability,
}) => {
  const conflictProbability = useRoundedConflictProbability(); // From model
  const displayedProbability = userConflictProbability !== null
    ? (userConflictProbability * 100).toFixed(1)
    : conflictProbability;

  return (
    <div className={StepperContentContainerClasses}>
      <div className="mb-6 text-base">
        <h4 className="mb-1">Your base probability for wolf/livestock conflict is:</h4>
        <h4 className="font-bold text-red-500">
          {conflictProbability === null ? 'unknown' : `${conflictProbability}%`}
        </h4>
      </div>

      <p className="mb-4">
        Every operation has its own unique characteristics, and this
        program cannot fully account for these local differences. Although 
        researchers have yet to identify the exact impact of local effects, 
        we list below some of the factors that COULD increase your chances 
        of realizing a conflict. You can override the program estimates if 
        you choose. Since it is difficult to know how much risk there really is, 
        try different amounts and see how it affects the economic feasibility 
        of prevention on your operation. We will show you results based on 
        both the program estimate and your own.
      </p>

      <ul className="list-disc list-inside mb-6">
        <li>A known wolf pack has established hunting grounds in your area</li>
        <li>There has been evidence (tracks, scat, etc.) of a wolf/wolf pack within your area this season or the season prior</li>
        <li>There have been instances of wolf/cattle conflict or predation near you in this season or prior</li>
        <li>The size of nearby packs is becoming larger, and/or have many pups to feed</li>
      </ul>

      <label className="block mb-2 font-medium">
        Adjusted Conflict Probability (%):
      </label>
      <CalciteInputNumber
        value={displayedProbability?.toString() || ''}
        onCalciteInputNumberChange={(e: CustomEvent) => {
          const value = parseFloat((e.target as HTMLCalciteInputNumberElement).value);
          if (!isNaN(value) && value >= 0 && value <= 100) {
            setUserConflictProbability(value / 100); // convert to decimal
          }
        }}
        min={0}
        max={100}
        step={1}
      />

      <p className="mt-2 text-sm text-gray-600">
        We’ll use both your adjusted probability of <strong>{displayedProbability}%</strong> along with the model calculated risk probability in the final analysis.
      </p>
    </div>
  );
};



