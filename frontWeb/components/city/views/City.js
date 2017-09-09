import React,{Component,PropTypes} from 'react'
import {getCity} from '../actions'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {CityHeader} from "./CityHeader";
import {actions as wrapActions} from '../../wrap'
import style from './style.css'

class City extends Component{
    constructor(props){
        super(props);
        this.choiceCity = this.choiceCity.bind(this)
    }

    render(){
        const {history,cities}  = this.props;
        return(
            <div className={style.container}>
                <CityHeader history={history}/>
                <div className={style.gpsCity}>
                    <span>北京</span>
                    GPS定位
                </div>
                <p className={style.hotCity}>热门城市</p>
                <div className={style.hotCityContainer}>
                    {cities.map((item,index)=>{
                        return (
                            <div key={index} className={style.hotCityName} onClick={()=>this.choiceCity(item.name)}>
                                {item.name}
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }

    componentDidMount() {
        this.props.getCities('/api/cities');
    }

    choiceCity(cityName){
        this.props.choiceCity({
            cityName
        });
        this.props.history.goBack()
    }

}

City.defaultProps = {
    cities:[]
};

City.propTypes = {
    cities:PropTypes.arrayOf(PropTypes.object.isRequired)
};

function mapStateToProps(state) {
    return{
        cities:state.cities
    }
}

function mapDispatchToProps(dispatch) {
    return{
        getCities:bindActionCreators(getCity,dispatch),
        choiceCity:bindActionCreators(wrapActions.updateUserInfo,dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
) (City);