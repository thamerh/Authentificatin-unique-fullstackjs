import { BrowserRouter, Route, Switch } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import EditUser from './components/EditStudent'
import AddStudent from './components/AddStudent'
import "./App.css"

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
        <Route exact path="/">
          <Dashboard/>
        </Route>
        <Route path="/editStudent/:id"><EditUser/></Route>
        <Route path="/AddStudent"><AddStudent/></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
