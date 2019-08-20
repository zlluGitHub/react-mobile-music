import React, { Component } from 'react'
import MusicLoading from '../loading/loading.jsx'
import { Link } from 'react-router-dom'
import './musicList.scss'
import { downLoadFile } from '../../api/songlist'
import { downloadMusicFile } from '../../utils/download'
import fileDownLoad from 'js-file-download'
import { file } from '@babel/types'
class MusicList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      downLoading: false,
      downIndex: 0
    }
  }
  render() {
    return <ul className="music-list-wrapper">{this.initMusicList()}</ul>
  }
  initMusicList() {
    const { musicList, downLoad } = this.props
    const { downLoading, downIndex } = this.state
    let musicListTracks = []
    let downLoadIcon
    if (downLoad) {
      downLoadIcon = <div className="down-icon" />
    } else {
      downLoadIcon = ''
    }
    if (musicList && musicList.length > 0) {
      musicList.map((e, index) => {
        musicListTracks.push(
          <Link to={`/music/player/${e.id}`} key={index}>
            <li className="music-list-item">
              <h2 className="music-name">{e.name}</h2>
              <p className="music-singer">
                <span>{e.singer}</span>
              </p>
              <div
                className={
                  downIndex === index && downLoading
                    ? 'downloading-box'
                    : 'down-icon-box'
                }
                onClick={this.downLoadMusic.bind(this, e.id, e.name)}
              >
                {downLoadIcon}
              </div>
            </li>
          </Link>
        )
      })
      return musicListTracks
    } else {
      return <MusicLoading loadingText="玩命加载中" />
    }
  }
  //获取当前下载的索引值
  getDownLoadIndex(id) {
    const { musicList } = this.props
    let index
    if (musicList && musicList.length > 0) {
      musicList.map((e, i) => {
        if (e.id == id) {
          index = i
        }
      })
      return index
    }
  }
  async downLoadMusic(id, name, e) {
    const { downLoading } = this.state
    const downIndex = this.getDownLoadIndex(id)
    let resData
    e.preventDefault()
    const requestData = {
      quality: 'flac',
      id: id
    }
    this.setState({
      downLoading: true,
      downIndex: downIndex
    })
    if (!downLoading) {
      resData = await downLoadFile(requestData)
    }
    if (resData) {
      // downloadMusicFile(resData.data, name)
      fileDownLoad(resData.data, `${name}.mp3`)
      this.setState({
        downLoading: false
      })
    }
  }
}
export default MusicList
