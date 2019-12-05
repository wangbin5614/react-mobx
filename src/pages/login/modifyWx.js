import React, { Component } from 'react';
import { Toast } from 'antd-mobile';
import { CSSTransition } from 'react-transition-group';
import { inject, observer } from 'mobx-react';
import SmsCode from '~components/smsCode';
import style from './css/modifyWx.module.scss';
import '~common/css/animation.css';

@inject('RootStore')
@observer
class ModifyWx extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phoneNum: ''
        }
    }
    modifyWxSubmit = () => {
        const { modifyWx: { phoneNum, smsCode } } = this.props.RootStore;
        if (!(/^1[3456789]\d{9}$/.test(phoneNum))) {
            Toast.info('手机号格式错误')
        } else if (!smsCode) {
            Toast.info('验证码不能为空')
        } else {
            this.props.RootStore.modifyWxSubmit().then((data) => {
                console.log(data, '333');
                if (data.code === 200) {
                    this.props.history.replace('/loan');
                }
            })
        }
    }
    render() {
        const { modifyWx: { showFail, failStatus } } = this.props.RootStore;
        return (
            <div className={style.modifyWx}>
                <p className={style.tip}>更换登录微信账号之后，<br />您只能使用更换后的微信号登录</p>
                <ul className={style.container}>
                    <li>
                        <span className={style.desc}>手机号码</span>
                        <input type="number" onInput={e => this.props.RootStore.handleInput(e, 11, 'phoneNum', 2)} placeholder="输入手机号码" />
                    </li>
                    <li>
                        <input type="number" onInput={e => this.props.RootStore.handleInput(e, 4, 'smsCode', 2)} placeholder="输入手机验证码" />
                        <SmsCode type={1} phone={this.props.RootStore.modifyWx.phoneNum} />
                    </li>
                    <div className={style.submit_btn} onClick={this.modifyWxSubmit}>立即更换</div>
                </ul>
                <CSSTransition in={showFail} timeout={1500} classNames="fade" unmountOnExit>
                    <div className={style.no_login_dialog}>
                        <div className={style.dialog_container}>
                            <img className={style.smile_logo} src={require("./images/smile_icon.png")} alt="" />
                            <p>{failStatus === 1 ? '您还没有注册，请返回注册页完成注册。' : failStatus === 2 ? '操作过于频繁，请用已绑定的微信号登录' : ''}</p>
                            <img className={style.close_btn} onClick={() => this.props.RootStore.hideFailDialog()} src={require("~common/images/close_icon_white.png")} alt="" />
                        </div>
                    </div>
                </CSSTransition>
            </div>
        );
    }
}

export default ModifyWx;