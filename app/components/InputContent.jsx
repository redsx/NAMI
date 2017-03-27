import React, {Component} from 'react'
import autobind from 'autobind-decorator'
import language from '../config/language.js'
import InputButton from './InputButton.jsx'

import '../less/InputArea.less'

class InputContent extends Component{
    constructor(props){
        super(props);
        this.state = {isInput: !props.isSupportRecorder};
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
                    onChange = {this.handleChange}
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