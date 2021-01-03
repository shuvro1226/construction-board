import * as actionTypes from './actionTypes';
import * as apiConstants from '../../config/constants';
import axios from '../../config/axios-config';

export const fetchProjectStart = () => {
    return {
        type: actionTypes.FETCH_PROJECT_START
    }
}

export const fetchProjectSuccess = (response) => {
    return {
        type: actionTypes.FETCH_PROJECT_SUCCESS,
        response: response
    }
}

export const fetchProjectFail = (err) => {
    return {
        type: actionTypes.FETCH_PROJECT_FAIL,
        error: err
    }
}

export const fetchProject = (projectNo, projectYear) => {
    return (dispatch) => {
        dispatch(fetchProjectStart());
        axios.get(apiConstants.GET_PROJECT_DETAILS + projectNo + '/' + projectYear)
            .then(response => {
                dispatch(fetchProjectSuccess(response.data));
            })
            .catch(error => {
                dispatch(fetchProjectFail(error));
            })
    }
}

export const fetchProjectWOStart = () => {
    return {
        type: actionTypes.FETCH_PROJECT_WO_START
    }
}

export const fetchProjectWOSuccess = (response) => {
    return {
        type: actionTypes.FETCH_PROJECT_WO_SUCCESS,
        response: response
    }
}

export const fetchProjectWOFail = (err) => {
    return {
        type: actionTypes.FETCH_PROJECT_WO_FAIL,
        error: err
    }
}

export const fetchProjectWorkingOrders = (projectNo) => {
    return (dispatch) => {
        dispatch(fetchProjectWOStart());
        axios.get(apiConstants.GET_PROJECT_WO + projectNo + apiConstants.GET_WO_PARTIALS)
            .then(response => {
                dispatch(fetchProjectWOSuccess(response.data));
            })
            .catch(error => {
                dispatch(fetchProjectWOFail(error));
            })
    }
}