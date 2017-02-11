import React , {Component} from 'react'

function ProfileButton(props){
    const { handleClick, unicode, text, className } = props;
    const colorStyle = {color: props.color || '#929fa6'};
    return (
        <div className = {'Profile-button textOver '+ className} onClick = {handleClick} style = {colorStyle}>
            <i className = 'icon Profile-button-icon'>{unicode}</i>
            <span>{text}</span>
        </div>
    );
}
export default ProfileButton;