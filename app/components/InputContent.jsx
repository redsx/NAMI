import React, {Component} from 'react'
import autobind from 'autobind-decorator'
import language from '../config/language.js'
import InputButton from './InputButton.jsx'

import '../less/InputArea.less'

class InputContent extends Component{
    constructor(props){
        super(props);
    }
    @autobind
    handleClick(){
        const content = this.input.value ? this.input.value.trim() : '';
        this.props.handleSend(content);
        this.input.value = '';
    }
    @autobind
    handleEnter(e){
        if(e.keyCode === 13 && e.target === this.input) this.handleClick();
    }
    componentDidMount(){
        document.addEventListener('keydown',this.handleEnter);
    }
    componentWillUnmount(){
        document.removeEventListener('keydown',this.handleEnter);
    }
    render(){
        return (
            <div className = 'InputArea-input-content'>
                <input 
                    className = 'InputArea-input' 
                    ref = {ref => this.input = ref} 
                    placeholder = {language.inputAreaPlaceholder}
                    onPaste = {this.props.handlePaste}
                />
                {
                    this.props.isSupportRecorder?
                    <InputButton handleClick = {this.handleClick} title = {language.send} unicode = '&#xe666;'/>
                    :<InputButton handleClick = {this.handleClick} title = {language.send} unicode = '&#xe8f3;'/>
                }
            </div>
        );
    }
}
export default InputContent;