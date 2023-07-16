import React, { useState, useContext, useEffect } from 'react';
import './../App.css';
import { ActionsContext, Action } from '../context/actionsContext';

function QueueList() {
    const context = useContext(ActionsContext);

    if (!context) {
        throw new Error('Vous devez utiliser QueueList à l\'intérieur de ActionsProvider');
    }

    const { queueActions, fetchQueueActions } = context;
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [selectedAction, setSelectedAction] = useState<Action | null>(null);

    useEffect(() => {
        fetchQueueActions();
    }, []);

    return (
        <div>
            <div className="timeline">
                {queueActions.map((action: Action, index: number) => (
                    <React.Fragment key={action.id}>
                        <div
                            className={`timeline-item ${index === selectedIndex ? 'active' : ''}`}
                            onClick={() => {
                                setSelectedIndex(index);
                                setSelectedAction(action);
                            }}
                        >
                            {action.type}
                        </div>
                        {index < queueActions.length - 1 && <div className="separator"></div>}
                    </React.Fragment>
                ))}
            </div>
            {selectedAction && (
                <div className="selected-action">
                    <h2>Action sélectionnée : {selectedAction.type}</h2>
                    <p>Crédits max : {selectedAction.maxCredits}</p>
                    <p>Id : {selectedAction.id}</p>
                </div>
            )}
        </div>
    );
};

export default QueueList;
