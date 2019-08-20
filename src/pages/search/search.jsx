import React, { Component } from 'react'
import { connect } from 'react-redux'
import './search.scss'
import MusicList from '../../base/musicList/musicList.jsx'
import HotSearch from '../../components/hotSearch/hotSearch.jsx'
import * as actionCreators from '../../store/actionCreators'
import Bscroll from '../../base/Bscroll/Bscroll.jsx'

class MusicSearch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchValue: '',
      startSearch: ''
    }
  }
  render() {
    const { searchValue, startSearch } = this.state
    const { searchMusic, musicList } = this.props
    let dismiss, musicListRender
    if (startSearch) {
      dismiss = (
        <div className="search-close" onClick={this.clearSearchValue}>
          <i className="icon-dismiss" />
        </div>
      )
      musicListRender = (
        <div className="search-music-box">
          <Bscroll
            className="resultScroll"
            probeType={3}
            clickable={true}
            data={musicList}
          >
            <MusicList musicList={musicList} downLoad={true} />
          </Bscroll>
        </div>
      )
    } else {
      dismiss = ''
      musicListRender = <HotSearch getSearchValue={this.getSearchValue} />
    }
    return (
      <div className="search-box">
        <div className="serach-input-box">
          <div className="search-icon">
            <i className="icon-search" />
          </div>
          <input
            className="search-input"
            type="text"
            placeholder="搜索歌曲,歌手，专辑"
            value={searchValue}
            onBlur={this.searchMusic}
            onChange={this.changeInput}
          />
          {dismiss}
        </div>
        {musicListRender}
      </div>
    )
  }
  clearSearchValue = () => {
    this.setState({
      searchValue: '',
      startSearch: false
    })
  }
  changeInput = e => {
    this.setState({
      searchValue: e.target.value
    })
  }
  searchMusic = e => {
    this.setState({
      startSearch: true
    })
    this.props.getSearchResult(e.target.value)
  }
  getSearchValue = value => {
    this.setState({
      startSearch: true,
      searchValue: value
    })
    this.props.getSearchResult(value)
  }
}
const mapStateToProps = state => {
  return {
    musicList: state.musicSearch.searchResult
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getSearchResult(e) {
      const action = actionCreators.getMusicSearch(e)
      dispatch(action)
    }
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MusicSearch)
