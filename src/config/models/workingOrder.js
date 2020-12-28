export const workingOrderModel = {
    projectNo: {
        elementType: 'input',
        elementConfig: {
            type: 'hidden'
        },
        value: 0
    },
    workingOrderNo: {
        elementType: 'input',
        elementConfig: {
            type: 'hidden'
        },
        value: 0
    },
    description: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'Enter working order title'
        },
        value: '',
        alias: 'shortDescription',
        displayText: 'Title',
        isDate: false
    },
    detailDescription: {
        elementType: 'textarea',
        value: '',
        alias: 'longDescription',
        displayText: 'Description'
    },
    editBy: {
        elementType: 'input',
        elementConfig: {
            type: 'hidden'
        },
        value: 289
    },
    createDate: {
        elementType: 'input',
        elementConfig: {
            type: 'text'
        },
        value: '',
        alias: 'creationDate',
        displayText: 'Creation Date',
        isDate: true
    },
    status: {
        elementType: 'select',
        elementConfig: null,
        value: 0,
        displayText: 'Status'
    },
    executionStartDate: {
        elementType: 'input',
        elementConfig: {
            type: 'text'
        },
        value: '',
        alias: 'startDate',
        displayText: 'Start Date',
        isDate: true
    },
    executionEndDate: {
        elementType: 'input',
        elementConfig: {
            type: 'text'
        },
        value: '',
        alias: 'endDate',
        displayText: 'End Date',
        isDate: true
    }
}