import React , {Component} from 'react'
import autobind from 'autobind-decorator'
import language from '../config/language.js'
import config from '../config/config.js'
import { sendFile } from '../actions/combin.js'
import uploadHandle from '../util/upload.js'
import message from '../util/message.js'

import '../less/AttachButton.less'

class AttachButton extends Component{
    constructor(props){
        super(props);
        this.state = {showMenu: false}
    }
    @autobind
    handleClose(){
        this.setState({showMenu: false});
    }
    @autobind
    handleSend(type){
        return (e) => {
            const file = e.target.files[0],
                isPrivate = this.props.isPrivate,
                user = this.props.user.toJS();
            const imageHandle = uploadHandle(file);
            const msg =  message.createMessage(user,'content',isPrivate,type);
            sendFile(isPrivate)(msg,imageHandle);
            this.setState({showMenu: false});
        }
    }
    render(){
        const showMenu = this.state.showMenu;
        return (
            <span className = 'AttachButton'>
                <span onClick = {()=>this.setState({showMenu: !showMenu})} >
                    <i className = 'icon Header-icon' title = {language.attach}>&#xe7cc;</i>
                </span>
                <div className = 'AttachButton-menu'>
                    <ul style = {{pointerEvents: showMenu?'auto':'none'}}>
                        <ButtonItem 
                            info = {config.bgCoordinates[0]} 
                            index = {0}
                            showMenu = {showMenu}
                            accept = 'image/png,image/gif,image/jpg,image/jpeg'
                            handleChange = {this.handleSend('image')}
                        />
                        <ButtonItem 
                            info = {config.bgCoordinates[1]} 
                            index = {1}
                            showMenu = {showMenu}
                            handleChange = {this.handleSend('file')}
                        />
                        <ButtonItem 
                            info = {config.bgCoordinates[2]}
                            index = {2}
                            showMenu = {showMenu}
                        />
                        
                    </ul>
                </div>
            </span>
        );
    }
}
function getItemStyle(coordinate,index){
    const style = {
        backgroundPosition: coordinate[0] + 'px ' + coordinate[1]+'px',
        transform: `translateY(${-68*(index+1)+ 'px'}) scaleX(0) scaleY(0)`,
        transitionDelay: index*0.06 + 's'
    }
    return style;
}
function ButtonItem(props){
    const { showMenu, info , index, handleChange, accept } = props;
    const { coordinate, title } = info;
    const style = getItemStyle(coordinate,index);
    return (
        <li className = 'AttachButton-menu-item'>
            <div className = 'AttachButton-item-title'><span className = 'AttachButton-item-text'>{title}</span></div>
            <button style = {style} className = {showMenu ? 'AttachButton-item-active':'AttachButton-item'}></button>
            {handleChange && <input type= 'file' accept = {accept} className = 'AttachButton-upload' onChange = {handleChange}/>} 
        </li>
    );
}

export default AttachButton;