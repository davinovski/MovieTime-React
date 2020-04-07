import React,{Component} from "react";
import {NavLink, Link} from "react-router-dom";
import logo from "../../images/logo.png"
import "./Header.css"
import user from "../../images/user_image.png"


class Header extends Component{
    constructor(props) {
        super(props);
        const userData = JSON.parse(localStorage.getItem("userData"));
        this.state = {
            id : userData.id,
            firstName: userData.firstName,
            lastName: userData.lastName,
            isUserAdmin: userData.admin
        }
    }

    getFullName = () => {
        return `${this.state.firstName} ${this.state.lastName}`;
    };

    onLogoutHandler = () => {
        this.props.logout();
    };

    renderAdminLinks = () => {
        if (this.state.isUserAdmin) {
            return (
                <ul className="navbar-nav mr-auto ml-2">
                    <li className="nav-item">
                        <NavLink to="/admin/movies" className="nav-link text-white">
                            <i className="fa fa-bookmark"/>&nbsp;
                            Manage movies
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/admin/people" className="nav-link text-white">
                            <i className="fa fa-user-plus"/>&nbsp;
                            Manage stars
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/admin/users" className="nav-link text-white">
                            <i className="fa fa-users"/>&nbsp;
                            Manage users
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/movies" className="nav-link text-white">
                            <i className="fa fa-book"/>&nbsp;
                            List movies
                        </NavLink>
                    </li>
                </ul>
            );
        }
        return null;
    };


    render() {
        return (
            <header className="Header shadow-sm">
                <nav className="navbar navbar-expand-lg navbar-dark">
                    <div className="container">

                        <NavLink className="navbar-brand" to="/">
                            <div className="d-flex align-items-center">
                                <img src={logo} width="45px" height="45px" alt="M"/>
                                <h3 className="d-inline my-0 ml-2 text-white"> Movie<span className="timeText">Time</span></h3>
                            </div>
                        </NavLink>

                        <button className="navbar-toggler" type="button" data-toggle="collapse"
                                data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                aria-expanded="false"
                                aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"/>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            {this.renderAdminLinks()}
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item dropdown">
                                <span className="nav-link dropdown-toggle text-white" id="navbarDropdownBlog"
                                      data-toggle="dropdown"
                                      aria-haspopup="true" aria-expanded="false">
                                    <img src={user}
                                         width="40px" alt="User-profile" height="40px"
                                         className="rounded-circle mx-2 text-white"/>
                                    <span className="spanButton">{this.getFullName()}</span>
                                </span>
                                    <div className="dropdown-menu dropdown-menu-right bg-customcolor"
                                         aria-labelledby="navbarDropdownBlog">
                                        <span className="dropdown-item text-white spanButton" onClick={this.onLogoutHandler}><i
                                            className="fa fa-sign-out mr-1 timeText" />Log out</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
        )
    }
}
export default Header;