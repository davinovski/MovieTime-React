import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {withRouter} from "react-router";
import CastService from "../../../axios/CastService";
import MovieService from "../../../axios/MovieService";
import GenresService from "../../../axios/GenresService";

class MovieEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allCast: null,
            allGenres: null,
            movie: {
                writers: [],
                stars: [],
                directors: [],
                genres: []
            },
            initialMovie: {},
            defaultCast: false,
            formDataValid: {
                title: true,
                movieLength: true,
                imageUrl: true,
                videoUrl: true,
                yearOfRelease: true,
                description: true,
                detailsUrl: true,
                languages: true,
                country: true,
                rating: true
            }
        };
    }

    componentDidMount() {
        CastService.getAllStars().then(resp => {
            this.setState({
                allCast: resp.data
            });
        });

        GenresService.getGenres().then(resp=>{
            this.setState({
                allGenres:resp.data
            })
        });
        this.getMovie();
    }

    getMovie = () => {
        MovieService.getMovie(this.props.match.params.movieId).then(response => {
            console.log(response.data);
            this.setState({
                movie: response.data,
                initialMovie: response.data,
                defaultCast: true
            });
        });
    };


    resetFormHandler = (e) => {
        e.preventDefault();
        document.getElementById("edit-form").reset();
        const movie = {...this.state.initialMovie};
        this.setState({
            movie: movie,
            formDataValid: {
                title: true,
                movieLength: true,
                imageUrl: true,
                videoUrl: true,
                yearOfRelease: true,
                description: true,
                detailsUrl: true,
                languages: true,
                country: true,
                rating: true
            }
        });
        this.validateForm();
    };

    onChangeHandler = e => {
        this.validateInput(e);
    };

    validateInput = e => {
        const modifiedCourse = {...this.state.course};
        const inputName = e.target.name;
        if (e.target.type !== "select-multiple")
            modifiedCourse[inputName] = e.target.value;
        else
            modifiedCourse[inputName] = [...e.target.selectedOptions].map(o => o.value);
        this.setState({course: modifiedCourse});

        if (Object.keys(this.state.formDataValid).includes(inputName)) {
            const formDataValid = {...this.state.formDataValid};
            const inputElement = document.getElementById(inputName);
            if (e.target.value.toString().trim().length > 0) {
                formDataValid[inputName] = true;
                inputElement.classList.remove("is-invalid");
            } else {
                formDataValid[inputName] = false;
                inputElement.classList.add("is-invalid");
            }
            this.setState({formDataValid: formDataValid});
        }
    };

    onFormSubmitHandler = e => {
        e.preventDefault();

        const isFormValid = this.state.formDataValid.title &&
            this.state.formDataValid.movieLength &&
            this.state.formDataValid.imageUrl &&
            this.state.formDataValid.videoUrl &&
            this.state.formDataValid.yearOfRelease &&
            this.state.formDataValid.description &&
            this.state.formDataValid.detailsUrl &&
            this.state.formDataValid.languages &&
            this.state.formDataValid.country &&
            this.state.formDataValid.rating
        ;

        if (isFormValid) {
            const initialMovie = {...this.state.initialMovie};

            const modifiedMovie = {
                movieLength: e.target.movieLength.value,
                imageUrl: e.target.imageUrl.value,
                title: e.target.title.value,
                videoUrl: e.target.videoUrl.value,
                yearOfRelease: e.target.yearOfRelease.value,
                detailsUrl: e.target.detailsUrl.value,
                description: e.target.description.value,
                languages: e.target.languages.value.split(","),
                country: e.target.country.value,
                writers: [...e.target.writers.options].filter(w => w.selected).map(w => w.value),
                directors: [...e.target.directors.options].filter(d => d.selected).map(d => d.value),
                stars: [...e.target.stars.options].filter(s => s.selected).map(s => s.value),
                genres: [...e.target.genres.options].filter(g => g.selected).map(g => g.value),
                rating: e.target.rating.value
            };
            MovieService.editMovie(initialMovie.id, modifiedMovie).then(() => {
                this.props.history.push("/movies");
            });
        } else {
            this.validateForm();
        }
    };

    validateForm = () => {
        const formDataValid = {...this.state.formDataValid};
        Object.entries(formDataValid).forEach(([key, value]) => {
            if (!value) {
                document.getElementById(key).classList.add("is-invalid");
            }
        });
    };

    render() {
        return (
            <div className="movieAdd row w-100 my-4">
                <div className="col-9 mx-auto my-4">
                    <div className="my-auto card cardAdd px-3 bg-customcolor">
                        <form className="p-4" onSubmit={this.onFormSubmitHandler} id="edit-form">
                            <div className="row">
                                <h1 className="textRed ml-3 my-0">Edit movie</h1>
                            </div>
                            <hr className="mb-4"/>
                            <div className="row">
                                <div className="col-md-6 col-sm-12">
                                    {this.movieTitle()}
                                    {this.movieImageUrl()}
                                    {this.movieVideoUrl()}
                                    {this.movieRuntime()}
                                    {this.yearOfRelease()}
                                    {this.movieLanguages()}
                                    {this.getSelectGenres()}
                                    {this.detailsUrl()}
                                    {this.movieRating()}
                                </div>
                                <div className="col-md-6 col-sm-12">
                                    {this.movieDescription()}
                                    {this.movieCountry()}
                                    {this.getSelectWriters()}
                                    {this.getSelectDirectors()}
                                    {this.getSelectStars()}
                                </div>
                            </div>
                            <hr/>
                            <div className="row">
                                <div className="col-md-4 col-sm-12 mb-2">
                                    <Link to="/admin/courses" className="btn btn-block btn-outline-light"><i
                                        className="fa fa-times"/> Cancel</Link>
                                </div>
                                <div className="col-md-4 col-sm-12 text-center mb-2">
                                    <button type="reset" className="btn btn-block btn-outline-warning text-white"
                                            onClick={this.resetFormHandler}><i
                                        className="fa fa-undo"/> Reset
                                    </button>
                                </div>
                                <div className="col-md-4 col-sm-12 mb-2">
                                    <button type="submit" className="btn btn-block btn-outline-success text-white"><i
                                        className="fa fa-save"/> Save
                                    </button>
                                </div>
                            </div>

                        </form>
                    </div>
                </div>
            </div>

        );
    };

    movieTitle = () => {
        return (
            <div className="form-group">
                <div className="row mb-3">
                    <div className="col-3 text-right text-white">
                        <label><b>Title</b></label>
                    </div>
                    <div className="col-9">
                        <input type="text" className="form-control" id="title"
                               placeholder="Title of the movie" name="title"
                               defaultValue={this.state.movie.title}
                               onChange={this.onChangeHandler}
                        />
                    </div>
                </div>
            </div>
        )
    };

    movieCountry = () => {
        return (
            <div className="form-group">
                <div className="row mb-3">
                    <div className="col-3 text-right text-white">
                        <label><b>Country</b></label>
                    </div>
                    <div className="col-9">
                        <input type="text" className="form-control" id="country"
                               placeholder="Country" name="country"
                               defaultValue={this.state.movie.country}
                               onChange={this.onChangeHandler}
                        />
                    </div>
                </div>
            </div>
        )
    };

    movieRating = () => {
        return (
            <div className="form-group">
                <div className="row mb-3">
                    <div className="col-3 text-right text-white">
                        <label><b>Rating</b></label>
                    </div>
                    <div className="col-9">
                        <input type="number" className="form-control" id="rating"
                               placeholder="Rating" name="rating"
                               defaultValue={this.state.movie.rating}
                               onChange={this.onChangeHandler}
                        />
                    </div>
                </div>
            </div>
        )
    };

    movieDescription = () => {
        return (
            <div className="form-group">
                <div className="row mb-3">
                    <div className="col-3 text-right text-white">
                        <label><b>Description</b></label>
                    </div>
                    <div className="col-9">
                        <textarea className="form-control" id="description"
                                  placeholder="Description" name="description" rows="4"
                                  defaultValue={this.state.movie.description}
                                  onChange={this.onChangeHandler}
                        />
                    </div>
                </div>
            </div>
        )
    };

    detailsUrl = () => {
        return (
            <div className="form-group">
                <div className="row mb-3">
                    <div className="col-3 text-right text-white">
                        <label><b>Details URL</b></label>
                    </div>
                    <div className="col-9">
                        <input type="text" className="form-control" id="detailsUrl"
                               placeholder="Url for details" name="detailsUrl"
                               defaultValue={this.state.movie.detailsUrl}
                               onChange={this.onChangeHandler}
                        />
                    </div>
                </div>
            </div>
        )
    };

    yearOfRelease = () => {
        return (
            <div className="form-group">
                <div className="row mb-3">
                    <div className="col-3 text-right text-white">
                        <label><b>Year of release</b></label>
                    </div>
                    <div className="col-9">
                        <input type="number" className="form-control" id="yearOfRelease"
                               placeholder="Year of release" name="yearOfRelease"
                               defaultValue={this.state.movie.yearOfRelease}
                               onChange={this.onChangeHandler}
                        />
                    </div>
                </div>
            </div>
        )
    };

    movieRuntime = () => {
        return (
            <div className="form-group">
                <div className="row mb-3">
                    <div className="col-3 text-right text-white">
                        <label><b>Runtime</b></label>
                    </div>
                    <div className="col-9">
                        <input type="number" className="form-control" id="movieLength"
                               placeholder="Runtime" name="movieLength"
                               defaultValue={this.state.movie.movieLength}
                               onChange={this.onChangeHandler}
                        />
                    </div>
                </div>
            </div>
        )
    };

    movieImageUrl = () => {
        return (
            <div className="row mb-3">
                <div className="col-3 text-right text-white">
                    <b>Image Url</b>
                </div>
                <div className="col-9">
                    <input type="text" className="form-control" id="imageUrl"
                           placeholder="Image Url" name="imageUrl"
                           defaultValue={this.state.movie.imageUrl}
                           onChange={this.onChangeHandler}/>
                </div>
            </div>
        );
    };


    movieVideoUrl = () => {
        return (
            <div className="row mb-3">
                <div className="col-3 text-right text-white">
                    <b>Video Url</b>
                </div>
                <div className="col-9">
                    <input type="text" className="form-control" id="videoUrl"
                           placeholder="Video Url" name="videoUrl"
                           defaultValue={this.state.movie.videoUrl}
                           onChange={this.onChangeHandler}/>
                </div>
            </div>
        );
    };

    getValueOptions = () => {
        if (this.state.allCast !== null) {
            return this.state.allCast.map((castMember, index) => <option key={castMember.id}
                                                                         value={castMember.id}>{castMember.name}</option>)
        }
    };

    getSelectWriters = () => {
        let result = null;
        if (this.state.defaultCast) {
            result = (
                <div className="form-group">
                    <div className="row mb-3">
                        <div className="col-3 text-right text-white">
                            <label><b>Writers</b></label>
                        </div>
                        <div className="col-9">
                            <select className="form-control" id="writers" name="writers" multiple
                                    defaultValue={this.state.movie.writers.map(w => w.id)}
                                    onChange={this.onChangeHandler}>
                                {this.getValueOptions()}
                            </select>
                        </div>
                    </div>
                </div>
            );
        }
        return result;
    };

    getSelectDirectors = () => {
        let result = null;
        if (this.state.defaultCast) {
            result = (
                <div className="form-group">
                    <div className="row mb-3">
                        <div className="col-3 text-right text-white">
                            <label><b>Directors</b></label>
                        </div>
                        <div className="col-9">
                            <select className="form-control" id="directors" name="directors" multiple
                                    defaultValue={this.state.movie.directors.map(d => d.id)}
                                    onChange={this.onChangeHandler}>
                                {this.getValueOptions()}
                            </select>
                        </div>
                    </div>
                </div>
            );
        }
        return result;
    };

    getGenresValueOptions = () =>{
        if (this.state.allGenres !== null) {
            return this.state.allGenres.map((genre, index) => <option value={genre.id} key={genre.id}>{genre.name}</option>)
        }
    };

    getSelectStars = () => {
        let result = null;
        if (this.state.defaultCast) {
            result = (
                <div className="form-group">
                    <div className="row mb-3">
                        <div className="col-3 text-right text-white">
                            <label><b>Stars</b></label>
                        </div>
                        <div className="col-9">
                            <select className="form-control" id="stars" name="stars" multiple
                                    defaultValue={this.state.movie.stars.map(s => s.id)}
                                    onChange={this.onChangeHandler}>
                                {this.getValueOptions()}
                            </select>
                        </div>
                    </div>
                </div>
            );
        }
        return result;
    };

    getSelectGenres = () => {
        let result = null;
        if (this.state.defaultCast) {
            result = (
                <div className="form-group">
                    <div className="row mb-3">
                        <div className="col-3 text-right text-white">
                            <label><b>Genres</b></label>
                        </div>
                        <div className="col-9">
                            <select className="form-control" id="genres" name="genres" multiple
                                    defaultValue={this.state.movie.genres.map(g => g.id)}
                                    onChange={this.onChangeHandler}>
                                {this.getGenresValueOptions()}
                            </select>
                        </div>
                    </div>
                </div>
            );
            return result;
        }
    }

    movieLanguages = () => {
        return (
            <div className="form-group">
                <div className="row mb-3">
                    <div className="col-3 text-right text-white">
                        <label><b>Languages</b></label>
                    </div>
                    <div className="col-9">
                        <input type="text" className="form-control" id="languages"
                               placeholder="e.g  English, French" name="languages"
                               defaultValue={this.state.movie.languages}
                               onChange={this.onChangeHandler}
                        />
                    </div>
                </div>
            </div>
        )
    };
}

export default withRouter(MovieEdit);