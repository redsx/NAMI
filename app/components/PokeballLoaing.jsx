import React , { Component } from 'react'
import { connect } from 'react-redux'

import '../less/PokeballLoading.less'

function PokeballLoading(props){
    return props.loadingState.get('isShow')?(
        <div className = 'PokeballLoading-container'>
            <div className = 'PokeballLoading-loading'>
                <div className = 'PokeballLoading-rotate PokeballLoading-ball-normal'></div>
                <div className = 'PokeballLoading-rotate PokeballLoading-ball-great'></div>
                <div className = 'PokeballLoading-rotate PokeballLoading-ball-ultra'></div>
                <div className = 'PokeballLoading-rotate PokeballLoading-ball-master'></div>
                <div className = 'PokeballLoading-rotate PokeballLoading-ball-safari'></div>
                <p className = 'PokeballLoading-text'>{props.loadingState.get('text')}</p>
            </div>
        </div>
    )
    :null
}
export default PokeballLoading;