import * as actionTypes from '../actions/actionTypes';
import { workingOrderModel } from '../../config/models/workingOrder';

const initialState = {
    status: null,
    workingOrders: null,
    error: false,
    loading: false,
    woProjects: null,
    woCustomers: null,
    showWOModal: false,
    createMode: false,
    woDetail: workingOrderModel
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

const toggleWOModal = (state, action) => {
    let workingOrderData = {};
    if (action.woDetail) {
        for (const [key, elements] of Object.entries(state.woDetail)) {
            let updatedValue = action.woDetail[key];
            if (state.woDetail[key].alias) {
                updatedValue = action.woDetail[state.woDetail[key].alias]
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
        createMode: action.isCreate
    }
}

const updateWOEditFormElement = (state, action) => {
    return {
        ...state,
        woDetail: action.woFields
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
    return {
        ...state,
        loading: false,
        error: false
    };
}

const saveWOFail = (state, action) => {
    return {
        ...state,
        loading: false,
        error: true
    };
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
        case actionTypes.APPLY_FILTER_TO_WO_LIST:
            return filterWOList(state, action);
        case actionTypes.TOGGLE_WO_MODAL:
            return toggleWOModal(state, action);
        case actionTypes.FORM_ELEMENT_CHANGE:
            return updateWOEditFormElement(state, action);
        case actionTypes.UPDATE_WO_START:
            return saveWOStart(state, action);
        case actionTypes.UPDATE_WO_SUCCESS:
            return saveWOSuccess(state, action);
        case actionTypes.UPDATE_WO_FAIL:
            return saveWOFail(state, action);
        default:
            return state;
    }
}

export default reducer;