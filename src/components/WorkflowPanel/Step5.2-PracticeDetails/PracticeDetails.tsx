import React, { FC, useState } from 'react';
import { CalciteInputNumber } from '@esri/calcite-components-react';
import './PracticeDetails.css';

// Define the response structure type
interface Responses {
    turboFladryMiles: number;
    electrifiedNightPenningFeet: number;
    electrifiedNightPenningMonths: number;
    carcassesToCompost: number;
    livestockGuardianDogs: number;
    foxLights: number;
    solarSoundAlarms: number;
    gameCameras: number;
    turboFladryRockyTerrain: boolean;
    turboFladrySnowMachine: boolean;
    rangeRidingMonths: number;
    hoursPerWeek: number;
    transportationMethod: 'Horse' | 'ATV/UTV';
    numberOfTransport: number;
    milesFromOperation: number;
    rangeRidingRuggedTerrain: boolean;
    [key: string]: number | string | boolean;
}

interface PracticeDetailsProps {
    selectedPractices: {
        practices: string[];
        devices: string[];
    };
    handleResponseChange: (newResponses: Responses) => void;
}

export const defaultResponses: Responses = {
  turboFladryMiles: 0,
  electrifiedNightPenningFeet: 0,
  electrifiedNightPenningMonths: 0,
  carcassesToCompost: 0,
  livestockGuardianDogs: 0,
  foxLights: 0,
  solarSoundAlarms: 0,
  gameCameras: 0,
  turboFladryRockyTerrain: false,
  turboFladrySnowMachine: false,
  rangeRidingMonths: 0,
  hoursPerWeek: 0,
  transportationMethod: 'Horse',
  numberOfTransport: 0,
  milesFromOperation: 0,
  rangeRidingRuggedTerrain: false,
};

