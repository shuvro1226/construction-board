export const workingOrderModel = {
    projectNo: {
        elementType: 'select',
        elementConfig: null,
        elementUIConfig: {
            grid: 'col-12'
        },
        defaultOptions: null,
        value: 0,
        alias: 'projectNo',
        displayText: 'Project',
        addToRequest: true,
        disabledOnEdit: true
    },
    projectYear: {
        elementType: 'input',
        elementConfig: {
            type: 'hidden'
        },
        elementUIConfig: null,
        value: 0,
        alias: 'projectYear'
    },
    customerNo: {
        elementType: 'select',
        elementConfig: null,
        elementUIConfig: {
            grid: 'col-12'
        },
        defaultOptions: null,
        value: 0,
        alias: 'customerNo',
        displayText: 'Customer',
        disabledOnEdit: true
    },
    workingOrderNo: {
        elementType: 'input',
        elementConfig: {
            type: 'hidden'
        },
        elementUIConfig: null,
        value: 0,
        alias: 'workingOrderNo',
        addToRequest: true
    },
    description: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'Enter working order title',
            readOnly: false
        },
        elementUIConfig: {
            grid: 'col-12'
        },
        value: '',
        alias: 'shortDescription',
        displayText: 'Title',
        addToRequest: true
    },
    detailDescription: {
        elementType: 'textarea',
        elementConfig: null,
        elementUIConfig: {
            grid: 'col-12'
        },
        value: '',
        alias: 'longDescription',
        displayText: 'Description',
        addToRequest: true
    },
    status: {
        elementType: 'select',
        elementConfig: null,
        elementUIConfig: {
            grid: 'col-12 col-md-6'
        },
        defaultOptions: null,
        value: 0,
        alias: 'status',
        displayText: 'Status',
        addToRequest: true
    },
    totalBookedHours: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            readOnly: true
        },
        elementUIConfig: {
            grid: 'col-12 col-md-6'
        },
        value: '',
        displayText: 'Total Planned Hours',
        isDate: false
    },
    executionStartDate: {
        elementType: 'input',
        elementConfig: {
            type: 'text'
        },
        elementUIConfig: {
            grid: 'col-12 col-md-6'
        },
        value: '',
        alias: 'startDate',
        displayText: 'Start Date',
        isDate: true,
        addToRequest: true
    },
    executionEndDate: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            readOnly: false
        },
        elementUIConfig: {
            grid: 'col-12 col-md-6'
        },
        value: '',
        alias: 'endDate',
        displayText: 'End Date',
        isDate: true,
        addToRequest: true
    }
}