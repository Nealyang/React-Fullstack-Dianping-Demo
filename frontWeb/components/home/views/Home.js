import React, {Component, PropTypes} from 'react'
import HomeHeader from "./homeHeader/HomeHeader";
import {connect} from 'react-redux'
import Category from "./category/Category";
import style from './style.css'
import {getAd,getLike} from '../actions'
import {bindActionCreators} from 'redux'
import Ad from "./ad/Ad";
import CheapOrReducers from "./cheapOrReducers/CheapOrReducers";
import GuessULike from "./guessULike/GuessULike";

class Home extends Component {
    constructor(props) {
        super(props);
        this.loadMore = this.loadMore.bind(this);
        this.skipToLocation = this.skipToLocation.bind(this)
    }

    render() {
        const {userInfo,ad,cheap,reduces,guessULike,isLoading} = this.props;
        return (
            <div className={style.home}>
                <HomeHeader cityName={userInfo.cityName}/>
                <Category/>
                <div style={{marginTop:'20px'}}/>
                <Ad ads={ad}/>
                <CheapOrReducers data={cheap} type={1}/>
                <CheapOrReducers data={reduces} type={2}/>
                <GuessULike skipToDetail={this.skipToLocation} loadMore={this.loadMore} isLoading={isLoading} data={guessULike}/>
            </div>
        )
    }

    componentDidMount() {
        this.props.getAdData('/api/getAdData');
        this.props.getULikeData('/api/getULikeData');
    }
    skipToLocation(id){
        this.props.history.push(`/detail/${id}`);
    }
    loadMore(){
        this.props.getULikeData('/api/getULikeData');
    }
}
Home.defaultProps={
    userInfo: {},
    ad:[],
    cheap:[],
    reduces:[],
    guessULike:[],
    isLoading:false
};

Home.propTypes = {
    userInfo: PropTypes.object.isRequired,
    ad:PropTypes.arrayOf(PropTypes.object.isRequired),
    cheap:PropTypes.arrayOf(PropTypes.object.isRequired),
    reduces:PropTypes.arrayOf(PropTypes.object.isRequired),
    guessULike:PropTypes.arrayOf(PropTypes.object.isRequired),
    isLoading:PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    return {
        userInfo: state.wrap.userInfo,
        ad:state.home.adData.ad,
        cheap:state.home.adData.cheap,
        reduces:state.home.adData.reduces,
        guessULike:state.home.guessULike,
        isLoading:state.wrap.fetchState==='start'
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getAdData: bindActionCreators(getAd,dispatch),
        getULikeData:bindActionCreators(getLike,dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Home);