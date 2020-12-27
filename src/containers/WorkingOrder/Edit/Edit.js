import React, { Component } from "react";
import { connect } from 'react-redux';
import EditForm from '../../../components/WOEditForm/WOEditForm';
import Modal from '../../../components/UI/Modal/Modal';
import * as actions from '../../../store/actions/index';


class WorkingOrder extends Component {

    onModalClose = () => {
        this.props.onToggleWOModal(false, null);
    }

    onModalSubmit = () => {
        this.props.onToggleWOModal(false, null);
    }

    onFieldChanged = (event) => {
        console.log(event);
    }

    render() {
        return (            
            <Modal
                modalShow={this.props.showWOModal}
                modalClose={this.onModalClose}
                modalTitle="Edit Working Order"
                modalSubmit={this.onModalSubmit}
                modalSize="lg"
            >
                <EditForm 
                    workingOrderFields={this.props.workingOrderFields}
                    statusList={this.props.status}
                    onFieldChanged={(event) => this.onFieldChanged(event)} />
            </Modal>
        )
    }
}

const mapStateToProps = state => {
    return {
        showWOModal: state.workingOrder.showWOModal,
        workingOrderFields: state.workingOrder.woDetail,
        status: state.taskBoard.status
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onToggleWOModal: (showModal, woDetail) => dispatch(actions.toggleWOModal(showModal, woDetail))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkingOrder);