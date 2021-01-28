import React, {Component} from "react";
import "../MostWatchedMovies/MostWatchedMovies.css";
import MovieDbService from "../../../../axios/MovieDbService";
import CardItem from "../CardItems/CardItemWatched"
import { MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardImage,
    MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn } from "mdbreact";

class UpcomingMovies extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        MovieDbService.getGenres().then(data => {
            console.log(data.data);
            this.setState(data.data);
        });


    }


    showMovies = () => {
        if (this.state.results !== undefined) {
                        return this.state.results.map(movie => {
                            return <CardItem key={movie.id}
                                             movie={movie}/>
                        });

        }
    }

    render() {
        return (
            <div>
                <h4 className="redLeftBorder">
                    Latest
                </h4>
                <div className="text-muted mb-2">
                    Latest and upcoming releases
                </div>
                <div className="row" style={{paddingBottom:'18px',paddingLeft:'5px', paddingRight:'18px' }}>
                {this.showMovies()}
                </div>
            </div>

        );
    }
}
export default UpcomingMovies;