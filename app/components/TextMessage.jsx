import React , {PropTypes, Component} from 'react'
import PureRender from '../plugins/PureRender.js'
import MessageBox from './MessageBox.jsx'

function replaceContent(content){
    let repContent = content || '';
    const regLink = /^((http|https|ftp):\/\/)?(\w(\:\w)?@)?([0-9a-z_-]+\.)*?([a-z0-9-]+\.[a-z]{2,6}(\.[a-z]{2})?(\:[0-9]{2,6})?)((\/[^?#<>\/\\*":]*)+(\?[^#]*)?(#.*)?)?$/i;
    // const regImg = /https?:\/\/.+\.(jpg|gif|png|svg|jpeg)/i
    repContent = repContent.replace(regLink, r => `<a href="${r}" target="_blank" rel="noreferrer">${r}</a>`);
    return repContent;
}
function TextMessage(props){
    console.log('textMessage');
    const content = replaceContent(props.content.get('content'));
    return(
        <MessageBox {...props}>
            <span  className = 'select' dangerouslySetInnerHTML={ {__html: content}}></span>
        </MessageBox>
    );
}

export default PureRender(TextMessage);
