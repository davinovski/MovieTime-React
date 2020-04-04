import React, {useState} from "react";
import "./CastTableRow.css";
import defaultUser from "../../../images/user_image.png";

const CastTableRow = (props) => {

    return (
        <tr className="CastTableRow">
            <td className="align-middle text-center">
              <img src={props.data.imageUrl===null || props.data.imageUrl==="" ? defaultUser : props.data.imageUrl} alt="Person image"
                         className="content-image rounded rounded-circle img-fluid"/>
            </td>
            <td className="align-middle text-center">
                {props.data.name}
            </td>
            <td className="align-middle text-center">
                {props.data.dateOfBirth.slice(0,10)}
            </td>
            <td className="align-middle text-center">
                {props.data.placeOfBirth}
            </td>

            <td className="align-middle text-center">
                <button className="btn btn-sm btn-outline-primary mx-1"
                        onClick={() => {props.updateCast(props.data.id); props.removeValidation();}}>
                    <span className="fa fa-edit"/>
                </button>
                <button className="btn btn-sm btn-outline-custom-color mx-1"
                        onClick={() => props.deleteCastHandler(props.data.id)}>
                    <span className="fa fa-trash"/>
                </button>
            </td>
        </tr>
    );
};

export default CastTableRow;