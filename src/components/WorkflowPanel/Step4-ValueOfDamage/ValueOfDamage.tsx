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
                WolfWise recognizes that the value of livestock varies by operation. 
                In addition, the cost to handle livestock killed by wolves varies 
                from one producer to the next.
            </p>

            <p className="mb-6">
                The program applies a formula to compute a weighted average for one 
                animal being killed based your answers on the previous screen and those 
                below. For cattle only or sheep only, how much income would you lose 
                by not being able to sell each type of livestock. What is its value? 
                Also, indicate the costs associated with carcass removal/handling. This 
                could include time, fees, and transportation.
            </p>

            <p className="mb-6">
                You may inflate the value of an animal to include other values if you like. 
                For example, if an animal lost would be worth $2,000, you might value it at 
                $4,000 to account for multiple deaths in a single year, or to account for 
                indirect losses such as reduced pregnancy rates, herd weight loss, or animals 
                not found. You can also account for these other losses in the carcass 
                removal/handling box.
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
