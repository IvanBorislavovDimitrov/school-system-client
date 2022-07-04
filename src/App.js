import './App.css';
import { BrowserRouter, Route, Switch, Link, Redirect } from "react-router-dom";
import Navbar from "./component/navbar";
import RegisterStudent from "./component/register-student";
import UserLogin from "./component/login";
import Landing from "./component/landing";
import UpdateUserRoles from "./component/update-user-roles";
import DeleteUser from "./component/delete-users";
import RegisterClass from "./component/register-class";
import RegisterSpecialty from "./component/register-specialty";
import RegisterTeacher from "./component/register-teacher";
import RegisterSubject from "./component/register-subject";

function App() {
  setTimeout(function () {
    localStorage.clear();
  }, (24 * 60 * 60 * 1000));

  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
      <Route exact path="/" component={Landing} />
        <Route exact path="/register_student" component={RegisterStudent} />
        <Route exact path="/login" component={UserLogin} />
        <Route exact path="/admin/delete-user/" component={DeleteUser} />
        <Route exact path="/admin/update-roles/" component={UpdateUserRoles} />
        <Route exact path="/register_class" component={RegisterClass} />
        <Route exact path="/register_specialty" component={RegisterSpecialty} />
        <Route exact path="/register_teacher" component={RegisterTeacher} />
        <Route exact path="/register_subject" component={RegisterSubject} />

      </Switch>
    </BrowserRouter>
  );

}

export default App;
