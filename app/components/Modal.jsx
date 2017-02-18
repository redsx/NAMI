import React , { Component} from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import '../less/Modal.less'
function Modal(props){
    const { open, title, handleClose, children } = props;
    return (
        <div>
            {
                !open ? null:
                <div className = 'Modal'>
                    <div className = 'Modal-container'>
                        <div className = 'Modal-content displayFlex'>
                            <header className = 'Modal-header'>
                                <span onClick = {handleClose}><i className = 'icon'>&#xe604;</i></span>
                                <span className = 'Modal-title'>{title}</span>
                            </header>
                            <div className = 'Modal-body'>
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}
export default Modal;