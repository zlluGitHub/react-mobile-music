import React, { Component } from 'react'
import { connect } from 'react-redux'
import './recommendDetail.scss'
import Back from '../../base/back/back.jsx'
import Bscroll from '../../base/Bscroll/Bscroll.jsx'
import MusicList from '../../base/musicList/musicList.jsx'
import * as actionCreators from '../../store/actionCreators'

class RecommendMusicList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pos: 0,
      singerMid: ''
    }
  }
  render() {
    const style = {
      backgroundImage: `url(${this.props.coverImage})`,
      backgroundSize: 'cover'
    }
    const { history, musicList, name } = this.props
    return (
      <div className="recommend-music-box">
        <Back title={name} history={history} />
        <div
          className="cover-img"
          style={style}
          ref={ref => (this.bgImage = ref)}
        >
          <div className="mask" />
        </div>
        <div className="bg-layer" ref={ref => (this.layer = ref)} />
        <div className="musicWrapper-box" ref={ref => (this.wrapperBox = ref)}>
          <Bscroll
            className="musicWrapper"
            listenScroll={true}
            probeType={3}
            clickable={true}
            getPos={this.handlePos}
            ref="musicWrapper"
            scrollTo={false}
            data={musicList}
          >
            <MusicList musicList={musicList} />
          </Bscroll>
        </div>
      </div>
    )
  }
  componentWillMount() {
    const { history } = this.props
    if (history.location.search) {
      this.setState({
        singerMid: history.location.search
      })
    }
  }
  componentDidMount() {
    const RESERVED_HEIGHT = 40
    const { match } = this.props
    this.props.getMusicList(match.params.id, this.state.singerMid)
    this.init = true
    this.imageHeight = this.bgImage.clientHeight
    this.minTransalteY = -this.imageHeight + RESERVED_HEIGHT
    this.wrapperBox.style.top = `${this.imageHeight}px`
  }
  componentDidUpdate(prevprops, prevstate) {
    const RESERVED_HEIGHT = 40
    const { pos: newVal } = this.state
    if (prevstate.pos !== this.state.pos) {
      let translateY = Math.max(this.minTransalteY, newVal)
      let scale = 1
      let zIndex = 0
      const percent = Math.abs(newVal / this.imageHeight)
      if (newVal > 0) {
        scale = 1 + percent
        zIndex = 10
      }
      this.layer.style.transform = `translate3d(0,${translateY}px,0)`
      if (newVal < this.minTransalteY) {
        zIndex = 10
        this.bgImage.style.paddingTop = 0
        this.bgImage.style.height = `${RESERVED_HEIGHT}px`
      } else {
        this.bgImage.style.paddingTop = '70%'
        this.bgImage.style.height = 0
      }
      this.bgImage.style.transform = `scale(${scale})`
      this.bgImage.style.zIndex = zIndex
    }
  }
  handlePos = pos => {
    this.setState({
      pos: pos.y
    })
    // this.wrapperBox.style.transform = `translate3d(0,${pos.y}px,0)`
  }
}

const mapStateToProps = state => {
  return {
    musicList: state.musicList.musicList,
    coverImage: state.musicList.coverImage,
    name: state.musicList.name
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getMusicList(id, singerMid) {
      const action = actionCreators.getMusicList({
        id: id,
        singerMid: singerMid
      })
      dispatch(action)
    }
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecommendMusicList)
