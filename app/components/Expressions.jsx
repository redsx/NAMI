import React , {Component} from 'react'

import '../less/expressions.less'

const expressions = ['呵呵', '哈哈', '吐舌', '啊', '酷', '怒', '开心', '汗', '泪', '黑线',
                     '鄙视', '不高兴', '真棒', '钱', '疑问', '阴险', '吐', '咦', '委屈', '花心', 
                     '呼', '笑眼', '冷', '太开心', '滑稽', '勉强', '狂汗', '乖', '睡觉', '惊哭',
                     '升起', '惊讶', '喷'];

class Expressions extends React.Component{
    constructor(props){
        super(props);
    }
    handleClick(expression){
        this.props.addExpression(`#(${expression})`);
    }
    renderExpressions(){
        return expressions.map((item,index) => {
            return (
                <div
                    key = {index}
                    className = 'expressions'
                    onClick = {()=>{this.handleClick(item)}}
                >
                    <div
                        className = 'expression'
                        style = {{
                            background:'url("./images/expressions.png") 0px '+ (-index)*30 + 'px no-repeat'
                        }}
                    ></div>
                </div>
            );
        })
    }
    render(){
        const isShow = this.props.expressionState;
        return (
            isShow &&
            <div className = 'expressionsBox'>
                {this.renderExpressions()}
            </div>
        );
    }
}
export default Expressions;