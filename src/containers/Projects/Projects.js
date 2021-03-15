import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Wrapper from '../../hoc/Wrapper/Wrapper';
import Boards from './Boards/Boards';
import * as actions from '../../store/actions/index';

class Projects extends Component {

    componentDidMount() {
        if (!this.props.statuses && this.props.isAuthenticated) {
            this.props.onFetchProjectStatuses();
        }
        if (!this.props.projects && this.props.isAuthenticated) {
            this.props.onFetchProjects();
        }
    }
    
    render() {
        if (!this.props.isAuthenticated) {
            return <Redirect to="/login" />
        }

        let taskBoardLayout = null;
        if (this.props.statuses && this.props.projects) {
            taskBoardLayout = this.props.statuses.map((status, index) => {
                if (status.useBoard && index <= 4) {
                    return <Col xs={12} md={3} key={status.id}>
                        <Boards statusDetail={status} projects={this.props.projects} />
                    </Col>
                } else {
                    return null;
                }                
            })
        }        

        return (
            <Wrapper>
                <Container fluid>
                    <Row className="py-2">
                        {taskBoardLayout}
                    </Row>
                </Container>
            </Wrapper>
        )
    }
}

const mapStateToProps = state => {
    return {
        statuses: state.projects.statuses,
        isAuthenticated: state.auth.token !== null,
        projects: state.projects.projects
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchProjectStatuses: () => dispatch(actions.fetchProjectStatuses()),
        onFetchProjects: () => dispatch(actions.fetchProjects())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Projects);