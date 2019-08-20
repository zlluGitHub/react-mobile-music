import React,{Component} from 'react'
import './back.scss'
class Back extends Component {
    constructor(props) {
        super(props)
        console.log(props)
    }
    render() {
        const {title} = this.props;
        return(
            <div className="back-box">
                <div className="back" onClick={this.goBack.bind(this)}>
                    <i className="icon-back"></i>
                </div>
                <h1 className="back-title">{title}</h1>
            </div>
        )
    }
    goBack() {
        this.props.history.goBack();
    }
}
Back.defaultProps={
    title: '标题标题标题标题',
}
export default Back;