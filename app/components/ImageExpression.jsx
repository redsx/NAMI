import React , {PropTypes, Component} from 'react'
import message from '../util/message.js'
import { sendMessage } from '../actions/combin.js'
import '../less/ImageExpression.less'

const src = 'http://cdn.suisuijiang.com/message_1480558412404.png';
function ImageExpression(props){
    const handleSend = (content) => {
        const msg = message.createMessage(props.user.toJS(),content,props.isPrivate,'image');
        sendMessage(msg.isPrivate)(msg.message,msg.preMessage);
    }
    const expressions = props.user.get('expressions');
    return (
        <div className = 'ImageExpression'>
            {
                expressions.map((expression,index) =>{
                    return <ImageComponent 
                        src={expression} 
                        handleClick={()=>handleSend(expression)}
                        key = {'expression'+ index }
                    />;
                })
            }
        </div>
    );
}
    
function ImageComponent(props){
    return (
        <div className = 'ImageExpression-image-container' onClick = {props.handleClick}>
            <img className = 'ImageExpression-image' src = {props.src}/>
            <img className = 'ImageExpression-image-zoom' src = {props.src}/>
        </div>
    );
}

export default ImageExpression;
