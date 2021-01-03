import React from 'react';
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const card = (props) => {
    return(
        <Card>
            <Card.Body>
                <Card.Title>
                    <FontAwesomeIcon icon={props.icon} /> {props.title}
                </Card.Title>
                <Card.Text as="div">
                    {props.children}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default card;