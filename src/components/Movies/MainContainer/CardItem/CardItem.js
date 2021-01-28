import React from "react";
import {Link} from "react-router-dom";
import './CardItem.css';
import defaultMovie from "../../../../images/default_movie_image.png";

const CardItem = (props) => {

    const showStars = (total) =>{
        var t=total/2.00;
        return (
            <span>
                {Array(Math.floor(t)).fill(<i className="fa fa-star text-warning"/>)}
                {(t) - Math.floor(t)===0 ? ('') : (<i className="fa fa-star-half-empty text-warning"/>)}
            </span>
        )
    };

    const addToFavouritesHandler = event => {
        event.preventDefault();
        event.stopPropagation();
        props.toggleStar(props.movie.id);
    };


    return (
        <Link to={`/movies/${props.movie.id}`} style={{textDecoration: 'none', color: 'black', width: "33%"}}>
            <div className="CardItem card mb-4 text-center bg-customcolor con">
                <img src={props.movie.imageUrl===null ? defaultMovie : props.movie.imageUrl} className="card-img" alt={props.movie.title}/>
                <div className="overlay">
                    <div className="overlayText">
                        <h5 className="card-title textRed text-uppercase font-weight-bold">{props.movie.title}</h5>
                        <button className="heart-link" title="Add to favourites" onClick={addToFavouritesHandler}>
                            <span className={`fa fa-2x ${props.favourites.includes(props.movie.id) ? 'fa-heart': 'fa-heart-o'} text-danger`}/>
                        </button>
                        <div className="text-center text-muted text-lowercase mb-3">{props.movie.yearOfRelease}</div>
                        <p className="card-text text-muted">{showStars(props.movie.rating)}</p>
                    </div>
                </div>

            </div>
        </Link>
    );
};

export default CardItem;