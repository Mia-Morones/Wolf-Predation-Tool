import { selectWolfCattleConflictProbability } from '@store/WolfPredation/selectors';
import React from 'react';
import { useSelector } from 'react-redux';

export const RiskAdjustments = () => {
    const conflictProbability = useSelector(
        selectWolfCattleConflictProbability
    );

    return (
        <div className="p-2 text-theme-foreground text-sm">
            <div className="mb-6 flex items-center justify-between text-base">
                <h4>Your base probability for wolf/cattle conflict is:</h4>
                <h4 className=" font-bold text-red-500">
                    {conflictProbability === null
                        ? 'unknown'
                        : Math.round(conflictProbability * 100).toFixed(0) +
                          '%'}
                </h4>
            </div>

            <p className="mb-4">
                Every operation has its own unique characteristics, and our risk
                probability model cannot fully account these local effects.
                Although researchers have yet to identify the exact impact of
                local effects, we list below some of the factors that COULD
                increase your chances of a realizing a conflict so that you can
                override our estimates if you choose. We will show you results
                based on our estimate and yours.
            </p>

            <ul className=" list-disc list-inside">
                <li>
                    A known wolf pack has established hunting grounds in your
                    area
                </li>
                <li>
                    There has been evidence (tracks, scat, etc.) of a wolf/wolf
                    pack within your area this season or the season prior
                </li>
                <li>
                    There has been instances of wolf/cattle conflict or
                    predation near you in this season or prior
                </li>
            </ul>
        </div>
    );
};
