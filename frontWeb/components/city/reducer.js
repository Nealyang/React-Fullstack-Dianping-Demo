import * as actionTypes from './actionTypes'

export default function cities(state=[],action) {
    switch (action.type){
        case actionTypes.RESOLVE_CITY_DATA:
            return action.data;
        default :
            return state;
    }
}