import * as actionTypes from '../actions/actionTypes';

const initialState = {
    token: null,
    userId: null,
    hasEditAccess: false,
    loading: false,
    error: false
}

const authStart = (state, action) => {
    return {
        ...state,
        loading: true,
        error: false
    };
}

const authSuccess = (state, action) => {
    let hasEditAccess = false;
    if (action.userId === 'l7ciBJEi4NRB0qAiVD6KhKiQVfw2') {
        hasEditAccess = true;
    }
    return {
        ...state,
        token: action.token,
        userId: action.userId,
        hasEditAccess: hasEditAccess,
        loading: false,
        error: false
    };
}

const authFail = (state, action) => {
    return {
        ...state,
        loading: false,
        error: true
    };
}

const authLogout = (state, action) => {
    return {
        ...state,
        token: null,
        userId: null
    };
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return authStart(state, action);
        case actionTypes.AUTH_SUCCESS:
            return authSuccess(state, action);
        case actionTypes.AUTH_FAIL:
            return authFail(state, action);
        case actionTypes.AUTH_LOGOUT:
            return authLogout(state, action);
        default:
            return state;
    }
}

export default reducer;