const PracticeDetails: FC<PracticeDetailsProps> = ({
    selectedPractices,
    handleResponseChange,
}) => {
    const [responses, setResponses] = useState<Responses>({
        turboFladryMiles: 0,
        electrifiedNightPenningFeet: 0,
        electrifiedNightPenningMonths: 0,
        carcassesToCompost: 0,
        livestockGuardianDogs: 0,
        foxLights: 0,
        solarSoundAlarms: 0,
        gameCameras: 0,
        turboFladryRockyTerrain: false,
        turboFladrySnowMachine: false,
        rangeRidingMonths: 0,
        hoursPerWeek: 0,
        transportationMethod: 'Horse',
        numberOfTransport: 0,
        milesFromOperation: 0,
        rangeRidingRuggedTerrain: false,
    });

    const handleDropdownChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    key: keyof Responses
) => {
    const value = e.target.value;

    const parsedValue =
        value === 'Yes'
            ? true
            : value === 'No'
            ? false
            : value; // fallback for string-based fields like "herdSize"

    const newResponses = { ...responses, [key]: parsedValue };
    setResponses(newResponses);
    handleResponseChange(newResponses);
};

    const handleInputChange = (e: CustomEvent, key: keyof Responses) => {
    const value = parseFloat((e.target as HTMLInputElement).value);
    const newResponses = { ...responses, [key]: value };
    setResponses(newResponses);
    handleResponseChange(newResponses);
};
    const handleTransportationMethodChange = (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const value = e.target.value as 'Horse' | 'ATV/UTV';
        const newResponses = { ...responses, transportationMethod: value };
        setResponses(newResponses);
        handleResponseChange(newResponses);
    };

    const renderPracticeQuestions = (practice: string) => {
        switch (practice) {
            case 'Turbo Fladry':
                return (
                    <div>
                        <h2 className="practice-header">
                            Turbo Fladry Questions
                        </h2>
                        <div>
                            <label>
                                How many miles of Turbo Fladry do you plan to
                                install?
                                <CalciteInputNumber
                                    value={
                                        responses[
                                            'turboFladryMiles'
                                        ]?.toString() || '0'
                                    }
                                    onCalciteInputNumberChange={(e) =>
                                        handleInputChange(e, 'turboFladryMiles')
                                    }
                                    min={0}
                                    step={0.5}
                                />
                            </label>
                        </div>

                        <div>
                            <label>
                                Do you live in an area that is particularly
                                rocky or rugged terrain or has deep snow?
                                <select
                                    value={
                                        responses['turboFladryRockyTerrain']
                                            ? 'Yes'
                                            : 'No'
                                    }
                                    onChange={(e) =>
                                        handleDropdownChange(
                                            e,
                                            'turboFladryRockyTerrain'
                                        )
                                    }
                                >
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                            </label>
                        </div>

                        <div>
                            <label>
                                Will you require a snow machine for
                                installation?
                                <select
                                    value={
                                        responses['turboFladrySnowMachine']
                                            ? 'Yes'
                                            : 'No'
                                    }
                                    onChange={(e) =>
                                        handleDropdownChange(
                                            e,
                                            'turboFladrySnowMachine'
                                        )
                                    }
                                >
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                            </label>
                        </div>
                    </div>
                );

            case 'Electrified Night Penning':
                return (
                    <div>
                        <h2 className="practice-header">
                            Electrified Night Penning Questions
                        </h2>
                        <div>
                            <label>
                                How many feet of fencing do you need?
                                <CalciteInputNumber
                                    value={
                                        responses[
                                            'electrifiedNightPenningFeet'
                                        ]?.toString() || '0'
                                    }
                                    onCalciteInputNumberChange={(e) =>
                                        handleInputChange(
                                            e,
                                            'electrifiedNightPenningFeet'
                                        )
                                    }
                                    min={0}
                                    step={1}
                                />
                            </label>
                        </div>

                        <div>
                            <label>
                                How many months will you require night penning?
                                <CalciteInputNumber
                                    value={
                                        responses[
                                            'electrifiedNightPenningMonths'
                                        ]?.toString() || '0'
                                    }
                                    onCalciteInputNumberChange={(e) =>
                                        handleInputChange(
                                            e,
                                            'electrifiedNightPenningMonths'
                                        )
                                    }
                                    min={0}
                                    step={1}
                                />
                            </label>
                        </div>
                    </div>
                );

            case 'Livestock Guardian Dog':
                return (
                    <div>
                        <h2 className="practice-header">
                            Livestock Guardian Dog Questions
                        </h2>
                        <div>
                            <label>
                                How many livestock guardian dogs are you
                                interested in employing?
                                <CalciteInputNumber
                                    value={
                                        responses[
                                            'livestockGuardianDogs'
                                        ]?.toString() || '0'
                                    }
                                    onCalciteInputNumberChange={(e) =>
                                        handleInputChange(
                                            e,
                                            'livestockGuardianDogs'
                                        )
                                    }
                                    min={0}
                                    step={1}
                                />
                            </label>
                        </div>
                    </div>
                );

            case 'Carcass Composting':
                return (
                    <div>
                        <h2 className="practice-header">
                            Carcass Composting Questions{' '}
                        </h2>
                        <div>
                            <label>
                                How many carcasses are you planning on
                                composting?
                                <CalciteInputNumber
                                    value={
                                        responses[
                                            'carcassesToCompost'
                                        ]?.toString() || '0'
                                    }
                                    onCalciteInputNumberChange={(e) =>
                                        handleInputChange(
                                            e,
                                            'carcassesToCompost'
                                        )
                                    }
                                    min={0}
                                    step={1}
                                />
                            </label>
                        </div>
                    </div>
                );

            // Render questions specific to Range Riding practice
            case 'Range Riding':
                return (
                    <div>
                        <h2 className="practice-header">
                            Range Riding Questions
                        </h2>
                        <div>
                            <label>
                                How many months of range riding would you need?
                                <CalciteInputNumber
                                    value={
                                        responses[
                                            'rangeRidingMonths'
                                        ]?.toString() || '0'
                                    }
                                    onCalciteInputNumberChange={(e) =>
                                        handleInputChange(
                                            e,
                                            'rangeRidingMonths'
                                        )
                                    }
                                    min={0}
                                    step={1}
                                />
                            </label>
                        </div>

                        <div>
                            <label>
                                How many hours of range riding do you need per
                                week?
                                <CalciteInputNumber
                                    value={
                                        responses['hoursPerWeek']?.toString() ||
                                        '0'
                                    }
                                    onCalciteInputNumberChange={(e) =>
                                        handleInputChange(e, 'hoursPerWeek')
                                    }
                                    min={0}
                                    step={1}
                                />
                            </label>
                        </div>

                        <div>
                            <label>
                                What method of transportation will be utilized
                                for range riding?
                                <select
                                    value={responses['transportationMethod']}
                                    onChange={handleTransportationMethodChange}
                                >
                                    <option value="Horse">Horse</option>
                                    <option value="ATV/UTV">ATV/UTV</option>
                                </select>
                            </label>
                        </div>

                        {responses['transportationMethod'] === 'Horse' && (
                            <div>
                                <label>
                                    How many horses will be needed?
                                    <CalciteInputNumber
                                        value={
                                            responses[
                                                'numberOfTransport'
                                            ]?.toString() || '0'
                                        }
                                        onCalciteInputNumberChange={(e) =>
                                            handleInputChange(
                                                e,
                                                'numberOfTransport'
                                            )
                                        }
                                        min={0}
                                        step={1}
                                    />
                                </label>
                            </div>
                        )}

                        {responses['transportationMethod'] === 'ATV/UTV' && (
                            <div>
                                <label>
                                    How many ATV/UTVs will be needed?
                                    <CalciteInputNumber
                                        value={
                                            responses[
                                                'numberOfTransport'
                                            ]?.toString() || '0'
                                        }
                                        onCalciteInputNumberChange={(e) =>
                                            handleInputChange(
                                                e,
                                                'numberOfTransport'
                                            )
                                        }
                                        min={0}
                                        step={1}
                                    />
                                </label>
                            </div>
                        )}

                        <div>
                            <label>
                                How many miles away is your operation from where
                                you keep horses/ATV/UTV?
                                <CalciteInputNumber
                                    value={
                                        responses[
                                            'milesFromOperation'
                                        ]?.toString() || '0'
                                    }
                                    onCalciteInputNumberChange={(e) =>
                                        handleInputChange(
                                            e,
                                            'milesFromOperation'
                                        )
                                    }
                                    min={0}
                                    step={1}
                                />
                            </label>
                        </div>

                        <div>
                            <label>
                                Do you live in an area with particularly rugged
                                or rough terrain?
                                <select
                                    value={
                                        responses['rangeRidingRuggedTerrain']
                                            ? 'Yes'
                                            : 'No'
                                    }
                                    onChange={(e) =>
                                        handleDropdownChange(
                                            e,
                                            'rangeRidingRuggedTerrain'
                                        )
                                    }
                                >
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                            </label>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    const deviceKeyMap: { [key: string]: string } = {
    'Fox Light': 'foxLights',
    'Solar Sound Alarm': 'solarSoundAlarms',
    'Game Camera': 'gameCameras',
};

const renderDeviceQuestions = () => {
    return selectedPractices.devices.map((device) => {
        const responseKey = deviceKeyMap[device] || device;

        return (
            <div key={device}>
                <h2 className="practice-header">{device} Device Questions</h2>
                <div>
                    <label>How many {device}s do you intend to employ?</label>
                    <CalciteInputNumber
                        value={responses[responseKey]?.toString() || '0'}
                        onCalciteInputNumberChange={(e) =>
                            handleInputChange(e, responseKey)
                        }
                        min={0}
                        step={1}
                    />
                </div>
            </div>
        );
    });
};


    return (
        <div>
            {selectedPractices.practices.map((practice) =>
                renderPracticeQuestions(practice)
            )}
            {selectedPractices.devices.length > 0 && renderDeviceQuestions()}
        </div>
    );
};

export default PracticeDetails;
