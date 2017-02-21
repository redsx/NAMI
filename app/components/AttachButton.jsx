import React , {Component} from 'react'
import language from '../config/language.js'
import config from '../config/config.js'

import '../less/AttachButton.less'

class AttachButton extends Component{
    constructor(props){
        super(props);
        this.state = {showMenu: false}
    }
    render(){
        const showMenu = this.state.showMenu;
        return (
            <span className = 'AttachButton'>
                <span onClick = {()=>this.setState({showMenu: !showMenu})} >
                    <i className = 'icon Header-icon' title = {language.attach}>&#xe7cc;</i>
                </span>
                <div className = 'AttachButton-menu'>
                    <ul style = {{pointerEvents: showMenu?'auto':'none'}}>
                        {
                            config.bgCoordinates.map((coordinateInfo,index)=>{
                                const { title,coordinate } = coordinateInfo;
                                const style = {
                                    backgroundPosition: coordinate[0] + 'px ' + coordinate[1]+'px',
                                    transform: `translateY(${-68*(index+1)+ 'px'}) scaleX(0) scaleY(0)`,
                                    transitionDelay: index*0.06 + 's'
                                }
                                return (
                                    <li className = 'AttachButton-menu-item' key={`AttachButton-${index}`}>
                                        <div className = 'AttachButton-item-title'><span className = 'AttachButton-item-text'>{title}</span></div>
                                        <button style = {style} className = {showMenu ? 'AttachButton-item-active':'AttachButton-item'}></button>
                                    </li>
                                );
                            })
                        }
                    </ul>
                </div>
            </span>
        );
    }
}

export default AttachButton;