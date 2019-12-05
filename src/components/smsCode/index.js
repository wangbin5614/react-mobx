import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getValidCode } from '~api/index';
import { Toast } from 'antd-mobile';

import './index.scss';
class SmsCode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            validText: '获取验证码'
        }
    }
    static defaultProps = {
        type: 1
    }
    static propTypes = {
        phone: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        type: PropTypes.number.isRequired   //1登录 2贷款申请
    };
    getValidCode = async () => {
        let { phone } = this.props;
        if (!(/^1[3456789]\d{9}$/.test(phone))) {
            return Toast.info('请输入正确的手机号');
        }
        let data = await getValidCode(this.props.phone);
        if (data.code === 200) {
            this.setState({ validText: '60s' }, function () {
                var timer = window.setInterval(() => {
                    let { validText } = this.state;
                    if (validText.split('s')[0] === "1") {
                        window.clearInterval(timer); //停止计时器
                        this.setState({
                            validText: '重新发送'
                        })
                    } else {
                        this.setState(preS => ({
                            validText: `${preS.validText.split('s')[0] - 1}s`,
                        }))
                    }
                }, 1000);
            })
        }
    }
    render() {
        return (
            <span onClick={this.getValidCode} className={`smsCode${this.props.type} ${this.props.type === 1 ? 'border-1px-l' : ''}`}>{this.state.validText}</span>
        );
    }
}

export default SmsCode;