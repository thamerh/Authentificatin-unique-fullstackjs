import { BrowserRouter, Route, Switch } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login">
          <Login/>
        </Route>
        <Route path="/register">
          <Register/>
        </Route>
        <Route path="/">
          <Dashboard/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
