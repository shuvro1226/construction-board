import * as actionTypes from '../actions/actionTypes';
import { workingOrderModel } from '../../config/models/workingOrder';

const initialState = {
    showWOModal: false,
    woDetail: workingOrderModel
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
        woDetail: workingOrderData
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.TOGGLE_WO_MODAL:
            return toggleWOModal(state, action);
        case actionTypes.FORM_ELEMENT_CHANGE:
            return {
                ...state,
                woDetail: action.woFields
            };
        default:
            return state;
    }
}

export default reducer;