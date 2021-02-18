import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { DragDropContext } from 'react-beautiful-dnd';

import TaskBoards from './TaskBoards/TaskBoards';
import Filters from './Filters/Filters';
import CommentModal from '../../components/WorkingOrder/Comment/Comment';
import * as actions from '../../store/actions/index';

class ConstructionBoard extends Component {   

    state = {
        maxWOInBoard: {
            1: 10,
            2: 10,
            3: 10,
            4: 10
        },
        comment: '',
        showCommentModal: false,
        commentWOKey: ''
    }

    onCommentModalClose = () => {
        this.setState({
            comment: '',
            showCommentModal: false,
            commentWOKey: ''
        });
    }

    onCommentModalSubmit = () => {
        const comment = this.state.comment;
        const woKey = this.state.commentWOKey;
        this.props.onWOAddComment(woKey, comment);
        this.setState({
            comment: '',
            showCommentModal: false,
            commentWOKey: ''
        });
    }

    onCommentChange = (event) => {
        this.setState({
            comment: event.target.value
        });
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
    }

    onDragEnd = result => {
        if (result.destination && result.destination.droppableId !== result.source.droppableId) {
            this.props.onWODragEnd(result);
            this.setState({
                showCommentModal: true,
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
                <CommentModal
                    showCommentModal={this.state.showCommentModal}
                    commentChanged={this.onCommentChange}
                    modalClose={this.onCommentModalClose}
                    modalSubmit={this.onCommentModalSubmit}
                    hasEditAccess={this.props.hasEditAccess}
                />             
            </Container>
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
        onWODragEnd: (result) => dispatch(actions.changeWOStatus(result)),
        onWOAddComment: (key, comment) => dispatch(actions.addCommentToWO(key, comment))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ConstructionBoard);