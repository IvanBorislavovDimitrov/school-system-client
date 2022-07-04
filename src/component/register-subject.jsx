import React, { Component } from "react";
import '../styles/login.css'
import ReactDOM from 'react-dom';

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
                            <p>Добавяне на нов предмет</p>
                        </div>
                        <div className="col-md-9 register-right">
                            <div className="tab-content" id="myTabContent">
                                <div className="tab-pane fade show active" id="home" role="tabpanel"
                                    aria-labelledby="home-tab">
                                    <h3 className="register-heading">Добавяне на нов предмет</h3>
                                    <div className="row register-form">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <input type="text" className="form-control" placeholder="Име"
                                                    name="name"
                                                    onChange={this.changeInputField}
                                                />
                                            </div>
                                            <select multiple id="teachersId" name="teachers" onChange={this.changeInputField}
                                                className="custom-select form-group">

                                            </select>
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
        fetch(process.env.REACT_APP_URL + '/teachers', {
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
            alert("Предметът е добавен!");
            window.location.href = '/';
        })
            .catch(error => alert(error));
    }

    changeInputField = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    componentDidMount() {
        fetch(process.env.REACT_APP_URL + '/teachers', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + localStorage.getItem('token')
            }
        }).then(response => response.json())
        .then(jsonResponse => {
            const teachers = document.getElementById('teachersId');
            let teachersNames = jsonResponse.map(teacher => teacher['name']);
            const elements = [];
            elements.push(
                (<option selected disabled="disabled" value="Избери учител">Избери учител</option>)
            )
            teachersNames.forEach(teacher => {
                const s = (
                    <option value={teacher}>{teacher}</option>
                    )
                elements.push(s);
            });
            ReactDOM.render(elements, teachers);
        })
    }

    moveToLogin = () => {
        window.location.href = '/login'
    }
}

export default RegisterSpecialty;