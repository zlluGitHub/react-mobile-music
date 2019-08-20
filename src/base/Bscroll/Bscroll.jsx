import React, { Component } from 'react'
import BScroll from 'better-scroll'
import PropTypes from 'prop-types'
class Bscroll extends Component {
  constructor(props) {
    super(props)
    this.refresh()
  }
  render() {
    const { className } = this.props
    return <div className={`${className}`}>{this.props.children}</div>
  }
  componentDidMount() {
    this.initScroll()
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.data !== prevProps.data) {
      setTimeout(() => {
        this.refresh()
      }, 20)
    }
    if (this.props.scrollTo) {
      this.scrollToElement(this.props.lineEl, 1000)
    }
  }
  initScroll() {
    let scroll = this.props.className
    this.scroll = new BScroll(`.${scroll}`, {
      probeType: this.props.probeType,
      click: this.props.clickable
    })
    if (this.props.listenScroll) {
      this.scroll.on('scroll', pos => {
        this.props.getPos(pos)
      })
    }
  }
  scrollToElement() {
    this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
  }
  refresh() {
    this.scroll && this.scroll.refresh()
  }
}

export default Bscroll
