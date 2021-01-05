export const workingOrderModel = {
    projectNo: {
        elementType: 'select',
        elementConfig: null,
        elementUIConfig: {
            grid: 'col-12'
        },
        defaultOptions: null,
        defaultOption: 'Select a project',
        value: -1,
        alias: 'projectNo',
        displayText: 'Project',
        addToEditRequest: true,
        addToCreateRequest: true,
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
        defaultOption: 'Select a customer',
        value: -1,
        alias: 'customerNo',
        displayText: 'Customer',
        addToCreateRequest: true,
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
        alias: 'shortDescription',
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
        alias: 'longDescription',
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
        alias: 'status',
        displayText: 'Status',
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
        value: '',
        alias: 'endDate',
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
        value: '',
        alias: 'plannedDate',
        displayText: 'Plan Date',
        isDate: true
    },
    startTime: {
        elementType: 'input',
        elementConfig: {
            type: 'text'
        },
        elementUIConfig: {
            grid: 'col-12 col-md-4'
        },
        value: '',
        alias: 'plannedStartTime',
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
        value: '',
        alias: 'plannedEndTime',
        displayText: 'Plan End Time',
        isTime: true,
        addToEditRequest: true,
        addToCreateRequest: true,
        parent: 'planData'
    },
    workingHours: {
        elementType: 'input',
        elementConfig: {
            type: 'text'
        },
        elementUIConfig: {
            grid: 'col-12 col-md-4'
        },
        value: 0.0,
        alias: 'plannedWorkloadHours',
        displayText: 'Working Hours',
        addToEditRequest: true,
        addToCreateRequest: true,
        parent: 'planData'
    },
    duration: {
        elementType: 'input',
        elementConfig: {
            type: 'text'
        },
        elementUIConfig: {
            grid: 'col-12 col-md-4'
        },
        value: 0.0,
        alias: 'plannedDuration',
        displayText: 'Duration',
        addToEditRequest: true,
        addToCreateRequest: true,
        parent: 'planData'
    },
    travelTime: {
        elementType: 'input',
        elementConfig: {
            type: 'text'
        },
        elementUIConfig: {
            grid: 'col-12 col-md-4'
        },
        value: 0.0,
        alias: 'plannedTravelTime',
        displayText: 'Travel Time',
        addToEditRequest: true,
        addToCreateRequest: true,
        parent: 'planData'
    }
}