import * as ActionTypes from './actionTypes'

export function updateUserInfo(data) {
    return{
        type:ActionTypes.USERINFO_UPDATE,
        data
    }
}