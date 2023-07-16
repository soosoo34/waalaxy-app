import React, {createContext, useState, useEffect, ReactNode} from 'react';
import axios from 'axios';

export type Action = {
    id: string;
    type: string;
    maxCredits: number;
    credits: number;
};

type ActionsContextProps = {
    actions: Action[];
    queueActions: Action[];
    setActions: (actions: Action[]) => void;
    addAction: (action: Action) => Promise<void>;
    fetchQueueActions: () => Promise<void>;
};


export const ActionsContext = createContext<ActionsContextProps | undefined>(undefined);

export const ActionsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [actions, setActions] = useState<Action[]>([]);
    const [queueActions, setQueueActions] = useState<Action[]>([]);

    useEffect(() => {
        fetchActions();
        fetchQueueActions();
    }, []);

    const fetchActions = async () => {
        const response = await axios.get('http://localhost:3000/api/users/1');
        setActions(response.data.actions);
    };

    const fetchQueueActions = async () => {
        const response = await axios.get('http://localhost:3000/api/users/1');
        setQueueActions(response.data.queue.actions);
    };


    const addAction = async (action: Action) => {
        try {
            const response = await axios.post('http://localhost:3000/api/actions', {
                userId: '1', // remplacer par l'ID de l'utilisateur actuel
                type: action.type,
                maxCredits: action.maxCredits
            });
            setActions(prevActions => [...prevActions, response.data]);
        } catch (error) {
            console.error('Une erreur s\'est produite lors de l\'ajout de l\'action', error);
        }
        await fetchActions();
        await fetchQueueActions();
    };

    return (
        <ActionsContext.Provider value={{ actions, queueActions, addAction , setActions, fetchQueueActions}}>
            {children}
        </ActionsContext.Provider>
    );
};
