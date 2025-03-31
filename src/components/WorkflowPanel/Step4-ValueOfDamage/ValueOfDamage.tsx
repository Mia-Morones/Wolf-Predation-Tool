import React, { FC } from 'react';
import { StepperContentContainerClasses } from '../WorkflowPanel';
import {
    CalciteInput,
    CalciteInputNumber,
} from '@esri/calcite-components-react';
import {
    Livestock,
    livestockHandlingCostChanged,
    livestockMarketValueChanged,
    LIVESTOCKS,
} from '@store/WolfPredation/reducer';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectLivestockHandlingCost,
    selectLivestockMarketValue,
} from '@store/WolfPredation/selectors';

type TableProps = {
    livestock: Livestock;
    marketValue: number;
    cost: number;
    marketValueOnChange: (value: number) => void;
    costOnChange: (value: number) => void;
};

// const LIVESTOCKS = ['Calves', 'lambs', 'yearlings', 'ewes', 'cows', 'rams'];

const Table: FC<TableProps> = ({
    livestock,
    marketValue,
    cost,
    marketValueOnChange,
    costOnChange,
}) => {
    return (
        <div
            className="grid gap-3 my-2 items-center"
            style={{
                gridTemplateColumns: `120px 1fr 1fr`,
            }}
        >
            <div className=" font-medium">{livestock}</div>
            <CalciteInputNumber
                placeholder="market value"
                step={1}
                max={100000}
                min={0}
                value={marketValue.toString()}
                suffixText="$"
                onCalciteInputNumberChange={(e) => {
                    marketValueOnChange(parseInt(e.target.value));
                }}
            />
            <CalciteInputNumber
                placeholder="handling costs"
                step={1}
                max={100000}
                min={0}
                value={cost.toString()}
                suffixText="$"
                onCalciteInputNumberChange={(e) => {
                    costOnChange(parseInt(e.target.value));
                }}
            />
        </div>
    );
};

export const ValueOfDamage = () => {
    const dispatch = useDispatch();

    const marketValueByLivestock = useSelector(selectLivestockMarketValue);

    const handlingCostByLivestock = useSelector(selectLivestockHandlingCost);

    return (
        <div className={StepperContentContainerClasses}>
            <p className="mb-4">
                We recognize that value of your livestock varies by operation.
                In addition, the cost to handle livestock killed by wolves
                varies from one producer to the next.
            </p>

            <p className="mb-6">
                We apply a formula to compute a weighted average for one animal
                being killed based your answers below. Tell us, for cattle only
                or sheep only, if one of the following were to be killed by a
                wolf/wolves, how much lost income including costs associated
                with carcass removal/handling would be incurred. Indicate the
                market value you lost and the costs to handle the carcass and
                file for assistance if pursued.
            </p>

            <div
                className="grid gap-3 font-bold mb-2"
                style={{
                    gridTemplateColumns: `120px 1fr 1fr`,
                }}
            >
                <h4>Livestock</h4>
                <h4>Net Market Value</h4>
                <h4>Handling Costs</h4>
            </div>

            {LIVESTOCKS.map((livestock) => {
                const marketValue = marketValueByLivestock[livestock];
                const handlingCost = handlingCostByLivestock[livestock];

                return (
                    <Table
                        key={livestock}
                        livestock={livestock}
                        costOnChange={(val) => {
                            dispatch(
                                livestockHandlingCostChanged({
                                    livestock,
                                    value: val,
                                })
                            );
                        }}
                        marketValueOnChange={(val) => {
                            dispatch(
                                livestockMarketValueChanged({
                                    livestock,
                                    value: val,
                                })
                            );
                        }}
                        marketValue={marketValue}
                        cost={handlingCost}
                    />
                );
            })}
        </div>
    );
};
