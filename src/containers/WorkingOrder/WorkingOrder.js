import React, { Component } from "react";
import Wrapper from '../../hoc/Wrapper/Wrapper';
import EditWorkingOrder from './Edit/Edit';


class WorkingOrder extends Component {
    render() {
        return (
            <Wrapper>
                <EditWorkingOrder />     
            </Wrapper>
        )
    }
}

export default WorkingOrder;