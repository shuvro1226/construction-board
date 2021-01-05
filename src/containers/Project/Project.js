import React, { Component } from "react";
import { connect } from 'react-redux';
import { Container } from 'react-bootstrap';
import Wrapper from '../../hoc/Wrapper/Wrapper';
import ProjectDetails from '../../components/ProjectDetails/ProjectDetails';
import * as actions from '../../store/actions/index';

class Project extends Component {

    componentDidMount () {
        this.props.onFetchProjectDetails(this.props.match.params.id, this.props.match.params.year);
        this.props.onFetchProjectWO(this.props.match.params.id);
    }

    render() {
        let projectDetails = null;
        if (this.props.project && this.props.workingOrders && this.props.statusList) {
            projectDetails = <ProjectDetails 
                project={this.props.project} 
                workingOrders={this.props.workingOrders}
                statusList={this.props.statusList}
            />;
        }
        return (
            <Wrapper>
                <Container>
                    {projectDetails}
                </Container>
            </Wrapper>
        )
    }
}

const mapStateToProps = state => {
    return {
        project: state.project.projectDetails,
        workingOrders: state.project.projectWorkingOrders,
        statusList: state.taskBoard.status
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchProjectDetails: (projectNo, projectYear) => dispatch(actions.fetchProject(projectNo, projectYear)),
        onFetchProjectWO: (projectNo) => dispatch(actions.fetchProjectWorkingOrders(projectNo))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Project);