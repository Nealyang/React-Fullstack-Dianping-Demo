import React, {Component, PropTypes} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import style from './style.css'

export default class Ad extends Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.renderComponent = this.renderComponent.bind(this)
    }

    render() {
        return (
            <div className={style.container}>
                {this.props.ads && this.renderComponent(this.props.ads)}
            </div>
        )
    }

    renderComponent(ads) {
        if (ads.length > 0) {
            return ads.map((item, index) => {
                return (
                    <div key={index} className={style.singleCell} style={index===2?{backgroundColor:'#ff7658'}:index===3?{backgroundColor:'#55b3df'}:null}>
                        <div className={style.leftDiv}>
                            <p className={style.name} style={index===0?{color:"#55b3df"}:index>1?{color:'#fff'}:{color:'#ff7658'}}>{item.name}</p>
                            <p className={style.subName} style={index>1?{color:'#fff'}:null}>{item.subName}</p>
                        </div>
                        <div className={style.rightDiv}>
                            <img className={style.imgStyle} src={item.thumbnail}/>
                        </div>
                    </div>
                )
            })
        }
    }
}
Ad.propTypes = {
    ads: PropTypes.arrayOf(PropTypes.object)
};