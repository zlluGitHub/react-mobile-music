import React, { Component } from 'react'
import './hotSearch.scss'
class HotSearch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hotList: [
        {
          name: '热门搜索',
          item: [
            {
              searchName: '周杰伦'
            },
            {
              searchName: '薛之谦'
            },
            {
              searchName: '稻香'
            },
            {
              searchName: '纸短情长'
            },
            {
              searchName: '凉凉'
            },
            {
              searchName: '东风破'
            },
            {
              searchName: '知否知否'
            },
            {
              searchName: '李白'
            }
          ]
        }
      ]
    }
  }
  render() {
    return <div className="hot-search-box">{this.hotSearchRender()}</div>
  }
  SearchValue = e => {
    const { getSearchValue } = this.props
    getSearchValue(e.target.innerText)
  }
  hotSearchRender = () => {
    let hotListRender
    const { hotList } = this.state
    if (hotList)
      hotList.forEach(e => {
        hotListRender = (
          <div>
            <p className="hot-title">{e.name}</p>
            <ul className="hot-list">
              {e.item.map((item, index) => (
                <li
                  className="hot-list-item"
                  key={index}
                  onClick={this.SearchValue}
                >
                  {item.searchName}
                </li>
              ))}
            </ul>
          </div>
        )
      })
    return hotListRender
  }
}

export default HotSearch
