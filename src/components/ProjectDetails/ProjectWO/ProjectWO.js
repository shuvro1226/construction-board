import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card } from 'react-bootstrap';
import { Droppable } from 'react-beautiful-dnd';

import Tasks from '../../Tasks/Tasks';
import styles from './ProjectWO.module.css';

const projectWO = (props) => {

    let cardHeaderStyles = [
        'text-white',
        styles.TextCapitalize
    ];  

    let taskBoardContent = null;
    if (props.statusDetail && props.workingOrders) {
        const filteredWorkingOrders = props.workingOrders.reduce((workingOrders, woDetail) => {
            if (woDetail.status.toString() === props.statusDetail.status.toString()) {
                workingOrders.push({
                    ...woDetail,
                    visible: true
                });
            }
            return workingOrders;
        }, []);

        if (filteredWorkingOrders.length > 0) {
            taskBoardContent = <Tasks
                workingOrders={filteredWorkingOrders}
                statusDetail={props.statusDetail}  
                showWorkingOrderEditModal={props.showWorkingOrderEditModal}                       
                showActions={props.showActions} 
                hideActions={props.hideActions}
            />;
        } else {
            taskBoardContent = <p className="text-light">No working orders available with {props.statusDetail.displayText} status.</p>
        }
        
    }

    return (
        <Card bg={props.statusDetail.scheme.toLowerCase()}>
            <Card.Header as="h5" className={cardHeaderStyles.join(' ')}>
                <FontAwesomeIcon icon={props.statusDetail.icon} /> {props.statusDetail.displayText}
            </Card.Header>
            <Card.Body>
                <Droppable droppableId={props.statusDetail.status}>
                    {provided => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {taskBoardContent}
                            {provided.placeholder}
                        </div>
                    )}                        
                </Droppable>   
            </Card.Body>
        </Card>
    );
}

export default projectWO;