import React,{Component} from 'react'
import './miniPlayer.scss'
class miniPlayer extends Component{
  render(){
    return (
      <div className="mini-player" v-show="!fullScreen" >
        <div className="icon">
          <img width="40" height="40" alt=""/>
        </div>
        <div className="text">
          <h2 className="name">1</h2>
          <p className="desc"></p>
        </div>
        <div className="control">
          {/* <progress-circle :radius="radius" :percent="percent">
            <i @click.stop="togglePlaying" className="icon-mini" :className="miniIcon"></i>
          </progress-circle> */}
        </div>
        <div className="control" >
          <i className="icon-playlist"></i>
        </div>
      </div>
    )
  }
}

export default miniPlayer;