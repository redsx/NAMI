import React , {PropTypes, Component} from 'react'
import autobind from 'autobind-decorator'
import {shouldComponentUpdate} from '../plugins/PureRender.js'
import { msgContainerScroll } from '../actions/pageUI.js'
import config from '../config/config.js'
import MessageBox from './MessageBox.jsx'
import ImagePanel from './ImagePanel.jsx'

class ImageMessage extends Component{
    constructor(props){
        super(props);
        this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
        this.state = {showImagePanel: false, isLoaded: false, loadedError: false}
    }
    dealContent(content){
        const reg = new RegExp(config.imageDomain,'i');
        content = !reg.test(content) ? content : content + config.ImageStyle;
        return content;
    }
    preloadImage(url){
        const img = new Image();
        img.src = url;
        img.onload = ()=>{
            this.setState({isLoaded: true, loadedError: false});
            msgContainerScroll(true);
        };
        img.onerror = () => {
            this.setState({isLoaded: true, loadedError: true});
            msgContainerScroll(true);
        }
    }
    render(){
        const content =  this.dealContent(this.props.content.get('content')),
            showImage = this.props.showImage,
            blur = {filter: 'blur(8px)'};
        return(
            <MessageBox {...this.props}>
                <div onClick = {()=>this.setState({showImagePanel: true})}>
                    <img  
                        className = 'Message-image' 
                        src={content} 
                        style = {showImage ? {} : blur} 
                        onError= {(e)=>{e.target.style.display = 'none'}}/>
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
