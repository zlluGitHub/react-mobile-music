import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import './rating.scss'
import Bscroll from '../../base/Bscroll/Bscroll.jsx'
import Loading from '../../base/loading/loading.jsx'
import * as actionCreators from '../../store/actionCreators'

class MusicRatings extends Component {
  render() {
    const { topList } = this.props
    return (
      <div className="rank" ref="rank">
        <Bscroll
          className="toplist"
          probeType={3}
          clickable={true}
          data={topList}
        >
          <ul>
            {topList.map((e, i) => (
              <Link
                to={`/detail/${e.id}?rankId="rankId"&pic=${e.picUrl}`}
                key={i}
              >
                <li className="item">
                  <div className="icon">
                    <img width="100" height="100" alt="" src={e.picUrl} />
                  </div>
                  <ul className="songlist">
                    {e.songList.map((song, index) => (
                      <li className="song" key={index}>
                        <span>{index + 1}</span>
                        <span>
                          {song.songname}-{song.singername}
                        </span>
                      </li>
                    ))}
                  </ul>
                </li>
              </Link>
            ))}
          </ul>
          {topList.length > 0 ? (
            ''
          ) : (
            <div className="loading-container">
              <Loading />
            </div>
          )}
        </Bscroll>
      </div>
    )
  }
  componentWillMount() {
    this.props.getRankList()
  }
}
const mapStateToProps = state => {
  return {
    topList: state.musicRank.topList
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getRankList() {
      const action = actionCreators.getRankList()
      dispatch(action)
    }
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MusicRatings)
