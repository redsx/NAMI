import immutable from 'immutable'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import PureRender, { shouldComponentUpdate } from '../plugins/PureRender.js'
import SearchInput from '../components/SearchInput.jsx'

const ActiveListWrap = (ItemComponent) => class extends Component{
    constructor(props){
        super(props);
        this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
    }
    render(){
        const list = this.props.list.toJS ?this.props.list.toJS() : {};
        const histories = this.props.histories || immutable.fromJS({});
        return (
            <div className = 'ActiveList-container'>
                <SearchInput/>
                <ul className = 'List ActiveList-content'>
                {
                    Object.keys(list).map((item)=>{
                        if(list[item]['name']){
                            const roomHis = list[item]['histories'] || [];
                            const history = histories.get(roomHis[roomHis.length - 1]);
                            return <ItemComponent 
                                    room = {immutable.fromJS(list[item])}
                                    history = {history}
                                    key = {`ActiveList-${item}`} 
                                    isSelect = {list[item]['_id'] === this.props.curRoom}
                                    showMessagePreviews = {this.props.showMessagePreviews}
                                />
                        }
                    })
                }
                </ul>
            </div>
        );
    }
}
export default (ListItem) => (
    connect(
        (state) => ({
            curRoom: state.getIn(['user','curRoom']),
            list: state.get('activeList'),
            histories: state.get('messages'),
            showMessagePreviews: state.getIn(['pageUI','notifications','showMessagePreviews']),
        })
    )(ActiveListWrap(ListItem))
);