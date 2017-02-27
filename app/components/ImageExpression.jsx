import React , {PropTypes, Component} from 'react'
import '../less/ImageExpression.less'

const src = 'http://cdn.suisuijiang.com/message_1480558412404.png';
function ImageExpression(props){
    return (
        <div className = 'ImageExpression'>
            <ImageComponent src={src} />
            <ImageComponent src={src} />
            <ImageComponent src={src} />
            <ImageComponent src={src} />
            <ImageComponent src={src} />
            <ImageComponent src={src} />
            <ImageComponent src={src} />
            <ImageComponent src={src} />
            <ImageComponent src={src} />
            <ImageComponent src={src} />
            <ImageComponent src={src} />
            <ImageComponent src={src} />
            <ImageComponent src={src} />
            <ImageComponent src={src} />
            <ImageComponent src={src} />
            <ImageComponent src={src} />
            <ImageComponent src={src} />
            <ImageComponent src={src} />
            <ImageComponent src={src} />
        </div>
    );
}
class ImageComponent extends Component{
    constructor(props){
        super(props);
    }
    handleMouseOver(e){
        console.log(e.pageX);
        console.log(e.pageY);
    }
    handleMouseLeave(){

    }
    render(){
        return (
            <div className = 'ImageExpression-image-container'>
                <img className = 'ImageExpression-image' src = {this.props.src}/>
                <img className = 'ImageExpression-image-zoom' src = {this.props.src}/>
            </div>
        );
    }
}

export default ImageExpression;
