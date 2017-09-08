import {combineReducers } from 'redux'
import {reducer as wrap} from './components/wrap/index'
import {reducer as city} from './components/city'
import {reducer as detail} from './components/detail'
import {reducer as home} from './components/home'
import {reducer as notFound} from './components/notFound'
import {reducer as search } from './components/search'
import {reducer as user } from './components/user'

export default combineReducers({
    wrap,
    home
});

