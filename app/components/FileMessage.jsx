import React , {PropTypes, Component} from 'react'
import PureRender from '../plugins/PureRender.js'
import config from '../config/config.js'
import MessageBox from './MessageBox.jsx'

function FileMessage(props){
    const isLoading =  props.content.get('isLoading');
    let content = props.content.get('Tcontent') || props.content.get('content');
    try{
        content = JSON.parse(content);
    }catch(err){
        console.warn(err);
    }
    const { src, fileName, size } = content;
    return (
        <MessageBox {...props}>
            <div className = 'FileMessage displayFlex'>
                <div className = 'FileMessage-icon'><img src={config.FileImage} /></div>
                <div className = 'FileMessage-fileName'>
                    <p className = 'textOver'>{fileName}</p>
                    <p className = 'FileMessage-size textOver'>{size}</p>
                </div>
                <a href = {src} download = {fileName} className = 'FileMessage-download'><i className='icon'>&#xe60e;</i></a>
            </div>
        </MessageBox>
    );
}

export default PureRender(FileMessage);
