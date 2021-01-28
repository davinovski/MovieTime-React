
import React from "react";
import "./CardItemWatched.scss"
import {Link} from "react-router-dom";

const CardItemWatched = (props) => {

    return (
        <div className="card col-md-6 p-2 border-0 col-sm-12 colrounded">
        <div className="movie_card" id="bright" style={{width: '100%', height:'100%'}}>
            <a href={`https://www.themoviedb.org/movie/${props.movie.id}`} style={{textDecoration: 'none'}}>
            <div className="info_section">
                <div className="movie_header">
                    <img className="locandina"
                         src={"https://image.tmdb.org/t/p/original/" + props.movie.poster_path}/>
                    <h1>{props.movie.original_title}</h1>
                    <h4>{props.movie.release_date}</h4>
                </div>
                <div className="movie_desc">
                    <p className="text">
                        {props.movie.overview.length > 350 ? props.movie.overview.substring(0,350) + "..." : props.movie.overview}
                    </p>
                </div>
            </div>
            <div className="blur_back bright_back" style={{backgroundImage: `url("https://image.tmdb.org/t/p/original/${props.movie.backdrop_path}")`}}/>
            </a>
            </div>
        </div>

    );
}

export default CardItemWatched;
