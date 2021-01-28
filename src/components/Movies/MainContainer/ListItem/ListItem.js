import React from "react";
import {Link} from "react-router-dom";
import './ListItem.scss';
import defaultMovie from "../../../../images/default_movie_image.png";

const CardItem = (props) => {


    const addToFavouritesHandler = event => {
        event.preventDefault();
        event.stopPropagation();
        props.toggleStar(props.movie.id);
    };


    return (
        <Link to={`/movies/${props.movie.id}`} style={{textDecoration: 'none', color: 'black'}}>
            <div className="movie_card_list" id="bright_list" style={{'marginTop': '0px', 'marginBottom': '18px', 'marginLeft' : '0px', 'marginRight' : '0px'}}>
                <div className="info_section_list">
                    <div className="movie_header_list">
                        <img className="locandina_list"
                             src={props.movie.imageUrl===null ? defaultMovie : props.movie.imageUrl}/>
                        <h1>{props.movie.title}</h1>
                        <h4>{props.movie.yearOfRelease}</h4>
                        <span className="minutes_list">{props.movie.movieLength} min</span>
                        <p className="type text-muted">{props.movie.rating} <i className="fa fa-star text-warning"/></p>
                    </div>
                    <div className="movie_desc_list">
                        <p className="text">
                            {props.movie.description.length > 350 ? props.movie.description.substring(0,350) + "..." : props.movie.description}
                        </p>
                    </div>
                    <div className="movie_social">
                        <ul>
                            <li><button onClick={addToFavouritesHandler} className="float-right" title="Add to favourites" style={{background : 'transparent', border: 'none'}}>
                                <span className={`fa fa-2x ${props.favourites.includes(props.movie.id) ? 'text-danger' : 'text-muted '} fa-heart`}/>
                            </button></li>
                        </ul>
                    </div>
                </div>
                <div className="blur_back_list bright_back_list" style={{backgroundImage: `url("${props.movie.imageUrl}")`}}/>
            </div>
        </Link>
    );
};

export default CardItem;
