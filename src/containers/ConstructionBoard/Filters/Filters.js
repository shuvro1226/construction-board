import React, { Component } from "react";
import { connect } from 'react-redux';
import { Row, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { filters } from '../../../config/models/filters';
import * as actions from '../../../store/actions/index';

class Filters extends Component {

    state = {
        filters: filters
    }

    onFilterChanged = (event, key) => {
        let updatedFilterValue = {
            ...this.state.filters[key],
            value: event.target.value
        };

        this.setState({
            filters: {
                ...this.state.filters,
                [key]: updatedFilterValue
            }
        })
    }

    onApplyFilter = () => {
        this.props.onFetchFilteredTasks(this.state.filters);
    }

    render() {

        let filterOptions = {};
        if (this.props.projects) {
            filterOptions['project'] = Object.keys(this.props.projects).map(key => (
                <option key={key} value={this.props.projects[key].projectNo}>{this.props.projects[key].projectName}</option>
            ));
        }

        if (this.props.customers) {
            filterOptions['customer'] = Object.keys(this.props.customers).map(key => (
                <option key={key} value={this.props.customers[key].customerNo}>{this.props.customers[key].customerName}</option>
            ));
        }

        let filtersSelects = null;
        if (this.props.projects && this.props.customers) {
            filtersSelects = Object.keys(this.state.filters).map(key => (
                <div key={key} {...this.state.filters[key].elementUIConfig}>
                    <Form.Control
                        as="select"
                        value={this.state.filters[key].value}
                        onChange={(event) => this.onFilterChanged(event, key)}
                    >
                        <option value="-1">Select a {key}</option>
                        {filterOptions[key]}
                    </Form.Control>
                </div>
            ))
        }

        return (
            <Row className="py-2">
                {filtersSelects}     
                <div className="col-12 col-md-4 py-4">
                    <Button variant="primary" onClick={this.onApplyFilter}>
                        <FontAwesomeIcon icon="filter" /> Filter Tasks
                    </Button>                    
                </div>           
            </Row>
        )
    }
}

const mapStateToProps = state => {
    return {
        projects: state.taskBoard.woProjects,
        customers: state.taskBoard.woCustomers
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchFilteredTasks: (filters) => dispatch(actions.applyFiltersToWOList(filters))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filters);