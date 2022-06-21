import './App.css';
import { BrowserRouter, Route, Switch, Link, Redirect } from "react-router-dom";
import Navbar from "./component/navbar";
import UserRegister from "./component/register";
import UserLogin from "./component/login";
import Landing from "./component/landing";
import UpdateUserRoles from "./component/update-user-roles";
import DeleteUser from "./component/delete-users";

function App() {
  setTimeout(function () {
    localStorage.clear();
  }, (24 * 60 * 60 * 1000));

  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
      <Route exact path="/" component={Landing} />
        <Route exact path="/register" component={UserRegister} />
        <Route exact path="/login" component={UserLogin} />
        <Route exact path="/admin/delete-user/" component={DeleteUser} />
        <Route exact path="/admin/update-roles/" component={UpdateUserRoles} />

      </Switch>
    </BrowserRouter>
  );

}

export default App;
