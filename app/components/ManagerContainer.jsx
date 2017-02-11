import React , { Component} from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

function ManagerContainer(props){
    return (
        <ReactCSSTransitionGroup
            component = 'div'
            transitionName = {props.transitionName}
            transitionEnterTimeout = {250}
            transitionLeaveTimeout = {250}
        >
            { props.children }
        </ReactCSSTransitionGroup>
    );
}
export default ManagerContainer;