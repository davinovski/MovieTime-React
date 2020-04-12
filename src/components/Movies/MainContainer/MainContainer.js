import React, {Component} from "react"
import Filters from "./Filters/Filters";
import FormSearch from "./FormSearch/FormSearch";
import CardItem from "./CardItem/CardItem";
import MovieService from "../../../axios/MovieService";
import ListItem from "./ListItem/ListItem";
import ReactPaginate from "react-paginate";

class MainContainer extends Component{
    constructor(props){
        super(props);
        this.state={
            CardView: true,
            QueryParams: new URLSearchParams(),
            pageNumber:1,
            pageSize:12,
            orderByAttribute:"title",
            totalElements:0,
            totalPages:0,
            favouriteIds: [],
            fav: false
        }
    }
    componentDidMount() {
        const userData = JSON.parse(localStorage.getItem("userData"));
        this.setState({
            favouriteIds: userData.favoritesIds
        }, () => this.loadMovies());
    }

    loadMovies = () =>{
        MovieService.fetchMovies(this.state.pageNumber, this.state.pageSize, this.state.QueryParams).then(resp=>{
            console.log(resp.data);
            this.setState(resp.data);
        })
    };

    setCardView = (cardView) => {
        if (cardView !== this.state.CardView) {
            this.setState({
                CardView: cardView
            });
        }
    };

    toggleFavouriteCourse = (movieId) => {
        MovieService.toggleFavourites(movieId).then(resp => {
            localStorage.removeItem("userData");
            localStorage.setItem("userData", JSON.stringify(resp.data));
            this.setState( {
                favouriteIds: resp.data.favoritesIds
            });
        });
    };

    toggleFavouritesHandler = () => {
        this.setState({
           fav: !this.state.fav
        });
        if(this.state.fav===false){
            MovieService.getAllMovies().then(resp=>{
                const movies = resp.data.filter(m => this.state.favouriteIds.includes(m.id));
                this.setState({
                    content: movies
                });
            })

        }
        else{
            this.loadMovies();
        }
    };

    showMovies = () => {
        if (this.state.totalElements !== 0) {
            if (this.state.CardView) {
                return (
                    <div className="card-deck w-100" style={{minHeight: "500px"}}>
                        {this.state.content.map(movie => <CardItem toggleStar={this.toggleFavouriteCourse} favourites={this.state.favouriteIds} key={movie.id} movie={movie}/>)}
                    </div>
                );
            } else {
                return (
                    <div className="col-12" style={{minHeight: "500px"}}>
                        {this.state.content.map(movie => <ListItem toggleStar={this.toggleFavouriteCourse} favourites={this.state.favouriteIds} key={movie.id} movie={movie}/>)}
                    </div>
                );
            }
        } else {
            return (
                <div className="text-center mx-auto mt-5" style={{minHeight: 400}}>
                    <h1 className="text-muted" style={{fontSize: "80px"}}><i className="fa fa-frown-o"/></h1>
                    <h5 className="text-muted"><i className="fa fa-sm"/>We couldn't find anything. Please try again
                        filtering.</h5>
                </div>
            );
        }
    };

    changePageHandler = (event) => {
        let newPageNumber = event.selected + 1;
        this.setState({
            pageNumber: newPageNumber
        }, () => {
            this.loadMovies();
            this.scrollToTop();
        });
    };

    changeFilterHandler = (propName, inputElementsList) =>{
        this.state.QueryParams.delete(propName);
        inputElementsList
            .filter(cb => cb.checked)
            .map(cb => cb.value)
            .forEach(val => this.state.QueryParams.append(propName, val));
        this.setState({
            PageNumber: 1
        });
        this.loadMovies();
    };

    changeOrderAttribute = (e) =>{
        this.state.QueryParams.delete("orderBy");
        const Attribute=e.target.value;
        this.state.QueryParams.append("orderBy", Attribute);
        this.setState({
            orderByAttribute:Attribute,
            fav:false
        });
        this.loadMovies();
    };

    pagination = () => {
        if (this.state.totalElements > 0) {
            if (this.state.fav === false) {
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
            return null;
        }
    };

    searchMoviesHandler = (event) => {
        event.preventDefault();
        const searchTerm = event.target["term"].value;
        this.state.QueryParams.set("searchTerm", searchTerm);
        this.setState({
            fav:false
        });
        this.loadMovies();
    };

    render() {
        return (
            <div className="MainContainer">

                <div className="my-4 container">
                    <div className="row">
                        <div className="col-sm-12 col-md-3 mediaCss">
                            <Filters
                                changeFilters={this.changeFilterHandler}
                            />

                        </div>
                        <div className="col-sm-12 col-md-9">
                            <FormSearch
                                setCardView={this.setCardView}
                                setOrderBy={this.changeOrderAttribute}
                                onSearch={this.searchMoviesHandler}
                                toggleFavourites={this.toggleFavouritesHandler}
                                orderByAtt={this.state.orderByAttribute}
                            />

                            <div className="row">
                                {this.showMovies()}
                            </div>
                            {this.pagination()}
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}
export default MainContainer;