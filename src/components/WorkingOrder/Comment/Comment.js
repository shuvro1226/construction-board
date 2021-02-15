import React from 'react';
import Modal from '../../UI/Modal/Modal';
import { Row, Col, Form } from 'react-bootstrap';

const comment = (props) => {
    return (            
        <Modal
            modalShow={props.showCommentModal}
            modalClose={props.modalClose}
            modalTitle="Add a comment"
            modalSubmit={props.modalSubmit}
            modalSize="md"
            hasEditAccess={props.hasEditAccess}
        >
            <Row>
                <Col xs={12}>
                    <Form.Control
                        as="textarea"
                        onChange={(event) => props.commentChanged(event)}
                    />
                </Col>
            </Row>        
        </Modal>
    )
}

export default comment;