import React from "react";
import { Alert, Col } from 'react-bootstrap';
import Input from '../../../components/UI/Input/Input';
import Modal from '../../../components/UI/Modal/Modal';


const form = (props) => {
    let workingOrderFields = null;
    if (props.formFields) {
        workingOrderFields = props.formFields.map(field => {        
            if (props.isCreateWO && field.config.hideOnCreate) {
                return null;
            }    
            return <div key={field.id} className={field.config.elementUIConfig ? field.config.elementUIConfig.grid : ''}>
                <Input
                    config={field.config}
                    element={field.id}
                    linkedTo={field.linkedTo}
                    linkClicked={props.onLinkClicked}
                    isCreate={props.isCreateWO}
                    changed={(event) => props.changed(event, field)}
                />
            </div>
        })
    }       
    
    let modalTitle = 'Edit Working Order';
    if (props.isCreateWO) {
        modalTitle = 'Create Working Order';
    }

    let invalidAlert = null;
    if (props.invalidFields.length > 0) {
        invalidAlert = <Col xs="12">
                <Alert variant="danger" dismissible>
                The fields <b>[{props.invalidFields.join(", ")}]</b> must be filled to save a working order.
            </Alert>
        </Col>
    }

    return (            
        <Modal
            modalShow={props.showWOModal}
            modalClose={props.modalClosed}
            modalTitle={modalTitle}
            modalSubmit={props.modalSubmitted}
            modalSize="lg"
            hasEditAccess={props.hasEditAccess}
        >
            <div className="row">
                {workingOrderFields}
                {invalidAlert}
            </div>               
        </Modal>
    )
}

export default form;