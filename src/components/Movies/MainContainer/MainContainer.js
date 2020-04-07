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
            totalPages:0

        }
    }
    componentDidMount() {
        this.loadMovies();
    }

    loadMovies = () =>{
        MovieService.fetchMovies(this.state.pageNumber, this.state.pageSize, this.state.QueryParams).then(resp=>{
            this.setState(resp.data);
        })
    };

    setCardView = (cardView) => {
        if (cardView !== this.state.CardView) {
            this.setState({CardView: cardView});
        }
    };

    showMovies = () =>{
        if(this.state.totalElements!==0) {
            if (this.state.CardView) {
                return (
                    <div className="card-deck w-100" style={{minHeight: "500px"}}>
                        {this.state.content.map(movie => <CardItem key={movie.id} movie={movie}/>)}
                    </div>
                );
            } else {
                return (
                    <div className="col-12" style={{minHeight: "500px"}}>
                        {this.state.content.map(movie => <ListItem key={movie.id} movie={movie}/>)}
                    </div>
                );
            }
            return (
                <div className="text-center mx-auto mt-5" style={{minHeight: 400}}>
                    <h1 className="text-muted" style={{fontSize: "80px"}}><i className="fa fa-frown-o"/></h1>
                    <h5 className="text-muted"><i className="fa fa-sm"/>We're sorry! We couldn't find anything.</h5>
                </div>
            );
        }
        else{
            return (
                <div className="text-center mx-auto mt-5" style={{minHeight: 400}}>
                    <h1 className="text-muted" style={{fontSize: "80px"}}><i className="fa fa-frown-o"/></h1>
                    <h5 className="text-muted"><i className="fa fa-sm"/>We couldn't find anything. Please try again filtering.</h5>
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
        }, () => this.loadMovies());
    };

    changeOrderAttribute = (e) =>{
        this.state.QueryParams.delete("orderBy");
        const Attribute=e.target.value;
        this.state.QueryParams.append("orderBy", Attribute);
        this.setState({
            orderByAttribute:Attribute
        },()=>this.loadMovies());
    };

    pagination = () => {
        if (this.state.totalElements > 0) {
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
                               forcePage={this.state.PageNumber - 1}
                               onPageChange={this.changePageHandler}
                               containerClassName={"pagination justify-content-center"}
                               activeClassName={"active"}
                />
            );
        }
        return null;
    };

    searchMoviesHandler = (event) => {
        event.preventDefault();
        const searchTerm = event.target["term"].value;
        this.state.QueryParams.set("searchTerm", searchTerm);
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