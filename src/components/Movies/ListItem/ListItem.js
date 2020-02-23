import React from "react";
import {Link} from "react-router-dom";
import './ListItem.css';
import defaultMovie from "../../../images/default_movie_image.png";


const ListItem = props => {


    return (
        <Link to={`/courses/${props.movie.id}`} style={{textDecoration: 'none', color: 'black'}}>


            <div className="ListItem card mb-3 bg-customcolor">
                <div className="row no-gutters">
                    <div className="col-3">
                        <div className="card-img-overlay p-2">
                            <div className="row">
                                <div className="col-4 offset-8 text-right">
                                    <button className="heart-link" title="Add to favourites">
                                        <span className="fa fa-2x fa-star-o text-warning"/>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <img src={defaultMovie}
                             className="card-img" style={{height : "160px"}} alt={props.movie.title}/>
                    </div>
                    <div className="col-9" style={{height : "160px"}}>
                        <div className="card-body">
                            <h5 className="card-title my-0 textRed">{props.movie.title}</h5>
                            <p className="card-text text-muted mt-0 mb-1"><span
                                style={{textTransform: "capitalize"}}>{props.movie.yearOfRelease}</span></p>
                            <div className="text-justify">
                                <small className="card-text text-white">{props.movie.description}</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



        </Link>
    );
};

export default ListItem;