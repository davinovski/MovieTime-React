import React, {Component} from 'react';
import $ from 'jquery';
import CastService from "../../../axios/CastService";

class CastAdd extends Component {

    constructor(props) {
        super(props);
        this.state = {
            image: null,
            validation: {
                name: false,
                dateOfBirth: false,
                placeOfBirth: false,
                imageUrl: false,
                bio: false
            }
        };
    }

    componentDidMount() {
        //this.disableEnterKey();
    }

    disableEnterKey = () => {

        $(document).ready(function() {
            $(window).keydown(function(event){
                if(event.keyCode === 13) {
                    event.preventDefault();
                    return false;
                }
            });
        });

    };

    onSubmitHandle = (e) => {
        e.preventDefault();

        const isValid2 = document.getElementById("name").value !== "" &&
            document.getElementById("dateOfBirth").value !== "" &&
            document.getElementById("placeOfBirth").value !== "" &&
            document.getElementById("imageUrl").value !== "" &&
            document.getElementById("bio").value !== "";

        if (this.props.updateCast && isValid2) {

            const castData = {
                id: this.props.updateCastId,
                name: e.target.name.value,
                dateOfBirth: e.target.dateOfBirth.value,
                placeOfBirth: e.target.placeOfBirth.value,
                imageUrl: e.target.imageUrl.value,
                bio: e.target.bio.value
            };

            let flag = false;
            const newValidation = {...this.state.validation};

            Object.entries(castData).forEach(([key, value]) => {
                if (value === "") {
                    flag = true;
                    newValidation[key] = false;
                    document.getElementById(key).classList.add("is-invalid");
                }
            });

            if (!flag) {

                CastService.editPerson(this.props.updateCastId, castData).then(resp => {
                    const newData = resp.data;
                    this.props.updateNewData(newData);
                });

                this.props.modalClosed();
                document.getElementById("myForm").reset();

            }

            const newValidRef = {
                name: false,
                dateOfBirth: false,
                placeOfBirth: false,
                imageUrl: false,
                bio: false
            };

            this.setState({
                validation: newValidRef
            });


        } else {

            this.validateModal();

            const isValid3 = this.state.validation.placeOfBirth &&
                this.state.validation.name &&
                this.state.validation.dateOfBirth &&
                this.state.validation.imageUrl &&
                this.state.validation.bio;

            if (isValid3) {

                const castData = {
                    name: e.target.name.value,
                    dateOfBirth: e.target.dateOfBirth.value,
                    placeOfBirth: e.target.placeOfBirth.value,
                    imageUrl: e.target.imageUrl.value,
                    bio: e.target.bio.value
                };

                this.createCast(castData);

                this.props.modalClosed();
                document.getElementById("myForm").reset();

                const newValidRef = {
                    name: true,
                    dateOfBirth: true,
                    placeOfBirth: true,
                    imageUrl: true,
                    bio: true
                };

                this.setState({
                    validation: newValidRef
                });
                this.removeValidation();
            }
        }

    };


    validateModal = () => {

        if(document.getElementById("name").value === "")
            document.getElementById("name").classList.add("is-invalid");

        if(document.getElementById("dateOfBirth").value === "")
            document.getElementById("dateOfBirth").classList.add("is-invalid");

        if(document.getElementById("placeOfBirth").value === "")
            document.getElementById("placeOfBirth").classList.add("is-invalid");

        if(document.getElementById("imageUrl").value === "")
            document.getElementById("imageUrl").classList.add("is-invalid");

        if(document.getElementById("bio").value === "")
            document.getElementById("bio").classList.add("is-invalid");

    };

    createCast = (formData) => {
        CastService.addPerson(formData).then(response => {
            const newCast = response.data;

            this.props.addingCast(newCast);

        });
    };

    onCancelHandle = () => {

        this.removeValidation();
        this.props.modalClosed();
        document.getElementById("myForm").reset();
        this.setState({
            image: null
        });
    };

    onChangeHandle = (e) => {

        const inputName = e.target.name;
        const inputValue = e.target.value;
        const newValidation = {...this.state.validation};

        if (inputValue.toString().trim().length > 0) {
            document.getElementById(inputName).classList.remove("is-invalid");
            newValidation[inputName] = true;
        } else {
            document.getElementById(inputName).classList.add("is-invalid");
            newValidation[inputName] = false;
        }

        this.setState({
            validation: newValidation
        })

    };

    removeValidation = () => {

        const newValidRef = {
            name: false,
            dateOfBirth: false,
            placeOfBirth: false,
            imageUrl: false,
            bio:false
        };

        this.setState({
            validation: newValidRef
        });

        document.getElementById("name").classList.remove("is-invalid");
        document.getElementById("dateOfBirth").classList.remove("is-invalid");
        document.getElementById("placeOfBirth").classList.remove("is-invalid");
        document.getElementById("imageUrl").classList.remove("is-invalid");
        document.getElementById("bio").classList.remove("is-invalid");

    };

    render() {
        return (

            <form onSubmit={this.onSubmitHandle}
                  id="myForm" className="p-2 bg-light" >

                <h3>Add new star</h3>

                <hr></hr>

                <div className="form-group row">
                    <label htmlFor="name" className="col-sm-12 col-md-4 col-form-label"><b>Name</b></label>
                    <div className="col-sm-12 col-md-8">
                        <input type="text" name="name"
                               className="form-control" id="name"
                               onChange={this.onChangeHandle}
                               onBlur={this.onChangeHandle}
                               placeholder="Enter name"/>
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="dateOfBirth" className="col-sm-12 col-md-4 col-form-label"><b>Date of Birth</b></label>
                    <div className="col-sm-12 col-md-8">
                        <input type="date" name="dateOfBirth"
                               className="form-control text-muted" id="dateOfBirth"
                               onChange={this.onChangeHandle}
                               onBlur={this.onChangeHandle}/>
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="placeOfBirth" className="col-sm-12 col-md-4 col-form-label"><b>Place of Birth</b></label>
                    <div className="col-sm-12 col-md-8">
                        <input type="text" name="placeOfBirth"
                               className="form-control" id="placeOfBirth"
                               onChange={this.onChangeHandle}
                               onBlur={this.onChangeHandle}
                               placeholder="Enter place of Birth"/>
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="imageUrl" className="col-sm-12 col-md-4 col-form-label"><b>Image url</b></label>
                    <div className="col-sm-12 col-md-8">
                        <input type="text" name="imageUrl"
                               className="form-control" id="imageUrl"
                               onChange={this.onChangeHandle}
                               onBlur={this.onChangeHandle}
                               placeholder="Enter image url"/>
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="imageUrl" className="col-sm-12 col-md-4 col-form-label"><b>Bio</b></label>
                    <div className="col-sm-12 col-md-8">
                        <textarea name="bio"
                               className="form-control" id="bio" rows="2"
                               onChange={this.onChangeHandle}
                               onBlur={this.onChangeHandle}
                               placeholder="Enter bio"/>
                    </div>
                </div>


                <hr/>

                <div className="row">

                    <div className="col">
                    <span
                        onClick={this.onCancelHandle}
                        className="btn btn-outline-custom-color w-100"><i className="fa fa-times"/> Cancel</span>
                    </div>

                    <div className="col">
                        <button type="submit" className="btn btn-outline-success w-100"><i className="fa fa-save"/> Save
                        </button>
                    </div>
                </div>
            </form>

        );
    }

}

export default CastAdd;