import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/header';
import { Character } from './shared/types/character';
import { CombatContext } from './shared/context/combatContext';

interface AppState {
  characters: Character[],
  inCombat: boolean
}

type Props = {}

class App extends Component<Props, AppState> {
  constructor(props: Props){
    super(props);
    this.state = {characters: [], inCombat: false};
  }

  addCharacter(character: Character) {
    let characters: Character[] = {...this.state.characters};
    characters.push(character);
    this.setState({characters});
  }

  toggleCombat = () => {
    this.setState({
      inCombat: !this.state.inCombat
    })
  }

  render() {
    return (
      <CombatContext.Provider value={this.state ? this.state.inCombat : false}>
        <div className="App">
          <Header toggleCombat={this.toggleCombat}/>
        </div>
      </CombatContext.Provider>      
    );
  }
}

export default App;
