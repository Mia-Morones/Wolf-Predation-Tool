import React from 'react';
import { StepperContentContainerClasses } from '../WorkflowPanel';
import {
    CalciteIcon,
    CalciteInput,
    CalciteInputNumber,
} from '@esri/calcite-components-react';

const LIVESTOCKS = ['calves', 'lambs', 'yearlings', 'ewes', 'cows', 'rams'];

export const QuizAboutOperation = () => {
    const [selectedLivestocks, setSelectedLivestocks] = React.useState<
        string[]
    >([]);

    const toggleLivestock = (livestock: string) => {
        if (selectedLivestocks.includes(livestock)) {
            setSelectedLivestocks(
                selectedLivestocks.filter((l) => l !== livestock)
            );
        } else {
            setSelectedLivestocks([...selectedLivestocks, livestock]);
        }
    };

    return (
        <div className={StepperContentContainerClasses}>
            <h4 className="mb-4 text-base">
                Do you have any of the following livestock? Check the box if
                yes:
            </h4>

            <div className="grid grid-cols-2 gap-2 px-2 mb-6 ">
                {LIVESTOCKS.map((livestock, index) => {
                    return (
                        <div
                            key={livestock}
                            className="flex items-center "
                            onClick={() => {
                                toggleLivestock(livestock);
                            }}
                        >
                            <CalciteIcon
                                icon={
                                    selectedLivestocks.includes(livestock)
                                        ? 'check-square'
                                        : 'square'
                                }
                                scale="s"
                            />
                            <span className="ml-2"> {livestock}:</span>
                        </div>
                    );
                })}
            </div>

            <div className="mb-6 flex items-center justify-between text-base">
                <h4>What is the approximate size of your cattle herd?</h4>
                <CalciteInputNumber
                    placeholder="cattle herd size"
                    step={1}
                    max={100000}
                    min={0}
                />
            </div>

            <div className="mb-6 flex items-center justify-between text-base">
                <h4>What is the approximate size of your sheep herd?</h4>
                <CalciteInputNumber
                    placeholder="heep herd size"
                    step={1}
                    max={100000}
                    min={0}
                />
            </div>
        </div>
    );
};
