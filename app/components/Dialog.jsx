import React , {Component} from 'react'
import DelayedAnimation from './DelayedAnimation.jsx'
import '../less/Dialog.less'

function Dialog(props){
    const { title, children, actions, open } = props;
    return (
        <div>
        {
            !open?null:
            <div className = 'Dialog'>
                <div className = 'Dialog-container'>
                <DelayedAnimation transitionName = 'DialogScale' delay = {0} timeout = {250}>
                    <div className = 'Dialog-content'>
                        <div className = 'Dialog-body'>
                            {title && <h2>title</h2>}
                            {children}
                        </div>
                        <div className = 'Dialog-button-group'>
                            {actions}
                        </div>
                    </div>
                </DelayedAnimation>
                </div>
            </div>
        }
        </div>
    );
}

export default Dialog;