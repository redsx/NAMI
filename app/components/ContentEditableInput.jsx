import React , {Component} from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import autobind from 'autobind-decorator'

import '../less/ContentEditableInput.less'

class ContentEditableInput extends Component{
    constructor(props){
        super(props);
        const count = props.defaultContent ? props.count - props.defaultContent.length : props.count;
        this.state = {
            editable: props.intEditable, 
            count
        };
    }
    @autobind
    handleInput(e){
        const { count } = this.state;
        const length = e.target.innerText.length;
        if(typeof count === 'number') {
            this.setState({count: this.props.count-length});
        }
    }
    @autobind
    handleSubmit(){
        const content = this.edit.innerText.trim();
        if(this.state.count >= 0 && this.state.count < this.props.count && content.length !== 0){
            this.props.handleSubmit(content);
            this.setState({editable: false});
        }
    }
    // 解决设置默认值报错的问题
    // 官方好像并不推荐使用contentEditable
    // 这样处理会出现bug，也就是re-render的时候defaultContent变化并不会再次触发componentDidMount，当然除非组件重新Mount
    componentDidMount(){
        this.edit.innerText = this.props.defaultContent;
        this.edit.addEventListener('input',this.handleInput,false);
    }
    componentWillUnmount(){
        this.edit.removeEventListener('input',this.handleInput,false);
    }
    render(){
        const { defaultContent, contorllerBtn, multiLine } = this.props;
        const { editable, count } = this.state;
        const editStyle = {maxHeight: multiLine*22 + 'px'}
        const warnLine = count < 0 ? 'ContentEditableInput-bottom-warn-line' : 'ContentEditableInput-bottom-line';
        return (
            <div className = {editable ? 'ContentEditableInput '+warnLine : 'ContentEditableInput'}>
                <div 
                    contentEditable = {editable} 
                    ref = {ref => this.edit = ref} 
                    className = 'ContentEditableInput-edit scroll-hidden'
                    style = {editStyle}
                ></div>
                <div className = {count < 0 ?'ContentEditableInput-controller-warn':'ContentEditableInput-controller'}>
                    {
                        ( count && editable ) 
                        && 
                        <span className = 'ContentEditableInput-count'>{count}</span>}
                    { 
                        (contorllerBtn && !editable) 
                        && 
                        <span onClick = {()=>this.setState({editable: true})}><i className = 'icon ContentEditableInput-icon'>&#xe603;</i></span>
                    }
                    {
                        (contorllerBtn && editable) 
                        && 
                        <span onClick = {this.handleSubmit}><i className = 'icon ContentEditableInput-icon'>&#xe780;</i></span>
                    }
                </div>
            </div>
        );
    }
}

export default ContentEditableInput;