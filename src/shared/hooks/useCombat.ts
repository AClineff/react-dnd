import React,{ useContext } from 'react';
import { CombatContext } from '../context/combatContext'
import { CombatState } from '../types/combat';

const useCombat = () => {
    const [state, setState] = useContext(CombatContext);

    const toggleCombat = () => {
        setState((state: CombatState) => ({...state, combat: !state.combat}));
    }

    return {
        toggleCombat,
        combat: state.combat
    }
}

export default useCombat;