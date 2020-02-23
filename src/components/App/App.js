import React from 'react';
import './App.css';
import Header from "../Header/Header";
import {BrowserRouter, Redirect, Route, Switch, withRouter} from "react-router-dom";
import Footer from "../Footer/Footer";
import MainContainer from "../Movies/MainContainer/MainContainer";
import MovieDetails from "../Movies/MovieDetails/MovieDetails";

function App() {
  return (
      <BrowserRouter>
              <Route path="/">
                  <Header/>
                  <Switch>
                      <Route path="/movies" exact component={MainContainer}/>
                      <Route path="/movies/:name" exact component={MovieDetails}/>
                  </Switch>
                  <Footer/>
              </Route>

      </BrowserRouter>
  );
}

export default App;
