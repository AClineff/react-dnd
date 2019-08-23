import React, {useState, Dispatch} from 'react';
import { CombatState } from '../types/combat';

const initialState = {
    combat: false
}

const CombatContext = React.createContext<[CombatState, Dispatch<any>]>([{}, () => {}]);

const CombatProvider = (props: any) => {
    const [state, setState] = useState(initialState);
    return (
        <CombatContext.Provider value={[state, setState]}>
            {props.children}
        </CombatContext.Provider>
    );
}

export { CombatContext, CombatProvider};