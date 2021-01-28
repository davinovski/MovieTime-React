import React, {Component} from 'react';
import CastService from "../../../axios/CastService";
import MovieService from "../../../axios/MovieService";

class Cast extends Component {

    constructor(props) {
        super(props);
        this.state = {
            param: this.props.match.params,
            person: {},
            moviesDirected : [],
            moviesWritten : [],
            moviesStarred : []
        };
    }

    componentDidMount() {
        this.getPerson();
    }

    getPerson = () => {
        CastService.getPerson(this.state.param.name).then(response => {
            this.setState({
                person : response.data
            });
        });

        this.loadWrittenMovies();
    }

    loadWrittenMovies = () => {
        MovieService.getWrittenMovies(this.state.param.name).then(response => {
        this.setState(prevState => ({
            ...prevState,
            moviesWritten: response.data
        }));
    });
        this.loadStarredMovies()
    }

    loadStarredMovies = () => {
        MovieService.getStarredMovies(this.state.param.name).then(response => {
            this.setState(prevState => ({
                ...prevState,
                moviesStarred: response.data
            }));
        });
        this.loadDirectedMovies();
    }

    loadDirectedMovies = () => {
        MovieService.getDirectedMovies(this.state.param.name).then(response => {
            this.setState(prevState => ({
                ...prevState,
                moviesDirected: response.data
            }));
        })
    }



    render() {
        return (
            <div className="container">
               <div className="row">

               </div>
            </div>
        );
    }
}

export default Cast;