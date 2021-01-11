import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const modal = (props) => {
    let modalActions = null;
    if (props.hasEditAccess) {
        modalActions = (
            <Modal.Footer>
                <Button variant="default" onClick={props.modalClose}>Close</Button>
                <Button variant="success" onClick={props.modalSubmit}>Save</Button>
            </Modal.Footer>
        )
    }
    return (
        <Modal 
            size={props.modalSize} 
            show={props.modalShow} 
            onHide={props.modalClose}
            animation={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>{props.modalTitle}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {props.children}
            </Modal.Body>

            {modalActions}
        </Modal>
    )
}

export default modal;