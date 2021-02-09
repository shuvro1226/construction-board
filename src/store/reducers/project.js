import * as actionTypes from '../actions/actionTypes';

const initialState = {
    projectDetails: null,
    projectWorkingOrders: null,
    loading: false,
    error: false
}

const fetchProjectStart = (state, action) => {
    return {
        ...state,
        loading: true,
        error: false
    };
}

const fetchProjectSuccess = (state, action) => {
    return {
        ...state,
        projectDetails: action.response,
        loading: false,
        error: false
    };
}

const fetchProjectFail = (state, action) => {
    return {
        ...state,
        loading: false,
        error: true
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
    return {
        ...state,
        projectWorkingOrders: action.response,
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
        case actionTypes.FETCH_PROJECT_START:
            return fetchProjectStart(state, action);
        case actionTypes.FETCH_PROJECT_SUCCESS:
            return fetchProjectSuccess(state, action);
        case actionTypes.FETCH_PROJECT_FAIL:
            return fetchProjectFail(state, action);
        case actionTypes.FETCH_PROJECT_WO_START:
            return fetchProjectWOStart(state, action);
        case actionTypes.FETCH_PROJECT_WO_SUCCESS:
            return fetchProjectWOSuccess(state, action);
        case actionTypes.FETCH_PROJECT_WO_FAIL:
            return fetchProjectWOFail(state, action);
        case actionTypes.DRAG_PROJECT_WO_CHANGE_STATUS:
            return updateWOListAfterDrag(state, action);
        default:
            return state;
    }
}

export default reducer;