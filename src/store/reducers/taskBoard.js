import * as actionTypes from '../actions/actionTypes';

const initialState = {
    status: null,
    workingOrders: null,
    error: false,
    loading: false
}

const WOStatusDefaults = {
    'recorded': {
        scheme: 'Info',
        icon: 'file-medical-alt',
        useBoard: true
    },
    'pre-planned': {
        scheme: 'Warning',
        icon: 'balance-scale-left',
        useBoard: true
    },
    'planned': {
        scheme: 'Success',
        icon: 'balance-scale',
        useBoard: true
    },
    'finished': {
        scheme: 'Secondary',
        icon: 'check-circle',
        useBoard: true
    },
    'deleted': {
        scheme: 'Danger',
        icon: 'minus-circle',
        useBoard: false
    }
}

const setWOStatus = (state, action) => {
    let updatedStatusArray = null;
    updatedStatusArray = action.statusList.map((woStatus) => {
        return {
            ...WOStatusDefaults[woStatus.displayText],
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
    const status = action.status;
    const woGroupdByStatus = [];

    woGroupdByStatus[status.displayText] = action.workingOrders.map(woDetail => {
        return woDetail;
    });

    const updatedWorkingOrdersList = {
        ...state.workingOrders,
        [status.displayText]: woGroupdByStatus[status.displayText]
    };

    return {
        ...state,
        workingOrders: updatedWorkingOrdersList,
        error: false,
        loading: false
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
        default:
            return state;
    }
}

export default reducer;