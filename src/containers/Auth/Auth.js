import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap'; 
import { connect } from 'react-redux';
import { authModel } from '../../config/models/auth';
import Input from '../../components/UI/Input/Input';
import styles from './Auth.module.css';
import * as actions from '../../store/actions/index';

class Auth extends Component {

    state = {
        email: '',
        password: ''
    }

    authInputChanged = (event, field) => {
        this.setState({
            [field]: event.target.value
        })
    }

    authenticate = () => {
        this.props.onAuthenticate(this.state.email, this.state.password);
    }

    render() {
        let authFields = null;
        if (authModel) {
            authFields = Object.keys(authModel).map(authKey => {    
                if (authModel[authKey].loginField) {
                    return <div key={authKey} className={authModel[authKey].elementUIConfig ? authModel[authKey].elementUIConfig.grid : ''}>
                        <Input
                            config={authModel[authKey]}
                            element={authKey}
                            linkedTo=""
                            value={this.state[authKey]}
                            changed={(event) => this.authInputChanged(event, authKey)}
                        />
                    </div>
                }
                return null;
            })      
        }

        return (    
            <Container>
                <Row className="justify-content-md-center mt-5">
                    <Col xs="4" className={styles.AuthForm}>
                        <Row>
                            {authFields}
                            <Col xs="12">
                                <Button variant="success" onClick={this.authenticate}>
                                    Login
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>                
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuthenticate: (email, password) => dispatch(actions.authenticate(email, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);