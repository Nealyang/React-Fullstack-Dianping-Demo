import {put,takeEvery,call,take,fork} from 'redux-saga/effects'
import {delay} from 'redux-saga'
import * as homeActionTypes from './components/home/actionTypes'
import * as wrapActionTypes from './components/wrap/actionTypes'
import {get} from './fetchApi/get'

//故意的
const delayTime = 0;

export function* getAdData(url) {
    yield put({type:wrapActionTypes.START_FETCH});
    yield  delay(delayTime);//故意的
    try {
        return yield call(get,url);
    } catch (error) {
        yield put({type:wrapActionTypes.FETCH_ERROR})
    }finally {
        yield put({type:wrapActionTypes.FETCH_END})
    }
}

export function* getULikeData(url) {
    yield put({type:wrapActionTypes.START_FETCH});
    yield  delay(delayTime);//故意的
    try {
        return yield call(get,url);
    }catch (err) {
        yield put({type:wrapActionTypes.FETCH_ERROR})
    }finally {
        yield put({type:wrapActionTypes.FETCH_END})
    }
}

export function* getAdDataFlow() {
    while (true){
        let request = yield take(homeActionTypes.GET_AD);
        let response = yield call(getAdData,request.url);
        yield put({type:homeActionTypes.GET_AD_RESULT_DATA,data:response.data})
    }
}

export function* getULikeDataFlow() {
    while(true){
        let request = yield  take(homeActionTypes.GET_U_LIKE);
        let response = yield call(getULikeData,request.url);
        yield put({type:homeActionTypes.GET_U_LIKE_RESULT_DATA,data:response.data})
    }
}

export default function* rootSaga () {
    yield fork(getAdDataFlow);
    yield fork(getULikeDataFlow)
}