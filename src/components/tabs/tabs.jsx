import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './tabs.module.scss'

const Tabs = props => {
  return (
    <ul className={styles.tabsList}>
      <li className={styles.tabsItem}>
        <NavLink exact to="/" activeClassName={styles.selected}>
          推荐
        </NavLink>
      </li>
      <li className={styles.tabsItem}>
        <NavLink to="/singer" activeClassName={styles.selected}>
          歌手
        </NavLink>
      </li>
      <li className={styles.tabsItem}>
        <NavLink to="/ratings" activeClassName={styles.selected}>
          排行
        </NavLink>
      </li>
      <li className={styles.tabsItem}>
        <NavLink to="/search" activeClassName={styles.selected}>
          搜索
        </NavLink>
      </li>
    </ul>
  )
}

export default Tabs
