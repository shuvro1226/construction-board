import React, { Component } from "react";
import { connect } from 'react-redux';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import Wrapper from '../../../hoc/Wrapper/Wrapper';
import Form from '../../../components/WorkingOrder/Form/Form';
import * as actions from '../../../store/actions/index';


class WorkingOrder extends Component {
    state = {
        invalidFields: []
    }

    onModalClose = () => {
        this.props.onToggleWOModal(false, null, false);
    }

    onModalSubmit = () => {
        const updatedPostData = {};
        let invalidFields = [];
        for (let key in this.props.workingOrderFields) {    
            let woConfig = this.props.workingOrderFields[key];   
            if (woConfig && woConfig.addToCreateRequest && (woConfig.value === '' || woConfig.value === '-1' || woConfig.value === -1)) {
                invalidFields.push(woConfig.displayText);
            }
            if ((woConfig && woConfig.addToCreateRequest && this.props.isCreateWO) || (woConfig && woConfig.addToEditRequest && !this.props.isCreateWO)) {
                updatedPostData[key] = woConfig.value;
            }
            if (key === 'customerNo' && this.props.customers) {
                updatedPostData['customer'] = this.props.customers[woConfig.value]
            }     
            if (key === 'projectNo' && this.props.projects) {
                updatedPostData['project'] = this.props.projects[woConfig.value]
            }     
        }
        if (!invalidFields.length) {
            let fromProject = false;
            if (window.location.pathname.includes('projects')) {
                fromProject = true;
            }
            this.props.onSaveWorkingOrder(updatedPostData, this.props.isCreateWO, fromProject);   
        } 
        this.setState({
            invalidFields: invalidFields
        });        
    }

    onInputChangedHandler = (event, element) => {
        let updatedValue;
        if (element.config.isDate) {
            let updatedDate = event.year + '-' + event.month + '-' + event.day;
            updatedValue = moment(updatedDate, "YYYY-MM-DD").format("YYYY-MM-DDThh:mm:ss");
        } else if (element.config.isTime) {
            updatedValue = event.format('HH:mm');
        } else {
            updatedValue = event.target.value;
        }         
        if (['status'].includes(element.id)) {
            updatedValue = parseInt(updatedValue);            
        }
        let updatedFormElement = {
            ...this.props.workingOrderFields,
            [element.id]: {
                ...this.props.workingOrderFields[element.id],
                value: updatedValue
            }
        }

        this.props.onFormElementChange(updatedFormElement);
    }

    linkClickedHandler = (link) => {
        this.props.onToggleWOModal(false, null, false);
        this.props.history.push(link);
    }


    render() {

        const workingOrderFormArray = [];

        for (let key in this.props.workingOrderFields) {
            let linkedTo = '';
            let defaultOptions = null;
            if (key === 'projectNo' && this.props.projects) {
                linkedTo = '/projects/' + this.props.workingOrderFields['projectNo'].value;
                defaultOptions = Object.keys(this.props.projects).map(key => {
                    return {
                        value: key,
                        displayText: this.props.projects[key].projectName,                        
                        hideOption: this.props.projects[key].hideOption
                    }
                });                
            }
            if (key === 'customerNo' && this.props.customers) {
                defaultOptions = Object.keys(this.props.customers).map(key => {
                    return {
                        value: key,
                        displayText: this.props.customers[key].customerName,
                        hideOption: this.props.customers[key].hideOption
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
                defaultOptions = Object.values(this.props.woTasks).map(taskDetails => {
                    return {
                        value: taskDetails.task.toString(),
                        displayText: taskDetails.title
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
                    onLinkClicked={this.linkClickedHandler}
                    hasEditAccess={this.props.hasEditAccess}
                    invalidFields={this.state.invalidFields}
                />
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
        projects: state.projects.projects,
        customers: state.projects.customers,
        filters: state.taskBoard.woFilters,
        hasEditAccess: state.auth.hasEditAccess
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onToggleWOModal: (showModal, woDetail, createMode) => dispatch(actions.toggleWOModal(showModal, woDetail, createMode)),
        onFormElementChange: (updatedFields) => dispatch(actions.formElementChange(updatedFields)),
        onSaveWorkingOrder: (woDetail, isCreateWO, fromProject) => dispatch(actions.saveWorkingOrder(woDetail, isCreateWO, fromProject))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WorkingOrder));