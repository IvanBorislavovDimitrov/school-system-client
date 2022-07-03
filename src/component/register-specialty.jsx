import React, { Component } from "react";
import '../styles/login.css'

class RegisterSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: null,
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
                            <p>Добавяне на нова специалност</p>
                        </div>
                        <div className="col-md-9 register-right">
                            <div className="tab-content" id="myTabContent">
                                <div className="tab-pane fade show active" id="home" role="tabpanel"
                                    aria-labelledby="home-tab">
                                    <h3 className="register-heading">Добавяне на нова специалност</h3>
                                    <div className="row register-form">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <input type="text" className="form-control" placeholder="Име"
                                                    name="name"
                                                    onChange={this.changeInputField}
                                                />
                                            </div>
                                            <input onClick={this.addSpecialty} type="submit" className="btnRegister"
                                                value="Добавяне" />
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

    addSpecialty = () => {
        const currentThis = this;
        const registerForm = {
            name: currentThis.state.name,
        }
        fetch(process.env.REACT_APP_URL + '/specialty', {
            method: 'POST',
            body: JSON.stringify(registerForm),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + localStorage.getItem('token')
            }
        }).then(async response => {
            if (response.status !== 201) {
                alert("Възникна проблем!");
                return;
            }
            const registerResponse = await response.text();
            alert("Специалността е добавена!");
            window.location.href = '/';
        })
            .catch(error => alert(error));
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

export default RegisterSpecialty;