import React, { Component } from 'react';
import { connect } from 'react-redux';
import Wrapper from '../Wrapper/Wrapper';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import WorkingOrder from '../../containers/Modals/WorkingOrder/WorkingOrder';
import * as actions from '../../store/actions/index';

class Layout extends Component {

    state = {
        searchText: ''
    }

    showWOEditModal = () => {
        const woDetail = {
            projectNo: window.location.pathname.split('/')[2]
        };
        this.props.onToggleWOModal(true, woDetail, true);
    }

    logoutHandler = () => {
        this.props.onLogout();
    }

    onSearchTaskBoard = (event) => {
        this.setState({
            searchText: event.target.value
        });
        this.props.onBoardSearchInit(event.target.value);
    }

    render() {   
        return (
            <Wrapper>
                {
                    this.props.isAuthenticated ? 
                        <Toolbar 
                            showCreateWOModal={this.showWOEditModal} 
                            logout={this.logoutHandler} 
                            hasEditAccess={this.props.hasEditAccess}
                            searchTaskBoard={(event) => this.onSearchTaskBoard(event)}
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
        isAuthenticated: state.auth.token !== null,
        hasEditAccess: state.auth.hasEditAccess
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onToggleWOModal: (showModal, woDetail, createMode) => dispatch(actions.toggleWOModal(showModal, woDetail, createMode)),
        onLogout: () => dispatch(actions.logoutUser()),
        onBoardSearchInit: (value) => dispatch(actions.searchTaskBoard(value))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);