import React, { Component } from 'react';
import Wrapper from '../Wrapper/Wrapper';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';

class Layout extends Component {
    render() {
        return (
            <Wrapper>
                <Toolbar />
                <main className="my-5 py-4">
                    {this.props.children}
                </main>
            </Wrapper>
        )
    }
}

export default Layout;