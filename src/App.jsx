import React from "react";
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Login from './components/login/Login'
import Home from './components/Home/Home'



function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login}></Route>
        <Route exact path="/home" component={Home}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
