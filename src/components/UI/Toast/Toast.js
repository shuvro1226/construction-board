import React from 'react';
import { Toast, ToastHeader } from 'react-bootstrap';

const task = (props) => {     

    return (
        <Toast 
            className="Toast"
            onMouseEnter={props.showActions}
            onMouseLeave={props.hideActions}>
            <ToastHeader>
                {props.header}
            </ToastHeader>
            <Toast.Body>
                {props.children}
            </Toast.Body>
        </Toast>     
    );

};

export default task;