import React, {Component} from 'react'
import GenresService from "../../../axios/GenresService";
import MovieService from "../../../axios/MovieService";
import MovieGenresChart from "./MovieGenresChart";

class MoviesBarChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genres: [],
            movies: []
        }
    }

    componentDidMount() {
        this.loadGenres();
        this.loadMovies();
    }

    loadGenres = () =>{
        GenresService.getGenres().then(resp=>{
            this.setState({
                genres: resp.data
            })
        });
    };

    loadMovies = () =>{
        MovieService.getAllMovies().then(resp=>{
            this.setState({
                movies: resp.data
            })
        });
    };


    render() {
        return (
            <div style={{textAlign: "left !important", fontSize: "1rem !important"}} className="container">
                <MovieGenresChart
                    movies={this.state.movies}
                    genres={this.state.genres}
                />
            </div>
        );
    }
}


export default MoviesBarChart;