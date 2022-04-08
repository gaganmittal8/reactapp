import './App.css';
import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Calculator from './components/Calculator';
import TodoLists from './components/TodoLists';
import Header from './components/Header.js';

function App() {
  const [mode, setMode] = useState('dark');
  const toggleMode = () => {
    if (mode === 'light') {
      setMode('dark');
    }
    else {
      setMode('light');
    }
  }
  return (
    <Router>
      <Header title="Gagan's Tasks" mode={mode} toggleMode={toggleMode}/>
      <div>
        <Switch>
          <Route exact path='/calculator'>
            <Calculator />
          </Route>
          <Route exact path='/todolists'>
            <TodoLists />
          </Route>
          <Route path="/">
          <Calculator />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
