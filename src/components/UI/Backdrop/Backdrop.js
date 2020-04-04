import React from 'react';
import './Backdrop.css'

const Backdrop = (props) => (
    props.show ? <div className="Backdrop"/> : null
);

export default Backdrop;