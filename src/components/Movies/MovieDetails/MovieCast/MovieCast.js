import React from "react";
import user_image from "../../../../images/user_image.png";

const MovieStaff = (props) => {

    const getWriter = () => {
        if(props.writers!==undefined) {
            return props.writers.map(writer => {
                return (
                    <div key={writer.id} className="mb-2">
                        <img className="rounded-pill shadow-sm" width="45px"
                             height="45px"
                             src={writer.imageUrl===null ? user_image : writer.imageUrl} alt=""/>
                        <span className="ml-2 text-white">{writer.name}</span>
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
                        <img src={director.imageUrl===null ? user_image : director.imageUrl}  className="rounded-pill shadow-sm" width="45px"
                             height="45px" alt=""/>
                        <span className="ml-2 text-white">{director.name}</span>
                    </div>
                )
            });
        }
    };

    const getStars = () => {
        if(props.stars!==undefined) {
            return props.stars.map(star => {
                return (
                    <div key={star.id} className="mb-2">
                        <img src={star.imageUrl===null ? user_image : star.imageUrl}  className="rounded-pill shadow-sm" width="45px"
                             height="45px" alt=""/>
                        <span className="ml-2 text-white">{star.name}</span>
                    </div>
                )
            });
        }
    };

    return(
        <div className="col-sm-12 col-md-3">
            <div id="accordion" className="mb-3">
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