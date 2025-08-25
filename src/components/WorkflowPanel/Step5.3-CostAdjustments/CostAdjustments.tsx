import React, { useEffect, useState } from 'react';
import { CalciteInputNumber } from '@esri/calcite-components-react';
import { useDispatch } from 'react-redux';
import { totalMitigationCostChanged } from '@store/WolfPredation/reducer';


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
    'Turbo Fladry': { annualCost: 1388.15, costPerMile: 1388.15 },
    'Electrified Night Penning': { annualCost: 330.21 }, // Fixed cost of night penning
    'Range Riding': { annualCost: 300, costPerRider: 30 },
    'Carcass Composting': { annualCost: 280.64 },
    'Livestock Guardian Dog': { annualCost: 2464.18, costPerDog: 20 },
    'Fox Light': { annualCost: 24.78, costPerLight: 24.78 },
    'Solar Sound Alarm': { annualCost: 7.41, costPerAlarm: 7.41 },
    'Game Camera': { annualCost: 21.34, costPerCamera: 21.34 },
};

type CostAdjustmentProps = {
    selectedPractices: {
        practices: string[];
        devices: string[];
    };
    responses: {
        turboFladryMiles: number;
        electrifiedNightPenningFeet: number; 
        electrifiedNightPenningMonths: number; 
        carcassesToCompost: number;
        livestockGuardianDogs: number;
        foxLights: number;
        solarSoundAlarms: number;
        gameCameras: number;
        hoursPerWeek: number;
        rangeRidingMonths: number;
        transportationMethod: 'Horse' | 'ATV/UTV';
        numberOfTransport: number;
        milesFromOperation: number;
        rangeRidingRuggedTerrain: boolean;
        turboFladryRockyTerrain: boolean;
        turboFladrySnowMachine: boolean;
    };
};

const CostAdjustment: React.FC<CostAdjustmentProps> = ({
    selectedPractices,
    responses,
}) => {
    const [adjustedCosts, setAdjustedCosts] = useState<{
        [key: string]: number;
    }>({});
    const dispatch = useDispatch();

    useEffect(() => {
        const updatedCosts: { [key: string]: number } = {};

        selectedPractices.practices.forEach((practice) => {
            const practiceData = budgetData[practice];
            if (practiceData) {
                let adjustedCost = practiceData.annualCost;

                if (practice === 'Turbo Fladry') {
                    const miles = responses.turboFladryMiles || 0;
                    const materialCostPerMile = 1388.15;
                    let baseInstall = 400;
                    const maintenance = 400;

                    const extraMiles = Math.max(0, Math.floor(miles - 1));
                    baseInstall += extraMiles * 100;

                    const ruggedMultiplier = 
                        (responses as any).turboFladryRockyTerrain === true ? 1.2 : 1;
                    const laborCost = (baseInstall + maintenance) * ruggedMultiplier;

                    const equipmentCostPerMile =
                        (responses as any).turboFladrySnowMachine === true ? 2.2 : 15.9;

                    const materialAndEquipmentCost = miles * (materialCostPerMile + equipmentCostPerMile);

                    adjustedCost = laborCost + materialAndEquipmentCost;
                } else if (practice === 'Electrified Night Penning') {
                    adjustedCost = practiceData.annualCost;

                    const monthCost =
                        20 * 4 * responses.electrifiedNightPenningMonths;
                    const rollCost =
                        Math.ceil(responses.electrifiedNightPenningFeet / 164) *
                        64.86;

                    adjustedCost += monthCost + rollCost;
                 } else if (practice === 'Range Riding') {
    const months = responses.rangeRidingMonths || 0;
    const hoursPerWeek = responses.hoursPerWeek || 0;
    const numberOfTransport = responses.numberOfTransport || 0;
    const transportation = responses.transportationMethod || 'Horse';
    const milesFromOperation = responses.milesFromOperation || 0;
    const rugged = responses.rangeRidingRuggedTerrain === true;

    const fixedCost = 54.40;
    const cellPhoneCost = months * 40;

    let totalHours = hoursPerWeek * 4 * months;
    if (rugged) {
        totalHours *= 1.2;
    }

    const laborCost = totalHours * 30;

    let transportCost = 0;
    if (transportation === 'ATV/UTV') {
        transportCost = numberOfTransport * 21.12;
    } else {
        transportCost = numberOfTransport * 1440;
    }

    const weeks = months * 4;

    const pickupMileageCost =
        (2 * milesFromOperation) * weeks * (hoursPerWeek / 10) * 0.67;

    const trailerMiles =
        (2 * milesFromOperation) * weeks * (hoursPerWeek / 10);
    const trailerCost = (2 / 3) * trailerMiles * 0.25;

    adjustedCost = fixedCost + cellPhoneCost + laborCost + pickupMileageCost + trailerCost + transportCost;


                } else if (practice === 'Carcass Composting') {
                    adjustedCost =
                        responses.carcassesToCompost *
                        practiceData.annualCost!;
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
                let adjustedCost = 0;

                const deviceQuantityMap: { [key: string]: number } = {
                    'Fox Light': responses.foxLights,
                    'Solar Sound Alarm': responses.solarSoundAlarms,
                    'Game Camera': responses.gameCameras,
                };

                const quantity = deviceQuantityMap[device] || 0;

                if (device === 'Fox Light' && deviceData.costPerLight) {
                    adjustedCost = quantity * deviceData.costPerLight;
                } else if (device === 'Solar Sound Alarm' && deviceData.costPerAlarm) {
                    adjustedCost = quantity * deviceData.costPerAlarm;
                } else if (device === 'Game Camera' && deviceData.costPerCamera) {
                    adjustedCost = quantity * deviceData.costPerCamera;
                } else {
                    adjustedCost = deviceData.annualCost;
                }

                updatedCosts[device] = adjustedCost;
            }
        });

        setAdjustedCosts(updatedCosts);
        dispatch(totalMitigationCostChanged(
            Object.values(updatedCosts).reduce((total, cost) => total + cost, 0)
        ));
    }, [selectedPractices, responses]);

    // **The handleInputChange function**
    const handleInputChange = (
    e: CustomEvent,
    key: string
) => {
    const inputElement = e.target as HTMLCalciteInputNumberElement;
    let value = parseFloat(inputElement.value);

    // Round to two decimal places
    value = isNaN(value) ? 0 : Math.round(value * 100) / 100;

    setAdjustedCosts((prev) => {
        const newCosts = {
            ...prev,
            [key]: value,
        };

        dispatch(
            totalMitigationCostChanged(
                Object.values(newCosts).reduce((total, cost) => total + cost, 0)
            )
        );

        return newCosts;
    });
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
                           value={adjustedCosts[key].toFixed(2)} 
                            onCalciteInputNumberChange={(e) =>
                              handleInputChange(e, key)
                                 }
                                 min={0}
                                 step={0.01} 
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
        </div>
    );
};

export default CostAdjustment;


