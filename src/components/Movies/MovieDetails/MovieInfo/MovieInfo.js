import React from 'react';
import sample from "../../../../images/default_movie_image.png"
import "./MovieInfo.css"

const MovieInfo = (props) =>{

    const getGenres = () =>{
        if(props.genres!==undefined) {
            return props.genres.map(genre=>{
                return (<span>{genre.name} &nbsp;</span>)
            })
        }
    };

    const getLanguages = () =>{
        if(props.languages!==undefined) {
            return props.languages.join(", ");
        }
    };

    const getRating = () =>{
        if(props.rating!==undefined){
            return props.rating.toFixed(1);
        }
    };

    return(
        <div className="col-sm-12 col-md-3">
            <div className="card mb-3 shadow-sm bg-customcolor">
                <img src={props.imageUrl===null ? sample : props.imageUrl} className="card-img-top" alt=""/>
                <div className="ml-3 mt-2">
                    <ul className="timeline">
                        <li className="timeline-inverted">
                            <div className="timeline-badge bgRed">
                            </div>
                            <div className="timeline-panel">
                                <div className="timeline-heading">
                                    <span className="text-white"><b>Year of release</b></span>
                                    <br/>
                                    <small className="text-white">{props.yearOfRelease}</small>
                                </div>

                            </div>
                        </li>
                        <li className="timeline-inverted">
                            <div className="timeline-badge bgRed">
                            </div>
                            <div className="timeline-panel">
                                <div className="timeline-heading">
                                    <span className="text-white"><b>Genres</b></span>
                                    <br/>
                                    <small className="text-white">{getGenres()}</small>
                                </div>

                            </div>
                        </li>
                        <li className="timeline-inverted">
                            <div className="timeline-badge bgRed">
                            </div>
                            <div className="timeline-panel">
                                <div className="timeline-heading">
                                    <span className="text-white"><b>Rating</b></span>
                                    <br/>
                                    <small className="text-white">{getRating()}&nbsp;<i className="fa fa-star text-warning"/></small>
                                </div>

                            </div>
                        </li>
                        <li className="timeline-inverted">
                            <div className="timeline-badge bgRed">
                            </div>
                            <div className="timeline-panel">
                                <div className="timeline-heading">
                                    <span className="text-white"><b>Country</b></span>
                                    <br/>
                                    <small className="text-white">{props.country}</small>
                                </div>

                            </div>
                        </li>
                        <li className="timeline-inverted">
                            <div className="timeline-badge bgRed">
                            </div>
                            <div className="timeline-panel">
                                <div className="timeline-heading">
                                    <span className="text-white"><b>Languages</b></span>
                                    <br/>
                                    <small className="text-white">{getLanguages()}</small>
                                </div>

                            </div>
                        </li>
                        <li className="timeline-inverted">
                            <div className="timeline-badge bgRed">
                            </div>
                            <div className="timeline-panel">
                                <div className="timeline-heading">
                                    <span className="text-white"><b>Runtime</b></span>
                                    <br/>
                                    <small className="text-white">{props.movieLength}''</small>
                                </div>

                            </div>
                        </li>
                    </ul>

                    <div className="pr-3 mb-3">
                        <a className="btn btn-outline-light btn-block ml-0"
                           href={props.detailsUrl} target="_blank">Details</a>
                    </div>
                </div>
            </div>
        </div>
    )

};
export default MovieInfo;