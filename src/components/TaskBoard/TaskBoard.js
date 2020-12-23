import React from 'react';
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TasksList from './TasksList/TasksList';
import styles from './TaskBoard.module.css';

const TaskBoard = (props) => {
    let cardHeaderStyles = [
        'bg-' + props.status.scheme.toLowerCase(),
        'text-white',
        styles.TextCapitalize
    ];

    return (
        <Card
            bg="light"
            border={props.status.scheme.toLowerCase()}>
            <Card.Header as="h5" className={cardHeaderStyles.join(' ')}>
                <FontAwesomeIcon icon={props.status.icon} /> {props.status.displayText}
            </Card.Header>
            <Card.Body>
                <Card.Text as="div">
                    <TasksList status={props.status} />
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default TaskBoard;