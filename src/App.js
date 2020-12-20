import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

import Header from "./components/header/header";
import Login from "./routes/login/login";
import Footer from "./components/footer/footer";

import "./App.css";

function App() {
  return (
    <div>
      <Header/>

      <Router>
        <div className="site-content">
          <Switch>
            <Route exact path="/login" component={Login}/>
          </Switch>
        </div>
      </Router>

      <Footer/>
    </div>
  );
}

export default App;
