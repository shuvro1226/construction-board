import React, { Component } from "react";
import { connect } from 'react-redux';
import moment from 'moment';
// import EditForm from '../../../components/WOEditForm/WOEditForm';
import Input from '../../../components/UI/Input/Input';
import Modal from '../../../components/UI/Modal/Modal';
import * as actions from '../../../store/actions/index';


class WorkingOrder extends Component {
    state = {
        initialWODetails: null
    }

    onModalClose = () => {
        this.props.onToggleWOModal(false, null);
    }

    onModalSubmit = () => {
        const updatedPostData = {};
        const updatedDataWithAlias = {};

        for (let key in this.props.workingOrderFields) {
            let woConfig = this.props.workingOrderFields[key];
            updatedPostData[key] = woConfig.value;
            updatedDataWithAlias[woConfig.alias] = woConfig.value;
        }
        
        const workingOrderData = [updatedPostData];        

        const oldStatus = this.props.oldWorkingOrderFields.status.value,
            oldProjectNo = this.props.oldWorkingOrderFields.projectNo.value,
            oldWorkingOrderNo = this.props.oldWorkingOrderFields.workingOrderNo.value,
            oldData = this.props.workingOrders[oldStatus].find(element => element.projectNo === oldProjectNo && element.workingOrderNo === oldWorkingOrderNo),
            oldIndex = this.props.workingOrders[oldStatus].findIndex(element => element.projectNo === oldProjectNo && element.workingOrderNo === oldWorkingOrderNo),
            mergeNewWithOld = {
                ...oldData,
                ...updatedDataWithAlias
            },
            updateWOListParams = {
                oldIndex: oldIndex,
                oldStatus: oldStatus,
                newStatus: updatedPostData.status,
                updatedWO: mergeNewWithOld
            };

        this.props.onUpdateWorkingOrder(workingOrderData);
        this.props.onUpdateWorkingOrdersList(updateWOListParams);
        this.props.onToggleWOModal(false, null);
    }

    onInputChangedHandler = (event, element) => {
        let updatedValue;
        if (element.config.isDate) {
            updatedValue = moment(event).format("YYYY-MM-DDThh:mm:ss");
        } else {
            updatedValue = event.target.value;
        }         
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
                <div className="row">
                    {workingOrderFormArray.map(field => (
                        <div key={field.id} className={field.config.elementUIConfig ? field.config.elementUIConfig.grid : ''}>
                            <Input
                                config={field.config}
                                element={field.id}
                                statusList={this.props.status}
                                changed={(event) => this.onInputChangedHandler(event, field)}
                            />
                        </div>
                    ))}
                </div>               
            </Modal>
        )
    }
}

const mapStateToProps = state => {
    return {
        showWOModal: state.workingOrder.showWOModal,
        workingOrderFields: state.workingOrder.woDetail,
        oldWorkingOrderFields: state.workingOrder.oldWODetail,
        status: state.taskBoard.status,
        workingOrders: state.taskBoard.workingOrders
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onToggleWOModal: (showModal, woDetail) => dispatch(actions.toggleWOModal(showModal, woDetail)),
        onFormElementChange: (updatedFields) => dispatch(actions.formElementChange(updatedFields)),
        onUpdateWorkingOrder: (woDetail) => dispatch(actions.updateWorkingOrder(woDetail)),
        onUpdateWorkingOrdersList: (params) => dispatch(actions.updateWOList(params))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkingOrder);