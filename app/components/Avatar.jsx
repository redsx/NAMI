import React , {Component} from 'react'
import {shouldComponentUpdate} from '../plugins/PureRender.js'
import { errPrint } from '../actions/combin.js'
import uploadHandle from '../util/upload.js'
import '../less/Avatar.less'
class Avatar extends Component{
    constructor(props){
        super(props);
        this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
        this.state = {src: props.src};
    }
    componentWillReceiveProps(nextProps){
        this.setState({src: nextProps.src || this.state.src});
    }
    upload(e,cb){
        const files = e.target.files;
        const imageHandle = uploadHandle(files[0]);
        imageHandle.upload()
        .then(ret => {
            this.setState({src: ret.src});
            cb(ret.src)
        })
        .catch(err => errPrint(err))
    }
    render(){
        let { size, handleClick, radius, handleUpload } = this.props;
        let src = this.state.src;
        size = size || 39;
        const avatarContainerStyle = {
            width: size + 'px',
            minWidth: size + 'px',
            height: size + 'px',
            minHeight: size + 'px',
            borderRadius: radius + 'px' || '50%'
        }
        const background = {backgroundImage: src ? 'url(' + src + ')' : null}
        return (
            <div className = 'Avatar-container' style = {avatarContainerStyle}>
                <div  className = 'Avatar' style = {background} onClick = {(e) => handleClick && handleClick(e)}/>
                {
                    handleUpload && 
                    <div className = 'Avatar-upload'>
                        <div className = 'Avatar-upload-text'><i className = 'icon'>&#xe6ac;</i></div>
                        <input type = 'file' className= 'Avatar-input' onChange = {(e)=> this.upload(e,handleUpload)}/>
                    </div>                
                }
            </div>
        );
    }
}

export default Avatar;