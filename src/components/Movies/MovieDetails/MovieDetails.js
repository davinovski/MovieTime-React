import React, {Component} from 'react'
import {Link} from "react-router-dom";
import MovieService from "../../../axios/MovieService";
import MovieInfo from "./MovieInfo/MovieInfo"
import "./MovieDetails.css"
import MovieStaff from "./MovieCast/MovieCast";
import CommentService from "../../../axios/CommentService";
import UserService from "../../../axios/UserService";
import ReactStars from "react-rating-stars-component";

class MovieDetails extends Component {
    constructor(props){
        super(props);
        this.state= {
            movie: {
            },
            param: this.props.match.params,
            comments:[],
            comment:{
                title:"",
                content:"",
                stars: 0.0
            },
            watched: false,
            favorites: []
        }
    }
    componentDidMount() {
        this.loadMovie();
    }

    loadMovie = () =>{

        MovieService.getMovie(this.state.param.name).then(data => {
            this.setState({
                movie: data.data,
                videoUrl:data.data.videoUrl,
                favorites: JSON.parse(localStorage.getItem("userData")).favoritesIds
            });
        });
        this.loadComments(this.state.param.name);
    };

    loadComments = (params) => {
        MovieService.fetchComments(params).then(data => {
            this.setState(prevState => ({
                ...prevState,
                comments: data.data
            }));
        });
        this.loadWatchedMovies();
    };

    loadWatchedMovies = () => {
        UserService.isWatched(this.state.param.name).then(resp => {
            this.setState({
                watched: resp.data
            })
        });
    }

    addToFavourites = (movieId) => {
        MovieService.toggleFavourites(movieId).then(resp => {
            localStorage.removeItem("userData");
            localStorage.setItem("userData", JSON.stringify(resp.data));
            this.setState({
                favorites: JSON.parse(localStorage.getItem("userData")).favoritesIds
            })
        });
    };

    addToWatched = (movieId) => {
        UserService.addToWatched(movieId).then(resp => {
            this.setState({
                watched: resp.data
            })
        });
    };

    showStars = (total) =>{
        return (
            <span>
                {Array(Math.floor(total)).fill(<i className="fa fa-star text-warning"/>)}
                {(total) - Math.floor(total)===0 ? ('') : (<i className="fa fa-star-half-empty text-warning fa-xs"/>)}
            </span>
        )
    };

    getVideo = () =>{
        if(this.state.videoUrl!==undefined) {
            return(
            <iframe src={this.state.videoUrl} className="videoHere img-fluid"
                    frameBorder="0"
                    width="600vh"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={this.state.name}
            />
            )
        }
    };

    postComment = (e) =>{
        e.preventDefault();
        document.getElementById("textareaComment").value="";
        document.getElementById("inputTitle").value="";
        CommentService.postComment(this.state.movie.id,this.state.comment.title,this.state.comment.content, this.state.comment.stars).then(()=>this.loadMovie());
    };


    changeComment = (e) =>{
            const inputName = e.target.name;
            const inputValue = e.target.value;
            const comment = {...this.state.comment};

            comment[inputName] = inputValue;

            this.setState({
                comment: comment,
            });
        };

    getComments = () =>{
        if(this.state.comments!==undefined){
            return this.state.comments.map(comment=>{
                return(
                    <div className="my-2 mx-2 shadow-sm bg-customcolor" key={comment.id}>
                        <div>
                            {this.showStars(comment.stars)}<b className="text-white"> {comment.title}</b>
                        </div>
                        <div>
                            <small className="text-muted">{comment.createdAt.substring(0,10)} | by </small><Link to="#"><small className="d-inline text-muted">{comment.user.firstName} {comment.user.lastName}</small></Link>
                        </div>
                        <div className="text-white">
                            {comment.content}
                        </div>
                    </div>
                )}
            )
        }
    };

    changeStars = (newRating) => {
        this.setState(prevState => ({
            ...prevState,
            comment: {
                ...prevState.comment,
                stars: newRating
            }
        }))
    }

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
                               languages={this.state.movie.languages}
                    />

                    <div className="col-sm-12 col-md-6">
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
                                <div className="card bg-customcolor">
                                    <form>
                                        <div className="card mt-3 shadow-sm bg-customcolor">
                                            <div className="card-body p-2">
                                                <form onSubmit={(e)=>this.postComment(e)}>
                                                    <input type="text" className="form-control mb-2" name="title"
                                                           placeholder="Title" id="inputTitle" onChange={(e)=>this.changeComment(e)}/>
                                                    <ReactStars
                                                        id="stars"
                                                        count={10}
                                                        size={24}
                                                        value={0}
                                                        activeColor="#ffc107"
                                                        onChange = {this.changeStars}
                                                    />
                                                    <textarea className="form-control textValue mt-2 textAreaComment"
                                                              placeholder="Write a comment" rows="2" name="content"
                                                              id="textareaComment" onChange={(e)=>this.changeComment(e)}/>
                                                    <button type="submit"
                                                            className="btn btn-outline-light float-right mt-2 mb-1">Comment
                                                    </button>
                                                </form>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                {this.getComments()}
                            </div>
                        </div>
                        </div>
                    </div>
                        <MovieStaff directors={this.state.movie.directors}
                                    stars={this.state.movie.stars}
                                    writers={this.state.movie.writers}
                                    movieid={this.state.movie.id}
                                    addToFav={this.addToFavourites}
                                    addToWatched={this.addToWatched}
                                    favorite={this.state.favorites.some(m => m === this.state.movie.id)}
                                    watched={this.state.watched}
                                    />
                </div>
            </div>
        );
    }
}
export default MovieDetails;
