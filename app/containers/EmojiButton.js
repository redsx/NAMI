import React, { Component } from 'react'
import { connect } from 'react-redux'
import language from '../config/language.js'
import { setExpressionState } from '../actions/pageUI.js'
import InputButton from '../components/InputButton.jsx'

function EmojiButton(props){
    const showExpression = props.showExpression;
    const unicode = showExpression?'':'';
    return <InputButton 
        title = {language.emoji} 
        unicode = {unicode} 
        handleClick = {()=>{setExpressionState(!showExpression)}}
    />
}


export default connect(state => {
    return {
        showExpression: state.getIn(['pageUI','expressionState'])
    }
})(EmojiButton);