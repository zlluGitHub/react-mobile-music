import React from 'react'
import { connect } from 'react-redux'
import styles from './header.module.scss'

const MusicHeader = props => {
  return (
    <div className={styles.header}>
      <div className={styles.icon} />
      <h1 className={styles.title}>
        <span className={styles.text}>蝸牛音樂</span>
      </h1>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    name: state.header.name
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MusicHeader)
