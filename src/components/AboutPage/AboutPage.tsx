import { AppHeader } from '@components/AppHeader/AppHeader';
import React from 'react';

export const AboutPage = () => {
    return (
        <div>
            <AppHeader />

            <div className=" container my-12">
                This website provides livestock producers with an easy-to-use tool to evaluate 
                the economic costs of using conflict reduction practices specifically tailored 
                to the location of a livestock operation and how likely wolf losses might be. 
                WolfWise estimates the probability and value of losing livestock to wolves and 
                compares it to the costs of using prevention tools. The program provides 
                estimates based on conflict data and a prevention cost report from 2025 and can be 
                overwritten to experiment with a user’s personal experiences about a location 
                or operation.  
            </div>
        </div>
    );
};
