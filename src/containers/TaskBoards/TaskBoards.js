import React, { Component } from "react";
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card } from 'react-bootstrap';
import { Droppable } from 'react-beautiful-dnd';

import Tasks from '../../components/Tasks/Tasks';
import * as actions from '../../store/actions/index';
import styles from './TaskBoards.module.css';

class TaskBoards extends Component {
    componentDidMount() {
        if (!this.props.workingOrders) {
            this.props.onWoGetByStatus(this.props.statusDetail.status);
        }
    }

    showWOEditModal = (woDetail) => {
        this.props.onToggleWOModal(true, woDetail, false);
    }

    render() {
        let cardHeaderStyles = [
            'text-white',
            styles.TextCapitalize
        ];  

        let taskBoardContent = null;
        if (
            this.props.workingOrders && 
            this.props.workingOrders[this.props.statusDetail.status] &&
            this.props.workingOrders[this.props.statusDetail.status].length > 0) {
            taskBoardContent = <Tasks
                workingOrders = {this.props.workingOrders[this.props.statusDetail.status]}
                statusDetail = {this.props.statusDetail}
                showWorkingOrderEditModal={this.showWOEditModal}
                showActions={this.props.onToggleTaskActions} 
                hideActions={this.props.onToggleTaskActions}
                getWOBookedHours={this.props.getWOBookedHours}
            />;
        } else {
            taskBoardContent = <p className="text-light">No working orders available. Try filtering the taskboard!</p>
        }

        return (
            <Card bg={this.props.statusDetail.scheme.toLowerCase()}>
                <Card.Header as="h5" className={cardHeaderStyles.join(' ')}>
                    <FontAwesomeIcon icon={this.props.statusDetail.icon} /> {this.props.statusDetail.displayText}
                </Card.Header>
                <Card.Body>
                    <Droppable droppableId={this.props.statusDetail.status}>
                        {provided => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                {taskBoardContent}
                                {provided.placeholder}
                            </div>
                        )}                        
                    </Droppable>                    
                </Card.Body>
            </Card>
        );
    }
}

const mapStateToProps = state => {
    return {
        workingOrders: state.taskBoard.workingOrders
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onWoGetByStatus: (statusId) => dispatch(actions.fetchWOByStatus(statusId)),
        onToggleTaskActions: (index, showActions, status) => dispatch(actions.toggleTaskActions(index, showActions, status)),
        onToggleWOModal: (showModal, woDetail, createMode) => dispatch(actions.toggleWOModal(showModal, woDetail, createMode))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskBoards);