import React from 'react';
import { StepperContentContainerClasses } from '../WorkflowPanel';
import { SEARCH_WIDGET_CONTAINER_ID } from '@constants/UI';

export const LocationSelector = () => {
    return (
        <div className={StepperContentContainerClasses}>
            <p className="mb-4">
                Type your address or coordinates into the address bar and from
                there drag and pull to customize your operation’s specific shape
                and size.
            </p>

            <div id={SEARCH_WIDGET_CONTAINER_ID} className="w-full"></div>
        </div>
    );
};
