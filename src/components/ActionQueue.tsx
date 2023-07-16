import React, { useEffect, useContext } from 'react';
import { ActionsContext } from '../context/actionsContext';
import { Action } from '../entities/action';

const ActionQueue = () => {
    const context = useContext(ActionsContext);
    if (!context) {
        throw new Error('Vous devez utiliser ActionQueue à l\'intérieur de ActionsProvider');
    }

    const { actions, fetchQueueActions } = context;

    useEffect(() => {
        fetchQueueActions();
    }, []);

    return (
        <ul>
            {actions.map((action: Action, index: number) => (
                <li key={index}>{action.type} {action.credits} crédits</li>
            ))}
        </ul>
    );
};

export default ActionQueue;
