import React, { Component } from 'react'
import { connect } from 'react-redux'
import autobind from 'autobind-decorator'
import { shouldComponentUpdate } from '../plugins/PureRender.js'
import { getRoomInfo, updateRoomInfo } from '../actions/activeList.js'
import { changeRoomInfo, exitRoom } from '../actions/combin'
import RoomProfile from '../components/RoomProfile.jsx'

const RoomProfileWarp = (WrappedComponent) => class extends Component{
    constructor(props){
        super(props);
        this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
        this.state = {isLoading: true};
        this.roomInfo = {
            _id: props.user.get('curRoom'),
            creater: props.user.get('_id')
        }
    }
    componentDidMount(){
        this.isMount = true;
        const _id = this.props.user.get('curRoom');
        getRoomInfo({_id})
        .then((ret) => {
            ret.isLoading = false;
            this.isMount && this.setState(ret);
        });
    }
    componentWillUnmount(){
        this.isMount = false;
    }
    @autobind
    handleChangeRoominfo(key){
        return (content) => {
            let info = this.roomInfo;
            info[key] = content;
            changeRoomInfo(info);
        }
    }
    @autobind
    handleExitRoom(){
        const info = {
            room: this.props.user.get('curRoom'),
            user: this.props.user.get('_id')
        }
        exitRoom(info);
    }
    render(){
        const createrId =  this.state.creater ? this.state.creater._id : '';
        const isCreater = this.props.user.get('_id') === createrId;
        const handleChangeRoominfo = isCreater ? this.handleChangeRoominfo : null;
        return <WrappedComponent 
            isCreater = {isCreater}
            handleChangeRoominfo = {handleChangeRoominfo}
            handleExitRoom = {this.handleExitRoom}
            {...this.state}
        />
    }
}

export default RoomProfileWarp(RoomProfile)