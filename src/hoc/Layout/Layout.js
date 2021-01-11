import React, { Component } from 'react';
import { connect } from 'react-redux';
import Wrapper from '../Wrapper/Wrapper';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import WorkingOrder from '../../containers/WorkingOrder/WorkingOrder';
import * as actions from '../../store/actions/index';

class Layout extends Component {

    showWOEditModal = () => {
        this.props.onToggleWOModal(true, null, true);
    }

    logoutHandler = () => {
        this.props.onLogout();
    }

    render() {   
        return (
            <Wrapper>
                {
                    this.props.isAuthenticated ? 
                        <Toolbar 
                            showCreateWOModal={this.showWOEditModal} 
                            logout={this.logoutHandler} 
                        /> 
                    : null                        
                }
                <main className="my-5 py-4">
                    {this.props.children}                               
                    <WorkingOrder />
                </main>     
            </Wrapper>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onToggleWOModal: (showModal, woDetail, createMode) => dispatch(actions.toggleWOModal(showModal, woDetail, createMode)),
        onLogout: () => dispatch(actions.logoutUser())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);