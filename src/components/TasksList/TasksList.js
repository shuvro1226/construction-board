import React from 'react';
import { connect } from 'react-redux';
import Task from './Task/Task';
import * as actions from '../../store/actions/index';
import './TasksList.css';

const TasksList = (props) => {

    const showWOEditModal = (woDetail) => {
        props.onToggleWOModal(true, woDetail);
    }

    const workingOrdersList = props.workingOrders[props.statusDetail.status].map((woDetail, index) => {
        if (index < 10 && woDetail.longDescription !== "") {      
            return <Task 
                key={woDetail.uniqueKey} 
                woDetail={woDetail} 
                showWorkingOrderEditModal={() => showWOEditModal(woDetail)}
                showActions={() => props.onToggleTaskActions(index, true, props.statusDetail.status)} 
                hideActions={() => props.onToggleTaskActions(index, false, props.statusDetail.status)} />;
        }
        return null;
    });

    return workingOrdersList;
};

const mapStateToProps = state => {
    return {
        workingOrders: state.taskBoard.workingOrders
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onToggleTaskActions: (index, showActions, status) => dispatch(actions.toggleTaskActions(index, showActions, status)),
        onToggleWOModal: (showModal, woDetail) => dispatch(actions.toggleWOModal(showModal, woDetail))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TasksList);