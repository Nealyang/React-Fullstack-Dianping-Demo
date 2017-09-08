//router
import React, {Component} from 'react'
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch
} from 'react-router-dom'
import {view as City} from '../../city/index'
import {view as Detail} from '../../detail/index'
import {view as Home} from '../../home/index'
import {view as NotFound} from '../../notFound/index'
import {view as Search} from '../../search/index'
import {view as User} from '../../user/index'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {updateUserInfo} from '../actions'
import './reset.css'
import style from './style.css'

class DianpingApp extends Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        return (
            <Router>
                <div>
                    {
                        this.props.isLoading ?
                            <div className={style.loadingContainer}>
                                <img className={style.imgIcon} src='https://www.dpfile.com/app/app-m-module/static/6261145dd7c0f26bc0a26831e5cb358a.gif'/>
                            </div>
                            :null
                    }
                    <Switch>
                        <Route exact path='/' component={Home}/>
                        <Route path='/detail' component={Detail}/>
                        <Route path='/city' component={City}/>
                        <Route path='/search' component={Search}/>
                        <Route path='/user' component={User}/>
                        <Route component={NotFound}/>
                    </Switch>

                </div>
            </Router>
        )
    }

    componentDidMount() {
        this.props.updateUserInfo({
            cityName: '北京',
            isLoading: true
        })
    }
}

function mapStateToProps(state) {
    return {
        isLoading: state.wrap.fetchState === 'start'
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updateUserInfo: bindActionCreators(updateUserInfo, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DianpingApp)