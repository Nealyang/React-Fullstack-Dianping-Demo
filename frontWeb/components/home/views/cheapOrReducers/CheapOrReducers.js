import React, {Component, PropTypes} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import style from './style.css'
import {AdHeader} from "../../../common/AdHeader";
import {AdCell} from "../../../common/AdCell";

export default class CheapOrReducers extends Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.renderAdCell = this.renderAdCell.bind(this)
    }

    render() {
        const {type,data} = this.props;
        return (
            <div className={style.container}>
                <AdHeader title={type===1?'超值优惠':'天天立减'} type={type}/>
                <div className={style.cellContainer}>
                    {data&&this.renderAdCell(data)}
                </div>
            </div>
        )
    }

    renderAdCell(arr){
        return arr.map((item,index)=>{
            return(
                <AdCell key={index} data={item} type={this.props.type}/>
            )
        })
    }
}
