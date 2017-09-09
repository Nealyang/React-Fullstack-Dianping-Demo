import React, {Component, PropTypes} from 'react'
import style from './style.css'
import BackIcon from './arrow_down.png'
import ReactSwipe from 'react-swipe'
import {connect} from 'react-redux'
import {getDetail} from '../actions'
import {bindActionCreators} from 'redux'
import gou from './gou.png'
import time from './time.png'
import {ShouldKnow} from "./ShouldKnow";

class Detail extends Component {
    constructor(props) {
        super(props);
        this.state={
            currentIndex:0
        }
    }

    render() {
        const {imgs, orderDetail, recommends} = this.props;
        const swipeConfig = {
            continuous:false,
            callback: (i)=> {
                this.setState({
                    currentIndex:i
                })
            }
        };
        return (
            <div className={style.container}>
                {Header(this.props.history)}
                <div style={{position:'relative'}}>
                    <ReactSwipe className="carousel" swipeOptions={swipeConfig} key={imgs.length}>
                        {this.renderSwipe(imgs)}
                    </ReactSwipe>
                    <div className={style.indexDiv}>
                        <span>{this.state.currentIndex+1}</span>/{imgs.length}
                    </div>
                    <div className={style.imgIntroduce}>
                        <p className={style.meiminger}>没名儿生煎</p>
                        <p className={style.int}>仅售19.9元！最高价值44元的清爽夏日生煎套餐，建议2人使用。</p>
                    </div>
                </div>
                <div className={style.proceDivCon}>
                    <div className={style.priceDivTop}>
                        <div>
                            <span>19.9</span>
                            <span>44</span>
                        </div>
                        <div>
                            卖光了
                        </div>
                    </div>
                    <div className={style.priceDivBottom}>
                        <span>
                            <img src={gou}/>
                            <span>随时可退</span>
                        </span>
                        <span>
                            <img src={time}/>
                            <span>过期自动退</span>
                        </span>
                    </div>
                </div>
                <div className={style.notifyDiv}>
                    <p>
                        变更通知
                    </p>
                    <p>
                        【7月11日更新】【分店暂停接待】没名儿生煎（五道口店）店有效期内无法接待团购用户，您可前往其他分店消费。给您带来不便，深表歉意。
                    </p>
                </div>
                <ShouldKnow orderDetail={orderDetail}/>
                <div className={style.getButton}>
                    <div>
                        卖光了
                    </div>
                </div>
                <div className={style.recommendsContainer}>
                    <p>看了此团购的人也看了</p>
                    {
                        recommends.map((item,index)=>{
                            return(
                                <div key={index} className={style.recommendsCell}>
                                    <img src={item.thumbnail}/>
                                    <div>
                                        <div className={style.recommendsName}>{item.name}</div>
                                        <p>
                                            <span className={style.recommendsPrice}>{item.price}</span>
                                            <span className={style.recommendsExPrice}>{item.exPrice}</span>
                                        </p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }

    componentDidMount() {
        this.props.getDetail('/api/orderDetail', this.props.match.params)
    }

    renderSwipe(arr) {
        return arr.map((item, index) => {
            return (
                <div key={index}>
                    <img className={style.swipeImg} src={item} alt=""/>
                </div>
            )
        })
    }
}

const Header = (props) => (
    <div className={style.header} onClick={() => props.goBack()}>
        <span className={style.backSpan}>
            <img src={BackIcon}/>
            返回
        </span>
        团购详情
    </div>
);

Detail.defaultProps = {
    imgs: [],
    orderDetail: {},
    recommends: []
};

Detail.propTypes = {
    imgs: PropTypes.arrayOf(PropTypes.string.isRequired),
    orderDetail: PropTypes.object.isRequired,
    recommends: PropTypes.arrayOf(PropTypes.object.isRequired)
};


function mapSateToProps(state) {
    return {
        imgs: state.orderDetail.imgs,
        orderDetail: state.orderDetail.orderDetail,
        recommends: state.orderDetail.recommends
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getDetail: bindActionCreators(getDetail, dispatch)
    }
}


export default connect(
    mapSateToProps,
    mapDispatchToProps
)(Detail);