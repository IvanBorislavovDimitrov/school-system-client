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
import AddSemester from "./component/add-semester";
import ShowStudentsByClass from "./component/show-students-by-class";

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
        <Route exact path="/add_semester" component={AddSemester} />
        <Route exact path="/show_students" component={ShowStudentsByClass} />

      </Switch>
    </BrowserRouter>
  );

}

export default App;
