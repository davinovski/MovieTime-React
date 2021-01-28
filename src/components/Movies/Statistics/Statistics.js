import React, {Component} from "react";
import MostWatchedMovies from "./MostWatchedMovies/MostWatchedMovies";
import UpcomingMovies from "./UpcomingMovies/UpcomingMovies"

class Statistics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            results: []
        }
    }

    render() {
        return (
            <div className="my-4 container">
                <MostWatchedMovies/>
                <UpcomingMovies/>
            </div>

        );
    }
}
export default Statistics;