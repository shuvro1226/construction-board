export const workingOrderModel = {
    projectNo: {
        elementType: 'input',
        elementConfig: {
            type: 'hidden',
            readOnly: false
        },
        elementUIConfig: null,
        value: 0,
        alias: 'projectNo'
    },
    projectName: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            readOnly: true
        },
        elementUIConfig: {
            grid: 'col-12'
        },
        value: '',
        displayText: 'Project Name',
        isDate: false
    },
    customerName: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            readOnly: true
        },
        elementUIConfig: {
            grid: 'col-12'
        },
        value: '',
        displayText: 'Customer Name',
        isDate: false
    },
    workingOrderNo: {
        elementType: 'input',
        elementConfig: {
            type: 'hidden',
            readOnly: false
        },
        elementUIConfig: null,
        value: 0,
        alias: 'workingOrderNo'
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
        isDate: false
    },
    detailDescription: {
        elementType: 'textarea',
        elementUIConfig: {
            grid: 'col-12'
        },
        value: '',
        alias: 'longDescription',
        displayText: 'Description'
    },
    status: {
        elementType: 'select',
        elementConfig: {
            readOnly: false
        },
        elementUIConfig: {
            grid: 'col-12 col-md-6'
        },
        value: 0,
        alias: 'status',
        displayText: 'Status'
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
            type: 'text',
            readOnly: false
        },
        elementUIConfig: {
            grid: 'col-12 col-md-6'
        },
        value: '',
        alias: 'startDate',
        displayText: 'Start Date',
        isDate: true
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
        isDate: true
    }
}