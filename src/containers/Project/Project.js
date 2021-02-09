import React, { Component } from "react";
import { connect } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { DragDropContext } from 'react-beautiful-dnd';

import Wrapper from '../../hoc/Wrapper/Wrapper';
import ProjectDetails from '../../components/ProjectDetails/ProjectDetails';
import * as actions from '../../store/actions/index';
import ProjectWO from '../../components/ProjectDetails/ProjectWO/ProjectWO';
import Card from '../../components/UI/Card/Card';

class Project extends Component {

    componentDidMount () {
        if (!this.props.status && this.props.isAuthenticated) {
            this.props.onFetchStatus();
        }
        this.props.onFetchProjectDetails(this.props.match.params.id, this.props.match.params.year);
        this.props.onFetchProjectWO(this.props.match.params.id);
    }

    showWOEditModal = (woDetail) => {
        this.props.onToggleWOModal(true, woDetail, false);
    }

    onToggleTaskActions = (index, showActions, status) => {
        // console.log(index, showActions, status);
    }

    onDragEnd = result => {
        if (result.destination && result.destination.droppableId !== result.source.droppableId) {
            this.props.onWODragEnd(result);
        }
    }

    render() {

        if (!this.props.isAuthenticated) {
            return <Redirect to="/login" />
        }

        let projectDetails = null;
        if (this.props.project && this.props.workingOrders && this.props.status) {
            projectDetails = <ProjectDetails 
                project={this.props.project} 
                workingOrders={this.props.workingOrders}
                statusList={this.props.status}
            />;
        }

        let taskBoardLayout = null;
        if (this.props.status && this.props.workingOrders) {
            taskBoardLayout = this.props.status.map(status => {
                if (status.useBoard) {
                    return <Col xs={12} md={3} key={status.status}>
                        <ProjectWO 
                            statusDetail={status} 
                            workingOrders={this.props.workingOrders}     
                            showWorkingOrderEditModal={this.showWOEditModal}                       
                            showActions={this.onToggleTaskActions} 
                            hideActions={this.onToggleTaskActions} />
                    </Col>
                } else {
                    return null;
                }                
            })
        }

        return (
            <Wrapper>
                <Container fluid>
                    {projectDetails}                    
                    <Card icon="tasks" title="Working Orders">
                        <Row>
                            <DragDropContext
                                onDragEnd={this.onDragEnd}
                            >
                                {taskBoardLayout}
                            </DragDropContext>             
                        </Row>                    
                    </Card>                  
                </Container>
            </Wrapper>
        )
    }
}

const mapStateToProps = state => {
    return {
        project: state.project.projectDetails,
        workingOrders: state.project.projectWorkingOrders,
        status: state.taskBoard.status,
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchStatus: () => dispatch(actions.fetchStatus()),
        onFetchProjectDetails: (projectNo, projectYear) => dispatch(actions.fetchProject(projectNo, projectYear)),
        onFetchProjectWO: (projectNo) => dispatch(actions.fetchProjectWorkingOrders(projectNo)),
        onToggleWOModal: (showModal, woDetail, createMode) => dispatch(actions.toggleWOModal(showModal, woDetail, createMode)),
        onWODragEnd: (result) => dispatch(actions.changeProjectWOStatus(result))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Project);