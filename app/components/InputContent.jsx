import React, {Component} from 'react'
import autobind from 'autobind-decorator'
import language from '../config/language.js'
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
        this.dbTime = 0;
    }
    @autobind
    handleClick(){
        const content = this.input.value ? this.input.value.trim() : '';
        this.props.handleSend(content);
        this.input.value = '';
    }
    @autobind
    handleKeyDown(e){
        let isDbSpace = false;
        if(e.keyCode === 32){
            if(Date.now() - this.dbTime < 200){
                e.preventDefault();
                isDbSpace = true;
            } 
            this.dbTime = Date.now();
        }
        if(e.keyCode === 13 && e.target === this.input){
            this.handleClick();
        }
        if(isDbSpace && e.target === this.input && this.props.showExpressions){
            const expressionState = !this.state.expressionState
            this.setState({expressionState});
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
    componentDidMount(){
        document.addEventListener('keydown',this.handleKeyDown);
    }
    componentWillUnmount(){
        document.removeEventListener('keydown',this.handleKeyDown);
    }
    render(){
        return (
            <div className = 'InputArea-input-content'>
                <div className = 'InputArea-Expressions'>
                    <Expressions addExpression = {this.addExpression} expressionState = {this.state.expressionState}/>
                </div>
                <input 
                    className = 'InputArea-input'
                    ref = {ref => this.input = ref} 
                    disabled = {this.props.isBlock}
                    placeholder = {this.props.isBlock?language.blockAreaPlaceholder:language.showExpressions}
                    onPaste = {this.props.handlePaste}
                    onChange = {this.handleChange}
                    onFocus = {() => setExpressionState(false)}
                />
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