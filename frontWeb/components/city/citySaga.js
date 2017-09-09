import {call,put ,take} from 'redux-saga/effects'
import * as wrapActionTypes from '../wrap/actionTypes'
import * as cityActionTypes from './actionTypes'
import {get} from '../../fetchApi/get'


export function* getCities (url) {
    yield put({type:wrapActionTypes.START_FETCH});
    try {
        return yield  call(get,url)
    }catch (err){
        yield put({type:wrapActionTypes.FETCH_ERROR});
    }finally {
        yield put({type:wrapActionTypes.FETCH_END});
    }
}

export function* getCitiesFlow() {
    while(true){
        let req = yield take(cityActionTypes.GET_CITY_DATA);
        let res = yield call(getCities,req.url);
        yield put({type:cityActionTypes.RESOLVE_CITY_DATA,data:res.data})
    }
}