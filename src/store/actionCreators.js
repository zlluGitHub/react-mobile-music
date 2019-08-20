import * as actionTypes from './actionTypes'

export const getSwiperList = () => ({
    type: actionTypes.GET_SWIPER_LIST,
})

export const initSwiperList = (value) => ({
    type: actionTypes.INIT_SWIPER_LIST,
    value
})

export const getSongList = (value) => ({
    type: actionTypes.GET_SONG_lIST,
    value
})

export const initSongList = (value) => ({
    type: actionTypes.INIT_SONGLIST,
    value
})

export const getMusicList = (value) => ({
    type: actionTypes.GET_MUSIC_LIST,
    value
})

export const initMusicList = (value) => ({
    type: actionTypes.INIT_MUSIC_lIST,
    value
})

export const getMusicMessage = (value) => ({
    type: actionTypes.GET_MUSIC_MESSAGE,
    value
})

export const initMusicMessage = (value) => ({
    type: actionTypes.INIT_MUSIC_MESSAGE,
    value
})

export const getMusicSearch = (value) => ({
    type: actionTypes.GET_SEARCH_MUSIC,
    value
})

export const initMusicSearch = (value) => ({
    type: actionTypes.INIT_SEARCH_MUSIC,
    value
})

export const getSingerList = (value) => ({
    type: actionTypes.GET_SINGER_LIST,
    value
})

export const initSingerList = (value) => ({
    type: actionTypes.INIT_SINGER_lIST,
    value
})

export const getRankList = (value) => ({
    type: actionTypes.GET_RANK_LIST,
    value
})

export const initRankList = (value) => ({
    type: actionTypes.INIT_RANK_LIST,
    value
})