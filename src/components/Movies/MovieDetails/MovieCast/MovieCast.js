import React, {useState} from "react";
import user_image from "../../../../images/user_image.png";
import {Link} from "react-router-dom";

const MovieStaff = (props) => {


    const [watched,setWatched]=useState(false);
    const [favourite,setFavourite]=useState(false);

    React.useEffect(() => {
        setFavourite(props.favorite);
        setWatched(props.watched);
    }, [props.favorite, props.watched]);

    const getWriter = () => {
        if(props.writers!==undefined) {
            return props.writers.map(writer => {
                return (
                    <div key={writer.id} className="mb-2">
                        <Link to={`/person/${writer.id}`} style={{textDecoration: 'none', color: 'black'}}>
                        <img className="rounded-pill shadow-sm borderPill" width="55px"
                             height="55px" data-toggle="tooltip" data-placement="top" title={writer.name}
                             src={writer.imageUrl===null ? user_image : writer.imageUrl} alt={writer.name}/>
                        <span className="ml-2 text-white">{writer.name}</span>
                        </Link>
                    </div>
                )
            })
        }
    };

    const getDirectors = () => {
        if(props.directors!==undefined) {
            return props.directors.map(director => {
                return (
                    <div key={director.id} className="mb-2">
                        <Link to={`/person/${director.id}`} style={{textDecoration: 'none', color: 'black'}}>
                        <img src={director.imageUrl===null ? user_image : director.imageUrl}  className="rounded-pill shadow-sm borderPill" width="55px"
                             height="55px" alt={director.name} data-toggle="tooltip" data-placement="top" title={director.name}/>
                        <span className="ml-2 text-white">{director.name}</span>
                        </Link>
                    </div>
                )
            });
        }
    };

    const getStars = () => {
        if(props.stars!==undefined) {
            return props.stars.map(star => {
                return (
                    <Link to={`/person/${star.id}`} style={{textDecoration: 'none', color: 'black'}}>
                        <img src={star.imageUrl===null ? user_image : star.imageUrl}  className="rounded-pill shadow-sm borderPill mr-3 mb-3" width="55px"
                             height="55px" alt={star.name} data-bs-toggle="tooltip" data-bs-placement="top" title={star.name}/>
                    </Link>
                )
            });
        }
    };

    const addToFavourites = () => {
        props.addToFav(props.movieid);
    };

    const addToWatched = () => {
        props.addToWatched(props.movieid);
    };

    return(
        <div className="col-sm-12 col-md-3">
            <div id="accordion" className="mb-3">
                <div className="card shadow-sm bg-customcolor">
                    <div className="card-header">
                        <div className="row">
                            <div className="col-2 offset-7">
                                <button onClick={addToFavourites} className={"btn " + (favourite ? 'btn-custom-color' : 'btn-outline-custom-color')}><span className="h4"><i className={"fa " + (favourite? 'fa-heart' : 'fa-heart-o')}/></span></button>
                            </div>
                            <div className="col-2">
                                <button onClick={addToWatched} className={"btn " + (watched ? 'btn-success' : 'btn-outline-success')}><span className="h4"><i className="fa fa-check-circle"/></span></button>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="card shadow-sm bg-customcolor">
                    <div className="card-header accordionCard" id="headingOne" data-toggle="collapse"
                         data-target="#collapseOne" aria-expanded="true"
                         aria-controls="collapseOne">
                        <h5 className="mb-0 text-white" ><i className="fa fa-pencil textRed "/>
                            <b> Writers</b></h5>
                    </div>

                    <div id="collapseOne" className="collapse" aria-labelledby="headingOne">
                        <div className="card-body bgCustomBackground">
                            {getWriter()}
                        </div>
                    </div>
                </div>
                <div className="card shadow-sm bg-customcolor">
                    <div className="card-header accordionCard" id="headingTwo" data-toggle="collapse"
                         data-target="#collapseTwo" aria-expanded="true"
                         aria-controls="collapseTwo">
                        <h5 className="mb-0 text-white" style={{marginLeft: "2px"}}><i className="fa fa-user textRed" style={{marginRight: "2px"}}/> <b>Directors</b></h5>
                    </div>

                    <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo">
                        <div className="card-body professors bgCustomBackground">
                            {getDirectors()}
                        </div>
                    </div>
                </div>
                <div className="card shadow-sm bg-customcolor">
                    <div className="card-header accordionCard" id="headingThree" data-toggle="collapse"
                         data-target="#collapseThree" aria-expanded="true"
                         aria-controls="collapseThree">
                        <h5 className="mb-0 text-white" style={{marginLeft: "2px"}}><i className="fa fa-star textRed" style={{marginRight: "2px"}}/> <b>Starring</b></h5>
                    </div>

                    <div id="collapseThree" className="collapse" aria-labelledby="headingThree"
                    >
                        <div className="card-body bgCustomBackground">
                            {getStars()}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};
export default MovieStaff;