import React, { Component, useState } from 'react';
import './App.css';
import Header from './components/header';
import { Character } from './shared/types/character';
import { CombatProvider } from './shared/context/combatContext';
import CharacterTile from './components/characterTile';
import { withStyles, WithStyles } from '@material-ui/core';
import useCombat from './shared/hooks/useCombat';
import NestedCheckbox from './components/nestedCheckbox';

const styles = () => ({
  app: {
    display: 'flex'
  },
  centerContent: {
    padding: '80px 40px 40px 40px'
  }
})

type Props = {} & WithStyles

const App: React.FunctionComponent<Props> = (props) => {
  const {combat, toggleCombat} = useCombat();
  const [characterState,] = useState({characters: [{name: 'P1', playerName: 'Allen', isPC: true, baseInitiative: 0}]});
  return (
    <CombatProvider>
        <div className="header">
          <Header toggleCombat={toggleCombat}/>
        </div>
        <main className={props.classes.centerContent}>
          { !combat && (            
              characterState.characters.map((character:Character) => {
                return (
                  <CharacterTile key={character.name} character={character} />
                )
              })
          )}
        </main>
        <div>
          <NestedCheckbox/>
        </div>
      </CombatProvider>   
  )
}

export default withStyles(styles)(App);
