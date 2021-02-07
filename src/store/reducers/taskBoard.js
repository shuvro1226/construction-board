import * as actionTypes from '../actions/actionTypes';
import { workingOrderModel } from '../../config/models/workingOrder';
import { filters } from '../../config/models/filters';

const initialState = {
    status: null,
    workingOrders: null,
    error: false,
    loading: false,
    woProjects: null,
    woCustomers: null,
    showWOModal: false,
    createMode: false,
    woDetail: workingOrderModel,
    oldWODetail: workingOrderModel,
    woTasks: null,
    woFilters: filters,
    employees: null
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

const toggleWOModal = (state, action) => {
    let workingOrderData = {};
    if (action.woDetail) {
        for (const [key, elements] of Object.entries(state.woDetail)) {
            let updatedValue = state.woDetail[key].value;
            if (action.woDetail[key]) {
                updatedValue = action.woDetail[key];
            }
            workingOrderData[key] = {
                ...elements,
                value: updatedValue
            }
        }
    } else {
        workingOrderData = workingOrderModel
    }

    return {
        ...state,
        showWOModal: action.showModal,
        woDetail: workingOrderData,
        oldWODetail: workingOrderData,
        createMode: action.isCreate
    }
}

const updateWOEditFormElement = (state, action) => {
    return {
        ...state,
        woDetail: action.woFields
    };
}

const updateFilterElement = (state, action) => {
    return {
        ...state,
        woFilters: action.woFilters
    };
}

const saveWOStart = (state, action) => {
    return {
        ...state,
        loading: true,
        error: false
    };
}

const saveWOSuccess = (state, action) => {
    const oldStatus = state.oldWODetail.status.value;
    let workingOrdersList = {
        ...state.workingOrders
    };

    if (action.woDetail.status.toString() !== oldStatus.toString() && oldStatus !== -1) {
        const oldProjectNo = state.oldWODetail.projectNo.value,
            oldWorkingOrderNo = state.oldWODetail.workingOrderNo.value,
            oldIndex = state.workingOrders[oldStatus].findIndex(element => element.projectNo === oldProjectNo && element.workingOrderNo === oldWorkingOrderNo);


        workingOrdersList[oldStatus].splice(oldIndex, 1);
    }

    return {
        ...state,
        loading: false,
        error: false,
        workingOrders: workingOrdersList
    };
}

const saveWOFail = (state, action) => {
    return {
        ...state,
        loading: false,
        error: true
    };
}

const fetchTasksStart = (state, action) => {
    return {
        ...state,
        loading: true,
        error: false
    };
}

const fetchTasksSuccess = (state, action) => {
    return {
        ...state,
        woTasks: action.response,
        loading: false,
        error: false
    };
}

const fetchTasksFail = (state, action) => {
    return {
        ...state,
        loading: false,
        error: true
    };
}

const fetchEmployeesStart = (state, action) => {
    return {
        ...state,
        loading: true,
        error: false
    }
}

const fetchEmployeesSuccess = (state, action) => {
    return {
        ...state,
        employees: action.response,
        loading: false,
        error: false
    }
}

const fetchEmployeesFail = (state, action) => {
    return {
        ...state,
        loading: false,
        error: true
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
        case actionTypes.TOGGLE_WO_MODAL:
            return toggleWOModal(state, action);
        case actionTypes.FORM_ELEMENT_CHANGE:
            return updateWOEditFormElement(state, action);
        case actionTypes.FILTER_ELEMENT_CHANGE:
            return updateFilterElement(state, action);
        case actionTypes.UPDATE_WO_START:
            return saveWOStart(state, action);
        case actionTypes.UPDATE_WO_SUCCESS:
            return saveWOSuccess(state, action);
        case actionTypes.UPDATE_WO_FAIL:
            return saveWOFail(state, action);
        case actionTypes.FETCH_TASKS_START:
            return fetchTasksStart(state, action);
        case actionTypes.FETCH_TASKS_SUCCESS:
            return fetchTasksSuccess(state, action);
        case actionTypes.FETCH_TASKS_FAIL:
            return fetchTasksFail(state, action);
        case actionTypes.FETCH_EMPLOYEES_START:
            return fetchEmployeesStart(state, action);
        case actionTypes.FETCH_EMPLOYEES_SUCCESS:
            return fetchEmployeesSuccess(state, action);
        case actionTypes.FETCH_EMPLOYEES_FAIL:
            return fetchEmployeesFail(state, action);
        default:
            return state;
    }
}

export default reducer;