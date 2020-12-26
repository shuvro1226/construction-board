import React, { Component } from "react";
import Wrapper from '../../hoc/Wrapper/Wrapper';
import Editor from './Edit/Edit';


class WorkingOrder extends Component {
    render() {
        return (
            <Wrapper>
                <Editor />     
            </Wrapper>
        )
    }
}

export default WorkingOrder;