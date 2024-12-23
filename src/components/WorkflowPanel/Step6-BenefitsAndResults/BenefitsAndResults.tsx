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

const COST_TURBO_FLADRY_PER_MILE = 4000;

/**
 * As of December 2024, the average hourly wage for a Range Rider in Colorado is approximately $19.01,
 * equating to an annual salary of about $39,540, assuming full-time employment
 *
 * @see https://www.ziprecruiter.com/Salaries/Range-Rider-Salary--in-Colorado
 */
const RANGE_RIDER_SALARY = 40000;

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

    /**
     * Calculates the total market value of all livestock.
     *
     * This function calculates the total market value of the livestock based on their herd sizes and market values.
     * The calculation is performed by iterating over the list of livestocks and summing up the product of the herd size and
     * market value for each type of livestock.
     *
     * @returns {number} The total market value of all livestock.
     */
    const totalMarketValue = useMemo(() => {
        const total = LIVESTOCKS.reduce((acc, livestock) => {
            return (
                acc +
                livestockHerdSize[livestock] * livestockMarketValue[livestock]
            );
        }, 0);

        return total;
    }, [livestockHerdSize, livestockMarketValue]);

    /**
     * Calculates the total handling cost for all livestock.
     *
     * This function calculates the  total handling cost of the livestock based on their herd sizes and handling cost.
     * The calculation is performed by iterating over the list of livestocks and summing up the product of the herd size and
     * handling cost for each type of livestock.
     *
     * @returns {number} The total handling cost for all livestock.
     */
    const totalHandlingCost = useMemo(() => {
        const total = LIVESTOCKS.reduce((acc, livestock) => {
            return (
                acc +
                livestockHerdSize[livestock] * livestockHandlingCost[livestock]
            );
        }, 0);

        return total;
    }, [livestockHerdSize, livestockHandlingCost]);

    /**
     * Calculates the total potential loss based on the total market value,
     * total handling cost, and conflict probability.
     *
     * @returns {number} The total potential loss.
     */
    const totalPotentialLose = useMemo(() => {
        return (totalMarketValue + totalHandlingCost) * conflictProbability;
    }, [totalMarketValue, totalHandlingCost, conflictProbability]);

    const totalTurboFladryCost = useMemo(() => {
        return milesOfFencing * COST_TURBO_FLADRY_PER_MILE;
    }, [milesOfFencing]);

    const totalRangeRidersCost = useMemo(() => {
        return rangeRiders * RANGE_RIDER_SALARY;
    }, [rangeRiders]);

    /**
     * Calculates the break-even efficiency for the management practices.
     *
     * This value represents the efficiency at which the cost of management practices
     * equals the potential loss. It is calculated as 1 minus the ratio of the total
     * cost of management practices to the total potential loss.
     *
     * @returns {number} The break-even efficiency.
     */
    const breakEvenEfficency = useMemo(() => {
        const costManagementPractice =
            totalTurboFladryCost + totalRangeRidersCost + carcassCompostingCost;

        if (totalPotentialLose === 0) {
            return 0;
        }

        return 1 - costManagementPractice / totalPotentialLose;
    }, [
        totalPotentialLose,
        totalTurboFladryCost,
        totalRangeRidersCost,
        carcassCompostingCost,
    ]);

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
                total potential loss of <b>{totalPotentialLose.toFixed(2)}</b>.
            </p>
            <p className="mb-4">
                Your expected loss in any one year is{' '}
                {conflictProbability.toFixed(2)} x (${totalMarketValue}+$
                {totalHandlingCost}) ={' '}
                <span className="font-bold">
                    ${totalPotentialLose.toFixed(2)}
                </span>{' '}
                dollars of lost income.
            </p>

            <p className="mb-4">
                The average cost of Turbo Fladry per mile is{' '}
                <b>${COST_TURBO_FLADRY_PER_MILE}</b>, and your total cost of
                turbo fladry is <b>${totalTurboFladryCost}</b>.
            </p>

            <p className="mb-4">
                The average salary of a Range Rider is{' '}
                <b>${RANGE_RIDER_SALARY}</b>, and your total cost of range
                riders is <b>${totalRangeRidersCost}</b>.
            </p>

            <p className="mb-4">
                The total cost of carcass composting is{' '}
                <b>${carcassCompostingCost}</b>.
            </p>

            <div className="mt-2">
                <h4 className=" text-base font-medium">Results:</h4>
                <p className="mb-4">
                    The break-even efficiency represents the efficiency at which
                    the cost of management practices equals the potential loss.
                    This value helps to understand how effective a mitigation
                    practice, or combination of practices, needs to be for the
                    cost to cover or break even with the potential lost income.
                    By subtracting the efficiency from one, we get the remaining
                    probability of predation after accounting for the
                    effectiveness of the practice.
                </p>

                <p>
                    The break-even efficiency is{' '}
                    <b>{(breakEvenEfficency * 100).toFixed(2)}%</b>
                </p>
            </div>
        </div>
    );
};
