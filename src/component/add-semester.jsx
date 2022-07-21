import React, { Component } from "react";
import '../styles/login.css'
import ReactDOM from 'react-dom';

class RegisterSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
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
                            <p>Добавяне на нов семестър</p>
                        </div>
                        <div className="col-md-9 register-right">
                            <div className="tab-content" id="myTabContent">
                                <div className="tab-pane fade show active" id="home" role="tabpanel"
                                    aria-labelledby="home-tab">
                                    <h3 className="register-heading">Добавяне на нов семестър</h3>
                                    <div className="row register-form">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <input type="text" className="form-control" placeholder="Година"
                                                    name="value"
                                                    onChange={this.changeInputField}
                                                />
                                            </div>
                                            <select multiple id="specialtiesId" name="teachers" onChange={this.changeInputField}
                                                className="custom-select form-group">

                                            </select>
                                            <select multiple id="subjectsId" name="teachers" onChange={this.changeInputField}
                                                className="custom-select form-group">

                                                </select>
                                            <input onClick={this.addSemester} type="submit" className="btnRegister"
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

    addSemester = () => {
        let specialtiesNames = [];
        for (let option of document.getElementById('specialtiesId').options) {
            if (option.selected) {
                specialtiesNames.push(option.value);
            }
        }
        let subjectsNames = [];
        for (let option of document.getElementById('subjectsId').options) {
            if (option.selected) {
                subjectsNames.push(option.value);
            }
        }
        const currentThis = this;
        const registerForm = {
            value: currentThis.state.value,
            specialties: specialtiesNames,
            subjects: subjectsNames
        }
        fetch(process.env.REACT_APP_URL + '/semesters', {
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
            alert("Семестърът е добавен!");
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
        this.loadSubjects();
        this.loadSpecialties();
    }

    loadSpecialties = () => {
        fetch(process.env.REACT_APP_URL + '/specialties', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + localStorage.getItem('token')
            }
        }).then(response => response.json())
        .then(jsonResponse => {
            const specialties = document.getElementById('specialtiesId');
            let specialtiesNames = jsonResponse.map(subject => subject['name']);
            const elements = [];
            elements.push(
                (<option selected disabled="disabled" value="Избери специалност">Избери специалност</option>)
            )
            specialtiesNames.forEach(subject => {
                const s = (
                    <option value={subject}>{subject}</option>
                    )
                elements.push(s);
            });
            ReactDOM.render(elements, specialties);
        })
    }

    loadSubjects = () => {
        fetch(process.env.REACT_APP_URL + '/subjects', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + localStorage.getItem('token')
            }
        }).then(response => response.json())
        .then(jsonResponse => {
            const subjects = document.getElementById('subjectsId');
            let subjectNames = jsonResponse.map(subject => subject['name']);
            const elements = [];
            elements.push(
                (<option selected disabled="disabled" value="Избери предмет">Избери предмет</option>)
            )
            subjectNames.forEach(subject => {
                const s = (
                    <option value={subject}>{subject}</option>
                    )
                elements.push(s);
            });
            ReactDOM.render(elements, subjects);
        })
    }

    moveToLogin = () => {
        window.location.href = '/login'
    }
}

export default RegisterSpecialty;