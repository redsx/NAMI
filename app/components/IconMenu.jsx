import React , {Component} from 'react'
import autobind from 'autobind-decorator'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { shouldComponentUpdate } from '../plugins/PureRender.js'
import '../less/IconMenu.less'

class IconMenu extends Component{
    constructor(props){
        super(props);
        this.state = { isShow: false};
        this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
    }
    @autobind
    handleClick(e){
        e.stopPropagation();
        if(this.state.isShow){
            this.setState({isShow: false});
        } else{
            let x = e.pageX,
                y = e.pageY,
                winX = window.innerWidth,
                winY = window.innerHeight,
                menuX = this.props.width || 195,
                menuY = this.props.height || 160;
            if(menuX > winX - x){
                x = x - (menuX + x - winX) - 15;
            }
            if(menuY > winY - y){
                y = y - (menuY + y -winY) - 15;
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
    render(){
        let { iconButtonElement, className } = this.props;
        return (
            <div onClick = {this.handleClick} className = {'IconMenu-container'+ ' '+className}>
            {iconButtonElement}
            {this.state.isShow && <div className = 'IconMenu-menu-container'></div>}
            <ReactCSSTransitionGroup
                component = 'div'
                transitionName = {'IconMenu'}
                transitionEnterTimeout = {250}
                transitionLeaveTimeout = {250}
            >
            { this.state.isShow && <div className = 'IconMenu-menu' style = {this.state.menuStyle}> {this.props.children}</div>}
            </ReactCSSTransitionGroup>
            </div>
        );
    }
}

export default IconMenu;