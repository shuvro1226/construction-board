import * as actionTypes from '../actions/actionTypes';

const initialState = {
    token: null,
    userId: null,
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
    return {
        ...state,
        token: action.response.idToken,
        userId: action.response.userId,
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