import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';

import Wrapper from '../../hoc/Wrapper/Wrapper';
import TaskBoards from './TaskBoards/TaskBoards';
import * as actions from '../../store/actions/index';
import WorkingOrder from '../WorkingOrder/WorkingOrder';
import Filters from './Filters/Filters';

class ConstructionBoard extends Component {
    componentDidMount() {
        if (!this.props.status) {
            this.props.onFetchStatus();
        }
    }

    render() {
        let taskBoardLayout = null;

        if (this.props.status) {
            taskBoardLayout = this.props.status.map(status => {
                if (status.useBoard) {
                    return <Col xs={12} md={3} key={status.status}>
                        <TaskBoards statusDetail={status} />
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
                        {taskBoardLayout}
                    </Row>
                </Container>
                <WorkingOrder />
            </Wrapper>
        )
    }
}

const mapStateToProps = state => {
    return {
        status: state.taskBoard.status
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchStatus: () => dispatch(actions.fetchStatus())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConstructionBoard);