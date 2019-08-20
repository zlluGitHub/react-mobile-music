import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import MusicLoading from '../../base/loading/loading.jsx'
// import Lazy from "../../base/Lazy/Lazy"
import './songList.scss'
import * as actionCreators from '../../store/actionCreators'
class MusicSongList extends Component {
  render() {
    return (
      <div className="songListWrapper">
        <div className="songTitle">热门歌单推荐</div>
        <ul className="songlist">{this.renderSongList()}</ul>
        {this.loading()}
      </div>
    )
  }
  renderSongList() {
    let songList = []
    if (this.props.songs) {
      this.props.songs.map(item => {
        songList.push(
          <Link
            to={`${this.props.match.url}detail/${item.dissid}`}
            key={item.dissid}
          >
            <li className="listItem">
              <img className="item-img" src={item.imgurl} />
              <div className="item-title-box">
                <h2 className="main-title">{item.dissname}</h2>
                <p className="title-desc">{item.creator.name}</p>
              </div>
            </li>
          </Link>
        )
      })
      return songList
    }
  }
  loading() {
    if (this.props.songs.length === 0) {
      return <MusicLoading loadingText="玩命加载中" />
    }
  }
  componentWillMount() {
    this.props.getSongList()
  }
}

const mapStateToProps = state => {
  return {
    songs: state.songList.songList
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getSongList() {
      const requestData = {
        orderType: 'hot',
        pageSize: 30,
        page: 0
      }
      const action = actionCreators.getSongList(requestData)
      dispatch(action)
    }
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MusicSongList)
