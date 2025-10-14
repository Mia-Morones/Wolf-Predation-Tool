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
    //const [selectedDevices, setSelectedDevices] = useState<string[]>([]);

    const practices = [
    { id: 'Turbo Fladry', label: 'Turbo Fladry' },
    { id: 'Electrified Night Penning', label: 'Electrified Night Penning' },
    { id: 'Range Riding', label: 'Range Riding' },
    { id: 'Carcass Composting', label: 'Carcass Management' }, // 👈 This is the key change
    { id: 'Livestock Guardian Dog', label: 'Livestock Guardian Dog' },
];


    //const devices = ['Fox Light', 'Solar Sound Alarm', 'Game Camera'];

    const handlePracticeChange = (practice: string, checked: boolean) => {
        setSelectedPractices((prev) => {
            const newPractices = checked
                ? [...prev, practice]
                : prev.filter((item) => item !== practice);
            handleSelectionChange(newPractices, 'practices'); // Notify WorkflowPanel of practice change
            return newPractices;
        });
    };

    /*
    const handleDeviceChange = (device: string, checked: boolean) => {
        setSelectedDevices((prev) => {
            const newDevices = checked
                ? [...prev, device]
                : prev.filter((item) => item !== device);
            handleSelectionChange(newDevices, 'devices'); // Notify WorkflowPanel of device change
            return newDevices;
        });
    };
    */

    return (
        <div className="selection-container">
            <h3>
                Pick any or all practices that you are interested in
                exploring.
            </h3>

            <div className="grid-container">
                <div className="category">
                    <h4>Practices</h4>
                    <div className="options">
                        {practices.map(({ id, label }) => (
    <div key={id} className="option-item">
        <label>
            <input
                type="checkbox"
                checked={selectedPractices.includes(id)}
                onChange={(e) => handlePracticeChange(id, e.target.checked)}
            />
            {label}
        </label>
    </div>
))}

                    </div>
                </div>

                {/* 
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
                */}
            </div>
        </div>
    );
};

export default PracticeSelection;
