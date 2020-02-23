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
                                    <input type="checkbox" className="cs-control-input" id="comedy" name="genre"
                                           value="comedy"/>
                                    <label className="cs-control-label" htmlFor="comedy">Comedy</label>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <div className="cs-control cs-checkbox pl-4">
                                    <input type="checkbox" className="cs-control-input" id="action" name="genre"
                                           value="action"/>
                                    <label className="cs-control-label" htmlFor="action">Action</label>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <div className="cs-control cs-checkbox pl-4">
                                    <input type="checkbox" className="cs-control-input" id="horror" name="genre"
                                           value="horror"/>
                                    <label className="cs-control-label" htmlFor="horror">Horror</label>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <div className="cs-control cs-checkbox pl-4">
                                    <input type="checkbox" className="cs-control-input" id="thriller" name="genre"
                                           value="thriller"/>
                                    <label className="cs-control-label" htmlFor="thriller">Thriller</label>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <div className="cs-control cs-checkbox pl-4">
                                    <input type="checkbox" className="cs-control-input" id="romance" name="genre"
                                           value="romance"/>
                                    <label className="cs-control-label" htmlFor="romance">Romance</label>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <div className="cs-control cs-checkbox pl-4">
                                    <input type="checkbox" className="cs-control-input" id="scienceFiction" name="genre"
                                           value="scienceFiction"/>
                                    <label className="cs-control-label" htmlFor="scienceFiction">Sci-fi</label>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <div className="cs-control cs-checkbox pl-4">
                                    <input type="checkbox" className="cs-control-input" id="adventure" name="genre"
                                           value="adventure"/>
                                    <label className="cs-control-label" htmlFor="adventure">Adventure</label>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <div className="cs-control cs-checkbox pl-4">
                                    <input type="checkbox" className="cs-control-input" id="documentary" name="genre"
                                           value="documentary"/>
                                    <label className="cs-control-label" htmlFor="documentary">Documentary</label>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <div className="cs-control cs-checkbox pl-4">
                                    <input type="checkbox" className="cs-control-input" id="animation" name="genre"
                                           value="animation"/>
                                    <label className="cs-control-label" htmlFor="animation">Animation</label>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </article>
        );
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