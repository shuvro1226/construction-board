import * as actionTypes from '../actions/actionTypes';

const initialState = {
    projects: null,
    customers: null,
    statuses: null,
    projectDetails: null,
    projectWorkingOrders: null,
    loading: false,
    error: null
}

const ProjectStatusDefaults = {
    "1": {
        scheme: 'Info',
        icon: 'file-medical-alt',
        useBoard: true
    },
    "2": {
        scheme: 'Warning',
        icon: 'balance-scale-left',
        useBoard: true
    },
    "3": {
        scheme: 'Success',
        icon: 'balance-scale',
        useBoard: true
    },
    "5": {
        scheme: 'Secondary',
        icon: 'minus-circle',
        useBoard: true
    },
    "6": {
        scheme: 'Danger',
        icon: 'minus-circle',
        useBoard: false
    }
}

const fetchProjectStatusStart = (state, action) => {
    return {
        ...state,
        loading: true,
        error: null
    }
}

const fetchProjectStatusSuccess = (state, action) => {
    let updatedStatusArray = null;
    updatedStatusArray = action.status.map((projectStatus) => {
        return {
            ...ProjectStatusDefaults[projectStatus.id],
            ...projectStatus
        }
    });

    return {
        ...state,
        statuses: updatedStatusArray,
        loading: false,
        error: null
    }
}

const fetchProjectStatusFail = (state, action) => {
    return {
        ...state,
        loading: false,
        error: action.error
    }
}

const fetchProjectsStart = (state, action) => {
    return {
        ...state,
        loading: true,
        error: null
    }
}

const fetchProjectsSuccess = (state, action) => {
    let projects = {
        ...action.projects
    }
    for (const [key, project] of Object.entries(action.projects)) {
        projects = {
            ...projects,
            [key]: {
                ...project,
                visible: true,
                hideOption: false
            }
        }
    }

    return {
        ...state,
        projects: projects,
        loading: false,
        error: null
    }
}

const fetchProjectsFailed = (state, action) => {
    return {
        ...state,
        loading: false,
        error: action.error
    }
}

const fetchProjectDetails = (state, action) => {
    const projectDetails = {
        ...state.projects[action.projectID],
        projectNo: action.projectID
    }
    return {
        ...state,
        projectDetails: projectDetails,
        loading: false,
        error: false
    };
}

const fetchProjectWOStart = (state, action) => {
    return {
        ...state,
        loading: true,
        error: false
    };
}

const fetchProjectWOSuccess = (state, action) => {
    const projectWorkingOrders = Object.keys(action.response).map(key => {
        return {
            ...action.response[key],
            uniqueKey: key,
            visible: true
        };
    });
    return {
        ...state,
        projectWorkingOrders: projectWorkingOrders,
        loading: false,
        error: false
    };
}

const fetchProjectWOFail = (state, action) => {
    return {
        ...state,
        loading: false,
        error: true
    };
}

const fetchCustomersStart = (state, action) => {
    return {
        ...state,
        loading: true,
        error: false
    };
}

const fetchCustomersSuccess = (state, action) => {
    let customers = {
        ...action.customers
    }
    for (const [key, customer] of Object.entries(action.customers)) {
        customers = {
            ...customers,
            [key]: {
                ...customer,
                visible: true,
                hideOption: false
            }
        }
    }
    return {
        ...state,
        customers: customers,
        loading: false,
        error: false
    };
}

const fetchCustomersFail = (state, action) => {
    return {
        ...state,
        loading: false,
        error: true
    };
}

const updateWOListAfterDrag = (state, action) => {
    let workingOrders = [
        ...state.projectWorkingOrders
    ];

    const updateData = action.result;

    workingOrders = workingOrders.map(workingOrder => {
        let updatedWorkingOrder = {
            ...workingOrder
        };
        if (workingOrder.uniqueKey === updateData.draggableId) {
            updatedWorkingOrder = {
                ...workingOrder,
                status: parseInt(updateData.destination.droppableId)
            }
        }
        return updatedWorkingOrder;
    })

    return {
        ...state,
        projectWorkingOrders: workingOrders
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_PROJECT_STATUS_START:
            return fetchProjectStatusStart(state, action);
        case actionTypes.FETCH_PROJECT_STATUS_SUCCESS:
            return fetchProjectStatusSuccess(state, action);
        case actionTypes.FETCH_PROJECT_STATUS_FAILED:
            return fetchProjectStatusFail(state, action);
        case actionTypes.FETCH_PROJECTS_START:
            return fetchProjectsStart(state, action);
        case actionTypes.FETCH_PROJECTS_SUCCESS:
            return fetchProjectsSuccess(state, action);
        case actionTypes.FETCH_PROJECTS_FAILED:
            return fetchProjectsFailed(state, action);
        case actionTypes.FETCH_PROJECT_DETAILS:
            return fetchProjectDetails(state, action);
        case actionTypes.FETCH_PROJECT_WO_START:
            return fetchProjectWOStart(state, action);
        case actionTypes.FETCH_PROJECT_WO_SUCCESS:
            return fetchProjectWOSuccess(state, action);
        case actionTypes.FETCH_PROJECT_WO_FAIL:
            return fetchProjectWOFail(state, action);
        case actionTypes.FETCH_CUSTOMERS_START:
            return fetchCustomersStart(state, action);
        case actionTypes.FETCH_CUSTOMERS_SUCCESS:
            return fetchCustomersSuccess(state, action);
        case actionTypes.FETCH_CUSTOMERS_FAIL:
            return fetchCustomersFail(state, action);
        case actionTypes.DRAG_PROJECT_WO_CHANGE_STATUS:
            return updateWOListAfterDrag(state, action);
        default:
            return state;
    }
}

export default reducer;