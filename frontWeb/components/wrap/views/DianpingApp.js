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

export default class DianpingApp extends Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate=PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state={
            isLoading:false
        }
    }

    render() {
        return (
            <Router>
                <div>
                    <h1>hello world</h1>
                    {
                        this.state.isLoading?<h1>加载中。。。</h1>:
                            <Switch>
                                <Route exact path='/' component={Home}/>
                                <Route path='/detail' component={Detail}/>
                                <Route path='/city' component={City}/>
                                <Route path='/search' component={Search}/>
                                <Route path='/user' component={User}/>
                                <Route component={NotFound}/>
                            </Switch>

                    }
                </div>
            </Router>
        )
    }
}
