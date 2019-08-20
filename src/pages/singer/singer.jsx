import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actionCreators from '../../store/actionCreators'
import Bscroll from '../../base/Bscroll/Bscroll.jsx'
import './singer.scss'
class MusicSinger extends Component {
  render() {
    const { singerList } = this.props
    return (
      <Bscroll
        className="singer-listview"
        probeType={3}
        clickable={true}
        data={singerList}
      >
        <ul>
          <li className="list-group" ref="listGroup">
            {/* <h2 className="list-group-title">1</h2> */}
            <ul>
              {singerList.map(e => (
                <Link
                  to={`/detail/${e.singer_mid}?singermid="singermid`}
                  key={e.singer_mid}
                >
                  <li className="list-group-item" key={e.singer_mid}>
                    <img className="avatar" src={e.singer_pic} alt="" />
                    <span className="name">{e.singer_name}</span>
                  </li>
                </Link>
              ))}
            </ul>
          </li>
        </ul>
        {/* <div className="list-shortcut">
          <ul>
            <li className="item">A</li>
          </ul>
        </div> */}
        {/* <div className="list-fixed" ref="fixed" v-show="fixedTitle">
          <div className="fixed-title">A</div>
        </div> */}
      </Bscroll>
    )
  }
  componentWillMount() {
    this.props.getSingerList()
  }
}
const mapStateToProps = state => {
  return {
    singerList: state.musicSinger.singerList
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getSingerList() {
      const action = actionCreators.getSingerList()
      dispatch(action)
    }
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MusicSinger)
