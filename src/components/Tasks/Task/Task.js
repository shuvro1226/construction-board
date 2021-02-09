import React from 'react';
import { Toast, ToastHeader } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Draggable } from 'react-beautiful-dnd';

const task = (props) => {     

    return (
        <Draggable
            draggableId={props.uniqueKey}
            index={props.index}
        >
            {(provided) => (
                <div                
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    className="mb-2"
                >
                    <Toast 
                        className="Toast"
                        onClick={props.toastAction}
                        onMouseEnter={props.showActions}
                        onMouseLeave={props.hideActions}
                        onMouseDown={props.getWOBookedHours}
                    >
                        <ToastHeader>
                            <FontAwesomeIcon icon={props.headerIcon} className="mr-1" /> {props.header}
                        </ToastHeader>
                        <Toast.Body>
                            {props.children}
                        </Toast.Body>
                    </Toast>  
                </div>                
            )}
        </Draggable>   
    );

};

export default task;