import React, {Component, PropTypes} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import style from './style.css'
import {ListCell} from "../../../common/ListCell";
import LoadingMore from "../../../common/LoadingMore";


export default class GuessULike extends Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.renderListCell = this.renderListCell.bind(this);
    }

    render() {
        const {data,loadMore,isLoading} = this.props;
        return (
            <div className={style.container}>
                <span className={style.totalTag}>猜你喜欢</span>
                {data&&this.renderListCell(data)}
                {!isLoading&&<LoadingMore isLoading={isLoading} loadMore={loadMore}/>}
            </div>
        )
    }

    renderListCell(arrs){
        return arrs.map((item,index)=><ListCell skipToDetail={this.props.skipToDetail} key={index} item={item}/>)
    }
}

GuessULike.propTypes = {
    data:PropTypes.arrayOf(PropTypes.object.isRequired),
    loadMore:PropTypes.func.isRequired,
    isLoading:PropTypes.bool.isRequired
}
