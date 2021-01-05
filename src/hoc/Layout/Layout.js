import React, { Component } from 'react';
import { connect } from 'react-redux';
import Wrapper from '../Wrapper/Wrapper';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import * as actions from '../../store/actions/index';
import Loader from '../../components/UI/Loader/Loader';

class Layout extends Component {

    componentDidMount() {
        if (!this.props.status) {
            this.props.onFetchStatus();
        }
        if (!this.props.woTasks) {
            this.props.onFetchTaskSelections();
        }
    }

    showWOEditModal = () => {
        this.props.onToggleWOModal(true, null, true);
    }

    render() {
        let loader = null;
        if (this.props.taskBoardLoading || this.props.projectLoading) {
            loader = <Loader />;
        }
        return (
            <Wrapper>
                <Toolbar showCreateWOModal={this.showWOEditModal} />
                <main className="my-5 py-4">
                    {this.props.children}
                </main>
                {loader}
            </Wrapper>
        )
    }
}

const mapStateToProps = state => {
    return {
        taskBoardLoading: state.taskBoard.loading,
        projectLoading: state.project.loading,
        woTasks: state.taskBoard.woTasks
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchStatus: () => dispatch(actions.fetchStatus()),
        onToggleWOModal: (showModal, woDetail, createMode) => dispatch(actions.toggleWOModal(showModal, woDetail, createMode)),
        onFetchTaskSelections: () => dispatch(actions.fetchTasks())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);