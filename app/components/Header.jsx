import React , {Component} from 'react'
import '../less/Header.less'

function Header(props){
    let { leftElement, rightElement, title } = props;
    return (
        <header className = 'Header'>
            <div>{leftElement}</div>
            {typeof title === 'string'? 
                <h3 className = 'Header-title'>{title}</h3> : <div className = 'Header-title'>{title}</div>}
            <div>{rightElement}</div>
            {props.children}
        </header>
    );
}

export default Header;