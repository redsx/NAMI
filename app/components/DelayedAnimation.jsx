import React , {Component} from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

class DelayedAnimation extends Component{
    constructor(props){
        super(props);
        this.state = { isShow: false};
    }
    componentDidMount(){
        this.timer = setTimeout(() => this.setState({isShow: true}),this.props.delay*1000);
    }
    componentWillUnmount(){
        if(this.timer) clearTimeout(this.timer);
    }
    render(){
        const { timeout, transitionName } = this.props;
        return (
            <ReactCSSTransitionGroup
                component = 'div'
                transitionName = {transitionName}
                transitionEnterTimeout = {timeout || 500}
                transitionLeaveTimeout = {timeout || 500}
            >
            {this.state.isShow ? this.props.children : null}
            </ReactCSSTransitionGroup>
        );
    }
}

export default DelayedAnimation;