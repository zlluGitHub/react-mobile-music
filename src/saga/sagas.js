import {
    takeEvery,
    put
} from 'redux-saga/effects'
import * as actionTypes from '../store/actionTypes'
import * as actionCreators from '../store/actionCreators'
import {
    getRecommend
} from '../api/recommend'
import {
    getTopList,
    getRankMusicList
} from '../api/rank'
import {
    HttpRequest
} from '../api/config'
import {
    getSongList,
    getMusicList,
    getMusicLyric,
    getSearchMusic,
    getSingerList,
    singerMusicList
} from '../api/songlist'

function* getSwierImgListSaga() {
    try {
        const res = yield getRecommend();
        console.log(res)
        const action = actionCreators.initSwiperList(res.data.slider);
        yield put(action)
    } catch (e) {
        console.log(e)
    }
}

function* getSongListSaga(actions) {
    try {
        const res = yield getSongList(actions.value);
        const action = actionCreators.initSongList(res.data.data.list);
        yield put(action)
    } catch (e) {
        console.log(e)
    }
}

function* getMusicListSaga(actions) {
    try {
        let res, resImg
        if (actions.value.singerMid) {
            const queryList = actions.value.singerMid.replace("?", "").split("=");
            console.log(queryList)
            if (queryList[0] === "singermid") {
                res = yield singerMusicList({
                    id: actions.value.id,
                    format: 1,
                    pageSize: 100
                })
            } else if (queryList[0] === "rankId") {
                res = yield getRankMusicList(actions.value.id)
                const newSongList = [];
                res.songlist.map((e, i) => {
                    newSongList.push({
                        singer: e.data.singer[0].name,
                        name: e.data.songname,
                        id: e.data.songmid,
                        url: `${HttpRequest}/url?id=${e.data.songmid}`,
                        pic: i === 0 ? queryList[2] : `${HttpRequest}/pic?id=${e.data.songmid}`,
                    })
                })
                res = {
                    data: {
                        data: [...newSongList]
                    }
                }
            }

        } else {
            res = yield getMusicList({
                id: actions.value.id,
                format: 1
            })
            resImg = yield getMusicList({
                id: actions.value.id
            })
        }
        const action = actionCreators.initMusicList({
            data: res.data.data,
            coverImage: resImg ? resImg.data.data[0].logo : res.data.data[0].pic,
            name: resImg ? resImg.data.data[0].dissname : res.data.data[0].singer
        });
        yield put(action)
    } catch (e) {
        console.log(e)
    }
}

function* getMuSicMessageSaga(actions) {
    try {
        let res = yield getMusicLyric({
            id: actions.value
        });
        const action = actionCreators.initMusicMessage({
            musicLyric: res.data
        })
        yield put(action);
    } catch (e) {
        console.log(e)
    }
}

function* getSearchMusicSaga(actions) {
    try {
        const requestData = {
            keyword: actions.value,
            type: "song",
            format: 1
        }
        let res = yield getSearchMusic(requestData);
        const action = actionCreators.initMusicSearch({
            searchResult: res.data.data
        });
        yield put(action)
    } catch (e) {
        console.log(e)
    }
}

function* getSingerListSaga(actions) {
    try {
        const requestData = {
            pageSize: 100
        }
        let res = yield getSingerList(requestData);
        const action = actionCreators.initSingerList(res.data.data)
        yield put(action)
    } catch (e) {
        console.log(e)
    }
}

function* getRankListSaga(actions) {
    try {
        let res = yield getTopList();
        const action = actionCreators.initRankList(res.data.topList)
        yield put(action)
    } catch (e) {
        console.log(e)
    }
}

function* musicSaga() {
    yield takeEvery(actionTypes.GET_SWIPER_LIST, getSwierImgListSaga);
    yield takeEvery(actionTypes.GET_SONG_lIST, getSongListSaga);
    yield takeEvery(actionTypes.GET_MUSIC_LIST, getMusicListSaga);
    yield takeEvery(actionTypes.GET_MUSIC_MESSAGE, getMuSicMessageSaga);
    yield takeEvery(actionTypes.GET_SEARCH_MUSIC, getSearchMusicSaga);
    yield takeEvery(actionTypes.GET_SINGER_LIST, getSingerListSaga);
    yield takeEvery(actionTypes.GET_RANK_LIST, getRankListSaga)
}
export default musicSaga;