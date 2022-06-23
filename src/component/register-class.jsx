import React, { Component } from "react";
import '../styles/login.css'

class RegisterClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            password: null,
            egn: null,
            name: null,
            confirmPassword: null
        };
    }

    render() {
        return (
            <React.Fragment>
                <div className="container register">
                    <div className="row">
                        <div className="col-md-3 register-left">
                            <img src="https://image.ibb.co/n7oTvU/logo_white.png" alt="" />
                            <h3>Здравей</h3>
                            <p>Форма за регистрация на клас</p>
                        </div>
                        <div className="col-md-9 register-right">
                            <div className="tab-content" id="myTabContent">
                                <div className="tab-pane fade show active" id="home" role="tabpanel"
                                    aria-labelledby="home-tab">
                                    <h3 className="register-heading">Регистрация на нова специалност</h3>
                                    <div className="row register-form">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <input type="text" className="form-control" placeholder="Име"
                                                    name="name"
                                                    onChange={this.changeInputField}
                                                />
                                            </div>
                                            <div id="emailNameInvalidForm" className="text-danger">

                                            </div>
                                            <div className="form-group">
                                                <input type="text" className="form-control" placeholder="Потребителско име"
                                                    name="username"
                                                    onChange={this.changeInputField}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <input type="text" className="form-control" placeholder="ЕГН"
                                                    name="egn"
                                                    onChange={this.changeInputField}
                                                />
                                            </div>
                                            <div id="usernameNameInvalidForm" className="text-danger">

                                            </div>
                                            <div className="form-group">
                                                <input type="password" className="form-control" placeholder="Парола"
                                                    name="password"
                                                    onChange={this.changeInputField}
                                                />
                                            </div>
                                            <div id="passwordNameInvalidForm" className="text-danger">

                                            </div>
                                            <div className="form-group">
                                                <input type="password" className="form-control"
                                                    placeholder="Потвърди парола"
                                                    name="confirmPassword"
                                                    onChange={this.changeInputField}
                                                />
                                            </div>
                                            <div id="confirmPasswordNameInvalidForm" className="text-danger">

                                            </div>

                                            <input onClick={this.registerUser} type="submit" className="btnRegister"
                                                value="Регистрация" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>


            </React.Fragment>
        );
    }

    registerUser = () => {
        const currentThis = this;
        const registerForm = {
            username: currentThis.state.username,
            name: currentThis.state.name,
            egn: currentThis.state.egn,
            password: currentThis.state.password,
            confirmPassword: currentThis.state.confirmPassword
        }
        fetch(process.env.REACT_APP_URL + '/students', {
            method: 'POST',
            body: JSON.stringify(registerForm),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(async response => {
            if (response.status !== 201) {
                alert("You haven't been registered!");
                return;
            }
            const registerResponse = await response.text();
            alert("Регистрирахте ученик");
            window.location.href = '/';
        })
            .catch(error => alert(error))
    }

    validateEmail = () => {
        if (this.state.email == '' || this.state.email == null || this.state.email == undefined) {
            return false;
        }
        return true;
    }

    validateUsername = () => {
        if (this.state.username == '' || this.state.username == null || this.state.username == undefined) {
            return false;
        }
        return true;
    }

    validatePassword = () => {
        if (this.state.password == '' || this.state.password == null || this.state.password == undefined) {
            return false;
        }
        return true;
    }

    validateConfirmPassword = () => {
        if (this.state.confirmPassword == '' || this.state.confirmPassword == null || this.state.confirmPassword == undefined) {
            return false;
        }
        return true;
    }

    changeInputField = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    componentDidMount() {

    }

    moveToLogin = () => {
        window.location.href = '/login'
    }
}

export default RegisterClass;