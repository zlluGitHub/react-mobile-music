import React, { Component } from 'react'
import { connect } from 'react-redux'
import ProgressBar from '../../base/progress-bar/progress-bar.jsx'
import * as actionCreators from '../../store/actionCreators'
import { getTime } from '../../utils/timeTransform'
import Lyric from 'lyric-parser'
import {
  musicRequestUrl,
  musicPicRequestUrl,
  musicPlayMode
} from '../../api/config'
import Bscroll from '../../base/Bscroll/Bscroll.jsx'
import Back from '../../base/back/back.jsx'
import './player.scss'
class MusicPlayer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isPause: false,
      totalTime: '00:00',
      currentTime: '00:00',
      playMode: 1,
      processItemMove: false,
      currentMusicIndex: 0,
      musicUrl: '',
      musicPic: '',
      musicName: '',
      musicSinger: '',
      playWidth: '',
      bufferWidth: '',
      playModeIndex: 0,
      duration: '',
      playingLyric: '',
      currentLineNum: 0,
      currentShow: 'cd'
    }
  }
  render() {
    const {
      isPause,
      totalTime,
      currentTime,
      playMode,
      musicUrl,
      musicPic,
      musicName,
      musicSinger,
      bufferWidth,
      playWidth,
      duration,
      playingLyric,
      currentShow
    } = this.state
    const { history, musicLyrics } = this.props
    let playModeClass = ''
    switch (playMode) {
      case musicPlayMode.sequence:
        playModeClass = 'icon-sequence'
        break
      case musicPlayMode.random:
        playModeClass = 'icon-loop'
        break
      case musicPlayMode.loop:
        playModeClass = 'icon-random'
        break
      default:
        playModeClass = 'icon-sequence'
        break
    }
    return (
      <div className="player">
        <div className="normal-player">
          <div className="background">
            <img width="100%" height="100%" src={musicPic} alt="" />
          </div>
          <div className="top">
            {/* <div className="back" onClick={this.goBack}>
              <i className="icon-back" />
            </div> */}
            <Back title={musicName} history={history} />
            {/* <h1 className="title">{musicName}</h1> */}
            <h2 className="subtitle">
              <span>{musicSinger}</span>
            </h2>
          </div>
          <div className="middle" ref={ref => (this.middle = ref)}>
            <div className="middle-l" ref={ref => (this.middleL = ref)}>
              <div className="cd-wrapper">
                <div className={`cd play`}>
                  <img className="image" alt="" src={musicPic} />
                </div>
              </div>
              <div className="playing-lyric-wrapper">
                <div className="playing-lyric">{playingLyric}</div>
              </div>
            </div>
            <div className="middle-r-box" ref={ref => (this.lyricList = ref)}>
              <Bscroll
                className="middle-r"
                lineEl={this.lineEl}
                scrollTo={true}
                data={musicLyrics}
              >
                <div className="lyric-wrapper">
                  <div ref={ref => (this.lyricLine = ref)}>
                    {this.showLyric()}
                  </div>
                </div>
              </Bscroll>
            </div>
          </div>
          <div className="bottom">
            <div className="dot-wrapper">
              <span className={currentShow === 'cd' ? 'active dot' : 'dot'} />
              <span
                className={currentShow === 'lyric' ? 'active dot' : ' dot'}
              />
            </div>
            <div className="progress-wrapper">
              <span className="time time-l">{currentTime}</span>
              <div className="progress-bar-wrapper">
                <ProgressBar
                  bufferWidth={bufferWidth}
                  playWidth={playWidth}
                  duration={duration}
                  setProgressTime={this.setProgressTime}
                />
              </div>
              <span className="time time-r">{totalTime}</span>
            </div>
            <div className="operators">
              <div className="icon i-left" onClick={this.switchPlayMode}>
                <i className={`${playModeClass}`} />
              </div>
              <div className="icon i-left" onClick={this.prevMusic}>
                <i className="icon-prev" />
              </div>
              {isPause ? (
                <div className="icon i-center" onClick={this.onPause}>
                  <i className="icon-pause" />
                </div>
              ) : (
                <div className="icon i-center" onClick={this.onPlay}>
                  <i className="icon-play" />
                </div>
              )}

              <div className="icon i-right" onClick={this.nextMusic}>
                <i className="icon-next" />
              </div>
              <div className="icon i-right">
                {/* <i className="icon icon-favorite"></i> */}
                <i className="icon icon-not-favorite" />
              </div>
            </div>
          </div>
        </div>
        {/* <playlist ref="playlist"></playlist> */}
        <audio
          className="audio"
          src={musicUrl}
          ref={ref => (this.audio = ref)}
        />
      </div>
    )
  }
  componentWillMount() {
    const { id } = this.props.match.params
    this.props.getMusicMessage(id)
    this.getMusicIndex()
    this.setState({
      musicUrl: `${musicRequestUrl}${id}&quality=192`,
      musicPic: `${musicPicRequestUrl}${id}&size='200x200'`
    })
    this.touch = {}
  }
  componentDidMount() {
    const audio = this.audio
    const middle = this.middle
    const progressBarWidth = document.getElementsByClassName(
      'progress-bar-wrapper'
    )[0].clientWidth
    //canplay事件 在媒体数据已经有足够的数据（至少播放数帧）可供播放时触发。
    audio.addEventListener('canplay', () => {
      //获取总时间
      const totalTime = parseInt(audio.duration)
      this.setState({
        totalTime: getTime(totalTime),
        duration: audio.duration
      })
    })
    //播放中添加时间变化监听
    audio.addEventListener('timeupdate', () => {
      const { processItemMove } = this.state
      //获取当前播放时间
      const currentTime = parseInt(audio.currentTime)
      //缓存对象(buffered表示已缓冲的时间段信息，属性包含一个TimeRangs对象)
      const buffered = audio.buffered
      let bufferTime = 0
      if (buffered.length !== 0) {
        bufferTime = buffered.end(buffered.length - 1)
      }
      //当前缓存的进度计算
      const bufferWidth = progressBarWidth * (bufferTime / audio.duration)
      //当前播放的宽度计算
      const playWidth = progressBarWidth * (audio.currentTime / audio.duration)
      // 如果正在拖动进度条的时候，不监听播放进度
      if (!processItemMove) {
        this.setState({
          bufferWidth: bufferWidth,
          playWidth: playWidth
        })
        // 未拖动时根据时间变化设置当前时间
        this.setState({
          currentTime: getTime(currentTime)
        })
      }
    })
    //监听音乐播放结束
    audio.addEventListener('ended', () => {
      this.endedPlayMusic()
    })
    //监听歌词部分滑动
    middle.addEventListener('touchstart', e => {
      this.touch.initiated = true
      const touch = e.touches[0]
      this.touch.startX = touch.pageX
      this.touch.startY = touch.pageY
    })
    middle.addEventListener('touchmove', e => {
      if (!this.touch.initiated) {
        return
      }
      const touch = e.touches[0]
      const deltaX = touch.pageX - this.touch.startX
      const deltaY = touch.pageY - this.touch.startY
      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        return
      }
      const left = this.state.currentShow === 'cd' ? 0 : -window.innerWidth
      const offsetWidth = Math.min(
        0,
        Math.max(-window.innerWidth, left + deltaX)
      )
      this.touch.percent = Math.abs(offsetWidth / window.innerWidth)
      this.lyricList.style.transform = `translate3d(${offsetWidth}px,0,0)`
      this.lyricList.style.transitionDuration = 0
      this.middleL.style.opacity = 1 - this.touch.percent
      this.middleL.style.transitionDuration = 0
    })
    middle.addEventListener('touchend', () => {
      let offsetWidth
      let opacity
      if (this.state.currentShow === 'cd') {
        if (this.touch.percent > 0.1) {
          offsetWidth = -window.innerWidth
          opacity = 0
          this.setState({
            currentShow: 'lyric'
          })
        } else {
          offsetWidth = 0
          opacity = 1
        }
      } else {
        if (this.touch.percent < 0.9) {
          offsetWidth = 0
          this.setState({
            currentShow: 'cd'
          })
          opacity = 1
        } else {
          offsetWidth = -window.innerWidth
          opacity = 0
        }
      }
      const time = 300
      this.lyricList.style.transform = `translate3d(${offsetWidth}px,0,0)`
      this.lyricList.style.transitionDuration = `${time}ms`
      this.middleL.style.opacity = opacity
      this.middleL.style.transitionDuration = `${time}ms`
      this.touch.initiated = false
    })
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.musicLyrics !== this.props.musicLyrics) {
      //处理歌词
      this.currentLyric && this.currentLyric.stop()
      this.setState({
        currentLineNum: 0,
        playingLyric: ''
      })
      this.handleMusicLyric()
    }
  }
  componentWillUnmount() {
    this.currentLyric.stop()
    this.setState = (state, callback) => {
      return
    }
  }
  goBack = () => {
    this.props.history.goBack()
  }
  //音乐结束
  endedPlayMusic = () => {
    const { playMode } = this.state
    const { musicList } = this.props
    if (musicList.length > 0) {
      //列表循环
      if (playMode === musicPlayMode.sequence) {
        this.nextMusic()
        this.onSwitchAction()
      }
      //列表随机
      else if (playMode === musicPlayMode.random) {
        const randomIndex = Math.floor(Math.random() * 3 + 1)
        let nextMusicId
        nextMusicId = this.props.musicList[randomIndex + 1].id
        this.setState({
          musicName: this.props.musicList[randomIndex + 1].name,
          musicSinger: this.props.musicList[randomIndex + 1].singer,
          musicUrl: `${musicRequestUrl}${nextMusicId}&quality=192`,
          musicPic: `${musicPicRequestUrl}${nextMusicId}&size='200x200'`,
          currentMusicIndex: randomIndex + 1
        })
        this.props.getMusicMessage(nextMusicId)
        this.onSwitchAction()
      }
      //单曲循环
      else if (playMode === musicPlayMode.loop) {
        this.onPlay()
      }
    }
  }
  handleMusicLyric = () => {
    //歌词处理
    const { isPause } = this.state
    const { musicLyrics } = this.props
    this.currentLyric = new Lyric(musicLyrics, this.handlerLyric)
    if (isPause) {
      this.currentLyric && this.currentLyric.play()
    }
  }
  handlerLyric = ({ lineNum, txt }) => {
    this.setState({
      playingLyric: txt,
      currentLineNum: lineNum
    })
    if (lineNum > 5) {
      this.lineEl = this.lyricLine.children[lineNum - 5]
    }
  }
  showLyric = () => {
    if (this.currentLyric && this.state.currentShow === 'lyric') {
      return this.currentLyric.lines.map((e, i) => (
        <p
          className={this.state.currentLineNum === i ? 'current text' : 'text'}
          key={i}
        >
          {e.txt}
        </p>
      ))
    } else {
      return ''
    }
  }
  setProgressTime = time => {
    this.setState({
      currentTime: getTime(time)
    })
    this.audio.currentTime = time
    if (this.currentLyric) {
      this.currentLyric.seek(time * 1000)
    }
  }
  //根据当前的id找到歌曲列表中的索引值
  getMusicIndex = () => {
    const { musicList, match } = this.props
    musicList.map((e, i) => {
      if (e.id === match.params.id) {
        this.setState({
          musicName: e.name,
          musicSinger: e.singer,
          currentMusicIndex: i
        })
      }
    })
  }
  onPlay = () => {
    const audio = this.audio
    this.setState({ isPause: true })
    audio.play()
    this.currentLyric && this.currentLyric.play()
  }
  onPause = () => {
    const audio = this.audio
    this.setState({ isPause: false })
    audio.pause()
    if (this.currentLyric) {
      this.currentLyric.stop()
    }
  }
  //切换歌曲时判断是否直接播放
  onSwitchAction = () => {
    const { isPause, musicUrl } = this.state
    const audio = this.audio
    const totalTime = parseInt(audio.duration)
    //清空上一首歌曲的信息
    this.setState({
      currentTime: '00:00',
      totalTime: getTime(totalTime),
      bufferWidth: 0,
      playWidth: 0,
      playingLyric: '',
      currentLineNum: 0
    })
    if (isPause) {
      this.onPlay()
    }
  }
  switchPlayMode = () => {
    let playModeList = [
      musicPlayMode.sequence,
      musicPlayMode.random,
      musicPlayMode.loop
    ]
    let { playModeIndex } = this.state
    playModeIndex += 1
    if (playModeIndex === playModeList.length + 1) {
      playModeIndex = 1
    }
    this.setState({
      playMode: playModeList[playModeIndex],
      playModeIndex: playModeIndex
    })
  }
  nextMusic = () => {
    //歌单中下一首歌曲的id
    const currentMusicIndex = this.state.currentMusicIndex
    const lastMusicIndex = this.props.musicList.length - 1
    let nextMusicId
    if (currentMusicIndex === lastMusicIndex) {
      nextMusicId = this.props.musicList[0].id
      this.setState({
        musicUrl: this.props.musicList[0].url,
        musicPic: this.props.musicList[0].pic,
        musicName: this.props.musicList[0].name,
        musicSinger: this.props.musicList[0].singer,
        currentMusicIndex: 0
      })
    } else {
      nextMusicId = this.props.musicList[currentMusicIndex + 1].id
      this.setState({
        musicUrl: this.props.musicList[currentMusicIndex + 1].url,
        musicPic: this.props.musicList[currentMusicIndex + 1].pic,
        musicName: this.props.musicList[currentMusicIndex + 1].name,
        musicSinger: this.props.musicList[currentMusicIndex + 1].singer,
        currentMusicIndex: currentMusicIndex + 1
      })
    }
    this.props.getMusicMessage(nextMusicId)
    this.timer = setTimeout(() => {
      this.onSwitchAction()
    }, 200)
  }
  prevMusic = () => {
    const currentMusicIndex = this.state.currentMusicIndex
    const lastMusicIndex = this.props.musicList.length - 1
    let prevMusicId
    if (currentMusicIndex > 0) {
      prevMusicId = this.props.musicList[currentMusicIndex - 1].id
      this.setState({
        musicName: this.props.musicList[currentMusicIndex - 1].name,
        musicSinger: this.props.musicList[currentMusicIndex - 1].singer,
        musicUrl: this.props.musicList[currentMusicIndex - 1].url,
        musicPic: this.props.musicList[currentMusicIndex - 1].pic,
        currentMusicIndex: currentMusicIndex - 1
      })
    } else {
      prevMusicId = this.props.musicList[lastMusicIndex].id
      this.setState({
        musicName: this.props.musicList[lastMusicIndex].name,
        musicSinger: this.props.musicList[lastMusicIndex].singer,
        musicUrl: this.props.musicList[lastMusicIndex].url,
        musicPic: this.props.musicList[lastMusicIndex].pic,
        currentMusicIndex: lastMusicIndex
      })
    }
    this.props.getMusicMessage(prevMusicId)
  }
}
const mapStateToProps = state => {
  return {
    musicList: state.musicList.musicList,
    musicLyrics: state.musicMessage.musicLyric
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getMusicMessage(id) {
      const action = actionCreators.getMusicMessage(id)
      dispatch(action)
    }
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MusicPlayer)
