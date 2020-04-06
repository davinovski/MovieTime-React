import React from "react";
import MovieTableRow from "./MovieTableRow/MovieTableRow";
import './MovieTableRow/MovieTableRow.css';

const MoviesTable = (props) => {

    const generateTableHeading = () => {
        return (
            <tr>
                <th scope="col" className="text-center">Title</th>
                <th scope="col" className="text-center">Country</th>
                <th scope="col" className="text-center">Rating</th>
                <th scope="col" className="text-center">Year</th>
                <th scope="col" className="text-center">Runtime</th>
                <th scope="col" className="text-center">Actions</th>
            </tr>
        );
    };

    const generateTableBody = () => {
        return props.data.map(item => (
            <MovieTableRow data={item} key={item.id}
                             deleteMovieHandler={props.deleteMovieHandle}/>
        ));
    };

    if (props.data && props.data.length > 0) {
        return (
            <table className="table table-striped text-white">
                <thead>
                {generateTableHeading()}
                </thead>
                <tbody>
                {generateTableBody()}
                </tbody>
            </table>
        );
    }
    return null;
};

export default MoviesTable;