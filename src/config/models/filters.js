import moment from 'moment';

export const filters = {
    customerNo: {
        elementType: 'select',
        elementConfig: null,
        elementUIConfig: {
            grid: 'col-12 col-md-2'
        },
        defaultOptions: null,
        defaultOption: 'Select a customer',
        value: "-1"
    },
    projectNo: {
        elementType: 'select',
        elementConfig: null,
        elementUIConfig: {
            grid: 'col-12 col-md-2'
        },
        defaultOptions: null,
        defaultOption: 'Select a project',
        value: "-1"
    },
    taskSelection: {
        elementType: 'select',
        elementConfig: null,
        elementUIConfig: {
            grid: 'col-12 col-md-2'
        },
        defaultOptions: null,
        defaultOption: 'Select task',
        value: "-1"
    },
    executionStartDate: {
        elementType: 'input',
        elementConfig: {
            type: 'text'
        },
        elementUIConfig: {
            grid: 'col-12 col-md-2'
        },
        value: moment().clone().startOf('month').format('YYYY-MM-DDThh:mm:ss'),
        isDate: true
    },
    executionEndDate: {
        elementType: 'input',
        elementConfig: {
            type: 'text'
        },
        elementUIConfig: {
            grid: 'col-12 col-md-2'
        },
        value: moment().clone().endOf('month').format('YYYY-MM-DDThh:mm:ss'),
        isDate: true
    }
}