import * as actionTypes from './actionTypes';
import * as apiConstants from '../../config/firebase/constants';
import * as axios from '../../config/firebase/axios-config';

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
        axios.dbInstance.get(apiConstants.GET_WO_STATUS)
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
    let url = apiConstants.GET_WO_BY_STATUS + statusId;
    return (dispatch) => {
        dispatch(fetchWOStart());
        axios.dbInstance.get(url)
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

export const saveWOSuccess = (response, woDetail) => {
    return {
        type: actionTypes.UPDATE_WO_SUCCESS,
        response: response,
        woDetail: woDetail
    }
}

export const saveWOFail = (err) => {
    return {
        type: actionTypes.UPDATE_WO_FAIL,
        error: err
    }
}

export const saveWorkingOrder = (updatedWOData, isCreate, fromProject) => {
    return (dispatch) => {
        dispatch(saveWOStart());
        let method = 'put';
        let url = 'workingOrders/' + updatedWOData.uniqueKey + '.json';
        delete updatedWOData.uniqueKey;
        if (isCreate) {
            method = 'post';
            url = apiConstants.WORKING_ORDERS;
        }
        let config = {
            method: method,
            url: url,
            data: updatedWOData
        }
        axios.dbInstance(config)
            .then(response => {
                dispatch(saveWOSuccess(response.data, updatedWOData));
                dispatch(fetchWOByStatus(updatedWOData.status));
                setTimeout(() => {
                    dispatch(toggleWOModal(false, null, false));
                }, 500);
                if (fromProject) {
                    dispatch(fetchProjectWorkingOrders(updatedWOData.projectNo));
                }
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
        axios.dbInstance(config)
            .then(response => {
                dispatch(fetchTasksSuccess(response.data));
            })
            .catch(error => {
                dispatch(fetchTasksFail(error));
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
        axios.dbInstance.get(apiConstants.GET_PROJECT_WO + '"' + projectNo + '"')
            .then(response => {
                dispatch(fetchProjectWOSuccess(response.data));
            })
            .catch(error => {
                dispatch(fetchProjectWOFail(error));
            })
    }
}

export const updateWOListAfterDrag = (result) => {
    return {
        type: actionTypes.DRAG_WO_CHANGE_STATUS,
        result: result
    }
}

export const changeWOStatus = (result) => {
    return (dispatch) => {
        dispatch(updateWOListAfterDrag(result));

        const url = 'workingOrders/' + result.draggableId + '/status.json';
        const config = {
            method: 'put',
            url: url,
            data: parseInt(result.destination.droppableId)
        }
        axios.dbInstance(config)
            .then(response => {
                dispatch(saveWOSuccess(response.data));
                dispatch(fetchWOByStatus(parseInt(result.destination.droppableId)));
                dispatch(fetchWOByStatus(parseInt(result.source.droppableId)));
            })
            .catch(error => {
                dispatch(saveWOFail(error));
            })
    }
}

export const searchTaskBoard = (value) => {
    return {
        type: actionTypes.SEARCH_WORKING_ORDER_BOARD,
        value: value
    }
}

export const onFilterWOList = (statusID, filters) => {
    return {
        type: actionTypes.FILTER_WO_LIST,
        statusID: statusID,
        filters: filters
    }
}