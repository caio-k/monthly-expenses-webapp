import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Login from "./routes/publicForm/login/login";
import SignUp from "./routes/publicForm/signup/signup";

import "./App.css";

function App() {
  return (
    <div>
      <Header/>

      <Router>
        <div className="site-content">
          <Switch>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/signup" component={SignUp}/>
          </Switch>
        </div>
      </Router>

      <Footer/>
    </div>
  );
}

export default App;
