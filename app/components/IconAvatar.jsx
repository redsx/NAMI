import React , {Component} from 'react'
import PureRender from '../plugins/PureRender.js'
import uploadHandle from '../util/upload.js'
import '../less/Avatar.less'

function IconAvatar(props){
    let { size, handleClick, radius, avatarBG, unicode } = props;
    size = size || 39;
    const avatarContainerStyle = {
        width: size + 'px',
        height: size + 'px',
        lineHeight: size + 'px',
        fontSize: size/2 + 'px',
        background: avatarBG || '#128C7E',
        borderRadius: radius + 'px' || '50%'
    }
    return (
        <div className = 'IconAvatar' style = {avatarContainerStyle}>
            <i className = 'icon'>{unicode}</i>
        </div>
    );
}

export default PureRender(IconAvatar);