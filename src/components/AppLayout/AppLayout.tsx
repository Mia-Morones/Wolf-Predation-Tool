import MapViewContainer from '@components/Map/MapViewContainer';
import { CalciteButton } from '@esri/calcite-components-react';
import { useSaveAppState2HashParams } from '@hooks/useSaveAppState2HashParams';
import React from 'react';

export const AppLayout = () => {
    useSaveAppState2HashParams();

    return (
        <>
            <MapViewContainer />

            <div className="absolute top-0 right-0 w-96 h-full p-4 bg-theme-background text-theme-foreground z-10">
                <CalciteButton iconStart="launch" width="full">
                    Placeholder Button
                </CalciteButton>
            </div>
        </>
    );
};
