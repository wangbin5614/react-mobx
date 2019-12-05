import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Picker, Toast } from 'antd-mobile';
import { getString, verifyIdCard } from '~utils/public';
import { CSSTransition } from 'react-transition-group';
import SmsCode from '~components/smsCode';
import style from './css/login.module.scss';
import '~common/css/animation.css';

const CustomChildren = props => (
    <div onClick={props.onClick}>
        {props.extra}
    </div>
);

@inject('RootStore')
@observer
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDialog: false,
            readOnly: getString('shareId') ? true : false
        }
    }
    componentDidMount() {
        this.props.RootStore.getJobList()
        console.log(4);
    }
    handleRoute = path => {
        this.props.history.push(path);
    }
    toggleDialog = () => {
        this.setState(preS => ({
            showDialog: !preS.showDialog
        }))
    }
    handleRegister = () => {
        const { loginInfo: { realName, phoneNum, smsCode, idCardNo, shareId }, professionCode, isAgree } = this.props.RootStore;
        if (!realName) {
            Toast.info('姓名不能为空！')
        } else if (!(/^1[3456789]\d{9}$/.test(phoneNum))) {
            Toast.info('手机号格式错误')
        } else if (!smsCode) {
            Toast.info('验证码不能为空')
        } else if (!professionCode) {
            Toast.info('请选择职业')
        } else if (!verifyIdCard(idCardNo)) {
            Toast.info('身份证号码错误')
        } else if (!shareId) {
            Toast.info('邀请码错误')
        } else if (!isAgree) {
            Toast.info('请先勾选用户协议')
        } else {
            this.props.RootStore.register().then(data => {
                if (data.code === 200) {
                    this.props.history.push('/loan');
                }
            })
        }
    }
    render() {
        const { loginInfo: { realName, phoneNum, idCardNo, shareId }, jobList, jobVal, isAgree } = this.props.RootStore;
        return (
            <div className={style.login}>
                <img className={style.logo} src={require("./images/logo.png")} alt="" />
                <ul>
                    <li className={style.login_option}>
                        <span className={style.desc}>姓名</span>
                        <input type="text" defaultValue={realName} onChange={e => this.props.RootStore.handleInput(e, 6, 'realName')} placeholder="输入姓名" />
                    </li>
                    <li className={style.login_option}>
                        <span className={style.desc}>手机号码</span>
                        <input type="number" defaultValue={phoneNum} onChange={e => this.props.RootStore.handleInput(e, 11, 'phoneNum')} placeholder="输入手机号码" />
                    </li>
                    <li className={style.login_option}>
                        <input type="number" onChange={e => this.props.RootStore.handleInput(e, 4, 'smsCode')} placeholder="输入手机验证码" />
                        <SmsCode type={1} phone={phoneNum} />
                    </li>
                    <li className={`${style.login_option} ${style.job_option}`}>
                        <span className={style.desc}>职业</span>
                        <Picker title="选择职业" value={jobVal} extra="请选择职业" data={jobList} cols={1} onOk={e => this.props.RootStore.chooseJob(e)}>
                            <CustomChildren />
                        </Picker>
                    </li>
                    <li className={style.login_option}>
                        <span className={style.desc}>身份证号</span>
                        <input type="text" defaultValue={idCardNo} onChange={e => this.props.RootStore.handleInput(e, 20, 'idCardNo')} placeholder="输入身份证号" />
                    </li>
                    <li className={style.login_option}>
                        <span className={style.desc}>邀请码</span>
                        <input type="text" defaultValue={shareId} readOnly={this.state.readOnly ? true : false} onChange={e => this.props.RootStore.handleInput(e, 18, 'shareId')} placeholder="输入邀请码" />
                    </li>
                </ul>
                <div className={style.agreement}>
                    <img onClick={() => this.props.RootStore.toggleAgreement()} src={require(`~common/images/select${isAgree ? 'ed' : ''}_icon.png`)} alt="" />
                    <p>阅读知晓并同意<span className={style.blue} onClick={() => this.handleRoute('/registerProtocol')}>《用户注册协议》</span></p>
                </div>
                <div className={style.register_btn} onClick={this.handleRegister}>注册</div>
                <div className={`${style.tips} clearfix`}>
                    <span className="fl" onClick={this.toggleDialog}>没有邀请码？</span>
                    <span className="fr" onClick={() => this.handleRoute('/modifyWx')}>更换登录微信账号</span>
                </div>
                <CSSTransition in={this.state.showDialog} timeout={1500} classNames="fade" unmountOnExit>
                    <div className={style.invite_tip_dialog}>
                        <div className={style.dialog_container}>
                            <img className={style.smile_logo} src={require("./images/smile_icon.png")} alt="" />
                            <h4>没有邀请码？</h4>
                            <div className={style.note}>微信搜索<span className={style.blue}>“您所在地-税贷”“您所在地-企融管家”</span>直接进入即可；注意:请认准<span className={style.blue}>“企融管家”</span>旗下</div>
                            <img className={style.close_btn} onClick={this.toggleDialog} src={require("~common/images/close_icon_white.png")} alt="" />
                        </div>
                    </div>
                </CSSTransition>
            </div>
        );
    }
}

export default Login;