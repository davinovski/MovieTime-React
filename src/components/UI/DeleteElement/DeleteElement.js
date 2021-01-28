import React, {Component} from 'react';
import './DeleteElement.css';

class DeleteElement extends Component {

    deleteElement = () => {

        const whatToDelete = this.props.whatToDelete;

        if(whatToDelete === "cast" ){
            this.props.deleteCast(this.props.deletedId);
        } else {
            this.props.deleteMovie(this.props.deletedId);
        }

    };

    render() {

        return (

            <div className="card bg-dark text-white">
                <div className="card-header text-center bg-dark text-danger deleteHeader text-uppercase" style={{
                }}>
                    <b className="text-white">Confirm</b>
                </div>
                <div className="card-body text-center bg-customcolor">
                    <p className="card-text">Are you sure you want to delete <b>{this.props.title}</b>?</p>
                </div>
                <div className="card-footer text-white bg-customcolor">
                    <div className="row">
                        <div className="col">

                            <button onClick={this.props.modalClosed}
                                    className="btn btn-outline-success w-100">
                                    <i className="fa fa-times"/> Cancel</button>
                        </div>

                        <div className="col">
                            <button onClick={this.deleteElement}
                                    className="btn btn-outline-custom-color w-100">
                                    <i className="fa fa-trash"/> Delete</button>
                        </div>
                    </div>
                </div>
            </div>

        );

    }
}

export default DeleteElement;