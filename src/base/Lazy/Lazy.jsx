import React,{Component} from 'react'
import Lazyload from 'r-img-lazyload';
import LazyDefaultImg from './logo@2x.png'
class Lazy extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const config = {
            options: {
                error: LazyDefaultImg,
                loading: LazyDefaultImg
            },
            ...this.props
        };
        return <Lazyload {...config} />;
    }
}
export default Lazy;