import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { DragDropContext } from 'react-beautiful-dnd';

import Wrapper from '../../hoc/Wrapper/Wrapper';
import TaskBoards from '../TaskBoards/TaskBoards';
import WorkingOrder from '../WorkingOrder/WorkingOrder';
import Filters from './Filters/Filters';
import BookedHours from '../../components/WorkingOrder/BookedHours/BookedHours';
import * as actions from '../../store/actions/index';

class ConstructionBoard extends Component {

    state = {
        showTotalBookedHoursModal: false,
        totalBookedHours: 0
    }

    componentDidMount() {
        if (!this.props.status && this.props.isAuthenticated) {
            this.props.onFetchStatus();
        }
        if (!this.props.woTasks && this.props.isAuthenticated) {
            this.props.onFetchTaskSelections();
        }
    }

    onDragEnd = result => {
        if (result.source.droppableId === '3' && result.destination.droppableId === '4') {
            this.setState({
                showTotalBookedHoursModal: true
            });
        }
        if (result.destination && result.destination.droppableId !== result.source.droppableId) {
            this.props.onWODragEnd(result);
        }
    }

    onModalClose = () => {
        this.setState({
            showTotalBookedHoursModal: false,
            totalBookedHours: 0
        });
    }

    onModalSubmitted = () => {
        this.props.onUpdateBookedHours(this.state.totalBookedHours);
        this.setState({
            showTotalBookedHoursModal: false,
            totalBookedHours: 0
        });
    }

    onTotalBookedHoursUpdate = (event) => {
        this.setState({
            totalBookedHours: event.target.value
        });
    }

    onGetBookedHours = (hours) => {
        this.setState({
            totalBookedHours: hours
        });
    }
    
    render() {
        if (!this.props.isAuthenticated) {
            return <Redirect to="/login" />
        }

        let taskBoardLayout = null;
        if (this.props.status) {
            taskBoardLayout = this.props.status.map(status => {
                if (status.useBoard) {
                    return <Col xs={12} md={3} key={status.status}>
                        <TaskBoards 
                            statusDetail={status}                            
                            getWOBookedHours={this.onGetBookedHours}
                        />
                    </Col>
                } else {
                    return null;
                }                
            })
        }        

        return (
            <Wrapper>
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
                <WorkingOrder />
                <BookedHours
                    showBookedHoursModal={this.state.showTotalBookedHoursModal}
                    modalClosed={this.onModalClose}
                    modalSubmitted={this.onModalSubmitted}
                    hasEditAccess={this.props.hasEditAccess}
                    totalBookedHours={this.state.totalBookedHours}
                    totalBookedHoursUpdate={(event) => this.onTotalBookedHoursUpdate(event)}
                />
            </Wrapper>
        )
    }
}

const mapStateToProps = state => {
    return {
        status: state.taskBoard.status,
        woTasks: state.taskBoard.woTasks,
        isAuthenticated: state.auth.token !== null,
        hasEditAccess: state.auth.hasEditAccess
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchStatus: () => dispatch(actions.fetchStatus()),
        onFetchTaskSelections: () => dispatch(actions.fetchTasks()),
        onWODragEnd: (result) => dispatch(actions.changeWOStatus(result))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ConstructionBoard);