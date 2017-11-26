import React , {PropTypes, Component} from 'react'
import { setVideoCtrlState } from '../actions/pageUI.js'
import '../less/VideoCtrl.less'

class Video extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this._handleClick.bind(this);
    this.initVeidoCtrl = this._initVeidoCtrl.bind(this);
  }
  _initVeidoCtrl() {
    const { videoCtrlState } = this.props;
    if(window.innerWidth>680 && videoCtrlState) {
      setVideoCtrlState(false);
    } 
    if(window.innerWidth <= 680 && !videoCtrlState) {
      setVideoCtrlState(true);
    }
  }
  componentDidMount() {
    this.initVeidoCtrl();
    window.addEventListener('resize', this.initVeidoCtrl);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.initVeidoCtrl);
  }
  _handleClick() {
    const { videoCtrlState } = this.props;
    setVideoCtrlState(!videoCtrlState);
  }
  render() {
    return(
        <div className = 'VideoCtrl' onClick={this.handleClick}>
          {
            this.props.videoCtrlState ? 
            <img src = 'http://oj7h98lzb.bkt.clouddn.com/upload_4330ae4bdefe250788102065b0a2e953.svg' />
            :<img src = 'http://oj7h98lzb.bkt.clouddn.com/upload_ca2b83c76418c8ecfc22ff854d0732e6.svg' />
          }
        </div>
    );
  }
}

export default Video;
