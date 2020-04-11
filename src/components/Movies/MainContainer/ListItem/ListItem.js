import React from "react";
import {Link} from "react-router-dom";
import './ListItem.css';
import defaultMovie from "../../../../images/default_movie_image.png";


const ListItem = props => {

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
        <Link to={`/movies/${props.movie.id}`} style={{textDecoration: 'none', color: 'black'}}>
            <div className="ListItem card mb-3 bg-customcolor" style={{height:310}}>
                <div className="row h-100 no-gutters bg-customcolor">
                    <div className="col-sm-5 col-md-3 h-100">
                        <div className="card-img-overlay p-2">
                                    <button onClick={addToFavouritesHandler} className="heart-link float-right" title="Add to favourites">
                                        <span className={`fa fa-2x ${props.favourites.includes(props.movie.id) ? 'fa-heart' : 'fa-heart-o '} text-danger`}/>
                                    </button>
                        </div>
                        <img src={props.movie.imageUrl===null ? defaultMovie : props.movie.imageUrl}
                             className="card-img h-100" style={{height : "160px"}} alt={props.movie.title}/>
                    </div>
                    <div className="col-sm-7 col-md-9 h-100" style={{height : "160px"}}>
                        <div className="card-body h-100">
                            <h5 className="card-title my-0 textRed">{props.movie.title}</h5>
                            <p className="card-text text-muted mt-0 mb-1"><span
                                style={{textTransform: "capitalize"}}>{props.movie.yearOfRelease}</span></p>
                            <div className="text-justify">
                                <small className="card-text text-white">{props.movie.description}</small>
                            </div>
                            <p className="card-text text-muted">{showStars(props.movie.rating)}</p>
                        </div>
                    </div>
                </div>
            </div>



        </Link>
    );
};

export default ListItem;