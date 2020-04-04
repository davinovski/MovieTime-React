import React from "react";
import CastTableRow from "./CastTableRow/CastTableRow";

const CastTable = (props) => {

    const generateTableHeading = () => {
        return (
            <tr>
                <th scope="col"/>
                <th scope="col" className="text-center">Name</th>
                <th scope="col" className="text-center">Date of birth</th>
                <th scope="col" className="text-center">Place of Birth</th>
                <th scope="col" className="text-center">Actions</th>
            </tr>
        );
    };

    const generateTableBody = () => {
        return props.data.map(item => (
            <CastTableRow data={item} key={item.id}
                           deleteCastHandler={props.deleteCastHandle}
                           updateCast={props.updateCast}
                           removeValidation={props.removeValidation}/>
        ));
    };

    if (props.data && props.data.length > 0) {
        return (
            <table className="table table-striped text-white">
                <thead>
                {generateTableHeading()}
                </thead>
                <tbody>
                {generateTableBody()}
                </tbody>
            </table>
        );
    }
    return null;
};

export default CastTable;