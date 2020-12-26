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

export const fetchWOSuccess = (workingOrdersList, statusDetail) => {
    return {
        type: actionTypes.FETCH_WO_SUCCESS,
        workingOrders: workingOrdersList,
        status: statusDetail
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

export const fetchWOByStatus = (statusDetail) => {
    return (dispatch) => {
        dispatch(fetchWOStart());
        axios.get(apiConstants.GET_WO_BY_STATUS + statusDetail.status + apiConstants.GET_WO_PARAMS)
            .then(res => {
                dispatch(fetchWOSuccess(res.data, statusDetail));
            })
            .catch(err => {
                dispatch(fetchWOFailed(err));
            });
    }
}