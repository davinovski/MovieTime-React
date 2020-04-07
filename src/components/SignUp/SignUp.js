import React, {Component} from "react"
import "./SignUp.css"
import logo from '../../images/logo.png';
import UsersService from "../../axios/UserService";

class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: {
                isValid: false,
                value: ""
            },
            lastName: {
                isValid: false,
                value: ""
            },
            username: {
                isValid: false,
                value: ""
            },
            password: {
                isValid: false,
                value: ""
            },
            password2: {
                isValid: false,
                value: ""
            },
            showAlert : false
        };
    }

    onChangeHandler = e => {
        this.validateInput(e, false);
    };

    onFormSubmitHandler = e => {
        e.preventDefault();
        const stateValues = Object.values(this.state);
        stateValues.pop();
        stateValues.pop();
        if (stateValues.map(v => v.isValid).every(v => v === true)) {
            const userInputs = [...Object.entries(this.state)];
            userInputs.pop();
            userInputs.pop();
            const user = {};
            userInputs.forEach(u => user[u[0]] = u[1].value);
            this.registerUser(user);
        } else {
            const values = Object.values(e.target);
            values.pop();
            values.filter(i => Object.keys(this.state).includes(i.name)).forEach(input => this.validateInput(input, true));
        }
    };

    validateInput = (e, formValidate) => {
        let inputName = null;
        let inputValue = null;
        if (formValidate) {
            inputName = e.name;
            inputValue = e.value;
        } else {
            inputName = e.target.name;
            inputValue = e.target.value;
        }
        let isValid = inputValue.toString().trim().length > 0;
        if (inputName === "username")
            isValid = isValid && this.validateusername(inputValue);
        else if (inputName === "password2")
            isValid = isValid && inputValue === this.state.password.value;
        this.setState({
            [inputName]: {
                isValid: isValid,
                value: inputValue
            }
        }, () => {
            const inputElement = document.getElementById(inputName);
            if (this.state[inputName].isValid)
                inputElement.classList.remove("is-invalid");
            else
                inputElement.classList.add("is-invalid");
        });
    };


    validateusername = username => {
        const re = /^\S+@\S+$/;
        return re.test(username);
    };

    registerUser = (user) => {
        UsersService.registerUser(user).then(response => {
            this.props.history.push({
                pathname: "/login",
                state: {prevPath: this.props.location.pathname}
            });
        }).catch(() => this.setState({
            showAlert : true,
        }));
    };

    renderAlert = () => {
        if(this.state.showAlert) {
            return (
                <div className="alert alert-danger" role="alert">
                    <small>A user with this name already exists</small>
                </div>
            );
        }
        return null;
    };

    render() {
        return (
            <div className="SignUp bg-image-login">
                <div className="container container-table">
                    <div className="row firstRow">
                        <div className="col-sm-9 col-md-7 col-lg-5 my-auto mx-auto">
                            <div className="card card-signin my-4 bg-customcolor">
                                <div className="card-body">
                                    <div className="logoDiv">
                                        <img src={logo} width="50px" height="50px" alt="" className="logoImage">
                                        </img>
                                        <i className="h3 pt-2 movieText">Movie<i
                                            className="helperText textRed">Time</i></i>
                                    </div>
                                    {this.renderAlert()}
                                    <hr/>
                                    <form className="form-signin mt-4" onSubmit={this.onFormSubmitHandler}>
                                        <div className="form-label-group">
                                            <input type="text" id="firstName"
                                                   name="firstName"
                                                   value={this.state.firstName.value}
                                                   onChange={this.onChangeHandler}
                                                   onBlur={this.onChangeHandler}
                                                   className="form-control bg-customcolor text-white"
                                                   placeholder="Name"
                                                   autoFocus/>
                                            <label htmlFor="firstName">Name</label>
                                            <div className="invalid-feedback mx-2">*mandatory field</div>
                                        </div>

                                        <div className="form-label-group">
                                            <input type="text" id="lastName"
                                                   name="lastName"
                                                   value={this.state.lastName.value}
                                                   onChange={this.onChangeHandler}
                                                   onBlur={this.onChangeHandler}
                                                   className="form-control bg-customcolor text-white"
                                                   placeholder="Last Name"/>
                                            <label htmlFor="lastName">Last Name</label>
                                            <div className="invalid-feedback mx-2">*mandatory field</div>
                                        </div>

                                        <div className="form-label-group">
                                            <input type="username" id="username"
                                                   value={this.state.username.value}
                                                   onChange={this.onChangeHandler}
                                                   onBlur={this.onChangeHandler}
                                                   className="form-control bg-customcolor text-white"
                                                   placeholder="Username"
                                                   name="username"
                                            />
                                            <label htmlFor="username">Email address</label>
                                            <div className="invalid-feedback mx-2">Format:
                                                something@something.com
                                            </div>
                                        </div>

                                        <div className="form-label-group">
                                            <input type="password" id="password"
                                                   value={this.state.password.value}
                                                   onChange={this.onChangeHandler}
                                                   onBlur={this.onChangeHandler}
                                                   className="form-control bg-customcolor text-white"
                                                   placeholder="Password"
                                                   name="password"
                                            />
                                            <label htmlFor="password">Password</label>

                                        </div>

                                        <div className="form-label-group">
                                            <input type="password" id="password2"
                                                   value={this.state.password2.value}
                                                   onChange={this.onChangeHandler}
                                                   onBlur={this.onChangeHandler}
                                                   className="form-control bg-customcolor text-white"
                                                   placeholder="Confirm password"
                                                   name="password2"
                                            />
                                            <label htmlFor="password2">Confirm password</label>
                                            <div className="invalid-feedback mx-2">Password and confirm password does not match</div>
                                        </div>
                                        <div>
                                            <button className="btn btn-lg btn-block btn-outline-custom-color text-uppercase"
                                                    type="submit"
                                                    id="loginButton">Register
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default SignUp;