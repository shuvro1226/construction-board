import React from 'react';
import { connect } from 'react-redux';
import Task from './Task/Task';
import './TasksList.css';

const TasksList = (props) => {

    const workingOrdersList = props.workingOrders[props.statusDetail.displayText].map((woDetail, index) => {
        if (index < 10 && woDetail.longDescription !== "") {      
            return <Task key={woDetail.uniqueKey} index={index} woDetail={woDetail} />;
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

export default connect(mapStateToProps)(TasksList);