import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Dash from "./components/Dash";
import Login from "./components/Login";
import Main from "./components/Main";
import Signup from "./components/Signup";


function App() {

  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/"><Main/></Route>
          <Route exact path="/login"><Login/></Route>
          <Route exact path="/signup"><Signup/></Route>
          <Route path="/dash"><Dash/></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
