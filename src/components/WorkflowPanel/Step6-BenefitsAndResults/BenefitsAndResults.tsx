import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
    selectWolfCattleConflictProbability,
    selectLivestockHerdSize,
    selectLivestockMarketValue,
    selectLivestockHandlingCost,
    selectTotalMitigationCost,
} from '@store/WolfPredation/selectors';
import { LIVESTOCKS } from '@store/WolfPredation/reducer';
import { StepperContentContainerClasses } from '../WorkflowPanel';

interface BenefitsAndResultsProps {
    userConflictProbability: number | null;
}

export const BenefitsAndResults: React.FC<BenefitsAndResultsProps> = ({ userConflictProbability }) => {
    const modelConflictProbability = useSelector(selectWolfCattleConflictProbability); // decimal (e.g. 0.25)
    const livestockHerdSize = useSelector(selectLivestockHerdSize);
    const livestockMarketValue = useSelector(selectLivestockMarketValue);
    const livestockHandlingCost = useSelector(selectLivestockHandlingCost);
    const totalMitigationCost = useSelector(selectTotalMitigationCost);

    const totalHerdSize = useMemo(() => {
        return LIVESTOCKS.reduce((sum, livestock) => sum + (livestockHerdSize[livestock] || 0), 0);
    }, [livestockHerdSize]);

    const weightedAverageLossPerAnimal = useMemo(() => {
        if (totalHerdSize === 0) return 0;
        return LIVESTOCKS.reduce((sum, livestock) => {
            const herdSize = livestockHerdSize[livestock] || 0;
            const marketValue = livestockMarketValue[livestock] || 0;
            const handlingCost = livestockHandlingCost[livestock] || 0;
            return sum + (herdSize / totalHerdSize) * (marketValue + handlingCost);
        }, 0);
    }, [totalHerdSize, livestockHerdSize, livestockMarketValue, livestockHandlingCost]);

    const calculateMetrics = (conflictProb: number) => {
        const pli = weightedAverageLossPerAnimal * conflictProb;

        const denominator = conflictProb * weightedAverageLossPerAnimal;
        const breakEvenEfficiency = denominator === 0 ? null : Math.min(1, totalMitigationCost / denominator);

        const subsidyEff = (subsidy: number) => {
            const adjustedCost = totalMitigationCost * (1 - subsidy);
            return denominator === 0 ? null : Math.min(1, adjustedCost / denominator);
        };

        return {
            pli,
            breakEvenEfficiency,
            subsidizedEfficiencies: {
                '25%': subsidyEff(0.25),
                '50%': subsidyEff(0.5),
                '100%': subsidyEff(1),
            },
        };
    };

    const modelResults = calculateMetrics(modelConflictProbability);
    const userResults = userConflictProbability !== null
        ? calculateMetrics(userConflictProbability)
        : null;

    return (
        <div className={StepperContentContainerClasses}>
            <p className="mb-4">
                Using information from the model and what you entered, <strong>WolfWise</strong> estimates 
                how much a practice would need to reduce risk for the cost of the practice to be covered 
                by the losses the practice prevents. We call this <strong>“breakeven efficacy”</strong>. 
                For example, if your risk was 40%, and your “breakeven efficacy” was 50%, then the practice 
                must reduce risk from 40% to 20% or less. If the practice reduces your risk by 50% or more, 
                the practice offsets at least as much loss as it costs. If you are unsure how much the practice 
                reduces risk, find break even, then ask yourself if you think it is more or less effective 
                than break even.
            </p>

            <h3 className="font-bold text-lg mb-2">Model-Estimated Conflict</h3>
            <p><b>{(modelConflictProbability * 100).toFixed(2)}%</b> – Probability of losing one animal to predation</p>
            <p><b>${weightedAverageLossPerAnimal.toFixed(2)}</b> – Value of lost animal (weighted average across the herd)</p>
            <p><b>${modelResults.pli.toFixed(2)}</b> – Potential loss based on probability and value</p>

            <p className="mt-4 font-semibold">Minimum required practice efficacy to Break Even with cost</p>
            <p>
                <b>{modelResults.breakEvenEfficiency !== null ? (modelResults.breakEvenEfficiency * 100).toFixed(0) + '%' : 'N/A'}</b> – Minimum required reduction in risk. Reduction required<br />
                for reduced potential losses to outweigh cost of practice.
            </p>

            {modelResults.breakEvenEfficiency === 1 && (
                <p className="mt-2 font-semibold">
                    If Break Even is 100%, practice cannot prevent more loss than it costs.
                </p>
            )}

            <p className="mt-4 font-semibold">Minimum required practice efficacy with practice cost share:</p>
            <ul className="list-none pl-0">
                <li><b>{(modelResults.subsidizedEfficiencies['25%']! * 100).toFixed(0)}%</b> – Cost share covers 25% of practice cost</li>
                <li><b>{(modelResults.subsidizedEfficiencies['50%']! * 100).toFixed(0)}%</b> – Cost share covers 50% of practice cost</li>
                <li><b>{(modelResults.subsidizedEfficiencies['100%']! * 100).toFixed(0)}%</b> – Practice is always cost effective with 100% cost share.</li>
            </ul>

            {userResults && (
                <>
                    <hr className="my-4" />
                    <h3 className="font-bold text-lg mb-2">User-Adjusted Conflict</h3>
                    <p><b>{(userConflictProbability * 100).toFixed(2)}%</b> – Probability of losing one animal to predation</p>
                    <p><b>${weightedAverageLossPerAnimal.toFixed(2)}</b> – Value of lost animal (weighted average across the herd)</p>
                    <p><b>${userResults.pli.toFixed(2)}</b> – Potential loss based on probability and value</p>

                    <p className="mt-4 font-semibold">Minimum required practice efficacy to Break Even with cost</p>
                    <p>
                        <b>{userResults.breakEvenEfficiency !== null ? (userResults.breakEvenEfficiency * 100).toFixed(0) + '%' : 'N/A'}</b> – Minimum required reduction in risk. Reduction required<br />
                        for reduced potential losses to outweigh cost of practice.
                    </p>

                    {userResults.breakEvenEfficiency === 1 && (
                        <p className="mt-2 font-semibold">
                            If Break Even is 100%, practice cannot prevent more loss than it costs.
                        </p>
                    )}

                    <p className="mt-4 font-semibold">Minimum required practice efficacy with practice cost share:</p>
                    <ul className="list-none pl-0">
                        <li><b>{(userResults.subsidizedEfficiencies['25%']! * 100).toFixed(0)}%</b> – Cost share covers 25% of practice cost</li>
                        <li><b>{(userResults.subsidizedEfficiencies['50%']! * 100).toFixed(0)}%</b> – Cost share covers 50% of practice cost</li>
                        <li><b>{(userResults.subsidizedEfficiencies['100%']! * 100).toFixed(0)}%</b> – Practice is always cost effective with 100% cost share.</li>
                    </ul>
                </>
            )}
        </div>
    );
};






