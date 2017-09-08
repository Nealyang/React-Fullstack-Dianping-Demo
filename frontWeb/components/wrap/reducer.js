import * as actionTypes from './actionTypes'
import {combineReducers} from 'redux'

const initialState = {};

function userInfo(state = initialState,action) {
    switch (action.type){
        case actionTypes.USERINFO_UPDATE:
            return action.data;
        default:
            return state;
    }
}
//start end error
function fetchState(state='end',action) {
    switch (action.type){
        case actionTypes.START_FETCH:
            return 'start';
        case actionTypes.FETCH_ERROR:
            return 'error';
        case actionTypes.FETCH_END:
            return 'end';
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    userInfo,
    fetchState
});

export default rootReducer
