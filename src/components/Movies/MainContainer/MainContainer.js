import React, {Component} from "react"
import Filters from "../Filters/Filters";
import FormSearch from "../FormSearch/FormSearch";
import CardItem from "../CardItem/CardItem";
import MovieService from "../../../axios/axiosRepository";
import ListItem from "../ListItem/ListItem";

class MainContainer extends Component{
    constructor(props){
        super(props);
        this.state={
            Results:[],
            CardView: true,

        }
    }
    componentDidMount() {
        this.loadMovies();
    }
    loadMovies = () =>{
        MovieService.fetchMovies().then(resp=>{
            console.log(resp);
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
        if(this.state.CardView) {
            return (
                <div className="card-deck w-100" style={{minHeight: "500px"}}>
                    {this.state.Results.map(movie => <CardItem key={movie.id} movie={movie}/>)}
                </div>
            );
        }
        else{
            return (
                <div className="col-12" style={{minHeight: "500px"}}>
                    {this.state.Results.map(movie => <ListItem key={movie.id} movie={movie}/>)}
                </div>
            );
        }
    };

    render() {
        return (
            <div className="MainContainer">

                <div className="my-4 container">
                    <div className="row">
                        <div className="col-3 mediaCss">
                            <Filters/>
                        </div>

                        <div className="col-9">
                            <FormSearch
                                setCardView={this.setCardView}
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