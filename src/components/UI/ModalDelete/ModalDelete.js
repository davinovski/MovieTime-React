import React from 'react';
import './ModalDelete.css'
import Backdrop from "../Backdrop/Backdrop";


const ModalDelete = (props) => {

    return (
        <div>
            <Backdrop show={props.show}/>

            <div
                className={"ModalDelete"}
                style={{
                    transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0'
                }}>

                {props.children}

            </div>

        </div>
    );
};

export default ModalDelete;