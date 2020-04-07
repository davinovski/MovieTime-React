import React, {Component} from "react";
import MoviesService from "../../../axios/MovieService";
import MoviesTable from "./MoviesTable";
import ReactPaginate from 'react-paginate';
import {Link} from "react-router-dom";
import ModalDelete from "../../UI/ModalDelete/ModalDelete";
import DeleteElement from "../../UI/DeleteElement/DeleteElement"

class AdminMovies extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pageNumber: 1,
            pageSize: 10,
            totalPages: 0,
            totalElements: 0,
            content: [],
            QueryParams: new URLSearchParams(),
            deletedMovieId:null,
            delMovie: false
        };
    }

    componentDidMount() {
        this.loadMovies();
    }

    deleteMovieCancelHandler = () => {
        this.setState({delMovie:false})
    };

    scrollToTop = () => window.scrollTo(0, 0);

    loadMovies = () => {
        MoviesService.fetchMovies(this.state.pageNumber, this.state.pageSize, this.state.QueryParams).then(resp => {
            console.log(resp.data);
            this.setState(resp.data);
        });
    };

    handlePageChange = (event) => {
        let newPageNumber = event.selected + 1;
        this.setState({
            pageNumber: newPageNumber
        }, () => {
            this.loadMovies();
            this.scrollToTop();
        });
    };

    handleSearchMovies = (event) => {
        event.preventDefault();
        const term = event.target["term"].value;
        this.state.QueryParams.set("searchTerm", term);
        this.setState({
            pageNumber: 1
        });
        this.loadMovies();
    };

    deleteMovie = (MovieId) => {

        this.setState({
            delMovie:true,
            deletedMovieId:MovieId
        });

    };

    deleteMovieExecution = (MovieId) => {

        MoviesService.deleteMovie(MovieId).then(resp => {
            if (this.state.pageNumber === this.state.totalPages) {
                if (this.state.content.length === 1) {
                    this.setState(prevState => {
                        const newpageNumber = prevState.pageNumber - 1;
                        return {
                            pageNumber: Math.max(newpageNumber, 0)
                        };
                    }, () => this.loadMovies());
                } else {
                    this.setState(prevState => {
                        const newMoviesRef = prevState.content.filter(Movie => Movie.id !== MovieId);
                        return {content: newMoviesRef};
                    });
                }
            } else {
                this.loadMovies();
            }
        });

        this.setState({delMovie:false});

    };



    searchForm = () => {
        return (
            <form className="mb-4 p-0 bg-dark" onSubmit={this.handleSearchMovies}>
                <div className="p-1 bg-dark shadow-sm my-0" style={{padding: "0"}}>
                    <div className="input-group">
                        <input type="search" placeholder="Search by movie title"
                               aria-describedby="button-addon1"
                               className="form-control border-0 bg-dark text-white"
                               name="term"
                               id="search-input"/>
                        <div className="input-group-append">
                            <button id="button-addon1" type="submit" className="btn btn-dark text-primary"
                                    title="Search"><i className="fa fa-search"/></button>
                        </div>
                    </div>
                </div>
            </form>
        );
    };

    mainContent = () => {
        if (this.state.totalElements > 0) {
            return (
                <div>

                    <div style={{minHeight: 300}}>
                        <MoviesTable data={this.state.content}
                                      deleteMovieHandle={this.deleteMovie}/>
                    </div>

                    {this.pagination()}
                </div>
            );
        }
        return (
            <div className="text-center mx-auto mt-5" style={{minHeight: 400}}>
                <h1 className="text-muted" style={{fontSize : "80px"}}><i className="fa fa-frown-o"/></h1>
                <h5 className="text-muted"><i className="fa fa-sm"/>We're sorry! We couldn't find anything.</h5>
            </div>
        );
    };

    pagination = () => {
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
                           onPageChange={this.handlePageChange}
                           containerClassName={"pagination justify-content-center"}
                           activeClassName={"active"}
            />
        );
    };

    render() {
        return (
            <div className="container my-4">
                <h1 className="text-white">Manage movies</h1>
                <hr/>
                <ModalDelete show={this.state.delMovie}>

                    <DeleteElement modalClosed={this.deleteMovieCancelHandler}
                                   title={this.state.content.map((item) => {
                                       if(item.id === this.state.deletedMovieId){
                                           return item.title
                                       }
                                   })}
                                   whatToDelete={"movie "}
                                   deleteMovie={this.deleteMovieExecution}
                                   deletedId={this.state.deletedMovieId}/>

                </ModalDelete>

                <div className="row">
                    <div className="col-3">
                        <Link to='/admin/movies/add' className="btn btn-outline-primary btn-lg">
                            <span className="fa fa-plus"/>&nbsp; Add Movie
                        </Link>
                    </div>
                    <div className="col-5 offset-4 text-right">
                        {this.searchForm()}
                    </div>
                </div>

                {this.mainContent()}
            </div>
        );
    }
}

export default AdminMovies;