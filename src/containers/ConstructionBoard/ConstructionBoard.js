import React, { Component } from 'react';
import { Container } from 'react-bootstrap';

import Wrapper from '../../hoc/Wrapper/Wrapper';
import TaskBoards from './TaskBoards/TaskBoards';

class ConstructionBoard extends Component {
    render() {
        return (
            <Wrapper>
                <Container fluid>
                    <TaskBoards />
                </Container>
            </Wrapper>
        )
    }
}

export default ConstructionBoard;