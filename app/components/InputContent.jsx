import React, {Component} from 'react'
import autobind from 'autobind-decorator'
import language from '../config/language.js'
import config from '../config/config.js'
import InputButton from './InputButton.jsx'
import Expressions from './Expressions.jsx'
import { setExpressionState } from '../actions/pageUI.js'
import handleClipboard from '../util/clipboard.js'

import '../less/InputArea.less'

class InputContent extends Component{
    constructor(props){
        super(props);
        this.state = {
            isInput: !props.isSupportRecorder,
            expressionState: false,
        };
    }
    @autobind
    handleClick(){
        const content = this.input.value ? this.input.value.trim() : '';
        this.props.handleSend(content);
        this.input.value = '';
        this.input.focus();
    }
    @autobind
    handleKeyDown(e){
        if(e.ctrlKey || e.metaKey){
            // '⌘'
            const key = e.key.toLocaleUpperCase();
            if(e.keyCode === 13){
                this.handleToggleExp(!this.state.expressionState);
            } else if(this.props.showExpressions && config.keyMap[key] && e.target === this.input){
                e.preventDefault();
                handleClipboard.insertAtCursor(this.input, `#(${config.keyMap[key]})`, true);
            }
        } else if(e.keyCode === 13 && e.target === this.input){
            this.handleClick();
        }
    }
    @autobind
    handleChange(e){
        if(this.props.isSupportRecorder){
            if(!this.state.isInput && e.target.value !== ''){
                return this.setState({isInput: true});
            }
            if(this.state.isInput && e.target.value === ''){
                return this.setState({isInput: false});
            }
        }
    }
    @autobind
    addExpression(val){
        handleClipboard.insertAtCursor(this.input, val);
        this.input.focus();
    }
    @autobind
    handleToggleExp(state){
        this.setState({expressionState: state});
        this.input.focus();
    }    
    componentDidMount(){
        document.addEventListener('keydown',this.handleKeyDown);
    }
    componentWillUnmount(){
        document.removeEventListener('keydown',this.handleKeyDown);
    }
    render(){
        const expressionState = this.state.expressionState;
        return (
            <div className = 'InputArea-input-content'>
                <div className = 'InputArea-Expressions' onClick = {()=>this.handleToggleExp(false)}>
                    <Expressions addExpression = {this.addExpression} expressionState = {expressionState}/>
                </div>
                <input 
                    className = 'InputArea-input'
                    ref = {ref => this.input = ref} 
                    disabled = {this.props.isBlock}
                    placeholder = {this.props.isBlock?language.blockAreaPlaceholder:language.inputAreaPlaceholder}
                    onPaste = {this.props.handlePaste}
                    onChange = {this.handleChange}
                    onFocus = {() => setExpressionState(false)}
                />
                <button onClick = {()=>this.handleToggleExp(!expressionState)} className = 'InputArea-default-emoji'>
                    <i className = 'icon'> &#xe78a;</i>
                </button>
                {
                    !this.state.isInput?
                    <InputButton handleClick = {this.handleClick} title = {language.send} unicode = '&#xe666;'/>
                    :<InputButton handleClick = {this.handleClick} title = {language.send} unicode = '&#xe8f3;'/>
                }
            </div>
        );
    }
}
export default InputContent;