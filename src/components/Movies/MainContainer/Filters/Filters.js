import React, {Component} from "react"
import "./Filters.css"
import GenresService from "../../../../axios/GenresService";

class Filters extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allGenres:[]
        }
    }
    componentDidMount(){
        GenresService.getGenres().then(resp=>{
            this.setState({
                allGenres:resp.data
            })
        })
    }

    filtersTitle = () => {
        return (
            <article className="card-group-item mb-3">
                <header className="card-header border-white">
                    <h4 className="title"><i className="fa fa-filter textRed"/> Filters</h4>
                </header>
            </article>
        );
    };

    getAllGenres = () =>{
      return this.state.allGenres.map(genre=>{
          return(
              <div className="row" key={genre.id}>
                  <div className="col">
                      <div className="cs-control cs-checkbox pl-4">
                          <input type="checkbox" onChange={this.changeCheckboxHandler} className="cs-control-input"
                                 id={genre.id} name="genres"
                                 value={genre.id}/>
                          <label className="cs-control-label" htmlFor={genre.id}>{genre.name}</label>
                      </div>
                  </div>
              </div>
          )
      })
    };

    filtersGenre = () => {
        return (
            <article className="card-group-item mb-3">
                <div className="filter-content">
                    <div className="card-body py-1">
                        <h6 className="title">Genre</h6>
                        {this.getAllGenres()}
                    </div>
                </div>
            </article>
        );
    };

    changeCheckboxHandler = (e) => {
        const propName = e.target.name;
        this.props.changeFilters(propName, [...document.getElementsByName(propName)]);
    };

    render() {
        return (
            <div className="Filters">
                <div className="card shadow-sm">
                    {this.filtersTitle()}
                    {this.filtersGenre()}
                </div>
            </div>
        );
    };
}

export default Filters;