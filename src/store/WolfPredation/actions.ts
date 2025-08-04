export const SET_TOTAL_MITIGATION_COST = 'SET_TOTAL_MITIGATION_COST';

export const setTotalMitigationCost = (cost: number) => ({
  type: SET_TOTAL_MITIGATION_COST,
  payload: cost,
});