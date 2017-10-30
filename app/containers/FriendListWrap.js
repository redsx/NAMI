import React, { Component } from 'react'
import { connect } from 'react-redux'
import immutable from 'immutable'
import autobind from 'autobind-decorator'
import language from '../config/language.js'
import { errPrint } from '../actions/combin.js'
import { getFriendList } from '../actions/user.js'
import ListItem from '../components/ListItem.jsx'

const FriendListWrap = (ItemComponent) => class extends Component{
    constructor(props){
        super(props);
        this.state = {lists: []};
    }
    componentDidMount(){
        getFriendList({_id: this.props._id})
        .then((ret) => {
            console.log('ret: ', ret);
            this.setState(() => ({lists: ret}));
        })
    }
    getNestedItems(users) {
        return users.map((user) => {
            return <ItemComponent key = {`friend-${user._id}`} user = {user}/>
        })
    }
    render(){
        // item.name.slice(0,1)
        return (
            <div className = 'ActiveList-container'>
                <ul className = 'List ActiveList-content'>
                    {
                        this.state.lists.map((item) => {
                            return (
                                <ListItem 
                                    icon = {item.name.slice(0,1)}
                                    name = {item.name}
                                    key = {item._id}
                                    nestedItems = {this.getNestedItems(item.users)}
                                />
                            );
                        })
                    }
                </ul>
            </div>
        );
    }
}
export default FriendListWrap;