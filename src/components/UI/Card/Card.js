import React from 'react';
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const card = (props) => {
    return(
        <Card>
            <Card.Header as="h5">
                <FontAwesomeIcon icon={props.icon} /> {props.title}
            </Card.Header>
            <Card.Body>
                <Card.Text as="div">
                    {props.children}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default card;