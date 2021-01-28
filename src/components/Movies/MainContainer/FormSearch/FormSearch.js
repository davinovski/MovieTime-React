import React from "react";
import "./FormSearch.css"

const FormSearch = (props) => {

    const changeToCardViewHandler = (e) => {
        document.getElementById("list-view").classList.remove("active");
        document.getElementById("card-view").classList.add("active");
        props.setCardView(true);
    };

    const changeToListViewHandler = (e) => {
        document.getElementById("list-view").classList.add("active");
        document.getElementById("card-view").classList.remove("active");
        props.setCardView(false);
    };

    const toggleFavButton = (e) => {
        const btn = document.getElementById("fav-button");
        btn.classList.toggle("active");
        props.toggleFavourites();
    };

    return (
        <div className="row mb-4">

            <div className="col-md-7 pl-0">
                <form className="FormSearch w-100" onSubmit={props.onSearch}>
                    <div className="p-1 shadow-sm my-0">
                        <div className="input-group bg-dark">
                            <input type="search" placeholder="Search for a movie..."
                                   aria-describedby="button-addon1"
                                   className="form-control border-0 bg-customcolor"
                                   name="term"
                                   id="search-input"/>
                            <div className="input-group-append">
                                <button id="button-addon1" type="submit" className="btn btn-dark bg-customcolor"
                                        title="Search"><i className="fa fa-search textRed"/></button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            <div className="col-md-2 pt-1">
                    <select className="form-control bg-customcolor rounded-pill text-muted border-dark" onChange={props.setOrderBy}
                    defaultValue={props.orderByAtt}>
                        <option value="title">Title</option>
                        <option value="rating">Rating</option>
                        <option value="yearOfRelease">Year</option>
                    </select>
            </div>

            <div className="col-md-2 text-right pt-1">
                <div
                    className="btn-group d-inline-block rounded rounded-pill shadow-sm bg-customcolor d-flex justify-content-center"
                    role="group">
                    <button type="button" className="btn bg-customcolor rounded-pill py-2 view-type active"
                            onClick={changeToCardViewHandler} id="card-view">
                        <i className="fa fa-th textRed"/>
                    </button>
                    <button type="button" className="btn bg-customcolor rounded-pill py-2 view-type"
                            onClick={changeToListViewHandler} id="list-view">
                        <i className="fa fa-list textRed"/>
                    </button>
                </div>
            </div>

            <div className="col-md-1 pt-1">
                <button id="fav-button" onClick={toggleFavButton} className="btn btn-outline-light shadow-sm w-100 py-2">
                    <span className="fa fa-heart textRed"/>
                </button>
            </div>
        </div>
    );
};

export default FormSearch;