import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card } from 'react-bootstrap';
import moment from 'moment';

import Toast from '../../../components/UI/Toast/Toast';
import Wrapper from '../../../hoc/Wrapper/Wrapper';
import * as actions from '../../../store/actions/index';
import styles from './Boards.module.css';

class Boards extends Component {
    componentDidMount() {
        if (!this.props.projects) {
            this.props.onProjectsGetByStatus(this.props.statusDetail.id);
        }
    }

    showProjectEditModal = (projectDetails) => {
        this.props.history.push('/project/' + projectDetails.projectNo + '/' + projectDetails.fiscalYearKey);
        // this.props.onToggleProjectModal(true, projectDetails, false);
    }

    render() {
        let cardHeaderStyles = [
            'text-white',
            styles.TextCapitalize
        ];  

        let boardContent = null;
        if (this.props.projects && this.props.projects[this.props.statusDetail.id]) {
            boardContent = this.props.projects[this.props.statusDetail.id].map((project, index) => {        
                if (index < 10 && project.projectName !== "" && project.customerDisplayName !== "" && project.visible) {

                    const taskHeader = <Wrapper>
                        <strong className="mr-auto">{project.customerDisplayName}</strong>
                        <small>{moment(project.projectValidStartDate).fromNow()}</small>
                    </Wrapper>;            
                    
                    return <Toast 
                        key={project.projectNo} 
                        header={taskHeader}
                        headerIcon="user-tie"
                        toastAction={() => this.showProjectEditModal(project)}>
                            {project.projectName}
                    </Toast>;
                }
                return null;
            });
        } else {
            boardContent = <p className="text-light">No projects available. Try filtering the board!</p>
        }

        return (
            <Card bg={this.props.statusDetail.scheme.toLowerCase()}>
                <Card.Header as="h5" className={cardHeaderStyles.join(' ')}>
                    <FontAwesomeIcon icon={this.props.statusDetail.icon} /> {this.props.statusDetail.name}
                </Card.Header>
                <Card.Body>
                    <Card.Text as="div">
                        {boardContent}
                    </Card.Text>
                </Card.Body>
            </Card>
        );
    }
}

const mapStateToProps = state => {
    return {
        projects: state.projects.projects
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onProjectsGetByStatus: (statusId) => dispatch(actions.fetchProjectsByStatus(statusId))//,
        // onToggleProjectModal: (showModal, woDetail, createMode) => dispatch(actions.toggleWOModal(showModal, woDetail, createMode))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Boards));