import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import SelectorsContainer from './Selectors/SelectorsContainer';
import GradeTableContainer from './GradeTable/GradeTableContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Ardent Academy Gradebook App</h1>
        <div>
          <SelectorsContainer />
          <GradeTableContainer />
        </div>
      </div>
    );
  }
}

export default App;
