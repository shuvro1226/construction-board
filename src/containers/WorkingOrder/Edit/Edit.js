import React, { Component } from "react";
import { connect } from 'react-redux';
import moment from 'moment';
// import EditForm from '../../../components/WOEditForm/WOEditForm';
import Input from '../../../components/UI/Input/Input';
import Modal from '../../../components/UI/Modal/Modal';
import * as actions from '../../../store/actions/index';


class WorkingOrder extends Component {

    onModalClose = () => {
        this.props.onToggleWOModal(false, null);
    }

    onModalSubmit = () => {
        const updatedData = {};
        for (let key in this.props.workingOrderFields) {
            let fieldValue = this.props.workingOrderFields[key].value;
            if (this.props.workingOrderFields[key].isDate) {
                fieldValue = moment(fieldValue).toISOString();
            }
            updatedData[key] = fieldValue;
        }
        
        const workingOrderData = [updatedData];
        
        this.props.onUpdateWorkingOrder(workingOrderData);
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
                {workingOrderFormArray.map(field => (
                    <Input
                        key={field.id}
                        config={field.config}
                        element={field.id}
                        statusList={this.props.status}
                        changed={(event) => this.onInputChangedHandler(event, field)}
                    />
                ))}
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
        onFormElementChange: (updatedFields) => dispatch(actions.formElementChange(updatedFields)),
        onUpdateWorkingOrder: (woDetail) => dispatch(actions.updateWorkingOrder(woDetail))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkingOrder);