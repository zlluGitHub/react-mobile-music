import MusicRecommend from '../pages/recommend/recommend.jsx'
import MusicSinger from '../pages/singer/singer.jsx'
import MusicRatings from '../pages/ratings/ratings.jsx'
import MusicSearch from '../pages/search/search.jsx'
import recommendDetail from '../pages/recommendDetail/recommendDetail.jsx'
import MusicPlayer from '../components/player/player.jsx'
import {
  Redirect
} from 'react-router-dom'
export const RouterConfig = [{
    path: '/',
    component: MusicRecommend,
    sceneConfig: {
      enter: 'from-right',
      exit: 'to-right'
    }
  },
  {
    path: '/detail/:id',
    component: recommendDetail,
    sceneConfig: {
      enter: 'from-right',
      exit: 'to-right'
    }
  },
  {
    path: '/music/player/:id',
    component: MusicPlayer,
    sceneConfig: {
      enter: 'to-right',
      exit: 'to-right'
    }
  },
  {
    path: '/singer',
    component: MusicSinger,
    sceneConfig: {
      enter: 'from-right',
      exit: 'to-right'
    }
  },
  {
    path: '/Ratings',
    component: MusicRatings,
    sceneConfig: {
      enter: 'from-right',
      exit: 'to-right'
    }
  },
  {
    path: '/search',
    component: MusicSearch,
    sceneConfig: {
      enter: 'from-right',
      exit: 'to-right'
    }
  }
];