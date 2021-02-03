import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import "./App.css";
import Products from "./pages/Products";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import Currency from "./components/Currency";
function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        {/* <Route exact path="/" component={Home} /> */}
        <Route exact path="/register" component={Register} />
        <Route exact path="/" component={Login} />
        {/* <PrivateRoute path="/products" component={Products}/> */}
        <PrivateRoute path="/products" component={Dashboard} />
        <Route exact path="/currency" component={Currency} />
      </Switch>
    </Router>
  );
}

export default App;
