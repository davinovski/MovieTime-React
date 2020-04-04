import React, {Component} from 'react';
import ReactPaginate from "react-paginate";
import CastService from "../../axios/CastService";
import CastTable from "./CastTable";
import Modal from "../UI/Modal/Modal";
import ModalDelete from "../UI/ModalDelete/ModalDelete";
import DeleteElement from "../UI/DeleteElement/DeleteElement";
import CastAdd from "./CastAdd/CastAdd";

class Cast extends Component {

    constructor(props) {
        super(props);
        this.state = {
            PageNumber: 1,
            PageSize: 10,
            TotalPages: 0,
            TotalRecords: 0,
            Results: [],
            QueryParams: new URLSearchParams(),
            addingCast: false,
            deleteCastId: null,
            delCast: false,
            updateCast: false,
            updateCastId: null
        };
    }

    componentDidMount() {
        this.loadCast();
    }


    loadCast = () => {
        CastService.getAllStars().then(resp => {
            console.log(resp.data);
            this.setState({
                Results: resp.data
            });
        });
    };

    addCastHandler = () => {

        this.setState({addingCast: true})

    };

    addCastCancelHandler = () => {
        this.setState({
            updateCast: false,
            addingCast: false
        })

    };

    addCast = (newCast) => {

        this.setState({
            updateCast: false,
            PageNumber: 1
        }, () => this.loadCast());

    };

    deleteCastCancelHandler = () => {
        this.setState({delCast: false})
    };

    deleteCast = (castId) => {

        this.setState({
            delCast: true,
            deleteCastId: castId
        });

    };

    deleteCastExecution = (castId) => {

        CastService.deleteCast(castId).then(resp => {
            if (this.state.PageNumber === this.state.TotalPages) {
                if (this.state.Results.length === 1) {
                    this.setState(prevState => {
                        const newPageNumber = prevState.PageNumber - 1;
                        return {
                            PageNumber: Math.max(newPageNumber, 0)
                        };
                    }, () => this.loadCast());
                } else {
                    this.setState(prevState => {
                        const newCastsRef = prevState.Results.filter(cast => cast.id !== castId);
                        return {Results: newCastsRef};
                    });
                }
            } else {
                this.loadCast();
            }
        });

        this.setState({delCast: false});

    };

    removeValidation = () => {
        document.getElementById("name").classList.remove("is-invalid");
        document.getElementById("dateOfBirth").classList.remove("is-invalid");
        document.getElementById("placeOfBirth").classList.remove("is-invalid");
        document.getElementById("imageUrl").classList.remove("is-invalid");
        document.getElementById("bio").classList.remove("is-invalid");
    };

    updateCast = (castId) => {

        CastService.getPerson(castId).then(resp => {

            this.setState({
                updateCast: true,
                addingCast: true,
                updateCastId: castId
            });

            this.setCastData(resp.data);

        });

    };

    setCastData = (data) => {

        document.getElementById("name").value = data.name;
        document.getElementById("dateOfBirth").value = data.dateOfBirth.substring(0,10);
        document.getElementById("placeOfBirth").value = data.placeOfBirth;
        document.getElementById("imageUrl").value = data.imageUrl;
        document.getElementById("bio").value = data.bio;

    };

    updateNewData = (newData) => {

        this.setState((prevState) => {
            const newCastsRef = prevState.Results.map((item) => {
                if (item.id === newData.id) {
                    return newData;
                }
                return item;
            });

            return{"Results": newCastsRef}
        })

    };

    scrollToTop = () => window.scrollTo(0, 0);

    handlePageChange = (event) => {
        let newPageNumber = event.selected + 1;
        this.setState({
            PageNumber: newPageNumber
        }, () => {
            this.loadCast();
            this.scrollToTop();
        });
    };


    mainContent = () => {
            return (
                <div>
                    <div style={{minHeight: 300}}>
                        <CastTable data={this.state.Results}
                                    deleteCastHandle={this.deleteCast}
                                    updateCast={this.updateCast}
                                    removeValidation={this.removeValidation}/>
                    </div>

                    {this.pagination()}
                </div>
            );
    };

    pagination = () => {
        return (
            <ReactPaginate previousLabel={<span className="fa fa-angle-double-left"/>}
                           nextLabel={<span className="fa fa-angle-double-right"/>}
                           breakLabel={<span className="gap">...</span>}
                           breakClassName={"break-me"}
                           pageCount={this.state.TotalPages}
                           marginPagesDisplayed={2}
                           pageRangeDisplayed={5}
                           pageClassName={"page-item"}
                           pageLinkClassName={"page-link"}
                           previousClassName={"page-item"}
                           nextClassName={"page-item"}
                           previousLinkClassName={"page-link"}
                           nextLinkClassName={"page-link"}
                           forcePage={this.state.PageNumber - 1}
                           onPageChange={this.handlePageChange}
                           containerClassName={"pagination justify-content-center"}
                           activeClassName={"active"}
            />
        );
    };

    render() {
        return (
            <div className="container my-4">
                <h1 className="text-white">Manage cast</h1>
                <hr/>

                <Modal show={this.state.addingCast}>
                    <CastAdd addingCast={this.addCast}
                              updateNewData={this.updateNewData}
                              updateCastId={this.state.updateCastId}
                              updateCast={this.state.updateCast}
                              modalClosed={this.addCastCancelHandler}/>
                </Modal>

                <ModalDelete show={this.state.delCast}>

                    <DeleteElement modalClosed={this.deleteCastCancelHandler}
                                   title={this.state.Results.map((item) => {
                                       if (item.id === this.state.deleteCastId) {
                                           return item.name;
                                       }
                                   })}
                                   whatToDelete={"cast"}
                                   deleteCast={this.deleteCastExecution}
                                   deletedId={this.state.deleteCastId}/>

                </ModalDelete>

                <div className="row">
                    <div className="col-3 mb-3">
                        <button onClick={this.addCastHandler} className="btn btn-outline-primary btn-lg">
                            <span className="fa fa-plus"/>&nbsp;Add New
                        </button>
                    </div>
                </div>
                {this.mainContent()}
            </div>
        );
    }
}

export default Cast;