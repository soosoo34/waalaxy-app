import React, { useState, useContext } from 'react';
import { ActionsContext, Action } from '../context/actionsContext';

const AddActionForm = () => {
    const [type, setType] = useState('');
    const [maxCredits, setMaxCredits] = useState(0);
    const [errors, setErrors] = useState<{type?: string, maxCredits?: string}>({});

    const { addAction } = useContext(ActionsContext)!;

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        // Validation
        let errors = {};
        if (!type || type.length < 3) {
            errors = {...errors, type: 'Le type est requis et nécessite au moins 3 caractères'};
        }
        if (!maxCredits || maxCredits <= 0) {
            errors = {...errors, maxCredits: 'Max Credits est requis et doit être supérieur à 0'};
        }
        setErrors(errors);

        if (Object.keys(errors).length > 0) return;

        const action: Action = {
            id: '', // L'ID sera attribué par le serveur
            type,
            maxCredits,
            credits: 0 // Initialiser les crédits à 0
        };

        await addAction(action);

        // Réinitialiser le formulaire
        setType('');
        setMaxCredits(0);
        setErrors({});
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Type:
                <input type="text" value={type} onChange={e => setType(e.target.value)} />
                {errors.type && <p>{errors.type}</p>}
            </label>
            <label>
                Max Credits:
                <input type="number" value={maxCredits} onChange={e => setMaxCredits(+e.target.value)} />
                {errors.maxCredits && <p>{errors.maxCredits}</p>}
            </label>
            <button type="submit" disabled={Object.keys(errors).length > 0}>Ajouter une action</button>
        </form>
    );
};

export default AddActionForm;
