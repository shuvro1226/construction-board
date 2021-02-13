import React, { Component } from 'react';
import Modal from '../../../components/UI/Modal/Modal';
import { Row, Col, Form } from 'react-bootstrap';

class Comment extends Component {
    state = {

    }

    render() {
        return (            
            <Modal
                modalShow={this.props.showWOModal}
                modalClose={this.modalClosed}
                modalTitle="Add comment"
                modalSubmit={this.modalSubmitted}
                modalSize="lg"
                hasEditAccess={this.props.hasEditAccess}
            >
                <Row>
                    <Col xs={12}>
                        <Form.Control 
                            onChange={this.commentChange}
                        />
                    </Col>
                </Row>        
            </Modal>
        )
    }
}

export default Comment;