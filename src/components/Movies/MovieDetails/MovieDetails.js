import React, {Component} from 'react'
import {Link} from "react-router-dom";
import MovieService from "../../../axios/MovieService";
import MovieInfo from "./MovieInfo/MovieInfo"
import "./MovieDetails.css"
import MovieStaff from "./MovieCast/MovieCast";
import CommentService from "../../../axios/CommentService";

class MovieDetails extends Component {
    constructor(props){
        super(props);
        this.state= {
            movie: {
            },
            param: this.props.match.params,
            comment:{
                title:"",
                content:"",
                stars: 0.0
            },
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
                {(total) - Math.floor(total)===0 ? ('') : (<i className="fa fa-star-half-empty text-warning fa-xs"/>)}
                {Array(Math.floor(10-Math.ceil(total))).fill(<i className="fa fa-star-o text-warning"/>)}
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
        document.getElementById("inputStars").value=0.0;
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
        if(this.state.movie.comments!==undefined){
            return this.state.movie.comments.map(comment=>{
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
                                                    <input type="number" max="10.0" min="1.0" placeholder="Rating (0.0-10.0)" name="stars" id="inputStars" className="w-25 form-control mb-2" step="0.1"
                                                           onChange={(e)=>this.changeComment(e)}/>
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
                                     writers={this.state.movie.writers}/>
                </div>
            </div>
        );
    }
}
export default MovieDetails;
