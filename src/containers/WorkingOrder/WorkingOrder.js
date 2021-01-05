import React, { Component } from "react";
import { connect } from 'react-redux';
import Wrapper from '../../hoc/Wrapper/Wrapper';
import EditWorkingOrder from './Edit/Edit';
import CreateWorkingOrder from './Create/Create';


class WorkingOrder extends Component {
    render() {
        let workingOrderForm = <EditWorkingOrder />;
        if (this.props.isCreateWO) {
            workingOrderForm = <CreateWorkingOrder />;
        }

        return (
            <Wrapper>
                {workingOrderForm}
            </Wrapper>
        )
    }
}

const mapStateToProps = state => {
    return {
        isCreateWO: state.taskBoard.createMode
    }
}

export default connect(mapStateToProps)(WorkingOrder);