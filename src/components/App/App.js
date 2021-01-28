import React, {Component} from 'react';
import './App.css';
import Header from "../Header/Header";
import {BrowserRouter, Redirect, Route, Switch, withRouter} from "react-router-dom";
import Footer from "../Footer/Footer";
import MainContainer from "../Movies/MainContainer/MainContainer";
import MovieDetails from "../Movies/MovieDetails/MovieDetails";
import MovieAdd from "../Movies/MovieAdd/MovieAdd";
import MovieEdit from "../Movies/MovieEdit/MovieEdit";
import Cast from "../Cast/Cast";
import Movies from "../Movies/Movies/Movies";
import Login from "../Login/Login";
import SignUp from "../SignUp/SignUp";
import ScrollToTop from "../../util/ScrollToTop";
import UsersService from "../../axios/UserService";
import {isUserAuth} from "../../util/CheckAuthFunctions";
import {getUserRole} from "../../util/CheckAuthFunctions";
import MoviesBarChart from "../Movies/Charts/MoviesBarChart";
import UserDetails from "../User/UserDetails";
import Statistics from "../Movies/Statistics/Statistics";
import 'react-multi-carousel/lib/styles.css';
import CastDetails from "../Cast/CastDetails/CastDetails";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isUserAuth: false,
            userRole: null
        };
    }
    componentDidMount() {
        this.setState({
            isUserAuth: isUserAuth(),
            userRole: getUserRole()
        }, () => {
            if (!this.state.isUserAuth)
                this.logoutUserHandler();
        });

    }

    loginUserHandler = () => {
        this.setState({
            isUserAuth: isUserAuth(),
            userRole: getUserRole()
        });
    };


    logoutUserHandler = () => {
        UsersService.logoutUser();
        this.setState({
            isUserAuth: false,
            userRole: null
        });
        this.props.history.push("/login");
        localStorage.removeItem("userData");
    };

    render() {
        let routes = null;

        if (!this.state.isUserAuth) {
            routes = (
                <Switch>
                    <Route path="/register" exact component={SignUp}/>
                    <Route path="/login" exact>
                        <Login login={this.loginUserHandler}
                               logout={this.loginUserHandler}/>
                    </Route>
                    <Redirect to="/login"/>
                </Switch>
            );
        }
        else if (this.state.isUserAuth) {
            if(this.state.userRole!==null && this.state.userRole===false){
                routes =(
                        <Route path="/">
                            <Header logout={this.logoutUserHandler}/>
                            <Switch>
                                <Route path="/movies" exact component={MainContainer}/>
                                <Route path="/movies/:name" exact component={MovieDetails}/>
                                <Route path="/users/:name" render={(props) => <UserDetails {...props} deactivateUserFromPrivacy={this.logoutUserHandler}/>}/>
                                <Route path="/statistics" exact component={Statistics}/>
                                <Route path="/person/:name" exact component={CastDetails}/>
                                <Redirect to="/movies"/>
                            </Switch>
                            <Footer/>
                        </Route>

                );
            }
            else if(this.state.userRole!==null && this.state.userRole===true){
                routes = (
                    <Route path="/">
                        <Header logout={this.logoutUserHandler}/>
                        <Switch>
                            <Route path="/movies" exact component={MainContainer}/>
                            <Route path="/statistics" exact component={Statistics}/>
                            <Route path="/users/:name" render={(props) => <UserDetails {...props} deactivateUserFromPrivacy={this.logoutUserHandler}/>}/>
                            <Route path="/admin/movies/add" exact component={MovieAdd}/>
                            <Route path="/admin/movies" exact component={Movies}/>
                            <Route path="/movies/:name" exact component={MovieDetails}/>
                            <Route path="/movies/:movieId/edit" exact component={MovieEdit}/>
                            <Route path="/admin/people" exact component={Cast}/>
                            <Route path="/admin/stats" exact component={MoviesBarChart}/>
                            <Route path="/person/:name" exact component={CastDetails}/>
                            <Redirect to="/movies"/>
                        </Switch>
                        <Footer/>
                    </Route>
                )
            }

        }
        return (
            <BrowserRouter>

                <ScrollToTop>
                    {routes}
                </ScrollToTop>

            </BrowserRouter>
        )
    }
}

export default withRouter(App);
