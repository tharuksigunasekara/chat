import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Chat from "./pages/Chat";
import Join from "./pages/Join";

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={Join} />
        <Route path='/chat/:user_nickName' exact component={Chat} />
      </Switch>
    </Router>
  );
}

export default App;
