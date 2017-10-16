import React , { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { changeRoom } from '../../actions/combin.js'

class Chat extends Component {
    constructor(props){
        super(props);
    }
    componentWillReceiveProps(nextProps){
        const { params } = this.props;
        if(
            params.link !== nextProps.params.link
        ) {
            changeRoom(true)(params.link);
        }
    }
    componentDidMount(){
        const { params } = this.props;
        changeRoom(true)(params.link);
        browserHistory.push('/');
    }
    render(){
        return <div></div>;
    }
}
export default Chat;