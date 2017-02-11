import React , {Component} from 'react'
import Snackbar from '../containers/Snackbar.js'

function APP(props){
    return (
        <div>
            {props.children}
            <Snackbar />
            {/* 此处canvas用作压缩图片 */}
            {/*<canvas id = 'canvas' style = {{display: 'none'}}></canvas>*/}
            {/* 此处input用作复制内容到剪贴板 */}
            <input id = 'clipboard' defaultValue = ' '/>
        </div>
    );
}

export default APP;