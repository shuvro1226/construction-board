import React from 'react';
import { connect } from 'react-redux';
import Task from './Task/Task';
import * as actions from '../../store/actions/index';
import './TasksList.css';

const TasksList = (props) => {

    const workingOrdersList = props.workingOrders[props.statusDetail.displayText].map((woDetail, index) => {
        if (index < 10 && woDetail.longDescription !== "") {      
            return <Task 
                key={woDetail.uniqueKey} 
                woDetail={woDetail} 
                showActions={() => props.onToggleTaskActions(index, true, props.statusDetail.displayText)} 
                hideActions={() => props.onToggleTaskActions(index, false, props.statusDetail.displayText)} />;
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
        onToggleTaskActions: (index, showActions, status) => dispatch(actions.toggleTaskActions(index, showActions, status))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TasksList);