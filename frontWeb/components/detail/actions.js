import * as actionTypes from './actionTypes'

export function getDetail(url,data) {
    return{
        type:actionTypes.GET_ORDER_DETAIL,
        url,
        data
    }
}

