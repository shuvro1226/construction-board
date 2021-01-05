import React, { Component } from "react";
import { connect } from 'react-redux';
import moment from 'moment';
import Input from '../../../components/UI/Input/Input';
import Modal from '../../../components/UI/Modal/Modal';
import * as actions from '../../../store/actions/index';


class CreateWorkingOrder extends Component {
    state = {
        initialWODetails: null
    }

    onModalClose = () => {
        this.props.onToggleWOModal(false, null, false);
    }

    onModalSubmit = () => {
        const updatedPostData = {};
        const plannedDate = moment(this.props.workingOrderFields['plannedDate'].value, "YYYY-MM-DDThh:mm:ss").format("YYYY-MM-DD");
        
        for (let key in this.props.workingOrderFields) {    
            let woConfig = this.props.workingOrderFields[key];        
            if (this.props.workingOrderFields[key].addToCreateRequest) {
                let fieldValue = woConfig.value;
                if (['startTime','endTime'].includes(key)) {
                    fieldValue = plannedDate + 'T' + fieldValue + ':00';
                }
                if (woConfig.parent) {
                    if ([woConfig.parent] in updatedPostData) {
                        updatedPostData[woConfig.parent][key] = fieldValue;
                    } else {
                        updatedPostData[woConfig.parent] = {};
                        updatedPostData[woConfig.parent][key] = fieldValue;
                    }                    
                } else {
                    updatedPostData[key] = fieldValue;
                }
            }                          
        }
       
        const workingOrderData = [updatedPostData];
        this.props.onCreateWorkingOrder(workingOrderData, this.props.isCreateWO);
        this.props.onToggleWOModal(false, null, false);
    }

    onInputChangedHandler = (event, element) => {
        let updatedValue;
        if (element.config.isDate) {
            let updatedDate = event.year + '-' + event.month + '-' + event.day
            updatedValue = moment(updatedDate, "YYYY-MM-DD").format("YYYY-MM-DDThh:mm:ss");
        } else {
            updatedValue = event.target.value;
        }         
        if (['projectNo','status','customerNo'].includes(element.id)) {
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
                    mode="create"
                    changed={(event) => this.onInputChangedHandler(event, field)}
                />
            </div>
        })

        return (            
            <Modal
                modalShow={this.props.showWOModal}
                modalClose={this.onModalClose}
                modalTitle="Create Working Order"
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
        showWOModal: state.taskBoard.showWOModal,
        isCreateWO: state.taskBoard.createMode,
        workingOrderFields: state.taskBoard.woDetail,
        status: state.taskBoard.status,
        workingOrders: state.taskBoard.workingOrders,
        projects: state.taskBoard.woProjects,
        customers: state.taskBoard.woCustomers
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onToggleWOModal: (showModal, woDetail, createMode) => dispatch(actions.toggleWOModal(showModal, woDetail, createMode)),
        onFormElementChange: (updatedFields) => dispatch(actions.formElementChange(updatedFields)),
        onCreateWorkingOrder: (woDetail, isCreateWO) => dispatch(actions.saveWorkingOrder(woDetail, isCreateWO))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateWorkingOrder);