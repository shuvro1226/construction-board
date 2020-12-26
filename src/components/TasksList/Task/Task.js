import React from 'react';
import { Toast, ToastHeader } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';

const task = (props) => { 
    let taskActionsClasses = ['TaskActions'];

    if (!props.woDetail.showActions) {
        taskActionsClasses.push('d-none');
    }

    return (
        <Toast 
            key={props.woDetail.uniqueKey} 
            className="Toast"
            onMouseEnter={props.showActions}
            onMouseLeave={props.hideActions}>
            <ToastHeader>
                <strong className="mr-auto">{props.woDetail.taskName}</strong>
                <small>{moment(props.woDetail.endDate).fromNow()}</small>
                <div className={taskActionsClasses.join(' ')}>
                    <FontAwesomeIcon icon="pencil-alt" />
                </div>
            </ToastHeader>
            <Toast.Body>
                {props.woDetail.longDescription}
            </Toast.Body>
        </Toast>     
    );

};

export default task;