import React, { Component } from 'react';
import { connect } from 'react-redux';
import Wrapper from '../Wrapper/Wrapper';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import * as actions from '../../store/actions/index';

class Layout extends Component {

    showWOEditModal = () => {
        this.props.onToggleWOModal(true, null, true);
    }

    render() {
        return (
            <Wrapper>
                <Toolbar showCreateWOModal={this.showWOEditModal} />
                <main className="my-5 py-4">
                    {this.props.children}
                </main>
            </Wrapper>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onToggleWOModal: (showModal, woDetail, createMode) => dispatch(actions.toggleWOModal(showModal, woDetail, createMode))
    }
}

export default connect(null, mapDispatchToProps)(Layout);