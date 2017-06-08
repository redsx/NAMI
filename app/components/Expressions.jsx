import React , {Component} from 'react'
import config from '../config/config.js'
import '../less/expressions.less'

const expressions = config.expressions;

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