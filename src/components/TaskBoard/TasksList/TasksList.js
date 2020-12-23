import React from 'react';
import { Toast, ToastHeader } from 'react-bootstrap';
import './TaskList.css';

const TasksList = (props) => {
    return (
        <Toast>
            <ToastHeader>
                <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
                <strong className="mr-auto">Bootstrap</strong>
                <small>11 mins ago</small>
            </ToastHeader>
            <Toast.Body>
                This is a {props.status.displayText} task!
            </Toast.Body>
        </Toast>
    )
};

export default TasksList;