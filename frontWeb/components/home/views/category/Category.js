import React, {Component, PropTypes} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import style from './style.css'
import ReactSwipe from 'react-swipe';

const dataSource = [
    [
        {name: '猫眼电影', src: 'https://www.dpfile.com/sc/eleconfig/20170223152109dp_wx_maoyan_icon.png'},
        {name: '酒店', src: 'https://www.dpfile.com/sc/eleconfig/20160126203337jiudian.png'},
        {name: '休闲娱乐', src: 'https://www.dpfile.com/sc/eleconfig/20160126202841xiuxianyule.png'},
        {name: '外卖', src: 'https://www.dpfile.com/sc/eleconfig/20160126203251waimai.png'},
        {name: '火锅', src: 'https://www.dpfile.com/sc/eleconfig/20160204172927huoguo.png'},
        {name: '美食', src: 'https://www.dpfile.com/sc/eleconfig/20160126194705meishi.png'},
        {name: '丽人', src: 'https://www.dpfile.com/sc/eleconfig/20160126202946liren.png'},
        {name: '休闲娱乐', src: 'https://www.dpfile.com/sc/eleconfig/20160126203542ktv.png'},
        {name: 'KTV', src: 'https://www.dpfile.com/sc/eleconfig/20160126203440zhoubianyou.png'},
        {name: '婚纱摄影', src: 'https://www.dpfile.com/sc/eleconfig/20160126203830jiehun.png'}
    ],
    [
        {name: '生活服务', src: 'https://www.dpfile.com/sc/eleconfig/20170308125500community_new.png'},
        {name: '景点', src: 'https://www.dpfile.com/sc/eleconfig/20160126205135jingguan.png'},
        {name: '爱车', src: 'https://www.dpfile.com/sc/eleconfig/20160126203742aiche.png'},
        {name: '运动健身', src: 'https://www.dpfile.com/sc/eleconfig/20160126203617jianshen.png'},
        {name: '购物', src: 'https://www.dpfile.com/sc/eleconfig/20160314121215icongouwu135.png'},
        {name: '亲子', src: 'https://www.dpfile.com/sc/eleconfig/20160126203905qinzi.png'},
        {name: '到家', src: 'https://www.dpfile.com/sc/eleconfig/20160126203812daojia.png'},
        {name: '家装', src: 'https://www.dpfile.com/sc/eleconfig/20161213162031zhuangxiu.png'},
        {name: '学习培训', src: 'https://www.dpfile.com/gp/cms/1455525720807.png'},
        {name: '医疗健康', src: 'https://www.dpfile.com/sc/eleconfig/20160126204327yiliao.png'}
    ],
    [
        {name: '小吃快餐', src: 'https://www.dpfile.com/sc/eleconfig/20160204173331xiaochikuaican.png'},
        {name: '自助餐', src: 'https://www.dpfile.com/sc/eleconfig/20160204173511zizhucan.png'},
        {name: '日本菜', src: 'https://www.dpfile.com/sc/eleconfig/20160415121719rihanliaoli.png'},
        {name: '美发', src: 'https://www.dpfile.com/sc/eleconfig/20160316142804meifa.png'},
        {name: '美甲美瞳', src: 'https://www.dpfile.com/sc/eleconfig/20160316143047meijia.png'},
        {name: '美容SPA', src: 'https://www.dpfile.com/sc/eleconfig/20160316143239meirong.png'},
        {name: '瘦身', src: 'https://www.dpfile.com/sc/eleconfig/20160316143316shoushen.png'},
        {name: '亲子摄影', src: 'https://www.dpfile.com/sc/eleconfig/20160316143612qinzisheying.png'},
        {name: '亲子娱乐', src: 'https://www.dpfile.com/sc/eleconfig/20160316143656qinziyoule.png'},
        {name: '全部分类', src: 'https://www.dpfile.com/sc/eleconfig/20160125182200more.png'}
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
                                <div>
                                    <img className={style.img} src={item.src} />
                                </div>
                                <span className={style.name}>{item.name}</span>
                            </div>
                        )}
                    </div>
                    <div className={style.singleCategory}>
                        {dataSource[1].map((item,index)=>
                            <div className={style.cell} key={index}>
                                <div>
                                    <img className={style.img} src={item.src} />
                                </div>
                                <span className={style.name}>{item.name}</span>
                            </div>
                        )}
                    </div>
                    <div className={style.singleCategory}>
                        {dataSource[2].map((item,index)=>
                            <div className={style.cell} key={index}>
                                <div>
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
