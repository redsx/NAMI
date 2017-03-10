import React, { Component } from 'react'
import {shouldComponentUpdate} from '../plugins/PureRender.js'

const ListItemWarp = (WrappedComponent,dealProps,handleClick) => class extends Component{
    constructor(props){
        super(props);
        this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
        this.handleClick = typeof handleClick === 'function' ? handleClick.bind(this) : function(){};
    }
    render(){
        const newProps = typeof dealProps === 'function' ? dealProps.call(this,this.props.showMessagePreviews) : {};
        return <WrappedComponent {...this.props} {...newProps} handleClick = {this.handleClick}/>
    }
}
export default ListItemWarp;