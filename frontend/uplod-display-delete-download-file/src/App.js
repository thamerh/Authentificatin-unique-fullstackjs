import { BrowserRouter, Route, Switch } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import AddFile from "./components/AddFile";
import EditFile from "./components/EditFile";
import { FileDetail } from "./components/FileDetail";
import ShowFile from "./components/ShowFile";

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
        <Route path="/AddFile">< AddFile /></Route>
        <Route path="/Detail/edit/:id"> <EditFile/></Route>
        <Route path="/Detail/:id"><FileDetail/> </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
