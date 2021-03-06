import moment from 'moment';

export const workingOrderModel = {
    customerNo: {
        elementType: 'select',
        elementConfig: null,
        elementUIConfig: {
            grid: 'col-12'
        },
        defaultOptions: null,
        defaultOption: 'Select a customer',
        value: -1,
        displayText: 'Customer',
        addToCreateRequest: true,
        disabledOnEdit: true
    },
    projectNo: {
        elementType: 'select',
        elementConfig: null,
        elementUIConfig: {
            grid: 'col-12'
        },
        defaultOptions: null,
        defaultOption: 'Select a project',
        value: -1,
        displayText: 'Project',
        addToEditRequest: true,
        addToCreateRequest: true,
        disabledOnEdit: true,
    },
    projectYear: {
        elementType: 'input',
        elementConfig: {
            type: 'hidden'
        },
        elementUIConfig: null,
        value: 0
    },
    workingOrderNo: {
        elementType: 'input',
        elementConfig: {
            type: 'hidden'
        },
        elementUIConfig: null,
        value: 0,
        addToEditRequest: true
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
        displayText: 'Title',
        addToEditRequest: true,
        addToCreateRequest: true
    },
    detailDescription: {
        elementType: 'textarea',
        elementConfig: null,
        elementUIConfig: {
            grid: 'col-12'
        },
        value: '',
        displayText: 'Description',
        addToEditRequest: true,
        addToCreateRequest: true
    },
    status: {
        elementType: 'select',
        elementConfig: null,
        elementUIConfig: {
            grid: 'col-12 col-md-6'
        },
        defaultOptions: null,
        defaultOption: 'Select working order status',
        value: -1,
        displayText: 'Status',
        addToEditRequest: true,
        addToCreateRequest: true
    },
    taskSelection: {
        elementType: 'select',
        elementConfig: null,
        elementUIConfig: {
            grid: 'col-12 col-md-6'
        },
        defaultOptions: null,
        defaultOption: 'Select task',
        value: '',
        displayText: 'Task',
        addToEditRequest: true,
        addToCreateRequest: true
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
        hideOnCreate: true
    },
    executionStartDate: {
        elementType: 'input',
        elementConfig: {
            type: 'text'
        },
        elementUIConfig: {
            grid: 'col-12 col-md-6'
        },
        value: moment().format('YYYY-MM-DDThh:mm:ss'),
        displayText: 'Start Date',
        isDate: true,
        addToEditRequest: true,
        addToCreateRequest: true
    },
    executionEndDate: {
        elementType: 'input',
        elementConfig: {
            type: 'text'
        },
        elementUIConfig: {
            grid: 'col-12 col-md-6'
        },
        value: moment().add(7, 'days').format('YYYY-MM-DDThh:mm:ss'),
        displayText: 'End Date',
        isDate: true,
        addToEditRequest: true,
        addToCreateRequest: true
    },
    plannedDate: {
        elementType: 'input',
        elementConfig: {
            type: 'text'
        },
        elementUIConfig: {
            grid: 'col-12 col-md-4'
        },
        value: moment().format('YYYY-MM-DDThh:mm:ss'),
        displayText: 'Plan Date',
        isDate: true
    },
    planData: {
        elementType: 'headline',
        elementConfig: null,
        elementUIConfig: {
            grid: 'col-12 my-2'
        },
        value: '',
        displayText: 'Disposition'
    },
    startTime: {
        elementType: 'input',
        elementConfig: {
            type: 'text'
        },
        elementUIConfig: {
            grid: 'col-12 col-md-4'
        },
        value: '08:00',
        displayText: 'Plan Start Time',
        isTime: true,
        addToEditRequest: true,
        addToCreateRequest: true,
        parent: 'planData'
    },
    endTime: {
        elementType: 'input',
        elementConfig: {
            type: 'text'
        },
        elementUIConfig: {
            grid: 'col-12 col-md-4'
        },
        value: '17:00',
        displayText: 'Plan End Time',
        isTime: true,
        addToEditRequest: true,
        addToCreateRequest: true,
        parent: 'planData'
    },
    workingHours: {
        elementType: 'input',
        elementConfig: {
            type: 'number'
        },
        elementUIConfig: {
            grid: 'col-12 col-md-4'
        },
        value: 0.0,
        displayText: 'Working Hours',
        addToEditRequest: true,
        addToCreateRequest: true,
        parent: 'planData'
    },
    duration: {
        elementType: 'input',
        elementConfig: {
            type: 'number'
        },
        elementUIConfig: {
            grid: 'col-12 col-md-4'
        },
        value: 0.0,
        displayText: 'Duration',
        addToEditRequest: true,
        addToCreateRequest: true,
        parent: 'planData'
    },
    travelTime: {
        elementType: 'input',
        elementConfig: {
            type: 'number'
        },
        elementUIConfig: {
            grid: 'col-12 col-md-4'
        },
        value: 0.0,
        displayText: 'Travel Time',
        addToEditRequest: true,
        addToCreateRequest: true,
        parent: 'planData'
    }
}