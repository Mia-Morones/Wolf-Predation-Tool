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
    ? calculateMetrics(userConflictProbability) // already decimal
    : null;

    return (
        <div className={StepperContentContainerClasses}>
            <h3 className="font-bold text-lg mb-2">Model-Estimated Conflict</h3>
            <p>Conflict Probability: <b>{(modelConflictProbability * 100).toFixed(2)}%</b></p>
            <p>Weighted Avg. Loss/Animal: <b>${weightedAverageLossPerAnimal.toFixed(2)}</b></p>
            <p>Potential Lost Income: <b>${modelResults.pli.toFixed(2)}</b></p>
            <p>Break-Even Efficiency: <b>{modelResults.breakEvenEfficiency !== null ? (modelResults.breakEvenEfficiency * 100).toFixed(2) + '%' : 'N/A'}</b></p>
            <br />
            <p>Under the following practice subsidization levels, this is how effective your practice or combination 
                of practices would need to be in order to offset your costs:
            </p>
            <ul>
                <li>25% Subsidy: <b>{(modelResults.subsidizedEfficiencies['25%']! * 100).toFixed(2)}%</b></li>
                <li>50% Subsidy: <b>{(modelResults.subsidizedEfficiencies['50%']! * 100).toFixed(2)}%</b></li>
                <li>100% Subsidy: <b>{(modelResults.subsidizedEfficiencies['100%']! * 100).toFixed(2)}%</b></li>
            </ul>

            {userResults && (
                <>
                    <hr className="my-4" />
                    <h3 className="font-bold text-lg mb-2">User-Adjusted Conflict</h3>
                    <p>Conflict Probability: <b>{(userConflictProbability * 100).toFixed(2)}%</b></p>
                    <p>Weighted Avg. Loss/Animal: <b>${weightedAverageLossPerAnimal.toFixed(2)}</b></p>
                    <p>Potential Lost Income: <b>${userResults.pli.toFixed(2)}</b></p>
                    <p>Break-Even Efficiency: <b>{userResults.breakEvenEfficiency !== null ? (userResults.breakEvenEfficiency * 100).toFixed(2) + '%' : 'N/A'}</b></p>
                     <br />
                    <p>Under the following practice subsidization levels, this is how effective your practice or combination 
                         of practices would need to be in order to offset your costs:
                    </p>
                    <ul>
                        <li>25% Subsidy: <b>{(userResults.subsidizedEfficiencies['25%']! * 100).toFixed(2)}%</b></li>
                        <li>50% Subsidy: <b>{(userResults.subsidizedEfficiencies['50%']! * 100).toFixed(2)}%</b></li>
                        <li>100% Subsidy: <b>{(userResults.subsidizedEfficiencies['100%']! * 100).toFixed(2)}%</b></li>
                    </ul>
                </>
            )}
        </div>
    );
};




