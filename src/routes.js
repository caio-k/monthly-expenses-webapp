import React from "react";
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import AuthService from "./services/auth/AuthService";
import Login from "./routes/publicForm/login/login";
import SignUp from "./routes/publicForm/signup/signup";
import NotFound from "./components/notfound/notfound";

const PrivateRoute = ({component: Component, ...rest}) => (
  <Route {...rest} render={props =>
    AuthService.getCurrentUser() ? (
      <Component {...props} />
    ) : (
      <Redirect to={{pathname: "/", state: {from: props.location}}}/>
    )
  }
  />
);

function Routes() {
  return (
    <Router>
      <div className="site-content">
        <Switch>
          <Route exact path="/" component={() => <h1>Home</h1>}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/signup" component={SignUp}/>
          <Route exact path="/notfound" component={NotFound}/>
          <PrivateRoute exact path="/expenses" component={() => <h1>Expenses</h1>}/>
          <PrivateRoute exact path="/settings" component={() => <h1>Settings</h1>}/>
          <Redirect to="/notfound"/>
        </Switch>
      </div>
    </Router>
  )
}

export default Routes;
