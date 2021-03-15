import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { DragDropContext } from 'react-beautiful-dnd';

import TaskBoards from './TaskBoards/TaskBoards';
import Filters from './Filters/Filters';
import * as actions from '../../store/actions/index';

class ConstructionBoard extends Component {   

    state = {
        maxWOInBoard: {
            1: 10,
            2: 10,
            3: 10,
            4: 10
        }
    }

    loadMoreWO = (statusID) => {
        this.setState({
            maxWOInBoard: {
                ...this.state.maxWOInBoard,
                [statusID]: this.state.maxWOInBoard[statusID] + 10
            }
        })
    }

    loadAllWO = (statusID, totalWOWithStatus) => {
        this.setState({
            maxWOInBoard: {
                ...this.state.maxWOInBoard,
                [statusID]: totalWOWithStatus
            }
        })
    }

    componentDidMount() {
        if (!this.props.status && this.props.isAuthenticated) {
            this.props.onFetchStatus();
        }
        if (!this.props.woTasks && this.props.isAuthenticated) {
            this.props.onFetchTaskSelections();
        }
        if (!this.props.projectStatusList && this.props.isAuthenticated) {
            this.props.onFetchProjectStatuses();
        }
        if (this.props.isAuthenticated && !this.props.projects) {
            this.props.onFetchProjects();
        }
        if (this.props.isAuthenticated && !this.props.customers) {
            this.props.onFetchCustomers();
        }
    }

    onDragEnd = result => {
        if (result.destination && result.destination.droppableId !== result.source.droppableId) {
            this.props.onWODragEnd(result);
            this.setState({
                commentWOKey: result.draggableId
            });
        }
    }
    
    render() {
        if (!this.props.isAuthenticated) {
            return <Redirect to="/login" />
        }

        let taskBoardLayout = null;
        if (this.props.status) {
            taskBoardLayout = this.props.status.map((status, index) => {
                if (status.useBoard && index <= 4) {
                    return <Col xs={12} md={3} key={status.status}>
                        <TaskBoards 
                            statusDetail={status}
                            maxWOInBoard={this.state.maxWOInBoard}
                            loadMoreWO={this.loadMoreWO}
                            loadAllWO={this.loadAllWO}
                        />
                    </Col>
                } else {
                    return null;
                }                
            })
        }        

        return (
            <Container fluid>
                <Filters />
                <Row className="py-2">
                    <DragDropContext
                        onDragEnd={this.onDragEnd}
                    >
                        {taskBoardLayout}
                    </DragDropContext>                        
                </Row>   
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
        status: state.taskBoard.status,
        projectStatusList: state.projects.statuses,
        woTasks: state.taskBoard.woTasks,
        isAuthenticated: state.auth.token !== null,
        hasEditAccess: state.auth.hasEditAccess,
        projects: state.projects.projects,
        customers: state.projects.customers
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchStatus: () => dispatch(actions.fetchStatus()),
        onFetchTaskSelections: () => dispatch(actions.fetchTasks()),
        onWODragEnd: (result) => dispatch(actions.changeWOStatus(result)),
        onFetchProjectStatuses: () => dispatch(actions.fetchProjectStatuses()),
        onFetchProjects: () => dispatch(actions.fetchProjects()),
        onFetchCustomers: () => dispatch(actions.fetchCustomers())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ConstructionBoard);