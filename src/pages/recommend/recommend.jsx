import React, { Component } from 'react'
import MusicSwiper from '../../components/swiper/swiper.jsx'
import MusicSongList from '../../components/songList/songList.jsx'
import Bscroll from '../../base/Bscroll/Bscroll.jsx'
import './recommend.scss'
class MusicRecommend extends Component {
  render() {
    return (
      <Bscroll
        probeType={1}
        clickable={true}
        className="wrapper"
        data={this.props.match}
      >
        <div className="recommendPage">
          <MusicSwiper />
          <MusicSongList match={this.props.match}> </MusicSongList>
        </div>
      </Bscroll>
    )
  }
}
export default MusicRecommend
