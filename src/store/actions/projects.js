import * as actionTypes from './actionTypes';
import * as apiConstants from '../../config/firebase/constants';
import * as axios from '../../config/firebase/axios-config';

export const fetchProjectStatusStart = () => {
    return {
        type: actionTypes.FETCH_PROJECT_STATUS_START
    }
}

export const fetchProjectStatusSuccess = (statusData) => {
    return {
        type: actionTypes.FETCH_PROJECT_STATUS_SUCCESS,
        status: statusData
    }
}

export const fetchProjectStatusFail = (error) => {
    return {
        type: actionTypes.FETCH_PROJECT_STATUS_FAILED,
        error: error
    }
}

export const fetchProjectStatuses = () => {
    return (disptach) => {
        disptach(fetchProjectStatusStart());
        axios.dbInstance.get(apiConstants.GET_PROJECT_STATUSES)
            .then(response => {
                disptach(fetchProjectStatusSuccess(response.data));
            })
            .catch(error => {
                disptach(fetchProjectStatusSuccess(error));
            });
    }
}

export const fetchProjectsStart = () => {
    return {
        type: actionTypes.FETCH_PROJECTS_START
    }
}

export const fetchProjectsSuccess = (projectsData, statusId) => {
    return {
        type: actionTypes.FETCH_PROJECTS_SUCCESS,
        projects: projectsData,
        statusId: statusId
    }
}

export const fetchProjectsFailed = (error) => {
    return {
        type: actionTypes.FETCH_PROJECTS_FAILED,
        error: error
    }
}

export const fetchProjects = () => {
    let url = apiConstants.GET_PROJECTS;

    return (dispatch) => {
        dispatch(fetchProjectsStart());
        axios.dbInstance.get(url)
            .then(res => {
                dispatch(fetchProjectsSuccess(res.data));
            })
            .catch(err => {
                dispatch(fetchProjectsFailed(err));
            });
    }
}

export const fetchProject = (projectID) => {
    return {
        type: actionTypes.FETCH_PROJECT_DETAILS,
        projectID: projectID
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

export const fetchProjectWorkingOrders = (projectID) => {
    return (dispatch) => {
        dispatch(fetchProjectWOStart());
        axios.dbInstance.get(apiConstants.GET_PROJECT_WO + '"' + projectID + '"')
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
        type: actionTypes.DRAG_PROJECT_WO_CHANGE_STATUS,
        result: result
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

export const changeProjectWOStatus = (result, projectNo) => {
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
                dispatch(fetchProjectWorkingOrders(projectNo, null));
                dispatch(fetchWOByStatus(result.source.droppableId));
                dispatch(fetchWOByStatus(result.destination.droppableId));
            })
            .catch(error => {
                dispatch(saveWOFail(error));
            })
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

export const fetchCustomersStart = () => {
    return {
        type: actionTypes.FETCH_CUSTOMERS_START
    };
}

export const fetchCustomersSuccess = (customers) => {
    return {
        type: actionTypes.FETCH_CUSTOMERS_SUCCESS,
        customers: customers
    };
}

export const fetchCustomersFail = (error) => {
    return {
        type: actionTypes.FETCH_CUSTOMERS_FAIL,
        error: error
    };
}

export const fetchCustomers = (state, action) => {
    return (dispatch) => {
        dispatch(fetchCustomersStart());
        axios.dbInstance.get(apiConstants.GET_CUSTOMERS)
            .then(response => {
                dispatch(fetchCustomersSuccess(response.data))
            })
            .catch(error => {
                dispatch(fetchCustomersFail(error))
            })
    }
}