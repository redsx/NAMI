import React , { Component } from 'react'
import '../less/Loading.less'

function Loading(props){
    return (
        <div className = 'Loading'>
            <div className = 'Loading-container displayFlex'>
                <div className = 'Loading-loader'></div>
            </div>
        </div>
    )
}
export default Loading;