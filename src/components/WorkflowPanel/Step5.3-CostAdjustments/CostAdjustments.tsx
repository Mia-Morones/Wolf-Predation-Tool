import React, { useEffect, useState } from 'react';
import { CalciteInputNumber } from '@esri/calcite-components-react';

type BudgetData = {
    [key: string]: {
        annualCost: number;
        costPerMile?: number;
        costPerRider?: number;
        costPerCarcass?: number;
        costPerDog?: number;
        costPerLight?: number;
        costPerAlarm?: number;
        costPerCamera?: number;
    };
};

const budgetData: BudgetData = {
    'Turbo Fladry': { annualCost: 500, costPerMile: 50 },
    'Electrified Night Penning': { annualCost: 372.73 }, // Fixed cost of night penning
    'Range Riding': { annualCost: 300, costPerRider: 30 },
    'Carcass Composting': { annualCost: 200, costPerCarcass: 20 },
    'Livestock Guardian Dog': { annualCost: 2464.18, costPerDog: 20 },
    'Fox Light': { annualCost: 100, costPerLight: 10 },
    'Solar Sound Alarm': { annualCost: 120, costPerAlarm: 15 },
    'Game Camera': { annualCost: 150, costPerCamera: 20 },
};

type CostAdjustmentProps = {
    selectedPractices: {
        practices: string[];
        devices: string[];
    };
    responses: {
        turboFladryMiles: number;
        electrifiedNightPenningFeet: number; // Added feet for calculating rolls of fencing
        electrifiedNightPenningMonths: number; // Added months for calculating the total cost
        rangeRiders: number;
        carcassesToCompost: number;
        livestockGuardianDogs: number;
        foxLights: number;
        solarSoundAlarms: number;
        gameCameras: number;
    };
};

const CostAdjustment: React.FC<CostAdjustmentProps> = ({
    selectedPractices,
    responses,
}) => {
    const [adjustedCosts, setAdjustedCosts] = useState<{
        [key: string]: number;
    }>({});
    const [showBudgetSheet, setShowBudgetSheet] = useState(false); // State to show the budget sheet image

    useEffect(() => {
        const updatedCosts: { [key: string]: number } = {};

        selectedPractices.practices.forEach((practice) => {
            const practiceData = budgetData[practice];
            if (practiceData) {
                let adjustedCost = practiceData.annualCost;

                if (practice === 'Turbo Fladry') {
                    adjustedCost +=
                        responses.turboFladryMiles * practiceData.costPerMile!;
                } else if (practice === 'Electrified Night Penning') {
                    // Fixed cost
                    adjustedCost = practiceData.annualCost; // Start with the fixed cost of $372.73

                    // Calculate variable costs based on user inputs
                    const monthCost =
                        20 * 4 * responses.electrifiedNightPenningMonths; // $20 * 4 * months
                    const rollCost =
                        Math.ceil(responses.electrifiedNightPenningFeet / 164) *
                        64.86; // Calculate rolls based on feet

                    adjustedCost += monthCost + rollCost; // Add both variable costs to the base cost
                } else if (practice === 'Range Riding') {
                    adjustedCost +=
                        responses.rangeRiders * practiceData.costPerRider!;
                } else if (practice === 'Carcass Composting') {
                    adjustedCost +=
                        responses.carcassesToCompost *
                        practiceData.costPerCarcass!;
                } else if (practice === 'Livestock Guardian Dog') {
                    adjustedCost +=
                        responses.livestockGuardianDogs *
                        practiceData.costPerDog!;
                }

                updatedCosts[practice] = adjustedCost;
            }
        });

        selectedPractices.devices.forEach((device) => {
            const deviceData = budgetData[device];
            if (deviceData) {
                let adjustedCost = deviceData.annualCost;

                if (device === 'Fox Light') {
                    adjustedCost +=
                        responses.foxLights * deviceData.costPerLight!;
                } else if (device === 'Solar Sound Alarm') {
                    adjustedCost +=
                        responses.solarSoundAlarms * deviceData.costPerAlarm!;
                } else if (device === 'Game Camera') {
                    adjustedCost +=
                        responses.gameCameras * deviceData.costPerCamera!;
                }

                updatedCosts[device] = adjustedCost;
            }
        });

        setAdjustedCosts(updatedCosts);
    }, [selectedPractices, responses]);

    const handleInputChange = (
        e: CustomEvent, // CustomEvent for Calcite Input
        key: string
    ) => {
        const inputElement = e.target as HTMLCalciteInputNumberElement; // Correct type casting
        const value = parseFloat(inputElement.value); // Parse as float
        setAdjustedCosts((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleMoreInfoClick = () => {
        setShowBudgetSheet(!showBudgetSheet); // Toggle the budget sheet visibility
    };

    return (
        <div>
            <h3>Cost Adjustment</h3>
            <p style={{ marginBottom: '30px' }}>
                Here are your estimated annual costs based on your inputs. Feel
                free to adjust the values if you feel they do not accurately
                reflect your potential costs:
            </p>

            <div>
                {Object.keys(adjustedCosts).map((key) => (
                    <div
                        key={key}
                        className="cost-item"
                        style={{ marginBottom: '30px' }}
                    >
                        <div>
                            <strong>{key}</strong>: $
                            {adjustedCosts[key].toFixed(2)}
                        </div>
                        <div>
                            <label>
                                Adjust cost for {key}:
                                <CalciteInputNumber
                                    value={adjustedCosts[key].toString()} // Ensure the value is a string
                                    onCalciteInputNumberChange={(e) =>
                                        handleInputChange(e, key)
                                    } // Pass the key to the handler
                                    min={0}
                                    step={10}
                                />
                            </label>
                        </div>
                    </div>
                ))}
            </div>

            <div>
                <h4>
                    Total Estimated Annual Cost: $
                    {Object.values(adjustedCosts)
                        .reduce((total, cost) => total + cost, 0)
                        .toFixed(2)}
                </h4>
            </div>

            {/* Button to show more information */}
            <button onClick={handleMoreInfoClick}>
                For more information on how we came to these costs, click here
            </button>

            {/* Conditionally render the budget sheet image if "Livestock Guardian Dog" is selected */}
            {showBudgetSheet &&
                selectedPractices.practices.includes(
                    'Livestock Guardian Dog'
                ) && (
                    <div style={{ marginTop: '30px' }}>
                        <h5>Livestock Guardian Dog Budget</h5>
                        <img
                            src="/BudgetSheets/livestock_guardian_dog_budget_sheet.jpg" // Direct path from the public folder
                            alt="Livestock Guardian Dog Budget"
                            style={{
                                width: '100%',
                                maxWidth: '600px',
                                marginBottom: '20px',
                            }}
                        />
                    </div>
                )}

            {/* Conditionally render the Electrified Night Penning Budget Sheet */}
            {showBudgetSheet &&
                selectedPractices.practices.includes(
                    'Electrified Night Penning'
                ) && (
                    <div style={{ marginTop: '30px' }}>
                        <h5>Electrified Night Penning Budget</h5>
                        <img
                            src="/BudgetSheets/electrified_night_penning_budget_sheet.jpg" // Direct path from the public folder
                            alt="Electrified Night Penning Budget"
                            style={{
                                width: '100%',
                                maxWidth: '600px',
                                marginBottom: '20px',
                            }}
                        />
                    </div>
                )}
        </div>
    );
};

export default CostAdjustment;
