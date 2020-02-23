import React, {Component} from 'react'
import {Link} from "react-router-dom";
import MovieService from "../../../axios/axiosRepository";
import MovieInfo from "./MovieInfo/MovieInfo"
import "./MovieDetails.css"
import MovieStaff from "./MovieCast/MovieCast";

class MovieDetails extends Component {
    constructor(props){
        super(props);
        this.state= {
            movie: {
            },
            param: this.props.match.params,
            posts:[]
        }
    }
    componentDidMount() {
        this.loadMovie();
    }

    loadMovie = () =>{
        MovieService.getMovie(this.state.param.name).then((data) => {
            this.setState({
                movie:data.data,
                videoUrl:data.data.videoUrl
            });
        });
    };

    showStars = (total) =>{
        return (
            <span>
                {Array(Math.floor(total)).fill(<i className="fa fa-star text-warning"/>)}
                {(total) - Math.floor(total)==0 ? ('') : (<i className="fa fa-star-half-empty text-warning fa-xs"/>)}
                {Array(Math.floor(10-Math.ceil(total))).fill(<i className="fa fa-star-o text-warning"/>)}
            </span>
        )
    };

    loadStars = () =>{
        return(
            <span>
                {Array(10).fill(<i className="fa fa-star-o text-warning"/>)}
            </span>
        )
    };

    getVideo = () =>{
        console.log(this.state.videoUrl);
        if(this.state.videoUrl!==undefined) {
            return(
            <iframe src={this.state.videoUrl} className="videoHere"
                    frameBorder="0"
                    width="400vh"
                    height="200vh"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen/>
            )
        }
    };

    render() {
        return (
            <div className="container-fluid px-5 py-0 movieDetails">
                <div className="row mt-3">
                    <div className="col">
                        <div className="card shadow-sm bg-customcolor">
                            <div className="card-body">
                                <h2 className="textRed">{this.state.movie.title}</h2>
                                <span className="text-white"><Link to="/" className="text-white">Home</Link> / {this.state.movie.title}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row mt-3">
                    <MovieInfo yearOfRelease={this.state.movie.yearOfRelease}
                               rating={this.state.movie.rating}
                               genres={this.state.movie.genres}
                               country={this.state.movie.country}
                               movieLength={this.state.movie.movieLength}
                               imageUrl={this.state.movie.imageUrl}
                               detailsUrl={this.state.movie.detailsUrl}
                    />

                    <div className="col-6">
                        <div className="card bg-customcolor shadow-sm">
                        <div className="card my-3 bg-customcolor shadow-sm">
                            <div className="mx-3">
                                    <h4 className="text-white"><b><i className="fa fa-film"/> Storyline</b></h4>
                                    <p className="text-white">{this.state.movie.description}</p>
                            </div>
                            <div className="mx-3">
                                <h4 className="textRed"><b><i className="fa fa-video-camera"/> Trailer </b></h4>
                                <p className="text-center videoHere">
                                    {this.getVideo()}
                                </p>
                            </div>
                            <div className="mx-3">
                                <h4 className="text-white"><b><i className="fa fa-user"/> User Reviews</b></h4>
                                <div className="my-2 mx-2 shadow-sm bg-customcolor" key="1">
                                    <div>
                                        {this.showStars(10)}<b className="text-white"> Loved it!</b>
                                    </div>
                                    <div>
                                        <small className="text-muted">11 November 2019 | by </small><Link to="#"><small className="d-inline text-muted">Hristijan Davinovski</small></Link>
                                    </div>
                                    <div className="text-white">
                                        I really enjoyed watching this movie!
                                    </div>
                                </div>
                                <div className="card bg-customcolor">
                                    <form>
                                        <div className="card mt-3 shadow-sm bg-customcolor">
                                            <div className="card-body p-2">
                                                <input type="text" className="form-control mb-2" placeholder="Title"/>
                                                {this.loadStars()}
                                                <textarea className="form-control textValue mt-2" placeholder="Write a comment" rows="2" id="textareaComment"/>
                                                <button type="submit" className="btn btn-outline-light float-right mt-2 mb-1">Comment</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>

                            </div>
                        </div>
                        </div>
                    </div>
                        <MovieStaff directors={this.state.movie.directors}
                                     stars={this.state.movie.stars}
                                     writers={this.state.movie.writers}/>
                </div>
            </div>
        );
    }
}
export default MovieDetails;
