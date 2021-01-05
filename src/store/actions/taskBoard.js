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

export const applyFiltersToWOList = (filters) => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.APPLY_FILTER_TO_WO_LIST,
            filters: filters
        })
    }
}

export const toggleWOModal = (showModal, woDetail, createMode) => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.TOGGLE_WO_MODAL,
            showModal: showModal,
            woDetail: woDetail,
            isCreate: createMode
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

export const saveWOStart = () => {
    return {
        type: actionTypes.UPDATE_WO_START
    }
}

export const saveWOSuccess = (response) => {
    return {
        type: actionTypes.UPDATE_WO_SUCCESS,
        response: response
    }
}

export const saveWOFail = (err) => {
    return {
        type: actionTypes.UPDATE_WO_FAIL,
        error: err
    }
}

export const saveWorkingOrder = (updatedWOData, isCreate) => {
    return (dispatch) => {
        dispatch(saveWOStart());
        let method = 'put';
        if (isCreate) {
            method = 'post';
        }
        let config = {
            method: method,
            url: apiConstants.WORKING_ORDERS,
            data: updatedWOData
        }
        axios(config)
            .then(response => {
                dispatch(saveWOSuccess(response.data));
                dispatch(fetchWOByStatus(updatedWOData[0].status));
            })
            .catch(error => {
                dispatch(saveWOFail(error));
            })
    }
}

export const fetchTasksStart = () => {
    return {
        type: actionTypes.FETCH_TASKS_START
    }
}

export const fetchTasksSuccess = (response) => {
    return {
        type: actionTypes.FETCH_TASKS_SUCCESS,
        response: response
    }
}

export const fetchTasksFail = (err) => {
    return {
        type: actionTypes.FETCH_TASKS_FAIL,
        error: err
    }
}

export const fetchTasks = () => {
    return (dispatch) => {
        dispatch(fetchTasksStart());
        let config = {
            method: 'get',
            url: apiConstants.GET_WO_TASKS
        };
        axios(config)
            .then(response => {
                dispatch(fetchTasksSuccess(response.data));
            })
            .catch(error => {
                dispatch(fetchTasksFail(error));
            })
    }
}