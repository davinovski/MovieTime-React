import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {withRouter} from "react-router";
import CastService from "../../../axios/CastService";
import MovieService from "../../../axios/MovieService";
import GenresService from "../../../axios/GenresService";

class MovieAdd extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allCast: null,
            allGenres: null,
            defaultCast: null,
            defaultGenre: null,
            formData:{
                title:"",
                movieLength: 0,
                imageUrl: "",
                videoUrl: "",
                yearOfRelease: "",
                description:"",
                detailsUrl:"",
                languages:"",
                country:"",
                rating: 0.0
            },
            formDataValid: {
                title:false,
                movieLength: false,
                imageUrl: false,
                videoUrl: false,
                yearOfRelease: false,
                description:false,
                detailsUrl:false,
                languages:false,
                country:false,
                rating:false
            }
        };
    }

    componentDidMount() {
        CastService.getAllStars().then(resp => {
            this.setState({
                allCast: resp.data,
                defaultCast: resp.data[0]
            });
        });

        GenresService.getGenres().then(resp=>{
            this.setState({
                allGenres:resp.data,
                defaultGenre: resp.data[0]
            });
        })
    }

    resetFormHandler = (e) => {
        this.setState({
            formData: {
                title:"",
                movieLength: 0,
                imageUrl: "",
                videoUrl: "",
                yearOfRelease: "",
                description:"",
                detailsUrl:"",
                languages:"",
                country:"",
                rating: 0.0
            },
            formDataValid: {
                title:false,
                movieLength: false,
                imageUrl: false,
                videoUrl: false,
                yearOfRelease: false,
                description:false,
                detailsUrl:false,
                languages:false,
                country:false,
                rating:false
            }
        });
    };

    onChangeHandler = e => {
        this.validateInput(e);
    };

    validateInput = e => {
        const inputName = e.target.name;
        const inputValue = e.target.value;
        const formData = {...this.state.formData};
        const formDataValid = {...this.state.formDataValid};
        const inputElement = document.getElementById(inputName);
        if (inputValue.toString().trim().length > 0) {
            formDataValid[inputName] = true;
            inputElement.classList.remove("is-invalid");
        } else {
            formDataValid[inputName] = false;
            inputElement.classList.add("is-invalid");
        }
        formData[inputName] = inputValue;

        this.setState({
            formData: formData,
            formDataValid: formDataValid
        });
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
            const movieData = {
                movieLength: e.target.movieLength.value,
                imageUrl: e.target.imageUrl.value,
                title: e.target.title.value,
                videoUrl: e.target.videoUrl.value,
                yearOfRelease: e.target.yearOfRelease.value,
                detailsUrl: e.target.detailsUrl.value,
                description: e.target.description.value,
                languages: e.target.languages.value.split(","),
                country:e.target.country.value,
                writers: [...e.target.writers.options].filter(w => w.selected).map(w => w.value),
                directors: [...e.target.directors.options].filter(d => d.selected).map(d => d.value),
                stars: [...e.target.stars.options].filter(s => s.selected).map(s => s.value),
                genres: [...e.target.genres.options].filter(g => g.selected).map(g => g.value),
                rating: e.target.rating.value
            };
            this.createMovie(movieData);
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

    createMovie = (formData) => {
        MovieService.createMovie(formData).then(response => {
            this.props.history.push("/movies");
        });
    };


    render() {
        return (
            <div className="movieAdd row w-100 my-4">
                <div className="col-9 mx-auto my-4">
                    <div className="my-auto card cardAdd px-3 bg-customcolor">
                        <form className="p-4" onSubmit={this.onFormSubmitHandler}>
                            <div className="row">
                                <h1 className="textRed ml-3 my-0">Add movie</h1>
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
                               onChange={this.onChangeHandler}/>
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
                           onChange={this.onChangeHandler}/>
                </div>
            </div>
        );
    };

    getValueOptions = () => {
        if (this.state.allCast !== null) {
            return this.state.allCast.map((staffMember, index) => <option key={staffMember.id}
                                                                   value={staffMember.id}>{staffMember.name}</option>)
        }
    };

    getGenresValueOptions = () =>{
        if (this.state.allGenres !== null) {
            return this.state.allGenres.map((genre, index) => <option key={genre.id}
                                                                          value={genre.id}>{genre.name}</option>)
        }
    };

    getSelectWriters = () => {
        if (this.state.defaultCast !== null) {
            return (
                <div className="form-group">
                    <div className="row mb-3">
                        <div className="col-3 text-right text-white">
                            <label><b>Writers</b></label>
                        </div>
                        <div className="col-9">
                            <select className="form-control" id="writers" name="writers"
                                    defaultValue={[this.state.defaultCast.id]} multiple>
                                {this.getValueOptions()}
                            </select>
                        </div>
                    </div>
                </div>
            )
        }
    };

    getSelectDirectors = () => {
        if (this.state.defaultCast !== null) {
            return (
                <div className="form-group">
                    <div className="row mb-3">
                        <div className="col-3 text-right text-white">
                            <label><b>Directors</b></label>
                        </div>
                        <div className="col-9">
                            <select className="form-control" id="directors" name="directors"
                                    defaultValue={[this.state.defaultCast.id]} multiple>
                                {this.getValueOptions()}
                            </select>
                        </div>
                    </div>
                </div>
            )
        }
    };

    getSelectStars = () => {
        if (this.state.defaultCast !== null) {
            return (
                <div className="form-group">
                    <div className="row mb-3">
                        <div className="col-3 text-right text-white">
                            <label><b>Stars</b></label>
                        </div>
                        <div className="col-9">
                            <select className="form-control" id="stars" name="stars"
                                    defaultValue={[this.state.defaultCast.id]} multiple>
                                {this.getValueOptions()}
                            </select>
                        </div>
                    </div>
                </div>
            )
        }
    };

    getSelectGenres = () => {
        if (this.state.defaultGenre !== null) {
            return (
                <div className="form-group">
                    <div className="row mb-3">
                        <div className="col-3 text-right text-white">
                            <label><b>Genres</b></label>
                        </div>
                        <div className="col-9">
                            <select className="form-control" id="genres" name="genres"
                                    defaultValue={[this.state.defaultGenre.id]} multiple>
                                {this.getGenresValueOptions()}
                            </select>
                        </div>
                    </div>
                </div>
            )
        }
    };

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
                               onChange={this.onChangeHandler}
                        />
                    </div>
                </div>
            </div>
        )
    };
}

export default withRouter(MovieAdd);