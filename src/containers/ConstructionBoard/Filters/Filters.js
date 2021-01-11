import React, { Component } from "react";
import { connect } from 'react-redux';
import { Row, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import Input from '../../../components/UI/Input/Input';
import * as actions from '../../../store/actions/index';

class Filters extends Component {

    onFilterChangedHandler = (event, element) => {
        let updatedValue;
        if (element.config.isDate) {
            let updatedDate = event.year + '-' + event.month + '-' + event.day;
            updatedValue = moment(updatedDate, "YYYY-MM-DD").format("YYYY-MM-DDThh:mm:ss");
        } else {
            updatedValue = event.target.value;
        }         
        if (['projectNo','customerNo'].includes(element.id)) {
            updatedValue = parseInt(updatedValue);
        }
        const updatedFilterValue = {
            ...this.props.filters,
            [element.id]: {
                ...this.props.filters[element.id],
                value: updatedValue
            }
        }

        this.props.onFilterChange(updatedFilterValue);
    }

    onApplyFilter = () => {
        if (this.props.status) {
            for (const statusDetail of this.props.status) {
                this.props.onWoGetByStatus(statusDetail.status, this.props.filters);
            }
        }
    }

    render() {

        const filtersArray = [];

        if (this.props.filters) {
            for (let key in this.props.filters) {
                let defaultOptions = null;
                if (key === 'projectNo' && this.props.projects) {
                    defaultOptions = Object.keys(this.props.projects).map(key => {
                        return {
                            value: this.props.projects[key].projectNo,
                            displayText: this.props.projects[key].projectName
                        }
                    });                
                }
                if (key === 'customerNo' && this.props.customers) {
                    defaultOptions = Object.keys(this.props.customers).map(key => {
                        return {
                            value: this.props.customers[key].customerNo,
                            displayText: this.props.customers[key].customerName
                        }
                    });
                }
                if (key === 'taskSelection' && this.props.tasks) {
                    defaultOptions = this.props.tasks.map(taskDetail => {
                        return {
                            value: taskDetail.task.toString(),
                            displayText: taskDetail.title
                        }
                    });
                }
                const config = {
                    ...this.props.filters[key],
                    defaultOptions: defaultOptions
                }
                filtersArray.push({
                    id: key,
                    config: config,
                    linkedTo: ''
                })
            }
        }

        let filtersSelects = null;
        if (filtersArray.length > 0) {
            filtersSelects = filtersArray.map(field => {       
                return <div key={field.id} className={field.config.elementUIConfig ? field.config.elementUIConfig.grid : ''}>
                    <Input
                        config={field.config}
                        element={field.id}
                        linkedTo={field.linkedTo}
                        linkClicked={null}
                        isCreate={true}
                        changed={(event) => this.onFilterChangedHandler(event, field)}
                    />
                </div>
            })
        }

        return (
            <Row className="py-2">
                {filtersSelects}     
                <div className="col-12 col-md-2">
                    <Button variant="primary" onClick={this.onApplyFilter}>
                        <FontAwesomeIcon icon="filter" /> Filter
                    </Button>                    
                </div>           
            </Row>
        )
    }
}

const mapStateToProps = state => {
    return {
        status: state.taskBoard.status,
        projects: state.taskBoard.woProjects,
        customers: state.taskBoard.woCustomers,
        tasks: state.taskBoard.woTasks,
        filters: state.taskBoard.woFilters
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onWoGetByStatus: (statusId, filters) => dispatch(actions.fetchWOByStatus(statusId, filters)),
        onFilterChange: (updatedFields) => dispatch(actions.filterChange(updatedFields))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filters);