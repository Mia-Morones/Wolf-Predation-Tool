import React, { useMemo } from 'react';
import { StepperContentContainerClasses } from '../WorkflowPanel';
import { useRoundedConflictProbability } from '@hooks/useRoundedConflictProbability';
import { useSelector } from 'react-redux';
import {
    selectCarcassCompostingCost,
    selectLivestockHandlingCost,
    selectLivestockHerdSize,
    selectLivestockMarketValue,
    selectMilesOfTurboFladry,
    selectNumberOfRangeRiders,
    selectWolfCattleConflictProbability,
} from '@store/WolfPredation/selectors';
import { LIVESTOCKS } from '@store/WolfPredation/reducer';

export const BenefitsAndResults = () => {
    const formattedConflictProbability = useRoundedConflictProbability();
    const conflictProbability = useSelector(
        selectWolfCattleConflictProbability
    );

    const livestockHerdSize = useSelector(selectLivestockHerdSize);
    const livestockMarketValue = useSelector(selectLivestockMarketValue);
    const livestockHandlingCost = useSelector(selectLivestockHandlingCost);

    const milesOfFencing = useSelector(selectMilesOfTurboFladry);
    const rangeRiders = useSelector(selectNumberOfRangeRiders);
    const carcassCompostingCost = useSelector(selectCarcassCompostingCost);

    const totalMarketValue = useMemo(() => {
        const total = LIVESTOCKS.reduce((acc, livestock) => {
            return (
                acc +
                livestockHerdSize[livestock] * livestockMarketValue[livestock]
            );
        }, 0);

        return total;
    }, [livestockHerdSize, livestockMarketValue]);

    const totalHandlingCost = useMemo(() => {
        const total = LIVESTOCKS.reduce((acc, livestock) => {
            return (
                acc +
                livestockHerdSize[livestock] * livestockHandlingCost[livestock]
            );
        }, 0);

        return total;
    }, [livestockHerdSize, livestockHandlingCost]);

    const totalPotentialLose = useMemo(() => {
        return (totalMarketValue + totalHandlingCost) * conflictProbability;
    }, [totalMarketValue, totalHandlingCost, conflictProbability]);

    return (
        <div className={StepperContentContainerClasses}>
            <p className="mb-4">
                Based on your location, there is a{' '}
                <span className="text-red-500 font-bold">
                    {formattedConflictProbability}%
                </span>{' '}
                mean probability of a wolf conflict/predation occurring.
            </p>
            <p className="mb-4">
                The total market value is <b>${totalMarketValue.toFixed(0)}</b>,
                and the the handling cost is <b>${totalHandlingCost}</b>, for a
                total potential loss of <a>{totalPotentialLose.toFixed(2)}</a>.
            </p>
            <p className="mb-6">
                Your expected loss in any one year is{' '}
                {conflictProbability.toFixed(2)} x (${totalMarketValue}+$
                {totalHandlingCost}) ={' '}
                <span className="font-bold">
                    ${totalPotentialLose.toFixed(2)}
                </span>{' '}
                dollars of lost income.
            </p>

            <div>
                <h4 className=" text-base font-medium">Results:</h4>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Aspernatur ea quia eligendi repudiandae illo pariatur nam
                    beatae aliquam adipisci totam nobis obcaecati tenetur, at
                    itaque, temporibus asperiores iste consequuntur. Illo?
                </p>
            </div>
        </div>
    );
};
