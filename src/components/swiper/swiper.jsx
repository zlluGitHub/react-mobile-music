import React,{Component} from 'react'
import {connect} from 'react-redux'
import 'swiper/dist/css/swiper.min.css'
import Swiper from 'swiper/dist/js/swiper.js'
import './swiper.scss'
import * as actionCreators from '../../store/actionCreators'
class MusicSwiper extends Component  {
    render(){
        const {swiperList} = this.props;
        return (
            <div className="swiper-container">
                <div className="swiper-wrapper">
                    {
                        swiperList.map( item => {
                            return (
                                <div className="swiper-slide" key={item.id}>
                                    <img className="swiper-img" src={item.picUrl} alt=""/>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="swiper-pagination"></div>
            </div>
        )
    }
    initialBannerSwiper() {
        //单例模式 防止生成多个实例
        if(this.bannerSwiper){
            return this.bannerSwiper
        }
        this.bannerSwiper = new Swiper('.swiper-container', {
            ////当改变swiper的样式（例如隐藏/显示）或者修改swiper的子元素时，自动初始化swiper。
            observer: true, 
            ////将observe应用于Swiper的父元素。当Swiper的父元素变化时，例如window.resize，Swiper更新。
            observeParents: true, 
            loop: true, 
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            pagination: {
                clickable: true,
                el: '.swiper-pagination',
            }
        })
    }
    componentWillUnmount(){
        if(this.bannerSwiper){
            this.bannerSwiper.detachEvents()
            this.bannerSwiper.destroy()
        }
    }
    componentDidMount() {
        this.initialBannerSwiper()
        this.props.getSwiperList()
    }

}
const mapStateToProps = (state) => {
    return {
        swiperList:state.swiper.swiperList
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getSwiperList() {
            const action = actionCreators.getSwiperList();
            dispatch(action);
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MusicSwiper);