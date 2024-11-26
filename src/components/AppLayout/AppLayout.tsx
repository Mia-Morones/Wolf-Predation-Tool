import { AppHeader } from '@components/AppHeader/AppHeader';
import { InfoPanel } from '@components/InfoPanel/InfoPanel';
import MapViewContainer from '@components/Map/MapViewContainer';
import { WorkflowPanel } from '@components/WorkflowPanel/WorkflowPanel';
import { CalciteButton } from '@esri/calcite-components-react';
import { useSaveAppState2HashParams } from '@hooks/useSaveAppState2HashParams';
import React from 'react';

export const AppLayout = () => {
    useSaveAppState2HashParams();

    return (
        <>
            <AppHeader />

            <div className="absolute top-[65px] bottom-0 w-screen flex  bg-theme-background text-theme-foreground">
                <div className=" w-[600px] shrink-0 h-full p-4 z-10">
                    <WorkflowPanel />
                </div>

                <div className="relative grow">
                    <MapViewContainer />
                </div>

                {/* <div className=" w-96 shrink-0 h-full p-4 bg-theme-background text-theme-foreground z-10">
                    <InfoPanel />
                </div> */}
            </div>
        </>
    );
};
