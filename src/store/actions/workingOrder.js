import * as actionTypes from './actionTypes';

export const toggleWOModal = (showModal, woDetail) => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.TOGGLE_WO_MODAL,
            showModal: showModal,
            woDetail: woDetail
        });
    }
}