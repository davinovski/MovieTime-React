import React, {Component} from "react";
import UserPrivacy from "./UserPrivacy/UserPrivacy";
import "./UserDetails.css"
import movie_image from "../../images/default_movie_image.png";
import UsersService from "../../axios/UserService";
import ReactPaginate from "react-paginate";
import MovieService from "../../axios/MovieService";
import {Link} from "react-router-dom";


class UserDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            param: this.props.match.params,
            user: {
                id: 1,
                userDetails: {
                    firstName: "",
                    lastName: "",
                    profilePicture: null
                }
            },
            favouriteMovies: [],
            pageNumber: 1,
            pageSize: 4,
            totalPages: 0,
            QueryParams: new URLSearchParams(),
            watchedMovies : []
        }

    }

    componentDidMount() {
        this.loadUser();
    }

    loadUser = () => {
        const userData = JSON.parse(localStorage.getItem("userData"));
        this.setState({
            user : userData
        });
        this.loadFavourites();
    };

    loadFavourites = () => {
        MovieService.getAllFavourites(this.state.pageNumber, this.state.pageSize,this.state.QueryParams).then(data => {
            this.setState({
                favouriteMovies: data.data.content,
                totalPages: data.data.totalPages
            });
        });
        this.loadWatched();
    };

    loadWatched = () => {
        MovieService.getAllWatched(this.state.pageNumber, this.state.pageSize,this.state.QueryParams).then(data => {
            this.setState({
                watchedMovies : data.data.content,
                totalPages: data.data.totalPages
            });
        });
    }

    changeFirstName = (e) => {
        const newValue = e.target.value;
        this.setState(prevState => ({
            user: {
                userDetails: {
                    ...prevState.user.userDetails,
                    firstName: newValue
                }
            }
        }));
    };

    handleImageChange = (event) => {
        if (event.target.files.length) {
            const formData = new FormData();
            formData.append("image", event.target.files[0], null);
            UsersService.changeUserImage(formData).then(resp => {
                console.log(resp);
                this.setState(user => ({
                    ...user,
                    user: {
                        ...user.userDetails,
                        userDetails: {
                            profilePicture: resp.data
                        }
                    }
                }));
                const userData = JSON.parse(localStorage.getItem('userData'));
                userData.userDetails = resp.data;
                localStorage.setItem('userData', JSON.stringify(userData));
            });
        }
    };

    changePageHandler = (event) => {
        let newPageNumber = event.selected + 1;
        this.setState({
            PageNumber: newPageNumber
        }, () => {
            this.loadFavourites();
        });
    };

    changeLastName = (e) => {
        const newValue = e.target.value;
        this.setState(prevState => ({
            user: {
                userDetails: {
                    ...prevState.user.userDetails,
                    lastName: newValue
                }
            }
        }));
    };

    changeDescription = (e) => {
        const newValue = e.target.value;
        this.setState(prevState => ({
            user: {
                userDetails: {
                    ...prevState.user.userDetails,
                    description: newValue
                }
            }
        }));
    };


    deleteMovieFromFavourites = (movieId) => {
        MovieService.toggleFavourites(movieId).then(response => {
            if (this.state.PageNumber === this.state.totalPages) {
                if (this.state.favouriteMovies.length === 1) {
                    this.setState(prevState => {
                        const newPageNumber = prevState.PageNumber - 1;
                        return {
                            PageNumber: Math.max(newPageNumber, 0)
                        };
                    }, () => this.loadFavourites());
                } else {
                    const favouriteMovies = this.state.favouriteMovies.filter(movie => movie.id !== movieId);
                    this.setState({favouriteMovies});
                }
            } else {
                this.loadFavourites();
            }

            const favouriteMovies = this.state.favouriteMovies.filter(movie => movie.id !== movieId);

            const userData = JSON.parse(localStorage.getItem("userData"));
            userData.favoritesIds = favouriteMovies.map(c => c.id);
            localStorage.setItem("userData", JSON.stringify(userData));

            this.setState({favouriteMovies});
        });
    };

    loadFavouriteMoviesShow = () => {
            return this.state.favouriteMovies.map(movie => {
                return (

                    <tr key={movie.id}>
                        <td className="text-center"><img alt=""
                                                         src={movie.imageUrl === null ? movie_image : movie.imageUrl}
                                                         width="30px" height="45px" className="shadow-sm"/></td>
                        <td className="my-auto align-middle"><Link to={`/movies/${movie.id}`} className="text-white">{movie.title}</Link>
                        </td>
                        <td className="text-center">
                            <button className="btn" onClick={() => this.deleteMovieFromFavourites(movie.id)}><i
                                className="fa fa-times text-danger"/></button>
                        </td>
                    </tr>
                );
            });
    };
    loadWatchedMoviesShow = () => {
        return this.state.watchedMovies.map(movie => {
            return (

                <tr key={movie.id}>
                    <td className="text-center"><img alt=""
                                                     src={movie.imageUrl === null ? movie_image : movie.imageUrl}
                                                     width="30px" height="45px" className="shadow-sm"/></td>
                    <td className="my-auto align-middle"><Link to={`/movies/${movie.id}`} className="text-white">{movie.title}</Link>
                    </td>
                    <td className="text-center">
                        <button className="btn" onClick={() => this.deleteMovieFromFavourites(movie.id)}><i
                            className="fa fa-times text-danger"/></button>
                    </td>
                </tr>
            );
        });
    };


    paginationShow = () => {
        if (this.state.favouriteMovies.length > 0) {
            return (
                <ReactPaginate previousLabel={<span className="fa fa-angle-double-left"/>}
                               nextLabel={<span className="fa fa-angle-double-right"/>}
                               breakLabel={<span className="gap">...</span>}
                               breakClassName={"break-me"}
                               pageCount={this.state.totalPages}
                               marginPagesDisplayed={2}
                               pageRangeDisplayed={5}
                               pageClassName={"page-item"}
                               pageLinkClassName={"page-link"}
                               previousClassName={"page-item"}
                               nextClassName={"page-item"}
                               previousLinkClassName={"page-link"}
                               nextLinkClassName={"page-link"}
                               forcePage={this.state.pageNumber - 1}
                               onPageChange={this.changePageHandler}
                               containerClassName={"pagination justify-content-center"}
                               activeClassName={"active"}
                />
            );
        }
    };

    submitChangeForm = (e,firstName,lastName, description) =>{
        e.preventDefault();
        UsersService.changeUserInfo(firstName, lastName, description).then(response => {
            this.setState(user => ({
                ...user,
                user: {
                    userDetails: response.data
                }
            }));
            const userData = JSON.parse(localStorage.getItem('userData'));
            userData.userDetails = response.data;
            localStorage.setItem('userData', JSON.stringify(userData));
        });
    };

    render() {
        return (
            <div className="container containerForm mb-2 UserInfo">
                <div className="row mt-3 fadedSpot">
                    <div className="col">
                        <div className="card shadow-sm bg-customcolor">
                            <div className="card-body">
                                <h2 className="text-white"><i className="fa fa-user textRed"/> My account</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row h-100">
                    <UserPrivacy imgUrl={this.state.user.userDetails.profilePicture}
                                 imageHandler={this.handleImageChange}
                                 deactivateUserFrom={this.props.deactivateUserFromPrivacy}
                    />
                    <div className="col-md-9 col-sm-12 mt-3 fadedSpot">
                        <div className="card shadow-sm h-100 blackColorBorder">
                            <div className="card-header bg-lightgrey">
                                <ul className="nav nav-tabs card-header-tabs" id="myTab" role="tablist">
                                    <li className="nav-item">
                                        <a className="nav-link active text-white" id="one-tab" data-toggle="tab" href="#one"
                                           role="tab"
                                           aria-controls="One" aria-selected="true"><i
                                            className="fa fa-user textRed"/><b> Personal Info</b></a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link text-white" id="two-tab" data-toggle="tab" href="#two" role="tab"
                                           aria-controls="Two" aria-selected="false"><i
                                            className="fa fa-star textRed"/><b> Favourites </b></a>
                                    </li>

                                    <li className="nav-item">
                                        <a className="nav-link text-white" id="three-tab" data-toggle="tab" href="#three" role="tab"
                                           aria-controls="Three" aria-selected="false"><i
                                            className="fa fa-video-camera textRed"/><b> Watched </b></a>
                                    </li>
                                </ul>
                            </div>

                            <div className="tab-content bg-customcolor" id="myTabContent">
                                <div className="tab-pane fade show active p-3" id="one" role="tabpanel"
                                     aria-labelledby="one-tab">
                                    <form className="my-auto" onSubmit={(e)=>this.submitChangeForm(e,this.state.user.userDetails.firstName,this.state.user.userDetails.lastName, this.state.user.userDetails.description)}>
                                        <div className="row mx-5 my-3">
                                            <div className="col-3 text-right text-white my-auto"><b>First Name</b></div>
                                            <div className="col-7">
                                                <input type="text" className="form-control"
                                                       onChange={(e) => this.changeFirstName(e)}
                                                       value={this.state.user.userDetails.firstName}/>
                                            </div>
                                        </div>
                                        <div className="row mx-5 mt-4">
                                            <div className="col-3 text-right text-white my-auto"><b>Last Name</b></div>
                                            <div className="col-7">
                                                <input type="text" className="form-control"
                                                       onChange={(e) => this.changeLastName(e)}
                                                       value={this.state.user.userDetails.lastName}/>
                                            </div>
                                        </div>
                                        <div className="row mx-5 mt-4">
                                            <div className="col-3 text-right text-white my-auto"><b>Email</b></div>
                                            <div className="col-7">
                                                <input type="text" className="form-control emailInput"
                                                       value={this.state.user.username} disabled/>
                                            </div>
                                        </div>
                                        <div className="row mx-5 mt-4">
                                            <div className="col-3 text-right text-white my-auto"><b>Description</b></div>
                                            <div className="col-7">
                                                <textarea className="form-control" rows="2"
                                                          onChange={(e) => this.changeDescription(e)}
                                                          value={this.state.user.userDetails.description}/>
                                            </div>
                                        </div>
                                        <div className="row mx-5 mt-4">
                                            <div className="col-5 offset-4 text-center">
                                                <button className="btn btn-outline-custom-color btn-block" type="submit" data-toggle="modal" data-target="#modalSuccess">Change</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div className="tab-pane fade p-30" id="two" role="tabpanel" aria-labelledby="two-tab">
                                    <div className="tableFavourites">
                                        <table className="table border-top-0">
                                            <thead className="border-top-0">
                                            <tr className="border-top-0">
                                                <th className="text-center text-white border-top-0">Image</th>
                                                <th className="border-top-0 text-white">Title</th>
                                                <th className="text-center text-white border-top-0">Remove</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {this.loadFavouriteMoviesShow()}
                                            </tbody>
                                        </table>
                                    </div>
                                    {this.paginationShow()}
                                </div>

                                <div className="tab-pane fade p-30" id="three" role="tabpanel" aria-labelledby="three-tab">
                                    <div className="tableFavourites">
                                        <table className="table border-top-0">
                                            <thead className="border-top-0">
                                            <tr className="border-top-0">
                                                <th className="text-center text-white border-top-0">Image</th>
                                                <th className="border-top-0 text-white">Title</th>
                                                <th className="text-center text-white border-top-0">Remove</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {this.loadWatchedMoviesShow()}
                                            </tbody>
                                        </table>
                                    </div>
                                    {this.paginationShow()}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="modalSuccess" role="dialog">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header bg-dark">
                                <h4 className="modal-title text-white">Personal info change</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body bg-customcolor">
                                You have successfully changed your personal info.
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }

}

export default UserDetails;

