import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import ConstructionBoard from './containers/ConstructionBoard/ConstructionBoard';
import Projects from './containers/Projects/Projects';
import Project from './containers/Projects/Project/Project';
import Loader from './components/UI/Loader/Loader';
import Auth from './containers/Auth/Auth';
import * as actions from './store/actions/index';

import './assets/js/fontawesome';
import './App.css';

class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSignUp();
    document.title = "Construction Board";
  }

  render() {
    let loader = null;
    if (this.props.taskBoardLoading || this.props.authLoading || this.props.projectsLoading) {
        loader = <Loader />;
    }
    let routes = (
      <Switch>
        <Route path="/login" component={Auth} />
        <Redirect to="/login" />
      </Switch>
    );
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/projects/:id/:year" component={Project} />
          <Route path="/projects" component={Projects} />
          <Route path="/" exact component={ConstructionBoard} />
          <Redirect to="/" />
        </Switch>
      );
    }
    return (
      <div>
          <Layout>
            {routes}
          </Layout>
          {loader}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
      taskBoardLoading: state.taskBoard.loading,
      authLoading: state.auth.loading,
      projectsLoading: state.projects.loading,
      isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));