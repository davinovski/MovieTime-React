import React from "react";
import {Link} from "react-router-dom";
import './CardItem.css';
import defaultMovie from "../../../images/default_movie_image.png";

const CardItem = (props) => {

    const showStars = (total) =>{
        var t=total/2.00;
        console.log(Math.floor(t));
        return (
            <span>
                {Array(Math.floor(t)).fill(<i className="fa fa-star text-warning"/>)}
                {(t) - Math.floor(t)==0 ? ('') : (<i className="fa fa-star-half-empty text-warning"/>)}
            </span>
        )
    };


    return (
        <Link to={`/movies/${props.movie.id}`} style={{textDecoration: 'none', color: 'black', width: "33%"}}>
            <div className="CardItem card mb-4 text-center bg-customcolor">
                <div className="card-img-overlay p-2">
                    <div className="row">
                        <div className="col-2 offset-9">
                            <button className="heart-link" title="Add to favourites">
                                <span className="fa fa-2x fa-star-o text-warning"/>
                            </button>
                        </div>
                    </div>
                </div>
                <img src={defaultMovie} className="card-img-top" />
                <div className="card-body course-title">
                    <h5 className="card-title textRed">{props.movie.title}</h5>
                    <div className="text-center text-muted text-lowercase">{props.movie.yearOfRelease}</div>
                </div>
                <div className="card-footer">
                    <p className="card-text text-muted">{showStars(props.movie.rating)}</p>
                </div>

            </div>
        </Link>
    );
};

export default CardItem;
