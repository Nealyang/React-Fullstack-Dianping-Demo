import {put,take,call,fork} from 'redux-saga/effects'
import * as wrapActionTypes from '../wrap/actionTypes'
import * as detailActionTyes from './actionTypes'
import {get} from '../../fetchApi/get'

export function* getDetail(url,data) {
    yield put({type:wrapActionTypes.START_FETCH});
    try {
        return yield call(get,url,data)
    }catch (err){
        yield put({type:wrapActionTypes.FETCH_ERROR});
    }finally {
        yield put({type:wrapActionTypes.FETCH_END});
    }
}

export function* getDetailFolw() {
    while(true){
        let request = yield take(detailActionTyes.GET_ORDER_DETAIL);
        let response = yield call(getDetail,request.url,request.data);
        yield put({type:detailActionTyes.RESOLVE_ORDER_DETAIL_DATA,data:response.data})
    }
}