import React, { Suspense } from 'react';
import { inject, observer } from 'mobx-react';
import { Redirect, withRouter } from 'react-router-dom';

export default function proxyRouter(item) {
    @inject('RootStore')
    @observer
    class RouterProxy extends React.PureComponent {
        constructor(props) {
            super(props);
            this.state = {};
        }
        componentDidMount() {
            const { openId, userInfo: { id } } = this.props.RootStore;
            if (openId) {
                if (item.path === '/login') {
                    this.props.history.push('/loan');
                }
                if (!id) {
                    this.props.RootStore.getUserInfo().then(data => {
                        if (data.code === 20004) {
                            localStorage.removeItem('openId');
                            this.props.RootStore.setOpenId('');
                            this.props.history.push('/login');
                        }
                    });
                }
            } else {
                if (item.requireLogin !== false || (item.requireAuth === true && navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1) || item.path === '/login') {
                    this.props.RootStore.getOpenId();
                }
            }
            document.title = item.title;
        }
        render() {
            return item.requireLogin === false || item.requireAuth === true || this.props.RootStore.openId ?
                <Suspense fallback={<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Loading...</div>}>     
                {/* render函数可以监听到数据的变化，所以在渲染组件之前判断openId是否有值 */}
                    {item.path === '/login' || item.requireAuth === true ? this.props.RootStore.openId && <item.component {...this.props} /> : <item.component {...this.props} />}
                </Suspense>
                : <Redirect to="/login" />
        }
    }
    return withRouter(RouterProxy);
}



