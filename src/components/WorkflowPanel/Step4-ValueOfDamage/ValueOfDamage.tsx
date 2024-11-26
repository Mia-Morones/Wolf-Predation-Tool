import React, { FC } from 'react';
import { StepperContentContainerClasses } from '../WorkflowPanel';
import {
    CalciteInput,
    CalciteInputNumber,
} from '@esri/calcite-components-react';

type TableProps = {
    livestock: string;
    marketValue: number;
    marketValueOnChange: (value: number) => void;
    cost: number;
    costOnChange: (value: number) => void;
};

const LIVESTOCKS = ['calves', 'lambs', 'yearlings', 'ewes', 'cows', 'rams'];

const Table: FC<TableProps> = ({
    livestock,
    marketValue,
    marketValueOnChange,
    cost,
    costOnChange,
}) => {
    return (
        <div
            className="grid gap-3 my-1"
            style={{
                gridTemplateColumns: `120px 1fr 1fr`,
            }}
        >
            <div className=" font-medium">{livestock}</div>
            <CalciteInputNumber
                placeholder="market value"
                step={1}
                // max={100000}
                min={0}
            />
            <CalciteInputNumber
                placeholder="costs"
                step={1}
                // max={100000}
                min={0}
            />
        </div>
    );
};

export const ValueOfDamage = () => {
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
                return (
                    <Table
                        key={livestock}
                        livestock={livestock}
                        costOnChange={(val) => {}}
                        marketValueOnChange={(val) => {}}
                        marketValue={0}
                        cost={0}
                    />
                );
            })}
        </div>
    );
};
