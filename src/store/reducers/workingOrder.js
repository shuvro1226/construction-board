import * as actionTypes from '../actions/actionTypes';

const initialState = {
    showWOModal: false,
    woDetail: null
}

const toggleWOModal = (state, action) => {
    return {
        ...state,
        showWOModal: action.showModal,
        woDetail: action.woDetail
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.TOGGLE_WO_MODAL:
            return toggleWOModal(state, action);
        default:
            return state;
    }
}

export default reducer;