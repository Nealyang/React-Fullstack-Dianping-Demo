import React,{Component,PropTypes} from 'react'
import HomeHeader from "./homeHeader/HomeHeader";
import {connect} from 'react-redux'
import Category from "./category/Category";
import style from './style.css'

class Home extends Component{
    constructor(props){
        super(props)
    }

    render(){
        const {userInfo} = this.props;
        return(
            <div className={style.home}>
                <HomeHeader cityName={userInfo.cityName}/>
                <Category/>
            </div>
        )
    }

    componentDidMount() {

    }
}

Home.propTypes={
    userInfo:PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return{
        userInfo:state.userInfo
    }
}
function mapDispatchToProps() {
    return{

    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Home);