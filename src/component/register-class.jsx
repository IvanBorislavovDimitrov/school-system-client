import React, { Component } from "react";
import '../styles/login.css'
import ReactDOM from 'react-dom';

class RegisterClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: null,
            specialty: null
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
                                    <h3 className="register-heading">Регистрация на нов клас</h3>
                                    <div className="row register-form">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <input type="text" className="form-control" placeholder="Име"
                                                    name="name"
                                                    onChange={this.changeInputField}
                                                />
                                            </div>
                                            <select id="specialtyId" name="specialty" onChange={this.changeInputField}
                                                className="custom-select form-group">
                                            </select>


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
        const addClassForm = {
            name: currentThis.state.name,
            specialty: currentThis.state.specialty
        }
        fetch(process.env.REACT_APP_URL + '/student_classes', {
            method: 'POST',
            body: JSON.stringify(addClassForm),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + localStorage.getItem('token')
            }
        }).then(async response => {
            if (response.status !== 201) {
                alert("Специалността не е добавена!");
                return;
            }
            const registerResponse = await response.text();
            alert("Добавихте клас");
            window.location.href = '/';
        })
            .catch(error => alert(error))
    }

    changeInputField = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    componentDidMount() {
        fetch(process.env.REACT_APP_URL + '/specialties', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + localStorage.getItem('token')
            }
        }).then(response => response.json())
        .then(jsonResponse => {
            const specialtySelect = document.getElementById('specialtyId');
            let specialties = jsonResponse.map(specialty => specialty['name']);
            const elements = [];
            elements.push(
                (<option selected disabled="disabled" value="Избери специалност">Избери специалност</option>)
            )
            specialties.forEach(specialty => {
                const s = (
                    <option value={specialty}>{specialty}</option>
                    )
                elements.push(s);
            });
            ReactDOM.render(elements, specialtySelect);
        })
    }

    moveToLogin = () => {
        window.location.href = '/login'
    }
}

export default RegisterClass;