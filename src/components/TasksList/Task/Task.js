import React from 'react';
import { Toast, ToastHeader } from 'react-bootstrap';
import moment from 'moment';

const Task = (props) => {

    return (
        <Toast 
            key={props.woDetail.uniqueKey} 
            className="Toast">
            <ToastHeader>
                <strong className="mr-auto">{props.woDetail.taskName}</strong>
                <small>{moment(props.woDetail.endDate).fromNow()}</small>
            </ToastHeader>
            <Toast.Body>
                {props.woDetail.longDescription}
            </Toast.Body>
        </Toast>     
    );

};

export default Task;