import * as actionTypes from './actionTypes'
import {combineReducers} from 'redux'

function resolveADData(state=[],action) {
    switch (action.type){
        case actionTypes.GET_AD_RESULT_DATA:
            return action.data;
        default :
            return []
    }
}
const rootReducer = combineReducers({
    adData:resolveADData
});

export default rootReducer