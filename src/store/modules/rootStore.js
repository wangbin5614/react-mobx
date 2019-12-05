import { observable, action, flow, computed } from 'mobx';
import { getUserInfo, getOpenIdStep1, getOpenIdStep2, getJobList, register, modifyWx } from '~api/index';
import { getString, delUrlParam } from '~utils/public';

class RootStore {
    @observable
    loginInfo = {
        realName: '',//用户名
        phoneNum: '',//手机号
        smsCode: '',//验证码
        idCardNo: '',//身份证
        professionCode: '',//职业
        shareId: getString('shareId') || '',//邀请码
    }
    @observable
    isAgree = false

    @observable
    jobList = []

    @observable
    jobVal = ''

    @observable
    userInfo = {}

    @observable
    // openId = 'oWoFiv8hU75a1lsgGQbK03_zqjkY';
    openId = localStorage.getItem('openId') ? localStorage.getItem('openId') : '';

    @observable
    modifyWx = {
        phoneNum: '',
        smsCode: '',
        showFail: false,
        failStatus: 0
    }

    @computed
    get professionCode() {
        return this.jobVal[0];
    }

    @action
    setOpenId(openId) {
        this.openId = openId;
    }

    @action
    toggleAgreement() {
        this.isAgree = !this.isAgree;
    }
    @action
    chooseJob(val) {
        this.jobVal = val;
    }

    @action
    hideFailDialog() {
        setTimeout(() => {
            this.modifyWx.failStatus = 0;
        }, 1000)
        this.modifyWx.showFail = false;
    }

    @action
    handleInput(e, length, propertyName, source = 1) { //来源： source=1登录页 2更换登录微信号页 
        let val = e.target.value;
        e.target.value = val.length > length ? val.slice(0, length) : val;
        if (source === 2) {
            this.modifyWx[propertyName] = e.target.value;
        } else {
            this.loginInfo[propertyName] = e.target.value;
        }
    }

    // 获取openId
    getOpenId = async () => {
        let code = getString('code');
        if (!code) {
            let url = window.location.href;
            let state = 'coloan_base';
            const data = await getOpenIdStep1({ url, state });
            if (data.code === 200) {
                window.location.href=data.data
            }
        } else {
            let state = getString('state');
            const data = await getOpenIdStep2({ code, state });
            if (data.code === 200) {
                this.setOpenId(data.data);
                console.log(2);
            } else if (data.code === 80002) {
                window.location.href = delUrlParam('code');
            }
        }
    }

    // 获取用户信息
    @action
    getUserInfo = async () => {
        const data = await getUserInfo(this.openId);
        if (data.code === 200) {
            this.userInfo = data.data;
            localStorage.setItem('openId', this.openId);
        }
        return data;
    };

    // 获取职业列表
    @action
    getJobList = async () => {
        const data = await getJobList();
        if (data.code === 200) {
            this.jobList = data.data.map(item => {
                return {
                    label: item.professionName,
                    value: item.id
                }
            });
        }
    };

    // 注册提交信息
    @action
    register = async () => {
        const { professionCode, openId } = this;
        let params = Object.assign(this.loginInfo, { professionCode, openId });
        const data = await register(params);
        if (data.code === 200) {
            this.getUserInfo();
        }
    }

    // 修改登录微信账号
    modifyWxSubmit = flow(function* () {
        const { modifyWx: { phoneNum, smsCode }, openId } = this;
        const data = yield modifyWx({ phoneNum, smsCode, openId });
        if (data.code === 200) {
            this.getUserInfo()
        } else if (data.code === 40003) {
            this.modifyWx.showFail = true;
            this.modifyWx.failStatus = 1; //频繁操作
        } else if (data.code === 20004) {
            this.modifyWx.showFail = true;
            this.modifyWx.failStatus = 2;  //未注册
        }
    })
}
export default new RootStore();