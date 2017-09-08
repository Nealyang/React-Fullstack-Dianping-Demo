import React from 'react'
import style from './style.css'

export const AdCell = (props) => (
    <div className={style.cellContainer}>
        <img className={style.cellImg} src={props.data.thumbnail} />
        <p className={style.cellName}>
            {props.data.name}
        </p>
        <span className={style.price}>{props.data.price}</span>
        {
            props.type===1&&props.data.subtract?<span className={style.tag}>{props.data.subtract}</span>
                :props.type===2&&props.data.tag?<span className={style.type2tag}>{props.data.tag}</span>:null
        }

    </div>
);