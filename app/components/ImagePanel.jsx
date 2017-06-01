import React , {Component} from 'react'
import autobind from 'autobind-decorator'
import Avatar from '../components/Avatar.jsx'
import timeDeal from '../util/time.js'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import PureRender, {shouldComponentUpdate} from '../plugins/PureRender.js'
import { addExpression } from '../actions/combin.js'
import '../less/ImagePanel.less'
// 
class ImagePanel extends Component{
    constructor(props){
        super(props);
        this.state = {scale: 1};
    }
    @autobind
    handleZoomIn(){
        const scale = this.state.scale + 0.3;
        this.setState({scale: scale > 5 ? 5 : scale});
    }
    @autobind
    handleZoomOut(){
        const scale = this.state.scale - 0.3;
        this.setState({scale: scale < 0.3 ? 0.3 : scale})
    }
    render(){
        const style = {transform: `scale(${this.state.scale})`};
        const { content, isShow, handleClose } = this.props;
        const timestamp = content.get('timestamp'),
            _id = content.getIn(['owner','_id']),
            avatar = content.getIn(['owner','avatar']),
            image = content.get('Tcontent') || content.get('content'),
            nickname = content.getIn(['owner','nickname']);
        return (
            <ReactCSSTransitionGroup
                component = 'div'
                transitionName = 'DialogScale'
                transitionEnterTimeout = {500}
                transitionLeaveTimeout = {500}
            >
            {
                !isShow ? null : 
                <div className = 'ImagePanel'>
                    <header className = 'displayFlex ImagePanel-header'>
                        <Avatar size = {40} src = {avatar}/>
                        <div className = 'ImagePanel-info'>
                            <p className = 'textOver'>{'@ ' + nickname}</p>
                            <p className = 'textOver'>{timeDeal.getYDHString(timestamp)}</p>
                        </div>

                        <ul className = 'displayFlex ImagePanel-menu'>
                            <li onClick = {this.handleZoomIn}><i className = 'icon'>&#xe623;</i></li>
                            <li onClick = {this.handleZoomOut}><i className = 'icon'>&#xe622;</i></li>
                            <li onClick = {()=>addExpression({_id,expression: image})}><i className = 'icon'>&#xe8e4;</i></li>
                            <li><a href = {image} download = 'image'><i className = 'icon'>&#xe636;</i></a></li>
                            <li onClick = {handleClose}><i className = 'icon'>&#xe93d;</i></li>
                        </ul>
                        
                    </header>
                    <div className = 'ImagePanel-image-container displayFlex'>
                        <div className = 'ImagePanel-image' style = {style}>
                            <img src = {image}/>
                        </div>
                    </div>
                </div>
            }
            </ReactCSSTransitionGroup>
        );
    }
}

export default ImagePanel;