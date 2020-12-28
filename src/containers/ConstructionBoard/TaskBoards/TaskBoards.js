import React, { Component } from "react";
import { connect } from 'react-redux';

import TaskBoard from '../../../components/TaskBoard/TaskBoard';
import * as actions from '../../../store/actions/index';

class TaskBoards extends Component {
    componentDidMount() {
        this.props.onWoGetByStatus(this.props.statusDetail.status);
    }

    render() {
        let taskBoardContent = null;
        
        if (this.props.workingOrders && this.props.workingOrders[this.props.statusDetail.status]) {
            taskBoardContent =  <TaskBoard 
                workingOrders={this.props.workingOrders[this.props.statusDetail.status]} 
                statusDetail={this.props.statusDetail} />;
        }       

        return taskBoardContent;
    }
}

const mapStateToProps = state => {
    return {
        workingOrders: state.taskBoard.workingOrders
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onWoGetByStatus: (statusId) => dispatch(actions.fetchWOByStatus(statusId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskBoards);