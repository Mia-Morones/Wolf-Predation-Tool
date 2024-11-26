import React, { FC } from 'react';
import { StepperContentContainerClasses } from '../WorkflowPanel';
import { CalciteInputNumber } from '@esri/calcite-components-react';

type CostAdjustmentTableProps = {
    title: string;
    description: string;
    value: number;
    onChange: (value: number) => void;
};

const CostAdjustmentTable: FC<CostAdjustmentTableProps> = ({
    title,
    description,
    value,
    onChange,
}) => {
    return (
        <div
            className="grid gap-3 my-2"
            style={{
                gridTemplateColumns: `120px 1fr 1fr`,
            }}
        >
            <div className=" font-medium">{title}</div>

            <div>
                <span>{description}</span>
            </div>

            <CalciteInputNumber
                placeholder="costs"
                step={1}
                // max={100000}
                min={0}
            />
        </div>
    );
};

export const CostAdjustment = () => {
    return (
        <div className={StepperContentContainerClasses}>
            <p className="mb-6">
                Below are our estimated costs by mitigation practice. Plug in
                the quantity you plan to use and costs will automatically fill.
                Or, enter your own cost, and we will use that with your quantity
                to estimate your costs. If you’re curious to see how these
                values were determined, see resources at the bottom of the page.
            </p>

            <CostAdjustmentTable
                title={'Turbo Fladry'}
                description="How many miles of fencing would you need?"
                value={0}
                onChange={() => {}}
            />

            <CostAdjustmentTable
                title={'Range Riding'}
                description="How many range riders would you need?"
                value={0}
                onChange={() => {}}
            />

            <CostAdjustmentTable
                title={'Carcass Composting'}
                description="This is calculated as price/carcass"
                value={0}
                onChange={() => {}}
            />
        </div>
    );
};
