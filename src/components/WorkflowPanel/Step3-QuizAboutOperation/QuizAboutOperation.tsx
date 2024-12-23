import React from 'react';
import { StepperContentContainerClasses } from '../WorkflowPanel';
import {
    CalciteIcon,
    CalciteInput,
    CalciteInputNumber,
} from '@esri/calcite-components-react';
import {
    livestockHerdSizeChanged,
    LIVESTOCKS,
} from '@store/WolfPredation/reducer';
import { useDispatch, useSelector } from 'react-redux';
import { selectLivestockHerdSize } from '@store/WolfPredation/selectors';

export const QuizAboutOperation = () => {
    const dispatch = useDispatch();

    const herdSizeByLivestock = useSelector(selectLivestockHerdSize);

    return (
        <div className={StepperContentContainerClasses}>
            <h4 className="mb-4 text-base">
                Please enter the estimated size for each of the following
                livestock:
            </h4>

            {/* <div className="grid grid-cols-2 gap-2 px-2 mb-6 ">
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
                            <span className="ml-2"> {livestock}</span>
                        </div>
                    );
                })}
            </div> */}

            {LIVESTOCKS.map((livestock, index) => {
                const value = herdSizeByLivestock[livestock];
                return (
                    <div
                        key={livestock}
                        className="mb-6 grid grid-cols-2 gap-2 items-center"
                    >
                        <h4>
                            What is the approximate size of your {livestock}{' '}
                            herd?
                        </h4>
                        <CalciteInputNumber
                            placeholder={`${livestock} size`}
                            step={1}
                            max={1000}
                            min={0}
                            value={value.toString()}
                            onCalciteInputNumberChange={(e) => {
                                // console.log(e.target.value);
                                dispatch(
                                    livestockHerdSizeChanged({
                                        livestock,
                                        size: parseInt(e.target.value),
                                    })
                                );
                            }}
                        />
                    </div>
                );
            })}

            {/* <div className="mb-6 flex items-center justify-between text-base">
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
            </div> */}
        </div>
    );
};
