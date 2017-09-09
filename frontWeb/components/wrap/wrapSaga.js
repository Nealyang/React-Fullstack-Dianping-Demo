import {put,call,take} from 'redux-saga/effects'
import * as wrapActionTypes from './actionTypes'

import {get} from '../../fetchApi/get'

export function* getLocation (url) {
    yield put({type:wrapActionTypes.START_FETCH});
    try {
        return yield call(get,url)
    }catch (err){
        yield put({type:wrapActionTypes.FETCH_ERROR})
    }finally {
        yield put({type:wrapActionTypes.FETCH_END})
    }
}

export function* getLocatioFlow() {
    while(true){
        let request =yield take(wrapActionTypes.GET_USER_LOCATION);
        let response = yield call(getLocation,request.url);
        yield put({type:wrapActionTypes.USERINFO_UPDATE,data:response.data})
    }
}