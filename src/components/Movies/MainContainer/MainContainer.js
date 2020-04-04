import React, {Component} from "react"
import Filters from "../Filters/Filters";
import FormSearch from "../FormSearch/FormSearch";
import CardItem from "../CardItem/CardItem";
import MovieService from "../../../axios/MovieService";
import ListItem from "../ListItem/ListItem";

class MainContainer extends Component{
    constructor(props){
        super(props);
        this.state={
            Results:[],
            CardView: true,
            QueryParams: new URLSearchParams(),
            pageNumber:1,
            pageSize:12,
            orderByAttribute:"title"

        }
    }
    componentDidMount() {
        this.loadMovies();
    }

    loadMovies = () =>{
        MovieService.fetchMovies(this.state.pageNumber, this.state.pageSize, this.state.QueryParams).then(resp=>{
            console.log(resp.data);
            this.setState({
                Results:resp.data
            });
        })
    };

    setCardView = (cardView) => {
        if (cardView !== this.state.CardView) {
            this.setState({CardView: cardView});
        }
    };

    showMovies = () =>{
        if(this.state.Results.length!==0) {
            if (this.state.CardView) {
                return (
                    <div className="card-deck w-100" style={{minHeight: "500px"}}>
                        {this.state.Results.map(movie => <CardItem key={movie.id} movie={movie}/>)}
                    </div>
                );
            } else {
                return (
                    <div className="col-12" style={{minHeight: "500px"}}>
                        {this.state.Results.map(movie => <ListItem key={movie.id} movie={movie}/>)}
                    </div>
                );
            }
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
        const newAtrribute=e.target.value;
        this.state.QueryParams.append("orderBy", newAtrribute);
        this.setState({
            orderByAttribute:newAtrribute
        },()=>this.loadMovies());
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
                                orderByAtt={this.state.orderByAttribute}
                            />

                            <div className="row">
                                {this.showMovies()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}
export default MainContainer;