import React, { Component } from "react";
import JwtDecoder from './jwt/jwt-decoder'

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        let isLoggedIn = false;
        const token = localStorage.getItem('token');
        if (token !== null && token !== undefined && token != "undefined") {
            isLoggedIn = true;
        }

        let isDirector = false;
        let isTeacher = false;
        let isStudent = false;
        const userRoles = localStorage.getItem('userRoles');
        if (userRoles !== undefined && userRoles !== null) {
            isDirector = userRoles.includes('director');
            isTeacher = userRoles.includes('teacher');
            isStudent = userRoles.includes('student');
        }

        return (
            <React.Fragment>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <a className="navbar-brand" href="/">Училище Св. Кирил</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarColor01">
                        <ul class="navbar-nav w-100">

                            <li className="nav-item" hidden={isLoggedIn}>
                                <a className="nav-link" href="/login">Вход</a>
                            </li>

                            <li className="nav-item" hidden={!isDirector}>
                                <a className="nav-link" href="/register_teacher">Регистрация на учител</a>
                            </li>

                            <li className="nav-item" hidden={!isDirector}>
                                <a className="nav-link" href="/register_specialty">Добавяне на специалност</a>
                            </li>

                            <li className="nav-item" hidden={!isDirector}>
                                <a className="nav-link" href="/register_subject">Добавяне на предмет</a>
                            </li>

                            <li className="nav-item" hidden={!isTeacher}>
                                <a className="nav-link" href="/register_student">Регистрация на ученик</a>
                            </li>

                            <li className="nav-item" hidden={!isTeacher}>
                                <a className="nav-link" href="/register_class">Регистрация на клас</a>
                            </li>

                            <li className="nav-item" hidden={!isDirector}>
                                <a href="/admin/update-roles/" className="nav-link">Промени роля</a>
                            </li>

                            <li className="nav-item" hidden={!isDirector}>
                                <a href="/admin/delete-user/" className="nav-link">Изтрий потребител</a>
                            </li>

                            <li className="nav-item" hidden={!isLoggedIn}>
                                <a href="javascript:void(0)" className="nav-link" onClick={this.logout}>Излез</a>
                            </li>

                        </ul>

                    </div>
                </nav>
            </React.Fragment>
        );
    }

    componentDidMount() {
        this.isStillLoggedIn();
        this.isAdmin();
    }

    isStillLoggedIn = () => {
        const token = localStorage.getItem('token');
        if (token == undefined || token == null && token != "undefined") {
            return;
        }
        fetch(process.env.REACT_APP_URL + '/validate', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer: ' + token,
                'Content-Type': 'application/json'
            }
        }).then(async response => {
            await response.text();
            if (response.status !== 200) {
                alert(response.status)
                localStorage.removeItem('token');
                localStorage.removeItem('userRoles');
                window.location.reload();
            }
        }).catch(error => {
            console.log(error);
            localStorage.removeItem('token');
            localStorage.removeItem('userRoles');

        });
    }

    logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userRoles');

        window.location.href = '/';
    }

    isAdmin = () => {
        const token = localStorage.getItem('token');
        if (token == undefined || token == null) {
            return false;
        }
        const jwtDecoder = new JwtDecoder();
        const decodedToken = jwtDecoder.decodeToken(token);
        const roles = decodedToken['roles'];
        return roles.includes('DIRECTOR');
    }

}

export default Navbar;