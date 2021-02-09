import React from 'react';
import Modal from '../../UI/Modal/Modal';
import { Form } from 'react-bootstrap';

const BookedHours = (props) => (
    <Modal
        modalShow={props.showBookedHoursModal}
        modalClose={props.modalClosed}
        modalTitle="Insert total booked hours"
        modalSubmit={props.modalSubmitted}
        modalSize="md"
        hasEditAccess={props.hasEditAccess}
    >
        <Form.Control
            value={props.totalBookedHours}
            onChange={props.totalBookedHoursUpdate}
        />
    </Modal>
)

export default BookedHours;