import React , {PropTypes, Component} from 'react'
import { shouldComponentUpdate } from '../plugins/PureRender.js'
import config from '../config/config.js'
import MessageBox from './MessageBox.jsx'

class FileMessage extends Component{
    constructor(props){
        super(props);
        this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
    }
    render(){
        const isLoading =  this.props.content.get('isLoading');
        let content = this.props.content.get('Tcontent') || this.props.content.get('content');
        try{
            content = JSON.parse(content);
        }catch(err){
            console.warn(err);
        }
        const { src, fileName, size } = content;
        return (
            <MessageBox {...this.props}>
                <div className = 'FileMessage displayFlex'>
                    <div className = 'FileMessage-icon'><img src={config.FileImage} /></div>
                    <div className = 'FileMessage-fileName'>
                        <p className = 'textOver'>{fileName}</p>
                        <p className = 'FileMessage-size textOver'>{size}</p>
                    </div>
                    <a href = {src} download = {fileName} className = 'FileMessage-download'><i className='icon'>&#xe60e;</i></a>
                </div>
            </MessageBox>
        );
    }
}
export default FileMessage;
