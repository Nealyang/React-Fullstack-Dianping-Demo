import * as actionTypes from './actionTypes'

export default function orderDetail(state={},action) {
    switch (action.type){
        case actionTypes.RESOLVE_ORDER_DETAIL_DATA:
            return action.data;
        default:
            return state
    }
}