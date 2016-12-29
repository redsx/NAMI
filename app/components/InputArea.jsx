import React, {Component} from 'react'
import language from '../config/language.js'
import '../less/InputArea.less'
class InputArea extends Component{
    constructor(props){
        super(props);
        this.state = {
            showPalceholder: true
        }
    }
    render(){
        let { showPalceholder } = this.state;
        return (
            <div className = 'InputArea-container'>
                <button className = 'InputArea-btn' title = {language.emoji}><i className = 'icon'>&#xe678;</i></button>
                <div className = 'InputArea-input-content'>
                    <input className = 'InputArea-input' placeholder = {language.inputAreaPlaceholder}/>
                </div>
                <button className = 'InputArea-btn' title = {language.send}><i className = 'icon'>&#xe8f3;</i></button>
            </div>
        );
    }
}
export default InputArea;