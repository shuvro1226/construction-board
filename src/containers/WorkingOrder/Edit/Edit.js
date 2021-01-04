import React, { Component } from "react";
import { connect } from 'react-redux';
import moment from 'moment';
import Input from '../../../components/UI/Input/Input';
import Modal from '../../../components/UI/Modal/Modal';
import * as actions from '../../../store/actions/index';


class EditWorkingOrder extends Component {
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
            if (this.props.workingOrderFields[key].addToRequest) {
                let woConfig = this.props.workingOrderFields[key];
                updatedPostData[key] = woConfig.value;
                updatedDataWithAlias[woConfig.alias] = woConfig.value;
            }            
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
            let updatedDate = event.year + '-' + event.month + '-' + event.day
            updatedValue = moment(updatedDate).format("YYYY-MM-DDThh:mm:ss");
        } else {
            updatedValue = event.target.value;
        }         
        if (['projectNo','status'].includes(element.id)) {
            updatedValue = parseInt(updatedValue);
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
            let linkedTo = '';
            let defaultOptions = null;
            if (key === 'projectNo' && this.props.projects) {
                linkedTo = '/project/' + this.props.workingOrderFields['projectNo'].value + '/' + this.props.workingOrderFields['projectYear'].value;
                defaultOptions = Object.keys(this.props.projects).map(key => {
                    return {
                        value: this.props.projects[key].projectNo,
                        displayText: this.props.projects[key].projectName
                    }
                });                
            }
            if (key === 'customerNo' && this.props.customers) {
                defaultOptions = Object.keys(this.props.customers).map(key => {
                    return {
                        value: this.props.customers[key].customerNo,
                        displayText: this.props.customers[key].customerName
                    }
                });
            }
            if (key === 'status' && this.props.status) {
                defaultOptions = this.props.status.map(statusDetail => {
                    return {
                        value: statusDetail.status,
                        displayText: statusDetail.displayText
                    }
                });
            }
            const config = {
                ...this.props.workingOrderFields[key],
                defaultOptions: defaultOptions
            }
            workingOrderFormArray.push({
                id: key,
                config: config,
                linkedTo: linkedTo
            })
        }

        const workingOrderFields = workingOrderFormArray.map(field => {            
            return <div key={field.id} className={field.config.elementUIConfig ? field.config.elementUIConfig.grid : ''}>
                <Input
                    config={field.config}
                    element={field.id}
                    statusList={this.props.status}
                    linkedTo={field.linkedTo}
                    mode="edit"
                    changed={(event) => this.onInputChangedHandler(event, field)}
                />
            </div>
        })

        return (            
            <Modal
                modalShow={this.props.showWOModal}
                modalClose={this.onModalClose}
                modalTitle="Edit Working Order"
                modalSubmit={this.onModalSubmit}
                modalSize="lg"
            >
                <div className="row">
                    {workingOrderFields}
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
        workingOrders: state.taskBoard.workingOrders,
        projects: state.taskBoard.woProjects,
        customers: state.taskBoard.woCustomers
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

export default connect(mapStateToProps, mapDispatchToProps)(EditWorkingOrder);