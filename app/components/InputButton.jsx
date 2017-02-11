import React , {Component} from 'react'

function InputButton(props){
    let { title, unicode, handleClick } = props
    return (
        <button className = 'InputArea-btn' title = {title} onClick = {handleClick}>
            <i className = 'icon'> {unicode} </i>
        </button>
    );
}

export default InputButton;