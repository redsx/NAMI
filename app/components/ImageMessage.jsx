import React , {PropTypes, Component} from 'react'
import autobind from 'autobind-decorator'
import {shouldComponentUpdate} from '../plugins/PureRender.js'
import config from '../config/config.js'
import MessageBox from './MessageBox.jsx'
import ImagePanel from './ImagePanel.jsx'

class ImageMessage extends Component{
    constructor(props){
        super(props);
        this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
        this.state = {showImagePanel: false}
    }
    render(){
        const reg = /^data:image\//;
        let content =  this.props.content.get('content'),
            showImage = this.props.showImage;
        content = reg.test(content) ? content : content + config.ImageStyle;
        return(
            <MessageBox {...this.props}>
                <div onClick = {()=>this.setState({showImagePanel: true})}>
                    <img  className = 'Message-image' src={content} />
                    {!showImage && <div className = 'Message-image-cover'></div>}
                </div>
                <ImagePanel 
                    content = {this.props.content}
                    isShow = {this.state.showImagePanel}
                    handleClose = {()=>this.setState({showImagePanel: false})}
                />
            </MessageBox>
        );
    }
}

export default ImageMessage;
