import React from "react";
import {Link} from "react-router-dom";

const MovieTableRow = (props) => {

    return (
        <tr className="MovieTableRow">
            <td className="align-middle text-center">
                <Link to={`/movies/${props.data.id}`} className="text-white">
                    {props.data.title}
                </Link>
            </td>
            <td className="align-middle text-center">
                {props.data.country}
            </td>
            <td className="align-middle text-center">
                {props.data.rating.toFixed(1)} <i className="fa fa-star text-warning"/>
            </td>
            <td className="align-middle text-center">
                {props.data.yearOfRelease}
            </td>
            <td className="align-middle text-center">
                {props.data.movieLength}''
            </td>
            <td className="align-middle text-center">
                <Link to={`/movies/${props.data.id}/edit`} className="btn btn-sm btn-outline-primary mx-1">
                    <span className="fa fa-edit"/>
                </Link>
                <button className="btn btn-sm btn-outline-custom-color mx-1" onClick={() => props.deleteMovieHandler(props.data.id)}>
                    <span className="fa fa-trash"/>
                </button>
            </td>
        </tr>
    );
};

export default MovieTableRow;