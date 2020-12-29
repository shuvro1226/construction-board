import * as actionTypes from './actionTypes';
import * as apiConstants from '../../config/constants';
import axios from '../../config/axios-config';

export const fetchStatusSuccess = (woStatusData) => {
    return {
        type: actionTypes.FETCH_STATUS_SUCCESS,
        statusList: woStatusData
    }
}

export const fetchStatusFailed = (error) => {
    return {
        type: actionTypes.FETCH_STATUS_FAILED
    }
}

export const fetchStatusStart = () => {
    return {
        type: actionTypes.FETCH_STATUS_START
    }
}

export const fetchStatus = () => {
    return (dispatch) => {
        dispatch(fetchStatusStart());
        axios.get(apiConstants.GET_WO_STATUS)
            .then(res => {
                dispatch(fetchStatusSuccess(res.data));
            })
            .catch(err => {
                dispatch(fetchStatusFailed(err));
            });
    }
}

export const fetchWOSuccess = (workingOrdersList, statusId) => {
    return {
        type: actionTypes.FETCH_WO_SUCCESS,
        workingOrders: workingOrdersList,
        statusId: statusId
    }
}

export const fetchWOFailed = (error) => {
    return {
        type: actionTypes.FETCH_WO_FAILED
    }
}

export const fetchWOStart = () => {
    return {
        type: actionTypes.FETCH_WO_START
    }
}

export const fetchWOByStatus = (statusId) => {
    return (dispatch) => {
        dispatch(fetchWOStart());
        axios.get(apiConstants.GET_WO_BY_STATUS + statusId + apiConstants.GET_WO_PARAMS)
            .then(res => {
                dispatch(fetchWOSuccess(res.data, statusId));
            })
            .catch(err => {
                dispatch(fetchWOFailed(err));
            });
    }
}

export const toggleTaskActions = (index, showActions, statusId) => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.TOGGLE_TASK_ACTIONS,
            statusId: statusId,
            index: index,
            showActions: showActions
        })
    }
}

export const updateWOList = (params) => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.UPDATE_WO_LIST,
            params: params
        })
    }
}