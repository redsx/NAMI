import React, { Component } from 'react'
import { connect } from 'react-redux'
import immutable from 'immutable'
import autobind from 'autobind-decorator'
import PureRender, { shouldComponentUpdate } from '../plugins/PureRender.js'
import language from '../config/language.js'
import { errPrint } from '../actions/combin.js'
import { getBlockList } from '../actions/user.js'

const BlockListWrap = (ItemComponent) => class extends Component{
    constructor(props){
        super(props);
        this.state = {blocks:[]};
    }
    componentDidMount(){
        getBlockList({_id: this.props._id})
        .then(ret => this.setState({blocks: ret.blocks}))
        .catch(err => errPrint(err));
    }
    render(){
        const { blocks, _id } = this.props;
        return (
            <div className = 'ActiveList-container'>
                <ul className = 'List ActiveList-content'>
                {
                    this.state.blocks.map((user) => {
                        if(blocks.includes(user._id)){
                            return <ItemComponent key = {`contact-${user._id}`} user = {user} _id = {_id}/>;
                        }
                    })
                }
                </ul>
                <div className = 'Profile-transparent'>{language.blockTran}</div>
            </div>
        );
    }
}
export default BlockListWrap;