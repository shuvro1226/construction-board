export const workingOrderModel = {
    projectNo: {
        type: 'hidden',
        value: 0
    },
    workingOrderNo: {
        type: 'hidden',
        value: 0
    },
    description: {
        type: 'text',
        value: '',
        alias: 'shortDescription',
        displayText: 'Title',
        isDate: false
    },
    detailDescription: {
        type: 'textarea',
        value: '',
        alias: 'longDescription',
        displayText: 'Description'
    },
    editBy: {
        type: 'hidden',
        value: 289
    },
    createDate: {
        type: 'text',
        value: '',
        alias: 'creationDate',
        displayText: 'Creation Date',
        isDate: true
    },
    status: {
        type: 'select',
        value: 0,
        displayText: 'Status'
    },
    executionStartDate: {
        type: 'text',
        value: '',
        alias: 'startDate',
        displayText: 'Start Date',
        isDate: true
    },
    executionEndDate: {
        type: 'text',
        value: '',
        alias: 'endDate',
        displayText: 'End Date',
        isDate: true
    }
}