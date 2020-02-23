import React,{Component} from "react";
import {NavLink, Link} from "react-router-dom";
import logo from "../../images/logo.png"
import "./Header.css"
import user from "../../images/user_image.png"


class Header extends Component{
    constructor(props){
        super(props);
    }
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
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item dropdown">
                                <span className="nav-link dropdown-toggle text-white" id="navbarDropdownBlog"
                                      data-toggle="dropdown"
                                      aria-haspopup="true" aria-expanded="false">
                                    <img src={user}
                                         width="40px" alt="User-profile" height="40px"
                                         className="rounded-circle mx-2 text-white"/>
                                         Name LastName
                                </span>
                                    <div className="dropdown-menu dropdown-menu-right bg-customcolor"
                                         aria-labelledby="navbarDropdownBlog">
                                        <Link className="dropdown-item text-white"><i className="fa fa-user mr-1 timeText"/> Мој профил</Link>
                                        <span className="dropdown-item text-white"><i
                                            className="fa fa-sign-out mr-1 timeText"/>Одјави се</span>
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