import React from 'react'
import './loading.scss'
import loadingImg from './loading.gif'
const MusicLoading =(props) => {
    const {loadingText} = props;
    return( 
        <div className="loading-wrapper">
            <img className="loading-img" src={ loadingImg } alt=""/>
            <p className="loading-text"> { loadingText } </p>
        </div>
    )
}

export default MusicLoading;