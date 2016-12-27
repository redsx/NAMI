import React, {Component} from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import '../less/Snackbar.less'
class Snackbar extends Component{
    constructor(props){
        super(props);
    }
    render(){
        let {snackbars} = this.props;
        console.log(snackbars.toJS());
        return (
            <div className = 'Snackbar-container'>
            <ReactCSSTransitionGroup
                component = 'div'
                transitionName = 'Snackbar'
                transitionEnterTimeout = {250}
                transitionLeaveTimeout = {250}
            >
            {
                snackbars.map((item,index)=>{
                    return (
                        <div key = {`Snackbar-${index}`}>
                            <span className = 'Snackbar-content'>
                                <span> {item}</span>
                            </span>
                        </div>
                    );
                })
            }
            </ReactCSSTransitionGroup>
            </div>
        );
    }
}
export default Snackbar;