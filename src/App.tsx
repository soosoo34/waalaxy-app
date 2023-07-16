import React from 'react';
import AddActionForm from './components/AddActionForm';
import ActionQueue from './components/ActionQueue';
import QueueList from './components/QueueList';
import { ActionsProvider } from './context/actionsContext';

function App() {
    return (
        <ActionsProvider>
            <div className="App">
                <AddActionForm/>
                <ActionQueue/>
                <QueueList/>
            </div>
        </ActionsProvider>
    );
}

export default App;
