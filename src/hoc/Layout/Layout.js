import React, { Component } from 'react';
import { connect } from 'react-redux';
import Wrapper from '../Wrapper/Wrapper';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import * as actions from '../../store/actions/index';
import Loader from '../../components/UI/Loader/Loader';

class Layout extends Component {

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
        projectLoading: state.project.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onToggleWOModal: (showModal, woDetail, createMode) => dispatch(actions.toggleWOModal(showModal, woDetail, createMode))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);