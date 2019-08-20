import axios from 'axios'
import {
    HttpRequest
} from './config'
/**
 * 查询歌单接口
 * categoryType 歌单分类
 * orderType 可选值为new或hot,默认hot
 * pageSize 获取条数 默认30
 * page     分页
 */
export const getSongList = (data) => {
    return axios.get(`${HttpRequest}/tencent/songList/hot`, {
        params: data
    })
}

/**
 * 根据歌单查询歌曲
 * id 歌单的id
 * format 是否格式化数据
 */
export const getMusicList = (data) => {
    return axios.get(`${HttpRequest}/tencent/songList`, {
        params: data
    })
}
/**
 * 
 * 根据歌曲id查询歌曲详细信息
 * id 歌曲id
 */
export const getMusicName = (data) => {
    return axios.get(`${HttpRequest}/tencent/song`, {
        params: data
    })
}

/**
 * 
 * 根据歌曲id获取歌词信息
 * id 歌曲id
 */
export const getMusicLyric = (data) => {
    return axios.get(`${HttpRequest}/tencent/lrc`, {
        params: data
    })
}

/**
 * 搜索
 *  keyword	√	搜索关键词
    type	√	搜索类型	默认为 song
    pageSize	×	请求数量	默认为 30
    page	×	分页	默认第 0 页
    format	x	格式化数据(仅格式化音乐搜索) 1 格式化 0 不格式化	0
 */
export const getSearchMusic = (data) => {
    return axios.get(`${HttpRequest}/tencent/search`, {
        params: data
    })
}

/**
 * 音乐下载
 */
export const downLoadFile = (data) => {
    return axios.get(`${HttpRequest}/tencent/url`, {
        params: data,
        responseType: 'arraybuffer'
    })
}

/**
 * 歌手列表
 */
export const getSingerList = (data) => {
    return axios.get(`${HttpRequest}/tencent/artist/list`, {
        params: data
    })
}

/**
 * 根据歌手id查询歌曲
 */
export const singerMusicList = (data) => {
    return axios.get(`${HttpRequest}/tencent/song/artist`, {
        params: data
    })
}

/**
 * 根据排行榜id查询歌曲
 */
export const rankMusicList = (data) => {
    return axios.get(`${HttpRequest}/tencent/topList`, {
        params: data
    })
}