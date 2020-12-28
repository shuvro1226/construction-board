import * as actionTypes from './actionTypes';
import * as apiConstants from '../../config/constants';
import axios from '../../config/axios-config';

export const toggleWOModal = (showModal, woDetail) => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.TOGGLE_WO_MODAL,
            showModal: showModal,
            woDetail: woDetail
        });
    }
}

export const formElementChange = (updatedFields) => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.FORM_ELEMENT_CHANGE,
            woFields: updatedFields
        })
    }
}

export const updateWOStart = () => {
    return {
        type: actionTypes.UPDATE_WO_START
    }
}

export const updateWOSuccess = (response) => {
    return {
        type: actionTypes.UPDATE_WO_SUCCESS,
        response: response
    }
}

export const updateWOFail = (err) => {
    return {
        type: actionTypes.UPDATE_WO_FAIL,
        error: err
    }
}

export const updateWorkingOrder = (updatedWOData) => {
    return (dispatch) => {
        dispatch(updateWOStart());
        axios.put(apiConstants.WORKING_ORDERS, updatedWOData)
            .then(response => {
                dispatch(updateWOSuccess(response.data));
            })
            .catch(error => {
                dispatch(updateWOFail(error));
            })
    }
}