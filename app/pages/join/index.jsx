import React , { Component } from 'react'
import { connect } from 'react-redux'
import { joinRoom } from '../../actions/combin.js'

class Join extends Component {
    constructor(props){
        super(props);
    }
    componentWillReceiveProps(nextProps){
        const { _id, params } = this.props;
        const n_id = nextProps._id;
        if((_id !== n_id) || (params.link !== nextProps.params.link)) joinRoom({user: n_id, inviteLink: nextProps.params.link});
    }
    componentDidMount(){
        const { _id, params } = this.props;
        _id && joinRoom({user: _id, inviteLink: params.link});
    }
    render(){
        return <div></div>;
    }
}
export default connect(state => ({_id: state.getIn(['user','_id'])}))(Join);