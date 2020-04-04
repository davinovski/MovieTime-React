import React from 'react';
import './App.css';
import Header from "../Header/Header";
import {BrowserRouter, Redirect, Route, Switch, withRouter} from "react-router-dom";
import Footer from "../Footer/Footer";
import MainContainer from "../Movies/MainContainer/MainContainer";
import MovieDetails from "../Movies/MovieDetails/MovieDetails";
import MovieAdd from "../Movies/MovieAdd/MovieAdd";
import MovieEdit from "../Movies/MovieEdit/MovieEdit";
import Cast from "../Cast/Cast";

function App() {
  return (
      <BrowserRouter>
              <Route path="/">
                  <Header/>
                  <Switch>
                      <Route path="/movies/add" exact component={MovieAdd}/>
                      <Route path="/movies" exact component={MainContainer}/>
                      <Route path="/movies/:name" exact component={MovieDetails}/>
                      <Route path="/movies/:movieId/edit" exact component={MovieEdit}/>
                      <Route path="/people" exact component={Cast}/>
                      <Redirect to="/movies"/>

                  </Switch>
                  <Footer/>
              </Route>

      </BrowserRouter>
  );
}

export default App;
