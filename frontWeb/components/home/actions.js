import * as actionTypes from './actionTypes'

export function getAd(url) {
    return {
        type:actionTypes.GET_AD,
        url
    }
}

export function getLike(url) {
    return{
        type:actionTypes.GET_U_LIKE,
        url
    }
}