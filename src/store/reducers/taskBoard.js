import * as actionTypes from '../actions/actionTypes';

const initialState = {
    status: null,
    workingOrders: null,
    error: false,
    loading: false,
    woProjects: null,
    woCustomers: null
}

const WOStatusDefaults = {
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
    "4": {
        scheme: 'Secondary',
        icon: 'check-circle',
        useBoard: true
    },
    "5": {
        scheme: 'Danger',
        icon: 'minus-circle',
        useBoard: false
    }
}

const setWOStatus = (state, action) => {
    let updatedStatusArray = null;
    updatedStatusArray = action.statusList.map((woStatus) => {
        return {
            ...WOStatusDefaults[woStatus.status],
            ...woStatus
        }
    });
    return {
        ...state,
        status: updatedStatusArray,
        error: false,
        loading: false
    }
}

const fetchWOStatusFailed = (state, action) => {
    return {
        ...state,
        error: true,
        loading: false
    }
}

const fetchStatusStart = (state, action) => {
    return {
        ...state,
        loading: true
    }
}

const fetchWOSuccess = (state, action) => {
    const statusId = action.statusId;
    const woGroupdByStatus = [];

    woGroupdByStatus[statusId] = action.workingOrders.map(woDetail => {
        return {
            ...woDetail,
            visible: true
        };
    });

    const updatedWorkingOrdersList = {
        ...state.workingOrders,
        [statusId]: woGroupdByStatus[statusId]
    };

    const updatedWOProjects = [];
    const updatedWOCustomers = [];
    for (const woDetail of action.workingOrders) {
        updatedWOProjects['project-' + woDetail.projectNo] = {
            projectNo: woDetail.projectNo,
            projectName: woDetail.projectName
        };
        updatedWOCustomers['customer-' + woDetail.customerNo] = {
            customerNo: woDetail.customerNo,
            customerName: woDetail.customerName
        };
    }

    return {
        ...state,
        workingOrders: updatedWorkingOrdersList,
        error: false,
        loading: false,
        woProjects: {
            ...state.woProjects,
            ...updatedWOProjects
        },
        woCustomers: {
            ...state.woCustomers,
            ...updatedWOCustomers
        }
    }
}

const fetchWOFailed = (state, action) => {
    return {
        ...state,
        error: true,
        loading: false
    }
}

const fetchWOStart = (state, action) => {
    return {
        ...state,
        error: false,
        loading: true
    }
}

const toggleTaskActions = (state, action) => {
    const woElement = {
        ...state.workingOrders[action.statusId]
    };
    const updatedWoElements = Object.keys(woElement).map(key => {
        if (key === action.index.toString()) {
            const updatedWoDetail = {
                ...woElement[key],
                showActions: action.showActions
            };
            return updatedWoDetail;
        }
        return woElement[key];
    });
    return {
        ...state,
        workingOrders: {
            ...state.workingOrders,
            [action.statusId]: updatedWoElements
        }
    }
}

const updateWOList = (state, action) => {

    let workingOrdersList = {
        ...state.workingOrders
    };
    if (action.params.oldStatus === action.params.newStatus) {
        const updatedList = state.workingOrders[action.params.newStatus].map((element, index) => {
            if (index === action.params.oldIndex) {
                return action.params.updatedWO;
            }
            return element;
        })
        workingOrdersList = {
            ...state.workingOrders,
            [action.params.oldStatus]: updatedList
        }
    } else {
        workingOrdersList[action.params.oldStatus].splice(action.params.oldIndex, 1);
        workingOrdersList[action.params.newStatus].splice(0, 0, action.params.updatedWO);
    }

    return {
        ...state,
        error: false,
        loading: true,
        workingOrders: workingOrdersList
    }
}

const filterWOList = (state, action) => {
    const woGroupdByStatus = [];
    for (const statusItem of state.status) {
        if (statusItem.useBoard) {
            const statusId = statusItem.status;
            woGroupdByStatus[statusId] = state.workingOrders[statusId].map(woDetail => {
                let visible = false;
                if (
                    (action.filters.project.value.toString() === "-1" && action.filters.customer.value.toString() === "-1") ||
                    (action.filters.customer.value.toString() === "-1" && action.filters.project.value.toString() === woDetail.projectNo.toString()) ||
                    (action.filters.project.value.toString() === "-1" && action.filters.customer.value.toString() === woDetail.customerNo.toString()) ||
                    (action.filters.project.value.toString() === woDetail.projectNo.toString() && action.filters.customer.value.toString() === woDetail.customerNo.toString())
                ) {
                    visible = true;
                }
                return {
                    ...woDetail,
                    visible: visible
                }
            });
        }
    }

    const updatedWorkingOrdersList = {
        ...state.workingOrders,
        ...woGroupdByStatus
    };


    return {
        ...state,
        workingOrders: updatedWorkingOrdersList
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_STATUS_SUCCESS:
            return setWOStatus(state, action);
        case actionTypes.FETCH_STATUS_FAILED:
            return fetchWOStatusFailed(state, action);
        case actionTypes.FETCH_STATUS_START:
            return fetchStatusStart(state, action);
        case actionTypes.FETCH_WO_START:
            return fetchWOStart(state, action);
        case actionTypes.FETCH_WO_FAILED:
            return fetchWOFailed(state, action);
        case actionTypes.FETCH_WO_SUCCESS:
            return fetchWOSuccess(state, action);
        case actionTypes.TOGGLE_TASK_ACTIONS:
            return toggleTaskActions(state, action);
        case actionTypes.UPDATE_WO_LIST:
            return updateWOList(state, action);
        case actionTypes.APPLY_FILTER_TO_WO_LIST:
            return filterWOList(state, action);
        default:
            return state;
    }
}

export default reducer;