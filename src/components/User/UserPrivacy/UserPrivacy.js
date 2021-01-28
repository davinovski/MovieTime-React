import React, {useState} from "react";
import user from "../../../images/user_image.png";
import "./UserPrivacy.css"
import UsersService from "../../../axios/UserService";

const UserPrivacy = (props) => {
    const [inputElem, setInputElem] = useState(null);
    const [oldPassword, setOldPassword] = useState({isValid: false, value: ""});
    const [newPassword1, setNewPassword1] = useState({isValid: false, value: ""});
    const [newPassword2, setNewPassword2] = useState({isValid: false, value: ""});
    const [wrongCredentials,setWrongCredentials]=useState(false);
    const [wrongCredentialsText,setWrongCredentialsText]=useState("");
    const [approvedChange,setApprovedChange]=useState(false);
    const [confirmPassword,setConfirmPassword]=useState("");
    const [confirmPasswordText,setConfirmPasswordText]=useState("");
    const [confirmPasswordBool,setConfirmPasswordBool]=useState(false);
    const [showModal,setShowModal]=useState(false);

    const approvedChangeText=useState("You have successfully changed your password!");


    const onSubmitHandler = e => {
        e.preventDefault();
        validateInput(e.target.oldPassword, true);
        validateInput(e.target.newPassword1, true);
        validateInput(e.target.newPassword2, true);
        if(oldPassword.isValid && newPassword1.isValid && newPassword2.isValid) {
            UsersService.changePassword(oldPassword.value,newPassword1.value).then(setApprovedChange(true)).catch(error=>changeWrongCredentials(error.response.data));
        }
        setWrongCredentials(false);
    };

    const changeWrongCredentials = (textWrongCredentials) =>{
        setWrongCredentials(true);
        setWrongCredentialsText(textWrongCredentials);
    };

    const onChangeHandler = e => {
        validateInput(e, false);
    };

    const renderAlert = () =>{
        if (wrongCredentials) {
            return (
                <div className="alert alert-danger" role="alert">
                    <small>{wrongCredentialsText}</small>
                </div>
            );
        }
        else if(approvedChange){
            return (
                <div className="alert alert-success" role="alert">
                    <small>{approvedChangeText}</small>
                </div>
            );
        }
    };

    const onClickClose = () =>{
        setApprovedChange(false);
        setOldPassword({
            isValid: false, value: ""
        });
        setNewPassword1({
            isValid: false, value: ""
        });
        setNewPassword2({
            isValid: false, value: ""
        });
    };

    const validateInput = (e, formValidate) => {
        let inputName = null;
        let inputValue = null;
        if (formValidate) {
            inputName = e.name;
            inputValue = e.value;
        } else {
            inputName = e.target.name;
            inputValue = e.target.value;
        }
        let isValid = inputValue.toString().trim().length > 0;
        if(inputName === "oldPassword") {
            setOldPassword({isValid : isValid, value : inputValue});
        }
        else if(inputName === "newPassword1") {
            setNewPassword1({isValid : isValid, value : inputValue});
        }
        else {
            isValid = isValid && inputValue === newPassword1.value;
            setNewPassword2({isValid : isValid, value : inputValue});
        }
        const inputElement = document.getElementById(inputName);
        if (isValid)
            inputElement.classList.remove("is-invalid");
        else
            inputElement.classList.add("is-invalid");
    };


    const changePasswordDeactivate = (e) =>{
        setConfirmPassword(e.target.value);
    };

    const submitFormDeactivate = (e) =>{
        e.preventDefault();
        UsersService.deactivateUser(confirmPassword).then(resp => {
            props.deactivateUserFrom();
            document.getElementsByClassName("modal-backdrop")[0].style.display = "none";
        }).catch(error=>changeConfirmPassword(error.response.data)

        )};

    const changeConfirmPassword = (textConfirmPassword) =>{
        setConfirmPasswordBool(true);
        setConfirmPasswordText(textConfirmPassword);
    };

    const renderFormDeactivate = () => {
        if (confirmPasswordBool) {
            return (
                <div className="alert alert-danger m-1" role="alert">
                    <small>{confirmPasswordText}</small>
                </div>
            );
        }

    };

    const resetFormDeactivate = () =>{
        setConfirmPasswordBool(false);
        document.getElementById("inputPasswordDeactivate").value="";

    };


    return (
        <div className="col-md-3 userPrivacy mt-3 col-sm-12">
            <div className="card cardDetails shadow-sm h-100 bg-customcolor fadedSpot">
                <div className="content my-4" onClick={() => inputElem.click()}>
                    <div className="content-overlay rounded-circle"/>
                    <img src={props.imgUrl===null ? user : `data:image/jpeg;base64,${[props.imgUrl]}`} alt=""
                         className="rounded-circle" width="200px" height="200px"/>
                    <div className="content-details fadeIn-bottom">
                        <p className="content-text"><span className="fa fa-lg fa-edit"/></p>
                    </div>
                </div>
                <input type="file" ref={input => setInputElem(input)} accept="image/*"
                       style={{display: 'none'}} onChange={(e) => props.imageHandler(e)}/>
                <button className="btn btn-outline-primary mt-2 mx-3" data-toggle="modal" data-target="#modalPassword">
                    Change password
                </button>
                <button className="btn btn-outline-custom-color my-3 mx-3" data-toggle="modal" data-target="#modalDeactivate">
                    Deactivate account
                </button>
            </div>

            <div className="modal fade" id="modalPassword" role="dialog">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header bg-dark">
                            <h4 className="modal-title text-white">Change your password</h4>
                            <button type="button" className="close" data-dismiss="modal" onClick={onClickClose}>&times;</button>
                        </div>

                        <form onSubmit={onSubmitHandler}>
                            <div className="modal-body bg-customcolor">
                                {renderAlert()}
                                <div className="row mt-2 mr-3">
                                    <div className="col-5 text-right text-white my-auto"><b>Password</b></div>
                                    <div className="col-7 form-label-group">
                                        <input type="password"
                                               name="oldPassword"
                                               id="oldPassword"
                                               value={oldPassword.value}
                                               onChange={onChangeHandler}
                                               className="form-control" placeholder="Current password"/>
                                        <div className="invalid-feedback">Password is required
                                        </div>
                                    </div>

                                </div>
                                <div className="row mt-2 mr-3">
                                    <div className="col-5 text-right text-white my-auto"><b>New password</b></div>
                                    <div className="col-7 form-label-group">
                                        <input type="password"
                                               name="newPassword1"
                                               id="newPassword1"
                                               value={newPassword1.value}
                                               onChange={onChangeHandler}
                                               onBlur={onChangeHandler}
                                               className="form-control" placeholder="New password"/>
                                    </div>
                                </div>
                                <div className="row mt-2 mr-3 mb-3">
                                    <div className="col-5 text-right text-white my-auto"><b>Confirm password</b></div>
                                    <div className="col-7 form-label-group">
                                        <input type="password"
                                               name="newPassword2"
                                               id="newPassword2"
                                               value={newPassword2.value}
                                               onChange={onChangeHandler}
                                               onBlur={onChangeHandler}
                                               className="form-control" placeholder="Confirm password"/>
                                        <div className="invalid-feedback mx-2">Passwords not matching</div>
                                    </div>
                                </div>
                                <div className="row p-3">
                                    <div className="col-6">
                                        <button type="button" className="btn btn-outline-custom-color w-100" data-dismiss="modal" onClick={onClickClose}>Cancel
                                        </button>
                                    </div>
                                    <div className="col-6">
                                        <button type="submit" className="btn btn-outline-success w-100">Change</button>
                                    </div>
                                </div>
                            </div>
                        </form>

                    </div>
                </div>
            </div>

            <div className="modal fade" id="modalDeactivate" role="dialog">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header bg-light">
                            <h4 className="modal-title text-danger">Деактивирај го профилот</h4>
                            <button type="button" className="close" data-dismiss="modal" onClick={resetFormDeactivate}>&times;</button>
                        </div>
                        {renderFormDeactivate()}
                        <form onSubmit={submitFormDeactivate}>
                            <div className="modal-body pb-0">
                                <p className="font-italic text-danger">По деактивација на профилот, истиот не може да се
                                    врати назад.</p>
                                <p>Внесете лозинка за деактивација на профилот:</p>
                                <input type="password" className="form-control w-100 mx-auto"
                                       id="inputPasswordDeactivate"
                                       placeholder="Лозинка" onChange={(e) => changePasswordDeactivate(e)}/>

                            </div>
                            <div className="row p-3">
                                <div className="col-6">
                                    <button type="button" className="btn btn-success w-100" data-dismiss="modal" onClick={resetFormDeactivate}>Откажи
                                    </button>
                                </div>
                                <div className="col-6">
                                    <button type="submit" className="btn btn-danger w-100">Деактивирај</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

            </div>

        </div>
    )
};

export default UserPrivacy;