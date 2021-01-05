import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TasksList from '../../../components/Tasks/Tasks';
import styles from './TaskBoard.module.css';
import * as actions from '../../../store/actions/index';

class TaskBoard extends Component {

    showWOEditModal = (woDetail) => {
        this.props.onToggleWOModal(true, woDetail, false);
    }
    
    render() {
        let cardHeaderStyles = [
            'text-white',
            styles.TextCapitalize
        ];  

        return (
            <Card bg={this.props.statusDetail.scheme.toLowerCase()}>
                <Card.Header as="h5" className={cardHeaderStyles.join(' ')}>
                    <FontAwesomeIcon icon={this.props.statusDetail.icon} /> {this.props.statusDetail.displayText}
                </Card.Header>
                <Card.Body>
                    <Card.Text as="div">
                        <TasksList 
                            statusDetail={this.props.statusDetail} 
                            workingOrders={this.props.workingOrders}
                            showWorkingOrderEditModal={this.showWOEditModal}
                            showActions={this.props.onToggleTaskActions} 
                            hideActions={this.props.onToggleTaskActions}
                        />
                    </Card.Text>
                </Card.Body>
            </Card>
        )
    }      
}

const mapStateToProps = state => {
    return {
        workingOrders: state.taskBoard.workingOrders
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onToggleTaskActions: (index, showActions, status) => dispatch(actions.toggleTaskActions(index, showActions, status)),
        onToggleWOModal: (showModal, woDetail, createMode) => dispatch(actions.toggleWOModal(showModal, woDetail, createMode))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskBoard);