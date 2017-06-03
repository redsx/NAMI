import immutable from 'immutable'
import React, { Component } from 'react'
import autobind from 'autobind-decorator'
import { browserHistory } from 'react-router'

import {shouldComponentUpdate} from '../../plugins/PureRender.js'
import { login, signUp } from '../../actions/user.js'
import { pushSnackbar } from '../../actions/pageUI.js'
import language from '../../config/language.js'
import { mergeUserInfo } from '../../actions/user.js'

const InputValidate = (WrappedComponent) => class extends Component{
    constructor(props){
        super(props);
        this.state = {
            errorInput: immutable.fromJS({}),
            btnDisabled: false,
        };
        this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
    }
    @autobind
    handleBlur(e,name){
        let target = e.target || {};
        name = name || target.name;
        if(target.value === null || target.value === ''){
            this.setState({
                errorInput: this.state.errorInput.set(name,true)
            })
        }
    }
    @autobind
    handleChange(e,name){
        let target = e.target || {};
        name = name || target.name;
        if(target.value !== '' && this.state.errorInput.get(name)){
            this.setState({
                errorInput: this.state.errorInput.set(name,false)
            })
        }
    }
    @autobind
    handleSign(info,isLogin){
        this.setState({btnDisabled: true});
        (() => isLogin? login(info) : signUp(info))()
        .then((resault)=>{
            localStorage.setItem('token',resault.token);
            mergeUserInfo({token: resault.token});
            browserHistory.push('/');
        })
        .catch((err)=>{
            this.setState({btnDisabled: false});
            pushSnackbar(language[err]);
        })
    }
    render(){
        let newProps = {
            handleBlur: this.handleBlur,
            handleChange: this.handleChange,
            handleSign: this.handleSign
        }
        return <WrappedComponent {...this.props} {...newProps} {...this.state}/>
    }
}

export default InputValidate;