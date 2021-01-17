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
    }
    
    render() {
        if (!this.props.isAuthenticated) {
            return <Redirect to="/login" />
        }

        let taskBoardLayout = null;
        if (this.props.statuses) {
            taskBoardLayout = this.props.statuses.map(status => {
                if (status.useBoard) {
                    return <Col xs={12} md={3} key={status.id}>
                        <Boards statusDetail={status} />
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
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchProjectStatuses: () => dispatch(actions.fetchProjectStatuses())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Projects);