import React from "react"
import "./Filters.css"

const Filters = (props) => {

    const filtersTitle = () => {
        return (
            <article className="card-group-item mb-3">
                <header className="card-header border-white">
                    <h4 className="title"><i className="fa fa-filter textRed"/> Filters</h4>
                </header>
            </article>
        );
    };

    const filtersGenre = () => {
        return (
            <article className="card-group-item mb-3">
                <div className="filter-content">
                    <div className="card-body py-1">
                        <h6 className="title">Genre</h6>


                        <div className="row">
                            <div className="col">
                                <div className="cs-control cs-checkbox pl-4">
                                    <input type="checkbox" onChange={changeCheckboxHandler} className="cs-control-input" id="action" name="genres"
                                           value="action"/>
                                    <label className="cs-control-label" htmlFor="action">Action</label>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <div className="cs-control cs-checkbox pl-4">
                                    <input type="checkbox" onChange={changeCheckboxHandler} className="cs-control-input" id="adventure" name="genres"
                                           value="adventure"/>
                                    <label className="cs-control-label" htmlFor="adventure">Adventure</label>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <div className="cs-control cs-checkbox pl-4">
                                    <input type="checkbox" onChange={changeCheckboxHandler} className="cs-control-input" id="animation" name="genres"
                                           value="animation"/>
                                    <label className="cs-control-label" htmlFor="animation">Animation</label>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <div className="cs-control cs-checkbox pl-4">
                                    <input type="checkbox" onChange={changeCheckboxHandler} className="cs-control-input" id="biography" name="genres"
                                           value="biography"/>
                                    <label className="cs-control-label" htmlFor="biography">Biography</label>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <div className="cs-control cs-checkbox pl-4">
                                    <input type="checkbox" onChange={changeCheckboxHandler} className="cs-control-input" id="comedy" name="genres"
                                           value="comedy"/>
                                    <label className="cs-control-label" htmlFor="comedy">Comedy</label>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <div className="cs-control cs-checkbox pl-4">
                                    <input type="checkbox" onChange={changeCheckboxHandler} className="cs-control-input" id="crime" name="genres"
                                           value="crime"/>
                                    <label className="cs-control-label" htmlFor="crime">Crime</label>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <div className="cs-control cs-checkbox pl-4">
                                    <input type="checkbox" onChange={changeCheckboxHandler} className="cs-control-input" id="documentary" name="genres"
                                           value="documentary"/>
                                    <label className="cs-control-label" htmlFor="documentary">Documentary</label>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <div className="cs-control cs-checkbox pl-4">
                                    <input type="checkbox" onChange={changeCheckboxHandler} className="cs-control-input" id="drama" name="genres"
                                           value="drama"/>
                                    <label className="cs-control-label" htmlFor="drama">Drama</label>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <div className="cs-control cs-checkbox pl-4">
                                    <input type="checkbox" onChange={changeCheckboxHandler} className="cs-control-input" id="history" name="genres"
                                           value="history"/>
                                    <label className="cs-control-label" htmlFor="history">History</label>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <div className="cs-control cs-checkbox pl-4">
                                    <input type="checkbox" onChange={changeCheckboxHandler} className="cs-control-input" id="horror" name="genres"
                                           value="horror"/>
                                    <label className="cs-control-label" htmlFor="horror">Horror</label>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <div className="cs-control cs-checkbox pl-4">
                                    <input type="checkbox" onChange={changeCheckboxHandler} className="cs-control-input" id="mystery" name="genres"
                                           value="mystery"/>
                                    <label className="cs-control-label" htmlFor="mystery">Mystery</label>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <div className="cs-control cs-checkbox pl-4">
                                    <input type="checkbox" onChange={changeCheckboxHandler} className="cs-control-input" id="romance" name="genres"
                                           value="romance"/>
                                    <label className="cs-control-label" htmlFor="romance">Romance</label>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <div className="cs-control cs-checkbox pl-4">
                                    <input type="checkbox" onChange={changeCheckboxHandler} className="cs-control-input" id="scienceFiction" name="genres"
                                           value="scienceFiction"/>
                                    <label className="cs-control-label" htmlFor="scienceFiction">Sci-fi</label>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <div className="cs-control cs-checkbox pl-4">
                                    <input type="checkbox" onChange={changeCheckboxHandler} className="cs-control-input" id="thriller" name="genres"
                                           value="thriller"/>
                                    <label className="cs-control-label" htmlFor="thriller">Thriller</label>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </article>
        );
    };

    const changeCheckboxHandler = (e) => {
        const propName = e.target.name;
        props.changeFilters(propName, [...document.getElementsByName(propName)]);
    };

    return (
        <div className="Filters">
            <div className="card shadow-sm">
                {filtersTitle()}
                {filtersGenre()}
            </div>
        </div>
    );
};

export default Filters;