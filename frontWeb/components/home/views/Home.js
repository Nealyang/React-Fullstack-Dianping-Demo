import React, {Component, PropTypes} from 'react'
import HomeHeader from "./homeHeader/HomeHeader";
import {connect} from 'react-redux'
import Category from "./category/Category";
import style from './style.css'
import axios from 'axios'
import {getAd} from '../actions'
import {bindActionCreators} from 'redux'

class Home extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {userInfo} = this.props;
        return (
            <div className={style.home}>
                <HomeHeader cityName={userInfo.cityName}/>
                <Category/>
            </div>
        )
    }

    componentDidMount() {
        this.props.getAdData('/api/getAdData');
    }
}

Home.propTypes = {
    userInfo: PropTypes.object.isRequired,
    ad:PropTypes.arrayOf(PropTypes.object.isRequired),
    cheap:PropTypes.arrayOf(PropTypes.object.isRequired),
    reduce:PropTypes.arrayOf(PropTypes.object.isRequired)
};

function mapStateToProps(state) {
    return {
        userInfo: state.wrap.userInfo,
        ad:state.home.adData.ad,
        cheap:state.home.adData.cheap,
        reduce:state.home.adData.reduce
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getAdData: bindActionCreators(getAd,dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Home);