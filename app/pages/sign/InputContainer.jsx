import React , { Component } from 'react'

export default function InputContainer(props){
    return (
        <div className = 'sign-control-group'>
            <div className = 'sign-controls'>
                {props.children}
            </div>
        </div>
    );
}