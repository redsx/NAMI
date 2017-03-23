import immutable from 'immutable'
import autobind from 'autobind-decorator'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import Loading from '../components/Loading.jsx'
import PureRender, { shouldComponentUpdate } from '../plugins/PureRender.js'
import { socketEmit } from '../actions/common.js'
import { errPrint } from '../actions/combin.js'
import SearchInput from '../components/SearchInput.jsx'

const ContactListWrap = (ItemComponent,handleSearch) => class extends Component{
    constructor(props){
        super(props);
        this.state = {users:[], isLoading: false};
        if(Object.prototype.toString.call(handleSearch) === '[object Function]'){
            this.handleSearch = handleSearch.bind(this);
        }
    }
    componentDidMount(){
        this.handleSearch && this.handleSearch('','online').catch(err => err);
    }
    render(){
        return (
            <div className = 'ActiveList-container'>
                <SearchInput handleSearch = {this.handleSearch}/>
                {
                    this.state.isLoading? <Loading /> :
                    <ul className = 'List ActiveList-content'>
                    {
                        this.state.users.map((user) => {
                            return <ItemComponent key = {`contact-${user._id}`} user = {user}/>;
                        })
                    }
                    </ul>
                }
            </div>
        );
    }
}
export default ContactListWrap;