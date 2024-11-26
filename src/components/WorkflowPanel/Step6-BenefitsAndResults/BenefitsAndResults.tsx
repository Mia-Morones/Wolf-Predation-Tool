import React from 'react';
import { StepperContentContainerClasses } from '../WorkflowPanel';

export const BenefitsAndResults = () => {
    return (
        <div className={StepperContentContainerClasses}>
            <p className="mb-4">
                Based on your location, there is a{' '}
                <span className="text-red-500 font-bold">45%</span> mean
                probability of a wolf conflict/predation occurring.
            </p>
            <p className="mb-4">
                The average value of a head of cattle on your operation is
                $1,150. Xx250x is the handling cost, for a total potential loss
                of yyyy
            </p>
            <p className="mb-6">
                Your expected loss in any one year is 0.45 x (1150+250) ={' '}
                <span className="font-bold">$630.00</span> dollars of lost
                income.
            </p>

            <div>
                <h4 className=" text-base font-medium">Results:</h4>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Aspernatur ea quia eligendi repudiandae illo pariatur nam
                    beatae aliquam adipisci totam nobis obcaecati tenetur, at
                    itaque, temporibus asperiores iste consequuntur. Illo?
                </p>
            </div>
        </div>
    );
};
