import React, {Component, PropTypes} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import style from './style.css'
import ReactSwipe from 'react-swipe';

const dataSource = [
    [
        {name: '电影', src: require('./icons/11.png')},
        {name: '度假出行', src: require('./icons/12.png')},
        {name: '火锅', src: require('./icons/13.png')},
        {name: '酒店', src: require('./icons/14.png')},
        {name: '丽人', src: require('./icons/15.png')},
        {name: '美食', src: require('./icons/16.png')},
        {name: '外卖', src: require('./icons/17.png')},
        {name: '休闲娱乐', src: require('./icons/18.png')},
        {name: '周边游', src: require('./icons/19.png')},
        {name: '足疗按摩', src: require('./icons/10.png')}
    ],
    [
        {name: '购物', src: require('./icons/21.png')},
        {name: '景点', src: require('./icons/22.png')},
        {name: '酒吧', src: require('./icons/23.png')},
        {name: '美发', src: require('./icons/24.png')},
        {name: '亲子', src: require('./icons/25.png')},
        {name: '生活服务', src: require('./icons/26.png')},
        {name: '小吃快餐', src: require('./icons/27.png')},
        {name: '运动健身', src: require('./icons/28.png')},
        {name: '自助餐', src: require('./icons/29.png')},
        {name: 'KTV', src: require('./icons/20.png')}
    ],
    [
        {name: '宠物', src: require('./icons/31.png')},
        {name: '火车机票', src: require('./icons/32.png')},
        {name: '家装', src: require('./icons/33.png')},
        {name: '结婚', src: require('./icons/34.png')},
        {name: '全部分类', src: require('./icons/35.png')},
        {name: '日本菜', src: require('./icons/36.png')},
        {name: '烧烤', src: require('./icons/37.png')},
        {name: '西餐', src: require('./icons/38.png')},
        {name: '学习培训', src: require('./icons/39.png')},
        {name: '你猜', src: require('./icons/30.png')}
    ]
];

export default class Category extends Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state={
            currentIndex:0
        }
    }

    render() {
        const config = {
            auto: 2000,
            speed:600,
            callback:index =>{
                this.setState({
                    currentIndex:index
                })
            }
        };
        return (
            <div className={style.category}>
                <ReactSwipe className="carousel"  swipeOptions={config}>
                    <div className={style.singleCategory}>
                        {dataSource[0].map((item,index)=>
                            <div className={style.cell} key={index}>
                                <div className={style.imgWrap}>
                                    <img className={style.img} src={item.src} />
                                </div>
                                <span className={style.name}>{item.name}</span>
                            </div>
                        )}
                    </div>
                    <div className={style.singleCategory}>
                        {dataSource[1].map((item,index)=>
                            <div className={style.cell} key={index}>
                                <div className={style.imgWrap}>
                                    <img className={style.img} src={item.src} />
                                </div>
                                <span className={style.name}>{item.name}</span>
                            </div>
                        )}
                    </div>
                    <div className={style.singleCategory}>
                        {dataSource[2].map((item,index)=>
                            <div className={style.cell} key={index}>
                                <div className={style.imgWrap}>
                                    <img className={style.img} src={item.src} />
                                </div>
                                <span className={style.name}>{item.name}</span>
                            </div>
                        )}
                    </div>
                </ReactSwipe>
                <div className={style.spanContainer}>
                    <span className={this.state.currentIndex === 0?style.spanOn:style.spanOff}></span>
                    <span className={this.state.currentIndex === 1?style.spanOn:style.spanOff}></span>
                    <span className={this.state.currentIndex === 2?style.spanOn:style.spanOff}></span>
                </div>
            </div>
        )
    }
}
