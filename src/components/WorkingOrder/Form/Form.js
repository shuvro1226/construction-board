import React from "react";
import Input from '../../../components/UI/Input/Input';
import Modal from '../../../components/UI/Modal/Modal';


const form = (props) => {
    let workingOrderFields = null;
    if (props.formFields) {
        workingOrderFields = props.formFields.map(field => {            
            return <div key={field.id} className={field.config.elementUIConfig ? field.config.elementUIConfig.grid : ''}>
                <Input
                    config={field.config}
                    element={field.id}
                    linkedTo={field.linkedTo}
                    isCreateWO={props.isCreateWO}
                    changed={(event) => props.changed(event, field)}
                />
            </div>
        })
    }       
    
    let modalTitle = 'Edit Working Order';
    if (props.isCreateWO) {
        modalTitle = 'Create Working Order';
    }

    return (            
        <Modal
            modalShow={props.showWOModal}
            modalClose={props.modalClosed}
            modalTitle={modalTitle}
            modalSubmit={props.modalSubmitted}
            modalSize="lg"
        >
            <div className="row">
                {workingOrderFields}
            </div>               
        </Modal>
    )
}

export default form;