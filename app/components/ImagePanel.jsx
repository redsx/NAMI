import React , {Component} from 'react'
import Avatar from '../components/Avatar.jsx'
import PureRender from '../plugins/PureRender.js'
import '../less/ImagePanel.less'
// 
function ImagePanel(props){
    let { title, secondary, time, marker, Menu } = props;
    return (
        <div className = 'ImagePanel'>
            <header className = 'displayFlex ImagePanel-header'>
                <Avatar size = {40}/>
                <div className = 'ImagePanel-info'>
                    <p className = 'textOver'>@ mdzz</p>
                    <p className = 'textOver'>2/21/2017 at 9:47 AM</p>
                </div>
                <ul className = 'displayFlex ImagePanel-menu'>
                    <li><i className = 'icon'>&#xe623;</i></li>
                    <li><i className = 'icon'>&#xe622;</i></li>
                    <li><i className = 'icon'>&#xe8e4;</i></li>
                    <li><i className = 'icon'>&#xe636;</i></li>
                    <li><i className = 'icon'>&#xe93d;</i></li>
                </ul>
            </header>
            <div className = 'ImagePanel-image-container displayFlex'>
                <div className = 'ImagePanel-image'>
                    <img src = 'https://ooo.0o0.ooo/2017/02/19/58a9526dec72f.gif'/>
                </div>
            </div>
        </div>
    );
}

export default ImagePanel;