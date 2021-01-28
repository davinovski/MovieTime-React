import React, {Component} from "react";
import "./MostWatchedMovies.css";
import MovieService from "../../../../axios/MovieService";
import CardItem from "../CardItems/CardItemUpcoming";

class MostWatchedMovies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: []
        }
    }

    componentDidMount() {
        MovieService.getMostWatched().then(data => {
            console.log(data.data);
            this.setState({
                movies: data.data
            })
        })
    }

    showMovies = () => {
        if (this.state.movies !== undefined) {
            return (
                <div className="card-deck w-100" style={{minHeight: "300px"}}>
                    {this.state.movies.map(movie => <CardItem key={movie.id}
                                                               movie={movie}/>)}
                </div>
            );

        }
    }

    render() {
        return (
            <div>
                <h4 className="redLeftBorder">
                    Trending
                </h4>
                <div className="text-muted mb-2">
                    this month's top movies
                </div>
                {this.showMovies()}
            </div>

        );
    }
}
export default MostWatchedMovies;