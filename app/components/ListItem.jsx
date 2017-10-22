import React , {Component} from 'react'
import immutable from 'immutable'
import autobind from 'autobind-decorator'
import PureRender from '../plugins/PureRender.js'
import Avatar from './Avatar.jsx'
import IconAvatar from './IconAvatar.jsx'
import ChatMeta from './ChatMeta.jsx'
import language from '../config/language.js'

class ListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: props.initiallyOpen || false,
            primaryTogglesNestedList: props.primaryTogglesNestedList || true,
            isHover: false,
        }
    }
    isFunction(func) {
        return typeof func === 'function'
    }
    hoverToggle(toggle) {
        if(this.state.isHover !== toggle) {
            this.setState(() => ({isHover: toggle}));
        }
    }
    handleHover(e) {
        e.stopPropagation();
        return (toggle) => this.hoverToggle(toggle);
    }
    @autobind
    handleClick(e) {
        e.stopPropagation();
        const { handleClick,   open } = this.props;
        const { primaryTogglesNestedList, isOpen } = this.state;
        if(this.isFunction(handleClick)){
            handleClick();
        }
        if(!isOpen && this.isFunction(open)){
            open();
        }
        if(primaryTogglesNestedList) {
            this.setState(() => ({isOpen: !isOpen}));
        }
    }
    render() {
        const { 
            isSelect, 
            Menu, 
            secondary, 
            time,
            avatar, 
            name, 
            icon, 
            marker, 
            avatarStyle,
            unreadCount,
            nestedItems,
        } = this.props;
        const { isHover } = this.state;
        return ( 
            <li 
                className = {`List-item List-item-${isHover ? 'hover' : ''}`}
                onClick = {this.handleClick}
                onMouseOver = {(e) => this.handleHover(e)(true)}
                onMouseLeave = {(e) => this.handleHover(e)(false)}
            >
                <div className = {isSelect ? 'ActiveListItem ActiveListItem-select' :'ActiveListItem'} >
                    {unreadCount > 0 && <div className = 'ActiveListItem-unreadCount'>{unreadCount}</div>}
                    <div className = 'ActiveListItem-avatar-container' style = {avatarStyle}>
                        {avatar && <Avatar size = {49} src = {avatar}/>}
                        {icon && <IconAvatar size = {49} unicode = {icon} />}
                    </div>
                    <div className = 'ActiveListItem-chat-meta'>
                        <ChatMeta 
                            title = {name} 
                            secondary = {secondary} 
                            time = {time}
                            Menu = {Menu}
                            marker = {marker}
                        />
                    </div>  
                </div>  
                {
                    this.state.isOpen &&
                    <ul className='List List-nestedItems' >
                        {nestedItems}
                    </ul>
                }
            </li>
        );
    }
}

export default ListItem;
                        