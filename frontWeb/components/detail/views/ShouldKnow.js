import React from 'react'
import style from './style.css'
import Broad from './broad.png'

export const ShouldKnow = (props) => (
    <div className={style.shouldKnow}>
        <p className={style.boradKnow}>
            购买须知
            <img src={Broad}/>
        </p>
        {renderCell(props.orderDetail)}
    </div>
);

const renderCell = (obj) => {
    let resultJSX = [];
    for (let key in obj) {
        let template = '';
        let title = '';
        if (key === 'youxiaoqi') {
            title = '有效期';
        }else if(key === 'chuwairiqi'){
            title='除外日期'
        }else if(key === 'shiyongshijian'){
            title='使用时间'
        }else if(key === 'yuyuetixing'){
            title='预约提醒'
        }else if(key === 'guizetixing'){
            title='规则提醒'
        }else if(key === 'baojian'){
            title='包间'
        }else if(key === 'tangshiwaidai'){
            title='堂食外带'
        }else if(key === 'wenxintishi'){
            title='温馨提示'
        }
        template =
            <div key={key} className={style.knowCellContainer}>
                <p>{title}</p>
                {
                    obj[key].map((item, index) => {
                        return (
                            <div key={index}>{item}</div>
                        )
                    })
                }
            </div>
        resultJSX.push(template)
    }
    return resultJSX
};

