import * as actionTypes from './actionTypes'
import {combineReducers} from 'redux'

function resolveADData(state=[],action) {
    switch (action.type){
        case actionTypes.GET_AD_RESULT_DATA:
            return action.data;
        default :
            return state
    }
}
function resolveULikeData(state=[],action) {
    switch (action.type){
        case actionTypes.GET_U_LIKE_RESULT_DATA:
            return [...state,...action.data];
        default :
            return state
    }
}

const rootReducer = combineReducers({
    adData:resolveADData,
    guessULike:resolveULikeData
});

export default rootReducer