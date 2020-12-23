import React, { Component } from "react";
import { Row, Col } from 'react-bootstrap';
import axios from '../../../config/axios-config';

import TaskBoard from '../../../components/TaskBoard/TaskBoard';

class TaskBoards extends Component {
    state = {
        availableTaskStatusDefaults: {            
            1: {
                scheme: 'Info',
                icon: 'file-medical-alt',
                useBoard: true
            },
            2: {
                scheme: 'Warning',
                icon: 'balance-scale-left',
                useBoard: true
            },
            3: {
                scheme: 'Success',
                icon: 'balance-scale',
                useBoard: true
            },
            4: {
                scheme: 'Secondary',
                icon: 'check-circle',
                useBoard: true
            },
            5: {
                scheme: 'Danger',
                icon: 'minus-circle',
                useBoard: false
            }
        },
        fetchedStatus: null
    }

    componentDidMount() {
        // VERO API constants
        // const FETCH_WO_STATUS = 'v3/workingorders/status';

        // Firebase API constants
        const FETCH_WO_STATUS = 'statusList.json';

        axios.get(FETCH_WO_STATUS)
            .then(res => {
                let updatedStatusArray = null;
                updatedStatusArray = res.data.map(woStatus => {
                    return {
                        ...this.state.availableTaskStatusDefaults[woStatus.status],
                        ...woStatus
                    }
                });
                this.setState({
                    fetchedStatus: updatedStatusArray
                })
            });
    }

    render() {
        let taskBoardLayout = null;

        if (this.state.fetchedStatus) {
            taskBoardLayout = this.state.fetchedStatus.map(status => {
                if (status.useBoard) {
                    return <Col xs={12} md={3} key={status.displayText}>
                        <TaskBoard status={status} />
                    </Col>
                } else {
                    return null;
                }                
            })
        }        

        return (
            <Row>
                {taskBoardLayout}
            </Row>
        )
    }
}

export default TaskBoards;