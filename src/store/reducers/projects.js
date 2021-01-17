import * as actionTypes from '../actions/actionTypes';

const initialState = {
    projects: null,
    statuses: null,
    loading: false,
    error: null
}

const ProjectStatusDefaults = {
    "1": {
        scheme: 'Info',
        icon: 'file-medical-alt',
        useBoard: true
    },
    "2": {
        scheme: 'Warning',
        icon: 'balance-scale-left',
        useBoard: true
    },
    "3": {
        scheme: 'Success',
        icon: 'balance-scale',
        useBoard: false
    },
    "4": {
        scheme: 'Success',
        icon: 'check-circle',
        useBoard: true
    },
    "5": {
        scheme: 'Secondary',
        icon: 'minus-circle',
        useBoard: true
    },
    "6": {
        scheme: 'Danger',
        icon: 'minus-circle',
        useBoard: false
    }
}

const fetchProjectStatusStart = (state, action) => {
    return {
        ...state,
        loading: true,
        error: null
    }
}

const fetchProjectStatusSuccess = (state, action) => {
    let updatedStatusArray = null;
    updatedStatusArray = action.status.map((projectStatus) => {
        return {
            ...ProjectStatusDefaults[projectStatus.id],
            ...projectStatus
        }
    });

    return {
        ...state,
        statuses: updatedStatusArray,
        loading: false,
        error: null
    }
}

const fetchProjectStatusFail = (state, action) => {
    return {
        ...state,
        loading: false,
        error: action.error
    }
}

const fetchProjectsStart = (state, action) => {
    return {
        ...state,
        loading: true,
        error: null
    }
}

const fetchProjectsSuccess = (state, action) => {
    const statusId = action.statusId;
    const projectGroupdByStatus = [];

    projectGroupdByStatus[statusId] = action.projects.map(project => {
        return {
            ...project,
            visible: true
        };
    });

    const updatedProjects = {
        ...state.projects,
        [statusId]: projectGroupdByStatus[statusId]
    };

    return {
        ...state,
        projects: updatedProjects,
        loading: false,
        error: null
    }
}

const fetchProjectsFailed = (state, action) => {
    return {
        ...state,
        loading: false,
        error: action.error
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_PROJECT_STATUS_START:
            return fetchProjectStatusStart(state, action);
        case actionTypes.FETCH_PROJECT_STATUS_SUCCESS:
            return fetchProjectStatusSuccess(state, action);
        case actionTypes.FETCH_PROJECT_STATUS_FAILED:
            return fetchProjectStatusFail(state, action);
        case actionTypes.FETCH_PROJECTS_START:
            return fetchProjectsStart(state, action);
        case actionTypes.FETCH_PROJECTS_SUCCESS:
            return fetchProjectsSuccess(state, action);
        case actionTypes.FETCH_PROJECTS_FAILED:
            return fetchProjectsFailed(state, action);
        default:
            return state;
    }
}

export default reducer;