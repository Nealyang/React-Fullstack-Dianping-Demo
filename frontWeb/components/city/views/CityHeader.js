import React from 'react'
import style from './style.css'
import BackIcon from './back.png'

export const CityHeader = (props) => (
    <div className={style.headerContainer} onClick={()=>props.history.goBack()}>
        <img src={BackIcon}/>
        <span>
            同步action操作->选择城市
        </span>
    </div>
);