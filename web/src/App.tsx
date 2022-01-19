import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Chat } from './views/Chat';
import { Login } from './views/Login';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/chat" exact component={Chat} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
