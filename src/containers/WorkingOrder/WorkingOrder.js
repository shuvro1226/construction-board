import React, { Component } from "react";
import { connect } from 'react-redux';
import moment from 'moment';
import Wrapper from '../../hoc/Wrapper/Wrapper';
import Form from '../../components/WorkingOrder/Form/Form';
import * as actions from '../../store/actions/index';


class WorkingOrder extends Component {

    onModalClose = () => {
        this.props.onToggleWOModal(false, null, false);
    }

    onModalSubmit = () => {
        const updatedPostData = {};
        const plannedDate = moment(this.props.workingOrderFields['plannedDate'].value, "YYYY-MM-DDThh:mm:ss").format("YYYY-MM-DD");
        
        for (let key in this.props.workingOrderFields) {    
            let woConfig = this.props.workingOrderFields[key];        
            if (
                (this.props.isCreateWO && this.props.workingOrderFields[key].addToCreateRequest) ||
                (!this.props.isCreateWO && this.props.workingOrderFields[key].addToEditRequest)
            ) {
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
        this.props.onSaveWorkingOrder(workingOrderData, this.props.isCreateWO);
    }

    onInputChangedHandler = (event, element) => {
        let updatedValue;
        if (element.config.isDate) {
            let updatedDate = event.year + '-' + event.month + '-' + event.day;
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
            if (key === 'taskSelection' && this.props.woTasks) {
                defaultOptions = this.props.woTasks.map(tasks => {
                    return {
                        value: tasks.task.toString(),
                        displayText: tasks.title
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

        return (
            <Wrapper>
                <Form 
                    changed={this.onInputChangedHandler} 
                    formFields={workingOrderFormArray}
                    modalClosed={this.onModalClose}
                    modalSubmitted={this.onModalSubmit}
                    showWOModal={this.props.showWOModal}
                    isCreateWO={this.props.isCreateWO} 
                />;
            </Wrapper>
        )
    }
}

const mapStateToProps = state => {
    return {
        showWOModal: state.taskBoard.showWOModal,
        isCreateWO: state.taskBoard.createMode,
        woTasks: state.taskBoard.woTasks,
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
        onSaveWorkingOrder: (woDetail, isCreateWO) => dispatch(actions.saveWorkingOrder(woDetail, isCreateWO))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkingOrder);