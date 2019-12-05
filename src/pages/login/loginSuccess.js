import React, { Component } from 'react';
import style from './css/loginSuccess.module.scss';

class LoginSuccess extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className={style.loginSuccess}>
                <img className={style.success_logo} src={require("./images/succes_icon.png")} alt="" />
                <h4>恭喜您成为企融管家融资顾问</h4>
                <div className={style.note}>您目前的等级为<span className={style.blue}>V1</span>，随着等级的提升，平台给予的奖励越多。<br />我们相信，通过努力您一定能很快升级的吆。<br />平台<span className={style.blue}>奖励无上限-团队个人</span>均有奖励，识别下方二维码，关注<span className={style.blue}>“企融管家”</span>官方服务号，开启赚钱之路。</div>
                <img className={style.public_number} src={require("./images/public_number.jpg")} alt="" />
                <img className={style.guide_icon} src="./images/guide_icon.png" alt="" />
            </div>
        );
    }
}

export default LoginSuccess;