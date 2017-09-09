import {fork,call} from 'redux-saga/effects'

import {getAdDataFlow,getULikeDataFlow} from './components/home/homeSaga'
import {getLocatioFlow} from './components/wrap/wrapSaga'
import {getDetailFolw} from './components/detail/detailSaga'
import {getCitiesFlow} from './components/city/citySaga'

export default function* rootSaga () {
    yield fork(getLocatioFlow);
    yield fork(getAdDataFlow);
    yield fork(getULikeDataFlow);
    yield fork(getDetailFolw);
    yield fork(getCitiesFlow);
}