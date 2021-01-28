import {Link} from "react-router-dom";
import defaultMovie from "../../../../images/default_movie_image.png";
import React from "react";

const CardItemUpcoming = (props) => {

    return (
        <Link to={`/movies/${props.movie.id}`} style={{textDecoration: 'none', color: 'black', width: "20%"}}>
            <div className="CardItem card mb-4 text-center bg-customcolor con">
                <img src={props.movie.imageUrl===null ? defaultMovie : props.movie.imageUrl} className="card-img" alt={props.movie.name}/>
                <div className="overlay">
                    <div className="overlayText">
                        <h5 className="card-title textRed text-uppercase font-weight-bold">{props.movie.name}</h5>
                        <div className="text-center text-muted text-lowercase mb-3"><i className="fa fa-star text-warning"/> {props.movie.rating}</div>
                    </div>
                </div>

            </div>
        </Link>
    );
};

export default CardItemUpcoming;
