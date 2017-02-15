// RaisedButton
import React , {Component} from 'react'
import '../less/RaisedButton.less'

const disabledStyle = {
    color: 'rgba(0, 0, 0, 0.298039)',
    backgroundColor: '#e5e5e5'
}
function RaisedButton(props){
    const { disabled, children, backgroundColor, handleClick, label, color, buttonStyle } = props;
    const style = Object.assign({backgroundColor,color},buttonStyle);

    return (
        <button className = 'RaisedButton' disabled = {disabled} onClick = {handleClick} style = {disabled?disabledStyle:style}>
            {children}
            <span className = 'RaisedButton-label'>{label}</span>
        </button>
    );
}

export default RaisedButton;