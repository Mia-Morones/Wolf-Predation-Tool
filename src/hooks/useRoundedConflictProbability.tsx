import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectWolfCattleConflictProbability } from '@store/WolfPredation/selectors';

export const useRoundedConflictProbability = () => {
    const conflictProbability = useSelector(
        selectWolfCattleConflictProbability
    );

    const useRoundedConflictProbability = useMemo(() => {
        return Math.round(conflictProbability * 100).toFixed(0);
    }, [conflictProbability]);

    return useRoundedConflictProbability;
};
