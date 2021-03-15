import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card } from 'react-bootstrap';
import moment from 'moment';

import Toast from '../../../components/UI/Toast/Toast';
import Wrapper from '../../../hoc/Wrapper/Wrapper';
import styles from './Boards.module.css';

class Boards extends Component {

    showProjectDetails = (projectID) => {
        this.props.history.push('/projects/' + projectID);
    }

    render() {
        let cardHeaderStyles = [
            'text-white',
            styles.TextCapitalize
        ];  

        let boardContent = null;
        let projectsForBoard = null;
        if (this.props.projects) {
            projectsForBoard = Object.entries(this.props.projects).reduce((projects, [key, project]) => {
                if (project.status === this.props.statusDetail.id) {
                    projects[key] = project;
                }
                return projects;
            }, {});
        }
        if (Object.keys(projectsForBoard).length) {
            boardContent = Object.keys(projectsForBoard).map((key, index) => {        
                if (index < 10 && projectsForBoard[key].projectName !== "" && projectsForBoard[key].customerName !== "" && projectsForBoard[key].visible) {

                    const taskHeader = <Wrapper>
                        <strong className="mr-auto">{projectsForBoard[key].customerName}</strong>
                        <small>{moment(projectsForBoard[key].startDate).fromNow()}</small>
                    </Wrapper>;            
                    
                    return <Toast 
                        key={key} 
                        header={taskHeader}
                        headerIcon="user-tie"
                        toastAction={() => this.showProjectDetails(key)}>
                            {projectsForBoard[key].projectName}
                    </Toast>;
                }
                return null;
            });
        } else {
            boardContent = <p className="text-light">No projects available.</p>
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

export default withRouter(Boards);