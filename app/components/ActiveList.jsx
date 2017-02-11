import React , {Component} from 'react'
import immutable from 'immutable'
import ActiveListItem from '../containers/ActiveListItem.js'
import IconMenu from './IconMenu.jsx'
import '../less/ActiveList.less'

function Menu(props){
    return (
        <IconMenu iconButtonElement={<i className = 'icon'>&#xe60d;</i>}>
            <ul className = 'List'>
                <li className = 'List-item'>Archive chat</li >
                <li className = 'List-item'>Mute</li >
                <li className = 'List-item'>Exit group</li >
                <li className = 'List-item'>Mark as unread</li >
            </ul>
        </IconMenu>
    );
}

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
export default ActiveList;