import React, { Component } from "react";
import { connect } from 'react-redux';
import { Form } from 'react-bootstrap';
// import EditForm from '../../../components/WOEditForm/WOEditForm';
import Input from '../../../components/UI/Input/Input';
import Modal from '../../../components/UI/Modal/Modal';
import * as actions from '../../../store/actions/index';


class WorkingOrder extends Component {

    onModalClose = () => {
        this.props.onToggleWOModal(false, null);
    }

    onModalSubmit = () => {
        this.props.onToggleWOModal(false, null);
    }

    onInputChangedHandler = (event, element) => {
        let updatedValue = event.target.value;
        
        const updatedFormElement = {
            ...this.props.workingOrderFields,
            [element.id]: {
                ...this.props.workingOrderFields[element.id],
                value: updatedValue
            }
        }

        this.props.onFormElementChange(updatedFormElement);
    }

    render() {

        const workingOrderFormArray = [];

        for (let key in this.props.workingOrderFields) {            
            workingOrderFormArray.push({
                id: key,
                config: this.props.workingOrderFields[key]
            })
        }

        return (            
            <Modal
                modalShow={this.props.showWOModal}
                modalClose={this.onModalClose}
                modalTitle="Edit Working Order"
                modalSubmit={this.onModalSubmit}
                modalSize="lg"
            >
                <Form>
                    {workingOrderFormArray.map(field => (
                        <Input
                            key={field.id}
                            config={field.config}
                            element={field.id}
                            statusList={this.props.status}
                            changed={(event) => this.onInputChangedHandler(event, field)}
                        />
                    ))}
                </Form>
            </Modal>
        )
    }
}

const mapStateToProps = state => {
    return {
        showWOModal: state.workingOrder.showWOModal,
        workingOrderFields: state.workingOrder.woDetail,
        status: state.taskBoard.status
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onToggleWOModal: (showModal, woDetail) => dispatch(actions.toggleWOModal(showModal, woDetail)),
        onFormElementChange: (updatedFields) => dispatch(actions.formElementChange(updatedFields))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkingOrder);