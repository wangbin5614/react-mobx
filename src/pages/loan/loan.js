import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { inject, observer } from 'mobx-react';
import { Tabs, Carousel, PullToRefresh } from 'antd-mobile';
import style from './css/loan.module.scss';


const tabs = [
    { title: '企业贷' },
    { title: '个人贷' },
];

function genData() {
    const dataArr = [];
    for (let i = 0; i < 20; i++) {
        dataArr.push(i);
    }
    return dataArr;
}

@inject('LoanStore')
@observer
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            down: true,
            height: document.documentElement.clientHeight,
            data: [],
        }
    }
    componentDidMount() {
        this.props.LoanStore.getBannerList();
        setTimeout(() => {
            const hei = this.state.height - 90;
            console.log(ReactDOM.findDOMNode(this.ptr).offsetTop, '909');
            setTimeout(() => this.setState({
                height: hei,
                data: genData(),
            }), 0);
        }, 1500)
    }
    handleBannerClick = item => {
        if (item.routerType === 0) {
            window.location.href = item.routerContent;
        } else if (item.routerType === 2) {
            this.props.history.push(`${item.routerContent}&userType=b`);
        } else if (item.routerType === 4) {
            this.props.history.push('/accountDetail');
        } else if (item.routerType === 5) {
            this.props.history.push('/team');
        } else if (item.routerType === 6) {
            this.props.history.push('/mine');
        }
    }
    render() {
        const { bannerList, bannerPlayFlag } = this.props.LoanStore;
        return (
            <div className={style.loan}>
                <div className={`${style.header} border-1px-b`}>
                    <div className={style.location}>
                        <span>广州</span>
                        <img src={require("./images/arrow_down.png")} alt="" />
                    </div>
                    <div className={style.search}>
                        <img src={require("./images/arrow_down.png")} alt="" />
                        <img src={require("~common/images/search_icon.png")} alt="" />
                        <span>产品名称搜索</span>
                    </div>
                </div>
                <Tabs tabs={tabs}
                    initialPage={0}
                    swipeable={false}
                    tabDirection='horizontal'
                    tabBarUnderlineStyle={{ 'borderColor': '#0088fb', 'width': '10%', 'marginLeft': '20%' }}
                    tabBarActiveTextColor='#0088fb'
                    tabBarInactiveTextColor='#020202'
                    onChange={(tab, index) => { console.log('onChange', index, tab); }}
                    onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
                >
                    <PullToRefresh
                        damping={60}
                        ref={el => this.ptr = el}
                        style={{
                            height: this.state.height,
                            overflow: 'auto',
                        }}
                        indicator={this.state.down ? {} : { deactivate: '上拉可以刷新' }}
                        direction='down'
                        refreshing={this.state.refreshing}
                        onRefresh={() => {
                            this.setState({ refreshing: true });
                            setTimeout(() => {
                                this.setState({ refreshing: false });
                            }, 1000);
                        }}
                    >
                        <div className={style.banner_swiper}>
                            <Carousel autoplay={bannerPlayFlag} infinite>
                                {bannerList.map(item => (
                                    <div key={item.id} onClick={() => this.handleBannerClick(item)} className={style.swiper_slide}>
                                        <img src={item.bannerUrl} onLoad={() => { window.dispatchEvent(new Event('resize')) }} alt="" />
                                    </div>
                                ))}
                            </Carousel>
                        </div>
                        {this.state.data.map(i => (
                            <div key={i} style={{ textAlign: 'center', padding: 20 }}>
                                {this.state.down ? 'pull down' : 'pull up'} {i}
                            </div>
                        ))}
                    </PullToRefresh>
                    <PullToRefresh
                        damping={60}
                        ref={el => this.ptr = el}
                        style={{
                            height: this.state.height,
                            overflow: 'auto',
                        }}
                        indicator={this.state.down ? {} : { deactivate: '上拉可以刷新' }}
                        direction='down'
                        refreshing={this.state.refreshing}
                        onRefresh={() => {
                            this.setState({ refreshing: true });
                            setTimeout(() => {
                                this.setState({ refreshing: false });
                            }, 1000);
                        }}
                    >
                        <div className={style.banner_swiper}>
                            <Carousel autoplay={bannerPlayFlag} infinite>
                                {bannerList.map(item => (
                                    <div key={item.id} onClick={() => this.handleBannerClick(item)} className={style.swiper_slide}>
                                        <img src={item.bannerUrl} onLoad={() => { window.dispatchEvent(new Event('resize')) }} alt="" />
                                    </div>
                                ))}
                            </Carousel>
                        </div>
                        {this.state.data.map(i => (
                            <div key={i} style={{ textAlign: 'center', padding: 20 }}>
                                {this.state.down ? 'pull down' : 'pull up'} {i}
                            </div>
                        ))}
                    </PullToRefresh>
                </Tabs>
            </div>
        );
    }
}

export default Home;