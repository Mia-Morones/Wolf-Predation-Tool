import { AppHeader } from '@components/AppHeader/AppHeader';
import React from 'react';

export const AboutPage = () => {
    return (
        <div>
            <AppHeader />

            <div className=" container my-12">
                This tool provides information about the economic feasibility of
                non-lethal wolf conflict reduction practices and devices, and it
                is tailored to an individual livestock property. You can
                estimate the probability of wolf conflict and estimate expected
                costs of livestock loss as compared to the cost of mitigation.
                Note: Analysis from this decision tool are estimates and may
                vary from actual conditions.
            </div>
        </div>
    );
};
