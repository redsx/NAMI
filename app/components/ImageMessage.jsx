import React , {PropTypes, Component} from 'react'
import PureRender from '../plugins/PureRender.js'
import config from '../config/config.js'
import MessageBox from './MessageBox.jsx'

function ImageMessage(props){
    console.log('ImageMessage');
    const reg = /^data:image\//;
    let content =  props.content.get('content');
    content = reg.test(content) ? content : content + config.ImageStyle;
    return(
        <MessageBox {...props}>
            <img  className = 'Message-image' src={content} />
        </MessageBox>
    );
}

export default PureRender(ImageMessage);
