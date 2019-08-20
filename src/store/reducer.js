import * as actionTypes from './actionTypes'
const defaultState = {
    header: {
        name: "SNAIL_MUSIC"
    },
    swiper: {
        swiperList: []
    },
    songList: {
        songList: []
    },
    musicList: {
        coverImage: "",
        name: "",
        musicList: []
    },
    musicMessage: {
        musicLyric: ""
    },
    musicSearch: {
        searchResult: []
    },
    musicSinger: {
        singerList: []
    },
    musicRank: {
        topList: []
    }
};

export default (state = defaultState, action) => {
    const newState = {
        ...state
    };
    switch (action.type) {
        case actionTypes.INIT_SWIPER_LIST:
            newState.swiper.swiperList = action.value;
            return newState;
        case actionTypes.INIT_SONGLIST:
            newState.songList.songList = action.value;
            return newState;
        case actionTypes.INIT_MUSIC_lIST:
            newState.musicList.musicList = action.value.data;
            newState.musicList.coverImage = action.value.coverImage;
            newState.musicList.name = action.value.name;
            return newState;
        case actionTypes.INIT_MUSIC_MESSAGE:
            newState.musicMessage.musicLyric = action.value.musicLyric;
            return newState;
        case actionTypes.INIT_SEARCH_MUSIC:
            newState.musicSearch.searchResult = action.value.searchResult;
            newState.musicList.musicList = action.value.searchResult;
            return newState;
        case actionTypes.INIT_SINGER_lIST:
            newState.musicSinger.singerList = action.value
            return newState;
        case actionTypes.INIT_RANK_LIST:
            console.log(action)
            newState.musicRank.topList = action.value;
            return newState
        default:
            return state;
    }
}