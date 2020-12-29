import * as actionTypes from '../actions/actionTypes';
import { workingOrderModel } from '../../config/models/workingOrder';

const initialState = {
    showWOModal: false,
    woDetail: workingOrderModel,
    oldWODetail: workingOrderModel,
    loading: false,
    error: false
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
        oldWODetail: workingOrderData
    }
}

const updateWOEditFormElement = (state, action) => {
    return {
        ...state,
        woDetail: action.woFields
    };
}

const updateWOStart = (state, action) => {
    return {
        ...state,
        loading: true,
        error: false
    };
}

const updateWOSuccess = (state, action) => {
    return {
        ...state,
        loading: false,
        error: false
    };
}

const updateWOFail = (state, action) => {
    return {
        ...state,
        loading: false,
        error: true
    };
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.TOGGLE_WO_MODAL:
            return toggleWOModal(state, action);
        case actionTypes.FORM_ELEMENT_CHANGE:
            return updateWOEditFormElement(state, action);
        case actionTypes.UPDATE_WO_START:
            return updateWOStart(state, action);
        case actionTypes.UPDATE_WO_SUCCESS:
            return updateWOSuccess(state, action);
        case actionTypes.UPDATE_WO_FAIL:
            return updateWOFail(state, action);
        default:
            return state;
    }
}

export default reducer;