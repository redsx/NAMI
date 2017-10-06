import React , {Component} from 'react'
import autobind from 'autobind-decorator'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { shouldComponentUpdate } from '../plugins/PureRender.js'
import Trigger from '../containers/Trigger.js'
import '../less/IconMenu.less'

class IconMenu extends Component{
    constructor(props){
        super(props);
        this.state = { isShow: false};
        this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
    }
    @autobind
    handleClick(e){
        if(this.state.isShow){
            this.setState({isShow: false});
        } else{
            let pX = e.pageX,
                pY = e.pageY,
                winX = window.innerWidth,
                winY = window.innerHeight,
                menuX = this.props.width || 195,
                menuY = this.props.height || 160;
            let x = 38, y = 22;
            if(menuX > winX - pX){
                x = -menuX + 38 ;
            }
            if(menuY > winY - pY){
                y = -menuY - 22;
            }
            this.setState({
                isShow: true,
                menuStyle: {
                    left: x + 'px',
                    top: y + 'px',
                    width: menuX + 'px',
                }
            });
        }
    }
    componentDidMount() {
        this.props.onPopup &&
        this.props.onPopup(
            'click',
            () => this.setState(() => ({isShow: false}))
        )
    }
    render(){
        let { iconButtonElement, className } = this.props;
        return (
            <div 
                onClick = {this.handleClick} 
                className = {'IconMenu-container'+ ' '+className}
            >
                {iconButtonElement}
            <ReactCSSTransitionGroup
                component = 'div'
                transitionName = {'IconMenu'}
                transitionEnterTimeout = {250}
                transitionLeaveTimeout = {250}
            >
                { 
                    this.state.isShow &&
                    <div
                        className = 'IconMenu-menu' 
                        style = {this.state.menuStyle}
                    >
                        {this.props.children}
                    </div>
                }
            </ReactCSSTransitionGroup>
            </div>
        );
    }
}

export default Trigger(IconMenu);