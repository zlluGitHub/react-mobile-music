import React, { Component } from 'react'
import './progress-bar.scss'
class ProgressBar extends Component {
  render() {
    return (
      <div
        className="progress-bar"
        ref={ref => (this.ProgressBar = ref)}
        onClick={this.onProgressClick}
      >
        <div className="bar-inner">
          <div className="progress" ref={ref => (this.progress = ref)} />
          <div
            className="progress-buffer"
            ref={ref => (this.progressBuffer = ref)}
          />
          <div
            className="progress-btn-wrapper"
            ref={ref => (this.progressBtn = ref)}
          >
            <div className="progress-btn" />
          </div>
        </div>
      </div>
    )
  }
  componentDidUpdate() {
    const { bufferWidth, playWidth } = this.props
    this.progress.style.width = `${playWidth}px`
    this.progressBuffer.style.width = `${bufferWidth}px`
    this.progressBtn.style.transform = `translate3d(${playWidth}px,0,0)`
  }
  //点击进度条
  onProgressClick = e => {
    this.setProgress(e, 'click')
  }
  setProgress = (e, key) => {
    //获取当前点击偏移宽度
    let offsetWidth = e.pageX - this.ProgressBar.getBoundingClientRect().left
    if (offsetWidth < 0) {
      offsetWidth = 0
    }
    if (offsetWidth > this.ProgressBar.offsetWidth) {
      offsetWidth = this.ProgressBar.offsetWidth
    }
    //计算偏移比例
    const offsetPercentage = offsetWidth / this.ProgressBar.offsetWidth
    //计算当前时间
    const currentTime = this.props.duration * offsetPercentage
    if (key === 'click' || key === 'dragMove') {
      //设置当前进度条偏移位置
      this.progress.style.width = `${offsetWidth}px`
      this.progressBtn.style.transform = `translate3d(${offsetWidth}px,0,0)`
      this.props.setProgressTime(currentTime)
    }
  }
}
export default ProgressBar
