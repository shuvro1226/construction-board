import React from 'react';
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TasksList from '../TasksList/TasksList';
import styles from './TaskBoard.module.css';

const TaskBoard = (props) => {
    
    let cardHeaderStyles = [
        'text-white',
        styles.TextCapitalize
    ];    

    return (
        <Card bg={props.statusDetail.scheme.toLowerCase()}>
            <Card.Header as="h5" className={cardHeaderStyles.join(' ')}>
                <FontAwesomeIcon icon={props.statusDetail.icon} /> {props.statusDetail.displayText}
            </Card.Header>
            <Card.Body>
                <Card.Text as="div">
                    <TasksList statusDetail={props.statusDetail} />
                </Card.Text>
            </Card.Body>
        </Card>
    )
}



export default TaskBoard;