import React, {Component} from "react"
import "../SignUp/SignUp.css"
import logo from '../../images/logo.png';
import {withRouter, Link} from "react-router-dom";
import UsersService from "../../axios/UserService";
import Loader from "react-loader-spinner";

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showAlertSignup: false,
            showAlertWrongCredentials: false,
            wrongCredentialsMessage: "",
            showSpinner: false
        }
    }

    componentDidMount() {
        if (this.props.location.state !== undefined && this.props.location.state.prevPath === "/signup") {
            this.setState({showAlertSignup: true})
        }
    }

    renderAlert = () => {
        if (this.state.showAlertSignup) {
            return (
                <div className="alert alert-info" role="alert">
                    <small>Испратена е потврда за регистрација на Вашиот email</small>
                </div>
            );
        } else if (this.state.showAlertWrongCredentials) {
            return (
                <div className="alert alert-danger" role="alert">
                    <small>{this.state.wrongCredentialsMessage}</small>
                </div>
            );
        }
        return null;
    };

    onFormSubmitHandler = e => {
        e.preventDefault();
        const user = {
            username: e.target.username.value,
            password: e.target.password.value
        };
        this.setState({showSpinner: true});
        UsersService.loginUser(user).then(response => {
            this.setLocalStorage(user.username, response.headers.authorization);
            this.setState({showSpinner: false});
        }).catch(error => {
            this.setState({
                showSpinner: false,
            showAlertWrongCredentials : true,
            wrongCredentialsMessage: "Invalid credentials"})});
    };

    setLocalStorage = (username, token) =>{
        UsersService.handleAuthentication(token);
        UsersService.getUser(username).then(response => {
            UsersService.handleUserData(response.data);
            this.redirectByRole(response.data.admin);
        });
        this.redirectByRole();
    };

    redirectByRole = () => {
        this.props.login();
    };

    spinner = () => {
        if (this.state.showSpinner) {
            return (
                <div className="text-center">
                    <Loader
                        type="ThreeDots"
                        color="#D12118"
                        height={100}
                        width={100}
                    />
                </div>
            );
        }
        return (
            <div>
                <button className="btn btn-lg btn-block btn-outline-custom-color text-uppercase" type="submit"
                        id="loginButton">Log in
                </button>
                <Link to={"/register"}
                      className="btn btn-lg btn-outline-light btn-block text-uppercase signUpButton">Register
                </Link>
            </div>)
    };


    render() {
        return (
            <div className="bg-image-login Login">
                <div className="container container-table">
                    <div className="row firstRow">
                        <div className="col-sm-9 col-md-7 col-lg-5 my-auto mx-auto">
                            <div className="card card-signin my-5 bg-customcolor">
                                <div className="card-body">
                                    <div className="logoDiv">
                                        <img src={logo} width="50px" height="50px" alt="" className="logoImage"/>
                                        <i className="h3 pt-2 movieText">Movie<i
                                            className="helperText textRed">Time</i></i>
                                    </div>
                                    {this.renderAlert()}
                                    <hr>
                                    </hr>
                                    <form className="form-signin mt-4" onSubmit={this.onFormSubmitHandler}>

                                        <div className="form-label-group">
                                            <input type="email" id="inputEmail" className="form-control bg-customcolor text-white"
                                                   placeholder="Email address" name="username" autoFocus/>
                                            <label htmlFor="inputEmail">E-mail</label>
                                        </div>

                                        <div className="form-label-group">
                                            <input type="password" id="inputPassword" className="form-control bg-customcolor text-white"
                                                   placeholder="Password" name="password"/>
                                            <label htmlFor="inputPassword">Password</label>
                                        </div>
                                        {this.spinner()}
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

export default withRouter(Login);