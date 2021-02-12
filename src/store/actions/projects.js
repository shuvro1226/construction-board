import * as actionTypes from './actionTypes';
import * as apiConstants from '../../config/constants';
import axios from '../../config/axios-config';
import moment from 'moment';

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
        axios.get(apiConstants.GET_PROJECT_STATUSES)
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

export const fetchProjectsByStatus = (statusId, filters = null) => {
    let url = apiConstants.GET_PROJECTS_BY_STATUS + statusId;
    if (filters) {
        if (filters.projectNo.value.toString() !== "-1") {
            url += '&filter[projectNo][eq]=' + filters.projectNo.value;
        }
        if (filters.customerNo.value.toString() !== "-1") {
            url += '&filter[customerNo][eq]=' + filters.customerNo.value;
        }
        if (filters.taskSelection.value.toString() !== "-1") {
            url += '&filter[taskName][like]=' + filters.taskSelection.value;
        }
        url += '&filter[plannedDate][gte]=' + moment(filters.executionStartDate.value, 'YYYY-MM-DDThh:mm:ss').format('YYYY-MM-DD');
        url += '&filter[plannedDate][lte]=' + moment(filters.executionEndDate.value, 'YYYY-MM-DDThh:mm:ss').format('YYYY-MM-DD');
    } else {
        url += '&filter[projectValidStartDate][gte]=' + moment().clone().startOf('month').format('YYYY-MM-DD');
        url += '&filter[projectValidStartDate][lte]=' + moment().clone().endOf('month').format('YYYY-MM-DD')
    }

    return (dispatch) => {
        dispatch(fetchProjectsStart());
        axios.get(url + apiConstants.GET_PROJECTS_PARTIALS)
            .then(res => {
                dispatch(fetchProjectsSuccess(res.data, statusId));
            })
            .catch(err => {
                dispatch(fetchProjectsFailed(err));
            });
    }
}

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
        axios.get(apiConstants.GET_PROJECT_WO + projectNo + apiConstants.GET_WO_PARTIALS + apiConstants.GET_WO_ALIAS)
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

export const changeProjectWOStatus = (result) => {
    return (dispatch) => {
        dispatch(updateWOListAfterDrag(result));

        const uniqueKey = result.draggableId.split('-');
        const updatedWOData = [{
            projectNo: parseInt(uniqueKey[0]),
            workingOrderNo: parseInt(uniqueKey[1]),
            status: parseInt(result.destination.droppableId)
        }];
        const config = {
            method: 'put',
            url: apiConstants.WORKING_ORDERS,
            data: updatedWOData
        }
        axios(config)
            .then(response => {
                dispatch(saveWOSuccess(response.data));
                dispatch(fetchProjectWorkingOrders(parseInt(uniqueKey[0]), null));
            })
            .catch(error => {
                dispatch(saveWOFail(error));
            })
    }
}