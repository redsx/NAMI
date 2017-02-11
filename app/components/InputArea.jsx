import React, {Component} from 'react'
import language from '../config/language.js'
import InputButton from './InputButton.jsx'
import InputContent from '../containers/InputContent.js'
import '../less/InputArea.less'

function InputArea(props){
    return (
        <div className = 'InputArea-container'>
            <InputButton title = {language.emoji} unicode = '&#xe678;' />
            <InputContent  />
        </div>
    );
}

export default InputArea;