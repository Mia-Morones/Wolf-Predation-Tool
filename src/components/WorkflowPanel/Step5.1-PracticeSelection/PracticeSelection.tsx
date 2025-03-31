import React, { useState, useEffect } from 'react';
import './PracticeSelection.css'; // Import the updated CSS file

type PracticeSelectionProps = {
    handleSelectionChange: (
        selectedItems: string[],
        type: 'practices' | 'devices'
    ) => void;
};

const PracticeSelection: React.FC<PracticeSelectionProps> = ({
    handleSelectionChange,
}) => {
    const [selectedPractices, setSelectedPractices] = useState<string[]>([]);
    const [selectedDevices, setSelectedDevices] = useState<string[]>([]);

    const practices = [
        'Turbo Fladry',
        'Electrified Night Penning',
        'Range Riding',
        'Carcass Composting',
        'Livestock Guardian Dog',
    ];

    const devices = ['Fox Light', 'Solar Sound Alarm', 'Game Camera'];

    const handlePracticeChange = (practice: string, checked: boolean) => {
        setSelectedPractices((prev) => {
            const newPractices = checked
                ? [...prev, practice]
                : prev.filter((item) => item !== practice);
            handleSelectionChange(newPractices, 'practices'); // Notify WorkflowPanel of practice change
            return newPractices;
        });
    };

    const handleDeviceChange = (device: string, checked: boolean) => {
        setSelectedDevices((prev) => {
            const newDevices = checked
                ? [...prev, device]
                : prev.filter((item) => item !== device);
            handleSelectionChange(newDevices, 'devices'); // Notify WorkflowPanel of device change
            return newDevices;
        });
    };

    return (
        <div className="selection-container">
            <h3>
                Pick any or all practices and devices that you are interested in
                exploring.
            </h3>

            <div className="grid-container">
                <div className="category">
                    <h4>Practices</h4>
                    <div className="options">
                        {practices.map((practice) => (
                            <div key={practice} className="option-item">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={selectedPractices.includes(
                                            practice
                                        )}
                                        onChange={(e) =>
                                            handlePracticeChange(
                                                practice,
                                                e.target.checked
                                            )
                                        }
                                    />
                                    {practice}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="category">
                    <h4>Devices</h4>
                    <div className="options">
                        {devices.map((device) => (
                            <div key={device} className="option-item">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={selectedDevices.includes(
                                            device
                                        )}
                                        onChange={(e) =>
                                            handleDeviceChange(
                                                device,
                                                e.target.checked
                                            )
                                        }
                                    />
                                    {device}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PracticeSelection;
