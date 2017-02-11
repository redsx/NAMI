import React, { Component } from 'react'
import { connect } from 'react-redux'
import immutable from 'immutable'
import PureRender from '../plugins/PureRender.js'
import { changeRoom } from '../actions/combin.js'
import language from '../config/language.js'
import ActiveListItem from './ActiveListItem.js'
import '../less/ActiveList.less'

function ActiveList(props){
    const list = props.list.toJS ?props.list.toJS() : {};
    const histories = props.histories || immutable.fromJS({});
    return (
        <div className = 'ActiveList-container'>
            <ul className = 'List ActiveList-content'>
            {
                Object.keys(list).map((item)=>{
                    if(list[item]['name']){
                        const roomHis = list[item]['histories'] || [];
                        const history = histories.get(roomHis[roomHis.length - 1]);
                        return <ActiveListItem 
                                room = {immutable.fromJS(list[item])}
                                history = {history}
                                key = {`ActiveList-${item}`} 
                                isSelect = {list[item]['_id'] === props.curRoom}
                            />
                    }
                })
            }
            </ul>
        </div>
    );
}

export default connect(
    (state) => ({
        title: language.group,
        curRoom: state.getIn(['user','curRoom']),
        list: state.get('activeList'),
        histories: state.get('messages')
    })
)(PureRender(ActiveList));