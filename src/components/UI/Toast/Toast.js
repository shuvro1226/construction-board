import React from 'react';
import { Toast, ToastHeader } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const task = (props) => {     

    return (
        <Toast 
            className="Toast"
            onClick={props.toastAction}
            onMouseEnter={props.showActions}
            onMouseLeave={props.hideActions}>
            <ToastHeader>
                <FontAwesomeIcon icon={props.headerIcon} className="mr-1" /> {props.header}
            </ToastHeader>
            <Toast.Body>
                {props.children}
            </Toast.Body>
        </Toast>     
    );

};

export default task;