import * as actionTypes from './actionTypes'

export function getCity(url) {
    return{
        type: actionTypes.GET_CITY_DATA,
        url
    }
}