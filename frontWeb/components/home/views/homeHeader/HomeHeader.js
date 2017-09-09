import React,{Component,PropTypes} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import style from  './homeHeader.css'
import arrowDown from './arrow_down.png'
import userIcon from './usered.png'
import searchIcon from './search.png'

export default  class HomeHeader extends Component{
    constructor(props){
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }

    render(){
        const {cityName,history} = this.props;
        return(
            <div className={style.homeHeaderContainer}>
                <div onClick={()=>history.push('/city')}>
                    <span>{cityName}</span>
                    <img className={style.arrowDown} src={arrowDown}/>
                </div>
                <div className={style.searchDiv}>
                    <img className={style.searchIcon} src={searchIcon}/>
                    <input className={style.searchInput} placeholder='请输入关键字' type="text"/>
                </div>
                <img className={style.userIcon} src={userIcon} alt=""/>
            </div>
        )
    }

}
HomeHeader.propTypes={
    cityName:PropTypes.string
};