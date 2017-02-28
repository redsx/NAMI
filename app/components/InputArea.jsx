import React, {Component} from 'react'
import EmojiButton from '../containers/EmojiButton.js'
import InputContent from '../containers/InputContent.js'
import '../less/InputArea.less'

function InputArea(props){
    return (
        <div className = 'InputArea-container'>
            <EmojiButton />
            <InputContent />
        </div>
    );
}

export default InputArea;