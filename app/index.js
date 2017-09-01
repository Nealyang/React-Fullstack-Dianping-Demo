import React,{Component} from 'react'
import style from './test.css'
import {render} from 'react-dom'
import test from './test.jpg'

 class App extends Component{
    render(){
        return(
            <div>
                <p className={style.test}>hello world!</p>
                <img src={test} alt="me"/>
            </div>
        )
    }
}


let div = document.createElement('div');
div.setAttribute('id','app');
document.body.appendChild(div);

render(<App/>,document.getElementById('app'));